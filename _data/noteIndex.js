module.exports = {
  test: "foo",
  leftColumn: [
    {
      title: "Software Engineering",
      description:
        "Code. writing it. testing it. deploying it. maintaining it.",
      notes: [
        { note: "accessibility" },
        { note: "complexity" },
        { note: "CSS", children: [{ note: "CSS animation" }] },
        { note: "heroku snippets" },
        {
          note: "JavaScript",
          children: [
            { note: "ReactJS" },
            { note: "TypeScript" },
            { note: "TypeScript with React" },
          ],
        },
        { note: "Ruby interview study guide" },
        { note: "security" },
        { note: "Shopify theme development" },
        { note: "software principles" },
        { note: "tech specs"}
      ],
    },
    {
      title: "Writing",
      notes: [
        { note: "digital garden" },
        {
          note: "digital writing",
          children: [{ note: "learn in public" }],
        },
        { note: "documentation" },
        {
          note: "evergreen notes",
          children: [{ note: "progressive summarization" }],
        },
        { note: "knowledge base" },
        { note: "why write" },
        { note: "writing" },
        { note: "writing book recommendations" },
        { note: "writing rules" },
      ],
    },
    {
      title: "Design",
      notes: [
        { note: "design resources" },
        { note: "game design" },
        { note: "product design" },
      ],
    },
    {
      title: "Communication",
      notes: [
        {
          note: "friendliness",
          children: [{ note: "friendliness reading list" }],
        },
        { note: "how to say no" },
        { note: "humor" },
        { note: "storytelling" },
      ],
    },
    {
      title: "Creativity",
      notes: [
        {
          note: "prolific creation",
          children: [
            { note: "cult of done manifesto" },
            { note: "quality of pots vs quantity of pots" },
            { note: "action produces information" },
          ],
        },
        {
          note: "Resistance",
          children: [
            { note: "the Amateur and the Professional" },
            { note: "launch anxiety" },
          ],
        },
      ],
    },
  ],
  centerColumn: [
    {
      title: "Software metagame",
      description: "the work before, after, above, and below the code editor.",
      notes: [
        { note: "build your own dropbox fallacy" },
        { note: "code review" },
        {
          note: "Consulting",
          children: [
            { note: "coaching questions" },
            { note: "developer to consultant" },
            { note: "workshops" },
          ],
        },
        { note: "criticisms of hourly billing" },
        { note: "post senior dev fork" },
        { note: "positioning" },
        { note: "shaping" },
        { note: "the red tape paradox" },
        { note: "your first software project" },
      ],
    },
    {
      title: "LLMs",
      notes: [
        { note: "prompt engineering"},
        { note: "midjourney prompts"}
      ],
    },
    {
      title: "Disorder",
      notes: [
        { note: "antifragile" },
        { note: "luck" },
        { note: "risk", children: [{ note: "Risk of ruin" }] },
        { note: "uncertainty mindset" },
        { note: "variance" },
      ],
    },
    {
      title: "Finance",
      notes: [
        { note: "housing prices" },
        {
          note: "personal finance",
          children: [{ note: "401k valuation" }, { note: "asset allocation" }],
        },
        { note: "real estate investing" },
        { note: "low-risk options trading" },
      ],
    },
    {
      title: "Career",
      notes: [
        { note: "above the code" },
        { note: "career strategy" },
        { note: "indie mindset" },
        { note: "personal branding" },
        {
          note: "organizational literacy",
          children: [
            { note: "organizational research" },
            { note: "McLeod Hierarchy" },
          ],
        },
        { note: "working identities" },
      ],
    },
  ],
  rightColumn: [
    {
      title: "References",
      notes: [
        { note: "evergreen links" },
        { note: "evergreen memes" },
        { text: "broken links", url: "/meta/missing" },
        { text: "colophon", url: "/meta/colophon" },
        { note: "other writing" },
        {
          note: "eponymous laws",
          children: [{ note: "galls law" }, { note: "zeigarnik effect" }],
        },
      ],
    },
    {
      title: "Metacognition",
      notes: [
        { note: "cognitive biases" },
        { note: "decision making models" },
        {
          note: "thought exercises",
          children: [
            { note: "effectual reasoning" },
            { note: "retreat reflection" },
          ],
        },
        { note: "species of interesting ideas" },
      ],
    },
    {
      title: "Concepts",
      notes: [
        { note: "bullshit" },
        { note: "discipline"},
        { note: "expertise" },
        { note: "freemium leisure" },
        { note: "Lindy" },
        { note: "legibility" },
        { note: "leverage" },
        { note: "playing for stakes" },
        { note: "tempo" },
        { note: "too much comfort produces weakness" },
      ],
    },
    {
      title: "Miscellaneous",
      notes: [
        { note: "capture vs retrieval" },
        { note: "the great internet game" },
        { note: "inputs vs outputs vs outcomes" },
        { note: "squads" },
        { note: "token economy" },
      ],
    },
  ],
};
