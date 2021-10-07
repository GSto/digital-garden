const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g

const caselessCompare = (a, b) => a.toLowerCase() === b.toLowerCase();

module.exports = {
  wikilinkRegExp: wikilinkRegExp,
  caselessCompare: caselessCompare
}