# Animation

## Transitions

- Transitions follow the short hand of `property duration delay timing function`. Property and duration are required, the others are optional.
- the "transition all" property is considered harmful. It requires the browser to listen for all changes, and it isn't very performant.
- If you want to write a custom timing function, use the cubic-bezier function.
- As a general rule, animations should be between 250-300ms. shorter than 100ms is not perceivable to most people and is effectively the same as no animation. over 1 second is too long, people will get bored or feel the motion is disconnected.

## Animation property

You can use the animation property, along with keyframes, to create custom animations. Animation properties use timing functions, durations, and delays just like transitions. Animations have some additional properties you can set:

- **animation-fill-mode**: determines the end state of the animation.
  - **none**: Default. Animation has zero effect on state of the element.
  - **forwards**: Animation retains 100% properties after animation
  - **backwards**: Animation has 0% properties before animation.
  - **both**: forwards + backwards.
- **animation-direction**: determines the direction of the animation
  - **normal**: default. 0 -> 100
  - **reverse**: 100 -> 0
  - **alternate**: 0 -> 100 -> 0 (bouncy)
  - **alternate-reverse**: 100 -> 0 -> 100 (bouncy)
- **animation-play-state** - can be set to playing or paused.

## Sprite animation

You can use the animation property, the steps timing function, and animating on background position to create animated sprites. Example code:

In this example, frames are 366x366 pixels, and there are 18 frames in the cycle.

```css
.homer {
  margin: 30px;
  background: url("./homer-sprite.jpg") 0 0 no-repeat;
  width: 366px;
  height: 366px;
  animation: woohoo 1000ms steps(18) infinite;
}

@keyframes woohoo {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -6588px;
  }
}
```

## Animation properties vs. transition properties

- transitions run once, animations can repeat
- animations can loop, transisitons cannot
- transitions have to be triggered, animations do not.
- animations can alternate between start and end state, transitions cannot.
- animations can affect multiple properties, transitions cannot

## Animation with JavaScript

You can also create more stateful animations by updating CSS attributes or classes of elements with JavaScript. An example for parallax is [Skrollr](https://prinzhorn.github.io/skrollr/).

### Event listeners for animation

- `animationstart` - runs when an animation on the element starts
- `animationend` - when an animation ends (will not fire ever if the animation is infinite)
- `animationiteration` - fires every keyframe
- `transitionend` - when a transition finishes. (`transitionstart` does not have good browser support as of this writing)

## Performance

The fastest properties are **opacity** and **transform**

- Instead of animating on width or height, animate on `transform: scale()`
- Instead of animating position, use `transform: translate()`
- Instead of animation z-index or visibility, use `opacity`

## Animation Resources

- [List of Animatable CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
- [List on animation properties](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Tool for drawing cubic-bezier curves in browser](https://cubic-bezier.com/)
- [Gallery of Easing curves](https://easings.net/)
- [Turn GIF to Sprite Sheet](https://ezgif.com/gif-to-sprite)
