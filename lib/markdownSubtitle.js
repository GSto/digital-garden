function subtitlePlugin(md) {
  // Define regex for subtitle syntax
  // Matches '#:' followed by any text (excluding newlines)
  const SUBTITLE_REGEX = /^#:\s*(.+)$/;

  function subtitleRule(state, startLine, endLine, silent) {
    // Get the line content
    const line = state.getLines(startLine, startLine + 1, 0, false).trim();
    
    // Try to match our subtitle pattern
    const match = SUBTITLE_REGEX.exec(line);
    if (!match) return false;

    // Return true if we're just testing for matching line
    if (silent) return true;

    // Create the tokens for the subtitle
    const token = state.push('subtitle', 'p', 0);
    token.markup = '#:';
    token.attrs = [['class', 'subtitle']];
    token.content = match[1].trim();
    token.map = [startLine, startLine + 1];
    
    // Move past this line
    state.line = startLine + 1;
    return true;
  }

  // Add our custom rule
  md.block.ruler.before('paragraph', 'subtitle', subtitleRule);

  // Add render rule
  md.renderer.rules.subtitle = (tokens, idx) => {
    const token = tokens[idx];
    return `<p class="subtitle">${md.utils.escapeHtml(token.content)}</p>`;
  };
}

module.exports = { subtitlePlugin};