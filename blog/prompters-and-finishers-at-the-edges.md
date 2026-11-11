---
title: "Prompters & Finishers "
subtitle: "At the Edges No.2"
date: 2025-01-25T12:45:29.749Z
substackUrl: "https://www.statetransition.co/p/prompters-and-finishers-at-the-edges"
substackId: 155684476
postType: "at the edges"
blogchains: ["Prompt Protocols"]
coverImage: "/assets/blog/prompters-and-finishers-at-the-edges/429c97a9-73de-43cc-86dd-ddfeacd1f64c_588x375.jpeg"
templateEngineOverride: "md"
---

A year ago I wrote about how AI would [shift engineers into doing more final mile work](/blog/the-wordpressificaion-of-work/). These days I am thinking more about this, and asking myself: “as an engineer, what are the highest leverage points with AI?”

I think it’s using them to build bespoke utility scripts and tools. LLMs aren’t as effective on large codebases, working with existing code, systems, and conventions they aren’t aware of. AI excels at coding from scratch.

Writing utility scripts is pretty explanatory. With Cursor’s composer, you can provide links to documentation and libraries and knock them out pretty quickly.

## Building single function apps with AI

Check out this [detailed workflow](https://zohaib.me/using-llms-and-cursor-for-finishing-projects-productivity/) an engineering manager shared. The tl,dr is:

1.  Use ChatGPT[^1] to help you write a small product spec
    
2.  Use [Vite](https://vite.dev/guide/) as a framework, put the spec file in a repo, and use [Cursor](https://www.cursor.com/) to bootstrap the product
    
3.  Use tinier specs to iterate on smaller facets of the project.
    
4.  Final mile work: manually make minor updates and fixes and add polish.
    
5.  Use the composer to write out GitHub Actions.
    
6.  Ship it!
    

Using spec files with Cursor is a neat trick. You now have a tool that can read your spec, write your code, and even write a changelog about its process if you ask it to.

It is something I will be trying in the future, no doubt. Not sure what yet, maybe I’ll ask an AI about that to.

## Prompts as Scripts

Besides writing scripts, I’ve started thinking of prompts *as* scripts. Writing a prompt is not a few sentences you throw together once. It can be something you put effort into so that you can use it again and again. I’m moving my prompts into a GitHub repo so I can document them and track changes. I am taking prompt engineering seriously as a discipline[^2].

## A simple prompt framework

-   Here’s a rubric I’ve been using when writing prompts. A good prompt includes:  
    
-   An action to take
    
-   Steps to perform the action
    
-   A persona to emulate
    
-   Examples of inputs and/or outputs
    
-   Context about the action and situation
    
-   Constraints and what not to do
    
-   A template or desired format for the output
    

It’s not much, but it’s a start. If you have no idea where to begin, I hope that helps.

[^1]: It doesn’t have to be ChatGPT. Use whatever service you like best. Recently, I’ve been impressed, curious, and mildly terrified about [DeepSeek](https://www.deepseek.com/).

[^2]: Claude has official prompt engineering guidance, a solid place to start: [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview).
