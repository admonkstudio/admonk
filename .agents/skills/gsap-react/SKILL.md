---
name: gsap-react
description: Official GSAP guidance for React and Next.js — useGSAP, refs, scoped selectors, cleanup, contextSafe, and SSR-safe animation. Use when building GSAP animation in React-based projects.
license: MIT
---

# GSAP with React

## When to Use This Skill

Apply when writing or reviewing GSAP code in React or React-based frameworks such as Next.js.

**Related skills:** Use **gsap-core** for tweens, **gsap-timeline** for sequencing, and **gsap-scrolltrigger** for scroll-driven interaction.

## Installation

```bash
npm install gsap @gsap/react
```

## Prefer useGSAP()

When `@gsap/react` is available, prefer `useGSAP()` over a normal effect for GSAP setup.

```javascript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Example() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".item", {
      autoAlpha: 0,
      y: 24,
      stagger: 0.08
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="item">One</div>
      <div className="item">Two</div>
    </div>
  );
}
```

Benefits:

- scoped selector text
- automatic GSAP cleanup on unmount
- safe lifecycle behavior
- easier ScrollTrigger cleanup

## Scope Selectors

Always scope selectors to the current component where practical.

Avoid global `.card` or `.item` selectors inside reusable components unless a scope is defined.

```javascript
useGSAP(() => {
  gsap.to(".card", { y: -10 });
}, { scope: container });
```

This limits `.card` to descendants of `container`.

## Refs

Use refs when targeting unique DOM elements or when direct element access is clearer than selector text.

```javascript
const imageRef = useRef(null);

useGSAP(() => {
  gsap.to(imageRef.current, { scale: 1.05 });
});
```

## Dependencies and revertOnUpdate

When an animation depends on reactive values:

```javascript
useGSAP(() => {
  gsap.to(".box", { x: endX });
}, {
  dependencies: [endX],
  scope: container,
  revertOnUpdate: true
});
```

Use `revertOnUpdate: true` when previous animations should be reverted before the hook re-runs.

## contextSafe for delayed/event callbacks

Animations created later inside event handlers may fall outside the original GSAP context. Wrap those callbacks with `contextSafe`.

```javascript
const { contextSafe } = useGSAP({ scope: container });

const handleEnter = contextSafe(() => {
  gsap.to(".button", { scale: 1.03 });
});
```

This helps ensure animations created by callbacks are tracked and reverted correctly.

## Without @gsap/react

If `useGSAP()` is unavailable, create a `gsap.context()` inside an effect and revert it during cleanup.

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, container);

  return () => ctx.revert();
}, []);
```

Never skip cleanup in reusable or routed components.

## ScrollTrigger in React

Create ScrollTriggers inside `useGSAP()` or a scoped GSAP context so they are cleaned up with the component.

```javascript
useGSAP(() => {
  gsap.to(".visual", {
    yPercent: -10,
    scrollTrigger: {
      trigger: ".section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
}, { scope: container });
```

When async content or fonts materially change layout, refresh ScrollTrigger after the DOM is stable.

## SSR / Next.js

GSAP runs in the browser.

- Do not execute `gsap.*` or `ScrollTrigger.*` during server rendering.
- Keep animation creation inside client lifecycle code such as `useGSAP()`.
- In Next.js App Router, animated components generally need to be client components when they depend on browser DOM APIs.
- Dynamic import may be useful when a heavy plugin is used only on specific routes.

## Plugin Registration

Register plugins at module/app level rather than inside a component render cycle.

```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
```

## Responsive Motion

Use `gsap.matchMedia()` inside the component lifecycle when desktop/mobile behavior differs.

Do not force desktop hover or complex scroll interactions onto mobile.

Respect `prefers-reduced-motion`.

## Best Practices

- Prefer `useGSAP()` when available.
- Scope selectors.
- Use refs for unique elements.
- Clean up every component-owned animation.
- Keep GSAP execution client-side in SSR frameworks.
- Use `contextSafe` for delayed/event callbacks.
- Test route changes and repeated mounts for stale animations.

## Do Not

- Do not target generic global selector strings from reusable components without scope.
- Do not skip cleanup.
- Do not execute DOM animation during SSR.
- Do not register plugins repeatedly in component render bodies.
- Do not copy desktop interaction directly to mobile when the input model differs.

## Admonk Constraint

React implementation must preserve the interaction principles in `docs/MOTION-LANGUAGE.md`.

The technical goal is not more animation. It is reliable implementation of purposeful motion.
