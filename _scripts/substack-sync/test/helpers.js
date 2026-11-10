const fs = require("fs");
const path = require("path");

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, "fixtures", name), "utf8");
}

function jsonResponse(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body, arrayBuffer: async () => Buffer.from(JSON.stringify(body)) };
}

function bytesResponse(text, status = 200) {
  return { ok: status >= 200 && status < 300, status, arrayBuffer: async () => Buffer.from(text) };
}

function fakeFetch(routes) {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    const handler = routes(url, calls.filter((call) => call === url).length);
    if (!handler) throw new Error(`Unexpected request ${url}`);
    return handler;
  };
  return { fetchImpl, calls };
}

const fastOptions = { retryDelay: 0, pageDelay: 0 };

function post(overrides = {}) {
  return {
    id: 1,
    slug: "first-post",
    title: "First post",
    subtitle: "A subtitle",
    post_date: "2026-03-03T13:00:00.000Z",
    canonical_url: "https://www.statetransition.co/p/first-post",
    audience: "everyone",
    section_name: "Root Nodes",
    postTags: [],
    cover_image: null,
    body_html: "<p>Hello.</p>",
    ...overrides,
  };
}

module.exports = { fixture, jsonResponse, bytesResponse, fakeFetch, fastOptions, post };
