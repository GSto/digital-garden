function quiltImages(md, content, env) {
  return content
    .split("\n")
    .filter((line) => line.trim())
    .flatMap((line) => md.parseInline(line, { ...env, footnotes: undefined })[0].children)
    .filter((token) => token.type === "image");
}

function quilts(md) {
  const fallback = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const [name, ...flags] = tokens[idx].info.trim().split(/\s+/);
    if (name !== "quilt") return fallback(tokens, idx, options, env, self);
    const images = quiltImages(md, tokens[idx].content, env);
    if (!images.length) return "";
    const items = images.map((image) => {
      const title = image.attrGet("title");
      image.attrs = image.attrs.filter(([key]) => key !== "title");
      const caption = title ? `<figcaption>${md.utils.escapeHtml(title)}</figcaption>` : "";
      return `<figure>${self.renderInline([image], options, env)}${caption}</figure>\n`;
    });
    const cls = flags.includes("fullwidth") ? "quilt fullwidth" : "quilt";
    return `<figure class="${cls}">\n${items.join("")}</figure>\n`;
  };
}

module.exports = { quilts };
