---
name: admonk-browser-qa
description: Verify an implemented Admonk website or web app in a real browser. Use after significant frontend changes, before delivery, when reviewing responsive behavior, interaction, motion, forms, console/network errors, or when the user asks to test, inspect, review, QA, or visually verify a live/local/preview page.
---

# Admonk Browser QA

Use this skill when the implemented experience must be **verified in the browser rather than inferred from code**.

The goal is:

> **Build → open the real experience → test it → collect evidence → fix → verify again.**

For browser commands, use:

- `.agents/skills/playwright-cli/SKILL.md`

For UX judgment, use:

- `.agents/skills/admonk-ux-systems/SKILL.md`

For visual quality, use:

- `.agents/skills/admonk-design-quality/SKILL.md`

For motion, use:

- `.agents/skills/admonk-motion/SKILL.md`

---

## 1. When Browser QA Is Required

Run browser QA when practical after:

- A major page or section implementation.
- Navigation/menu changes.
- Responsive layout changes.
- GSAP, Motion, scroll, sticky, or hover work.
- Form or conversion-flow changes.
- Significant refactoring that may affect rendering.
- Fixing a browser-specific defect.
- Preparing an important client-facing page for review or delivery.

Do not claim a complex frontend change is complete solely because the code compiles.

---

## 2. Start With Expected Behavior

Before testing, identify:

1. What page/URL should be tested?
2. What changed?
3. What should the user be able to do?
4. Which visual or interaction behavior matters most?
5. Which viewports or devices matter?
6. Which failure modes are plausible?

Test the change itself first, then nearby functionality that could reasonably have regressed.

---

## 3. QA Priority

Review significant issues in this order:

1. Page fails to load / blocking runtime error.
2. Broken critical user flow.
3. Navigation/forms/primary interaction failures.
4. Console or failed network errors affecting behavior.
5. Responsive overflow or inaccessible content.
6. Accessibility/task-completion issues.
7. Motion/scroll problems.
8. Visual composition and polish problems.
9. Minor cosmetic inconsistencies.

Do not spend time polishing a 2px alignment issue while the form submission is broken.

---

## 4. Initial Browser Pass

Open the actual local, preview, staging, or live page.

Then:

1. Capture a snapshot.
2. Capture a visual screenshot for important pages.
3. Check the console.
4. Check obvious failed requests if the page behaves incorrectly.
5. Confirm the expected main content is present.

Do not infer visual correctness from DOM structure alone.

---

## 5. Functional Flow Testing

Test the important path as a real user would.

Examples:

- Open menu → choose destination → verify navigation.
- Fill form → validate errors → submit → verify success/failure response.
- Open modal → interact → close with expected controls.
- Change tabs/filter → verify content/state changes.
- Open portfolio item → navigate through project → return.

For each path, verify both:

- The action works.
- The interface communicates what happened.

---

## 6. Responsive QA

Test a representative range rather than only desktop and one phone.

A practical starting set is:

```text
Large desktop    ~1440px
Laptop           ~1024px
Tablet           ~768px
Mobile           ~390px
```

Adapt this to the actual project.

At each meaningful viewport inspect:

- Horizontal overflow.
- Text wrapping.
- Cropping.
- Navigation behavior.
- Fixed/sticky elements.
- Section height.
- Tap targets.
- Content order.
- Image focal point.
- Interaction fallback for hover-only behavior.
- Whether the visual idea survives responsively.

Do not treat breakpoints as successful merely because nothing technically overflows.

---

## 7. Admonk Visual QA

Inspect the rendered result for:

- Intentional hierarchy.
- Optical alignment.
- Balanced negative space.
- Correct subject/image crop.
- Repetition between sections.
- Unintended card/grid sameness.
- Broken visual continuity.
- Typography that dominates without reason.
- Generic component styling leaking into the design.
- Accidental browser/default styles.
- Inconsistent radius/border/shadow behavior.
- Poor contrast caused by real imagery or backgrounds.
- Layout that feels organized but has lost the visual concept.

Ask:

> **If the copy disappeared, is the intended visual idea still visible in the implemented page?**

Browser QA should protect the design concept, not flatten it into conventional UI.

---

## 8. Motion and Interaction QA

For pages with motion, actively test:

- Hover in and out repeatedly.
- Fast scroll and slow scroll.
- Scroll reversal.
- Menu open/close repeatedly.
- Resize after animation initialization.
- Re-enter scroll-triggered sections where relevant.
- Rapid clicking/tapping where state could conflict.

Watch for:

- Scroll fighting the user.
- Long unnecessary pinned distances.
- Elements stuck mid-animation.
- Flashing initial states.
- Jumps when ScrollTrigger refreshes.
- Hover animations that do not return cleanly.
- Competing GSAP/Motion/CSS transforms.
- Layout shift caused by animation.
- Delayed basic controls.
- Jank or obvious frame drops.

The test is not only whether the animation runs.

The test is whether it **feels natural while the user is actually using the page**.

---

## 9. Forms and Conversion Paths

For important forms test relevant cases:

- Empty submission.
- Invalid input.
- Valid submission.
- Loading state.
- Success state.
- Error state where reproducible.
- Duplicate submission prevention where relevant.
- Keyboard navigation.
- Mobile viewport.

Do not perform a real external submission that creates a lead/order/account/message unless the user requested it or a safe test environment is being used.

---

## 10. Console and Network

Check console output after loading and after reproducing important interactions.

Prioritize:

- Uncaught exceptions.
- Failed module/script loads.
- Repeated runtime warnings tied to broken behavior.
- GSAP/ScrollTrigger/plugin errors.
- React hydration/render errors.
- Failed API requests.
- CORS/auth failures.
- Missing media/assets.

Do not report harmless third-party noise as a critical defect without understanding its impact.

---

## 11. Accessibility Browser Pass

Browser QA is not a complete accessibility audit, but verify obvious high-impact issues:

- Keyboard can reach critical controls.
- Focus is visible.
- Menu/modal focus behavior is usable.
- Essential controls have understandable names.
- Important interaction does not depend only on hover.
- Form errors are understandable.
- Content remains usable when motion is reduced where relevant.

Use `admonk-ux-systems` for deeper accessibility reasoning.

---

## 12. Visual Evidence

Use screenshots when reporting visual defects.

Use tracing/video when diagnosing complex flows or motion.

For every meaningful defect, record:

```text
Severity:
Page / URL:
Viewport / device:
Trigger / steps:
Observed:
Expected:
Evidence:
Likely source (only if supported):
```

Do not describe a theory as if it were confirmed evidence.

---

## 13. Severity

Use a simple severity model:

### Blocker

The page or primary flow cannot be used.

### High

Critical functionality, navigation, conversion, or accessibility is substantially broken.

### Medium

The experience works but contains a meaningful responsive, interaction, visual, or reliability defect.

### Low

Minor polish issue with limited user impact.

Prioritize fixes accordingly.

---

## 14. Fix Loop

For a defect:

```text
Reproduce
   ↓
Collect evidence
   ↓
Identify likely cause
   ↓
Implement smallest reliable fix
   ↓
Reload/restart if needed
   ↓
Reproduce original steps
   ↓
Test adjacent regression risk
   ↓
Confirm resolved
```

Never mark an issue fixed only because the code change looks correct.

---

## 15. UI Review With the User

When the user wants to explain a visual problem interactively, use Playwright CLI's annotation dashboard when available:

```bash
playwright-cli show --annotate
```

This is especially valuable when phrases such as these are ambiguous:

- "This part feels wrong."
- "Move this section."
- "The spacing here is off."
- "This animation is not what I mean."

Prefer visual annotation over guessing.

---

## 16. Completion Gate

Before calling an important frontend task complete, verify relevant items:

### Function

- Primary flow works.
- Navigation works.
- Forms/states work where relevant.

### Runtime

- No meaningful uncaught console errors.
- No meaningful failed requests tied to the feature.

### Responsive

- Representative widths are usable.
- No unexpected overflow/clipping.
- Mobile retains the intended hierarchy and concept.

### Motion

- Interactions return cleanly.
- Scroll remains natural.
- No obvious animation conflicts/jank.

### Visual

- Layout matches the intended design direction.
- Images crop correctly.
- No accidental generic/default component styling.
- Spacing and hierarchy feel intentional.

### Accessibility

- Critical controls are keyboard reachable.
- Focus and feedback remain understandable.

### Verification

- Any fixed defect was reproduced again after the change.

---

## 17. Final Principle

The browser is where design, code, motion, content, assets, APIs, and user behavior finally meet.

Therefore:

> **Do not approve the implementation you intended. Approve the experience that actually rendered.**
