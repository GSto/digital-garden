module.exports = {
  test: "foo",
  leftColumn: [
    {
      title: "Software Engineering",
      description:
        "Code. writing it. testing it. deploying it. maintaining it.",
      notes: [
        { note: "Accessibility" },
        { note: "Complexity" },
        { note: "CSS", children: [{ note: "CSS animation" }] },
        { note: "Heroku snippets" },
        {
          note: "JavaScript",
          children: [
            { note: "ReactJS" },
            { note: "TypeScript" },
            { note: "TypeScript with React" },
          ],
        },
        { note: "Ruby interview study guide" },
        { note: "Security" },
        { note: "Shopify theme development" },
        { note: "Software principles" },
        { note: "Writing Tech specs"}
      ],
    },
    {
      title: "Writing",
      notes: [
        { note: "Digital garden" },
        {
          note: "Digital writing",
          children: [{ note: "Learn in public" }],
        },
        { note: "Documentation" },
        {
          note: "Evergreen notes",
          children: [{ note: "Progressive summarization" }],
        },
        { note: "Knowledge base" },
        { note: "Why write" },
        { note: "Writing" },
        { note: "Writing book recommendations" },
        { note: "Writing rules" },
      ],
    },
    {
      title: "Design",
      notes: [
        { note: "Design resources" },
        { note: "Game design" },
        { note: "Product design" },
      ],
    },
    {
      title: "Communication",
      notes: [
        {
          note: "Friendliness",
          children: [{ note: "friendliness reading list" }],
        },
        { note: "How to say no" },
        { note: "Humor" },
        { note: "Storytelling" },
      ],
    },
    {
      title: "Creativity",
      notes: [
        {
          note: "Prolific creation",
          children: [
            { note: "Cult of done manifesto" },
            { note: "Quality of pots vs quantity of pots" },
            { note: "Action produces information" },
          ],
        },
        {
          note: "Resistance",
          children: [
            { note: "The Amateur and the Professional" },
            { note: "Launch anxiety" },
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
        { note: "Build your own dropbox fallacy" },
        { note: "Build vs buy" },
        { note: "Code review" },
        {
          note: "Consulting",
          children: [
            { note: "Coaching questions" },
            { note: "Developer to consultant" },
            { note: "Workshops" },
          ],
        },
        { note: "Criticisms of hourly billing" },
        { note: "Post senior dev fork" },
        { note: "Positioning" },
        { note: "Shaping" },
        { note: "The red tape paradox" },
        { note: "Your first software project" },
      ],
    },
    {
      title: "LLMs",
      notes: [
        { note: "Prompt engineering"},
        { note: "Midjourney prompts"}
      ],
    },
    {
      title: "Money",
      notes: [
        { note: "Housing prices" },
        {
          note: "Personal finance",
          children: [{ note: "401k valuation" }, { note: "Asset allocation" }],
        },
        { note: "Real estate investing" },
        { note: "Low-risk options trading" },
      ],
    },
    {
      title: "Crypto",
      notes: [
        { note: "Web3" },
        { note: "DeFi", children: [{ note: "Impermanent Loss" }] },
        {
          note: "Xryptocurrency",
          children: [
            { note: "Ethereum" },
            { note: "Solidity" },
            { note: "Solana" },
          ],
        },
      ],
    },
    {
      title: "Career",
      notes: [
        { note: "Above the code" },
        { note: "Career strategy" },
        { note: "Indie mindset" },
        { note: "Personal branding" },
        {
          note: "Organizational literacy",
          children: [
            { note: "Organizational research" },
            { note: "McLeod Hierarchy" },
          ],
        },
        { note: "Working identities" },
      ],
    },
  ],
  rightColumn: [
    {
      title: "References",
      notes: [
        { note: "Evergreen links" },
        { note: "Evergreen memes" },
        { text: "Broken links", url: "/meta/missing" },
        { text: "Colophon", url: "/meta/colophon" },
        { note: "Other writing" },
        {
          note: "Eponymous laws",
          children: [{ note: "Gall's law" }, { note: "Zeigarnik effect" }],
        },
      ],
    },
    {
      title: "Metacognition",
      notes: [
        { note: "Cognitive biases" },
        { note: "Decision making models" },
        {
          note: "Thought exercises",
          children: [
            { note: "Effectual reasoning" },
            { note: "Retreat reflection" },
          ],
        },
        { note: "Species of interesting ideas" },
      ],
    },
    {
      title: "Concepts",
      notes: [
        { note: "Bullshit" },
        { note: "Discipline"},
        { note: "Expertise" },
        { note: "Freemium leisure" },
        { note: "Lindy" },
        { note: "Legibility" },
        { note: "Leverage" },
        { note: "Playing for stakes" },
        { note: "Tempo" },
        { note: "Too much comfort produces weakness" },
      ],
    },
    {
      title: "Disorder",
      notes: [
        { note: "Antifragile" },
        { note: "Luck" },
        { note: "Risk", children: [{ note: "Risk of ruin" }] },
        { note: "Uncertainty mindset" },
        { note: "Variance" },
      ],
    },
    {
      title: "Miscellaneous",
      notes: [
        { note: "Capture vs retrieval" },
        { note: "The great internet game" },
        { note: "Inputs vs outputs vs outcomes" },
        { note: "Squads" },
        { note: "Token economy" },
      ],
    },
  ],
};
