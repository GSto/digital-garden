# Design

## Context

See proposal.md for motivation and specs/ for required behaviour.

Facts gathered from Substack on 2026-11-10 that shape the approach:

1. The publication's canonical host is `www.statetransition.co`; `statetransition.substack.com` serves the same API. Post links inside bodies use `https://www.statetransition.co/p/<slug>`.
2. 78 posts, all `type: newsletter`, all `audience: everyone`. Sections: Root Nodes (40), At the Edges (20), Product Thinking Book (18). Tags: Prompt Protocols (14), Career Ownership (5), Financial Agency (3), Edge of Uncertainty (3), Product Roundup (1).
3. `GET /api/v1/archive?sort=new[&cursor=…]` returns 12 posts per page with `section_name`, `postTags` and `canonical_url`, but only the first page includes `body_html`.
4. `GET /api/v1/posts?limit=20[&cursor=…]` returns `body_html` and `postTags` for every post, plus `section_id`, but no `section_name`. Four pages cover the archive.
5. `GET /api/v1/posts/<slug>` returned HTTP 429 after a few rapid calls. A per-post fetch loop is not viable without heavy throttling.
6. Bodies contain: 111 images, all `https://substackcdn.com/image/fetch/<transforms>/<url-encoded S3 URL>`; 81 footnotes (`footnote-anchor`, `div.footnote`); 25 subscription widgets; 43 buttons; 16 YouTube embeds; 15 tweet embeds; 11 embedded-post cards (`digest-post-embed`); 9 pull quotes; 34 cross-post links; one TikTok iframe; one preformatted block (`div.preformatted-block` with an editor-only `label.hide-text`).
7. Found during the first full sync: older images live in a retired `bucketeer-…` S3 bucket that returns HTTP 403, while `substackcdn.com` still serves them. Full-size originals reach 4096px and 5 MB, 85 MB in total.

Site constraints: Eleventy `1.0.0-canary.10`, Liquid with `dynamicPartials: false`, Node 26 (global `fetch`, `node --test`), markdown-it with the tufte-markdown plugin (footnotes become sidenotes, a solitary image with a title becomes a captioned figure, `##` headings start `<section>`s and content before the first `##` is not wrapped). `.html` files anywhere outside `.eleventyignore` get built as pages. Markdown files are pre-rendered with Liquid unless their own front matter says otherwise.

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

1. `div.subscription-widget-wrap*`, `p.button-wrapper` (subscribe, share, and "Leave a comment"), `div.captioned-button-wrap`, `label.hide-text`, and stray `form`, `button`, `input`, and `svg` elements are removed.
2. `div.captioned-image-container` becomes `![alt](/assets/blog/<slug>/<file> "caption")` on its own line, so tufte-markdown renders a captioned figure. The caption is flattened to plain text because tufte-markdown escapes captions; links inside captions are lost. No caption means no title.
3. `a.footnote-anchor` becomes `[^n]`; each `div.footnote` becomes a `[^n]: …` definition appended after the body, with continuation paragraphs indented four spaces. tufte-markdown then renders sidenotes.
4. `div.youtube-wrap` becomes a link to `https://www.youtube.com/watch?v=<id>` from its `data-attrs`; `div.twitter-embed` becomes a link to the tweet URL from its `data-attrs`; `div.digest-post-embed` becomes a link to the embedded post's URL, then passes through link rewriting. Tweet and post cards are empty `div`s, which Turndown treats as blank, so they are handled in Turndown's `blankReplacement` as well as in a rule. Any other `iframe` becomes an "Embedded media" link to its `src`.
5. `div.pullquote` becomes a block quote.
6. A `pre` with no `code` child stays raw HTML (`<pre>…</pre>`) so its line breaks survive; `s`, `del`, and `strike` become `~~…~~`.

Turndown's `remove()` filters run after every rule, including the defaults, so removals are written as rules that return an empty string. Rules added later take priority, so the removal rule is added last.

The converter fails loudly on an element it has a rule for but cannot parse (for example a YouTube embed with no video id), instead of emitting empty output.

*Alternative:* store raw `body_html` in the Markdown file. Rejected: the request asks for Markdown, and footnotes would not become sidenotes.

### 3. Link rewriting by slug set, after conversion inputs are known

Collect the set of synced slugs first. For each `href`, parse it as a URL; if the host is `statetransition.co`, `www.statetransition.co` or `statetransition.substack.com`, the path is `/p/<slug>`, and `<slug>` is in the set, replace it with `/blog/<slug>/`, dropping query string and keeping any `#fragment`. Every other link is untouched. This runs in the Turndown link rule, so it covers body links and embed cards alike.

### 4. File layout

1. Posts: `blog/<slug>.md`. The sync owns every `.md` file in `blog/`.
2. Directory data: `blog/blog.11tydata.js` sets `layout: post.html`, `type: "post"`, and a computed permalink `/blog/<fileSlug>/` (an `eleventyComputed` function, so it does not depend on the template engine). Hand-written; the sync never touches it.
3. Index: `blog.html` at the site root with `permalink: /blog/`, beside `newsletter.md`, so it stays out of the `blog/` glob. It is a Liquid HTML template rather than Markdown because the Liquid loop's blank and indented lines would end markdown-it's HTML blocks and turn entries into code blocks.
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
templateEngineOverride: "md"
```

`subtitle` is omitted when empty and `coverImage` when Substack's `cover_image` is null.

`templateEngineOverride: md` stops Liquid from pre-rendering post bodies, where any `{{` or `{%` in the text would break the build. It has to be in each post's front matter: Eleventy `1.0.0-canary.10` ignores it in the directory data file.

Strings are written with `JSON.stringify`, which is valid YAML, so titles with colons or quotes need no escaping. `date` drives Eleventy's sort and the displayed publish date. Blogchains go in `blogchains`, not `tags`, because Eleventy turns `tags` into collections. Keys are written in a fixed order.

### 6. Image names from the S3 key, bytes from the resized CDN copy

Each `substackcdn.com/image/fetch/…/<encoded URL>` decodes to an S3 original such as `https://substack-post-media.s3.amazonaws.com/public/images/<uuid>_<w>x<h>.<ext>`; captioned images also carry it in the `img`'s `data-attrs.src`. The file is saved as `<uuid>_<w>x<h>.<ext>`. The name is stable across runs, so a re-sync skips images already on disk and produces no diff. The `<w>x<h>` in the name is the original's size, not the stored file's.

Sources are tried in order:

1. `https://substackcdn.com/image/fetch/w_1456,c_limit,f_<format>,fl_progressive:steep/<encoded original>`: the width Substack readers see, at most 1456px, in the original's format (`f_jpg`, `f_png`, `f_gif`, `f_webp`), so the bytes match the extension.
2. The S3 original, if the CDN fails.

A 403 or 404 is not retried, so falling back is immediate. An image URL that does not decode falls back to downloading the `src` as given and naming it by a short SHA-256 of the URL. The post's `cover_image` goes through the same path, so a cover that also appears in the body is stored once.

*Alternative:* download originals only, the first plan. Rejected after the first full sync: 85 MB of images, up to 4096px, and the retired `bucketeer` bucket returns 403. The resized copies total 50 MB, of which 38 MB is photo-like PNGs. *Alternative:* convert PNGs to JPEG (about 9× smaller). Not taken, because it would drop transparency; still open if repo size matters.

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

1. `layouts/post.html` (layout `page.html`): `h1.post-title`, subtitle, a metadata line with date, post type and blogchains, a "Read on State Transition" link, the content wrapped in `<section class="post-body">`, then `{% include substack.html %}`. The wrapper is needed because tufte-markdown only wraps content from the first `##` onward; without it, intro paragraphs run full width and their sidenotes fall off-screen. Dates are formatted by two filters added in `.eleventy.js`: `readableDate` ("Mar 3, 2026", in UTC) and `isoDate`.
2. `includes/head.html`: when `substackUrl` is set, use it for `<link rel="canonical">`; otherwise keep the current value. Treat `type == "post"` as `og:type` article. Add `<link rel="alternate" type="application/rss+xml" title="Glenn Stovall: Blog" href="/blog/feed.xml">` on every page.
3. `blog.html`: a `<ul class="post-list">` over `collections.posts`. Each `<li class="post-entry">` is a two-column flex row: a text block (title link, subtitle, date) that grows, and an optional cover thumbnail link with a fixed width and `aspect-ratio` plus `object-fit: cover`, so mixed image sizes line up as on the Substack archive. At narrow widths the thumbnail shrinks rather than wrapping below the text. Entries are separated by a thin rule in the theme's border colour. No client JavaScript. A small "RSS feed" link to `/blog/feed.xml` sits under the page heading.
4. `layouts/page.html`: insert `<li><a href="/blog/" …>Blog</a></li>` between Home and Newsletter, active when `page.url contains '/blog'`. The nav list now wraps (`flex-wrap`), since five items do not fit on one line at 375px.
5. `assets/style.css`, all scoped to blog classes, with dark mode overrides. This departs from stock Tufte CSS on purpose, after review:
   - Post metadata line and index entries.
   - `.post-body p`: 2.2rem margins and line height, up from 1.4rem and 2rem.
   - Headings: more space above, little below, and no gap before a heading's first paragraph, so `###` subsections read as attached to their text. `h3` is 1.9rem and `h4` gets an italic style.
   - `.post-body figure { display: flow-root }`, so the floated Tufte caption stays inside its figure instead of crowding the next paragraph.
   - `overflow-wrap: break-word` and `hyphens: auto` on the post body and title, and `white-space: pre-wrap` on `pre`, so long URLs, long title words, and the poem fit a 375px screen.

### 10. RSS feed with filters registered by hand

`@11ty/eleventy-plugin-rss` 1.2 is a dev dependency, but the plugin is not added with `addPlugin`. Its version check rejects the prerelease `1.0.0-canary.10` with a warning on every build, and 1.x registers its filters for Nunjucks only. Instead, `.eleventy.js` registers Liquid filters itself:

- `getNewestCollectionItemDate`: the plugin's exported function.
- `htmlToAbsoluteUrls`: an async Liquid filter around the plugin's exported `convertHtmlToAbsoluteUrls`.
- `dateToRfc822`: `new Date(date).toUTCString()`. The plugin's version formatted local time but labelled it `+0000`, so a 13:00 UTC post showed as 08:00.

A root-level `blog-feed.liquid` with `permalink: /blog/feed.xml` loops over `collections.posts` and writes RSS 2.0:

1. Channel: site title, `site.baseurl + "/blog/"`, `site.desc`, a self `atom:link`, and `lastBuildDate` from the newest post's `date` when there are posts.
2. Item: `title`, `link` and `guid` set to `site.baseurl + post.url`, `pubDate`, and `description` holding `post.templateContent | htmlToAbsoluteUrls: absolutePostUrl` inside CDATA.

Feed item content is the rendered HTML, so sidenotes show as their inline markup. Feed readers drop the Tufte CSS, and a sidenote then reads as a parenthetical, which is acceptable.

*Alternative:* hand-roll every filter with no plugin dependency. Not taken: absolute URL rewriting is the error-prone part, and the plugin's exported function handles it. *Alternative:* upgrade Eleventy so the plugin loads normally. Out of scope for this change.

## Risks / Trade-offs

- [Substack's JSON API is undocumented and can change] → The sync fails before touching files (Decision 7), and the committed posts keep building. Fixing the script is a follow-up, not an outage.
- [Rate limiting on image downloads] → Images come from the CDN and S3, not the Substack API, and a re-sync skips images already on disk. The full sync downloaded 165 images in about a minute with no 429s.
- [Turndown misses an unfamiliar Substack element] → Unknown elements fall through to Turndown's defaults, which keep their text. The integration tasks include a visual pass over posts that use each embed type. This pass caught the `label.hide-text` editor label, which the first fixture had cut out.
- [Repo size grows by the image set] → 165 images at 1456px, 50 MB, committed. Converting the 38 MB of PNGs to JPEG is the next lever if this matters.
- [Substack content is reproduced as written] → Two quirks in source posts come through unchanged: an `##` section with no content and a Markdown link typed as plain text, both in "The 4 dimensions of advisory work". Fix them on Substack, then re-sync.
- [Hand edits to synced posts are lost on re-sync] → A hand-edited file differs from the generated content, so the incremental sync rewrites it. Documented in the sync command's README section. Fix content on Substack, then re-sync.
- [Full-content feed grows large] → 560 KB at 78 posts. Acceptable for feed readers today. If it grows, cap the feed to the newest N posts; that changes only the feed template.
- [Duplicate content in search] → Canonical points at Substack (Decision 9.2), per Glenn's choice.

## Migration Plan

0. Fix the existing quilt crash in tufte-markdown first (`ca3f522`): `quilts.js` passed the document env to `parseInline`, which re-ran markdown-it-footnote's tail rule and broke the whole build for any page with both a quilt and footnotes.
1. Land code, templates, and tests with no synced content.
2. Run `npm run sync`, review `git diff --stat` and a handful of posts in `npm start`, then commit the content in its own commit.
3. Rollback: revert the content commit and the nav change. Nothing on Substack changes, so there is nothing to undo there.
