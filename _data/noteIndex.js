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
        { note: "CSS", children: [{ note: "css animation" }] },
        { note: "heroku snippets" },
        {
          note: "JavaScript",
          children: [
            { note: "ReactJS" },
            { note: "TypeScript" },
            { note: " ReactJS x TypeScript" },
          ],
        },
        { note: "Ruby interview study guide" },
        { note: "security" },
        { note: "Shopify theme development" },
        { note: "software principles" },
      ],
    },
    {
      title: "Writing",
      notes: [
        { note: "article ideas" },
        { note: "digital garden" },
        {
          note: "digital writing",
          children: [{ note: "digital garden" }, { note: "learn in public" }],
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
            { note: "The Amateur and the Professional" },
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
        { note: "build vs buy" },
        { note: "code review" },
        {
          note: "consulting",
          children: [
            { note: "coaching questions" },
            { note: "developer to consultant" },
            { note: "workshops" },
          ],
        },
        { note: "criticisms of hourly billing" },
        { note: "post senior dev fork" },
        { note: "Shaping" },
        { note: "the red tape paradox" },
        { note: "your first software project" },
      ],
    },
    {
      title: "Money",
      notes: [
        { note: "housing prices" },
        {
          note: "personal finance",
          children: [{ note: "401k valuation" }, { note: "asset allocation" }],
        },
        { note: "real estate investing" },
        { note: "responsible options trading" },
      ],
    },
    {
      title: "Crypto",
      notes: [
        { note: "web3" },
        { note: "DeFi", children: [{ note: "Impermanent Loss" }] },
        {
          note: "cryptocurrency",
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
        { note: "common references" },
        { note: "evergreen links" },
        { text: "Broken Links", url: "/meta/missing" },
        { note: "other writing" },
        {
          note: "eponymous laws",
          children: [{ note: "galls law" }, { note: "zeigarnik effect" }],
        },
      ],
    },
    {
      title: "Tools for Thought",
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
      title: "Disorder",
      notes: [
        { note: "antifragile" },
        { note: "luck" },
        { note: "risk", children: [{ note: "risk of ruin" }] },
        { note: "uncertainty mindset" },
        { note: "variance" },
      ],
    },
    {
      title: "Miscellaneous",
      notes: [
        { note: "capture vs retrieval" },
        { note: "the great internet game" },
        { note: "inputs vs outputs vs outcomes" },
        { note: "squads" },
        { note: "token ecomony" },
        { note: "twitter hacks" },
      ],
    },
  ],
};
