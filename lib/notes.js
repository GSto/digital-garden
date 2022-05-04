const { linkRegExp, wikilinkRegExp } = require("./string");
module.exports = {
  getOutboundLinks: (note) => {
    const noteContent = note.template.frontMatter.content;
    return (noteContent.match(wikilinkRegExp) || []).map((link) =>
      // Extract link location
      link
        .slice(2, -2)
        .split("|")[0]
        .replace(/.(md|markdown)\s?$/i, "")
        .trim()
    );
  },
  getExternalLinks: (note) => {
    const noteContent = note.template.frontMatter.content;
    return noteContent.match(linkRegExp) || [];
  },
};
