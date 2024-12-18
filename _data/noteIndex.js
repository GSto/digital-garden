const softwareEngineering = {
  title: "Software engineering",
  description: "the work before, after, above, and below the code editor.",
  notes: [
    { note: "build your own dropbox fallacy" },
    { note: "effective code review practices" },
    { note: "criticisms of hourly billing" },
    { note: "post senior dev fork" },
    { note: "positioning" },
    { note: "shaping" },
    { note: "the red tape paradox" },
    { note: "your first software project" },
  ],
};

const product = {
  title: "Product",
  notes: [
    { note: "game design" },
    { note: "product design principles" },
    { note: "research" },
    { note: "using data effectively" },    
  ],
};

const communicating = {
  title: "Communicating",
  notes: [
    {
      note: "friendliness",
      children: [{ note: "friendliness reading list" }],
    },
    { note: "how to say no" },
    { note: "humor" },
    { note: "storytelling" },
  ],
};

const building = {
  title: "Building",
  notes: [
    {
      note: "prolific creation",
      children: [
        { note: "cult of done manifesto" },
        // { note: "quality of pots vs. quantity of pots" }, // TODO: add this back, link is broken can't figure out why
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
};

const coding = {
  title: "Coding",
  description: "Code. writing it. testing it. deploying it. maintaining it.",
  notes: [
    { note: "accessibility" },
    { note: "complexity" },
    { note: "CSS" },
    { note: "CSS animation" },
    { note: "security" },
    { note: "software principles" },
    { note: "Typescript"},
    { note: "tech specs" },
  ],
};

const ai = {
  title: "AI",
  notes: [{ note: "prompt engineering" }, { note: "midjourney prompts" }],
};

const disorder = {
  title: "Disorder",
  notes: [
    { note: "antifragile" },
    { note: "luck" },
    { note: "risk" },
    { note: "uncertainty mindset" },
    { note: "variance" },
  ],
};

const career = {
  title: "Career",
  notes: [
    { note: "above the code" },
    { note: "career strategy" },
    { note: "indie mindset" },
    {
      note: "organizational literacy",
      children: [
        { note: "organizational research" },
        { note: "McLeod Hierarchy" },
      ],
    },
    { note: "working identities" },
  ],
};

const writing = {
  title: "Writing",
  notes: [
    { note: "digital garden" },
    { note: "digital writing"},
    {
      note: "writing as social practice",
    },
    { note: "documentation" },
    { note: "evergreen notes"},
    { note: "learn in public"},
    { note: "progressive summarization" },
    { note: "why write" },
    { note: "writing" },
    { note: "writing book recommendations" },
    { note: "writing rules" },
    { note: "indexing as a practice" },
    { note: "Linking in information architecture" },
    { note: "capture vs retrieval" },
  ],
};

const collections = {
  title: "Collections",
  notes: [
    { note: "evergreen links" },
    { note: "evergreen memes" },
    { note: "other writing" },
    {
      note: "adages",
    },
    { note: "links for junior devs" },
    { note: "design resources" },
  ],
};

const thinking = {
  title: "Thinking",
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
    { note: "Figma as a strategic thinking tool" },
    { note: "intellectual activism" },
  ],
};

const concepts = {
  title: "Concepts",
  notes: [
    { note: "bullshit" },
    { note: "discipline" },
    { note: "expertise", children: [{ note: "deliberate practice" }] },
    { note: "freemium leisure" },
    { note: "Lindy" },
    { note: "legibility" },
    { note: "leverage" },
    { note: "playing for stakes" },
    { note: "tempo" },
    { note: "too much comfort produces weakness" },
    { note: "choosing cultivates contentment" },
    { note: "the great internet game" },
    { note: "inputs vs outputs vs outcomes" },
    { note: "squads" },
  ],
};

const meta = { 
  title: "Meta",
  notes: [
    { note: "tufte integration" },
    { text: "broken links", url: "/meta/missing" },
    { text: "colophon", url: "/meta/colophon" },
  ]
}

// TODO: refactor this page to use a masonly layout with grid
module.exports = {
  test: "foo",
  leftColumn: [softwareEngineering,product, concepts, disorder],
  centerColumn: [coding, thinking, building, career],
  rightColumn: [writing, communicating, collections, meta],
};
