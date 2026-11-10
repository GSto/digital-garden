const test = require("node:test");
const assert = require("node:assert");
const { imageTarget } = require("../images");
const { fixture } = require("./helpers");

const ORIGINAL = "https://substack-post-media.s3.amazonaws.com/public/images/ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg";

test("CDN fetch URLs decode to the S3 original and keep its file name", () => {
  const cdn = fixture("captioned-image.html").match(/<img src="([^"]+)"/)[1];
  assert.match(cdn, /^https:\/\/substackcdn\.com\/image\/fetch\//);
  assert.deepStrictEqual(imageTarget(cdn, "spring"), {
    source: ORIGINAL,
    file: "ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg",
    sitePath: "/assets/blog/spring/ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg",
  });
});

test("S3 originals are used as they are", () => {
  assert.strictEqual(imageTarget(ORIGINAL, "spring").source, ORIGINAL);
});

test("URLs that do not decode fall back to a hashed name of the source", () => {
  const src = "https://example.com/pictures/photo.PNG?size=2";
  const target = imageTarget(src, "spring");
  assert.strictEqual(target.source, src);
  assert.match(target.file, /^[0-9a-f]{16}\.png$/);
  assert.strictEqual(imageTarget(src, "spring").file, target.file);
});
