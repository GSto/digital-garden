const test = require("node:test");
const assert = require("node:assert");
const { createMd, render } = require("./helpers");

test("an image alone in its paragraph becomes a figure", () => {
  assert.strictEqual(
    render("![Dreyfus model](/assets/images/dreyfus_model.png)\n"),
    '<figure><img src="/assets/images/dreyfus_model.png" alt="Dreyfus model"></figure>\n'
  );
});

test("an image inside a sentence stays inline", () => {
  assert.strictEqual(render("See ![icon](/i.png) here.\n"), '<p>See <img src="/i.png" alt="icon"> here.</p>\n');
});

test("the image title becomes the caption and the alt text is kept", () => {
  assert.strictEqual(
    render('![Pyramid](/p.png "The McLeod hierarchy")\n'),
    '<figure><img src="/p.png" alt="Pyramid"><figcaption>The McLeod hierarchy</figcaption></figure>\n'
  );
});

test("an image without a title has no caption", () => {
  assert.doesNotMatch(render("![](/p.png)\n"), /figcaption/);
});

test("captions are escaped", () => {
  assert.match(render('![](/p.png "Fish & <chips>")\n'), /<figcaption>Fish &amp; &lt;chips&gt;<\/figcaption>/);
});

test("{.fullwidth} makes a full-width figure", () => {
  assert.strictEqual(
    render('![](/chart.png "Exports by year"){.fullwidth}\n'),
    '<figure class="fullwidth"><img src="/chart.png" alt=""><figcaption>Exports by year</figcaption></figure>\n'
  );
});

test("{.margin} makes a margin figure with a toggle", () => {
  assert.strictEqual(
    render("![](/icon.png \"Tufte's sparkline\"){.margin}\n"),
    '<p><label for="mf-1" class="margin-toggle">&#8853;</label><input type="checkbox" id="mf-1" class="margin-toggle"/><span class="marginnote"><img src="/icon.png" alt=""><br>Tufte\'s sparkline</span></p>\n'
  );
});

test("margin figures get distinct ids in reading order", () => {
  const html = render("![](/a.png){.margin}\n\n![](/b.png){.margin}\n");
  assert.match(html, /id="mf-1"[\s\S]*\/a\.png[\s\S]*id="mf-2"[\s\S]*\/b\.png/);
});

test("other classes stay on the image", () => {
  assert.strictEqual(
    render("![](/a.png){.fullwidth .bordered}\n"),
    '<figure class="fullwidth"><img src="/a.png" alt="" class="bordered"></figure>\n'
  );
});

test("an image in a tight list item stays inline", () => {
  assert.doesNotMatch(render("- ![](/a.png)\n"), /<figure/);
});

test("a linked image stays a linked image", () => {
  assert.doesNotMatch(render("[![](/a.png)](/big.png)\n"), /<figure/);
});

test("rendering the same source twice gives identical output", () => {
  const md = createMd();
  const src = '![](/a.png "A"){.margin}\n\n![](/b.png "B")\n';
  assert.strictEqual(md.render(src), md.render(src));
});
