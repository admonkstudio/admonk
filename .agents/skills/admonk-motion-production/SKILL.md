---
name: admonk-motion-production
description: Plan, prototype, choose a motion medium, implement, and validate motion across Figma, Webflow, Astro/code, CSS, Motion, GSAP, SVG, and future interactive animation tools such as Rive. Use when turning an approved interaction/motion concept into a production workflow or comparing which motion technology should own an effect.
---

# Admonk Motion Production

This skill owns the **production route** for motion.

Use `admonk-motion` for motion principles and interaction judgment.

Use this skill after the motion has a reason to exist.

Core rule:

> **Choose the simplest motion medium that can express the idea without sacrificing quality, usability, or maintainability.**

---

# 1. Define the Motion Job

Before selecting technology, identify:

- What moves?
- Why does it move?
- What triggers it?
- Is it decorative, explanatory, navigational, or feedback?
- Does the user control progress?
- Must it be responsive to pointer/touch/scroll?
- Does it need physics, sequencing, path animation, masking, layout interpolation, or state-machine behavior?
- Is it a prototype or production behavior?

If the motion has no meaningful job, remove it.

---

# 2. Medium Selection

Use this default routing model.

## CSS

Prefer for:

- Hover/focus states
- Small transforms
- Opacity transitions
- Simple loops
- Button/icon feedback
- Basic keyframes

## Webflow native interactions

Prefer when:

- The project is Webflow.
- The behavior is straightforward.
- Native implementation remains easy to maintain.
- Custom code would not add meaningful value.

Do not force custom GSAP for basic effects.

## Motion for React

Prefer for:

- React component enter/exit
- Presence
- Layout transitions
- Shared layout IDs
- Gestures/drag
- Component state animation

Use `admonk-react-motion` for implementation details.

## GSAP

Prefer for:

- Complex timelines
- ScrollTrigger
- Precise sequencing
- Advanced transforms
- SVG animation
- Masks
- Path-based motion
- Cross-element choreography
- Complex responsive motion logic

Use the relevant GSAP skills.

## Figma motion/prototyping

Prefer for:

- Early interaction concepts
- Design review
- Transition intent
- Demonstrating motion behavior before implementation
- Comparing motion direction with the static design

Treat Figma motion as a prototype/specification unless the deliverable itself is a Figma prototype.

## Rive / state-machine animation

Consider when:

- A reusable interactive vector/character/object needs internal states.
- Animation reacts continuously to input/state.
- A self-contained runtime animation is preferable to DOM choreography.

Do not introduce Rive merely because it is visually impressive.

## Video / pre-rendered motion

Consider when:

- The animation is purely cinematic.
- User input does not need to change the result.
- Rendering complex visual effects at runtime would be unnecessarily expensive.

---

# 3. Prototype Before Complex Build

For significant motion, prototype the behavior before spending time on production details.

Prototype options:

- Figma interaction
- Reduced HTML/CSS/JS proof
- GSAP sandbox
- Isolated component
- SVG motion test
- Rive test file

A prototype should answer:

- Does the interaction feel natural?
- Is the duration/rhythm right?
- Is the idea understandable?
- Does it justify the complexity?

Do not polish a weak concept.

---

# 4. Motion Specification

For significant effects, define:

```text
PURPOSE:
TRIGGER:
START STATE:
END STATE:
ELEMENTS INVOLVED:
SEQUENCE:
DURATION / RHYTHM:
EASING CHARACTER:
SCROLL RELATIONSHIP:
INPUT RESPONSE:
RESPONSIVE BEHAVIOR:
REDUCED-MOTION BEHAVIOR:
PERFORMANCE RISKS:
TECHNOLOGY OWNER:
```

This becomes the implementation contract between design and code.

---

# 5. Ownership Rule

Avoid multiple animation systems fighting over the same element/property.

If two systems are required, assign clear ownership.

Example:

```text
Outer wrapper → GSAP scroll transform
Inner component → Motion layout/presence
```

or:

```text
Element transform → GSAP
Pseudo-element color transition → CSS
```

Do not allow Motion, CSS, and GSAP to continuously overwrite the same `transform` unless deliberately coordinated.

---

# 6. Scroll Motion

Scroll should reveal/control motion only when the relationship is meaningful.

Before adding ScrollTrigger/scrubbing/pinning, ask:

- Does progress naturally map to scroll position?
- Does pinning make the story easier to understand?
- Is the user being forced to scroll an artificial distance?
- Can the same idea work with a shorter interaction?

Prefer natural page movement over long cinematic scroll sequences by default.

---

# 7. Explanatory Motion

For service/process/system explanation, use familiar visual vocabulary:

- Lines
- Paths
- Nodes
- Cards
- Notifications
- Forms
- App/service icons
- Charts
- Status changes
- Connections
- Progress

A small animation should tell a clear miniature story.

Example:

```text
Form submitted
→ lead enters CRM
→ qualification status changes
→ email/WhatsApp action triggers
```

The animation should remain understandable without a tutorial.

---

# 8. Responsive Motion

Do not simply scale desktop motion down.

On smaller devices:

- Replace hover with tap/scroll/automatic states.
- Shorten excessive travel distances.
- Reduce expensive simultaneous effects.
- Preserve the concept when possible.
- Remove effects that interfere with reading/navigation.

Test actual touch/device behavior rather than relying only on resized desktop windows.

---

# 9. Accessibility

Every significant motion implementation must define a reduced-motion behavior.

Possible reduced alternatives:

- Instant state change
- Simple fade
- No parallax
- No smooth/scrubbed movement
- No continuous loop

Critical information or functionality must never depend solely on animation.

---

# 10. Performance

Prefer transform/opacity for high-frequency DOM animation when practical.

Review:

- Number of animated elements
- Large blur/filter effects
- Fixed/pinned layers
- Huge raster assets
- Continuous canvas/WebGL rendering
- Scroll handlers
- Layout-triggering properties
- Mobile GPU load

Use sophistication where users can perceive the value.

---

# 11. Platform Workflow

## Figma

1. Establish the static design.
2. Prototype important transitions/interactions.
3. Capture timing/easing/state intent.
4. Use motion context/code hints when available.
5. Treat the result as a spec for production unless Figma prototype is the final deliverable.

## Webflow

1. Use native interactions when they cleanly support the effect.
2. Use custom JS/GSAP for advanced behavior.
3. Keep selectors/classes maintainable.
4. Test on the published/staging site.
5. Verify that Designer structure and custom code are not fighting each other.

## Astro / code

1. Keep static content static.
2. Add client-side JS only where motion/interactivity needs it.
3. Use CSS for simple effects.
4. Use GSAP/Motion only for justified complexity.
5. Reinitialize motion correctly if page-transition/client-routing behavior replaces DOM.

---

# 12. Validation Loop

For important motion:

```text
Prototype
→ implement
→ open real environment
→ interact naturally
→ test desktop
→ test touch/mobile
→ test reduced motion
→ inspect console/performance
→ refine
```

Use `admonk-browser-qa` and Playwright where appropriate.

A technically correct animation that feels wrong is not finished.

---

# 13. Future Motion Capability

Maintain awareness of emerging tools, but add them to production only when their strengths match the project.

Potential future categories include:

- Rive interactive vector/state machines
- WebGL / Three.js spatial experiences
- WebGPU
- Canvas/WebGL particle systems
- Lottie for pre-authored vector motion
- SVG-native animation
- Video compositing

Future readiness does not justify unnecessary dependencies in current projects.

---

# Final Standard

The production stack should disappear behind the experience.

> **Users should notice the response, continuity, and delight — not the animation library.**
