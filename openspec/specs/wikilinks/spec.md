# wikilinks Specification

## Purpose

Lets notes link to other notes by name with double-bracket syntax, including notes that have not been written yet.

## Requirements

### Requirement: Wikilink target
A wikilink written as `[[target]]` SHALL render as a link to `/notes/<target>/`, with the target as its text and spaces in the URL percent-encoded.

#### Scenario: Single-word target
- **WHEN** a note contains `[[risk]]`
- **THEN** it renders a link to `/notes/risk/` with the text "risk"

#### Scenario: Target with spaces
- **WHEN** a note contains `[[decision making models]]`
- **THEN** it renders a link to `/notes/decision%20making%20models/` with the text "decision making models"

#### Scenario: Wikilink in a heading
- **WHEN** a heading contains `[[risk]]`
- **THEN** the heading contains a link to `/notes/risk/`

### Requirement: Wikilink label
A wikilink written as `[[target|label]]` SHALL link to the target's note and show the label as its text.

#### Scenario: Labelled link
- **WHEN** a note contains `[[risk|danger]]`
- **THEN** it renders a link to `/notes/risk/` with the text "danger"

### Requirement: Target normalisation
The target SHALL have surrounding spaces trimmed and a trailing `.md` or `.markdown` extension removed, and SHALL keep every other character.

#### Scenario: Markdown extension
- **WHEN** a note contains `[[risk.md]]` or `[[risk.markdown]]`
- **THEN** it renders a link to `/notes/risk/` with the text "risk"

#### Scenario: Target ending in md without a dot
- **WHEN** a note contains `[[cmd]]`
- **THEN** it renders a link to `/notes/cmd/` with the text "cmd"

#### Scenario: Surrounding spaces
- **WHEN** a note contains `[[ risk ]]`
- **THEN** it renders a link to `/notes/risk/` with the text "risk"

### Requirement: Wikilinks in code
Double-bracket text inside inline code SHALL render as literal text, not as a link.

#### Scenario: Inline code
- **WHEN** a note contains `` `[[risk]]` ``
- **THEN** it renders as code showing `[[risk]]`, with no link

### Requirement: Links to unwritten notes
A wikilink whose target matches no note SHALL still render as a link, and the site SHALL list it on `/meta/missing` with the notes that contain it. Matching against note names SHALL ignore capitalisation.

#### Scenario: Unwritten note
- **WHEN** a note links to a target that matches no note
- **THEN** the link renders, and `/meta/missing` lists the target and the linking note

#### Scenario: Capitalisation differs
- **WHEN** a note contains `[[Lindy]]` and a note named `lindy` exists
- **THEN** `/meta/missing` does not list "Lindy"
