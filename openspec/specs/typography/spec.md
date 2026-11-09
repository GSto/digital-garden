# typography Specification

## Purpose

Defines which typefaces the site uses for prose and for code, so every page reads in one consistent sans-serif face while code stays monospaced.

## Requirements

### Requirement: Gill Sans for prose
The site SHALL set all non-code text in Gill Sans, falling back in order to Gill Sans MT, Calibri, and the browser's default sans-serif. This covers body text, headings, sidenotes, margin notes, backlinks and the subscribe link.

#### Scenario: Visitor with Gill Sans installed
- **WHEN** a visitor whose system has Gill Sans opens any page
- **THEN** body text, headings and sidenote text render in Gill Sans

#### Scenario: Visitor without Gill Sans
- **WHEN** a visitor whose system has neither Gill Sans nor Gill Sans MT opens any page
- **THEN** the same text renders in Calibri if present, otherwise in the browser's default sans-serif, and never in a serif face

### Requirement: ET Book figures for sidenote numbers and numerals
Sidenote reference numbers, the matching numbers at the start of each sidenote, and numeral elements SHALL keep ET Book old-style figures. No other element outside code SHALL use a serif face.

#### Scenario: Sidenote numbers on a note page
- **WHEN** a note page with a sidenote is rendered
- **THEN** the sidenote reference number and the number before the sidenote text render in ET Book old-style figures

#### Scenario: No other serif text
- **WHEN** a note page with headings, a sidenote and a backlink is rendered
- **THEN** no visible element other than sidenote numbers, numerals and code has a computed font-family that starts with et-book or a serif family

### Requirement: Monospace code
Inline code and code blocks SHALL keep the existing monospace stack.

#### Scenario: Code on a page
- **WHEN** a page contains inline code or a fenced code block
- **THEN** that code renders in the monospace stack starting with Consolas, not in Gill Sans

### Requirement: Typeface in both colour schemes
The typeface rules SHALL apply the same way in light mode and dark mode.

#### Scenario: Dark mode visitor
- **WHEN** a visitor with a dark colour-scheme preference opens a note page
- **THEN** the text renders in the same sans-serif stack as in light mode
