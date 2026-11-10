const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");
const tufteMarkdown = require("../../../lib/tufte-markdown");
const { convertBody, renderPost, postType, blogchains } = require("../convert");
const { fixture, post } = require("./helpers");

const slugs = new Set(["this-new-years-try-a-strategy-instead", "claudatouillie"]);
const convert = (name) => convertBody(fixture(name), { slug: "s", slugs });

test("each fixture contains the element it is named for", () => {
  const markers = {
    "footnotes.html": 'class="footnote-anchor"',
    "captioned-image.html": 'class="captioned-image-container"',
    "subscribe-widget.html": "subscription-widget",
    "youtube.html": 'class="youtube-wrap"',
    "tweet.html": 'class="twitter-embed"',
    "digest-embed.html": 'class="digest-post-embed"',
    "pullquote.html": 'class="pullquote"',
    "cross-link.html": 'href="https://www.statetransition.co/p/',
    "preformatted.html": '<pre class="text">',
  };
  const files = fs.readdirSync(path.join(__dirname, "fixtures"));
  assert.deepStrictEqual(files.sort(), Object.keys(markers).sort());
  for (const [file, marker] of Object.entries(markers)) assert.ok(fixture(file).includes(marker), file);
});

test("footnotes become footnote references with definitions after the body", () => {
  assert.strictEqual(
    convert("footnotes.html").markdown,
    "Banjo-Kazooie began as Project Dream[^1].\n\n[^1]: [Project Dream fan wiki](https://banjokazooie.fandom.com/wiki/Project_Dream)"
  );
});

test("converted footnotes render as sidenotes on the site", () => {
  const html = new MarkdownIt({ html: true }).use(tufteMarkdown).render(convert("footnotes.html").markdown);
  assert.match(html, /class="sidenote"/);
  assert.match(html, /Project Dream fan wiki/);
});

test("multi-paragraph footnotes are indented under their definition", () => {
  const html = '<p>A<a class="footnote-anchor" href="#footnote-1">1</a></p><div class="footnote"><a class="footnote-number" href="#a">1</a><div class="footnote-content"><p>One.</p><p>Two.</p></div></div>';
  assert.strictEqual(convertBody(html, { slug: "s", slugs }).markdown, "A[^1]\n\n[^1]: One.\n\n    Two.");
  const html2 = new MarkdownIt({ html: true }).use(tufteMarkdown).render(convertBody(html, { slug: "s", slugs }).markdown);
  assert.match(html2, /class="sidenote">One\.<br>Two\./);
});

test("captioned images use the local path and the caption as title", () => {
  const { markdown, images } = convert("captioned-image.html");
  assert.strictEqual(
    markdown,
    '![](/assets/blog/s/ded8d6ca-01f1-4986-b2e0-e0c281633098_800x519.jpeg "Spring, Joseph Rubens Powell. watercolor and gouache over graphite on wove paper 1988.20.27")'
  );
  assert.strictEqual(images.length, 1);
  const html = new MarkdownIt({ html: true }).use(tufteMarkdown).render(markdown);
  assert.match(html, /<figure><img src="\/assets\/blog\/s\/[^"]+" alt=""><figcaption>Spring, Joseph/);
});

test("captions with quotes are escaped in the title", () => {
  const html = '<div class="captioned-image-container"><figure><img src="https://example.com/a.png" alt="A"><figcaption>The "best" one</figcaption></figure></div>';
  assert.match(convertBody(html, { slug: "s", slugs }).markdown, /"The \\"best\\" one"\)$/);
});

test("subscribe widgets and subscribe, share, and comment buttons are dropped", () => {
  assert.strictEqual(convert("subscribe-widget.html").markdown, "Before.\n\nAfter.");
});

test("YouTube embeds become links to the video", () => {
  assert.strictEqual(convert("youtube.html").markdown, "[Watch on YouTube](https://www.youtube.com/watch?v=w72kj20YNA0)");
});

test("a YouTube embed without a video id fails loudly", () => {
  assert.throws(() => convertBody('<div class="youtube-wrap" data-attrs="{}"><iframe src="x"></iframe></div>', { slug: "s", slugs }), /no video id/);
});

test("tweet embeds become links to the tweet", () => {
  assert.strictEqual(convert("tweet.html").markdown, "[Post by Chris Beiser (@ctbeiser)](https://x.com/ctbeiser/status/2011301974491480256)");
});

test("embedded post cards become links, rewritten when the post is synced", () => {
  assert.strictEqual(convert("digest-embed.html").markdown, "[Claudatouillie](/blog/claudatouillie/)");
});

test("other iframes become links to their source", () => {
  assert.strictEqual(convertBody('<iframe src="https://www.tiktok.com/player/v1/1"></iframe>', { slug: "s", slugs }).markdown, "[Embedded media](https://www.tiktok.com/player/v1/1)");
});

test("pull quotes become block quotes", () => {
  assert.match(convert("pullquote.html").markdown, /^> This is an excerpt from my upcoming book/);
});

test("cross-post links point to the blog", () => {
  assert.match(convert("cross-link.html").markdown, /\[new strategy\]\(\/blog\/this-new-years-try-a-strategy-instead\/\)/);
});

test("preformatted text keeps its line breaks and drops editor labels", () => {
  const { markdown } = convert("preformatted.html");
  assert.match(markdown, /^<pre>Just beyond yourself\nIt’s where you need to be\n/);
  assert.doesNotMatch(markdown, /label|original spacing/);
});

test("strikethrough is kept", () => {
  assert.strictEqual(convertBody("<p><s>The Metaverse</s></p>", { slug: "s", slugs }).markdown, "~~The Metaverse~~");
});

test("sections map to post types", () => {
  assert.strictEqual(postType(post({ section_name: "At the Edges" })), "at the edges");
  assert.strictEqual(postType(post({ section_name: "Product Thinking Book" })), "product thinking");
  assert.strictEqual(postType(post({ section_name: "Root Nodes" })), "articles");
});

test("an unknown or missing section fails and names the post and section", () => {
  assert.throws(() => postType(post({ section_name: "Gossip" })), /"first-post" is in section "Gossip"/);
  assert.throws(() => postType(post({ section_name: null })), /"first-post" is in section "null"/);
});

test("tags become blogchains", () => {
  assert.deepStrictEqual(blogchains(post({ postTags: [{ name: "Prompt Protocols" }] })), ["Prompt Protocols"]);
  assert.deepStrictEqual(blogchains(post({ postTags: undefined })), []);
});

test("front matter round-trips through the front matter parser", () => {
  const rendered = renderPost(
    post({
      title: 'Jenkins: the "strategems"',
      postTags: [{ name: "Prompt Protocols" }],
      cover_image: "https://substack-post-media.s3.amazonaws.com/public/images/abc-123_10x20.png",
    }),
    slugs
  );
  const { data, content } = matter(rendered.markdown);
  assert.deepStrictEqual(data, {
    title: 'Jenkins: the "strategems"',
    subtitle: "A subtitle",
    date: new Date("2026-03-03T13:00:00.000Z"),
    substackUrl: "https://www.statetransition.co/p/first-post",
    substackId: 1,
    postType: "articles",
    blogchains: ["Prompt Protocols"],
    coverImage: "/assets/blog/first-post/abc-123_10x20.png",
  });
  assert.strictEqual(content, "\nHello.\n");
  assert.deepStrictEqual(rendered.images.map((image) => image.file), ["abc-123_10x20.png"]);
});

test("empty subtitle and missing cover image are omitted", () => {
  const { data } = matter(renderPost(post({ subtitle: "" }), slugs).markdown);
  assert.ok(!("subtitle" in data));
  assert.ok(!("coverImage" in data));
});

test("conversion errors name the post", () => {
  assert.throws(() => renderPost(post({ section_name: "Gossip" }), slugs), /Could not convert post "first-post"/);
});
