---

name: admonk-web-design
description: Design, critique, improve, or implement websites and web interfaces for Admonk projects. Use for layout, visual direction, UI/UX, responsive design, creative direction, landing pages, portfolio pages, Webflow, React frontends, or when evaluating whether a design feels distinctive, premium, and appropriate to the client's business.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Admonk Web Design

Use this skill whenever designing, critiquing, improving, or implementing a web experience.

The goal is not merely to create a clean interface.

The goal is to create a **distinctive web experience that represents the client's business properly and feels exceptionally polished.**

---

## 1. Load Context Selectively

Before significant design work, read the relevant repository documents.

Always read when the task involves a major design decision:

* `docs/DESIGN-LANGUAGE.md`

Read when business positioning or project purpose matters:

* `docs/ADMONK-BUSINESS.md`

Read when animation or interaction is involved:

* `docs/MOTION-LANGUAGE.md`

Read when photography, AI imagery, mockups, 3D, or visual assets are involved:

* `docs/IMAGE-DIRECTION.md`

Read when creating or changing client-facing copy:

* `docs/BRAND-VOICE.md`

Do not load every document unnecessarily for small implementation changes.

---

# 2. Start With the Business

Never start by choosing a trendy visual style.

Determine:

1. What is the business trying to achieve?
2. What should the visitor understand?
3. What should the visitor feel?
4. What action should the visitor eventually take?
5. What does the existing brand already communicate?

Use this sequence:

```text
Business objective / message
        ↓
Brand identity
        ↓
Content structure
        ↓
Visual concept
        ↓
Design system
        ↓
Interaction
```

---

# 3. Require a Visual Concept

Every important page should contain a visual idea.

Ask:

> **If the copy disappeared, would there still be a design?**

If the answer is no, continue exploring.

A visual concept may come from:

* Photography
* Art direction
* Interface presentation
* Mockups
* 3D
* Materials
* Composition
* Graphic systems
* Interaction
* Motion
* Visual metaphor

Do not mistake organization for art direction.

---

# 4. Structure Creates Confidence. Art Creates Desire.

Use disciplined:

* Grids
* Alignment
* Spacing
* Hierarchy
* Responsive behavior

as the invisible foundation.

Then create distinction through:

* Art direction
* Composition
* Imagery
* Interaction
* Material
* Color
* Motion

The structure should support the artwork rather than become the artwork.

---

# 5. Default Visual Character

Unless the client's brand requires otherwise, lean toward:

* Minimal
* Elegant
* Quiet
* Sophisticated
* Premium
* Contemporary
* Selectively futuristic
* Highly polished

Prefer:

* Strong grids
* Controlled asymmetry
* Generous negative space
* Clean Swiss-influenced typography
* Slight corner radius
* Neutral foundations
* Controlled accent color

These are preferences, not a fixed client-facing Admonk style.

---

# 6. Do Not Make Every Client Look Like Admonk

Admonk's signature is:

* Quality
* Thinking
* Art direction
* Polish
* Interaction
* Execution

not a repeated visual aesthetic.

A hotel, fintech company, healthcare business, industrial company, and fashion brand should be allowed to look completely different.

Follow the client's identity.

Do not impose a universal Admonk palette or component style.

---

# 7. Visuals Before Typography

Admonk is visually led rather than typography led.

Typography should support the composition.

Do not rely on huge headlines as the primary visual device unless the concept genuinely calls for them.

Prefer creating interest through:

* Imagery
* Composition
* Object relationships
* Depth
* Interaction
* Art direction

Typography must remain excellent, but it does not need to dominate.

---

# 8. Avoid Generic AI Design

Do not default to:

* Giant headline + paragraph + CTA
* Three-card sections repeated throughout the page
* Rounded SaaS cards everywhere
* Random gradient blobs
* Gratuitous glassmorphism
* Floating decorative objects
* Generic futuristic grids
* Excessive pill UI
* Icon-heavy service layouts
* Huge text used as decoration
* Identical section structures

These techniques are not banned.

They require a reason.

---

# 9. Cards Are an Element, Not a System

Cards are useful for:

* Grouping
* Comparison
* Interaction
* Repeated content

Do not put every piece of information inside a card.

Before creating a card, ask:

> Does this information actually require containment?

If not, use composition and spacing instead.

---

# 10. Avoid Repetition

Never allow the page to become:

```text
Headline
Paragraph
Cards

Headline
Paragraph
Cards

Headline
Paragraph
Cards
```

Create rhythm instead.

Alternate between:

* Spacious and concentrated
* Visual and informational
* Static and interactive
* Dark and light
* Large and small
* Structured and asymmetric

Consistency should come from the design system.

Not identical layouts.

---

# 11. Design One Continuous Experience

Whenever appropriate, make the page feel like one connected journey rather than isolated stacked sections.

Look for opportunities to continue:

* Objects
* Lines
* Images
* Color
* Shapes
* Crops
* Movement
* Visual motifs

between sections.

Do not force transitions where simple separation is stronger.

---

# 12. Imagery Is Important

Prefer strong art-directed imagery over excessive explanatory graphics when the work can be shown visually.

Useful directions include:

* Cinematic photography
* Editorial photography
* Realistic AI imagery
* Product/device mockups
* Environmental mockups
* Human interaction
* 3D compositions
* Interface presentation

Use imagery to help the client imagine:

> **This is how my business could feel.**

---

# 13. Mockups Should Feel Art-Directed

Do not simply place a screenshot inside a standard device mockup.

Consider:

* Camera
* Perspective
* Lighting
* Human interaction
* Environment
* Scale
* Crop
* Materials
* Brand accent

Vary presentation methods across the page or case study.

Avoid endless phone mockups.

---

# 14. Visual Techniques Follow the Objective

Do not reject or select techniques simply because they are fashionable.

3D, gradients, glass, grain, CGI, chrome, texture, blur, glow, and illustration are all valid when the concept requires them.

Ask:

> **Why does this visual technique belong here?**

If there is no meaningful answer, remove it.

---

# 15. Interaction Philosophy

When interaction is involved:

> **Experiment with presentation, not basic behavior.**

Users should understand how to:

* Scroll
* Click
* Navigate
* Open menus
* Submit forms

without instruction.

Create surprise through how the interface responds.

For detailed motion rules, read:

`docs/MOTION-LANGUAGE.md`

---

# 16. Protect Critical Actions

Creative experimentation is welcome around:

* Storytelling
* Portfolio discovery
* Visual transitions
* Hover behavior
* Section reveals

Remain clear around:

* Navigation
* CTAs
* Forms
* Contact
* Checkout
* Critical conversion actions

Do not make business actions puzzles.

---

# 17. Responsive Design Is Part of the Concept

Do not build desktop first and simply compress it.

For each major visual idea, determine:

* What remains essential on mobile?
* What needs a new crop?
* What interaction changes?
* What simplifies?
* Does the visual idea survive?

Mobile should still feel intentionally designed.

---

# 18. Implementation Should Preserve the Design

When translating a design into code or Webflow:

Do not simplify important visual relationships simply because the implementation is easier.

Preserve:

* Spacing
* Scale
* Cropping
* Alignment
* Hierarchy
* Responsive intent
* Interaction

If implementation constraints require changing the design, explain the tradeoff before changing the concept.

---

# 19. Use the Simplest Appropriate Technology

Choose implementation based on the result required.

Examples:

### Simple hover

Use CSS when sufficient.

### Webflow-native interaction

Use Webflow interactions when appropriate.

### Advanced timeline or scroll behavior

Use GSAP.

### Complex React application

Use the relevant React tooling.

Do not introduce technical complexity merely because it is available.

---

# 20. Design Review

Before considering a major design finished, evaluate:

## Business

* Does it represent the business?
* Is the message clear?
* Does it support the intended action?

## Identity

* Does it feel specific to this brand?
* Could another company use the same design unchanged?

## Art

* Is there a visual concept?
* Does the page still feel designed without the copy?
* Is there something memorable?

## Composition

* Is hierarchy clear?
* Is negative space intentional?
* Is asymmetry controlled?
* Does the grid support rather than dominate?

## Repetition

* Are several sections using the same composition?
* Are cards being overused?
* Is there visual rhythm?

## Experience

* Does the page feel connected?
* Are important interactions intuitive?
* Does mobile retain the concept?

## Quality

* Does it feel smooth?
* Does it feel polished?
* Does it feel expensive?

---

# 21. Challenge Weak Design Decisions

Do not automatically accept a proposed design direction.

If the user proposes something that:

* Creates repetition
* Weakens hierarchy
* Conflicts with the client's identity
* Adds complexity without benefit
* Looks generic
* Damages usability
* Weakens performance

state the concern clearly and propose a stronger alternative.

Likewise, if challenged, reassess the recommendation rather than immediately agreeing.

The objective is:

> **Best design > agreement.**

---

# 22. When Generating Concepts

Do not immediately produce one final answer.

For major creative decisions, think through at least a few distinct directions internally.

Compare:

* Strategic fit
* Originality
* Visual strength
* Feasibility
* Usability

Then recommend the strongest approach.

Do not present multiple directions merely to appear comprehensive if one is clearly superior.

---

# 23. Final Standard

Do not settle for:

> Clean.

> Modern.

> Professional.

Those are minimum requirements.

Aim for:

> **Structured enough to trust.
> Artistic enough to desire.
> Distinctive enough to remember.
> Smooth enough to feel effortless.
> Purposeful enough to support the business.**
