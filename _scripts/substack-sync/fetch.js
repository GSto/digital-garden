const BASE_URL = "https://www.statetransition.co";

const DEFAULTS = {
  fetchImpl: (...args) => fetch(...args),
  baseUrl: BASE_URL,
  retries: 4,
  retryDelay: 2000,
  pageDelay: 1000,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, options) {
  const { fetchImpl, retries, retryDelay } = { ...DEFAULTS, ...options };
  let lastError;
  for (let attempt = 0; attempt < retries; attempt++) {
    if (attempt > 0) await sleep(retryDelay * 2 ** (attempt - 1));
    let response;
    try {
      response = await fetchImpl(url, { headers: { "User-Agent": "glennstovall.com blog sync" } });
    } catch (error) {
      lastError = `${error.message}`;
      continue;
    }
    if (response.ok) return response;
    lastError = `HTTP ${response.status}`;
    if (response.status !== 429 && response.status < 500) break;
  }
  throw new Error(`GET ${url} failed: ${lastError}`);
}

async function getJson(url, options) {
  return (await request(url, options)).json();
}

async function getBuffer(url, options) {
  return Buffer.from(await (await request(url, options)).arrayBuffer());
}

async function fetchPages(path, options) {
  const { baseUrl, pageDelay } = { ...DEFAULTS, ...options };
  const posts = [];
  let cursor = null;
  do {
    const separator = path.includes("?") ? "&" : "?";
    const url = `${baseUrl}${path}${cursor ? `${separator}cursor=${encodeURIComponent(cursor)}` : ""}`;
    const page = await getJson(url, options);
    posts.push(...page.posts);
    cursor = page.posts.length ? page.nextCursor : null;
    if (cursor) await sleep(pageDelay);
  } while (cursor);
  return posts;
}

async function fetchPosts(options = {}) {
  const posts = await fetchPages("/api/v1/posts?limit=20", options);
  const archive = await fetchPages("/api/v1/archive?sort=new", options);
  const sections = new Map(archive.map((post) => [post.id, post.section_name]));
  return posts.map((post) => ({ ...post, section_name: sections.get(post.id) ?? null }));
}

function selectPosts(posts) {
  const kept = [];
  const skipped = [];
  for (const post of posts) {
    if (post.audience === "everyone" && post.is_published !== false) kept.push(post);
    else skipped.push(post);
  }
  return { kept, skipped };
}

module.exports = { request, getJson, getBuffer, fetchPages, fetchPosts, selectPosts, BASE_URL };
