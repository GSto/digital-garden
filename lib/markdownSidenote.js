// Combined plugin for sidenotes and margin notes
function sidenotePlugin(md) {
  let sidenoteCounter = 0;
  
  // Regex for both types of notes
  const SIDENOTE_REGEX = /\^\[([^\]]+)\]/;  // ^[Your sidenote text]
  const MARGINNOTE_REGEX = />\[([^\]]+)\]/;  // >[Your margin note text]

  function tokenizeSidenote(state, silent) {
    if (silent) return false;
    
    const match = SIDENOTE_REGEX.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const id = `sn-${sidenoteCounter++}`;
      createNoteTokens(state, match[1], id, true);
    }

    state.pos += match[0].length;
    return true;
  }

  function tokenizeMarginnote(state, silent) {
    if (silent) return false;
    
    const match = MARGINNOTE_REGEX.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const id = `mn-${Math.random().toString(36).substr(2, 9)}`;
      createNoteTokens(state, match[1], id, false);
    }

    state.pos += match[0].length;
    return true;
  }

  function createNoteTokens(state, content, id, isSidenote) {
    // Create label token
    const labelToken = state.push('note_label_open', 'label', 1);
    labelToken.attrs = [
      ['for', id],
      ['class', `margin-toggle${isSidenote ? ' sidenote-number' : ''}`]
    ];
    
    // Add symbol for margin notes
    if (!isSidenote) {
      const symbolToken = state.push('text', '', 0);
      symbolToken.content = '⊕';
    }
    
    state.push('note_label_close', 'label', -1);

    // Create input token
    const inputToken = state.push('note_input', 'input', 0);
    inputToken.attrs = [
      ['type', 'checkbox'],
      ['id', id],
      ['class', 'margin-toggle']
    ];

    // Create span token for note content
    const spanToken = state.push('note_span_open', 'span', 1);
    spanToken.attrs = [['class', isSidenote ? 'sidenote' : 'marginnote']];
    
    // Parse the content as markdown
    const contentToken = state.push('note_content', '', 0);
    contentToken.content = content;

    state.push('note_span_close', 'span', -1);
  }

  // Register rules
  md.inline.ruler.before('emphasis', 'sidenote', tokenizeSidenote);
  md.inline.ruler.before('emphasis', 'marginnote', tokenizeMarginnote);

  // Add render rules
  md.renderer.rules.note_label_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<label ${attrs}>`;
  };

  md.renderer.rules.note_input = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<input ${attrs}>`;
  };

  md.renderer.rules.note_span_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = token.attrs.map(([name, value]) => `${name}="${value}"`).join(' ');
    return `<span ${attrs}>`;
  };

  md.renderer.rules.note_content = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    return md.renderInline(token.content, options, env);
  };
}


module.exports = { sidenotePlugin };