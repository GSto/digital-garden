# Design

## Context

See proposal.md for motivation and specs/ for required behaviour.

Facts gathered from Substack on 2026-11-10 that shape the approach:

1. The publication's canonical host is `www.statetransition.co`; `statetransition.substack.com` serves the same API. Post links inside bodies use `https://www.statetransition.co/p/<slug>`.
2. 78 posts, all `type: newsletter`, all `audience: everyone`. Sections: Root Nodes (40), At the Edges (20), Product Thinking Book (18). Tags: Prompt Protocols (14), Career Ownership (5), Financial Agency (3), Edge of Uncertainty (3), Product Roundup (1).
3. `GET /api/v1/archive?sort=new[&cursor=…]` returns 12 posts per page with `section_name`, `postTags` and `canonical_url`, but only the first page includes `body_html`.
4. `GET /api/v1/posts?limit=20[&cursor=…]` returns `body_html` and `postTags` for every post, plus `section_id`, but no `section_name`. Four pages cover the archive.
5. `GET /api/v1/posts/<slug>` returned HTTP 429 after a few rapid calls. A per-post fetch loop is not viable without heavy throttling.
6. Bodies contain: 111 images, all `https://substackcdn.com/image/fetch/<transforms>/<url-encoded S3 URL>`; 81 footnotes (`footnote-anchor`, `div.footnote`); 25 subscription widgets; 43 buttons; 16 YouTube embeds; 15 tweet embeds; 11 embedded-post cards (`digest-post-embed`); 9 pull quotes; 34 cross-post links.

Site constraints: Eleventy 1.0, Liquid with `dynamicPartials: false`, Node 26 (global `fetch`, `node --test`), markdown-it with the tufte-markdown plugin (footnotes become sidenotes, a solitary image with a title becomes a captioned figure). `.html` files anywhere outside `.eleventyignore` get built as pages.

## Goals / Non-Goals

**Goals:**
- One command, few requests: about 11 API calls for the whole archive, plus one call per image.
- Incremental writes: a re-sync touches only files whose content changed, so a no-op run writes nothing and produces an empty `git diff`.
- Conversion logic that is unit-testable without the network.

**Non-Goals:**
- Scheduled or CI-triggered sync. The sync runs by hand.
- Comments, likes, restacks, podcast or audio content.
- Per-blogchain or per-type listing pages, per-blogchain feeds, pagination of `/blog/`.
- Hand-editing synced posts. Substack stays the source of truth; any local edit is overwritten on the next sync.

## Decisions

### 1. Fetch metadata from the archive endpoint and bodies from the posts endpoint

Page through `/api/v1/posts?limit=20` for bodies and tags, page through `/api/v1/archive` for `section_name`, and join on post `id`. Use `https://www.statetransition.co` as the base URL. Wait about one second between pages, and retry a 429 or 5xx up to four times with exponential backoff before failing.

*Alternative:* per-post `/api/v1/posts/<slug>`. Rejected: 78 calls, and it hit 429 in testing. *Alternative:* a hard-coded `section_id → name` table. Rejected: a renamed or new section would map silently wrong instead of failing.

### 2. Turndown for HTML to Markdown, with Substack-specific rules

Add `turndown` as a dev dependency. Custom rules, applied before the defaults:

1. `div.subscription-widget-wrap*`, `p.button-wrapper`, `div.captioned-button-wrap`, and share buttons are removed.
2. `div.captioned-image-container` becomes `![alt](/assets/blog/<slug>/<file> "caption")` on its own line, so tufte-markdown renders a captioned figure. No caption means no title.
3. `a.footnote-anchor` becomes `[^n]`; each `div.footnote` becomes a `[^n]: …` definition appended after the body. tufte-markdown then renders sidenotes.
4. `div.youtube-wrap` becomes a link to `https://www.youtube.com/watch?v=<id>` from its `data-attrs`; `div.twitter-embed` becomes a link to the tweet URL from its `data-attrs`; `div.digest-post-embed` becomes a link to the embedded post's URL, then passes through link rewriting.
5. `div.pullquote` becomes a block quote.

The converter fails loudly on an element it has a rule for but cannot parse (for example a YouTube embed with no video id), instead of emitting empty output.

*Alternative:* store raw `body_html` in the Markdown file. Rejected: the request asks for Markdown, and footnotes would not become sidenotes.

### 3. Link rewriting by slug set, after conversion inputs are known

Collect the set of synced slugs first. For each `href`, parse it as a URL; if the host is `statetransition.co`, `www.statetransition.co` or `statetransition.substack.com`, the path is `/p/<slug>`, and `<slug>` is in the set, replace it with `/blog/<slug>/`, dropping query string and keeping any `#fragment`. Every other link is untouched. This runs in the Turndown link rule, so it covers body links and embed cards alike.

### 4. File layout

1. Posts: `blog/<slug>.md`. The sync owns every `.md` file in `blog/`.
2. Directory data: `blog/blog.11tydata.js` sets `layout: post.html`, `type: "post"` and `permalink: /blog/{{ page.fileSlug }}/`. Hand-written; the sync never touches it.
3. Index: `blog.md` at the site root with `permalink: /blog/`, beside `newsletter.md`, so it stays out of the `blog/` glob.
4. Images: `assets/blog/<slug>/<file>`. The existing `assets` passthrough copy serves them. The sync owns everything under `assets/blog/`.
5. A `posts` collection from `blog/*.md`, sorted by `date` descending. The notes collection glob (`notes/**/*.md`) does not change, which keeps posts out of notes and backlinks.

### 5. Front matter

```yaml
title: "The Product Triad"
subtitle: "…"
date: 2026-03-03T13:00:00.000Z
substackUrl: "https://www.statetransition.co/p/the-product-triad"
substackId: 192xxxxxx
postType: "product thinking"
blogchains: []
coverImage: "/assets/blog/the-product-triad/<uuid>_1456x816.png"
```

`coverImage` is omitted when Substack's `cover_image` is null.

Strings are written with `JSON.stringify`, which is valid YAML, so titles with colons or quotes need no escaping. `date` drives Eleventy's sort and the displayed publish date. Blogchains go in `blogchains`, not `tags`, because Eleventy turns `tags` into collections. Keys are written in a fixed order.

### 6. Image file names from the S3 key

Each `substackcdn.com/image/fetch/…/<encoded URL>` decodes to `https://substack-post-media.s3.amazonaws.com/public/images/<uuid>_<w>x<h>.<ext>`. Download that original URL and save it as `<uuid>_<w>x<h>.<ext>`. The name is stable across runs, so a re-sync skips images already on disk and produces no diff. An image URL that does not decode this way falls back to downloading the `src` and naming it by a short SHA-256 of the URL. The post's `cover_image` goes through the same path, so a cover that also appears in the body is stored once.

### 7. Build, validate, then apply only the diff

The run has two phases.

1. **Build.** Fetch all posts, convert each to its Markdown string in memory, and resolve every image to its target path. Images not already on disk download into a staging directory under the OS temp dir. Nothing in the repo is touched in this phase.
2. **Apply.** Only after every post converts, every section maps, and every image is on disk or staged:
   - Compare each generated Markdown string byte for byte with `blog/<slug>.md`. Write the file only if it is missing or differs.
   - Move staged images into `assets/blog/<slug>/`.
   - Delete `blog/*.md` files (never `blog/blog.11tydata.js`) and `assets/blog/` files that the build did not produce.
   - Write each file to a temp name in the same directory, then rename it into place, so a crash cannot leave a half-written post.

Each file falls into one of four groups: new, updated, unchanged, or removed. The summary reports those counts.

The sync still fetches and converts every post on each run (about 11 API calls). *Alternative:* skip posts whose Substack `updated_at` has not moved. Rejected: a change to the conversion rules must re-render old posts too, and comparing the output already avoids needless writes at negligible cost.

### 8. Code location and tests

Sync code lives in `_scripts/substack-sync/`: `fetch.js` (API paging and retries), `convert.js` (Turndown rules), `links.js`, `images.js`, `index.js` (orchestration, diff and apply). `npm run sync` runs `node _scripts/substack-sync/index.js`. Tests use `node --test` against saved HTML fixtures cut from real posts, with no network. Add `_scripts/` to `.eleventyignore` so fixture `.html` files are not built as pages. The root `npm test` runs both the tufte-markdown tests and the sync tests.

### 9. Templates

1. `layouts/post.html` (layout `page.html`): title, subtitle, a metadata line with date, post type and blogchains, a "Read on State Transition" link, the content, then `{% include substack.html %}`.
2. `includes/head.html`: when `substackUrl` is set, use it for `<link rel="canonical">`; otherwise keep the current value. Treat `type == "post"` as `og:type` article. Add `<link rel="alternate" type="application/rss+xml" title="Glenn Stovall: Blog" href="/blog/feed.xml">` on every page.
3. `blog.md`: a `<ul class="post-list">` over `collections.posts`. Each `<li class="post-entry">` is a two-column flex row: a text block (title link, subtitle, date) that grows, and an optional cover thumbnail link with a fixed width and `aspect-ratio` plus `object-fit: cover`, so mixed image sizes line up as on the Substack archive. At narrow widths the thumbnail shrinks rather than wrapping below the text. Entries are separated by a thin rule in the theme's border colour. Plain HTML in the Markdown file, no client JavaScript. A small "RSS" link to `/blog/feed.xml` sits under the page heading.
4. `layouts/page.html`: insert `<li><a href="/blog/" …>Blog</a></li>` between Home and Newsletter, active when `page.url contains '/blog'`.
5. `assets/style.css`: classes for the post metadata line and the index entries, with a dark mode block, and `max-width: 100%` for post images if tufte.css does not already cover it.

### 10. RSS feed with the Eleventy RSS plugin

Add `@11ty/eleventy-plugin-rss` 1.x (the line that supports Eleventy 1.0) as a dev dependency and register it in `.eleventy.js`. A root-level `blog-feed.liquid` with `permalink: /blog/feed.xml` loops over `collections.posts` and writes RSS 2.0:

1. Channel: site title, `site.baseurl + "/blog/"`, `site.desc`, `lastBuildDate` from the newest post's `date`.
2. Item: `title`, `link` and `guid` set to `site.baseurl + post.url`, `pubDate` via the plugin's `dateToRfc822`, and `description` holding `post.templateContent | htmlToAbsoluteUrls: absolutePostUrl` inside CDATA.

Feed item content is the rendered HTML, so sidenotes show as their inline markup. Feed readers drop the Tufte CSS, and a sidenote then reads as a parenthetical, which is acceptable.

*Alternative:* hand-roll the XML with no plugin. Rejected: RFC 822 dates and absolute URL rewriting are the error-prone parts, and the plugin is Eleventy's own.

## Risks / Trade-offs

- [Substack's JSON API is undocumented and can change] → The sync fails before touching files (Decision 7), and the committed posts keep building. Fixing the script is a follow-up, not an outage.
- [Rate limiting on image downloads] → Images come from S3, not the Substack API, and a re-sync skips images already on disk. Retries with backoff cover the first full sync.
- [Turndown misses an unfamiliar Substack element] → Unknown elements fall through to Turndown's defaults, which keep their text. The integration tasks include a visual pass over posts that use each embed type.
- [Repo size grows by the image set] → 111 images at web sizes, a few tens of MB at most. Acceptable for a static site; revisit if it grows past that.
- [Hand edits to synced posts are lost on re-sync] → A hand-edited file differs from the generated content, so the incremental sync rewrites it. Documented in the sync command's README section. Fix content on Substack, then re-sync.
- [Full-content feed grows large, roughly 1–2 MB at 78 posts] → Acceptable for feed readers today. If it grows, cap the feed to the newest N posts; that changes only the feed template.
- [Duplicate content in search] → Canonical points at Substack (Decision 9.2), per Glenn's choice.

## Migration Plan

1. Land code, templates, and tests with no synced content.
2. Run `npm run sync`, review `git diff --stat` and a handful of posts in `npm start`, then commit the content in its own commit.
3. Rollback: revert the content commit and the nav change. Nothing on Substack changes, so there is nothing to undo there.
