---
name: admonk-project-lifecycle
description: Run, continue, audit, gate, or recover an Admonk or client web-experience project from intake through discovery, brand/design-system alignment, strategy, content, creative direction, responsive design, build, integrations, QA, PageSpeed/Core Web Vitals, launch, handoff, and learning. Use whenever starting a new project, continuing a project, asking what is missing, assessing readiness to design/build/launch, planning delivery, or applying the Admonk process to an existing site.
---

# Admonk Project Lifecycle

Use `docs/PROJECT-LIFECYCLE.md` as the detailed source of truth.

The lifecycle is:

```text
00 Open
01 Discover
02 Align + Audit
03 Define
04 Content + Structure
05 Creative Direction
06 Design + Systemize
07 Build + Connect
08 Verify + Optimize
09 Review + Launch
10 Handoff + Learn
```

Core rule:

> **Understand before deciding. Align before designing. Design before building. Verify before delivering. Learn after launch.**

---

# 1. Start by Reading Project State

For an existing/continuing client project, read:

- `docs/PROJECT-STATUS.md`
- `docs/PROJECT-DECISIONS.md`
- current-phase context only

Then inspect canonical live sources where relevant, such as Webflow/Figma/design-system sources.

Do not restart discovery merely because a new conversation/session begins.

---

# 2. Keep the Status Current

`PROJECT-STATUS.md` is the operational control file.

Use only:

- Not started
- In progress
- Needs input
- Blocked
- Ready for review
- Approved
- Deferred
- Not applicable

After material work:

1. update current phase
2. update next action
3. update blockers/inputs
4. update gate status
5. record material decisions separately in `PROJECT-DECISIONS.md`

Do not bury project state in chat history.

---

# 3. Do Not Skip Gates Silently

Phases may overlap where safe, but downstream work must not create false confidence.

Example:

- copy exploration can begin while some research is incomplete
- technical feasibility can be tested during creative direction
- responsive thinking begins during design
- performance begins before build is complete

But:

- do not mark Creative Direction approved if the brand direction is unresolved
- do not call the build release-ready before QA
- do not call a live site delivered before critical production flows are verified

If the user intentionally chooses to proceed with missing inputs, record the assumption/risk instead of blocking unnecessarily.

---

# 4. Existing Project Mode

When applying the process to an existing website, use `PROJECT-AUDIT.md`.

For every phase classify:

- Complete
- Partial
- Missing
- Conflicting
- Not applicable

For every meaningful gap record:

- evidence
- problem/gap
- impact
- recommended action
- priority
- dependency

Do not rebuild strong existing work simply to make the project conform to the process.

Use:

> **Keep → Improve → Replace → Create → Defer**

---

# 5. Brand + Design System Gate

Before substantial design/build work, verify the available client sources.

For Webflow normally inspect:

- Brand Guideline page
- Style Sheet page
- variables/modes
- components
- framework/classes

For Figma normally inspect:

- brand/design-system pages
- variables/styles
- component library

The client's approved identity and production system outrank Admonk aesthetics, Lumos starter defaults, external component libraries, and AI defaults.

---

# 6. Responsive + Performance Are Continuous

Do not postpone either to Phase 08.

During every relevant phase consider:

## Responsive

- desktop
- intermediate widths
- tablet
- mobile
- type wrapping
- content reflow
- image crops
- touch vs hover
- motion substitutions
- localization

## Performance

- asset/media weight
- fonts
- scripts
- third parties
- layout stability
- interaction responsiveness
- animation cost
- mobile runtime

Use `admonk-performance` and PageSpeed Insights/Lighthouse at the milestones defined in the lifecycle.

---

# 7. Platform Rule

Platform choice belongs in Define, after requirements are understood.

Do not choose Webflow, Astro, React, or another platform merely because a skill exists.

If Webflow is selected:

- use `admonk-webflow`
- use `admonk-lumos` for substantial new builds when appropriate
- use native Webflow capability before custom code

---

# 8. Automation Assessment

Every substantial project should ask what happens behind the website, but automation is not mandatory scope.

Evaluate:

- forms
- CRM
- CMS
- analytics
- APIs
- lead routing
- repetitive manual work
- marketing automation
- AI

Build only what creates real value.

---

# 9. Change Requests

When a late request arrives, identify the earliest phase it changes.

Do not simply patch production when the request changes strategy, design system, IA, platform architecture, or scope.

Update the underlying decision, then propagate forward.

---

# 10. User Intent Shortcuts

When the user says:

### Start a new project
Initialize status and begin Open/Discover.

### Continue
Read status/decisions and continue the next unblocked action.

### What is missing?
Run/update reverse lifecycle audit and prioritize gaps.

### Are we ready to design/build/launch?
Evaluate the corresponding lifecycle gate and list only unresolved requirements.

### Apply this process to the Admonk/current site
Run an existing-project audit first. Do not assume rebuild.

---

# 11. Working Loop

Use:

```text
Read status
→ identify next task/decision
→ load required context
→ execute
→ verify
→ record decision/issues
→ update status
→ continue or request approval
```

---

# Final Rule

> **Every phase should reduce uncertainty for the next one.**

The process should make the work more coherent and faster, not create paperwork for its own sake.