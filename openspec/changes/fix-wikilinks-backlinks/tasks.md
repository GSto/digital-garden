# Tasks

## 1. Wikilinks

- [x] 1.1 Escape the dot in the extension pattern in `.eleventy.js` and `lib/notes.js`, then verify by rendering sample markdown through the site's markdown-it instance that `[[cmd]]` links to `/notes/cmd/`, `[[risk.md]]` and `[[risk.markdown]]` link to `/notes/risk/`, `[[risk|danger]]` shows "danger", `[[ risk ]]` is trimmed, and `` `[[risk]]` `` stays code.
- [x] 1.2 Run `npm run compile` and verify `/meta/missing` lists the same 82 unresolved targets as before the change and still omits capitalisation-only matches such as "Lindy".

## 2. Backlinks

- [x] 2.1 Change the check in `includes/backlinks.html` to show the section for one or more backlinks, then run `npm run compile` and verify 81 note pages show a Backlinks section (previously 43), the 51 notes with no linking notes show none, and no page shows a Backlinks heading with an empty list.
- [x] 2.2 Check a note with exactly one linking note, such as `/notes/401k valuation/`, in a browser in light and dark mode, and verify the Backlinks section lists that note and its link opens it.
