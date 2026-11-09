const test = require("node:test");
const assert = require("node:assert");
const { render } = require("./helpers");

test("registers on a plain markdown-it instance", () => {
  assert.strictEqual(render("Hello *world*"), "<p>Hello <em>world</em></p>\n");
});
