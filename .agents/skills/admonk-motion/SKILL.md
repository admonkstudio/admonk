---

name: admonk-motion
description: Design, critique, implement, or refine motion and interaction for Admonk web experiences. Use for GSAP, ScrollTrigger, Webflow interactions, hover effects, micro-interactions, section transitions, scroll animation, explanatory motion graphics, animated cards, SVG animation, menus, buttons, or deciding whether motion improves or harms an experience.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Admonk Motion

Use this skill whenever designing or implementing animation, interaction, or motion.

The objective is not to make the website move more.

The objective is to make the website feel:

* Smooth
* Responsive
* Polished
* Alive
* Natural
* Enjoyable to explore

The core principle is:

> **Motion supports the experience. Motion is not the experience.**

---

# 1. Load Context Selectively

Read:

* `docs/MOTION-LANGUAGE.md`

for significant interaction or animation work.

Also read:

* `docs/DESIGN-LANGUAGE.md`

when motion affects the overall composition or creative concept.

Read:

* `docs/IMAGE-DIRECTION.md`

when imagery or mockups will animate.

Do not load all documents for a simple button hover adjustment.

---

# 2. Start With Purpose

Before animating something, ask:

1. Why should this move?
2. What does the movement communicate?
3. What user action triggers it?
4. Does it improve understanding, feedback, continuity, or delight?
5. Would the experience be worse without it?

If there is no meaningful answer:

> Do not animate it.

---

# 3. Primary Interaction Principle

> **Experiment with presentation, not basic behavior.**

Users should already understand how to:

* Scroll
* Click
* Hover
* Open menus
* Navigate
* Submit forms

Do not redesign familiar behavior unnecessarily.

Instead, make the interface respond to those familiar actions in an unexpected and polished way.

---

# 4. Familiar Interaction, Unfamiliar Presentation

Prefer:

```text
Normal scroll
      ↓
Unexpected visual reveal
```

over:

```text
New scrolling mechanic
      ↓
User must learn how it works
```

Prefer:

```text
Normal button
      ↓
Memorable hover response
```

over:

```text
Unrecognizable control
      ↓
User must discover it is clickable
```

---

# 5. Motion Priority

Use motion in this order:

```text
1. Feedback
2. Continuity
3. Understanding
4. Delight
5. Spectacle
```

Spectacle is the lowest priority.

---

# 6. Motion Levels

Think of interaction across four levels:

## Level 1 — Micro Interaction

Frequent.

Examples:

* Buttons
* Links
* Icons
* Menu items
* Cards
* Image hover
* Navigation
* Small masks
* Pointer response

---

## Level 2 — Natural Page Motion

Common.

Examples:

* Reveals
* Masks
* Image movement
* Smooth scrolling
* Section transitions
* Subtle depth
* Sticky behavior
* Controlled parallax

---

## Level 3 — Storytelling Interaction

Selective.

Examples:

* Hero transformations
* Framework storytelling
* Portfolio reveals
* Major scroll sequences
* Shared-object transitions

---

## Level 4 — Explanatory Motion Graphics

Used to explain:

* Services
* Processes
* Systems
* Workflows
* Results
* Integrations

Usually through:

* Lines
* Icons
* Nodes
* Cards
* Routes
* Status changes
* Charts
* Familiar UI elements

---

# 7. Micro Interactions

Micro interactions should be one of Admonk's strongest motion layers.

They should create the feeling:

> **"I want to see what happens if I interact with this."**

Useful responses include:

* Text shifting
* Icon movement
* Controlled rotation
* Fill transitions
* Border movement
* Small scale
* Image changes
* Mask reveals
* Pointer proximity
* Subtle depth

Keep them responsive.

---

# 8. Immediate Feedback

User input should produce immediate visual feedback.

Preferred:

```text
USER ACTION
     ↓
RESPONSE
     ↓
DELIGHT
     ↓
CONTINUE
```

Avoid:

```text
USER ACTION
     ↓
DELAY
     ↓
LONG EFFECT
     ↓
CONTINUE
```

---

# 9. Buttons

Buttons can contain personality.

Possible effects:

* Text swap
* Text lift
* Arrow movement
* Background reveal
* Border animation
* Magnetic movement
* Small distortion
* Icon rotation

But the element must remain clearly recognizable as a button.

---

# 10. Menus

Menus can contain stronger animation than normal controls.

However:

* Opening should be obvious.
* Closing should be obvious.
* Navigation should remain readable.
* Motion should not delay basic use.

Do not make the visitor learn how to escape a menu.

---

# 11. Hover

Use hover to add discovery.

Suitable for:

* Portfolio cards
* Links
* Images
* Navigation
* Buttons
* Interactive objects

Do not hide essential information exclusively behind hover.

Mobile must still receive the complete experience.

---

# 12. Smooth Scrolling

Smooth scrolling should feel:

* Fluid
* Controlled
* Responsive

Avoid excessive smoothing.

The page should never feel like it is fighting against the user's input.

The user remains in control.

---

# 13. Scroll Principle

> **Scrolling reveals the experience. Scrolling should not become the experience itself.**

Prefer:

```text
Scroll
  ↓
Content responds
  ↓
Story progresses
  ↓
Continue
```

Avoid:

```text
Scroll
  ↓
Page locks
  ↓
Animation
  ↓
Scroll
  ↓
Page locks again
```

unless the storytelling genuinely requires it.

---

# 14. Scroll Distance

Do not create huge scroll distances merely to make an animation last longer.

Ask:

* Is the user receiving new information?
* Could this happen faster?
* Does the importance justify the scroll distance?

Longer is not automatically more immersive.

---

# 15. Pinned Sections

Use pinning selectively.

Good reasons:

* Multiple related states
* One visual evolving over time
* A process shown progressively
* A comparison
* Strong narrative continuity

Bad reason:

> ScrollTrigger makes it possible.

---

# 16. Hero Interactions

Major pages can contain a few strong interaction moments.

Examples:

* Opening sequence
* Project reveal
* Framework transition
* Portfolio transformation

Use these selectively.

> **Not every section should try to be the hero.**

---

# 17. Motion Rhythm

Avoid giving every section the same animation.

Bad:

```text
fade up
fade up
fade up
fade up
```

Better:

```text
quiet reveal
     ↓
interactive image
     ↓
static breathing space
     ↓
major transition
     ↓
small micro-interaction
```

Stillness is part of motion design.

---

# 18. Continuous Experience

Look for opportunities to visually connect related sections.

Potential methods:

* Shared object
* Continued line
* Image transformation
* Mask transition
* Color transition
* Crop change
* Scale
* Position change
* Depth

Do not force continuity when a clean visual break is stronger.

---

# 19. Spatial Logic

Motion should preserve understandable spatial relationships.

If something moves:

* It should have a believable origin.
* It should travel toward a meaningful destination.
* Related objects should behave consistently.

Avoid arbitrary movement.

---

# 20. Transform Instead of Replace

When the same idea continues between two states, consider transforming the object.

Prefer:

```text
Card
 ↓
expands
 ↓
Project image
 ↓
next composition
```

instead of:

```text
Card disappears
New image appears
```

when continuity improves the story.

---

# 21. Explanatory Motion

When explaining a process:

> **Turn the process into a tiny visual story.**

Use familiar elements.

Example:

```text
Website
   ↓
Lead
   ↓
CRM
   ↓
Email
   ↓
Sales
```

Animate the movement through the process.

The visual should explain the service within seconds.

---

# 22. Explanatory Graphics Should Stay Simple

Prefer:

* Lines
* Nodes
* Routes
* Cards
* Notifications
* Familiar app icons
* Charts
* Progress
* Status changes

Avoid highly abstract motion when a familiar metaphor explains the concept better.

---

# 23. Lines

Lines are especially useful for:

* Connection
* Workflow
* Direction
* Progress
* Journey
* Data transfer

A line should have:

* Origin
* Direction
* Destination

Do not animate random lines for decoration.

---

# 24. Animated Cards

A card can contain a small self-contained story.

Examples:

* Form submitted
* Lead appears
* CRM status changes
* Email triggers
* Chart grows
* Integration activates

Keep the animation:

* Understandable
* Short
* Loopable
* Secondary to the surrounding content

---

# 25. Looping Animation

Loops work well for:

* Service explanations
* Cards
* Small visual systems
* Background motion

A good loop should:

* Be seamless.
* Remain subtle.
* Avoid constant distraction.
* Explain something or support atmosphere.

---

# 26. Text Motion

Keep typography animation restrained.

Preferred:

* Fade
* Mask reveal
* Controlled vertical shift
* Line reveal
* Opacity transition
* Small translation

Avoid defaulting to:

* Letter-by-letter effects
* Large bouncing text
* Constant kinetic typography
* Random character animations

unless the concept specifically requires them.

---

# 27. Image Motion

Images can carry more expressive movement than typography.

Useful techniques:

* Crop
* Reveal
* Scale
* Mask
* Perspective
* Pointer movement
* Depth
* Cross-section transformation

Because Admonk is visually led, imagery is often the best place for stronger motion.

---

# 28. Cursor Interaction

Cursor interaction may include:

* Magnetic behavior
* Small parallax
* Labels
* Hover previews
* Image response
* Object attraction

Keep it subtle.

The pointer should never become difficult to use.

---

# 29. Magnetic Effects

Magnetic interactions should attract slightly.

Do not make controls move so far that they become harder to click.

The effect should feel responsive.

Not slippery.

---

# 30. Parallax

Use parallax for spatial depth.

Keep movement controlled.

Avoid constant aggressive parallax because it can:

* Harm readability
* Cause discomfort
* Distract
* Feel dated

---

# 31. Scrubbed Animation

Use scroll scrubbing when the user's scroll position should genuinely control progress.

Good for:

* Transformation
* Process
* Comparison
* Reveal
* Story progression

Do not use scrub where a normal timed animation would feel smoother.

---

# 32. User Ownership

The governing interaction rule is:

> **The user moves. The interface responds.**

Avoid:

> The user moves. The interface takes control.

---

# 33. Waiting

Do not make users wait for basic actions.

Especially:

* Menu
* Navigation
* Buttons
* Form interaction
* Content access

Longer timing is acceptable only for meaningful storytelling.

---

# 34. Easing

Motion should feel natural and controlled.

Prefer:

* Smooth acceleration
* Controlled deceleration
* Weight
* Precision

Avoid excessive:

* Bounce
* Overshoot
* Elastic movement
* Cartoon springs

unless the project's personality calls for them.

---

# 35. Stagger

Stagger can reinforce hierarchy.

Keep it short.

Do not force the visitor to wait while:

* Every card
* Every sentence
* Every word

enters one by one.

---

# 36. Motion Intensity

Use the least complex motion capable of achieving the objective.

```text
Need feedback?
→ Micro interaction.

Need connection?
→ Transition.

Need explanation?
→ Small motion graphic.

Need progression?
→ Scroll interaction.

Need immersion?
→ Advanced motion.
```

Do not start with the most complex option.

---

# 37. Mobile

Do not reproduce desktop hover behavior literally.

Replace where necessary with:

* Tap
* Scroll
* Automatic states
* Simplified transitions

Mobile should still feel intentionally animated.

---

# 38. Performance

Motion must not destroy performance.

Pay attention to:

* Frame rate
* DOM complexity
* Number of animated objects
* Large videos
* Filters
* Blur
* WebGL
* Mobile GPU load

Prefer efficient animation properties such as:

* Transform
* Opacity

when practical.

---

# 39. Accessibility

Respect reduced-motion preferences.

Provide simplified behavior where appropriate.

Critical meaning must never depend only on animation.

---

# 40. Technology Choice

Use the simplest technology that can produce the required effect.

### CSS

Use for:

* Basic hover
* Simple transitions
* Small loops

### Webflow Interactions

Use for:

* Straightforward page interaction
* Simple scroll triggers
* Native Webflow behavior

### GSAP

Use for:

* Advanced timelines
* ScrollTrigger
* Coordinated transformations
* Masks
* SVG
* Complex sequencing

### Motion

Use for:

* React interface animation
* Layout transitions
* Component-based interaction

### WebGL / Three.js

Use only when true spatial or rendering capability is required.

---

# 41. GSAP Implementation

When GSAP is used:

* Build clear timelines.
* Keep animation responsibilities organized.
* Avoid conflicting tweens.
* Handle responsive behavior.
* Clean up triggers when needed.
* Refresh ScrollTrigger after layout changes when appropriate.
* Test real scrolling, not just animation playback.

Use relevant external GSAP skills for technical implementation.

Admonk's motion principles decide **what should happen**.

GSAP skills decide **how to implement it correctly**.

---

# 42. Webflow

In Webflow, prefer native capabilities when they produce the intended result cleanly.

Use custom GSAP/JavaScript when:

* Native interaction becomes difficult to maintain.
* Complex sequencing is required.
* Scroll behavior needs precise control.
* Shared timelines are needed.

Do not add custom code just to make a basic hover.

---

# 43. Full-Code Preference

When providing implementation code, follow `AGENTS.md`.

Prefer:

* Complete replacement code
* Copy-paste ready implementation
* Short explanation of changes

Avoid making the user manually search through large code blocks for tiny changes.

---

# 44. Motion Review

Before approving motion, check:

## Purpose

* Why does this move?
* What does it communicate?

## Usability

* Does it remain intuitive?
* Does it slow navigation?
* Is scroll still natural?

## Quality

* Is it smooth?
* Is timing controlled?
* Does easing feel right?

## Story

* Does it connect ideas?
* Does it improve comprehension?

## Restraint

* Are too many things moving?
* Would stillness improve this moment?

## Performance

* Does it remain smooth on realistic devices?

## Mobile

* Does the interaction still make sense?

---

# 45. Challenge Complex Motion

If an animation idea:

* Requires excessive scrolling
* Creates confusion
* Adds waiting
* Competes with content
* Hurts performance
* Exists primarily to demonstrate technical ability

recommend simplifying it.

A technically impressive effect is not automatically a good interaction.

---

# 46. Final Standard

Admonk motion should feel:

> **Alive without becoming distracting.
> Playful without becoming confusing.
> Sophisticated without becoming complicated.
> Interactive without becoming demanding.
> Memorable without forcing users to browse unnaturally.**

The final rule is:

> **The user moves naturally. The interface responds beautifully.**
