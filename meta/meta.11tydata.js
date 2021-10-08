module.exports = {
  eleventyComputed: {
    test: 1,
    brokenLinks: (data) => {
     // console.log('data', data.collections.notes)
     return {}
    },
    postCount: (data) => data.collections.notes.length
  }
}