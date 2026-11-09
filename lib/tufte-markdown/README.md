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

## Epigraphs

Every blockquote renders as a Tufte epigraph. To credit the quote, end it with a line starting with `--`, `—` or `- `; that line becomes the citation, with Markdown rendered.

```markdown
> When you squeeze an orange, orange juice comes out.
> -- Wayne W. Dyer
```

```html
<div class="epigraph"><blockquote><p>When you squeeze an orange, orange juice comes out.</p>
<footer>Wayne W. Dyer</footer>
</blockquote></div>
```

Only the last line counts. A quoted list of two or more `- ` items stays a list, and a quote that is nothing but a dash line keeps its text. A hand-written `<footer>` element also works as a citation.

## Figures

An image alone in its paragraph becomes a figure. Its title (the quoted text after the URL) becomes the caption, and its alt text stays on the image. Images that share a paragraph with text, sit inside a link, or sit in a list item stay inline.

```markdown
![Pyramid](/p.png "The McLeod hierarchy")
```

```html
<figure><img src="/p.png" alt="Pyramid"><figcaption>The McLeod hierarchy</figcaption></figure>
```

Add `{.fullwidth}` to span the text and the margin, with the caption below. The image is stretched to the full width, so use a source image at least 1000px wide:

```markdown
![Chart](/chart.png "Exports by year"){.fullwidth}
```

```html
<figure class="fullwidth"><img src="/chart.png" alt="Chart"><figcaption>Exports by year</figcaption></figure>
```

Add `{.margin}` to put the figure in the margin beside the next paragraph. On narrow screens it is hidden behind a ⊕ toggle.

```markdown
![Spark](/spark.png "A sparkline"){.margin}
```

```html
<p><label for="mf-1" class="margin-toggle">&#8853;</label><input type="checkbox" id="mf-1" class="margin-toggle"/><span class="marginnote"><img src="/spark.png" alt="Spark"><br>A sparkline</span></p>
```

Without a title, a figure has no caption. Any other classes in the braces stay on the `<img>`.

## Image quilts

A fenced block named `quilt` lays its images out as a grid, each captioned with its own title. Write one image per line; other lines are ignored, and a quilt with no images renders nothing. Use `quilt fullwidth` to span the margin too. On narrow screens the grid drops to fewer columns.

````markdown
```quilt
![A](/a.png "Before")
![B](/b.png "After")
```
````

```html
<figure class="quilt">
<figure><img src="/a.png" alt="A"><figcaption>Before</figcaption></figure>
<figure><img src="/b.png" alt="B"><figcaption>After</figcaption></figure>
</figure>
```

Tufte CSS has no quilt styles, so this module ships `tufte-markdown.css`. Load it after `tufte.css`.

## Sections

Each `##` heading starts a `<section>` that runs until the next `##` heading. Tufte CSS uses sections to size the text column and place notes in the margin. Content before the first `##` heading is not wrapped.

## Subtitles

A line starting with `#:` renders as a Tufte subtitle. Its text is shown as written, without Markdown formatting.

```markdown
# The main title

#: The subtitle
```
