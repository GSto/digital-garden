# Tasks

## 1. Typeface CSS

- [x] 1.1 In `assets/style.css`, set `body` to `"Gill Sans", "Gill Sans MT", Calibri, sans-serif`. Verify with `npm run compile` and by checking that `_site/assets/style.css` contains the rule and that `assets/tufte.css` is unchanged (`git diff --quiet assets/tufte.css`).

## 2. Verification

- [x] 2.1 Serve `_site/` and use headless Chrome to load the home page and a note that has headings, a sidenote, inline code and backlinks, in light and dark mode. Verify these points:
  - Every visible non-code element other than numerals has a computed font-family that starts with "Gill Sans".
  - Sidenote numbers, the `::after` and `::before` pseudo-elements, compute to `et-book-roman-old-style`.
  - The fonts CDP reports as rendered include Gill Sans.
  - `code` still computes to the Consolas stack.
- [x] 2.2 Save light and dark screenshots of the home page and the note page to the scratchpad. Check that headings, italics, sidenote numbers and the subscribe link look right, and that no text overflows its column.

## 3. Pull request

- [x] 3.1 Commit on branch `gill-sans`, push it, and open a PR against `main` with `gh pr create`. Verify that `gh pr view` shows the PR open with its Netlify deploy preview link.

## Workflow follow-up

- After the PR merges, run `/opsx:archive` to sync the `typography` spec into `openspec/specs/`.
