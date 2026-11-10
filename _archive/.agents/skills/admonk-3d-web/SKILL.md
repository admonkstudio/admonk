---
name: admonk-3d-web
description: Use for interactive 3D, Three.js, WebGL/WebGPU, spatial website experiences, product viewers, 3D scenes, shaders, model loading, camera interaction, or deciding whether a web experience should use real-time 3D.
---

# Admonk 3D Web

3D is a visual/interaction medium, not a premium-design shortcut.

## Use 3D When

It creates value through:

- spatial storytelling
- product exploration
- dimensional brand expression
- interactive data/objects
- environments impossible to communicate as effectively in 2D
- a deliberate hero or transition concept

Do not introduce a WebGL scene merely to make a website look technologically advanced.

## Technology

Three.js is a strong default candidate for custom real-time web 3D. Verify current Three.js documentation before implementation because the library evolves quickly.

For React projects, React Three Fiber may be appropriate, but do not move a non-React project to React only for 3D.

## Production Rules

- Make canvas sizing and camera aspect responsive.
- Treat mobile GPU cost as a first-class constraint.
- Cap rendering resolution when full device-pixel-ratio rendering is wasteful.
- Prefer rendering on demand when the scene is static between interactions.
- Use the current renderer animation-loop API where recommended by Three.js.
- Dispose GPU resources and event listeners when scenes/components are removed.
- Compress/optimize geometry, textures and models.
- Avoid enormous texture resolution that provides no visible benefit.
- Provide graceful fallback/degradation when the 3D experience is nonessential.
- Ensure important navigation/content does not become inaccessible because a canvas failed.
- Test touch, reduced motion, low-power/mobile hardware, resizing and orientation changes.

## Motion Ownership

Coordinate with `admonk-motion-production` and GSAP. Avoid multiple systems continuously fighting over the same camera/object/property.

## Accessibility

Canvas content is not automatically meaningful to assistive technology. Critical content/actions need semantic HTML alternatives or equivalent accessible controls.

## Verification

Use browser QA to inspect:

- frame stability
- input response
- console/WebGL errors
- resize behavior
- memory/resource cleanup
- loading/fallback states
- device performance

## Admonk Principle

> Use 3D when depth is part of the idea, not when depth is the idea.
