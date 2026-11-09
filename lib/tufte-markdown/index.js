const footnote = require("markdown-it-footnote");
const attrs = require("markdown-it-attrs");
const { sectionWrapperPlugin } = require("./sections");
const { subtitlePlugin } = require("./subtitle");
const { sidenotes } = require("./sidenotes");

function tufteMarkdown(md) {
  md.use(footnote).use(attrs).use(sidenotes).use(sectionWrapperPlugin).use(subtitlePlugin);
}

module.exports = tufteMarkdown;
