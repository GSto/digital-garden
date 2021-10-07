module.exports = {
    title: "Glenn Stovall - Public Notebook",
    desc: " a place to collect notes, quotes, links, and other resources. Part of practicing prolific creation. It's also a way of learn in public.",
    author: "Glenn Stovall",
    baseurl: "https://garden.glennstovall.com",
    eleventyComputed: {
      graph: (data) => {
        console.log(data)
        return data.collections.notes.length
      }
    }
}