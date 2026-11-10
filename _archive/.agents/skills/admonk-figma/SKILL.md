---
name: admonk-figma
description: Use Figma as a design, prototyping, design-system, handoff, and design-to-code environment for Admonk and client projects. Use when creating or editing Figma designs, translating brand systems into frames/components/variables, reviewing layouts, prototyping motion, extracting design context, mapping components with Code Connect, or comparing Figma against Webflow/code implementations.
---

# Admonk Figma

Figma is a **design environment**, not the source of Admonk's creative philosophy.

Use Admonk design, image, motion, UX, and client-brand context to decide what should be created.

Use Figma to make that thinking visible, editable, testable, and transferable.

---

# 1. Context First

Before creating significant design work, load the relevant:

- Client/project brief
- Brand guidelines
- Approved content
- Admonk design language
- Image direction
- Motion language
- UX requirements

Do not start by generating a generic component library before understanding the project.

---

# 2. Figma's Roles in the Workflow

Figma can serve several different roles.

## Exploration

Use for:

- Composition directions
- Layout experiments
- Art-direction options
- Component ideas
- Responsive studies

## Design System

Use for:

- Variables/tokens
- Type styles
- Color styles
- Components
- Variants
- Reusable patterns

## Production Design

Use for:

- High-fidelity screens
- Responsive layouts
- Detailed states
- Handoff-ready frames

## Motion Prototype

Use for:

- Interaction concepts
- State transitions
- Navigation transitions
- Motion intent

## Design-to-Code Bridge

Use for:

- Structured design context
- Component metadata
- Code Connect mappings
- Comparing implemented components with the design

---

# 3. Avoid Premature Systemization

Do not spend the beginning of a creative project building every possible component/token.

Recommended order:

```text
Brief
→ visual concept
→ key composition
→ validate direction
→ establish reusable system
→ expand screens/states
```

Systemization should stabilize a strong design rather than replace creative thinking.

---

# 4. Variables and Components

Create variables/components when repetition or handoff benefits from them.

Examples:

- Color roles
- Type scales
- Spacing tokens when useful
- Radius
- Grid/container values
- Buttons
- Form controls
- Navigation primitives
- Repeated content modules

Do not componentize every decorative object merely because Figma allows it.

---

# 5. Auto Layout

Use Auto Layout where it improves:

- Responsive behavior
- Content resilience
- Component reuse
- Spacing consistency
- Developer handoff

Do not let Auto Layout force a generic stacked composition.

Use absolute/overlapping/art-directed composition where the concept requires it, while keeping responsive intent understandable.

---

# 6. Responsive Design

Create intentional responsive behavior, not only desktop frames.

For major pages/components, determine:

- What reflows?
- What scales?
- What crops?
- What changes order?
- What disappears?
- What interaction changes on touch?
- Does the artwork require a different mobile composition?

Mobile should preserve the design idea where possible rather than merely compressing it.

---

# 7. Image Integration

Use `admonk-image-direction` and `admonk-image-production` for major imagery.

In Figma:

- Test real crops at target sizes.
- Validate text-safe space.
- Avoid designing around a temporary image that cannot support production.
- Keep accurate logos/UI as real design assets rather than regenerated approximations.

---

# 8. Motion Prototyping

Use Figma motion to communicate intent before production when useful.

Capture:

- Start/end states
- Trigger
- Direction
- Timing
- Easing character
- Shared objects
- Persisting elements

When the Figma integration exposes motion context, retrieve it after design context to help translate keyframes/easing into production code.

Do not assume Figma's prototype implementation is the final web implementation.

---

# 9. Design Context

When implementing from an existing Figma design, prefer structured design context over manually guessing measurements from screenshots.

When available, use official Figma design-context tools to retrieve:

- Reference screenshot
- Layout/context metadata
- Suggested/reference code
- Assets
- Component information

Then adapt the result to the actual target project's components, tokens, platform, and conventions.

Do not paste generated reference code blindly.

---

# 10. Code Connect

Use Code Connect when the project has a meaningful reusable component relationship between Figma and code.

Workflow:

1. Inspect the Figma component.
2. Inspect the actual code component.
3. Review suggested mappings where available.
4. Confirm the mapping is semantically correct.
5. Save mappings.

Do not create mappings only for appearances if the code component's behavior/props do not match the Figma component.

---

# 11. Figma ↔ Webflow / Astro Benchmarking

When comparing environments, keep the design brief and target outcome constant.

Measure Figma on:

- Creative exploration
- Art-direction freedom
- Responsive intent
- Component/system quality
- Motion prototyping
- Client collaboration
- Handoff fidelity
- AI autonomy
- Speed to first strong concept

Do not judge Figma on production runtime performance; it is not the deployed website.

---

# 12. Review

Before declaring a Figma design ready:

- Does the visual concept survive without copy?
- Does it reflect the client brand rather than a generic template?
- Are responsive states intentional?
- Are critical interaction states shown?
- Are real assets used where accuracy matters?
- Are components/tokens helping rather than constraining?
- Can the implementation team understand motion and behavior?
- Is the design sufficiently complete to build without guessing major decisions?

---

# Final Rule

> **Figma should make the design easier to understand and build without making the design easier to predict.**
