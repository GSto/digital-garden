# Design

## Context

`includes/head.html` loads normalize, then `assets/tufte.css`, then `assets/style.css`. In `tufte.css`:

- `body` sets ET Book with Palatino and Georgia fallbacks, and every prose element inherits it.
- `.numeral`, `.sidenote:before` and `.sidenote-number:after` set `et-book-roman-old-style` directly, so a body-only change leaves them in ET Book, which is the intended result.
- `code, pre > code` set their own monospace stack.

`style.css` sets no font-family today.

## Goals / Non-Goals

**Goals:**
- One font-family stack for all prose, defined once.
- A revert by deleting one block of CSS.

**Non-Goals:**
- Self-hosting or licensing Gill Sans as a web font.
- Re-tuning font sizes, line heights or the column layout. Gill Sans has a smaller x-height than ET Book. If text looks small after the switch, size changes go in a follow-up change.

## Decisions

1. **Override in `style.css` instead of editing `tufte.css`.** `style.css` loads last, so the same selectors win without `!important`. `tufte.css` stays close to upstream, and the site's own choices live in one file. The alternative, editing `tufte.css` in place, would mix site choices into vendored code.
2. **Use Tufte's own `.sans` stack:** `"Gill Sans", "Gill Sans MT", Calibri, sans-serif`. It matches the request, and Tufte CSS already tests it. The alternative, adding Trebuchet MS first as `div.table-wrapper` does, would show Trebuchet on Macs that have Gill Sans.
3. **Override only `body`, and leave `.numeral`, the sidenote counters and the `@font-face` rules alone.** Sidenote numbers and numerals keep ET Book old-style figures. Glenn chose this to keep Tufte's figures. Browsers only download the ET Book faces that some element uses, so the unused ones cost no bandwidth.
4. **Skip Tufte's `.03em` letter-spacing for `.sans`.** On `body` it would also spread code and the subscribe button. It can be added later as a visual tweak without a spec change.

## Risks / Trade-offs

- [Visitors on Android, Linux, or Windows without Office do not have Gill Sans] → they get Calibri or the system sans-serif. The spec covers this by requiring a sans-serif fallback, not Gill Sans itself.
- [Italic h2 and h3 headings may use a synthesised italic if a system lacks Gill Sans Italic] → accepted; macOS ships Gill Sans Italic.
- [ET Book sidenote numbers next to Gill Sans text may look mismatched in size or baseline] → check this in the screenshots during verification.

## Migration Plan

Merge the PR, and Netlify deploys the change. To roll back, revert the commit or delete the font block in `style.css`.
