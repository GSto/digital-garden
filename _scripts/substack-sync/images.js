const crypto = require("crypto");
const path = require("path");

const ORIGINAL_NAME = /^[0-9a-f-]+_\d+x\d+\.[a-z0-9]+$/i;

function originalUrl(src) {
  const url = new URL(src);
  if (url.hostname !== "substackcdn.com" || !url.pathname.startsWith("/image/fetch/")) return src;
  const encoded = src.slice(src.indexOf("/image/fetch/") + "/image/fetch/".length).split("/").slice(1).join("/");
  const decoded = decodeURIComponent(encoded);
  return /^https?:\/\//.test(decoded) ? decoded : src;
}

const CDN_FORMATS = { jpeg: "jpg", jpg: "jpg", png: "png", gif: "gif", webp: "webp" };

function resizedUrl(original) {
  const format = CDN_FORMATS[path.posix.extname(new URL(original).pathname).slice(1).toLowerCase()];
  const transforms = ["w_1456", "c_limit", format && `f_${format}`, "fl_progressive:steep"].filter(Boolean).join(",");
  return `https://substackcdn.com/image/fetch/${transforms}/${encodeURIComponent(original)}`;
}

function imageTarget(src, slug) {
  const source = originalUrl(src);
  const base = path.posix.basename(new URL(source).pathname);
  if (ORIGINAL_NAME.test(base)) return { sources: [resizedUrl(source), source], file: base, sitePath: `/assets/blog/${slug}/${base}` };
  const ext = path.posix.extname(new URL(src).pathname).toLowerCase() || ".img";
  const file = crypto.createHash("sha256").update(src).digest("hex").slice(0, 16) + ext;
  return { sources: [src], file, sitePath: `/assets/blog/${slug}/${file}` };
}

module.exports = { originalUrl, imageTarget };
