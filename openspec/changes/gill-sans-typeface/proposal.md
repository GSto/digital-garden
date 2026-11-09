# Proposal

## Why

The site sets all of its text in ET Book, Tufte CSS's default serif. Glenn wants the site in Gill Sans, the sans-serif that Tufte CSS recommends and already uses for its `.sans` class and table wrappers.

## What Changes

- Body text, headings, sidenotes, margin notes and the subscribe link render in Gill Sans, using the same fallback stack Tufte CSS gives `.sans`: `"Gill Sans", "Gill Sans MT", Calibri, sans-serif`.
- Sidenote numbers and `.numeral` elements, which currently force ET Book old-style figures, also switch to Gill Sans so no serif text is left on the page.
- Code and preformatted blocks keep their monospace stack.
- The ET Book font files and `@font-face` rules stay in place, unused. Browsers only download a web font when an element uses it, so they cost nothing and keep a revert to one line.
- Gill Sans is not a web font here. It is a system font on macOS and iOS and ships with Microsoft Office on Windows. Other visitors get Calibri or their default sans-serif. Licensing Gill Sans as a web font is out of scope.

## Capabilities

### New Capabilities
- `typography`: which typefaces the site uses for prose and for code, including fallbacks.

### Modified Capabilities

None.

## Impact

- `assets/style.css`: new font-family overrides.
- `assets/tufte.css`: unchanged; the overrides in `style.css` win because it loads second.
- No template, build or dependency changes.
