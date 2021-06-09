# Code Review

## Resources
  - [Characteristics of useful comments (study)](https://www.michaelagreiler.com/wp-content/uploads/2019/02/Characteristics-Of-Useful-Comments.pdf)
    - As the primary goal of code review is to ensure that a
change is free from defects, follows team conventions, solves
a problem in a reasonable way, and is of high quality [6], we
consider review feedback useful if it is judged useful by author
of the change to enable him or her to meet these goals
  - [Github Awesome Code Reviews](https://github.com/joho/awesome-code-review)

## Tips & Tricks
  - Look at the spec/requirements/ticket for context. Does the code meet those requirements?
  - Review the test code as closely as you review the code. 
  - Types of comments that are the most useful: adding documentation, suggesting better organization. #[[documentation]] #[[clean code]]
  - Make your comments readable. Write complete sentences. Leverage markdown. 
  - Avoid trivial and insignificant feedback, especially if it is a larger PR or if the code review is already getting long. 
  - Leave syntax to the linters. If you can't put a rule in a linter, then don't bother bringing it up in a code review. 
  - Replace "why didn't you X ?" with "what do you think about X, because of (reason,citation,etc.)?"
  - When the talk gets long or complex, take it offline.

## Anti-Patterns
  - [Unlearning toxic code review behaviors](https://medium.com/@sandya.sankarram/unlearning-toxic-behaviors-in-a-code-review-culture-b7c295452a3c)
  - Passing off opinion as fact. example: 
      - __"This component should be stateless."__

…provide some context behind the recommendation:

__"Since this component doesn’t have any lifecycle methods or state, it could be made a stateless functional component. This will improve performance and readability. *Here* is some documentation."__
  - Comment avalanches. Instead of multiple "extra space" comments, leave one. 
  - Being judgemental: 
      - __Why didn’t you just do ___ here?__”

Asking such questions implies that a perceived simple solution should have been obvious. It also forces developers to have to defend themselves.
Oftentimes, these judgmental questions are just veiled demands. Instead, provide a recommendation (with documentation and citations) and leave out harsh words.

__You can do ___, which has the benefit of ____.__

## Notes
  - Code review is a skill worth cultivating. Its mentioned frequently in job postings. 
  - Take a goal-oriented approach to commenting and reviewing code. The goal is to ensure that the code is free of bugs, meets requirements, and is high quality. Help the author achieve those goals. A productive code review leads to an improved output that would not have happened other wise.
  - In addition to code quality improvements, code reviews have a [[knock on effect]] of distributing knowledge throughout the team.
  - Comments often regarded as not useful include praise, suggestions for alternate input or error messages, or out-of-scope discussions about new design or features.
  - Remember there is no perfect code, only better code.
  - Code reviews are negative by default. the implication is "tell me what's wrong before we send this to production." Praise and positive comments can be used to soften the review somewhat. 
  - Provide positive alternatives, but be wary of being too judgy and prescriptive. 
  - Keep the [[latency]] on code reviews, or any [[feedback loop]]s short. It'll make things easier. #[[tempo]] #[[tempo in software development]]
  - Smaller [[pull requests]] lead to better code reviews. 
  - Should code reviews always been mandated? Some believe they should be sometimes but not always: junior developers, developers new to the code base, or its a particularly critical or complex case.

**Tags** #[[above the code]] #[[professional skills]]