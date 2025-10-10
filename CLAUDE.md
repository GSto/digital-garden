# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal digital garden built with [Eleventy (11ty)](https://www.11ty.dev/), featuring Roam-style double-bracket links, backlinks, and hover cards. It uses [Tufte CSS](https://edwardtufte.github.io/tufte-css/) for typography and styling, which emphasizes readable typography and sidenotes.

## Development Commands

```bash
npm start           # Start development server with live reload
npm run compile     # Build site to _site/ directory
npm run random      # Run random note script
```

## Architecture

### Directory Structure

- `notes/` - Markdown files for individual notes (the main content)
- `pages/` - Standalone pages outside the notes system
- `layouts/` - HTML templates (`default.html`, `note.html`, `page.html`)
- `includes/` - Reusable template partials (backlinks, head, etc.)
- `lib/` - Core utilities and markdown plugins
- `_data/` - Data files for site metadata and note organization
- `assets/` - CSS files (style.css, tufte.css) and static assets
- `_site/` - Generated output (git-ignored)

### Key Systems

**Wiki-style Linking** (.eleventy.js:19-28)
- Double-bracket syntax `[[note-name]]` or `[[note-name|display text]]` creates internal links
- Links automatically point to `/notes/{slug}/`
- Handled by custom markdown-it plugin

**Backlinks System** (_data/noteIndex.js, includes/backlinks.html)
- Tracks bidirectional links between notes
- Uses `getOutboundLinks()` in lib/notes.js to parse wiki-links from content
- Backlinks appear at bottom of each note

**Note Organization and Homepage** (_data/noteIndex.js)
- **Controls the primary note index page (homepage)**
- Displays notes organized into topics with three-column layout: leftColumn, centerColumn, rightColumn
- Each topic has title, optional description, and array of notes
- Notes can have nested children for hierarchical organization
- To add/remove notes from homepage or reorganize topics, edit this file

**Custom Markdown Plugins** (lib/)
- `markdownSectionWrapper.js` - Wraps sections for styling
- `markdownSidenote.js` - Converts syntax to Tufte-style sidenotes
- `markdownSubtitle.js` - Handles subtitle formatting
- `markdown-it-footnote` - Footnote support (Tufte-style)

## Styling Guidelines

**Never use inline styles.** Always define CSS in stylesheets and apply classes.

**Dark Mode:** Both `tufte.css` and `style.css` have `@media (prefers-color-scheme: dark)` blocks. When adding styles that involve colors, ensure dark mode is addressed.

**Tufte CSS Customizations:**
- Blockquotes automatically wrapped in `<div class="epigraph">` (.eleventy.js:34-40)
- Uses specialized classes: `.sidenote`, `.marginnote`, `.fullwidth`, `.newthought`

## Note Style Guide

**Full style guide at:** `notes/note style guide.md`

When editing markdown files in `notes/`:

### Titles and Structure
- **Note titles should be sentence-like** to show they express a single idea
  - Good: `indexing as a practice`
  - Bad: `writing`
- **Use lowercase** unless containing proper nouns
  - Good: `# the main title`, `## further reading`
  - Bad: `# The Main Title`, `## Links`
- **Headers are hierarchical:** H1 for page title, H2 for sections, H3 for subsections (max 3 levels deep)

### Content Guidelines
- **Prefer paragraphs over bullets** - Bullets are fine for lists, but shouldn't be the default
- **Prefer numbered lists over bulleted lists** - Easier to reference specific points
- **Link generously** - Include both internal wiki-links and external sources
  - Good: `this article about [learning to exercise agency](url)`
  - Bad: `learn to exercise agency: [link](url)` or `[this article](url) about...`
- **Include MLA formatted citations** when referencing sources (adds academic rigor)
- **Use "Further reading"** for link sections at the bottom (not "Links" or "Appendix")

### Writing Quality
- **Avoid fluff words:** just, that, very, really, literally, actually, certainly, probably, basically
- **General proofreading:** Use correct spelling, grammar, and punctuation even though notes are "rough drafts"

## Site Configuration

- Site metadata in `_data/site.js` (title, author, baseurl)
- Note index/organization in `_data/noteIndex.js`
- Google Analytics configuration in `includes/googleAnalytics.html`
