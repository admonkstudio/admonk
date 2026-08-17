---
name: gsap-scrolltrigger
description: Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or recommending scroll-based animation, parallax, pinned sections, or when the user asks about ScrollTrigger, scroll animations, or pinning.
license: MIT
---

# GSAP ScrollTrigger

## When to Use This Skill

Apply when implementing scroll-driven animations: triggering tweens/timelines on scroll, pinning elements, scrubbing animation to scroll position, parallax, or scroll storytelling.

**Related skills:** Use **gsap-core** for tweens, **gsap-timeline** for sequencing, **gsap-react** for React cleanup, and **gsap-plugins** for ScrollSmoother or ScrollToPlugin.

## Register

```javascript
gsap.registerPlugin(ScrollTrigger);
```

Register the plugin once before use.

## Basic Trigger

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  }
});
```

## Core Configuration

- **trigger** — element whose position controls the trigger.
- **start** — activation point, e.g. `"top center"`.
- **end** — ending point, e.g. `"bottom center"` or `"+=1000"`.
- **scrub** — link animation progress to scroll. A number adds catch-up smoothing.
- **toggleActions** — discrete enter/leave behavior.
- **pin** — pin an element during the active range.
- **pinSpacing** — whether spacer layout is added while pinned.
- **scroller** — custom scroll container.
- **markers** — development markers only; remove in production.
- **once** — kill trigger after it completes once.
- **snap** — snap progress to positions or labels.
- **refreshPriority** — control refresh ordering when triggers are created out of page order.

Use `scrub` for continuous scroll-linked progress or `toggleActions` for discrete play/reverse behavior. Do not combine them without a clear reason.

## Scrub

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});
```

Use numeric scrub when some smoothing is desirable. Keep the Admonk motion principle in mind: scroll should reveal the experience, not become the entire experience.

## Pinning

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=1000",
    pin: true,
    scrub: 1
  }
});
```

Pin only when the story genuinely benefits from holding one spatial context. Avoid excessive pinned sections and excessive scroll distance.

When pinning, prefer animating children rather than animating the pinned element itself.

## Timeline + ScrollTrigger

Put ScrollTrigger on the timeline or top-level tween, not on child tweens inside a timeline.

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "+=1600",
    scrub: 1,
    pin: true
  }
});

tl.to(".a", { x: 100 })
  .to(".b", { y: 50 })
  .to(".c", { autoAlpha: 0 });
```

## ScrollTrigger.batch()

Use `ScrollTrigger.batch()` when many similar elements should respond as they enter or leave the viewport.

```javascript
ScrollTrigger.batch(".card", {
  interval: 0.1,
  batchMax: 4,
  start: "top 80%",
  onEnter: (batch) => gsap.to(batch, {
    autoAlpha: 1,
    y: 0,
    stagger: 0.08,
    overwrite: true
  })
});
```

## Custom Smooth Scrollers

Use `ScrollTrigger.scrollerProxy()` only when integrating a third-party smooth-scroll implementation whose scroll position ScrollTrigger cannot read natively.

When that scroller updates, call `ScrollTrigger.update` so calculations stay synchronized.

GSAP's own ScrollSmoother does not require `scrollerProxy()`.

## Horizontal / containerAnimation

For a fake horizontal-scroll experience driven by vertical scroll:

1. Pin the viewport section.
2. Animate an inner content wrapper horizontally.
3. Use `ease: "none"` on the horizontal animation.
4. Use `containerAnimation` for nested triggers that need to respond to the horizontal progress.

```javascript
const scrollTween = gsap.to(".horizontal-track", {
  xPercent: -75,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: "+=1800",
    scrub: true,
    pin: true
  }
});
```

Do not use easing other than `"none"` on a containerAnimation-driving horizontal tween because it breaks the direct relationship between scroll and position.

## start and end

Start/end can use:

- strings such as `"top 80%"`
- relative distances such as `"+=500"`
- functions for dynamic layout values
- `clamp(...)` where supported to keep positions within page bounds

When layout changes after dynamic content, fonts, or imagery loads, refresh positions.

## Refresh

Use:

```javascript
ScrollTrigger.refresh();
```

after meaningful DOM/layout changes that affect trigger positions.

Do not call `refresh()` continuously or on every frame. Viewport resize refresh is already handled by ScrollTrigger.

Create ScrollTriggers in top-to-bottom page order where practical. If asynchronous creation makes that impossible, use `refreshPriority` deliberately.

## Cleanup

Kill stale triggers when pages/components are removed.

```javascript
ScrollTrigger.getById("project-trigger")?.kill();
```

In component frameworks, prefer scoped GSAP contexts or framework-specific hooks so cleanup happens automatically.

## Responsive and reduced motion

Combine ScrollTrigger with `gsap.matchMedia()` to create different behaviors for desktop/mobile and to respect `prefers-reduced-motion`.

Complex desktop scroll stories should usually become simpler on mobile rather than being copied literally.

## Performance

- Pin only what is necessary.
- Prefer transforms and opacity.
- Avoid hundreds of simultaneous ScrollTriggers without testing.
- Keep scrub distances proportional to the amount of new information being revealed.
- Test on realistic mobile hardware.

## Official Best Practices

- Register ScrollTrigger before use.
- Put ScrollTrigger on top-level tweens/timelines.
- Use scrub for scroll-linked progress, toggleActions for discrete behavior.
- Refresh after meaningful layout changes.
- Create triggers in page order or use refreshPriority.
- Remove markers before production.
- Clean up stale triggers.

## Do Not

- Do not put ScrollTrigger on child tweens inside a timeline.
- Do not nest ScrollTriggered animations inside parent timelines.
- Do not forget plugin registration.
- Do not leave `markers: true` in production.
- Do not create arbitrary long scroll distances merely for spectacle.
- Do not animate the pinned element itself when animating a child can achieve the intended effect more safely.
- Do not use horizontal-scroll mechanics or scroll hijacking simply because they look impressive in demos.

## Admonk Creative Constraint

Technical capability does not override `docs/MOTION-LANGUAGE.md`.

For Admonk work:

> **The user moves naturally. The interface responds beautifully.**

If ScrollTrigger makes the website harder to browse, simplify the interaction.
