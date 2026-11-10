const TurndownService = require("turndown");
const { rewriteHref } = require("./links");
const { imageTarget } = require("./images");

const SECTION_TYPES = {
  "At the Edges": "at the edges",
  "Product Thinking Book": "product thinking",
  "Root Nodes": "articles",
};

const REMOVED_CLASSES = ["subscription-widget-wrap", "subscription-widget-wrap-editor", "button-wrapper", "captioned-button-wrap", "image-link-expand"];
const REMOVED_TAGS = ["FORM", "BUTTON", "INPUT", "SVG"];

function hasClass(node, name) {
  return (node.getAttribute?.("class") || "").split(/\s+/).includes(name);
}

function dataAttrs(node) {
  try {
    return JSON.parse(node.getAttribute("data-attrs") || "{}");
  } catch {
    return {};
  }
}

function escapeHref(href) {
  return href.replace(/[()\s]/g, (c) => encodeURIComponent(c));
}

function escapeTitle(text) {
  return text.replace(/\s+/g, " ").trim().replace(/["\\]/g, "\\$&");
}

function escapeAlt(text) {
  return text.replace(/\s+/g, " ").trim().replace(/[\[\]\\]/g, "\\$&");
}

function block(text) {
  return `\n\n${text}\n\n`;
}

function postType(post) {
  const type = SECTION_TYPES[post.section_name];
  if (!type) throw new Error(`Post "${post.slug}" is in section "${post.section_name}", which has no post type mapping`);
  return type;
}

function blogchains(post) {
  return (post.postTags || []).map((tag) => tag.name);
}

function frontMatter(fields) {
  const lines = ["---"];
  for (const [key, value] of fields) {
    if (value === undefined || value === null || value === "") continue;
    lines.push(`${key}: ${key === "date" ? value : JSON.stringify(value)}`);
  }
  lines.push("---");
  return lines.join("\n");
}

function embedLink(node, slugs) {
  if (hasClass(node, "twitter-embed")) {
    const { url, name, username } = dataAttrs(node);
    if (!url) throw new Error("Tweet embed has no URL");
    return block(`[Post by ${escapeAlt(name || username || "unknown")}${username ? ` (@${username})` : ""}](${escapeHref(url)})`);
  }
  if (hasClass(node, "digest-post-embed")) {
    const { canonical_url: url, title } = dataAttrs(node);
    if (!url) throw new Error("Embedded post has no URL");
    return block(`[${escapeAlt(title || url)}](${escapeHref(rewriteHref(url, slugs))})`);
  }
  return null;
}

function createConverter({ slug, slugs, images, footnotes }) {
  const addImage = (src) => {
    const target = imageTarget(src, slug);
    if (!images.some((image) => image.file === target.file)) images.push(target);
    return target.sitePath;
  };

  const service = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    blankReplacement: (content, node) => embedLink(node, slugs) ?? (node.isBlock ? "\n\n" : ""),
  });

  service.addRule("links", {
    filter: (node) => node.nodeName === "A" && node.getAttribute("href") && !hasClass(node, "footnote-anchor") && !hasClass(node, "footnote-number"),
    replacement: (content, node) => (content.trim() ? `[${content}](${escapeHref(rewriteHref(node.getAttribute("href"), slugs))})` : ""),
  });

  service.addRule("images", {
    filter: "img",
    replacement: (content, node) => {
      const src = dataAttrs(node).src || node.getAttribute("src");
      return src ? `![${escapeAlt(node.getAttribute("alt") || "")}](${addImage(src)})` : "";
    },
  });

  service.addRule("strikethrough", {
    filter: ["s", "del", "strike"],
    replacement: (content) => `~~${content}~~`,
  });

  service.addRule("preformattedText", {
    filter: (node) => node.nodeName === "PRE" && !node.querySelector("code"),
    replacement: (content, node) => {
      Array.from(node.querySelectorAll("label")).forEach((label) => label.parentNode.removeChild(label));
      return block(`<pre>${node.innerHTML}</pre>`);
    },
  });

  service.addRule("iframes", {
    filter: "iframe",
    replacement: (content, node) => (node.getAttribute("src") ? block(`[Embedded media](${escapeHref(node.getAttribute("src"))})`) : ""),
  });

  service.addRule("pullquotes", {
    filter: (node) => hasClass(node, "pullquote"),
    replacement: (content) => block(content.trim().replace(/^/gm, "> ")),
  });

  service.addRule("youtube", {
    filter: (node) => hasClass(node, "youtube-wrap"),
    replacement: (content, node) => {
      const { videoId } = dataAttrs(node);
      if (!videoId) throw new Error("YouTube embed has no video id");
      return block(`[Watch on YouTube](https://www.youtube.com/watch?v=${videoId})`);
    },
  });

  service.addRule("embeds", {
    filter: (node) => hasClass(node, "twitter-embed") || hasClass(node, "digest-post-embed"),
    replacement: (content, node) => embedLink(node, slugs),
  });

  service.addRule("captionedImages", {
    filter: (node) => hasClass(node, "captioned-image-container"),
    replacement: (content, node) => {
      const img = node.querySelector("img");
      if (!img) return "";
      const attrs = dataAttrs(img);
      const src = attrs.src || img.getAttribute("src");
      const alt = escapeAlt(img.getAttribute("alt") || attrs.alt || "");
      const caption = node.querySelector("figcaption")?.textContent || "";
      const title = caption.trim() ? ` "${escapeTitle(caption)}"` : "";
      return block(`![${alt}](${addImage(src)}${title})`);
    },
  });

  service.addRule("footnoteAnchors", {
    filter: (node) => node.nodeName === "A" && hasClass(node, "footnote-anchor"),
    replacement: (content, node) => `[^${node.textContent.trim()}]`,
  });

  service.addRule("footnoteNumbers", {
    filter: (node) => node.nodeName === "A" && hasClass(node, "footnote-number"),
    replacement: () => "",
  });

  service.addRule("footnotes", {
    filter: (node) => hasClass(node, "footnote"),
    replacement: (content, node) => {
      const number = node.querySelector(".footnote-number")?.textContent.trim();
      if (!number) throw new Error("Footnote has no number");
      footnotes.push(`[^${number}]: ${content.trim().replace(/\n(?=.)/g, "\n    ")}`);
      return "";
    },
  });

  service.addRule("substackWidgets", {
    filter: (node) => REMOVED_TAGS.includes(node.nodeName.toUpperCase()) || REMOVED_CLASSES.some((name) => hasClass(node, name)),
    replacement: () => "",
  });

  return service;
}

function convertBody(html, { slug, slugs }) {
  const images = [];
  const footnotes = [];
  const body = createConverter({ slug, slugs, images, footnotes }).turndown(html || "");
  const markdown = [body.trim(), ...footnotes].filter(Boolean).join("\n\n");
  return { markdown, images };
}

function renderPost(post, slugs) {
  try {
    const { markdown, images } = convertBody(post.body_html, { slug: post.slug, slugs });
    const cover = post.cover_image ? imageTarget(post.cover_image, post.slug) : null;
    if (cover && !images.some((image) => image.file === cover.file)) images.push(cover);
    const header = frontMatter([
      ["title", post.title],
      ["subtitle", post.subtitle],
      ["date", post.post_date],
      ["substackUrl", post.canonical_url],
      ["substackId", post.id],
      ["postType", postType(post)],
      ["blogchains", blogchains(post)],
      ["coverImage", cover?.sitePath],
    ]);
    return { slug: post.slug, markdown: `${header}\n\n${markdown}\n`, images };
  } catch (error) {
    throw new Error(`Could not convert post "${post.slug}": ${error.message}`);
  }
}

module.exports = { SECTION_TYPES, postType, blogchains, frontMatter, convertBody, renderPost };
