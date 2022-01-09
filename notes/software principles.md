# Software Principles

## Art of Chunking

Compress complicated data and logic into a single chunk as much as possible. For example, if you have one component for a whole page, you have to think about all of the page. if you break it up, you can just think "header" or "footer" or "sidebar widget"

When code is compressed you can reason about what's inside it as well. 

## Don't Break Gall's Law

Don't break [[galls law]]. Seriously don't do it. 


## Don't Repeat Yourself

Chunk repetitive pieces of code into reusable functions. however, be wary of overdoing this and falling into the wrong abstraction fallacy. repetition is better than confusion. The cost of duplication is greater than the cost of the wrong abstraction. 


## Law of Conservation of Complexity

Complexity has to go somewhere. simple UIs have complex code bases and vice versa. The simpler a program looks, the more work that went into it.

## Law of Demeter

Don't go through multiple layers to get data.  Don't do this: `account.user.profile.avatar` instead do `account.getUserAvatar()`. This is a cousin of separating interface from implementation 

## Law of Least Surprise

Complexity has to go somewhere. simple UIs have complex code bases and vice versa. The simpler a program looks, the more work that went into it.

## Loose Coupling, High Cohesion

Put things that belong together together and separate things that don't belong together. Like abstraction, is something that takes experience it to get right. It's difficult to put a pin in exactly what 'belong together' means, but like congress when it comes to pornography, you'll know it when you see it. It rhymes with 'single responsibility'; things that share a responsibility belong together, and blocks of code that don't share responsibility don't. 

## Open to Extension, Closed to Modification

You should write code that can be re-used without editing it. closely related to YAGNI but not the same. adding unused functionality that might come up one day is yagni; building the ability to add functionality is openness. open/closed is not about building every path but instead about not building dead ends. 

## Pure Functions

Write functions with no side effects. 
__stub, needs expansion__

## Separate Interfaces From Implementation

 Typically when people think about this principle they think about it in the classical object-oriented programming sense: You write interfaces files that are separate from the classes that implement them. I think a better understanding is to think of it more conceptually: the way you interact with __any__ unit of code or piece of software should not be dependent on __any__ details about how it's implemented. This has the benefits of leading to better design (as you have separated the two concerns), and also gets your more flexibility, as you can more easily change one without changing the other. 

 Examples include: 

- UI forms and tables - they don't have to match database rows 1:1
- Pages in a navigation structure don't have to map to models in the database 1:1. Ruby encourages this but it's not always good design. 
- API design - how users interact with the API is a separate.


## Single Responsibility

Each unit of code (for the purposes of this writing, a unit of code is a function, component, class, or block). it should do one thing and do it well. If a function is doing to many things, then you should decompose it into smaller units. units decomposed this way will he easier to test, easier to reuse(more modular) and easier to reason about (chunking)