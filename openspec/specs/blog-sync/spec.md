# blog-sync Specification

## Purpose

Copies every public State Transition post from Substack into the site as Markdown with local images, so the site holds its own copy of the writing. The copy is one-way: the site never writes to Substack.

## Requirements

### Requirement: Manual sync command
The site SHALL provide one command that runs a full sync of State Transition posts into the site, and that command SHALL make only read requests to Substack.

#### Scenario: Run the sync
- **WHEN** Glenn runs the sync command
- **THEN** every public State Transition post is written into the site as one Markdown file

#### Scenario: Read-only against Substack
- **WHEN** the sync runs
- **THEN** it sends no request that creates, edits, or deletes anything on Substack

### Requirement: Post selection
The sync SHALL include every published State Transition post whose audience is everyone, and SHALL skip paid-only posts.

#### Scenario: Paid post
- **WHEN** a State Transition post is restricted to paid subscribers
- **THEN** the sync writes no file for it and reports it as skipped

### Requirement: Markdown conversion
The sync SHALL convert each post body to Markdown that renders on the site with headings, emphasis, lists, block quotes, links, code, and footnotes intact.

#### Scenario: Footnotes become sidenotes
- **WHEN** a post contains Substack footnotes
- **THEN** the Markdown uses footnote syntax, so each footnote renders as a sidenote

#### Scenario: Image captions
- **WHEN** a post contains a captioned image
- **THEN** the Markdown image carries the caption as its title, so it renders as a captioned figure

### Requirement: Substack-only widgets
The sync SHALL drop Substack subscribe widgets and subscribe or share buttons, and SHALL turn video, tweet, and embedded-post cards into plain links to their source.

#### Scenario: Subscribe widget
- **WHEN** a post body contains a Substack subscribe widget or button
- **THEN** the Markdown contains no trace of it

#### Scenario: Embedded YouTube video
- **WHEN** a post embeds a YouTube video
- **THEN** the Markdown contains a link to that video in its place

### Requirement: Post metadata
Each synced post SHALL record its title, subtitle when present, original publish date, original Substack URL, post type, blogchains, and the site path of its cover image when it has one.

#### Scenario: Metadata recorded
- **WHEN** a post is synced
- **THEN** its file records the original publish date and the original Substack URL exactly as Substack reports them

#### Scenario: Post without a cover image
- **WHEN** a post has no cover image on Substack
- **THEN** its file records no cover image and the sync continues

### Requirement: Post type mapping
The sync SHALL map the Substack section to a post type: "At the Edges" to `at the edges`, "Product Thinking Book" to `product thinking`, and "Root Nodes" to `articles`.

#### Scenario: Root Nodes post
- **WHEN** a post belongs to the Root Nodes section
- **THEN** its post type is `articles`

#### Scenario: Unknown section
- **WHEN** a post belongs to a section with no mapping, or to no section
- **THEN** the sync stops with an error naming the post and the section, and changes no files

### Requirement: Blogchain mapping
The sync SHALL record each Substack post tag as a blogchain on that post, keeping the tag's name, and SHALL record an empty list when a post has no tags.

#### Scenario: Tagged post
- **WHEN** a post carries the Substack tag "Prompt Protocols"
- **THEN** its blogchains include "Prompt Protocols"

### Requirement: Internal link rewriting
The sync SHALL rewrite every link from one synced post to another synced post so it points to that post's page on glennstovall.com, and SHALL leave all other links unchanged.

#### Scenario: Link to another post
- **WHEN** a post links to `https://www.statetransition.co/p/jenkins-strategems`
- **THEN** the synced Markdown links to `/blog/jenkins-strategems/`

#### Scenario: Link to another domain form
- **WHEN** a post links to another synced post through `statetransition.substack.com/p/<slug>`, with or without query parameters
- **THEN** the synced Markdown links to `/blog/<slug>/`

#### Scenario: Link to a non-post page
- **WHEN** a post links to a State Transition page that is not a synced post, such as the subscribe page
- **THEN** the link is unchanged

### Requirement: Local images
The sync SHALL download every image a post displays, and the post's cover image, into the site and SHALL reference the local copies, so no synced post or blog index entry loads an image from Substack.

#### Scenario: Image downloaded
- **WHEN** a post contains an image hosted on `substackcdn.com`
- **THEN** the image file exists in the site and the post's Markdown references the site path

#### Scenario: Cover image downloaded
- **WHEN** a post has a cover image on Substack
- **THEN** the cover image file exists in the site and the post's recorded cover image is its site path

#### Scenario: Image download fails
- **WHEN** an image cannot be downloaded
- **THEN** the sync stops with an error naming the post and image URL, and changes no files

### Requirement: Incremental sync
The sync SHALL write a post's file or image only when it is new or its content differs from the file already in the site, SHALL leave every other synced file untouched, and SHALL remove posts and images no longer public on Substack.

#### Scenario: No changes upstream
- **WHEN** the sync runs twice with no change on Substack
- **THEN** the second run writes no files, every synced file keeps its modification time, and the working tree is unchanged

#### Scenario: One post edited upstream
- **WHEN** one post is edited on Substack and the sync runs
- **THEN** only that post's file, and any image it newly uses, is written

#### Scenario: New post upstream
- **WHEN** a new public post appears on Substack and the sync runs
- **THEN** the sync adds its file and images and leaves existing posts untouched

#### Scenario: Post removed upstream
- **WHEN** a previously synced post is no longer public on Substack
- **THEN** the next sync deletes its Markdown file and its images

#### Scenario: Hand-edited post
- **WHEN** a synced post file was edited by hand and the sync runs
- **THEN** the sync replaces it with the content from Substack

### Requirement: Sync summary
At the end of a run the sync SHALL report how many posts were new, updated, unchanged, removed, and skipped, and how many images were downloaded.

#### Scenario: Summary after a no-op run
- **WHEN** the sync runs with no change on Substack
- **THEN** it reports every post as unchanged and zero images downloaded

### Requirement: Failure safety
If the sync fails before every post converts and every image downloads, it SHALL write, change, and delete no synced files, and SHALL exit with a non-zero status and a message naming the failure.

#### Scenario: Substack rate limit
- **WHEN** Substack keeps refusing requests after the sync's retries
- **THEN** the sync exits non-zero and every existing synced file is unchanged
