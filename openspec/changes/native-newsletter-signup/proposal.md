# Proposal

## Why

The State Transition signup is a Substack iframe served from another origin, so it keeps Substack's fonts, colours, and button, and it stays light when the site is in dark mode. Site CSS cannot reach inside a cross-origin frame, so matching the site means replacing the iframe with markup the site owns.

A native email form was tested first and rejected: a direct post to Substack's undocumented signup endpoint returned a redirect, but the test address never reached the subscriber list. A form built on it could tell readers they had subscribed when they had not.

## What Changes

- Replace all three State Transition iframes (`index.md`, `newsletter.md`, `includes/substack.html`) with one site-styled subscribe link, rendered from a single shared include.
- Style the link with the site's fonts and colours, in light and dark mode, using classes in `assets/style.css`.
- Send readers to the Substack subscribe page, `https://www.statetransition.co/subscribe`, where they enter their email. Subscribers stay on the same list.
- Remove the two inline iframe styles and the unused `.substack-iframe` class.
- Remove the "Get the latest here:" line from `index.md`, because the include's own label replaces it.

## Capabilities

### New Capabilities

- `newsletter-signup`: how readers reach the State Transition subscribe page from the site, including where the link appears, where it goes, and how it looks in each colour scheme.

### Modified Capabilities

None. `openspec/specs/` has no existing capabilities.

## Impact

- **Templates and content:** `includes/substack.html`, `index.md`, `newsletter.md`. `layouts/note.html` keeps its existing include.
- **Styles:** `assets/style.css`.
- **External dependency:** Substack's embed is replaced by a link to its public subscribe page. The site no longer loads Substack's embed scripts on these pages.
- **Behaviour:** readers take one extra step, because they enter their email on Substack rather than on the page they are reading. Signup conversion may drop as a result.
- **Dependencies:** none added. The site stays static, with no new JavaScript.
