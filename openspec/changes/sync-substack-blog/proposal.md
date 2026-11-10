# Proposal

## Why

Glenn's long-form writing lives only on Substack (State Transition, served at `www.statetransition.co`), so glennstovall.com links out to it instead of hosting it. Copying the archive onto the site gives readers one place to browse the writing alongside the notes, and keeps a self-owned copy of every post and image if Substack changes or disappears.

## What Changes

- Add a sync script that reads every public State Transition post from Substack's public JSON API, converts each post body from HTML to Markdown, and writes one Markdown file per post into the site.
- Store each post's metadata in front matter: title, subtitle, original publish date, original Substack URL, post type, blogchain, and cover image.
- Map Substack sections to post types: "At the Edges" → `at the edges`, "Product Thinking Book" → `product thinking`, "Root Nodes" → `articles`. The request listed `"product thinking "` with a trailing space; this proposal assumes the space is a typo.
- Map Substack post tags to blogchains (today: Prompt Protocols, Career Ownership, Financial Agency, Edge of Uncertainty, Product Roundup).
- Rewrite links from one State Transition post to another so they point to the post's page on glennstovall.com. 34 such links exist today.
- Download every post image (111 today, all on `substackcdn.com`) and each post's cover image into the site, and point the Markdown and front matter at the local copies.
- Add an Eleventy blog collection and a post layout that shows the metadata.
- Add a `/blog/` index page modelled on the main column of the Substack archive page: one entry per post, newest first, showing the title, subtitle, and publish date, with the post's cover image on the right.
- Point each blog post's `rel=canonical` at its original Substack URL, so search engines treat Substack as the source.
- Show the State Transition subscribe link on blog post pages.
- Add a "Blog" item to the header nav between "Home" and "Newsletter".
- Add an `npm run sync` command for manual re-runs, and commit the output of one full sync.

The sync is one-way. It never writes to Substack.

## Capabilities

### New Capabilities

- `blog-sync`: how the site copies State Transition posts from Substack, including which posts it fetches, the Markdown and metadata it writes, the section and tag mappings, link rewriting, image downloading, and re-run behaviour.
- `blog-posts`: how synced posts appear on the site, including post URLs, the post page and its metadata, the `/blog/` index, canonical links, and the header nav entry.

### Modified Capabilities

- `newsletter-signup`: the subscribe link requirement expands from the home, newsletter, and note pages to include blog post pages.

## Impact

- **New code:** a sync script under `_scripts/`, a blog directory data file, a post layout, and a `/blog/` index page.
- **Changed templates:** `layouts/page.html` (nav item), `includes/head.html` (canonical override for blog posts).
- **Styles:** `assets/style.css` for post metadata and the index list, with dark mode.
- **Content:** about 78 new Markdown files and about 111 images committed to the repo.
- **Dependencies:** one new dev dependency for HTML-to-Markdown conversion.
- **External dependency:** Substack's public, undocumented JSON API. If it changes, the script breaks, but the committed posts keep building.
