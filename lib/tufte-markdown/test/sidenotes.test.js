const test = require("node:test");
const assert = require("node:assert");
const { createMd, render } = require("./helpers");

const sidenote = (id, content) =>
  `<label for="${id}" class="margin-toggle sidenote-number"></label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="sidenote">${content}</span>`;
const marginnote = (id, content) =>
  `<label for="${id}" class="margin-toggle">&#8853;</label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="marginnote">${content}</span>`;

test("a labelled footnote renders as a sidenote at the reference, with no footnote block", () => {
  const html = render("Text[^1].\n\n[^1]: A **bold** remark.\n");
  assert.strictEqual(html, `<p>Text${sidenote("sn-1", "A <strong>bold</strong> remark.")}.</p>\n`);
  assert.doesNotMatch(html, /footnote/);
});

test("sidenotes appear in reading order whatever their labels or definition order", () => {
  const html = render("First[^z] then[^a].\n\n[^a]: Second note.\n\n[^z]: First note.\n");
  assert.strictEqual(
    html,
    `<p>First${sidenote("sn-1", "First note.")} then${sidenote("sn-2", "Second note.")}.</p>\n`
  );
});

test("an inline sidenote may contain a link with brackets", () => {
  const html = render("Claim^[see [the source](https://example.com)].\n");
  assert.strictEqual(
    html,
    `<p>Claim${sidenote("sn-1", 'see <a href="https://example.com">the source</a>')}.</p>\n`
  );
});

test("labels starting with margin render as unnumbered margin notes", () => {
  const html = render("A[^1] B[^margin-src] C[^2].\n\n[^1]: One.\n\n[^margin-src]: Source.\n\n[^2]: Two.\n");
  assert.strictEqual(
    html,
    `<p>A${sidenote("sn-1", "One.")} B${marginnote("mn-1", "Source.")} C${sidenote("sn-2", "Two.")}.</p>\n`
  );
});

test("a bare margin label works", () => {
  assert.strictEqual(render("A[^margin].\n\n[^margin]: Note.\n"), `<p>A${marginnote("mn-1", "Note.")}.</p>\n`);
});

test("a multi-paragraph definition joins its paragraphs with a line break", () => {
  const html = render("A[^1].\n\n[^1]: First.\n\n    Second.\n");
  assert.strictEqual(html, `<p>A${sidenote("sn-1", "First.<br>Second.")}.</p>\n`);
});

test("a label referenced twice renders the note at both places", () => {
  const html = render("A[^1] B[^1].\n\n[^1]: Same.\n");
  assert.strictEqual(html, `<p>A${sidenote("sn-1", "Same.")} B${sidenote("sn-2", "Same.")}.</p>\n`);
});

test("an undefined reference stays as literal text", () => {
  assert.strictEqual(render("Ghost[^ghost].\n"), "<p>Ghost[^ghost].</p>\n");
});

test("notes inside a blockquote render as notes", () => {
  assert.match(render("> Quote[^1].\n\n[^1]: Inside.\n"), /<span class="sidenote">Inside\.<\/span>/);
});

test("rendering the same source twice gives identical output", () => {
  const md = createMd();
  const src = "A[^1] B[^margin-x] C^[inline].\n\n[^1]: One.\n\n[^margin-x]: M.\n";
  assert.strictEqual(md.render(src), md.render(src));
});

test("the old >[ ] syntax no longer makes a margin note", () => {
  assert.doesNotMatch(render("Text >[not a note]\n"), /marginnote/);
});
