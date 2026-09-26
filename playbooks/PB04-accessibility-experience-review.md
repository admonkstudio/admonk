# PB04 — Accessibility & Experience Review

**Trigger:** New Production web product; new/material critical journey; major UI/navigation change; Stable shared component; Production accessibility issue.
**Outcome:** Critical journey meets WCAG 2.2 AA, essential manual checks and experience quality; deeper review occurs when impact warrants it.

## Flow
1. Identify critical journey + normal/loading/empty/error/success states.
2. Run automated accessibility checks (axe-core via Playwright; Storybook addon-a11y when Storybook exists).
3. Manual essentials: keyboard completion, focus, labels/names, error recovery, zoom/text resize, non-color-only meaning, media alternatives, dynamic-state understanding.
4. Add assistive-technology/user testing for high-impact/public/accessibility-sensitive/major-change/known-issue cases.
5. Review actual experience: hierarchy, next action, states, friction, feedback, responsiveness, critical performance.
6. Review designated premium moments under S023.
7. Fix WCAG AA failures before Production unless an explicit S030 exception is approved.

## Required record
**Journey → Automated result → Manual checks → Assistive-tech evidence if triggered → Experience findings → Premium findings if applicable → Fixes → Decision**

**Implements:** S006, S007, S014, S023; supported by S011, S002, S030.
