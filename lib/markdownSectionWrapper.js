// Create a plugin for markdown-it
function sectionWrapperPlugin(md) {
  // We'll need to run this after the markdown is parsed but before it's rendered
  md.core.ruler.push('section_wrapper', state => {
    const tokens = state.tokens;
    let newTokens = [];
    let isInSection = false;

    // Helper function to create section tokens
    const createSectionToken = (type) => {
      const token = new state.Token('section_' + type, 'section', type === 'open' ? 1 : -1);
      token.block = true;
      return token;
    };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // If we find an h2 opening tag
      if (token.type === 'heading_open' && token.tag === 'h2') {
        // If we're already in a section, close it
        if (isInSection) {
          newTokens.push(createSectionToken('close'));
        }
        
        // Start a new section
        newTokens.push(createSectionToken('open'));
        isInSection = true;
      }

      // Add the current token
      newTokens.push(token);

      // If we're at the end and we're in a section, close it
      if (i === tokens.length - 1 && isInSection) {
        newTokens.push(createSectionToken('close'));
      }
    }

    // Replace the tokens array with our new one
    state.tokens = newTokens;
    return true;
  });
}

module.exports = { 
  sectionWrapperPlugin
}