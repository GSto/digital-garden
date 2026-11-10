const fs = require("fs");
const os = require("os");
const path = require("path");
const { fetchPosts, selectPosts, getBuffer } = require("./fetch");
const { renderPost } = require("./convert");

const POSTS_DIR = "blog";
const IMAGES_DIR = path.join("assets", "blog");

function readIfExists(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

function writeAtomically(target, write) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temp = path.join(path.dirname(target), `.${path.basename(target)}.${process.pid}.tmp`);
  write(temp);
  fs.renameSync(temp, target);
}

async function build(posts, { root, fetchOptions }) {
  const { kept, skipped } = selectPosts(posts);
  const slugs = new Set(kept.map((post) => post.slug));
  const rendered = kept.map((post) => renderPost(post, slugs));
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), "substack-sync-"));
  const images = [];
  for (const { slug, images: postImages } of rendered) {
    for (const image of postImages) {
      const relative = path.join(IMAGES_DIR, slug, image.file);
      const entry = { relative, staged: null };
      if (!fs.existsSync(path.join(root, relative))) {
        try {
          const bytes = await getBuffer(image.source, fetchOptions);
          entry.staged = path.join(staging, relative);
          fs.mkdirSync(path.dirname(entry.staged), { recursive: true });
          fs.writeFileSync(entry.staged, bytes);
        } catch (error) {
          fs.rmSync(staging, { recursive: true, force: true });
          throw new Error(`Could not download image for post "${slug}" from ${image.source}: ${error.message}`);
        }
      }
      images.push(entry);
    }
  }
  return { posts: rendered, images, skipped, staging };
}

function apply(plan, { root }) {
  const summary = { new: 0, updated: 0, unchanged: 0, removed: 0, skipped: plan.skipped.length, imagesDownloaded: 0, imagesRemoved: 0 };
  const keepPosts = new Set();
  for (const { slug, markdown } of plan.posts) {
    const target = path.join(root, POSTS_DIR, `${slug}.md`);
    keepPosts.add(target);
    const current = readIfExists(target);
    if (current === markdown) {
      summary.unchanged++;
      continue;
    }
    writeAtomically(target, (temp) => fs.writeFileSync(temp, markdown));
    summary[current === null ? "new" : "updated"]++;
  }
  const keepImages = new Set();
  for (const { relative, staged } of plan.images) {
    const target = path.join(root, relative);
    keepImages.add(target);
    if (!staged) continue;
    writeAtomically(target, (temp) => fs.copyFileSync(staged, temp));
    summary.imagesDownloaded++;
  }
  for (const file of listFiles(path.join(root, POSTS_DIR))) {
    if (path.dirname(file) !== path.join(root, POSTS_DIR) || !file.endsWith(".md") || keepPosts.has(file)) continue;
    fs.unlinkSync(file);
    summary.removed++;
  }
  for (const file of listFiles(path.join(root, IMAGES_DIR))) {
    if (keepImages.has(file)) continue;
    fs.unlinkSync(file);
    summary.imagesRemoved++;
  }
  removeEmptyDirs(path.join(root, IMAGES_DIR));
  fs.rmSync(plan.staging, { recursive: true, force: true });
  return summary;
}

async function sync({ root = process.cwd(), fetchOptions = {} } = {}) {
  const posts = await fetchPosts(fetchOptions);
  const plan = await build(posts, { root, fetchOptions });
  const summary = apply(plan, { root });
  return { ...summary, skippedSlugs: plan.skipped.map((post) => post.slug) };
}

function formatSummary(summary) {
  const lines = [
    `Posts: ${summary.new} new, ${summary.updated} updated, ${summary.unchanged} unchanged, ${summary.removed} removed, ${summary.skipped} skipped`,
    `Images: ${summary.imagesDownloaded} downloaded, ${summary.imagesRemoved} removed`,
  ];
  if (summary.skippedSlugs?.length) lines.push(`Skipped (not public): ${summary.skippedSlugs.join(", ")}`);
  return lines.join("\n");
}

if (require.main === module) {
  sync({ root: path.resolve(__dirname, "..", "..") })
    .then((summary) => console.log(formatSummary(summary)))
    .catch((error) => {
      console.error(`Sync failed, no files changed: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = { build, apply, sync, formatSummary };
