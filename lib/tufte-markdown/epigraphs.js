const DASH = /^(?:--|—|- )\s*/;

function startsWithDash(children) {
  return children.length > 0 && children[0].type === "text" && DASH.test(children[0].content);
}

function stripDash(children) {
  const [first, ...rest] = children;
  first.content = first.content.replace(DASH, "");
  return first.content ? [first, ...rest] : rest;
}

function citationFromParagraph(tokens, open, close) {
  if (tokens[close - 1].type !== "paragraph_close") return null;
  const inline = tokens[close - 2];
  const children = inline.children;
  const lastBreak = children.map((c) => c.type).lastIndexOf("softbreak");
  if (lastBreak > 0) {
    const tail = children.slice(lastBreak + 1);
    if (!startsWithDash(tail)) return null;
    inline.children = children.slice(0, lastBreak);
    return { children: stripDash(tail), remove: [] };
  }
  const paragraphOpen = close - 3;
  if (lastBreak === -1 && paragraphOpen > open + 1 && startsWithDash(children)) {
    return { children: stripDash(children), remove: [paragraphOpen, close] };
  }
  return null;
}

function citationFromList(tokens, open, close) {
  const listClose = close - 1;
  if (tokens[listClose].type !== "bullet_list_close" || tokens[listClose].markup !== "-") return null;
  let listOpen = listClose - 1;
  while (!(tokens[listOpen].type === "bullet_list_open" && tokens[listOpen].level === tokens[listClose].level)) listOpen--;
  if (listOpen <= open + 1) return null;
  const items = tokens.slice(listOpen, listClose).filter((t) => t.type === "list_item_open" && t.level === tokens[listOpen].level + 1);
  const inlines = tokens.slice(listOpen, listClose).filter((t) => t.type === "inline");
  if (items.length !== 1 || inlines.length !== 1) return null;
  return { children: inlines[0].children, remove: [listOpen, close] };
}

function epigraphs(md) {
  md.core.ruler.push("tufte_epigraphs", (state) => {
    const tokens = state.tokens;
    const opens = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "blockquote_open") opens.push(i);
      if (tokens[i].type !== "blockquote_close") continue;
      const open = opens.pop();
      const citation = citationFromParagraph(tokens, open, i) || citationFromList(tokens, open, i);
      if (!citation) continue;
      const token = new state.Token("tufte_citation", "footer", 0);
      token.children = citation.children;
      token.block = true;
      if (citation.remove.length) {
        const [from, to] = citation.remove;
        tokens.splice(from, to - from, token);
        i = from + 1;
      } else {
        tokens.splice(i, 0, token);
        i += 1;
      }
    }
  });

  md.renderer.rules.blockquote_open = () => '<div class="epigraph"><blockquote>';
  md.renderer.rules.blockquote_close = () => "</blockquote></div>";
  md.renderer.rules.tufte_citation = (tokens, idx, options, env, self) =>
    `<footer>${self.renderInline(tokens[idx].children, options, env)}</footer>\n`;
}

module.exports = { epigraphs };
