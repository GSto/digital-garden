const test = require("node:test");
const assert = require("node:assert");
const { fetchPosts, getJson, selectPosts } = require("../fetch");
const { jsonResponse, fakeFetch, fastOptions, post } = require("./helpers");

test("posts and archive pages are followed by cursor and joined on id", async () => {
  const { fetchImpl, calls } = fakeFetch((url) => {
    if (url.endsWith("/api/v1/posts?limit=20")) return jsonResponse({ posts: [{ id: 1, slug: "a" }], nextCursor: "c 2" });
    if (url.endsWith("/api/v1/posts?limit=20&cursor=c%202")) return jsonResponse({ posts: [{ id: 2, slug: "b" }], nextCursor: "c3" });
    if (url.endsWith("/api/v1/posts?limit=20&cursor=c3")) return jsonResponse({ posts: [], nextCursor: null });
    if (url.endsWith("/api/v1/archive?sort=new")) return jsonResponse({ posts: [{ id: 2, section_name: "At the Edges" }], nextCursor: "x" });
    if (url.endsWith("/api/v1/archive?sort=new&cursor=x")) return jsonResponse({ posts: [{ id: 1, section_name: "Root Nodes" }] });
  });
  const posts = await fetchPosts({ ...fastOptions, fetchImpl });
  assert.deepStrictEqual(posts, [
    { id: 1, slug: "a", section_name: "Root Nodes" },
    { id: 2, slug: "b", section_name: "At the Edges" },
  ]);
  assert.ok(calls.every((url) => url.startsWith("https://www.statetransition.co/")));
});

test("a post missing from the archive gets a null section", async () => {
  const { fetchImpl } = fakeFetch((url) => (url.includes("/posts") ? jsonResponse({ posts: [{ id: 9 }] }) : jsonResponse({ posts: [] })));
  assert.deepStrictEqual(await fetchPosts({ ...fastOptions, fetchImpl }), [{ id: 9, section_name: null }]);
});

test("a 429 is retried and recovers", async () => {
  const { fetchImpl, calls } = fakeFetch((url, n) => (n < 3 ? jsonResponse({}, 429) : jsonResponse({ ok: true })));
  assert.deepStrictEqual(await getJson("https://x/y", { ...fastOptions, fetchImpl }), { ok: true });
  assert.strictEqual(calls.length, 3);
});

test("requests give up after four tries and name the URL", async () => {
  const { fetchImpl, calls } = fakeFetch(() => jsonResponse({}, 503));
  await assert.rejects(getJson("https://x/y", { ...fastOptions, fetchImpl }), /GET https:\/\/x\/y failed: HTTP 503/);
  assert.strictEqual(calls.length, 4);
});

test("a 404 is not retried", async () => {
  const { fetchImpl, calls } = fakeFetch(() => jsonResponse({}, 404));
  await assert.rejects(getJson("https://x/y", { ...fastOptions, fetchImpl }), /HTTP 404/);
  assert.strictEqual(calls.length, 1);
});

test("paid-only posts are skipped", () => {
  const free = post();
  const paid = post({ slug: "paid", audience: "only_paid" });
  assert.deepStrictEqual(selectPosts([free, paid]), { kept: [free], skipped: [paid] });
});
