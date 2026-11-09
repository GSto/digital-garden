# tufte-markdown

A markdown-it plugin for writing [Tufte CSS](https://edwardtufte.github.io/tufte-css/) documents in extended Markdown.

```js
const md = require("markdown-it")({ html: true }).use(require("./lib/tufte-markdown"));
```

The plugin registers markdown-it-footnote and markdown-it-attrs itself, so don't add them again.

Each `markdown` example below is followed by the exact `html` it renders to. The tests render every pair, so the examples stay accurate.

## Sidenotes

Standard footnote syntax renders as a numbered sidenote beside the text, not as a list at the bottom of the page. Tufte CSS numbers sidenotes in reading order, whatever their labels.

```markdown
Tufte popularised sidenotes.[^1]

[^1]: Notes placed *beside* the text.
```

```html
<p>Tufte popularised sidenotes.<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/><span class="sidenote">Notes placed <em>beside</em> the text.</span></p>
```

For short notes, write the text inline with `^[ ]`:

```markdown
Tufte popularised sidenotes.^[Short and inline.]
```

```html
<p>Tufte popularised sidenotes.<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/><span class="sidenote">Short and inline.</span></p>
```

A definition can span several paragraphs (indent the later ones by four spaces); they are joined with line breaks. Lists, tables and code blocks are not supported inside notes. A reference with no definition stays as plain text.

## Margin notes

A footnote whose label starts with `margin` renders as a margin note: the same placement as a sidenote, without a number. Give each margin note on a page its own label.

```markdown
Tools shape thinking.[^margin-tools]

[^margin-tools]: See McLuhan.
```

```html
<p>Tools shape thinking.<label for="mn-1" class="margin-toggle">&#8853;</label><input type="checkbox" id="mn-1" class="margin-toggle"/><span class="marginnote">See McLuhan.</span></p>
```

On narrow screens, notes are hidden behind their number or a ⊕ symbol; tapping it shows the note.

## Sections

Each `##` heading starts a `<section>` that runs until the next `##` heading. Tufte CSS uses sections to size the text column and place notes in the margin. Content before the first `##` heading is not wrapped.

## Subtitles

A line starting with `#:` renders as a Tufte subtitle. Its text is shown as written, without Markdown formatting.

```markdown
# The main title

#: The subtitle
```
