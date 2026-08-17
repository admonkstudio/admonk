---
name: admonk-rive
description: Use when a project needs Rive interactive vector animation, state machines, responsive animated illustrations, data-bound motion graphics, or reusable interactive animation that should live between design and runtime code.
---

# Admonk Rive

Rive is a future-ready motion medium for interactive vector graphics and state-machine-driven animation.

It does not replace CSS, GSAP, Motion, video, or Three.js. Choose it when its authoring/runtime model is genuinely advantageous.

## Strong Use Cases

- interactive icons/illustrations
- product explainers
- animated process diagrams
- character/object reactions
- state-driven interface graphics
- reusable animation controlled by application data
- animation systems where designers should be able to iterate without rewriting runtime choreography

## Prefer Another Tool When

- the motion is a simple hover/transition → CSS
- the motion choreographs DOM/page structure → GSAP
- the animation is React layout/presence state → Motion
- the requirement is real 3D/spatial rendering → Three.js/WebGL
- the asset is purely cinematic/passive → video may be simpler

## State Machines

Treat the state machine as the interaction contract. Define meaningful states, transitions, inputs/data bindings, and fallbacks before producing a complex graph.

Application code should communicate intent/data to the Rive asset rather than tightly controlling every internal animation frame.

## Responsive Runtime

Plan artboard/layout behavior for its real container. Verify current Rive runtime documentation for fit/layout APIs, resizing, device pixel ratio, and state-machine behavior before implementation.

## Performance

- avoid running animation when it provides no visible value
- pause/settle/offscreen behavior where appropriate
- keep asset complexity proportional to visual benefit
- test on mobile/low-power devices
- verify resizing and high-DPI rendering

## Accessibility

Interactive graphics must not become the only way to access critical content/actions. Provide semantic controls/content where necessary and respect reduced-motion intent.

## Integration

Coordinate Rive with `admonk-motion` and `admonk-motion-production`. Rive owns its internal animation; external systems should not fight the same visual properties.

## Admonk Principle

> Use Rive when the animation itself needs behavior, not simply because it moves.
