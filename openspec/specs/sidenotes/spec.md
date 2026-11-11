# sidenotes Specification

## Purpose

Lets notes put commentary beside the text it refers to, written in standard Markdown footnote syntax, as numbered Tufte sidenotes or unnumbered margin notes.

## Requirements

### Requirement: Footnotes render as sidenotes
A footnote reference whose label does not start with `margin` SHALL render, at the reference point, as a numbered sidenote containing the footnote's definition. The page SHALL NOT show a footnote list at the bottom.

#### Scenario: Numbered footnote
- **WHEN** a note contains `Text[^1].` and `[^1]: A **bold** remark.`
- **THEN** the sidenote with "A **bold** remark" (bold rendered) appears beside "Text", with a sidenote number, and no footnote section is rendered at the end of the page

#### Scenario: Sidenote numbering follows reading order
- **WHEN** a note has footnotes labelled `[^z]` then `[^a]`, in that order in the text
- **THEN** the first sidenote is numbered 1 and the second 2, whatever their labels or the order of their definitions

### Requirement: Inline sidenotes
An inline footnote `^[text]` SHALL render as a numbered sidenote at that point, the same way as a labelled footnote.

#### Scenario: Inline sidenote with brackets inside
- **WHEN** a note contains `Claim^[see [the source](https://example.com)].`
- **THEN** one sidenote renders containing a working link to the source, and no stray `]` or `)` text appears in the paragraph

### Requirement: Margin notes by label
A footnote whose label starts with `margin` SHALL render at the reference point as a margin note without a number. It SHALL NOT affect the numbering of sidenotes.

#### Scenario: Margin note between sidenotes
- **WHEN** a note has references `[^1]`, `[^margin-src]`, `[^2]` in that order
- **THEN** `[^1]` and `[^2]` render as sidenotes numbered 1 and 2, and `[^margin-src]` renders as an unnumbered margin note

### Requirement: Notes on small screens
On narrow screens, each sidenote and margin note SHALL be hidden behind a toggle at its reference point: the sidenote number, or a ⊕ symbol for margin notes. Selecting the toggle reveals the note.

#### Scenario: Reader on a phone
- **WHEN** a reader with a viewport narrower than 760px selects a sidenote number
- **THEN** that sidenote's text appears below the line, and selecting it again hides it

### Requirement: Stable note ids
Every note's toggle id SHALL be unique within its page and the same on every build of unchanged content.

#### Scenario: Rebuild without changes
- **WHEN** the site is built twice without content changes
- **THEN** the generated HTML for every page with notes is byte-identical between the two builds

### Requirement: Undefined references stay as text
A footnote reference with no matching definition SHALL render as its literal text.

#### Scenario: Missing definition
- **WHEN** a note contains `[^ghost]` and no `[^ghost]:` definition
- **THEN** the page shows the text `[^ghost]` and no empty note

### Requirement: Legacy margin syntax removed
The `>[text]` syntax SHALL NOT produce a margin note, and no note in the repository SHALL use it outside code blocks.

#### Scenario: Old syntax in content
- **WHEN** the site is built
- **THEN** no note source outside code fences contains `>[`, and the adages and tufte integration notes show their former `>[ ]` notes as margin notes
