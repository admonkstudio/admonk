---
name: admonk-design-quality
description: Quality-control skill for Admonk web design and frontend work. Use when auditing, redesigning, reviewing, polishing, or preparing a website for delivery. Detects generic AI patterns, incomplete states, weak responsive behavior, placeholder content, repetitive layouts, implementation shortcuts, and production-readiness problems without imposing a fixed aesthetic.
---

# Admonk Design Quality

Use this skill as a **quality-control layer**, not as a visual style generator.

It supplements:

- `admonk-web-design`
- `admonk-motion`
- `admonk-image-direction`
- `docs/DESIGN-LANGUAGE.md`
- `docs/MOTION-LANGUAGE.md`
- `docs/IMAGE-DIRECTION.md`

If any rule here conflicts with Admonk's project-specific design direction, brand identity, or `AGENTS.md`, the Admonk/project rule wins.

The objective is:

> **Remove generic decisions, incomplete thinking, and implementation shortcuts before they reach the client.**

---

## 1. Read the Brief Before Designing

Before making a substantial design decision, identify internally:

1. Page type and purpose.
2. Primary audience.
3. Business objective.
4. Existing brand assets and constraints.
5. Desired emotional character.
6. Reference material supplied by the client.
7. Conversion or critical action.
8. Technical constraints.

Do not automatically announce this analysis to the user unless it helps the task.

Do not begin from a preset aesthetic.

---

## 2. Anti-Default Discipline

Actively check whether a decision exists because it fits the project or because it is a familiar AI/frontend default.

Common defaults to challenge include:

- Centered hero with headline, paragraph, two buttons.
- Three equal feature cards.
- Repeated card grids section after section.
- Random purple/blue gradients for technology.
- Glassmorphism without conceptual reason.
- Oversized typography used as the only visual idea.
- Identical fade-up reveals everywhere.
- Decorative floating shapes with no message.
- Fake dashboard/interface screenshots made from meaningless rectangles.
- Pills, badges, labels, and metadata added simply to make a layout look detailed.
- Generic icon metaphors used instead of a more specific visual idea.

These are not prohibited techniques.

Use them when they are the strongest solution for the specific project.

---

## 3. Redesign Protocol

For an existing website, use:

```text
SCAN
  ↓
DIAGNOSE
  ↓
PRIORITIZE
  ↓
FIX
  ↓
VERIFY
```

### Scan

Before changing the design, inspect:

- Existing technology stack.
- CSS/styling method.
- Component structure.
- Current typography.
- Brand colors.
- Image assets.
- Navigation and information architecture.
- Existing interactions.
- Functional behavior that must not break.

### Diagnose

Identify:

- What is actually weak.
- What already works.
- What feels generic.
- What is inconsistent.
- What is unfinished.
- What harms usability.
- What harms performance.
- What contradicts the brand.

### Prioritize

Fix high-impact issues first.

Typical priority:

1. Business/message clarity.
2. Art direction and visual concept.
3. Composition and hierarchy.
4. Typography and spacing.
5. Interaction and states.
6. Responsive behavior.
7. Technical polish.

Do not replace strong existing work simply to make the redesign feel more extensive.

---

## 4. Preserve Before Replacing

For redesigns, distinguish between:

### Preserve

Existing elements that accurately represent the brand and work well.

### Improve

Elements with the right idea but weak execution.

### Replace

Elements that conflict with the objective, identity, usability, or quality standard.

Do not assume a redesign requires a complete visual reset.

---

## 5. Repetition Audit

Before delivery, scan the page vertically.

Look for repeated patterns such as:

```text
headline + copy + 3 cards
headline + copy + 3 cards
headline + copy + 3 cards
```

or:

```text
image left + text right
text left + image right
image left + text right
```

If repetition becomes predictable, change the composition while preserving system consistency.

Consistency should come from:

- Grid.
- Typography.
- Spacing.
- Color.
- Art direction.
- Motion principles.

Not from repeating one section template.

---

## 6. Visual Asset Discipline

A visual asset must have a purpose.

When imagery would strengthen the page, prefer:

1. Real client/project assets.
2. Purpose-built art-directed photography or generated imagery.
3. Accurate project screenshots or live interface previews.
4. Clearly identified temporary placeholders during development.

Do not build fake product screenshots out of arbitrary rectangles simply to fill an empty hero.

Do not force imagery into every page or section.

Follow `docs/IMAGE-DIRECTION.md` for actual art direction.

---

## 7. No Fake Proof

Never invent credibility.

Do not fabricate:

- Performance metrics.
- Conversion percentages.
- Customer counts.
- Awards.
- Testimonials.
- Client logos.
- Engineering specifications.
- Case-study results.

If mock data is required for a prototype, identify it as mock/sample data in the implementation or working context.

Client-facing production material must use verified information.

---

## 8. Copy Self-Audit

Before delivery, re-read visible copy.

Check for:

- Generic marketing filler.
- Repeated ideas.
- Broken grammar.
- Unclear pronouns/referents.
- Forced metaphors.
- AI-sounding poetic filler.
- Unsubstantiated claims.
- Buttons whose labels do not describe the action.

Follow `docs/BRAND-VOICE.md` for Admonk-facing copy.

When uncertain, prefer specific and understandable language over clever filler.

---

## 9. Responsive Behavior Must Be Deliberate

Do not assume the desktop layout will naturally collapse well.

For every major section, explicitly consider:

- Column collapse.
- Image crop.
- Type scale.
- Horizontal overflow.
- Touch targets.
- Hover replacement.
- Motion simplification.
- Content order.
- Fixed/sticky elements.
- Mobile viewport behavior.

Use dynamic viewport units (`dvh`, `svh`) where they solve mobile viewport issues.

Do not use desktop interactions as the mobile fallback without reviewing them.

---

## 10. Interaction State Completeness

Important interactive components should account for relevant states.

Depending on the component, check:

- Default.
- Hover.
- Focus-visible.
- Active/pressed.
- Disabled.
- Loading.
- Success.
- Error.
- Empty.

Not every component needs every state.

But a production interface should not fail simply because the happy path ended.

---

## 11. Accessibility Is Part of Finish Quality

Check relevant fundamentals:

- Semantic HTML.
- Meaningful heading structure.
- Keyboard navigation.
- Visible focus states.
- Appropriate alt text.
- Form labels.
- Sufficient contrast.
- Reduced-motion handling.
- Touch target size.
- Skip navigation where relevant.

Do not treat accessibility as visual damage to be removed.

Integrate it into the design.

---

## 12. Dependency Verification

Before adding a package or library:

1. Inspect the project's dependency file.
2. Confirm the installed version where behavior may differ.
3. Use the existing stack when it can achieve the result cleanly.
4. Add a dependency only when it provides meaningful value.

Do not hallucinate imports.

Do not migrate frameworks just to solve a design-polish task.

---

## 13. Implementation Quality

Prefer:

- Semantic elements over unnecessary `div` nesting.
- Reusable tokens over random values.
- Predictable z-index layers over arbitrary `9999` values.
- Responsive units where appropriate.
- CSS Grid for true grid relationships.
- Transform/opacity animation when it can replace layout-heavy animation.
- Clean production code without debug artifacts.

Do not sacrifice an important creative idea purely because the fastest implementation is easier.

Instead identify the tradeoff and find the simplest implementation that preserves the concept.

---

## 14. Optical Quality Beats Mechanical Correctness

Mathematical alignment is not always visual alignment.

Check:

- Icon/text centering.
- Button label positioning.
- Baselines.
- Image focal points.
- Uneven whitespace caused by letter shapes.
- Perceived centering of asymmetric objects.

Small optical corrections are valid when they improve perceived balance.

---

## 15. Avoid Decoration Without Information or Emotion

Before keeping a decorative element, ask whether it contributes at least one of:

- Identity.
- Hierarchy.
- Story.
- Emotion.
- Depth.
- Interaction feedback.
- Composition.

If it contributes none of these, remove it.

---

## 16. Motion Quality Check

For motion-specific decisions, use `admonk-motion`.

During final QA, additionally check:

- Does animation interrupt normal browsing?
- Does anything make the user wait unnecessarily?
- Are several animations competing at once?
- Does scrolling remain understandable?
- Are transforms smooth on realistic hardware?
- Is reduced motion handled?
- Are unused ScrollTriggers/listeners cleaned up?

Motion is not proof of design quality by itself.

---

## 17. Completion Discipline

If the task requests implementation, do not present a skeleton as completed work.

Do not replace requested code with:

- `// ...`
- `// add the rest here`
- `// similar logic`
- `TODO` placeholders
- omitted middle sections

unless the user explicitly requested a partial example.

Follow the full-code preference in `AGENTS.md`.

---

## 18. Pre-Flight Review

Before calling a major design or implementation finished, perform this check.

### Strategy

- Is the business objective visible in the experience?
- Does the page represent this specific brand?

### Visual Concept

- Is there a visual idea beyond organization?
- Is any major section obviously generic?

### Composition

- Is hierarchy clear?
- Is spacing intentional?
- Is repetition controlled?

### Content

- Is copy specific and credible?
- Are all claims supported?

### Interaction

- Are important controls recognizable?
- Are required states present?

### Responsive

- Has each major composition been reviewed on mobile?

### Accessibility

- Are keyboard, focus, contrast, alt text, and reduced motion handled where relevant?

### Technical

- Are dependencies valid?
- Is the code complete?
- Are debug artifacts removed?
- Is performance acceptable?

### Final Question

> **Does this feel intentionally designed, or merely assembled correctly?**

If it feels assembled, continue.

---

## 19. What This Skill Does Not Do

This skill does **not** impose:

- A fixed font family.
- A fixed accent color.
- A fixed maximum number of cards.
- A fixed light/dark theme rule.
- A mandatory image count.
- A mandatory animation intensity.
- A mandatory framework.
- A mandatory component library.
- Absolute bans on legitimate visual techniques.

Those decisions belong to the project's objective, identity, and Admonk's design language.

---

## 20. Final Principle

> **First make the idea specific. Then make the execution complete. Then remove everything that feels accidental, generic, fake, or unfinished.**
