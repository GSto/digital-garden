// Sidenote plugin for markdown-it
function sidenotePlugin(md) {
  let sidenoteCounter = 0;
  const SIDENOTE_REGEX = /\^\[([^\]]+)\]/;

  function tokenizeSidenote(state, silent) {
    if (silent) return false;
    
    const match = SIDENOTE_REGEX.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const id = `sn-${sidenoteCounter++}`;
      const content = match[1];
      
      // Create label token
      const labelToken = state.push('sidenote_label_open', 'label', 1);
      labelToken.attrs = [
        ['for', id],
        ['class', 'margin-toggle sidenote-number']
      ];
      state.push('sidenote_label_close', 'label', -1);

      // Create input token
      const inputToken = state.push('sidenote_input', 'input', 0);
      inputToken.attrs = [
        ['type', 'checkbox'],
        ['id', id],
        ['class', 'margin-toggle']
      ];

      // Create span token for sidenote content
      const spanToken = state.push('sidenote_span_open', 'span', 1);
      spanToken.attrs = [['class', 'sidenote']];
      
      // Parse the content as markdown
      // We create a child instance to parse the nested content
      const contentToken = state.push('sidenote_content', '', 0);
      contentToken.content = content;

      state.push('sidenote_span_close', 'span', -1);
    }

    state.pos += match[0].length;
    return true;
  }

  // Register rule
  md.inline.ruler.before('emphasis', 'sidenote', tokenizeSidenote);

  // Add render rules
  md.renderer.rules.sidenote_label_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<label ${attrs}></label>`;
  };

  md.renderer.rules.sidenote_input = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<input ${attrs}>`;
  };

  md.renderer.rules.sidenote_span_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<span ${attrs}>`;
  };

  // Add special handler for sidenote content to process nested markdown
  md.renderer.rules.sidenote_content = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // Parse the content as markdown using a child instance
    return md.renderInline(token.content, options, env);
  };
}

module.exports = { sidenotePlugin };