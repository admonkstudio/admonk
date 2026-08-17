---
name: admonk-ux-systems
description: Review, design, or improve usability, accessibility, responsive behavior, interaction states, forms, navigation, design-system structure, and interface quality for Admonk web experiences. Use when the task is about how an interface works, adapts, communicates state, or supports users. This skill supports Admonk's creative direction; it does not define the visual style.
---

# Admonk UX Systems

Use this skill when a web experience needs stronger usability, accessibility, responsive behavior, interaction logic, or interface-system quality.

The goal is not to make every interface conventional.

The goal is to protect **clarity, accessibility, feedback, task completion, and technical quality** while allowing Admonk to remain creatively ambitious.

> **Experiment with presentation. Protect interaction logic.**

---

## 1. Authority and Context

This skill does not define the project's visual direction.

For visual and creative decisions, defer to:

- `docs/DESIGN-LANGUAGE.md`
- `.agents/skills/admonk-web-design/SKILL.md`

For motion, defer to:

- `docs/MOTION-LANGUAGE.md`
- `.agents/skills/admonk-motion/SKILL.md`

For imagery, defer to:

- `docs/IMAGE-DIRECTION.md`
- `.agents/skills/admonk-image-direction/SKILL.md`

Use this skill to answer:

> **Does the experience work properly for real users?**

---

## 2. UX Priority Order

When several issues compete, review them in this order:

1. Accessibility
2. Critical interaction and task completion
3. Navigation and orientation
4. Responsive layout
5. Forms, errors, loading, and feedback
6. Performance and perceived performance
7. Readability and information hierarchy
8. System consistency
9. Secondary polish

A visually impressive detail should not outrank a critical usability problem.

---

## 3. Start With the User Task

Before changing an interface, identify:

1. Who is using it?
2. What are they trying to accomplish?
3. What is the primary action?
4. What can prevent completion?
5. What information must be understood first?
6. What happens after the action?

Do not optimize components in isolation when the real problem is the flow.

---

## 4. Existing Project Audit

For an existing project, first inspect:

- Current structure and navigation
- Existing brand/design system
- Existing interaction patterns
- Responsive behavior
- Accessibility behavior
- Forms and feedback states
- Technology stack and dependencies

Prefer:

> **Preserve what works → diagnose what fails → improve deliberately.**

Do not replace established interaction patterns merely to make the interface feel different.

---

## 5. Accessibility Is a Baseline

For important interfaces, verify:

- Normal text contrast meets WCAG AA expectations, typically at least 4.5:1.
- Large text uses the appropriate WCAG threshold.
- Meaningful images have useful alternative text.
- Decorative imagery does not create unnecessary screen-reader noise.
- Icon-only controls have accessible names.
- Keyboard users can reach and operate interactive elements.
- Focus states are visible.
- Focus order follows the logical experience.
- Sticky headers, overlays, and banners do not obscure focused controls.
- Semantic headings follow a logical hierarchy.
- Information is not communicated by color alone.
- Forms have visible labels.
- Errors are associated with the relevant controls.
- Motion respects `prefers-reduced-motion`.
- Browser zoom is not disabled.

Accessibility should be built into the component behavior, not added as a final cosmetic pass.

---

## 6. Pointer and Touch Targets

For web interfaces:

- Meet applicable WCAG target-size requirements or valid exceptions.
- Prefer larger comfortable targets for touch-oriented controls when space allows.
- Do not make users tap tiny icons or thin edges precisely.
- Separate adjacent touch actions enough to reduce accidental activation.

For native/mobile work, follow platform-specific target guidance rather than reusing web measurements blindly.

Do not apply a single target-size number across every platform without context.

---

## 7. Never Depend on Hover Alone

Hover can provide discovery and delight on pointer devices.

It must not be the only way to:

- Access essential content
- Understand an action
- Reveal required controls
- Complete a task

Translate desktop hover behavior appropriately for touch devices using:

- Tap
- Persistent state
- Scroll response
- Explicit controls

---

## 8. Interaction States

Important interactive components should account for relevant states such as:

- Default
- Hover
- Focus
- Active / pressed
- Selected
- Disabled
- Loading
- Success
- Error
- Empty

Not every component needs every state.

But if a state can occur, design it deliberately.

Do not leave async buttons clickable indefinitely while a request is processing unless repeated submission is intentionally supported.

---

## 9. Feedback

Every important user action should produce understandable feedback.

Examples:

- Button responds immediately.
- Form indicates that submission is in progress.
- Successful action confirms completion.
- Error identifies what failed and what the user can do next.
- Changed state is visually clear.

Feedback should be proportional to the action.

Do not show heavy loading UI for near-instant operations.

Do not leave users wondering whether their action worked.

---

## 10. Forms

Forms should minimize effort.

Prefer:

- Visible labels
- Appropriate input types
- Clear helper text when needed
- Logical grouping
- Useful defaults
- Inline errors near the relevant field
- Preserving entered data after validation errors
- Clear submit feedback
- Keyboard-friendly order
- Autofill and password-manager compatibility where relevant

Avoid:

- Placeholder-only labels
- Validating aggressively on every keystroke when it disrupts typing
- Generic "Something is wrong" errors when the problem is known
- Clearing the entire form after one validation failure
- Asking for information the business does not need

Use progressive disclosure for advanced or optional inputs when it reduces cognitive load.

---

## 11. Error Handling

An error message should answer:

1. What happened?
2. Where did it happen?
3. What should the user do next?

Place field-specific errors with the field.

For forms with multiple errors, also consider a clear error summary when it improves recovery.

Do not rely only on red borders.

---

## 12. Navigation

Navigation should make three things clear:

- Where am I?
- Where can I go?
- How do I get back?

Critical navigation should remain predictable even when the surrounding presentation is experimental.

Protect:

- Clear destinations
- Current-page/state indication where useful
- Back behavior
- Deep links where appropriate
- Logical keyboard order
- Understandable mobile navigation

Avoid hiding essential navigation behind unexplained interaction.

---

## 13. Primary Actions

A screen or section should have a clear action hierarchy.

Where practical:

- One action is visually primary.
- Secondary actions are subordinate.
- Destructive actions are clearly differentiated.
- Multiple CTAs do not compete with equal emphasis without reason.

This does not require every section to contain a button.

---

## 14. Responsive Design

Responsive design is not desktop compression.

For every important composition, decide:

- What remains primary?
- What reflows?
- What changes order?
- What interaction changes?
- What becomes simplified?
- What needs a different asset or crop?

Test representative widths rather than relying only on framework breakpoints.

Pay particular attention to:

- Small mobile widths
- Tablet/intermediate widths
- Large desktop widths
- Landscape where relevant

---

## 15. Mobile Layout Rules

On mobile:

- Avoid accidental horizontal page scrolling.
- Keep readable body text without forcing browser zoom.
- Ensure fixed headers/footers do not cover content.
- Use dynamic viewport units such as `dvh` when they solve browser-chrome issues.
- Prioritize important content before secondary content.
- Allow chips, labels, and collections to wrap or disclose overflow rather than silently clipping important information.

Do not hide meaningful information solely to make the mobile composition cleaner.

---

## 16. Text and Readability

Typography style follows the creative direction.

UX review should still check:

- Comfortable body size
- Appropriate line height
- Reasonable line length
- Readable contrast
- Logical heading hierarchy
- Long URLs/IDs/user content wrapping safely
- Compact labels surviving narrow widths
- Data columns using stable numeric alignment where useful

Do not impose a specific font family from a generic recommendation database over the client's identity.

---

## 17. Color Systems

Use semantic meaning where useful:

- Surface
- Text
- Muted text
- Primary action
- Error
- Warning
- Success
- Focus
- Border/divider

The exact palette comes from the brand and design direction.

Avoid scattering unrelated raw color values across components when a token system would improve consistency.

Never communicate critical status through color alone.

---

## 18. Design Tokens

For systems with repeated components, define reusable tokens for relevant properties such as:

- Spacing
- Type roles
- Color roles
- Radius
- Borders
- Elevation
- Z-index layers
- Motion timing
- Component states

Tokens should create coherence.

They should not force every project into the same visual system.

---

## 19. Spacing

Use an intentional spacing rhythm rather than random values.

A 4px/8px-derived system is a useful technical foundation when appropriate, but optical judgment remains necessary.

Do not sacrifice composition simply to satisfy mathematical spacing.

The final visual result should feel balanced to the eye.

---

## 20. Z-Index and Layering

Use a defined layering strategy for projects with overlays or fixed UI.

Typical conceptual layers may include:

- Content
- Sticky/floating controls
- Navigation
- Overlay/scrim
- Modal/dialog
- Critical notification

Avoid arbitrary values such as `z-index: 99999` unless a specific integration forces them.

---

## 21. Motion and UX

Motion must remain:

- Understandable
- Responsive
- Interruptible where appropriate
- Non-blocking
- Accessible

Use motion to communicate:

- Cause and effect
- Hierarchy
- State change
- Spatial continuity
- Progress

Avoid using motion as a substitute for feedback or clear information architecture.

For detailed creative motion behavior, use `admonk-motion`.

---

## 22. Performance and Perceived Performance

UX quality includes speed.

Review:

- Image sizing and modern formats
- Reserved image/media dimensions to limit layout shift
- Font loading behavior
- Above-the-fold asset weight
- Third-party scripts
- Expensive scroll/pointer handlers
- Large lists
- Code splitting where appropriate
- Unnecessary animation workload

For longer waits, communicate progress appropriately.

For very short waits, avoid flashing unnecessary loading states.

---

## 23. Layout Stability

Avoid layout shifts caused by:

- Images without reserved dimensions
- Late-loading banners
- Font changes
- Async content with no reserved space
- Interaction states that change component dimensions unexpectedly

Hover, focus, and pressed states should generally not move surrounding layout.

---

## 24. Images and Media

UX review should verify:

- Correct dimensions/aspect-ratio handling
- Appropriate lazy loading below the fold
- Critical hero media prioritized appropriately
- Meaningful alternative text
- Responsive source selection when useful
- No unexpected layout shift

Creative selection and art direction remain governed by `admonk-image-direction`.

---

## 25. Data and Charts

When presenting data:

- Choose the chart based on the question the user needs answered.
- Label axes and units clearly when relevant.
- Provide legends/tooltips where they improve interpretation.
- Do not rely on color alone to distinguish critical series.
- Use accessible color combinations.
- Keep numeric formatting consistent.
- Avoid decorative charts that obscure the actual comparison.

The simplest visualization that communicates the insight is usually preferable.

---

## 26. Technology and Stack

Detect the existing stack before giving stack-specific implementation advice.

Check actual project files and dependencies.

Do not assume:

- React
- Next.js
- Tailwind
- shadcn/ui
- Motion
- Any particular component library

Use the project's existing technology unless there is a justified reason to change it.

Before adding a dependency, verify that it is not already present and that it is genuinely needed.

---

## 27. Component Libraries

A component library may provide strong accessibility and behavior foundations.

But default styling is not the creative direction.

When using a library:

1. Preserve its reliable interaction/accessibility behavior where possible.
2. Adapt visual treatment to the project.
3. Do not mix unrelated design systems casually.
4. Do not rebuild a robust primitive from scratch without a reason.

---

## 28. Experimental Interfaces

Admonk can deliberately create unusual interfaces.

When doing so, separate:

### Safe to experiment with

- Visual storytelling
- Composition
- Transitions
- Portfolio discovery
- Decorative interaction
- Secondary exploration

### Protect strongly

- Navigation
- Contact
- Forms
- Checkout
- Authentication
- Destructive actions
- Primary conversion paths

> **Novelty should create curiosity, not uncertainty about critical actions.**

---

## 29. UX Review Workflow

For a significant UX task:

### Step 1 — Understand

Identify user, goal, context, and primary action.

### Step 2 — Audit

Inspect the existing flow, states, responsive behavior, and accessibility.

### Step 3 — Diagnose

Prioritize actual problems instead of listing generic best practices.

### Step 4 — Design

Resolve information hierarchy and interaction behavior before decorative polish.

### Step 5 — Implement

Respect the existing stack and design language.

### Step 6 — Test

Check relevant states, widths, keyboard behavior, reduced motion, and error paths.

### Step 7 — Polish

Refine optical alignment, spacing, feedback, and perceived quality.

---

## 30. Pre-Delivery UX Check

Before completing important UI work, verify relevant items:

### Accessibility

- Keyboard path works.
- Focus remains visible and unobscured.
- Contrast is sufficient.
- Controls have accessible names.
- Meaningful images have useful alternatives.
- Color is not the only signal.
- Reduced motion is respected.

### Interaction

- Primary controls provide immediate feedback.
- Loading, error, success, disabled, and empty states exist where needed.
- Critical interactions do not depend on hover.
- Rapid state changes do not leave the interface in an incorrect visual state.

### Responsive

- Small screens do not overflow unexpectedly.
- Intermediate widths are not broken.
- Fixed UI does not hide content.
- Touch controls remain usable.

### Forms

- Labels remain visible.
- Errors are clear and recoverable.
- Submitted data is not lost unnecessarily.
- Submit state is obvious.

### Performance

- Media does not create major layout shift.
- Animations remain smooth.
- Heavy assets and scripts are justified.

### Creative Integrity

- UX fixes did not flatten the project's visual concept unnecessarily.
- Generic component patterns were not introduced simply because they are familiar.
- The interface still represents the client's brand and the intended experience.

---

## 31. Final Principle

Admonk should not choose between creativity and usability.

The standard is:

> **Creative enough to be memorable.  
> Clear enough to understand.  
> Accessible enough to include.  
> Responsive enough to work anywhere.  
> Reliable enough to trust.**
