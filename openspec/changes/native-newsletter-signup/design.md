# Design

## Context

See `proposal.md` for motivation and `specs/newsletter-signup/spec.md` for required behaviour.

The signup appears in three places: `includes/substack.html` (used by `layouts/note.html`), and pasted iframes with inline styles in `index.md` and `newsletter.md`. Eleventy processes markdown with Liquid first, so the markdown pages can use the same include.

Substack's embed page contains a plain form: `POST /api/v1/free?nojs=true`, with an `email` field and hidden fields including `source=embed`. The endpoint is undocumented. The page also carries a captcha site key and `subscribe_captcha_behavior: "default"`, and whether a direct post gets challenged is unknown until tested.

The repo has no test framework. Verification is a build, checks on the generated HTML, and a real browser.

## Goals / Non-Goals

**Goals:**

- One form definition for all three placements.
- Colours that change with `prefers-color-scheme`, matching the existing dark mode values (`#151515` background, `#ddd` text, `#333` borders).

**Non-Goals:**

- A custom confirmation message on the site. That needs JavaScript and cross-origin access to the response.
- Captcha support. If Substack challenges direct posts, this approach stops at the gate.
- Referral and attribution fields beyond `source`.

## Decisions

**Prove the endpoint before touching pages.** A real test signup runs first. If it is challenged or rejected, the work stops and goes back to Glenn, whose earlier alternative was a styled subscribe link. Building the form first would waste the work if the endpoint refuses it.

**Post to a new tab.** `target="_blank"` with `rel="noopener"` keeps the reader's page open, and Substack's response appears in the new tab. Alternative: same-tab post, which sends readers away from what they were reading.

**Send only `email` and `source=embed` at first.** The test signup shows whether this is enough. Add other hidden fields from the embed only if the endpoint needs them.

**Keep `includes/substack.html` as the shared include.** `layouts/note.html` already uses it, so no layout changes. A rename would add churn without changing behaviour.

**No blank lines inside the include.** Markdown ends an HTML block at a blank line, so blank lines in the form could make markdown-it wrap or escape the remaining markup on `index.md` and `newsletter.md`.

**Scope colours to the form with CSS custom properties.** `.signup` defines its colours, and the existing `@media (prefers-color-scheme: dark)` block in `style.css` overrides them. `color-scheme` is set so native field rendering matches. Form controls do not inherit fonts by default, so they get `font: inherit`.

**Follow the prose column.** The form is 55% wide, like Tufte's `section > p`, and 100% wide at the existing 760px breakpoint. The field and button wrap when space is tight. This replaces the fixed 480px iframe.

**Copy the terms notice verbatim.** The text and links come from the embed page: Terms of Use, Privacy Policy, and Information collection notice (`substack.com/ccpa#personal-data-collected`). Rewording legal text is not a call to make in this change.

**Fallback link:** `https://www.statetransition.co/subscribe`, which returned HTTP 200 when checked on 2026-11-09.

## Risks / Trade-offs

- [Substack changes or challenges the endpoint] → The fallback link stays visible with every form.
- [A test from this machine passes but production posts are treated differently] → Check one signup from the live site after deployment.
- [Readers land on an unstyled or JSON response in the new tab] → The test signup records what the response looks like. If it is unusable, stop and raise it with Glenn.
- [Direct posts skip the embed's bot protection and could attract spam signups] → Accepted for now. Watch the subscriber list after launch and revert if needed.

## Migration Plan

Deploy with the site's normal process. Rollback is reverting the commit, which restores the iframes. No subscriber data moves.

## Open Questions

None.
