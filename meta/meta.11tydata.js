const { caselessCompare } = require("../lib/string");
const { getOutboundLinks } = require("../lib/notes");

const getBrokenLinks = (notes) => {
  // array of all possible note URLs
  const noteKey = notes.map((note) => note.data.title);
  const brokenLinks = {}
  for (const note of notes) {
    const outboundLinks = getOutboundLinks(note);
    for (link of outboundLinks) {
      // if the link does not exist in the key
      if (!noteKey.some(key => caselessCompare(key, link))) {
        // if it exists, add the link to the array
        if(brokenLinks[link]) {

          brokenLinks[link] = [...new Set(
            [
              ...brokenLinks[link],
              note
            ]
          )]
        } else {
          brokenLinks[link] = [note]
        }
      }
    }
  }

  return Object.entries(brokenLinks).sort((a, b) => {
    if(a[1].length > b[1].length) {
      return -1
    } else if(a[1].length < b[1].length) {
      return 1
    } else {
      return a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
    }
  });
}

module.exports = {
  eleventyComputed: {
    test: 1,
    brokenLinks: (data) => getBrokenLinks(data.collections.notes),
  },
};
