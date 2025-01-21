# EffectiveCode Review Practices

## Resources

- [Characteristics of useful comments (study)](https://www.michaelagreiler.com/wp-content/uploads/2019/02/Characteristics-Of-Useful-Comments.pdf) - As the primary goal of code review is to ensure that a
  change is free from defects, follows team conventions, solves
  a problem in a reasonable way, and is of high quality, we
  consider review feedback useful if it is judged useful by author
  of the change to enable him or her to meet these goals
- [Github Awesome Code Reviews](https://github.com/joho/awesome-code-review)

## Tips & Tricks

- Take a goal-oriented approach to commenting and reviewing code. The goal is to ensure that the code is free of bugs, meets requirements, and is high quality. Help the author achieve those goals. A productive code review leads to an improved output that would not have happened other wise.
- Look at the spec/requirements/ticket for context. Does the code meet those requirements?
- Review the test code as closely as you review the code.
- Types of comments that are the most useful: adding documentation, suggesting better organization. ([[documentation]] ,[[clean code]])
- Make your comments readable. Write complete sentences. Leverage markdown.
- Avoid trivial and insignificant feedback, especially if it is a larger PR or if the code review is already getting long.
- Leave syntax to the linters. If you can't put a rule in a linter, then don't bother bringing it up in a code review.
- Replace "why didn't you X ?" with "what do you think about X, because of (reason,citation,etc.)?"
- When the talk gets long or complex, take it offline.
- Provide some context behind the recommendation.

## Anti-Patterns

* Passing off opinion as fact. "This component should be stateless."
- Comment avalanches. Instead of multiple "extra space" comments, leave one.
- Being judgmental: "Why didn’t you just do (suggestion) here?"
- useless comments like copy tweaks, generic praise, or out-of-scope discussions about design or features. 



## Notes

In addition to code quality improvements, code reviews have a knock on effect of distributing knowledge throughout the team.

Keep the latency on code reviews, or any feedback loops short. It'll make things easier. ([[tempo]])

Smaller pull requests lead to better code reviews.

Should code reviews always been mandated? Some believe they should be sometimes but not always: junior developers, developers new to the code base, or its a particularly critical or complex case.

## References 

[Unlearning toxic code review behaviors](https://medium.com/@sandya.sankarram/unlearning-toxic-behaviors-in-a-code-review-culture-b7c295452a3c)