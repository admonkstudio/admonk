---
name: gsap-plugins
description: GSAP plugin guidance derived from the official GreenSock skill. Use for ScrollSmoother, ScrollTo, Flip, Draggable, SplitText, DrawSVG, MorphSVG, MotionPath, CustomEase and other GSAP plugins.
license: MIT
---

# GSAP Plugins

Use this skill when a project needs GSAP functionality beyond core tweens, timelines, and ScrollTrigger.

For Admonk work, particularly useful plugins include:

- ScrollSmoother
- ScrollToPlugin
- Flip
- SplitText
- DrawSVGPlugin
- MorphSVGPlugin
- MotionPathPlugin
- CustomEase
- Draggable / InertiaPlugin where interaction genuinely benefits from dragging

## Licensing and Installation

GSAP plugins are available through the public `gsap` package. Do not use outdated private-registry or Club GSAP token instructions.

```bash
npm install gsap
```

Register every plugin before use.

```javascript
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(Flip, DrawSVGPlugin);
```

## ScrollSmoother

Use ScrollSmoother when a project needs momentum-style smooth scrolling integrated with ScrollTrigger.

Typical structure:

```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- page content -->
  </div>
</div>
```

Use it only if smoothing improves the experience. Admonk motion should remain responsive; avoid making scrolling feel delayed or resistant.

## ScrollToPlugin

Use for controlled navigation to elements or positions.

```javascript
gsap.to(window, {
  duration: 0.8,
  scrollTo: { y: "#work", offsetY: 40 },
  ease: "power2.inOut"
});
```

Do not make basic navigation unnecessarily slow.

## Flip

Use Flip when an element should move naturally between two layout states.

```javascript
const state = Flip.getState(".project-card");

// Change layout / classes here.

Flip.from(state, {
  duration: 0.6,
  ease: "power3.inOut"
});
```

Flip is especially useful for Admonk's preference for continuity: transform a related object instead of removing one state and introducing another.

## SplitText

Use SplitText for controlled line, word, or character animation.

```javascript
const split = SplitText.create(".heading", {
  type: "lines",
  mask: "lines"
});

gsap.from(split.lines, {
  yPercent: 100,
  stagger: 0.08,
  duration: 0.7,
  ease: "power3.out"
});
```

Use only the split level needed for the effect.

For responsive text, use `autoSplit`/`onSplit()` where appropriate so line-based animation remains correct when fonts or widths change.

Admonk preference: text motion is supporting motion. Avoid character-by-character spectacle unless the concept specifically calls for it.

## DrawSVGPlugin

Ideal for Admonk's explanatory motion graphics involving:

- connections
- workflows
- paths
- diagrams
- process lines

```javascript
gsap.fromTo(
  "#path",
  { drawSVG: "0% 0%" },
  { drawSVG: "0% 100%", duration: 1.2, ease: "power2.inOut" }
);
```

The SVG element must have a visible stroke.

A drawn line should communicate origin, direction, progress, or destination rather than exist as decoration.

## MorphSVGPlugin

Use when one SVG shape should transform into another.

```javascript
gsap.to("#shape-a", {
  morphSVG: "#shape-b",
  duration: 0.8,
  ease: "power3.inOut"
});
```

Use morphing to express transformation or continuity. Do not add shape morphs simply as a technical showcase.

## MotionPathPlugin

Use to move an object along a path.

```javascript
gsap.to(".dot", {
  duration: 2,
  motionPath: {
    path: "#route",
    align: "#route",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  }
});
```

This is particularly useful for small process stories, journeys, connections, maps, and data flows.

## CustomEase

Use CustomEase when built-in easing cannot produce the intended motion character.

```javascript
const premiumEase = CustomEase.create(
  "premiumEase",
  ".22,.61,.36,1"
);
```

Do not create custom easing unnecessarily. Consistency and natural motion matter more than novelty.

## Draggable and InertiaPlugin

Use for interactions where dragging is already understandable to users, such as:

- sliders
- draggable galleries
- spatial canvases
- controlled object exploration

```javascript
Draggable.create(".card", {
  type: "x",
  bounds: ".track",
  inertia: true
});
```

Do not replace ordinary scrolling or navigation with dragging unless the concept clearly benefits.

## Observer

Observer can normalize wheel, touch, and pointer gestures.

Use it carefully. It can enable immersive experiences, but it can also create exactly the kind of unnatural interaction Admonk wants to avoid if used to take over basic browsing.

## ScrambleText and Special Effects

Text scrambling, wiggles, physics, bounce, and similar plugins may be appropriate for specific identities.

They are not default Admonk behavior.

The client's concept determines whether they belong.

## Development Tools

GSDevTools can help debug timelines during development.

Do not ship development-only tools in production.

## Plugin Selection Rule

Choose the smallest capability that solves the problem.

```text
Need connected line animation?
→ DrawSVG

Need object following that line?
→ MotionPath

Need layout-to-layout continuity?
→ Flip

Need line/word reveal?
→ SplitText

Need custom easing character?
→ CustomEase

Need smooth page scrolling?
→ First ask whether native scrolling is already better.
```

## Do Not

- Do not use a plugin without registering it.
- Do not add a plugin merely because it creates an impressive demo.
- Do not use Observer or Draggable to reinvent familiar interface behavior without a strong reason.
- Do not rely on AI-generated SVG or text when precise production assets already exist.
- Do not use visual effects that conflict with `docs/MOTION-LANGUAGE.md`.

## Admonk Principle

Plugins expand what is technically possible.

They do not decide what is creatively appropriate.

> **Use technical sophistication to make simple ideas feel exceptional.**
