function soleImage(inline) {
  const meaningful = inline.children.filter((c) => !(c.type === "text" && c.content.trim() === ""));
  return meaningful.length === 1 && meaningful[0].type === "image" ? meaningful[0] : null;
}

function takeAttr(token, name) {
  const value = token.attrGet(name);
  token.attrs = (token.attrs || []).filter(([key]) => key !== name);
  return value;
}

function splitClasses(image) {
  const classes = (takeAttr(image, "class") || "").split(/\s+/).filter(Boolean);
  const rest = classes.filter((c) => c !== "fullwidth" && c !== "margin");
  if (rest.length) image.attrSet("class", rest.join(" "));
  if (classes.includes("margin")) return "margin";
  if (classes.includes("fullwidth")) return "fullwidth";
  return "regular";
}

function figures(md) {
  md.core.ruler.push("tufte_figures", (state) => {
    const tokens = state.tokens;
    let marginCount = 0;
    for (let i = 0; i + 2 < tokens.length; i++) {
      const [open, inline, close] = tokens.slice(i, i + 3);
      if (open.type !== "paragraph_open" || open.hidden || inline.type !== "inline" || close.type !== "paragraph_close") continue;
      const image = soleImage(inline);
      if (!image) continue;
      const kind = splitClasses(image);
      const figure = new state.Token("tufte_figure", "figure", 0);
      figure.block = true;
      figure.meta = { kind, image, caption: takeAttr(image, "title") };
      if (kind === "margin") figure.meta.id = `mf-${++marginCount}`;
      tokens.splice(i, 3, figure);
    }
  });

  md.renderer.rules.tufte_figure = (tokens, idx, options, env, self) => {
    const { kind, image, caption, id } = tokens[idx].meta;
    const img = self.renderInline([image], options, env);
    const text = caption ? md.utils.escapeHtml(caption) : "";
    if (kind === "margin") {
      const body = text ? `${img}<br>${text}` : img;
      return `<p><label for="${id}" class="margin-toggle">&#8853;</label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="marginnote">${body}</span></p>\n`;
    }
    const figcaption = text ? `<figcaption>${text}</figcaption>` : "";
    const cls = kind === "fullwidth" ? ' class="fullwidth"' : "";
    return `<figure${cls}>${img}${figcaption}</figure>\n`;
  };
}

module.exports = { figures };
