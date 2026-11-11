const test = require("node:test");
const assert = require("node:assert");
const { imageTarget } = require("../images");
const { fixture } = require("./helpers");

const ORIGINAL = "https://substack-post-media.s3.amazonaws.com/public/images/ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg";

test("CDN fetch URLs decode to the S3 original and keep its file name", () => {
  const cdn = fixture("captioned-image.html").match(/<img src="([^"]+)"/)[1];
  assert.match(cdn, /^https:\/\/substackcdn\.com\/image\/fetch\//);
  assert.deepStrictEqual(imageTarget(cdn, "spring"), {
    sources: [`https://substackcdn.com/image/fetch/w_1456,c_limit,f_jpg,fl_progressive:steep/${encodeURIComponent(ORIGINAL)}`, ORIGINAL],
    file: "ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg",
    sitePath: "/assets/blog/spring/ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg",
  });
});

test("the 1456px CDN copy in the original format is tried first, with the S3 original as a fallback", () => {
  const png = ORIGINAL.replace(".jpeg", ".png");
  const { sources } = imageTarget(png, "spring");
  assert.match(sources[0], /^https:\/\/substackcdn\.com\/image\/fetch\/w_1456,c_limit,f_png,fl_progressive:steep\/https%3A%2F%2Fsubstack-post-media/);
  assert.strictEqual(sources[1], png);
});

test("URLs that do not decode fall back to a hashed name of the source", () => {
  const src = "https://example.com/pictures/photo.PNG?size=2";
  const target = imageTarget(src, "spring");
  assert.deepStrictEqual(target.sources, [src]);
  assert.match(target.file, /^[0-9a-f]{16}\.png$/);
  assert.strictEqual(imageTarget(src, "spring").file, target.file);
});
