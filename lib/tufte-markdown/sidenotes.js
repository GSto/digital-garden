const MARGIN_LABEL = /^margin/;

function collectNoteContent(tokens, start) {
  const children = [];
  let i = start + 1;
  for (; tokens[i].type !== "footnote_close"; i++) {
    if (tokens[i].type !== "inline") continue;
    if (children.length > 0) children.push(new tokens[i].constructor("tufte_note_break", "br", 0));
    children.push(...tokens[i].children);
  }
  return { children, end: i };
}

function extractNotes(state) {
  const start = state.tokens.findIndex((t) => t.type === "footnote_block_open");
  if (start === -1) return null;
  const end = state.tokens.findIndex((t, i) => i > start && t.type === "footnote_block_close");
  const notes = new Map();
  for (let i = start + 1; i < end; i++) {
    if (state.tokens[i].type !== "footnote_open") continue;
    const { children, end: close } = collectNoteContent(state.tokens, i);
    notes.set(state.tokens[i].meta.id, children);
    i = close;
  }
  state.tokens.splice(start, end - start + 1);
  return notes;
}

function sidenotes(md) {
  md.core.ruler.push("tufte_sidenotes", (state) => {
    const notes = extractNotes(state);
    if (!notes) return;
    const counters = { sidenote: 0, margin: 0 };
    for (const block of state.tokens) {
      if (block.type !== "inline") continue;
      block.children = block.children.map((child) => {
        if (child.type !== "footnote_ref") return child;
        const kind = MARGIN_LABEL.test(child.meta.label || "") ? "margin" : "sidenote";
        counters[kind] += 1;
        const note = new state.Token("tufte_note", "span", 0);
        note.meta = {
          kind,
          id: `${kind === "margin" ? "mn" : "sn"}-${counters[kind]}`,
          children: notes.get(child.meta.id) || [],
        };
        return note;
      });
    }
  });

  md.renderer.rules.tufte_note = (tokens, idx, options, env, self) => {
    const { kind, id, children } = tokens[idx].meta;
    const content = self.renderInline(children, options, env);
    if (kind === "margin") {
      return `<label for="${id}" class="margin-toggle">&#8853;</label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="marginnote">${content}</span>`;
    }
    return `<label for="${id}" class="margin-toggle sidenote-number"></label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="sidenote">${content}</span>`;
  };

  md.renderer.rules.tufte_note_break = () => "<br>";
}

module.exports = { sidenotes };
