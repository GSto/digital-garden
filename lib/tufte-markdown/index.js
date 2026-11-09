const footnote = require("markdown-it-footnote");
const attrs = require("markdown-it-attrs");
const { sectionWrapperPlugin } = require("./sections");
const { subtitlePlugin } = require("./subtitle");
const { sidenotes } = require("./sidenotes");
const { epigraphs } = require("./epigraphs");
const { figures } = require("./figures");

function tufteMarkdown(md) {
  md.use(footnote).use(attrs).use(sidenotes).use(epigraphs).use(figures).use(sectionWrapperPlugin).use(subtitlePlugin);
}

module.exports = tufteMarkdown;
