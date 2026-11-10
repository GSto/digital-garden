const test = require("node:test");
const assert = require("node:assert");
const { rewriteHref } = require("../links");

const slugs = new Set(["jenkins-strategems"]);

test("links to synced posts on every publication host point to the blog", () => {
  for (const host of ["https://www.statetransition.co", "https://statetransition.co", "https://statetransition.substack.com"]) {
    assert.strictEqual(rewriteHref(`${host}/p/jenkins-strategems`, slugs), "/blog/jenkins-strategems/");
  }
});

test("query strings are dropped and fragments kept", () => {
  assert.strictEqual(rewriteHref("https://www.statetransition.co/p/jenkins-strategems?utm_source=x#part-2", slugs), "/blog/jenkins-strategems/#part-2");
});

test("links to posts that were not synced are unchanged", () => {
  const href = "https://www.statetransition.co/p/unknown-post";
  assert.strictEqual(rewriteHref(href, slugs), href);
});

test("links to non-post pages are unchanged", () => {
  for (const href of ["https://www.statetransition.co/subscribe?", "https://www.statetransition.co/p/jenkins-strategems/comments"]) {
    assert.strictEqual(rewriteHref(href, slugs), href);
  }
});

test("other domains and relative links are unchanged", () => {
  for (const href of ["https://example.com/p/jenkins-strategems", "#footnote-1", "/notes/x/"]) {
    assert.strictEqual(rewriteHref(href, slugs), href);
  }
});
