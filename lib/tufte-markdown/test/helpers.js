const MarkdownIt = require("markdown-it");
const tufteMarkdown = require("..");

function createMd() {
  return new MarkdownIt({ html: true }).use(tufteMarkdown);
}

function render(src) {
  return createMd().render(src);
}

module.exports = { createMd, render };
