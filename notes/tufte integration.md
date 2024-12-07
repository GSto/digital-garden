# Tufte Integration 

This is both a sandbox and documentation for integrating this site with [Tufte CSS](https://edwardtufte.github.io/tufte-css/) and Markdown.

## Implemented Features 

### Epigraph Quotes
By default, blockquotes will be rendered as an epitaph

> when you squeeze an orange, orange juice comes out. whenever you get squeezed, whatever comes out is what's inside of you - Wayne W Dyer

### Section organizations
content is automatically segmented into sections based on H2 tags. 

### Sidenotes 

One of the most distinctive features of Tufte’s style is his extensive use of sidenotes.^[this is a sidenote]. If you add multiple sidenotes throughout your notes, then they will number themselves automatically.^[this, for example, should show up as sidenote **number** 2. As you can see, you can nest markdown in these to style the texts]. Here is how you add a sidenote: 

```
^[this is a sidenote]
```

## Resources
The plan is to use a combination of custom markdown parsing and shortcodes to implement as much of Tufte CSS as possible.

* [Tufte.css on Github](https://github.com/edwardtufte/tufte-css)
* [Customer Markdown components in 11ty](https://www.aleksandrhovhannisyan.com/blog/custom-markdown-components-in-11ty/)
* [11ty template shortcodes](https://www.11ty.dev/docs/shortcodes/)
