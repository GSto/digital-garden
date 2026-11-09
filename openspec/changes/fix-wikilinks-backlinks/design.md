# Design

## Context

See `proposal.md` for motivation and the specs for required behaviour.

Wikilink targets are parsed in two places with the same extension pattern, `/.(md|markdown)\s?$/i`: the renderer in `.eleventy.js` and `getOutboundLinks` in `lib/notes.js`. `getOutboundLinks` feeds both backlinks (`notes/notes.11tydata.js`) and `/meta/missing` (`meta/meta.11tydata.js`). The pattern's unescaped `.` matches any character, so it strips the last three letters of targets like `cmd`.

Backlinks are computed in `notes/notes.11tydata.js` and rendered by `includes/backlinks.html`, which only renders when `backlinks.length > 1`.

The repo has no test framework. Verification is a build, checks on the generated HTML, and rendering sample markdown through the site's configured markdown-it instance.

## Goals / Non-Goals

**Goals:**

- Fix both bugs with the smallest change that makes the specs true.

**Non-Goals:**

- Sidenotes and margin notes.
- Hover cards. Backlink previews are computed but never shown, and stay as they are.
- A test framework.

## Decisions

**Escape the dot in both places.** Change the pattern to `/\.(md|markdown)\s?$/i` in `.eleventy.js` and `lib/notes.js`. Alternative: move the parsing into one shared helper. That removes the duplication but changes more code than the fix needs, so it is left for a later cleanup.

**Change the visibility check to `backlinks.length > 0`.** The template's `link.url != '/'` filter stays. No note currently links from a page whose URL is `/`; the notes index page uses no wikilinks, so the change cannot produce an empty Backlinks heading today.

## Risks / Trade-offs

- [A future page at `/` links to a note that has no other backlinks, leaving a heading with an empty list] → No current page does. If it becomes a problem, filter `/` before the length check.
- [The two parsing patterns drift apart again] → Accepted for now; noted as a later cleanup.

## Migration Plan

Deploy with the site's normal process. Rollback is reverting the commit.
