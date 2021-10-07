module.exports = {
  eleventyComputed: {
    count: data => data.collections.notes.length
  }
}