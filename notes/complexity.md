---
disabled: true
---

# Complexity

## Measuring complexity

[Halstead Complexity Measures](https://en.wikipedia.org/wiki/Halstead_complexity_measures) Measures complexity at the function level like so: 
  - number of distinct operators (function calls, syntax elements)
  - number of distinct operands (variables)
  - total number of operators (how often you use those operands)
  - total number of operands (how oftern you use those variables)
  - By refactoring code into smaller methods, you can reduce the number of distinct operators and operands in a function, moving that complexity to another location. However do this too much and you would end up increasing the number of distinct operators.

## Types of complexity in technology: 
  - branching complexity - how many different outcomes are there? 
  - data access complexity - are there permissions

## Measuring complexity in object-oriented programming
  - methods per class
  - coupling between object classes
  - response for a class(?)
  - number of children
  - depth of inheritance tree
  - lack of cohesion of methods

_(Chidamber, S.R.; Kemerer, C.F. IEEE Transactions on Software Engineering Volume 20, Issue 6, Jun 1994 Page(s):476 - 493)_
