# Tasks

## 1. Baseline and scaffold

- [x] 1.1 Build the current `main` into `<scratchpad>/tufte-baseline/_site` and screenshot the `storytelling`, `McLeod Hierarchy` and `evergreen memes` notes in light mode. Verify that the folder holds 142 written pages and the 3 PNGs exist.
- [x] 1.2 Create `lib/tufte-markdown/` with:
  - `package.json`: private; test script `node --test test/`; dependencies `markdown-it-footnote` and `markdown-it-attrs`; peer dependency `markdown-it`.
  - `index.js`: registers footnote and attrs.
  - An empty `README.md`.
  - The root `package.json` `"test"` script.

  Verify that `npm test` runs and reports 0 failures.

## 2. Sections and subtitles move

- [x] 2.1 Move `markdownSectionWrapper.js` and `markdownSubtitle.js` into the module as `sections.js` and `subtitle.js`, unchanged. Register them from `index.js`, add tests for h2 sectioning and `#:` subtitles, and document both in the README. Verify that `npm test` passes.

## 3. Sidenotes and margin notes

- [x] 3.1 Implement `sidenotes.js` (the core rule after `footnote_tail`, `tufte_note` rendering and per-render ids). Add tests for every scenario in the `sidenotes` spec except the small-screen one:
  - footnote to sidenote, with no footnote block
  - reading-order DOM order
  - inline `^[ ]` containing a link
  - margin labels
  - undefined reference
  - two renders give identical output

  Verify that `npm test` passes.
- [x] 3.2 Document sidenote and margin note syntax in the module README, with one example each. Verify that every example in the README renders through the plugin as its documented output, using a test that reads the README code blocks.

## 4. Epigraphs

- [x] 4.1 Implement `epigraphs.js` (the epigraph wrapper and citation extraction for the three dash forms). Add tests for every `epigraphs` spec scenario: `--`, `—`, `- ` as a list, Markdown in a citation, a quoted two-item list, `<footer>` HTML, and a dash-only quote. Document the syntax in the README. Verify that `npm test` passes.

## 5. Figures and quilts

- [x] 5.1 Implement `figures.js` (regular, `{.fullwidth}` and `{.margin}` figures, title as caption, inline images untouched). Add tests for every `figures` scenario that doesn't need a browser, and document the syntax in the README. Verify that `npm test` passes.
- [ ] 5.2 Implement `quilts.js` and `tufte-markdown.css`: grid, full-width variant, caption reset, and a narrow-screen rule. Add tests for a three-image quilt, `quilt fullwidth`, stray text, an empty quilt and a non-quilt fence. Document the syntax in the README. Verify that `npm test` passes.

## 6. Site wiring and content

- [ ] 6.1 In `.eleventy.js`, replace the footnote, attrs, sidenote, section and subtitle `.use()` calls and the blockquote overrides with `.use(require("./lib/tufte-markdown"))`. Passthrough-copy the CSS to `/assets/tufte-markdown.css`, link it in `includes/head.html` between `tufte.css` and `style.css`, and delete the three old `lib/markdown*.js` files. Verify with `npm run compile`, which must write 142 pages with no errors, and `grep -rn "markdownSidenote\|markdownSectionWrapper\|markdownSubtitle" .eleventy.js lib`, which must return nothing.
- [ ] 6.2 Convert the `>[ ]` margin note in `notes/adages.md:47` to `[^margin-cobra]` with a definition. Verify that `grep -n '>\[' notes/*.md` shows matches only inside code fences in `tufte integration.md`.
- [ ] 6.3 Rewrite the syntax sections of `notes/tufte integration.md`:
  - Sidenotes, margin notes, epigraph citations, figures, a margin figure and a quilt, using existing `assets/images`.
  - Update the "Future development" list.

  Show Glenn the full diff before committing, because this is his note. Verify that the note builds and every example renders.
- [ ] 6.4 Update CLAUDE.md's "Custom Markdown Plugins" section to point at `lib/tufte-markdown/` and its README. Verify that every path it names exists.

## 7. Integration checks

- [ ] 7.1 Diff the new `_site` against the baseline from 1.1. Verify that every changed page is explained by one of these:
  - figures
  - the adages margin note
  - the `effectual reasoning` citation
  - the tufte integration rewrite
  - the CSS link in the head

  Verify too that section and subtitle markup is unchanged on a note with h2s and `#:`.
- [ ] 7.2 Build twice and verify with `diff -r` that the two `_site` folders are byte-identical.
- [ ] 7.3 In headless Chrome, at 1280px and 375px wide, in light and dark mode, load `tufte integration`, `adages` and `effectual reasoning`. Verify the following and save screenshots:
  - Sidenote numbers count 1, 2, 3 in order.
  - Margin notes have no number.
  - Number and ⊕ toggles reveal notes at 375px.
  - The citation is right-aligned in a footer.
  - Full-width and margin figures sit where the spec says.
  - The quilt is a grid with captions that reflows at 375px.
  - The page doesn't scroll horizontally.
- [ ] 7.4 Compare the 3 image-heavy notes against the 1.1 baseline screenshots. Verify that the image sizes and positions match, or that any difference is listed in the PR.
- [ ] 7.5 Commit, push the `tufte-markdown` branch and open a PR against `main`. Verify that `gh pr view` shows it open and the Netlify deploy preview succeeds.

## Workflow follow-up

- After the PR merges, run `/opsx:archive` to add the `sidenotes`, `epigraphs`, `figures` and `tufte-markdown-module` specs to `openspec/specs/`.
- Package extraction (name, publishing, markdown-it 14 support) is a future change.
