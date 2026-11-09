const test = require("node:test");
const assert = require("node:assert");
const { render } = require("./helpers");

const epigraph = (inner) => `<div class="epigraph"><blockquote>${inner}</blockquote></div>`;

test("a plain blockquote renders as an epigraph without a citation", () => {
  assert.strictEqual(render("> Less is more.\n"), epigraph("<p>Less is more.</p>\n"));
});

test("a last line starting with -- becomes the citation", () => {
  assert.strictEqual(
    render("> When you squeeze an orange, orange juice comes out.\n> -- Wayne W. Dyer\n"),
    epigraph("<p>When you squeeze an orange, orange juice comes out.</p>\n<footer>Wayne W. Dyer</footer>\n")
  );
});

test("a last line starting with an em dash becomes the citation", () => {
  assert.strictEqual(render("> Time discovers truth.\n> — Seneca\n"), epigraph("<p>Time discovers truth.</p>\n<footer>Seneca</footer>\n"));
});

test("a last line starting with '- ' becomes the citation instead of a list", () => {
  const html = render("> Even a fool can be wise.\n> - Danish folk saying\n");
  assert.strictEqual(html, epigraph("<p>Even a fool can be wise.</p>\n<footer>Danish folk saying</footer>\n"));
  assert.doesNotMatch(html, /<ul>/);
});

test("a dash line in its own paragraph becomes the citation", () => {
  assert.strictEqual(
    render("> Quote text.\n>\n> -- Someone\n"),
    epigraph("<p>Quote text.</p>\n<footer>Someone</footer>\n")
  );
});

test("Markdown in a citation is rendered", () => {
  assert.strictEqual(
    render("> Above all else show the data.\n> -- Tufte, *The Visual Display of Quantitative Information*\n"),
    epigraph("<p>Above all else show the data.</p>\n<footer>Tufte, <em>The Visual Display of Quantitative Information</em></footer>\n")
  );
});

test("a quoted list of two items stays a list", () => {
  const html = render("> Rules:\n> - one\n> - two\n");
  assert.match(html, /<ul>\n<li>one<\/li>\n<li>two<\/li>\n<\/ul>/);
  assert.doesNotMatch(html, /<footer>/);
});

test("a dash line that is not the last line stays quote text", () => {
  const html = render("> -- not a citation\n> but the quote continues\n");
  assert.doesNotMatch(html, /<footer>/);
});

test("a quote that is only a dash line keeps its text", () => {
  assert.strictEqual(render("> -- just this\n"), epigraph("<p>-- just this</p>\n"));
});

test("hand-written footer HTML still works", () => {
  assert.strictEqual(
    render("> quote <footer>Wayne W Dyer</footer>\n"),
    epigraph("<p>quote <footer>Wayne W Dyer</footer></p>\n")
  );
});
