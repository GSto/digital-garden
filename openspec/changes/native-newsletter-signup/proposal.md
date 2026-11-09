# Proposal

## Why

The State Transition signup is a Substack iframe served from another origin, so it keeps Substack's fonts, colours, and button, and it stays light when the site is in dark mode. Site CSS cannot reach inside a cross-origin frame, so matching the site means replacing the iframe with a form the site owns.

## What Changes

- Replace all three State Transition iframes (`index.md`, `newsletter.md`, `includes/substack.html`) with one native HTML email signup form, rendered from a single shared include.
- Style the form with the site's fonts and colours, in light and dark mode, using classes in `assets/style.css`.
- Submit the form to the State Transition publication's existing signup endpoint, `https://www.statetransition.co/api/v1/free`. Subscribers stay on the same list.
- Show Substack's terms notice next to the form, and a direct link to the Substack subscribe page as a fallback.
- Remove the two inline iframe styles and the unused `.substack-iframe` class.
- Remove the "Get the latest here:" line from `index.md`, because the form's own label replaces it.
- **Gate:** the endpoint is undocumented and the embed page carries captcha configuration. A real test signup, approved by Glenn, must succeed before any page changes.

## Capabilities

### New Capabilities

- `newsletter-signup`: how readers subscribe to State Transition from the site, including where the form appears, how it submits, how it looks in each colour scheme, and what it discloses.

### Modified Capabilities

None. `openspec/specs/` has no existing capabilities.

## Impact

- **Templates and content:** `includes/substack.html`, `index.md`, `newsletter.md`. `layouts/note.html` keeps its existing include.
- **Styles:** `assets/style.css`.
- **External dependency:** a direct post to an undocumented Substack endpoint replaces the supported embed. Substack can change or challenge it without notice, and the fallback link is the mitigation.
- **Behaviour:** Substack's own embed scripts and its confirmation UI no longer load on these pages. Readers see Substack's post-submit response instead.
- **Dependencies:** none added. The site stays static, with no new JavaScript.
