const {sectionWrapperPlugin} = require('./lib/markdownSectionWrapper.js');
const {sidenotePlugin} = require('./lib/markdownSidenote.js');
const {subtitlePlugin} = require('./lib/markdownSubtitle.js');

module.exports = function (eleventyConfig) {
  const markdownIt = require("markdown-it");
  const markdownItOptions = {
    html: true,
    linkify: true,
  };

  const md = markdownIt(markdownItOptions)
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-attrs"))
    .use(sectionWrapperPlugin)
    .use(sidenotePlugin)
    .use(subtitlePlugin)
    .use(function (md) {
      // Recognize Mediawiki links ([[text]])
      md.linkify.add("[[", {
        validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
        normalize: (match) => {
          const parts = match.raw.slice(2, -2).split("|");
          parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
          match.text = (parts[1] || parts[0]).trim();
          match.url = `/notes/${parts[0].trim()}/`;
        },
      });
    });

    // Tufte.css customizations

    // wrap blockquotes in an epigraph div
    md.renderer.rules.blockquote_open = function(tokens, idx, options, env, self) {
      return '<div class="epigraph"><blockquote>';
    };
  
    md.renderer.rules.blockquote_close = function(tokens, idx, options, env, self) {
      return '</blockquote></div>';
    };
  

    eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("markdownify", (string) => {
    return md.render(string);
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob(["notes/**/*.md"]);
  });

  eleventyConfig.addCollection("pages", function (collection) {
    return collection.getFilteredByGlob(["pages/**/*.md"]);
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("library");

  // backwards compatibility. Eleventy 1.0.0 changed the default from false -> true
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  return {
    useGitIgnore: false,
    dir: {
      input: "./",
      output: "_site",
      layouts: "layouts",
      includes: "includes",
      data: "_data",
    },
    passthroughFileCopy: true,
  };
};
