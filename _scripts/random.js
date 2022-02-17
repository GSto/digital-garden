const glob = require("glob");

glob("notes/*.md", {}, (err, files) => {
  const selection = files[Math.floor(Math.random() * files.length)];
  const result = selection.replace(/^notes\//, "").replace(/\.md$/, "");
  console.log(result);
});
