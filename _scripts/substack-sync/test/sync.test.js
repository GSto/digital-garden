const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { sync, formatSummary } = require("../index");
const { jsonResponse, bytesResponse, fakeFetch, fastOptions, post } = require("./helpers");

const IMAGE = "https://substack-post-media.s3.amazonaws.com/public/images/aaa-111_10x10.png";
const COVER = "https://substack-post-media.s3.amazonaws.com/public/images/bbb-222_20x20.jpeg";

function tempRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sync-test-"));
  fs.mkdirSync(path.join(root, "blog"));
  fs.writeFileSync(path.join(root, "blog", "blog.11tydata.js"), "module.exports = {};\n");
  return root;
}

function upstream(posts, { failImages = false, failCdn = false } = {}) {
  return fakeFetch((url) => {
    if (url.includes("/api/v1/posts")) return jsonResponse({ posts });
    if (url.includes("/api/v1/archive")) return jsonResponse({ posts: posts.map(({ id, section_name }) => ({ id, section_name })) });
    if (url.startsWith("https://substack-post-media")) return failImages ? bytesResponse("", 403) : bytesResponse("original bytes");
    if (url.startsWith("https://substackcdn.com/image/fetch/")) return failImages || failCdn ? bytesResponse("", 404) : bytesResponse("cdn bytes");
  });
}

const isImageCall = (url) => url.startsWith("https://substack-post-media") || url.startsWith("https://substackcdn.com");

async function run(root, posts, options) {
  const { fetchImpl, calls } = upstream(posts, options);
  const summary = await sync({ root, fetchOptions: { ...fastOptions, fetchImpl } });
  return { summary, imageCalls: calls.filter(isImageCall) };
}

function snapshot(root) {
  const files = {};
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files[path.relative(root, full)] = { content: fs.readFileSync(full, "utf8"), mtimeMs: fs.statSync(full).mtimeMs };
    }
  };
  walk(root);
  return files;
}

const first = post({ body_html: `<p>One.</p><img src="${IMAGE}">`, cover_image: COVER });
const second = post({ id: 2, slug: "second-post", title: "Second", body_html: '<p>See <a href="https://www.statetransition.co/p/first-post">first</a>.</p>' });

test("a first sync writes every post and image", async () => {
  const root = tempRoot();
  const { summary, imageCalls } = await run(root, [first, second]);
  assert.deepStrictEqual(
    { new: summary.new, updated: summary.updated, unchanged: summary.unchanged, removed: summary.removed, images: summary.imagesDownloaded },
    { new: 2, updated: 0, unchanged: 0, removed: 0, images: 2 }
  );
  assert.strictEqual(imageCalls.length, 2);
  assert.match(fs.readFileSync(path.join(root, "blog", "second-post.md"), "utf8"), /\[first\]\(\/blog\/first-post\/\)/);
  assert.ok(fs.existsSync(path.join(root, "assets", "blog", "first-post", "aaa-111_10x10.png")));
  assert.ok(fs.existsSync(path.join(root, "assets", "blog", "first-post", "bbb-222_20x20.jpeg")));
});

test("an unchanged second sync writes nothing and downloads no images", async () => {
  const root = tempRoot();
  await run(root, [first, second]);
  const before = snapshot(root);
  const { summary, imageCalls } = await run(root, [first, second]);
  assert.strictEqual(summary.unchanged, 2);
  assert.strictEqual(summary.new + summary.updated + summary.removed + summary.imagesDownloaded, 0);
  assert.strictEqual(imageCalls.length, 0);
  assert.deepStrictEqual(snapshot(root), before);
});

test("only an edited post is rewritten", async () => {
  const root = tempRoot();
  await run(root, [first, second]);
  const before = snapshot(root);
  const { summary } = await run(root, [first, { ...second, body_html: "<p>Edited.</p>" }]);
  assert.deepStrictEqual([summary.updated, summary.unchanged], [1, 1]);
  const after = snapshot(root);
  assert.deepStrictEqual(after["blog/first-post.md"], before["blog/first-post.md"]);
  assert.notStrictEqual(after["blog/second-post.md"].content, before["blog/second-post.md"].content);
});

test("a hand-edited post is replaced with the Substack content", async () => {
  const root = tempRoot();
  await run(root, [first]);
  const file = path.join(root, "blog", "first-post.md");
  const original = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, original + "local edit\n");
  const { summary } = await run(root, [first]);
  assert.strictEqual(summary.updated, 1);
  assert.strictEqual(fs.readFileSync(file, "utf8"), original);
});

test("a new post is added without touching existing ones", async () => {
  const root = tempRoot();
  await run(root, [first]);
  const before = snapshot(root);
  const { summary } = await run(root, [first, second]);
  assert.deepStrictEqual([summary.new, summary.unchanged], [1, 1]);
  assert.deepStrictEqual(snapshot(root)["blog/first-post.md"], before["blog/first-post.md"]);
});

test("a removed post loses its file and images, and the data file stays", async () => {
  const root = tempRoot();
  await run(root, [first, second]);
  const { summary } = await run(root, [second]);
  assert.deepStrictEqual([summary.removed, summary.imagesRemoved], [1, 2]);
  assert.ok(!fs.existsSync(path.join(root, "blog", "first-post.md")));
  assert.ok(!fs.existsSync(path.join(root, "assets", "blog", "first-post")));
  assert.ok(fs.existsSync(path.join(root, "blog", "blog.11tydata.js")));
});

test("images are downloaded from the resized CDN copy", async () => {
  const root = tempRoot();
  const { imageCalls } = await run(root, [first]);
  assert.ok(imageCalls.every((url) => url.startsWith("https://substackcdn.com/image/fetch/w_1456,")));
  assert.strictEqual(fs.readFileSync(path.join(root, "assets", "blog", "first-post", "aaa-111_10x10.png"), "utf8"), "cdn bytes");
});

test("an image the CDN cannot serve falls back to the S3 original", async () => {
  const root = tempRoot();
  const { summary } = await run(root, [first], { failCdn: true });
  assert.strictEqual(summary.imagesDownloaded, 2);
  assert.strictEqual(fs.readFileSync(path.join(root, "assets", "blog", "first-post", "aaa-111_10x10.png"), "utf8"), "original bytes");
});

test("a failed image download leaves every file byte-identical", async () => {
  const root = tempRoot();
  await run(root, [second]);
  const before = snapshot(root);
  await assert.rejects(run(root, [first, { ...second, body_html: "<p>Edited.</p>" }], { failImages: true }), /image for post "first-post"/);
  assert.deepStrictEqual(snapshot(root), before);
});

test("an unmapped section fails before any file changes", async () => {
  const root = tempRoot();
  await run(root, [first]);
  const before = snapshot(root);
  await assert.rejects(run(root, [{ ...first, section_name: "Gossip" }]), /section "Gossip"/);
  assert.deepStrictEqual(snapshot(root), before);
});

test("paid posts are skipped and reported", async () => {
  const root = tempRoot();
  const { summary } = await run(root, [second, post({ id: 3, slug: "paid", audience: "only_paid" })]);
  assert.deepStrictEqual([summary.new, summary.skipped, summary.skippedSlugs], [1, 1, ["paid"]]);
  assert.ok(!fs.existsSync(path.join(root, "blog", "paid.md")));
});

test("the summary reports every count", () => {
  assert.strictEqual(
    formatSummary({ new: 1, updated: 2, unchanged: 3, removed: 4, skipped: 1, imagesDownloaded: 5, imagesRemoved: 6, skippedSlugs: ["paid"] }),
    "Posts: 1 new, 2 updated, 3 unchanged, 4 removed, 1 skipped\nImages: 5 downloaded, 6 removed\nSkipped (not public): paid"
  );
});
