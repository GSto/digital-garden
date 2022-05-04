const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;
const linkRegExp = /\[([^\]]+)\]\(([^)]+)\)/g;

const caselessCompare = (a, b) => a.toLowerCase() === b.toLowerCase();

module.exports = {
  linkRegExp: linkRegExp,
  wikilinkRegExp: wikilinkRegExp,
  caselessCompare: caselessCompare,
};
