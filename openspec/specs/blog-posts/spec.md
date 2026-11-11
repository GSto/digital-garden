# blog-posts Specification

## Purpose

Presents synced State Transition posts on glennstovall.com: each post at its own page with its metadata, a `/blog/` index of every post, and a header nav entry that leads there.

## Requirements

### Requirement: Post pages
The site SHALL build one page per synced post at `/blog/<slug>/`, where `<slug>` is the post's Substack slug.

#### Scenario: Post URL
- **WHEN** the site is built with the synced post whose Substack slug is `jenkins-strategems`
- **THEN** the post is served at `/blog/jenkins-strategems/`

### Requirement: Post metadata display
Each post page SHALL show the title, the subtitle when present, the original publish date, the post type, each blogchain, and a link to the original post on Substack.

#### Scenario: Post with a blogchain
- **WHEN** a reader opens a post in the "Prompt Protocols" blogchain
- **THEN** the page shows its publish date, its post type, "Prompt Protocols", and a link to the Substack original

#### Scenario: Post without a blogchain
- **WHEN** a reader opens a post with no blogchains
- **THEN** the page shows no blogchain label and no empty placeholder

### Requirement: Canonical URL
Each post page SHALL declare its original Substack URL as its canonical URL. Pages other than blog posts SHALL keep their current canonical URL.

#### Scenario: Post canonical
- **WHEN** a search engine reads a post page
- **THEN** the page's canonical link is the post's original Substack URL

#### Scenario: Note canonical unchanged
- **WHEN** a search engine reads a note page
- **THEN** the canonical link is the note's own glennstovall.com URL

### Requirement: Blog index
The site SHALL serve a page at `/blog/` that lists every synced post once, ordered by original publish date with the newest first.

#### Scenario: Index order
- **WHEN** a reader opens `/blog/`
- **THEN** every synced post is listed once, ordered by original publish date with the newest first

### Requirement: Blog index entry layout
Each `/blog/` entry SHALL follow the main column of the Substack archive page: title, subtitle when present, and publish date stacked on the left, with the post's cover image on the right. The title and the image SHALL link to the post page.

#### Scenario: Entry with cover image
- **WHEN** a reader views the entry for a post that has a cover image
- **THEN** the entry shows the title, subtitle, and publish date on the left and the cover image on the right

#### Scenario: Entry without cover image
- **WHEN** a reader views the entry for a post with no cover image
- **THEN** the entry shows the title, subtitle, and date across the full width, with no empty image box

#### Scenario: Entry on a narrow screen
- **WHEN** a reader views `/blog/` at 375 pixels wide
- **THEN** each cover image stays to the right of its text at a smaller size, and the page does not scroll horizontally

### Requirement: RSS feed
The site SHALL serve a valid RSS 2.0 feed at `/blog/feed.xml` with one item per synced post, newest first. Each item SHALL carry the title, publish date, full post content, and a link to the post's page on glennstovall.com.

#### Scenario: Feed contents
- **WHEN** a feed reader fetches `/blog/feed.xml`
- **THEN** it receives one item per synced post, newest first, each with title, publish date, full content, and a `https://www.glennstovall.com/blog/<slug>/` link

#### Scenario: Absolute URLs in content
- **WHEN** a feed item's content contains a link or image with a site-relative path
- **THEN** the feed writes it as an absolute `https://www.glennstovall.com` URL

#### Scenario: Valid XML
- **WHEN** the site is built
- **THEN** `/blog/feed.xml` parses as well-formed XML with an RSS 2.0 root

### Requirement: Feed discovery
Every page SHALL advertise the blog feed with an RSS alternate link in its head, and `/blog/` SHALL show a visible link to the feed.

#### Scenario: Autodiscovery
- **WHEN** a feed reader is given any page URL on the site
- **THEN** it finds the blog feed through the page's RSS alternate link

#### Scenario: Visible link
- **WHEN** a reader opens `/blog/`
- **THEN** the page shows a link to `/blog/feed.xml`

### Requirement: Header navigation
The header nav SHALL include a "Blog" item linking to `/blog/`, placed after "Home" and before "Newsletter", and marked active on `/blog/` and every post page.

#### Scenario: Nav order
- **WHEN** a reader views any page with the header nav
- **THEN** the nav items read Home, Blog, Newsletter, Notes, Book, in that order

#### Scenario: Active state
- **WHEN** a reader is on `/blog/` or a post page
- **THEN** the "Blog" nav item is marked active and no other item is

### Requirement: Separation from notes
Synced posts SHALL NOT appear in the notes collection, the notes index, or any note's backlinks.

#### Scenario: Notes unaffected
- **WHEN** the site is built with synced posts
- **THEN** the notes collection contains the same notes it contained before the posts were added

### Requirement: Post styling
Post pages and the blog index SHALL use the site's typography and the active colour scheme, and SHALL fit a 375 pixel wide screen without horizontal scrolling, including images.

#### Scenario: Dark mode
- **WHEN** a reader's system prefers a dark colour scheme
- **THEN** post metadata and the index list use dark mode colours with readable contrast

#### Scenario: Narrow screen
- **WHEN** a post with a wide image is viewed at 375 pixels wide
- **THEN** the image scales to the column and the page does not scroll horizontally
