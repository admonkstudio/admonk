# Admonk Project OS — V1 Execution Plan

This plan turns `docs/PROJECT-OS.md` into a working pilot application.

The goal of V1 is not to build every future client-portal feature.

The goal is to prove the complete loop:

```text
project created
→ onboarding completed
→ documents/sources attached
→ gaps/readiness calculated
→ recommendations reviewed
→ project context compiled
→ GitHub updated
→ lifecycle continues
```

Admonk is the first real pilot project.

---

# 1. Delivery Strategy

Build vertically rather than finishing every subsystem in isolation.

Each milestone should produce something testable in the browser.

Do not build a giant backend first and postpone the experience.

Do not polish every screen before the information model works.

---

# 2. Milestone 0 — Foundation

## Goal

Create a production-capable application skeleton and establish conventions before feature work.

## Work

- Create `apps/project-os/`.
- Scaffold current stable Next.js + TypeScript using the App Router.
- Add linting/type checking/build scripts.
- Add environment-variable validation.
- Add Supabase client/server structure without committing secrets.
- Add a minimal app shell.
- Add route groups for client and internal experiences.
- Add a small reusable component foundation.
- Add initial README/setup instructions.
- Add basic test/QA structure.

## Suggested route shape

```text
/
/login
/projects
/projects/[projectId]
/projects/[projectId]/onboarding
/projects/[projectId]/sources
/projects/[projectId]/assessment
/projects/[projectId]/scope
/internal
/internal/projects/[projectId]
```

Exact routing may change if implementation reveals a clearer structure.

## Gate

- app runs locally
- typecheck/lint/build pass
- no secrets committed
- browser shows working authenticated-app shell placeholder

---

# 3. Milestone 1 — Data + Auth

## Goal

Persist real projects, members, onboarding answers, and sources.

## Work

Create initial Supabase schema for the minimum viable subset:

```text
organizations
organization_members
projects
project_members
project_sources
questionnaire_sections
questionnaire_questions
project_answers
project_requirements
project_recommendations
project_dependencies
project_compilations
```

Add:

- migrations/schema files in repository
- RLS policies appropriate to client/internal access
- Supabase Auth flow
- project membership checks
- internal-role convention
- seed data for the Admonk pilot

Do not over-normalize prematurely.

## Gate

A signed-in pilot user can open the Admonk project and data access is scoped correctly.

---

# 4. Milestone 2 — Adaptive Onboarding

## Goal

Create the first client-facing information-gathering workflow.

## Required sections

1. Project Start
2. Business
3. Identity
4. Experience
5. Automation / Integrations
6. Delivery / Constraints
7. Sources / Documents

## Behavior

- save progress continuously or reliably between steps
- support required/optional questions
- support conditional questions
- show supplied / missing state
- allow sections to be resumed
- show readiness/progress by domain
- avoid asking questions already satisfied by known project data where practical

V1 adaptation can be deterministic rules rather than AI-generated forms.

## Gate

Admonk can complete its own onboarding from start to finish and resume after leaving.

---

# 5. Milestone 3 — Sources + Documents

## Goal

Attach evidence to project knowledge rather than treating answers as unverified truth.

## Work

- Supabase Storage upload flow
- external source/link records
- file metadata
- source category
- notes
- relationship between source and relevant project domain
- internal verification status

Supported first-pass categories:

- brand guideline
- design system
- company/business material
- content
- analytics/search evidence
- technical/integration documentation
- visual assets
- existing website/platform
- Figma
- Webflow
- GitHub

AI extraction is not required to complete this milestone.

## Gate

A project can display its canonical sources and uploaded files with clear categories/status.

---

# 6. Milestone 4 — Requirement + Gap Engine

## Goal

Turn collected information into an explainable assessment.

## Work

Define requirements by domain and deterministic evaluation rules.

Example:

```text
Requirement: approved brand direction
Evidence: Brand Guideline uploaded + verified
Status: existing + strong
Recommendation: preserve
```

Statuses:

- verified
- provided
- partial
- missing
- conflicting
- needs review
- not applicable

Classification:

- Existing + strong
- Existing + weak/partial
- Missing + required
- Missing + useful
- Missing + unnecessary
- Unknown

Build readiness gates for at least:

- Ready for assessment
- Ready for quote
- Ready for design
- Ready for build

Every failed gate should explain why.

## Gate

Admonk pilot produces a readable assessment with evidence-backed gaps instead of an arbitrary percentage.

---

# 7. Milestone 5 — Recommendation Engine

## Goal

Transform gaps into justified scope opportunities without generic upselling.

## Recommendation structure

```text
Capability
Current state
Evidence
Gap
Consequence
Recommendation
Priority
Required / recommended / optional / not required
Internal approval
```

Start with rule-based recommendations across:

### Identity

- strategy/positioning clarification
- brand foundation
- visual identity
- brand guideline
- content/voice direction

### Experience

- website strategy
- IA/sitemap
- UX/UI
- design system
- image production
- motion
- CMS
- SEO foundation
- analytics
- accessibility/performance

### Automation

- CRM integration
- lead routing
- email/WhatsApp automation
- workflow automation
- database/API integration
- AI opportunity assessment
- reporting

The system must be able to recommend **Not required**.

## Gate

Recommendations are explainable, editable by Admonk, and traceable to collected evidence/gaps.

---

# 8. Milestone 6 — Scope + Estimate Inputs

## Goal

Create an accurate scope model before attempting automatic commercial pricing.

## Work

Build structured scope items and effort drivers for:

- strategy
- content
- page/templates
- unique layouts
- design-system effort
- imagery
- motion
- responsive complexity
- CMS
- migration
- SEO
- analytics
- integrations
- localization
- QA
- handoff

Build dependency model for:

- content
- photography/assets
- approvals
- credentials
- translations
- third-party systems
- legal/compliance

Output:

- recommended scope
- exclusions/not-required items
- client inputs required
- effort ranges or complexity values
- production dependencies

Do not generate binding pricing automatically in V1.

## Gate

Admonk can review a scope summary and identify the main drivers of price and timeline.

---

# 9. Milestone 7 — GitHub Project Compiler

## Goal

Turn reviewed Project OS state into durable project context for the agent.

## First outputs

Generate previews for:

```text
CLIENT-BUSINESS.md
BRAND-GUIDELINES.md
DESIGN-SYSTEM.md
PROJECT-BRIEF.md
CONTENT.md
PLATFORM.md
PROJECT-STATUS.md
```

Do not overwrite `PROJECT-DECISIONS.md` from generated state.

## Sync safety

- server-side only
- no credential exposed to browser
- preview before write
- show exact repository/path
- do not overwrite unrelated manual content silently
- preserve unresolved/unknown fields
- no secrets in generated markdown

For the Admonk pilot, a repository-scoped secret may be used for development.

Before external-client rollout, move to a GitHub App/installation model.

## Gate

One approved Admonk Project OS state can be compiled and synced into a test project/context location in GitHub with a visible diff/preview.

---

# 10. Milestone 8 — Internal Project Dashboard

## Goal

Give Admonk one operational view of project intelligence.

Show:

- project readiness
- current lifecycle phase
- missing information
- conflicts
- risks/dependencies
- sources
- recommendations
- scope summary
- GitHub compilation status
- next action

Do not make this a generic task/project-management dashboard yet.

## Gate

A new Admonk team member can open a project and understand its current state without reading chat history.

---

# 11. Milestone 9 — AI Assistance

## Goal

Add AI only after deterministic project state works.

First AI jobs:

- summarize uploaded/source material
- extract candidate business/brand facts
- draft follow-up questions
- identify likely conflicts/missing evidence
- draft recommendation explanation
- generate human-readable project compilation from structured state

Requirements:

- extracted claims remain candidates until verified when appropriate
- preserve source references
- do not fabricate missing facts
- AI output must be reviewable

## Gate

AI reduces manual reading/questioning without becoming the hidden authority for readiness, pricing, or facts.

---

# 12. Milestone 10 — QA + Pilot Completion

## Goal

Use Admonk as the full first project and verify the operating model.

Test:

- desktop + intermediate + mobile widths
- keyboard/focus basics
- upload flows
- auth/access control
- persistence
- conditional onboarding
- readiness logic
- recommendation explainability
- compiler preview/sync
- console/network errors
- PageSpeed/performance basics

Use the browser QA process and Playwright CLI where available.

## Pilot success criteria

We can answer from the application:

1. What does Admonk already have?
2. What is missing?
3. What should be improved?
4. What secondary solutions are justified?
5. Is the project ready for quote/design/build?
6. What dependencies affect the timeline?
7. What should the agent know?
8. Can approved context be synced to GitHub?
9. What is the next lifecycle action?

---

# 13. V1 Definition of Done

V1 is complete when:

- authenticated client/internal roles work
- Admonk pilot project is persisted
- onboarding is resumable
- sources/documents can be recorded/uploaded
- gap/readiness model works
- recommendations are explainable and reviewable
- scope/dependency summary works
- GitHub context can be previewed/synced safely
- project dashboard shows actionable status
- critical flows are browser-tested
- responsive behavior is intentional
- performance is acceptable and measured
- setup/handoff docs exist

---

# 14. First Codex Task

Codex should **not attempt all milestones in one task**.

First task scope:

> Implement Milestone 0 only, plus enough mocked/seeded project data to render a convincing client/internal shell. Do not implement Supabase persistence until the foundation is reviewed.

Required result:

- `apps/project-os/` exists
- project installs/runs
- app shell follows Admonk brand direction rather than generic SaaS styling
- client project dashboard skeleton
- onboarding skeleton
- internal dashboard skeleton
- responsive implementation
- clean architecture ready for Supabase
- no fake production claims/metrics
- lint/typecheck/build pass
- README explains how to run it

After Milestone 0 is visually/technically reviewed, proceed to Milestone 1.

---

# Final Rule

> **Build the smallest complete slice that teaches us something, then use the evidence to decide the next slice.**
