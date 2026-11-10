# Admonk Client Project Template

Use this template when starting a new client project.

The repository should separate:

- client/business truth
- brand/voice truth
- production design-system truth
- project/scope truth
- technical/platform truth
- project status/decisions

from reusable Admonk studio skills.

---

# Start Here

1. Copy/create this project structure.
2. Fill `docs/PROJECT-STATUS.md` first.
3. Collect and link canonical client sources.
4. Work through the Admonk Project Lifecycle.
5. Update project status after material progress.

Lifecycle:

```text
00 Open
→ 01 Discover
→ 02 Align + Audit
→ 03 Define
→ 04 Content + Structure
→ 05 Creative Direction
→ 06 Design + Systemize
→ 07 Build + Connect
→ 08 Verify + Optimize
→ 09 Review + Launch
→ 10 Handoff + Learn
```

For an existing site, use `docs/PROJECT-AUDIT.md` and run the lifecycle in reverse-audit mode rather than pretending the project is new.

---

# Project Files

## `AGENTS.md`

Rules any agent/collaborator should follow for this project.

## `docs/PROJECT-STATUS.md`

Operational control file: current phase, gates, blockers, approvals, next action.

## `docs/PROJECT-AUDIT.md`

Gap/recovery audit for an existing project.

## `docs/CLIENT-BUSINESS.md`

Business, audience, positioning, objectives, existing systems, constraints.

## `docs/BRAND-GUIDELINES.md`

Strategy, identity, voice, imagery, digital translation, canonical brand sources.

## `docs/DESIGN-SYSTEM.md`

Implementation-facing design system: Style Sheet/Figma sources, variables, classes, components, responsive/system rules.

## `docs/PROJECT-BRIEF.md`

Project objective, scope, journeys, deliverables, requirements, success criteria.

## `docs/CONTENT.md`

Approved/working content, proof, CTAs, SEO intent, content status, localization.

## `docs/PLATFORM.md`

Platform/framework, Webflow/Lumos info where relevant, integrations, responsive/performance targets, environments/testing.

## `docs/PROJECT-DECISIONS.md`

Durable record of material decisions and tradeoffs.

---

# Canonical Sources Rule

These files may summarize external sources but do not replace them.

Examples:

- real client Brand Guideline
- Webflow `Style Sheet`
- Webflow `Brand Guideline`
- Webflow variables/components
- Figma library/design system
- current production site
- CMS/database/API definitions

Link the source and keep the summary aligned with it.

---

# Working Habit

Use:

```text
Status
→ Context
→ Work
→ Verify
→ Decision/Issue
→ Status
```

The process should make project continuity easier across days, conversations, agents, and collaborators.