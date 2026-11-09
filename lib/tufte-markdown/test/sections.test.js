const test = require("node:test");
const assert = require("node:assert");
const { render } = require("./helpers");

test("each h2 starts a section that runs to the next h2", () => {
  const html = render("# Title\n\nIntro\n\n## One\n\nA\n\n## Two\n\nB\n");
  assert.strictEqual(
    html,
    "<h1>Title</h1>\n<p>Intro</p>\n<section>\n<h2>One</h2>\n<p>A</p>\n</section>\n<section>\n<h2>Two</h2>\n<p>B</p>\n</section>\n"
  );
});

test("a document without h2 headings gets no section", () => {
  assert.strictEqual(render("# Title\n\nBody\n"), "<h1>Title</h1>\n<p>Body</p>\n");
});

test("a #: line renders as a subtitle", () => {
  assert.strictEqual(
    render("# Title\n\n#: A *plain* subtitle\n"),
    '<h1>Title</h1>\n<p class="subtitle">A *plain* subtitle</p>'
  );
});
