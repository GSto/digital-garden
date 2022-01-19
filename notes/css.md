# CSS

various things I pick up along the way.

## Z-Index and Stacking Contexts

When you give an element a z-index, that value is only compared against other elements in the same context. By default, an HTML document only has one context. Here's an example of one way to create a context:

```
 .some-element {
   position: relative;
   z-index: 1;
 }
```

Other ways to create stacking contexts:

- set opacticy to less that 1
- set position to fixed or sticky
- apply a mix-blend-mode other than normal
- add a z-index to a child inside a display:flex or display:grid container
- using transform, filter, clip-path, or perspective
- explicity with isolation: isolate

More on this: [What the heck, z-index? - Josh Comeau](https://www.joshwcomeau.com/css/stacking-contexts/)

## Flexbox

### Flexbox help in Chrome Dev Tools

click the gray box next to a flex property to inspect the different properties:

![](/assets/images/chrome_dev_flexbox.png)

### Recommended Flexbox Reading

- [A complete guide to Flexbox - CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Animation

### Transitions

* Transitions follow the short hand of `property duration delay timing function`. Property and duration are required, the others are optional. 
* the "transition all" property is considered harmful. It requires the browser to listen for all changes, and it isn't very performant.
* If you want to write a custom timing function, use the cubic-bezier function. 
* As a general rule, animations should be between 250-300ms. shorter than 100ms is not perceivable to most people and is effectively the same as no animation. over 1 second is too long, people will get bored or feel the motion is disconnected.

### Animation Resources

- [List of Animatable CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
- [Tool for drawing cubic-bezier curves in browser](https://cubic-bezier.com/)
- [Gallery of Easing curves](https://easings.net/)
