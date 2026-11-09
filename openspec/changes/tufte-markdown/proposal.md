# Proposal

## Why

Notes can use only part of Tufte CSS today. Sidenotes and margin notes use custom syntax (`^[ ]` and `>[ ]`) with known bugs: a `]` inside a note cuts it short, and margin note ids are random on every build. Epigraph citations need hand-written `<footer>` HTML. Figures, margin figures and image quilts have no syntax at all. Glenn wants one Tufte-flavoured Markdown system, based on standard extended Markdown syntax wherever possible, built so it can later be published as its own npm package.

## What Changes

- Add a self-contained markdown-it plugin under `lib/tufte-markdown/`. It has no Eleventy or site imports, and the site registers it with a single `.use()`.
- **Sidenotes:** standard footnote syntax (`[^1]` with `[^1]: text`) renders as a numbered Tufte sidenote at the reference point, instead of a footnote list at the bottom of the page. The inline form `^[text]` stays and becomes a sidenote too.
- **Margin notes:** a footnote whose label starts with `margin` (`[^margin]`, `[^margin-tools]`) renders as an unnumbered margin note.
- **BREAKING:** the `>[text]` margin note syntax is removed. Its only uses, `notes/adages.md` and `notes/tufte integration.md`, are converted.
- **Epigraphs:** every blockquote still renders as an epigraph. A final line starting with `--`, `—` or `- ` becomes a `<footer>` citation. The 10 notes with hand-written `<footer>` tags keep working unchanged.
- **Figures:** an image alone in its paragraph becomes a `<figure>`, and its title becomes the caption. `{.fullwidth}` makes a full-width figure and `{.margin}` puts the figure in the margin.
- **Image quilts:** a ```` ```quilt ```` fenced block of images renders as a captioned grid. ```` ```quilt fullwidth ```` makes the grid full-width.
- The section wrapper (`<section>` per h2) and the `#:` subtitle plugins move into the module unchanged, because sidenote layout depends on sections.
- The notes that document this syntax, `notes/tufte integration.md` and CLAUDE.md, are updated.

## Capabilities

### New Capabilities
- `sidenotes`: numbered sidenotes and unnumbered margin notes written with footnote syntax.
- `epigraphs`: blockquotes rendered as Tufte epigraphs, with optional citations.
- `figures`: images rendered as regular, full-width or margin figures with captions, and image quilts.
- `tufte-markdown-module`: the plugin's boundary, meaning it is self-contained, has its own tests, and can be extracted as a package.

### Modified Capabilities

None. `wikilinks`, `backlinks`, `newsletter-signup` and `typography` keep their requirements.

## Impact

- **New:** `lib/tufte-markdown/` (plugin, tests, README).
- **Removed:** `lib/markdownSidenote.js`, `lib/markdownSectionWrapper.js`, `lib/markdownSubtitle.js`. Their behavior moves into the module.
- **Modified:**
  - `.eleventy.js`: one `.use()` replaces the footnote, sidenote, section and subtitle plugins and the blockquote override.
  - `assets/style.css`: adds quilt grid and figure caption styles for both colour schemes.
  - The content edits listed under What Changes.
- **Rendering changes:**
  - About 20 existing solitary images become `<figure>` elements. None has a title today, so none gets a caption.
  - The 1 note with a `> - ` attribution line gains a styled citation.
- **Dependencies:** none added. The module uses the markdown-it, markdown-it-footnote and markdown-it-attrs packages the site already has.
