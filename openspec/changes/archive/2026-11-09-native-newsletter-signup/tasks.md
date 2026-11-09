# Tasks

## 1. Subscribe link

- [x] 1.1 Replace the iframe in `includes/substack.html` with the label and subscribe link, with no blank lines or inline styles, and verify `npm run compile` succeeds and a generated note page contains the link.
- [x] 1.2 Replace the iframes in `index.md` and `newsletter.md` with the include, remove "Get the latest here:" from `index.md`, and verify the generated pages contain unescaped link markup and `grep -r "statetransition.co/embed" _site` finds nothing.
- [x] 1.3 Add `.signup` styles for light and dark mode to `assets/style.css`, remove `.substack-iframe`, and verify `grep -rn "substack-iframe" assets includes layouts` finds nothing.

## 2. Browser verification

- [x] 2.1 Load the home, newsletter, and a note page in a browser in light and dark mode at desktop width and 375px, and verify typeface, colours, contrast, visible focus state, and no horizontal scrolling.
- [x] 2.2 Verify the link's destination returns HTTP 200 and that the link opens in a new tab with `rel="noopener"`.
