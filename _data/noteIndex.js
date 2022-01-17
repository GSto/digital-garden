module.exports = {
  test: "foo",
  rawIndex: [{
    title: "Software Engineering",
    description: "Code. writing it. testing it. deploying it. maintaining it.",
    notes: [
      { note: "accessibility"},
      { note: "complexity" },
      { note: "CSS" },
      { note: "heroku snippets" },
      { note: "JavaScript", children: [
        { note: "ReactJS"},
        { note: "TypeScript"},
        { note:" ReactJS x TypeScript"},
      ] },
      { note: "Ruby interview study guide"},
      { note: "security"},
      { note: "Shopify theme development"},
      { note: "software principles"},
    ]
  },
  {
    title: "Software metagame",
    description: "the work before, after, above, and below the code editor.",
    notes: [
      { note: "build your own dropbox fallacy"},
      { note: "build vs buy"},
      { note: "code review"},
      { note: "consulting", childre: [
        { note: "coaching questions"},
        { note: "developer to consultant"},
        { note: "workshops"},
      ]},
      { note: "criticisms of hourly billing"},
      { note: "post senior dev fork"},
      { note: "Shaping"},
      { note: "the red tape paradox"},
      { note: "your first software project"},
    ]
  }]
}