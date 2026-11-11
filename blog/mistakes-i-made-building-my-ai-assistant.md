---
title: "Mistakes I Made Building My AI Assistant (And What I Learned)"
subtitle: "How I used Claude Code and Obsidian to build an Agentic Agent (part 3)\n"
date: 2026-02-02T13:15:24.181Z
substackUrl: "https://www.statetransition.co/p/mistakes-i-made-building-my-ai-assistant"
substackId: 186607212
postType: "articles"
blogchains: ["Prompt Protocols"]
coverImage: "/assets/blog/mistakes-i-made-building-my-ai-assistant/80606214-2ecb-475d-be46-1c794bf8246c_1024x576.jpeg"
templateEngineOverride: "md"
---

This is the third and final post in my series on building an agentic assistant. In part 1, I explored the idea of agentic agents themselves. In part 2, I broke down the building blocks people can use with these systems. For this part, I will walk through my process and how I think about building these parts of systems.

##### Previous posts:

[Claudatouillie](/blog/claudatouillie/)

[Building Blocks of Agentic Agents](/blog/building-blocks-of-agentic-agents/)

In the past few weeks, agentic assistants have gone from helping people schedule meetings to \[kickstarting a “religion” on Clanker Reddit\](https://molt.church/). I’ve worked through multiple iterations of engineering management tooling and realized three things:

1\. There is a certain skill to building these kinds of systems.

2\. It requires a mental shift in how you work to use them effectively.

3\. If you aren’t careful, you can get lost in the sauce and spend too much time working on your ‘systems’ instead of being productive.

## 1 - The art of agentic agent design

### Context is everything

**Context** is the information you give the LLM to work with. The value you can get out of AI is directly proportional to how much of your work you can put in plain text.

When starting, **build a capture spot:** a place to easily capture data throughout your day. It could be a folder, an Obsidian vault, anything. It’s a reversible decision, don’t overthink it. You don’t want to think about where you put stuff.

Then, **document processes**. Start noticing repetitive tasks, and how you might automate them, in all or in part. The more structured and repeatable the process, the more effective the tool will be. Remember the rule: if you do the same thing three times, write it down.

### Think in building blocks

In [building blocks of agentic agents](/blog/building-blocks-of-agentic-agents/), I inventoried the individual units of a system. A skill, a standard operating procedure, a file, a folder—these can all be blocks. In software development, blocks are "modules" or "units of code." When working with these systems, it helps to think in building blocks.

There are three software development heuristics I’ve found useful with modules and building blocks alike:

1.  **The Single Responsibility Principle** - A block should only have one job or responsibility.
    
2.  **Loose coupling** - A block should depend on other blocks as little as possible.
    
3.  **High cohesion** - The elements of a block should belong together.
    

You shouldn't try to build one skill that does everything. Even a single process could have several sub-processes. Let's say you want to build your system to help you better handle meetings. That may include:

1.  A skill that reviews your notes and helps you prep for meetings
    
2.  A skill that integrates with your calendar to schedule meetings
    
3.  A 3rd-party tool that transcribes meetings and adds them to your capture spot
    
4.  A skill that processes meeting transcriptions and pulls out relevant information
    

hink about building each part of the system individually. You don’t have to solve everything. Solving one piece can be a win.

It requires practice to figure out the right level of abstraction for ‘block.’ From above, I could in theory have a different skill for each type of meeting. It may be valuable, it may be overkill. How similar are the meetings? That’s where cohesion comes into play.

If you can’t describe what a block does without using the word “and” twice, it should be split up.

When you want to modify or swap out a block, you want to do so with as little friction and side effects as possible. Building self-contained single purpose tooling speeds up iteration.

Check out Anthropic’s [collection of official plugins](https://github.com/anthropics/claude-plugins-official/tree/main/plugins). Imagine if you had to install all of them just to use one feature. Instead, they split their tooling into a few dozen different blocks, so you can pick and choose what to bring into your system.

Single responsibility applies to chats as well. LLMs get dumber the longer they run. They keep every message in context. The further you are from your initial instructions, the more likely they are to drift. Mistakes and misunderstandings accumulate[^1]. Better to clear out the chat and start a new one every time you switch tasks. Even if you are doing the same kind of task many times over, it can be useful to start fresh regularly.

### Define your primitives

When starting, think about the primitives of your work and how to model them in plain text. A primitive is any core object you want in your system. Here are some examples from mine:

-   projects
    
-   tasks
    
-   people
    
-   teams
    
-   meetings
    

What's fun is coming up with features that map to your idiosyncrasies, that you don't find in many other projects. I added the `monkey` primitive, inspired by the HBR piece "[Management Time: Who's got the Monkey](https://hbr.org/1999/11/management-time-whos-got-the-monkey)?" I can track when I'm waiting on a response or feedback from someone (monkey on their back) or someone is waiting on something from me (monkey on my back).

![](/assets/blog/mistakes-i-made-building-my-ai-assistant/80606214-2ecb-475d-be46-1c794bf8246c_1024x576.jpeg "Project management in 1996, 2026")

### Iteration is (also) everything

Fighter pilot John Boyd gave us the OODA loop: observe, orient, decide, act. Read the situation, pick your move, execute, repeat. You don’t have time to strategize in the middle of a dogfight. You have to act fast and stay in the flow.

> In a tactical sense, these multi-dimensional interactions suggest a spontaneous, synthetic/creative, and flowing action/counteraction, rather than a step-by-step, analytical/logical, and discrete move/countermove game. — [John Boyd, Patterns of Conflict, p.177](https://www.ausairpower.net/JRB/poc.pdf)

AI enables OODA looping at a quicker tempo. You can build, test, and iterate faster than ever before. Experimentation is fast and cheap. Don’t be afraid to try something, and throw it away if it doesn’t work. There will be throwaway work. This isn’t waste; this is part of the process. In creative work there is a cycle of expansion and compression.

That’s why you want well-designed modules. Faster to iterate on small, well-contained subsystems than a sprawling mess.

The difference between a good product and a great one is the number of iteration loops. Quality in creative work comes from labor, not genius. Author John McPhee wrote the book “[Draft No. 4](https://us.macmillan.com/books/9780374712396/draftno4/).” You don’t have to read it—the title alone can make you a better author if you’ve never considered starting a draft over for the fourth time.

Don’t try to get things perfect on the first shot. Make something, examine what went wrong, adjust your system, and try again.

### Use LLMs for design & ideation

Whenever I start a non-trivial piece of work, I go through this "spec-driven development" process:

1.  Sketch out a plan of what you want to achieve. Provide as much context as you can. Let’s call this doc `spec.md`
    
2.  **Here’s the important step many skip:** Go to Claude with this prompt: `study spec.md. interview me and ask me questions so you can improve the spec and then write an implementation plan.`
    
3.  After you answer the questions, ask it to write an implementation plan.
    
4.  **Start a new chat** and ask it to start on the next phase of the implementation plan. (Planning and building are two different tasks, so we clear the memory.)
    

You can even take it a step before *that*, and ask the LLM to figure out how you could use the LLM. [A tweet from my former coworker Kris Puckett](https://x.com/krispuckett/status/2008039258926514532):

> Based on what I shared, ask me 5-7 questions to understand my workflow better. Then suggest 3 things I could build, ranked by impact vs complexity.

Work in these kinds of loops. Get comfortable with them. I can’t emphasize this enough. More iterations get you to where you want to be faster.

## 2 - A mental shift in how you work

### Try working chat-first

The best way to figure out what LLMs can do is to start working chat-first. Whatever you want to do, start with a prompt. If you are already comfortable working in text, this shouldn’t be a large shift for you.

### The Dual Loop Framework

When I’m cooking, I have two Claude terminals open in parallel. I call these, borrowing terminology from *[The E-Myth Revisited](https://michaelegerbercompanies.com/product/the-e-myth-revisited/)*: the “working on the business” loop and the “working in the business” loop. The “on the business” loop is the system working on itself. I notice a problem, and I deal with it there. The “in the business” loop is getting the work done. These are separate enough that they can work together without running into one another.

That’s why you want well-designed modules. Easier to parallelize work with small, well-contained subsystems than with a sprawling mess.

### The out-to-lunch task

Occasionally, there will be tasks that take a while for the LLM to complete. Something that has helped me: kick these off when you leave at the end of the day, or go to lunch. The agent can chug away while you’re away, and you can review the output when you return.

## 3 - Avoid getting lost in the sauce

Years ago, I spent too much time playing the game *Cookie Clicker*[^2]. This is an idle game where you click a cookie. It taught us all that number-go-up is fun in and of itself—you don’t need the game itself to be fun. There was something hypnotic about building up the cookie clicker system and letting it farm points in the background.

If you’ve been sniped by similar dopamine-hijacking games, watch yourself when working with an LLM. They are a Skinner box, a slot machine where the jackpot is that it does your job for you. They can be hypnotic, even addictive.

There may come a time when you’ve heard of vibe coding, you are tired of typing in a chat box, and so you decide to build a piece of software to support your system. That’s awesome, and you can make a powerful tool. Just maintain focus, and don’t get too distracted building the system instead of building with the system.

I justify this meta-work to myself because I see the value as two-fold: It’s not just a productivity system, it’s a skunkworks project to test new LLM-powered coding techniques. Still, there are diminishing returns on that as well.

If you go down this route, a few words of caution:

Think hard about the architecture, languages, and data storage tools you use to build your system. These will be the hardest to reverse. If you have no idea, I recommend building it as a web app you run locally, with NextJS, TypeScript, SQLite, and a UI framework of your choosing.

Make sure your system has back pressure. Add testing and typechecking early and keep them up to date.

## 4 - Where do we go from here?

It’s nice to have a system that can automate some tasks for me, and take random unstructured data and help keep it organized. A big part of management is making sure everyone has the information they need, knows who to ask, and is empowered to make decisions.

A question I’ve asked myself during my recent career transition: Which job is more AI-proof, an engineering manager or an engineer? After using LLMs for both, I feel confident that both are safe. LLMs cannot replace the systems design skills needed to engineer software that scales and has a long lifespan. LLMs cannot provide the human connection, empathy, and support that a good manager, mentor, or coach can.

[^1]: 1.  “Lost in the Middle: How Language Models Use Long Contexts” by Liu et al. (2023) from Stanford/Berkeley. [https://arxiv.org/abs/2307.03172](https://arxiv.org/abs/2307.03172)

[^2]: I put this link in the footer instead of inline, so you can give it a good think before you click it and go back to that place: [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/)
