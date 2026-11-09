# Tasks

## 1. Endpoint gate

- [ ] 1.1 With Glenn's approval of the address, submit one test signup to `https://www.statetransition.co/api/v1/free?nojs=true` using only `email` and `source=embed`, and verify from the response and the inbox that the signup registered with no captcha challenge. If it fails, stop and return to Glenn before starting group 2.

## 2. Signup form

- [ ] 2.1 Replace the iframe in `includes/substack.html` with the form, label, terms notice, and fallback link, with no blank lines or inline styles, and verify `npm run compile` succeeds and a generated note page contains the form.
- [ ] 2.2 Replace the iframes in `index.md` and `newsletter.md` with the include, remove "Get the latest here:" from `index.md`, and verify the generated pages contain an unescaped form and `grep -r "statetransition.co/embed" _site` finds nothing.
- [ ] 2.3 Add `.signup` styles for light and dark mode to `assets/style.css`, remove `.substack-iframe`, and verify `grep -rn "substack-iframe" assets includes layouts` finds nothing.

## 3. Browser verification

- [ ] 3.1 Load the home, newsletter, and a note page in a browser in light and dark mode at desktop width and 375px, and verify typeface, colours, contrast, visible focus states, and no horizontal scrolling.
- [ ] 3.2 Verify in a browser that empty and malformed emails are blocked, the terms and fallback links open the correct pages, and a screen reader label is exposed for the email field.
- [ ] 3.3 Submit the test address through the built form in a browser, and verify the original page stays open, the response opens in a new tab, and the email address is absent from the URL.

## Workflow follow-up

- After deployment, submit one signup from the live site to confirm production posts are accepted, with Glenn's approval of the address.
- Remove test addresses from the subscriber list.
- Archive the change with `/opsx:archive` after that check passes.
