# Motion / Framer Motion — Upstream Integration

Source project: `freshtechbro/claudedesignskills`

Source skill: `plugins/individual/motion-framer/skills/motion-framer`

Upstream repository license: MIT

This Admonk skill is an adapted implementation guide, not a verbatim copy of the upstream skill.

## Why it was adapted

The upstream skill contains useful Motion patterns, but it overlaps with Admonk's existing motion system and contains package/import examples based on older `framer-motion` conventions.

Current Motion documentation uses the `motion` package with React APIs imported from `motion/react`, so Admonk treats current official Motion documentation as authoritative for API/version details.

## Keep

- Declarative React state-driven animation.
- `AnimatePresence` for exit states.
- Variants for reusable state/orchestration.
- `layout`, `layoutId`, and shared-element transitions.
- Hover, tap, focus, drag, and viewport gesture handling.
- MotionValues for high-frequency animated values.
- `useScroll`, `useTransform`, `useSpring`, and related hooks.
- Reduced-motion support.
- Performance preference for transform/opacity where practical.
- Combining Motion for component behavior with GSAP for complex timelines.

## Modify

- Motion applies only to React/Next.js projects where it is actually useful.
- Current `motion` package conventions replace stale `framer-motion` defaults for new implementations.
- CSS remains preferable for simple interactions.
- GSAP remains preferable for complex sequencing, ScrollTrigger, SVG choreography, and Webflow/custom DOM scenes.
- Generic spring presets are treated as examples, not Admonk motion defaults.
- Scroll animation follows Admonk's restrained motion philosophy rather than maximizing effects.
- Drag and gesture patterns must preserve accessible alternatives for critical actions.
- Shared-element transitions are used only when they clarify continuity.

## Skip

- Installing Motion automatically for every React project.
- Replacing working GSAP/CSS animation solely to standardize on Motion.
- Treating bounce/spring animation as a default personality.
- Using layout animation on large groups without a performance reason.
- Using drag interactions as decoration when they interfere with browsing.
- Letting Motion and GSAP continuously control the same transform/property on the same DOM node.
- Turning lightweight component animation into complex scroll choreography.

## Reference Only

The upstream skill remains useful as a pattern reference for:

- Presence and exit patterns.
- Variant orchestration.
- Gesture syntax.
- Drag constraints.
- Layout transitions.
- MotionValue usage.

For current API/package details, verify against official Motion documentation before implementation.

## License

MIT License

Copyright (c) 2025 Claude Skills Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
