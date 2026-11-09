# Spec Delta

## Purpose

Shows readers which other notes link to the note they are reading, so connections between notes can be followed in both directions.

## ADDED Requirements

### Requirement: Backlinks list
A note page SHALL list each note that links to it with a wikilink, by title and linking to that note, with each linking note listed once. Matching link targets to the note SHALL ignore capitalisation.

#### Scenario: Several linking notes
- **WHEN** three notes contain wikilinks to a note
- **THEN** that note's page lists those three notes under Backlinks

#### Scenario: Capitalisation differs
- **WHEN** a note contains `[[Lindy]]` and links to the note named `lindy`
- **THEN** the `lindy` page lists that note under Backlinks

#### Scenario: Repeated links from one note
- **WHEN** one note links to a note several times
- **THEN** the linking note is listed once

### Requirement: Backlinks section visibility
A note page SHALL show the Backlinks section when one or more notes link to it, and SHALL NOT show the section when none do.

#### Scenario: One linking note
- **WHEN** exactly one note links to a note
- **THEN** that note's page shows the Backlinks section listing that one note

#### Scenario: No linking notes
- **WHEN** no note links to a note
- **THEN** that note's page shows no Backlinks heading or list
