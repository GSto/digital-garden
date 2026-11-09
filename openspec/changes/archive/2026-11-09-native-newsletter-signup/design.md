# Design

## Context

See `proposal.md` for motivation and `specs/newsletter-signup/spec.md` for required behaviour.

The signup appears in three places: `includes/substack.html` (used by `layouts/note.html`), and pasted iframes with inline styles in `index.md` and `newsletter.md`. Eleventy processes markdown with Liquid first, so the markdown pages can use the same include.

The repo has no test framework. Verification is a build, checks on the generated HTML, and a real browser.

## Goals / Non-Goals

**Goals:**

- One link definition for all three placements.
- Colours that change with `prefers-color-scheme`, matching the existing dark mode values (`#151515` background, `#ddd` text).

**Non-Goals:**

- Collecting email addresses on the site. See the first decision.

## Decisions

**Link instead of a native form.** On 2026-11-09, one test post to `https://www.statetransition.co/api/v1/free?nojs=true` with `email` and `source=embed` returned a 302 to `/` with no captcha mention, but the address never appeared in the Substack subscriber list. That response cannot be told apart from a success, so a form could misreport failed signups to readers. The test used curl with minimal fields, so the exact cause is unknown. Glenn chose the link over retesting in a browser. Substack's page carries the signup form and its legal notice, so the site does not need to reproduce them.

**Open in a new tab.** `target="_blank"` with `rel="noopener"` keeps the reader's page open, and matches the Book link in the site navigation.

**Keep `includes/substack.html` as the shared include.** `layouts/note.html` already uses it, so no layout changes. A rename would add churn without changing behaviour.

**No blank lines inside the include.** Markdown ends an HTML block at a blank line, so blank lines in the markup could make markdown-it wrap or escape the rest on `index.md` and `newsletter.md`.

**Outlined button using `currentColor`.** Tufte's link rule inherits the body colour, which already changes in dark mode, so the text, border, and focus ring follow the active colour scheme with no separate dark mode rule. This needs no accent colour the site does not already have.

**Follow the prose column.** The block is 55% wide, like Tufte's `section > p`, and 100% wide at the existing 760px breakpoint. This replaces the fixed 480px iframe.

## Risks / Trade-offs

- [The extra step lowers signups] → Accepted by Glenn in exchange for reliability and a full style match. Reverting the commit restores the embed.
- [Substack changes the subscribe URL] → It is a standard public page and returned HTTP 200 on 2026-11-09.

## Migration Plan

Deploy with the site's normal process. Rollback is reverting the commit, which restores the iframes. No subscriber data moves.
