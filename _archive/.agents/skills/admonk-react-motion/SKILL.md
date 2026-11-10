---
name: admonk-react-motion
description: Implement or review state-driven animation in React/Next.js using Motion. Use for component micro-interactions, variants, presence/exit animation, layout and shared-element transitions, gestures, drag/reorder behavior, MotionValues, and lightweight scroll-linked UI. This skill does not define Admonk's motion philosophy and does not replace GSAP for complex timelines or scroll choreography.
---

# Admonk React Motion

Use this skill when a React or Next.js project needs **component-level, state-driven motion**.

The governing principle remains:

> **Motion supports the experience. Motion is not the experience.**

This skill answers:

> **Is Motion the right implementation tool for this React interaction, and is it being used cleanly?**

---

## 1. Authority

Creative motion direction comes from:

- `docs/MOTION-LANGUAGE.md`
- `.agents/skills/admonk-motion/SKILL.md`

React/Next.js engineering comes from:

- `.agents/skills/admonk-react-engineering/SKILL.md`

GSAP implementation comes from the relevant `gsap-*` skills.

This skill is an implementation layer only.

---

## 2. Verify the Project First

Before using Motion:

1. Confirm the project actually uses React or Next.js.
2. Inspect `package.json`.
3. Confirm whether Motion is already installed and which version is present.
4. Do not add Motion when CSS can cleanly handle the interaction.
5. Do not replace an existing GSAP implementation merely because Motion is available.

Use the project's current stack unless there is a concrete reason to change it.

---

## 3. Current Motion Package

For current Motion projects, prefer the `motion` package and React imports from:

```js
import { motion, AnimatePresence } from "motion/react"
```

For Next.js App Router, components using interactive Motion hooks generally belong in a client boundary. Where appropriate, current Motion also provides the React client entrypoint for reducing unnecessary client JavaScript.

Do not blindly copy older examples that import everything from `framer-motion`.

Always verify the installed version before changing imports in an existing project.

---

## 4. Tool Selection

Choose the least complex tool capable of producing the intended result.

### CSS

Prefer CSS for:

- Simple hover/focus states
- Basic opacity/color/transform transitions
- Small decorative loops
- Interactions that do not depend on React state orchestration

### Motion

Prefer Motion for:

- React state-driven animation
- Component enter/exit behavior
- Variants and child orchestration
- Layout changes
- Shared-element transitions
- Gesture states
- Drag/reorder interfaces
- MotionValues
- Lightweight scroll-triggered or scroll-linked UI

### GSAP

Prefer GSAP for:

- Complex multi-step timelines
- Precise sequencing across unrelated elements
- Advanced ScrollTrigger scenes
- Pinning and long-form scroll storytelling
- Complex SVG animation
- Webflow/custom DOM animation systems
- Cases where timeline control is the primary requirement

> **Do not choose an animation library by habit. Choose it by interaction model.**

---

## 5. State-Based Motion

Motion is strongest when animation follows interface state.

Useful patterns include:

- `initial`
- `animate`
- `exit`
- `whileHover`
- `whileTap`
- `whileFocus`
- `whileDrag`
- `whileInView`

Use these when the visual state has a clear relationship to application state or user input.

Do not create state merely to trigger animation when a simpler CSS interaction would work.

---

## 6. Variants

Use variants when they improve coordination and readability.

Good uses:

- Parent/child orchestration
- Shared component states
- Reusable open/closed states
- Small staggered groups
- Consistent modal/menu states

Avoid building a huge variant abstraction for one simple animation.

Stagger should reinforce hierarchy, not make the user wait for every item to enter one-by-one.

---

## 7. Presence and Exit Animation

Use `AnimatePresence` when removed React elements need a deliberate exit state.

Check:

- Exiting elements have stable, meaningful keys.
- Presence is placed at the level where removal actually occurs.
- Exit animation does not delay a critical task unnecessarily.
- Rapid state changes do not leave the interface visually stuck.

Good uses include:

- Modals
- Menus
- Notifications
- Filters
- Swapping project/media states
- Small route/state transitions

Do not animate disappearance just because exit animation is available.

---

## 8. Layout Animation

Use Motion's layout system when the interface genuinely changes size or position because of state.

Useful tools include:

- `layout`
- `layout="position"`
- `layout="size"`
- `layoutId`
- `LayoutGroup`

Good uses:

- Accordion expansion
- Filter/reorder transitions
- Active navigation indicators
- Cards expanding into details
- Shared thumbnail-to-detail transitions

Use shared layout transitions selectively. They should improve continuity, not become a default effect.

For layout animation inside scrollable or fixed containers, verify Motion's current `layoutScroll` / `layoutRoot` requirements against the actual structure.

---

## 9. Shared-Element Transitions

Shared elements are especially valuable when one object clearly continues into another state.

Prefer:

> **Transform the same idea instead of making it disappear and reappear.**

Potential uses:

- Portfolio thumbnail → project view
- Active tab indicator
- Product card → product detail
- Image → modal
- Selected filter/chip movement

Do not use shared-element animation when the relationship between states is not visually meaningful.

---

## 10. Gestures

Motion is useful for declarative:

- Hover
- Tap/press
- Focus
- Drag
- Reorder
- Viewport interaction

Gestures must still follow `admonk-ux-systems`.

Do not:

- Depend on hover for essential information.
- Make controls move so far they become hard to click.
- Require drag as the only way to perform an important action.
- Use gesture effects that fight native scrolling.

Feedback should feel immediate and controlled.

---

## 11. Drag and Reorder

Use drag when direct manipulation improves the task.

Examples:

- Reordering an editable list
- Controlled sliders or draggable objects
- Playful secondary interactions

Always consider:

- Constraints
- Touch behavior
- Keyboard/pointer alternatives for important actions
- Final state persistence
- Velocity/inertia only when appropriate

Do not add draggable objects purely as decoration if they interfere with browsing.

---

## 12. Scroll Animation

Motion supports both:

### Scroll-triggered

Use viewport-based state such as `whileInView` / `useInView` for lightweight reveals and component reactions.

### Scroll-linked

Use `useScroll` with MotionValues for progress, parallax, scale, opacity, or other values tied directly to scroll position.

Prefer Motion when the behavior is local to a React component.

Prefer GSAP/ScrollTrigger when the scene needs complex sequencing, pinning, coordinated sections, or advanced timeline control.

Do not turn a simple component reveal into a large scroll system.

---

## 13. MotionValues

Use MotionValues for frequently changing animated values that should not force normal React re-renders.

Useful hooks include:

- `useMotionValue`
- `useTransform`
- `useSpring`
- `useScroll`
- `useVelocity`
- `useMotionValueEvent`

Use them for actual animation state, not as a replacement for ordinary application state.

---

## 14. Springs

Springs are a tool, not a house style.

Use them when physical response improves the interaction:

- Drag release
- Toggle/selection movement
- Small object response
- Layout transitions

Do not default every interaction to bounce or overshoot.

Admonk generally prefers controlled motion unless the client's brand calls for something more playful.

Tune springs based on the intended feeling rather than copying generic presets.

---

## 15. Reduced Motion

Respect reduced-motion preferences.

Use Motion's reduced-motion support when the animation is significant.

A reduced-motion state should preserve:

- Information
- Hierarchy
- Task completion
- State feedback

while reducing unnecessary travel, parallax, scale, and spatial movement.

Do not simply remove feedback entirely.

---

## 16. Performance

Prefer compositor-friendly animation where practical:

- Transform
- Opacity

Be cautious with:

- Large numbers of layout-animated elements
- Expensive filters/blurs
- Continuous scroll-linked effects
- Large lists with `layout`
- Multiple animation systems targeting the same DOM node

Performance problems should be measured and diagnosed rather than guessed.

---

## 17. Motion + GSAP

Motion and GSAP may coexist in the same React project.

Recommended division:

```text
Motion
→ component state
→ presence
→ layout
→ gestures
→ small shared-element transitions

GSAP
→ timelines
→ complex sequencing
→ advanced ScrollTrigger
→ SVG
→ cinematic DOM choreography
```

### Ownership Rule

Do not let Motion and GSAP continuously animate the **same property on the same element** at the same time.

If both are needed:

- Divide responsibilities by element/property, or
- Add wrapper elements so each system owns a different layer.

This prevents transforms from overwriting each other and keeps debugging understandable.

---

## 18. Next.js Boundaries

For Next.js:

- Keep server/client boundaries intentional.
- Do not convert an entire route to a client component just because one child animates.
- Isolate interactive Motion components where practical.
- Preserve server rendering and streaming advantages when possible.

Coordinate these decisions with `admonk-react-engineering`.

---

## 19. Accessibility and Interaction

Motion must not override semantic HTML or interaction behavior.

Use real:

- Buttons
- Links
- Inputs
- Dialog semantics

then animate them.

Do not replace semantic controls with generic animated `div` elements simply because they are easier to animate.

Focus states and keyboard operation must survive the animation layer.

---

## 20. Implementation Review

Before approving a Motion implementation, check:

### Purpose

- Why is Motion being used?
- Would CSS be simpler?
- Would GSAP be more appropriate?

### State

- Does animation map clearly to interface state?
- Are enter/exit states stable?

### Layout

- Are layout transitions improving continuity?
- Is `layoutId` used only where meaningful?

### Interaction

- Are hover/tap/drag states intuitive?
- Does touch still work?
- Are critical actions accessible without gestures?

### Performance

- Are too many elements layout-animated?
- Are animation systems fighting each other?

### React / Next.js

- Are client boundaries appropriately small?
- Are high-frequency animated values avoiding unnecessary React renders?

### Accessibility

- Is reduced motion respected?
- Is semantic interaction preserved?

---

## 21. Final Standard

Use Motion when React state and interface motion naturally belong together.

Use GSAP when choreography and timeline control are the real problem.

Use CSS when the interaction is simple.

> **The best animation library is the one that solves the interaction cleanly without becoming the interaction itself.**
