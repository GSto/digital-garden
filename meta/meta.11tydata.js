const { caselessCompare } = require("../lib/string");
const { getOutboundLinks } = require("../lib/notes");
/*
 useful parts of note construct: 
  note.url, 
  note.data.title
*/
module.exports = {
  eleventyComputed: {
    test: 1,
    brokenLinks: (data) => {
      let first = true;

      // array of all possible note URLs
      const noteKey = data.collections.notes.map((note) => note.data.title);
      const brokenLinks = [];
      for (const note of data.collections.notes) {
        const outboundLinks = getOutboundLinks(note);
        for (link of outboundLinks) {
          if (!noteKey.includes(link)) {
            brokenLinks.push(link);
          }
        }
      }
      return [...new Set(brokenLinks)];
    },
    postCount: (data) => data.collections.notes.length,
  },
};
