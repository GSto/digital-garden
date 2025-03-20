const softwareEngineering = {
  title: "Software engineering",
  description: "the work before, after, above, and below the code editor.",
  notes: [
    { note: "engineering management reading"},
    { note: "developers undervalue ease-of-use" },
    { note: "effective code review practices" },
    { note: "criticisms of hourly billing" },
    { note: "post senior dev fork" },
    { note: "positioning" },
    { note: "shaping" },
    { note: "the stakeholder's guide to working with developers"},
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
    { note: "Write of Passage reconstruction"},
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
  title: "Other",
  notes: [
    { note: "bullshit" },
    { note: "choosing cultivates contentment" },
    { note: "deliberate practice" },
    { note: "discipline" },
    { note: "etherium"},
    { note: "expertise" },
    { note: "freemium leisure" },
    { note: "inputs vs outputs vs outcomes" },
    { note: "Lindy" },
    { note: "legibility" },
    { note: "leverage" },
    { note: "playing for stakes" },
    { note: "tempo" },
    { note: "token economy"},
    { note: "the great internet game"},
    { note: "too much comfort produces weakness" },
    { note: "squads" },
  ],
};

const meta = { 
  title: "Meta",
  notes: [
    { text: "broken links", url: "/meta/missing" },
    { text: "colophon", url: "/meta/colophon" },
    { note: "tufte integration" },
  ]
}

// TODO: refactor this page to use a masonly layout with grid
module.exports = {
  test: "foo",
  leftColumn: [softwareEngineering,product, concepts, disorder],
  centerColumn: [coding, thinking, building, career],
  rightColumn: [writing, communicating, collections, meta],
};
