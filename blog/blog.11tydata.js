module.exports = {
  layout: "post.html",
  type: "post",
  eleventyComputed: {
    permalink: (data) => `/blog/${data.page.fileSlug}/`,
  },
};
