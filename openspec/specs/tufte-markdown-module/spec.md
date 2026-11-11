# tufte-markdown-module Specification

## Purpose

Keeps the Tufte Markdown syntax in one self-contained markdown-it plugin with its own tests, so it can be published as a standalone npm package without changes to its code.

## Requirements

### Requirement: Self-contained plugin
The Tufte Markdown system SHALL be a single markdown-it plugin in its own directory. It SHALL import nothing from the site outside that directory and nothing from Eleventy.

#### Scenario: Import check
- **WHEN** the module's source files are searched for `require` and `import` statements
- **THEN** every one resolves to a file inside the module directory, a Node built-in, or a package declared in the module's own dependency list

### Requirement: One-call registration
A markdown-it instance SHALL gain every Tufte Markdown feature (sidenotes, margin notes, epigraphs, figures, quilts, sections and subtitles) from one `.use()` call with the plugin.

#### Scenario: Plain markdown-it
- **WHEN** a fresh markdown-it instance with `html: true` registers only this plugin and renders a document using every feature
- **THEN** the output matches the module's expected-output fixtures

### Requirement: Module tests
The module SHALL include automated tests covering every scenario in the `sidenotes`, `epigraphs` and `figures` specs, runnable with one npm script.

#### Scenario: Running the tests
- **WHEN** a developer runs the module's test script
- **THEN** all tests run without a browser or an Eleventy build and pass

### Requirement: Site output unchanged outside the new features
Moving the section wrapper and subtitle behavior into the module SHALL NOT change their output.

#### Scenario: Sections and subtitles
- **WHEN** a note with h2 headings and a `#:` subtitle line is built before and after this change
- **THEN** the `<section>` wrapping and the subtitle paragraph are identical in both builds
