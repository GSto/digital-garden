const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { render } = require("./helpers");

const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
const blocks = [...readme.matchAll(/^```(\w+)\n([\s\S]*?)^```$/gm)].map((m) => ({ lang: m[1], body: m[2] }));
const pairs = blocks
  .map((block, i) => [block, blocks[i + 1]])
  .filter(([a, b]) => a.lang === "markdown" && b && b.lang === "html");

test("the README has rendered examples", () => {
  assert.ok(pairs.length > 0);
});

for (const [source, expected] of pairs) {
  test(`README example renders as documented: ${source.body.split("\n")[0]}`, () => {
    assert.strictEqual(render(source.body).trim(), expected.body.trim());
  });
}
