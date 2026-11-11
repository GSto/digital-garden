# epigraphs Specification

## Purpose

Renders Markdown blockquotes as Tufte epigraphs and lets authors attribute a quote with a plain-text dash line instead of HTML.

## Requirements

### Requirement: Blockquotes render as epigraphs
Every Markdown blockquote SHALL render as a Tufte epigraph, meaning a blockquote wrapped in an element with the `epigraph` class.

#### Scenario: Plain quote
- **WHEN** a note contains `> Less is more.`
- **THEN** the page shows the quote in epigraph styling with no citation

### Requirement: Dash-line citations
When the last line of a blockquote starts with `--`, `—` or `- `, that line SHALL render as the epigraph's `<footer>` citation without the dash, and SHALL NOT appear in the quote text.

#### Scenario: Double-hyphen attribution
- **WHEN** a note contains `> When you squeeze an orange, orange juice comes out.` followed by `> -- Wayne W. Dyer`
- **THEN** the epigraph shows the quote, and below it a right-aligned citation reading "Wayne W. Dyer"

#### Scenario: Em dash attribution
- **WHEN** the last line of a blockquote is `> — Seneca`
- **THEN** the citation reads "Seneca"

#### Scenario: Hyphen list-style attribution
- **WHEN** a blockquote ends with the line `> - Danish folk saying`
- **THEN** the citation reads "Danish folk saying" and no bulleted list is rendered

#### Scenario: Citation with Markdown
- **WHEN** the citation line is `> -- Tufte, *Envisioning Information*`
- **THEN** the citation renders with the book title in italics

### Requirement: Only the last line is a citation
A dash line that is not the last line of the blockquote, or a blockquote of more than one list item, SHALL render as ordinary quote content.

#### Scenario: Quoted list
- **WHEN** a blockquote contains a list of two `- ` items
- **THEN** it renders as a list inside the epigraph and no citation is created

### Requirement: HTML footer citations still work
A blockquote that contains a hand-written `<footer>` element SHALL keep rendering that footer as its citation.

#### Scenario: Existing note with footer HTML
- **WHEN** a note contains `> quote <footer>Wayne W Dyer</footer>`
- **THEN** the epigraph shows "Wayne W Dyer" as its citation, as it did before this change
