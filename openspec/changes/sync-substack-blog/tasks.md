# Tasks

## 1. Setup

- [x] 1.1 Add `turndown` and `@11ty/eleventy-plugin-rss` 1.x as dev dependencies and verify both `require` calls succeed in `node -e`
- [x] 1.2 Create `_scripts/substack-sync/` with `fetch.js`, `convert.js`, `links.js`, `images.js`, `index.js` and a `test/` folder, add `_scripts/` to `.eleventyignore`, and verify `npm run compile` builds no page from `_scripts/`
- [x] 1.3 Add `"sync": "node _scripts/substack-sync/index.js"` and extend `"test"` to run both the tufte-markdown tests and `node --test "_scripts/substack-sync/test/*.test.js"`; verify `npm test` runs the existing tufte-markdown suite green

## 2. Fetching

- [x] 2.1 Implement cursor paging of `/api/v1/posts?limit=20` and `/api/v1/archive?sort=new` against `https://www.statetransition.co`, joined on post `id`, with about one second between pages; verify with a unit test that feeds two fake pages through an injected fetch and gets the joined list
- [x] 2.2 Add retry with exponential backoff (up to four tries) for 429 and 5xx, then a thrown error naming the URL; verify with unit tests for recover-after-429 and give-up-after-four
- [x] 2.3 Filter to `audience: everyone`, reporting skipped paid posts; verify with a unit test

## 3. Conversion

- [x] 3.1 Save HTML fixtures cut from real posts into `_scripts/substack-sync/test/fixtures/`: one each with footnotes, captioned image, subscription widget and button, YouTube embed, tweet embed, digest-post embed, pull quote, and cross-post link; verify each fixture contains the element it is named for
- [x] 3.2 Implement Turndown rules for removed widgets and buttons, captioned images with the caption as title, footnotes as `[^n]` with definitions after the body, YouTube/tweet/digest embeds as links, and pull quotes as block quotes; verify one fixture test per rule, plus a test that the converted footnote fixture renders sidenotes through the site's markdown-it setup
- [x] 3.3 Implement section-to-type mapping (At the Edges → `at the edges`, Product Thinking Book → `product thinking`, Root Nodes → `articles`) that throws on unknown or missing sections, and tag-to-blogchain mapping; verify unit tests cover all three sections, an unknown section, and a post with no tags
- [x] 3.4 Implement front matter output with fixed key order and `JSON.stringify` strings, omitting `subtitle` and `coverImage` when absent; verify a unit test with a title containing a colon and quotes round-trips through Eleventy's front matter parser

## 4. Links and images

- [x] 4.1 Implement link rewriting for `statetransition.co`, `www.statetransition.co` and `statetransition.substack.com` `/p/<slug>` links whose slug is synced, dropping the query string and keeping the fragment; verify unit tests for all three hosts, a query string, an unsynced slug, and `/subscribe`
- [x] 4.2 Implement image URL decoding to the S3 original and `<uuid>_<w>x<h>.<ext>` naming, with the SHA-256 fallback; verify unit tests using the real CDN URLs from the fixtures and one non-decodable URL
- [x] 4.3 Download body images and the cover image per post into `assets/blog/<slug>/`, skipping files already present, and rewrite references to site paths; verify with a unit test using an injected fetch that a second run makes zero image requests

## 5. Orchestration

- [x] 5.1 Implement the build phase (all Markdown in memory, new images staged under the OS temp dir) and the apply phase (write only missing or differing files via temp-file-and-rename, move staged images, delete stale `blog/*.md` and `assets/blog/` files, never `blog/blog.11tydata.js`); verify unit tests against a temp target dir: an unchanged post keeps its mtime, an edited post is rewritten, a new post is added, a removed post and its images are deleted, and a failing image download leaves the target byte-identical
- [x] 5.2 Print a summary (posts new, updated, unchanged, removed, skipped; images downloaded) and exit non-zero on any failure; verify a unit test of the counts and a run against an injected failing fetch
- [x] 5.3 Document `npm run sync` in the README, including that it is one-way and that hand edits to `blog/*.md` are overwritten; verify the documented command matches `package.json`

## 6. Site templates

- [x] 6.1 Add `blog/blog.11tydata.js` (layout `post.html`, `type: "post"`, permalink `/blog/{{ page.fileSlug }}/`) and a `posts` collection over `blog/*.md` sorted newest first in `.eleventy.js`; verify with two hand-made sample posts that `npm run compile` outputs `_site/blog/<slug>/index.html` and the notes collection count is unchanged
- [x] 6.2 Add `layouts/post.html` showing title, subtitle, date, post type, blogchains only when present, a link to the Substack original, the content, and the subscribe include; verify in the built sample post HTML
- [x] 6.3 Make `includes/head.html` use `substackUrl` for `rel=canonical` and treat `type == "post"` as `og:type` article; verify the built sample post's canonical is its Substack URL and a built note's canonical is unchanged
- [x] 6.4 Add `blog.md` with permalink `/blog/` listing posts as archive-style entries: title link, subtitle, date on the left, cover thumbnail link on the right, no image box when there is no cover; verify in the built HTML with one sample post with a cover and one without
- [x] 6.5 Add the "Blog" nav item between Home and Newsletter, active when `page.url contains '/blog'`; verify built nav order reads Home, Blog, Newsletter, Notes, Book and only Blog is active on `/blog/`
- [x] 6.6 Add post metadata and post-list styles to `assets/style.css` with dark mode overrides and no inline styles; verify in `npm start` in light and dark mode and at 375px wide, with thumbnails staying right of the text and no horizontal scroll
- [x] 6.7 Register the RSS plugin and add `blog-feed.liquid` (permalink `/blog/feed.xml`) with one item per post, newest first, full content via `htmlToAbsoluteUrls`, and links to `https://www.glennstovall.com/blog/<slug>/`; verify `xmllint --noout _site/blog/feed.xml` passes, the item count matches the sample posts, and a sample image `src` is absolute
- [x] 6.8 Add the RSS alternate link to `includes/head.html` and a visible feed link on `/blog/`; verify both appear in the built HTML of `/blog/` and a note page
- [x] 6.9 Remove the sample posts and verify `npm run compile` still succeeds with an empty `blog/` and an empty but well-formed feed

## 7. Full sync and integration

- [x] 7.1 Run `npm run sync` and verify it reports 78 posts new and 0 skipped, and that `blog/` holds 78 Markdown files
- [x] 7.2 Verify `grep -r "substackcdn.com" blog/` finds nothing and `grep -rE "statetransition\.(co|substack\.com)/p/" blog/` finds only links to unsynced posts (expect none)
- [x] 7.3 Run `npm run sync` a second time and verify it reports 78 unchanged and 0 images downloaded, `git status` shows no changes, and `find blog assets/blog -newer <marker>` lists nothing
- [x] 7.4 Run `npm run compile` and `npm test` and verify both pass; open `/blog/` and one post per embed type in `npm start` and confirm the figures, sidenotes, and embed links render and every internal link resolves
- [x] 7.5 Verify the built feed with `xmllint --noout` and an item count of 78, then load `/blog/feed.xml` in a feed reader or validator and confirm one full post renders with its images
- [ ] 7.6 Commit the code, then commit the synced content in a separate commit
