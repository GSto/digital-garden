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
      //TODO: would be nice if this could tell us where the links were from
      let first = true;

      // array of all possible note URLs
      const noteKey = data.collections.notes.map((note) => note.data.title);
      const brokenLinks = {}
      for (const note of data.collections.notes) {
        const outboundLinks = getOutboundLinks(note);
        for (link of outboundLinks) {
          // if the link does not exist in the key
          if (!noteKey.some(key => caselessCompare(key, link))) {
            // if it exists, add the link to the array
            if(brokenLinks[link]) {
              brokenLinks[link].push(note)
            } else {
              brokenLinks[link] = [note]
            }
          }
        }
      }

      return brokenLinks;
    },
    postCount: (data) => data.collections.notes.length,
  },
};
