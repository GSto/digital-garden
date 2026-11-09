# Tasks

## 1. Typeface CSS

- [ ] 1.1 In `assets/style.css`, set `body` to `"Gill Sans", "Gill Sans MT", Calibri, sans-serif`. Verify with `npm run compile` and by checking that `_site/assets/style.css` contains the rule.
- [ ] 1.2 In `assets/style.css`, give `.numeral`, `.sidenote:before` and `.sidenote-number:after` the same stack. Verify with `grep -n "et-book" assets/style.css`, which should return nothing, and with the compiled CSS containing all three selectors.

## 2. Verification

- [ ] 2.1 Serve `_site/` and use headless Chrome to load the home page and a note that has headings, a sidenote, inline code and backlinks, in light and dark mode. Verify these points:
  - Every visible non-code element has a computed font-family that starts with "Gill Sans".
  - The fonts CDP reports as rendered include Gill Sans.
  - `code` still computes to the Consolas stack.
- [ ] 2.2 Save light and dark screenshots of the home page and the note page to the scratchpad. Check that headings, italics, sidenote numbers and the subscribe link look right, and that no text overflows its column.

## 3. Pull request

- [ ] 3.1 Commit on branch `gill-sans`, push it, and open a PR against `main` with `gh pr create`. Verify that `gh pr view` shows the PR open with its Netlify deploy preview link.

## Workflow follow-up

- After the PR merges, run `/opsx:archive` to sync the `typography` spec into `openspec/specs/`.
