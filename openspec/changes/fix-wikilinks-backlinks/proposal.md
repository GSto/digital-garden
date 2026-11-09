# Proposal

## Why

Wikilinks and backlinks are how notes in the garden connect, but neither has a spec, and each has a bug. A wikilink whose target ends in a character followed by `md` or `markdown` (for example `[[cmd]]`) renders as an empty link to `/notes//`. Backlinks only appear when two or more notes link to a note, so 38 of 133 notes with one linking note show none.

## What Changes

- Remove only a literal `.md` or `.markdown` extension from wikilink targets, so `[[cmd]]` links to `/notes/cmd/`.
- Show the Backlinks section when one or more notes link to a note.
- Record the current wikilink and backlink behaviour that stays the same as baseline requirements, including links to notes that do not exist yet.

Sidenotes and margin notes are out of scope and will get their own spec.

## Capabilities

### New Capabilities

- `wikilinks`: how `[[target]]` and `[[target|label]]` syntax in notes becomes links to other notes, and how links to notes that do not exist are handled.
- `backlinks`: how a note lists the other notes that link to it.

### Modified Capabilities

None.

## Impact

- **Code:** `.eleventy.js` (wikilink rendering), `lib/notes.js` (outbound link parsing, used by backlinks and `/meta/missing`), `includes/backlinks.html`.
- **Site:** 38 notes gain a Backlinks section. No existing wikilinks change, because no current note uses a target that the extension bug affects.
- **Dependencies:** none added.
