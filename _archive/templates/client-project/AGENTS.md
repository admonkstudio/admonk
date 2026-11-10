# Client Project Agent Rules

This repository contains one client/project.

Reusable Admonk studio skills may be available to the agent, but the client's business, brand, design system, and project context take priority over general studio preferences.

---

# 1. Project Lifecycle

Use the Admonk Project Lifecycle for substantial project work.

Reusable source:

- `docs/PROJECT-LIFECYCLE.md` from the Admonk agent system
- `admonk-project-lifecycle` skill

Project-local control files:

- `docs/PROJECT-STATUS.md` — where the project is and what happens next
- `docs/PROJECT-AUDIT.md` — reverse-lifecycle audit for an existing project
- `docs/PROJECT-DECISIONS.md` — durable material decisions

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

Phases may overlap where safe, but do not mark a gate approved while required decisions remain unresolved.

When continuing a project, read `PROJECT-STATUS.md` first rather than restarting from the beginning.

When auditing an existing site, preserve strong work and classify gaps as Complete / Partial / Missing / Conflicting / Not applicable.

---

# 2. Context

Before substantial work, load only the relevant files:

- Project state → `docs/PROJECT-STATUS.md`
- Business / positioning → `docs/CLIENT-BUSINESS.md`
- Brand strategy / visual identity / voice → `docs/BRAND-GUIDELINES.md`
- Production design system / Style Sheet mapping → `docs/DESIGN-SYSTEM.md`
- Project objective / scope → `docs/PROJECT-BRIEF.md`
- Copy / content → `docs/CONTENT.md`
- Previous decisions → `docs/PROJECT-DECISIONS.md`
- Technical/platform/performance constraints → `docs/PLATFORM.md`

If the project has canonical live sources such as a Webflow `Style Sheet` page, Webflow `Brand Guideline` page, Figma design-system library, or original client brand guideline, inspect those sources as well. The project docs may summarize them but should not silently replace them.

---

# 3. Authority

Use this priority:

1. Current explicit user/client instruction.
2. Approved client business, brand strategy, and brand guideline.
3. Client production design system / live Style Sheet / Figma library.
4. Current project requirements and recorded decisions.
5. Admonk studio principles.
6. Relevant Admonk skills.
7. Platform-specific skills.
8. External skills/MCPs.
9. Framework defaults and generic best practices.

Do not let a framework starter, AI default, or Admonk aesthetic override the client's approved identity.

---

# 4. Brand Alignment Gate

Before substantial design, copy, component, or implementation work:

1. understand the client's business and audience
2. read the approved brand/voice guidance
3. inspect the existing design system
4. inspect reusable classes/tokens/components before creating new ones
5. identify any missing or conflicting rule
6. record unresolved conflicts rather than improvising silently

For Webflow projects, normally inspect:

- `Style Sheet` page
- `Brand Guideline` page
- variables/modes
- components
- existing framework/classes

For Figma projects, normally inspect:

- variables/styles
- component library
- design-system frames/pages
- brand guideline source

---

# 5. Responsive-First Rule

Responsiveness is not a final adaptation pass.

Every major composition should consider from the start:

- desktop
- intermediate/tablet widths
- mobile
- content reflow
- typography wrapping/scaling
- image crop/art direction
- navigation behavior
- touch vs hover
- motion substitution
- long content/localization
- browser zoom/text enlargement where relevant

Do not test only preset breakpoint widths. Intermediate widths can expose failures that the standard desktop/tablet/mobile buttons do not.

Mobile should preserve the concept, hierarchy, usability, and brand rather than simply stacking desktop sections.

---

# 6. Performance-By-Design Rule

Performance is part of the project from design through handoff.

For production web work:

- consider asset/runtime cost while designing
- optimize image/media strategy before implementation is complete
- limit avoidable font/script/third-party cost
- consider layout stability while building
- consider interaction responsiveness when adding JS/motion
- test mobile performance, not only desktop
- run PageSpeed Insights/Lighthouse diagnostics at appropriate milestones
- review Core Web Vitals/field data when available

Use `admonk-performance` for detailed guidance.

Do not sacrifice a meaningful visual idea for a trivial synthetic score gain without first looking for a more efficient implementation of the same idea.

---

# 7. Working Loop

Within the current lifecycle phase:

```text
Read status
→ identify next task/decision
→ load required context
→ do the work
→ verify the result
→ record material decisions/issues
→ update status
→ continue or request approval
```

Do not leave important state only in chat history.

If a late change affects an earlier strategic/design/system decision, return to the earliest affected lifecycle phase and propagate the change forward rather than layering contradictory patches into production.

---

# 8. Core Rules

- Do not make the client look like Admonk unless the client brief genuinely calls for it.
- Preserve strong existing brand assets and systems.
- Reuse approved design-system classes, variables, tokens, and components before inventing parallel ones.
- Integrate before replacing functioning systems.
- Do not invent client facts, metrics, testimonials, awards, or proof.
- Do not commit secrets or credentials.
- Use the simplest technology that satisfies the requirement.
- Test the real rendered experience before declaring implementation complete.
- Record material project decisions in `docs/PROJECT-DECISIONS.md`.
- Update `docs/PROJECT-STATUS.md` after material progress.
- Treat responsive behavior and performance as continuous quality constraints.

---

# 9. Delivery Standard

The final work should be:

- Aligned with the client's strategy, identity, voice, and design system.
- Purposeful for the business objective.
- Visually intentional.
- Usable and accessible.
- Responsive across real viewport ranges.
- Performance-conscious and verified.
- Technically sound.
- Tested in the target environment.
- Maintainable within the client's chosen platform/system.
- Documented enough for the intended handoff owner.

A page that visually matches the concept but ignores the client's system, breaks between breakpoints, performs poorly, or has not been verified in production is not complete.
