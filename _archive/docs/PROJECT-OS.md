# Admonk Project OS

Admonk Project OS is the client/project intelligence layer that sits in front of and alongside the Admonk Project Lifecycle.

It turns scattered client knowledge into a structured, visible, actionable project system.

Core flow:

```text
Client starts a project
        ↓
Adaptive onboarding + document collection
        ↓
Business / brand / design-system / technical understanding
        ↓
Gap + readiness assessment
        ↓
Scope recommendations
        ↓
Estimate + timeline dependencies
        ↓
Approved project
        ↓
GitHub project context + lifecycle status
        ↓
Design / build / QA / delivery
```

The system is not merely a questionnaire and should not become a generic CRM.

Its job is to answer:

1. What does the client already have?
2. What is strong enough to preserve?
3. What is incomplete or missing?
4. What must be clarified before quoting or starting?
5. What secondary capabilities are genuinely justified?
6. What should the project include?
7. What information does the Admonk agent need to work correctly?
8. What dependencies affect cost and timeline?
9. What lifecycle phase is the project currently in?
10. What must happen next?

---

# 1. Product Principles

## Diagnose before selling

Secondary solutions should result from evidence.

Use:

```text
Gap
→ consequence
→ recommendation
```

Do not use:

```text
Service
→ generic upsell
```

The system must also be comfortable saying **Not required**.

## Existing before missing

Always identify what already exists before recommending new work.

Classify capabilities as:

- Existing + strong → preserve
- Existing + weak/partial → improve
- Missing + required → include
- Missing + useful → recommend
- Missing + unnecessary → do not sell
- Unknown → request evidence or clarification

## Documents before duplicate questions

If an uploaded/connected source already answers a question, do not force the client to answer it again.

## Structured data + human-readable context

Supabase/database state is the operational source for live onboarding and project data.

GitHub markdown/project files are the durable agent-readable compilation of approved/current context.

Do not use GitHub as the primary transactional database.

## Progressive disclosure

Do not show every possible question to every client.

The onboarding path adapts to:

- new vs existing project
- existing vs missing brand system
- existing vs missing website
- selected platform
- project type
- uploaded evidence
- previous answers
- identified gaps

---

# 2. User Roles

V1 should support two primary roles.

## Client

Examples:

- founder / owner
- marketing manager
- project stakeholder

Client can:

- create/continue onboarding
- answer questions
- upload/link sources
- see readiness
- see missing inputs
- review recommendations
- review scope summary
- see what Admonk is waiting for

## Admonk

Admonk can:

- view all projects
- inspect source evidence
- override/correct classifications
- mark information verified
- resolve conflicts
- manage recommendations
- review scope
- see project risks/dependencies
- trigger/approve GitHub compilation
- see lifecycle status

Future roles may include designer, developer, finance, client approver, and external collaborator.

---

# 3. Main Product Areas

## A. Project Start

Capture:

- project/client name
- project type
- new/existing project
- current website URL
- primary contact
- role
- high-level request

Project types may include:

- new website
- redesign
- existing-site improvement
- landing/campaign page
- brand + website
- web application / portal
- not sure yet

## B. Adaptive Discovery

Domains:

### Business

- business model
- products/services
- markets
- audience
- decision maker
- positioning
- differentiators
- objectives
- desired user actions
- commercial priorities

### Identity

- strategy
- brand guideline
- voice/tone
- visual identity
- logo
- typography
- colors
- imagery
- motion direction

### Experience

- current website
- information architecture
- content
- design system
- responsive strategy
- accessibility
- SEO
- analytics
- required journeys
- CMS
- localization

### Automation / Integration

- forms
- CRM
- lead routing
- analytics
- email
- WhatsApp
- workflows
- database/API
- AI opportunities
- reporting

### Delivery / Constraints

- target launch
- event/deadline dependency
- languages
- approvals
- legal/compliance
- content ownership
- photography/media availability
- technical systems
- client editing expectations

## C. Sources / Documents

Support metadata and storage/linking for:

- brand guidelines
- company profiles
- proposals/scopes
- pitch decks
- product/service documents
- content files
- analytics/search reports
- sitemap
- Figma links/files
- Webflow links
- GitHub repository
- CRM/API documentation
- logos/fonts/assets
- photography/video

V1 does not need perfect AI extraction for every file type before the product is useful.

The data model should support later extraction/classification.

## D. Readiness + Gap Map

Show progress by domain rather than one meaningless completion percentage.

Example:

```text
Business       90%
Identity       80%
Experience     55%
Automation     35%
Delivery       70%
```

Each requirement should have a status such as:

- verified
- provided
- partial
- missing
- conflicting
- not applicable
- needs review

The project should expose gates such as:

- Ready for assessment
- Ready for quote
- Ready for design
- Ready for build
- Ready for launch

Readiness must be rule/evidence based rather than fabricated by an LLM.

## E. Recommendations

Recommendations should contain:

- capability / solution
- status
- evidence
- identified gap
- consequence
- recommendation
- priority
- required / recommended / optional / not required
- human approval state

The system should explicitly show solutions that are **not required** when that builds clarity/trust.

## F. Scope + Estimate Inputs

V1 should produce structured scope inputs before automated pricing.

Capture drivers including:

- page/template count
- unique composition count
- CMS complexity
- design-system work
- content work
- image production
- motion complexity
- 3D/Rive
- responsive complexity
- localization
- migration
- SEO
- integrations
- CRM
- APIs
- automation
- analytics
- review/stakeholder complexity
- client readiness dependencies

Do not make page count the only pricing dimension.

## G. Timeline Dependencies

Separate:

- estimated production effort
- expected calendar duration

Timeline should identify dependencies such as:

- client content
- imagery
- approvals
- credentials
- legal review
- translations
- third-party vendors

## H. Project Compilation

Once information is sufficiently reviewed, compile approved/current project data into the existing project context model:

```text
AGENTS.md

docs/
├── PROJECT-STATUS.md
├── PROJECT-AUDIT.md
├── CLIENT-BUSINESS.md
├── BRAND-GUIDELINES.md
├── DESIGN-SYSTEM.md
├── PROJECT-BRIEF.md
├── CONTENT.md
├── PLATFORM.md
└── PROJECT-DECISIONS.md
```

The compiler must:

- preserve source/evidence distinctions
- avoid inventing missing facts
- mark unresolved items
- avoid writing secrets
- allow preview before destructive overwrite
- preserve manual project decisions

GitHub sync should happen server-side using an approved authentication model.

For the initial internal Admonk test, the implementation may use a tightly scoped repository credential stored only as a server secret. The production multi-client design should migrate to a GitHub App/installation model rather than broad personal tokens.

---

# 4. V1 Experience

The first usable version should prove the complete information loop rather than every future feature.

## Client experience

1. Sign in.
2. Open/create project.
3. See project readiness.
4. Continue onboarding.
5. Answer adaptive sections.
6. Upload/link documents.
7. See supplied vs missing information.
8. See preliminary recommendations.
9. See what Admonk needs next.

## Admonk experience

1. Sign in as internal user.
2. See project list.
3. Open project intelligence dashboard.
4. Review answers/sources.
5. Mark fields verified / missing / conflicting.
6. Review/edit recommendations.
7. Inspect readiness gates.
8. Preview generated project markdown.
9. Sync approved project context to GitHub.

---

# 5. Recommended V1 Technical Architecture

The application should live separately from Admonk's marketing website while remaining part of this repository during development.

Recommended location:

```text
apps/project-os/
```

Recommended stack:

- Next.js + TypeScript for the authenticated application and server routes/actions
- Supabase Postgres for structured project state
- Supabase Auth for V1 authentication
- Supabase Storage for uploaded files
- schema validation at application boundaries
- server-only GitHub synchronization
- Playwright/browser QA for critical flows

Use shadcn only as an implementation primitive source where useful. It is not the visual design authority.

Do not add a heavy state-management or workflow framework unless the implementation proves it is needed.

The visual system should follow the Admonk brand/design system for the internal pilot while keeping the underlying components able to support future client theming where justified.

---

# 6. Suggested Data Model

Exact schema may evolve after implementation, but V1 should model these concepts explicitly.

```text
organizations
organization_members
projects
project_members
project_sources
project_documents
questionnaire_sections
questionnaire_questions
project_answers
project_requirements
project_gaps
project_recommendations
project_scope_items
project_dependencies
project_readiness
project_approvals
project_events
project_compilations
project_integrations
```

Important principles:

- answers are not the same as verified facts
- evidence/source references should be preserved
- recommendations should be reviewable, not opaque AI output
- lifecycle/readiness state should be explainable
- generated GitHub markdown is an output of structured state, not the only storage format

---

# 7. AI Boundary

AI should help with:

- clarifying vague responses
- extracting candidate facts from documents
- summarizing evidence
- detecting likely missing information
- drafting recommendations
- compiling readable project context
- proposing follow-up questions

AI should not be the sole authority for:

- pricing
- contractual scope
- verified client facts
- legal/compliance conclusions
- final recommendation approval
- destructive GitHub overwrites
- readiness gates that should be deterministic

V1 should prefer deterministic rules for core readiness/gap logic, then use AI as an assistive layer.

---

# 8. V1 Non-Goals

Do not delay V1 for:

- full CRM replacement
- contracts/e-signature
- invoicing/payments
- complex resource scheduling
- automatic production pricing without human review
- perfect OCR/document extraction across all formats
- full white-label client portal
- deep Figma/Webflow bidirectional synchronization
- fully autonomous project management

These can be added after the core Project Intelligence loop is proven.

---

# 9. Pilot

Admonk itself is the first pilot project.

The pilot should test:

- existing-project onboarding
- source collection
- current-site audit
- gap detection
- design-system/brand alignment
- solution recommendation logic
- readiness
- GitHub compilation
- lifecycle continuation

This pilot should reveal both missing Project OS features and missing Admonk agent capabilities.

---

# Final Principle

> **The Project OS should make the project knowable before it makes the project automatic.**
