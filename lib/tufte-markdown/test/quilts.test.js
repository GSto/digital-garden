const test = require("node:test");
const assert = require("node:assert");
const { render } = require("./helpers");

const fence = (info, body) => "```" + info + "\n" + body + "\n```\n";

test("a quilt block renders a grid figure of captioned images and no code block", () => {
  const html = render(fence("quilt", '![A](/a.png "Before")\n![B](/b.png "During")\n![C](/c.png "After")'));
  assert.strictEqual(
    html,
    '<figure class="quilt">\n' +
      '<figure><img src="/a.png" alt="A"><figcaption>Before</figcaption></figure>\n' +
      '<figure><img src="/b.png" alt="B"><figcaption>During</figcaption></figure>\n' +
      '<figure><img src="/c.png" alt="C"><figcaption>After</figcaption></figure>\n' +
      "</figure>\n"
  );
  assert.doesNotMatch(html, /<pre|<code/);
});

test("quilt fullwidth adds the fullwidth class", () => {
  assert.match(render(fence("quilt fullwidth", "![](/a.png)\n![](/b.png)")), /^<figure class="quilt fullwidth">/);
});

test("lines that are not images are ignored", () => {
  const html = render(fence("quilt", "![](/a.png)\nsome stray text\n![](/b.png)"));
  assert.doesNotMatch(html, /stray/);
  assert.strictEqual(html.match(/<img/g).length, 2);
});

test("an image without a title has no caption", () => {
  assert.doesNotMatch(render(fence("quilt", "![](/a.png)")), /figcaption/);
});

test("a quilt with no images renders nothing", () => {
  assert.strictEqual(render(fence("quilt", "just text")), "");
});

test("other fences still render as code", () => {
  assert.strictEqual(render(fence("js", "let x = 1;")), '<pre><code class="language-js">let x = 1;\n</code></pre>\n');
});

test("a fence named quilts is not a quilt", () => {
  assert.match(render(fence("quilts", "![](/a.png)")), /<pre><code/);
});
