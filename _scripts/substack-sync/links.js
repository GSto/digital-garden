const PUBLICATION_HOSTS = new Set(["statetransition.co", "www.statetransition.co", "statetransition.substack.com"]);

function postUrl(slug) {
  return `/blog/${slug}/`;
}

function rewriteHref(href, slugs) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (!PUBLICATION_HOSTS.has(url.hostname)) return href;
  const match = url.pathname.match(/^\/p\/([^/]+)\/?$/);
  if (!match || !slugs.has(match[1])) return href;
  return postUrl(match[1]) + url.hash;
}

module.exports = { rewriteHref, postUrl };
