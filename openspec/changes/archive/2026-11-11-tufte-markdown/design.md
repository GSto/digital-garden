# Design

## Context

`.eleventy.js` builds one markdown-it 12.3.2 instance. Its pieces:

- **Plugins:** markdown-it-footnote 3.0.3, markdown-it-attrs 4.1.3, three local plugins (`lib/markdownSidenote.js`, `lib/markdownSectionWrapper.js`, `lib/markdownSubtitle.js`), and the wikilink linkify rule.
- **Epigraph override:** `blockquote_open` and `blockquote_close` render rules wrap every blockquote in `div.epigraph`.

Parser output checked against the installed versions:

- `[^a]` produces a `footnote_ref` token with `meta: {id, subId, label}`. `^[text]` produces a `footnote_ref` with `meta: {id}` and no label.
- markdown-it-footnote's `footnote_tail` core rule appends a `footnote_block` holding one `footnote_open … footnote_close` range per note. Each range contains paragraphs with inline children and a trailing `footnote_anchor`.
- `![](/x.png "Cap"){.fullwidth}` produces one paragraph whose inline token has a single `image` child, with `class="fullwidth"` set on the image.
- `> quote` followed by `> -- Name` produces one paragraph whose inline children are `text, softbreak, text`.
- `> - Danish folk saying` after quote text produces a `bullet_list` with one `-` item as the blockquote's last block.
- A ```` ```quilt ```` block produces a `fence` token with `info: "quilt"`.

The existing sidenote plugin is a regex inline rule. It has three problems:
- `[^\]]+` ends a note at the first `]`, so links inside notes break.
- Margin note ids are random.
- The sidenote counter is module-level, so it never resets between pages.

## Goals / Non-Goals

**Goals:**
- One CommonJS plugin under `lib/tufte-markdown/` that a later package can publish as is.
- Reuse markdown-it-footnote's parser instead of writing a new one.
- Deterministic output, with per-render counters and no randomness.

**Non-Goals:**
- Publishing to npm or choosing a package name. The module's `package.json` stays `"private": true`.
- New-thought small caps, `<hr>` section breaks, iframe wrappers, and wrapping documents that have no h2 in a section. Section behavior stays exactly as it is.
- Upgrading markdown-it to 14.
- Lists, tables or code inside sidenote definitions. Only paragraph content is supported, and multiple paragraphs are joined with `<br>`.

## Decisions

### Module layout

```
lib/tufte-markdown/
  package.json      private, test script, deps: markdown-it-footnote, markdown-it-attrs; peer: markdown-it
  index.js          plugin entry: registers footnote + attrs, then each feature
  sidenotes.js      footnote_ref -> sidenote / margin note
  epigraphs.js      blockquote wrapping + citation extraction
  figures.js        solitary image -> figure (regular, fullwidth, margin)
  quilts.js         ```quilt fence -> grid figure
  sections.js       moved from markdownSectionWrapper.js, unchanged
  subtitle.js       moved from markdownSubtitle.js, unchanged
  tufte-markdown.css  quilt grid + caption rules, light and dark
  README.md         syntax reference
  test/*.test.js    node:test, one file per feature, string fixtures
```

The plugin registers markdown-it-footnote and markdown-it-attrs itself, which is what makes one `.use()` call enough. `.eleventy.js` drops its own footnote and attrs `.use()` calls so they don't register twice. Alternative considered: the host registers them. That leaves a hidden setup step that a package user would get wrong.

### Sidenotes: rewrite footnote tokens after `footnote_tail`

A core rule placed after `footnote_tail` does four things:
1. Reads each `footnote_open … footnote_close` range from the footnote block. It keeps the inline children of its paragraphs and drops `footnote_anchor`.
2. Deletes the whole `footnote_block`.
3. Replaces each `footnote_ref` inline token with a `tufte_note` token that carries the note's kind and its inline children.
4. Assigns ids from a per-render counter on `state.env`: `sn-1, sn-2…` for sidenotes and `mn-1…` for margin notes.

A note is a margin note when its `meta.label` starts with `margin`. Inline `^[…]` notes have no label, so they are always sidenotes.

The renderer emits Tufte CSS's documented markup:
- Sidenote: `<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/><span class="sidenote">…</span>`
- Margin note: the same, with a `⊕` label and a `marginnote` span.

Sidenote numbers come from Tufte CSS's `sidenote-counter`. It counts in document order, which gives reading-order numbering, and margin notes don't increment it.

A label referenced twice renders its note at both places. This was chosen over a number-only second reference, which would break the CSS counter.

Alternative considered: keep a regex inline rule. Rejected because it can't handle nested brackets without reimplementing the footnote parser.

### Epigraphs: core rule over blockquote ranges

`blockquote_open` and `blockquote_close` keep rendering `<div class="epigraph"><blockquote>` and `</blockquote></div>`. A core rule visits each blockquote's last block and handles three citation forms:

1. **Paragraph whose last line starts with a dash:** the children after its last `softbreak` start with a text token beginning `--`, `—` or `- `. Those children move into a `tufte_citation` token, and the dash and spaces are stripped from the first text token.
2. **Whole paragraph that is a dash line:** the same, using the entire paragraph.
3. **Single-item `-` bullet list as the last block, after other content:** the list's inline content becomes the citation, and the list tokens are removed.

The citation renders as `<footer>…</footer>` before `</blockquote>`, with inline Markdown rendered.

A blockquote with nothing before the dash line produces no citation, so it can't end up as an empty quote. Hand-written `<footer>` HTML passes through unchanged as before.

### Figures

A core rule finds paragraphs whose inline token has exactly one child of type `image`, ignoring surrounding whitespace text. It replaces the paragraph with a `tufte_figure` token. The class on the image decides the output:

- **No class:** `<figure><img …><figcaption>title</figcaption></figure>`. Tufte CSS already floats `figcaption` into the margin.
- **`fullwidth`:** `<figure class="fullwidth">…</figure>`. Tufte's `figure.fullwidth figcaption` puts the caption below.
- **`margin`:** `<p><label for="mf-1" class="margin-toggle">⊕</label><input type="checkbox" id="mf-1" class="margin-toggle"/><span class="marginnote"><img …><br>title</span></p>`. This is Tufte CSS's margin-figure markup, and its ids come from the same per-render counter.

The title is removed from the `<img>` so browsers don't also show it as a tooltip. The caption is omitted when there is no title. Any other attrs classes stay on the `<img>`.

### Quilts

A `fence` render rule for `info` values that start with `quilt` parses each line with `md.parseInline` and keeps only `image` children. It emits:

```html
<figure class="quilt [fullwidth]">
  <figure><img …><figcaption>title</figcaption></figure>
  …
</figure>
```

If the block has no images, it emits an empty string. All other fences fall through to the default renderer.

`tufte-markdown.css` defines the grid:
- `.quilt` uses `display: grid` with `repeat(auto-fit, minmax(10rem, 1fr))`, and `.quilt figcaption` is not floated.
- Width follows Tufte figure widths: 55%, or 90% when full-width. Below 760px, `minmax(8rem, 1fr)` gives fewer columns.
- Caption colour inherits the body colour, so dark mode needs no extra rule.

Tufte CSS has no image-quilt styles, which is why this CSS is new.

### Site wiring

- `.eleventy.js` replaces its footnote, attrs, sidenote, section and subtitle `.use()` calls and the blockquote overrides with `.use(require("./lib/tufte-markdown"))`. The wikilink rule stays in the site.
- `tufte-markdown.css` is passthrough-copied to `/assets/tufte-markdown.css` and linked in `includes/head.html` between `tufte.css` and `style.css`. This keeps the CSS with the module for extraction.
- Root `package.json` gains `"test": "node --test lib/tufte-markdown/test/"`.

## Risks / Trade-offs

- **[About 20 existing images change from `<p><img>` to `<figure>`]** → figures use the same 55% column width as paragraphs. Verification compares screenshots of 3 image-heavy notes before and after.
- **[Core rules depend on markdown-it-footnote's token shape]** → the versions are pinned by the lockfile, and the tests fail loudly if the shape changes. The module declares its dependency ranges.
- **[A quilt fence shows as a code block in other Markdown tools]** → accepted; Glenn chose the fence syntax.
- **[Labels such as `[^marginalia]` also become margin notes]** → accepted as the documented rule: any label starting with `margin`.
- **[ids could collide if one page renders several markdown snippets]** → counters are per render, and pages render body Markdown once. The backlink preview is computed but never displayed.

## Migration Plan

1. Before changing code, build `main` into a scratch folder as a baseline.
2. After the change, diff every page against that baseline. Expected differences:
   - Figures, the converted margin notes, the `> - ` citation, the tufte integration note, and the new CSS link.
   - Any other difference is a regression.
3. To roll back, revert the PR. No content depends on the new syntax except the converted notes, which the revert also restores.
