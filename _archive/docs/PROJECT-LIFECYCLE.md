# Admonk Project Lifecycle

This is the standard operating process for Admonk web-experience projects, from the moment a project appears until testing, launch, handoff, and learning.

It applies to:

- new client projects
- redesigns
- existing-site improvements
- Admonk's own website
- Figma-first projects
- Webflow projects
- Astro/code projects
- projects that later expand into CMS, automation, CRM, AI, or other systems

The process is deliberately platform-neutral until the project requirements justify a platform.

Core principle:

> **Understand before deciding. Align before designing. Design before building. Verify before delivering. Learn after launch.**

The process is a control system, not bureaucracy. Phases may overlap where safe, but no phase should be treated as approved when its required decisions are still unresolved.

---

# 1. Lifecycle Overview

```text
00 OPEN
   ↓
01 DISCOVER
   ↓
02 ALIGN + AUDIT
   ↓
03 DEFINE
   ↓
04 CONTENT + STRUCTURE
   ↓
05 CREATIVE DIRECTION
   ↓
06 DESIGN + SYSTEMIZE
   ↓
07 BUILD + CONNECT
   ↓
08 VERIFY + OPTIMIZE
   ↓
09 REVIEW + LAUNCH
   ↓
10 HANDOFF + LEARN
```

The Framework runs through the lifecycle rather than existing as separate service phases:

```text
IDENTITY
→ strongest in Discover / Align / Creative Direction

EXPERIENCE
→ strongest in Define / Content / Design / Build / Verify

AUTOMATION
→ assessed during Define and implemented during Build only when useful
```

---

# 2. Project Status Language

Use these statuses consistently:

- **Not started**
- **In progress**
- **Needs input**
- **Blocked**
- **Ready for review**
- **Approved**
- **Deferred**
- **Not applicable**

Do not use `Approved` simply because work exists.

Approval means the relevant decision/source is stable enough for dependent work to proceed.

---

# 3. Phase 00 — Open

## Purpose

Create the project environment and prevent information from being scattered across chat, email, Figma, Webflow, files, and memory.

## Actions

- Create/open the project repository/workspace.
- Create the standard project docs.
- Identify project owner and stakeholders.
- Record what already exists.
- Link all canonical sources.
- Record target timing if known.
- Record whether this is new-build, redesign, migration, optimization, or extension work.
- Create `PROJECT-STATUS.md`.
- Create `PROJECT-AUDIT.md` for an existing project.

## Sources to collect

Possible sources include:

- current website
- analytics
- search performance
- client brief
- proposal/scope
- brand guideline
- Webflow Brand Guideline page
- Webflow Style Sheet page
- Figma files/libraries
- logos/fonts/assets
- CMS structure
- CRM/forms/automation
- code repository
- prior research
- competitor/reference sites

## Exit Gate — Project Ready

At minimum we know:

- what project this is
- who owns decisions
- what the initial request is
- where the important existing sources live
- what information is still missing

Unknowns are allowed. Invisible unknowns are not.

---

# 4. Phase 01 — Discover

## Purpose

Understand the business before proposing design or technology.

## Required questions

- What does the business do?
- Who is the primary audience?
- Who makes the buying/engagement decision?
- What should the website help accomplish?
- What user actions matter most?
- What is working today?
- What is failing today?
- What differentiates the business?
- What must the brand never feel like?
- What commercial/operational constraints exist?
- What existing systems must remain connected?

## Actions

Populate or verify:

- `CLIENT-BUSINESS.md`
- initial `PROJECT-BRIEF.md`
- existing systems in `PLATFORM.md`
- known KPIs/evidence
- stakeholder constraints

Research competitors, audience, search landscape, technology, or current best practice when it will materially change the decision.

Do not research merely to fill a document.

## Exit Gate — Understanding Approved

We can state clearly:

1. the business problem
2. the audience
3. the primary website objective
4. desired user actions
5. important constraints
6. existing systems that matter

If these cannot be stated, creative production is premature.

---

# 5. Phase 02 — Align + Audit

## Purpose

Understand the client's real identity/system and, for existing projects, determine what should be preserved, improved, replaced, or created.

## Brand alignment

Inspect:

- approved Brand Guideline / strategy
- brand voice
- visual identity
- real brand assets
- Webflow `Brand Guideline` page when present
- Figma brand/design-system sources

Populate/update:

- `BRAND-GUIDELINES.md`

## Design-system alignment

Inspect:

- Webflow `Style Sheet` page
- Webflow variables/modes
- Webflow components
- framework and version
- Figma variables/styles/components
- code tokens/components when relevant

Populate/update:

- `DESIGN-SYSTEM.md`

Core rule:

> **Reuse the approved system before inventing a parallel one.**

## Existing-project audit

For a redesign/improvement project evaluate:

- strategy/positioning
- content
- information architecture
- visual identity translation
- design system
- UX
- responsive behavior
- accessibility
- imagery
- motion
- CMS/content model
- forms/integrations
- SEO
- analytics
- PageSpeed/Core Web Vitals
- code/custom-code debt
- maintainability

Classify findings:

```text
KEEP
→ strong and should remain

IMPROVE
→ useful but needs refinement

REPLACE
→ actively harms the project or no longer fits

CREATE
→ required but missing

DEFER
→ useful but not required in current scope
```

## Exit Gate — Alignment + Gap Map Approved

We know:

- what identity/system is authoritative
- what should be preserved
- what is missing
- what conflicts need resolution
- what existing problems matter most

---

# 6. Phase 03 — Define

## Purpose

Turn discovery into an executable project definition.

## Actions

Finalize the relevant parts of `PROJECT-BRIEF.md`:

- objective
- primary user journey
- required pages/screens/states
- scope
- success criteria
- required integrations
- CMS/data requirements
- analytics needs
- accessibility requirements
- responsive priorities
- performance expectations

## Information architecture

Define:

- sitemap
- page roles
- navigation
- primary user journeys
- conversion paths
- content hierarchy

## Platform decision

Choose the platform **after** requirements are understood.

Evaluate relevant options by:

- design freedom
- client editing needs
- CMS/data complexity
- interaction/motion requirements
- integration needs
- performance
- maintenance
- deployment
- budget/timeline

## Automation & Integration Assessment

Always ask:

- What happens after a form is submitted?
- Where should the lead/data go?
- Is a CRM already present?
- What is currently manual?
- What should be measured?
- Is automation actually useful here?

Do not add automation merely because Admonk can build it.

## Exit Gate — Project Definition Approved

We have an approved/usable:

- scope
- sitemap/information architecture
- primary journeys
- platform direction
- integration plan
- success criteria
- responsive/performance expectations

---

# 7. Phase 04 — Content + Structure

## Purpose

Give design real material and prevent the site from being shaped around placeholder copy.

## Actions

Populate `CONTENT.md` with:

- core message
- messaging hierarchy
- navigation labels
- page-by-page objectives
- headlines/supporting copy
- proof/metrics
- CTAs
- required facts
- content status
- SEO/search intent where relevant
- localization/RTL requirements

Audit assets:

- approved images
- missing photography
- product UI/screenshots
- video
- illustration/3D
- icons
- logos

Classify content as:

- Approved
- Draft
- Needs client input
- Needs verification
- Placeholder — must not ship

## Wire structure

Before high-fidelity design, define enough section/page structure to answer:

- what information appears
- in what order
- why it appears
- where important decisions/actions happen

This does not require generic wireframes if another method communicates the structure better.

## Exit Gate — Content Ready for Design

The project has enough real/credible content and structure to make design decisions without inventing the business.

Not every final sentence must be approved, but major content gaps must be visible.

---

# 8. Phase 05 — Creative Direction

## Purpose

Find the visual/experiential idea before producing pages mechanically.

## Actions

Define:

- core visual concept
- composition principles
- typography behavior
- image direction
- material/3D/graphic language if relevant
- motion character
- interaction character
- section rhythm
- mobile adaptation idea

Create/compare multiple directions internally when useful.

Use references for principles rather than logo-swapping an existing site.

Important test:

> **If the copy disappeared, would there still be a visual idea?**

## Image concept

Determine image roles before generating/selecting imagery.

For each important asset define:

- purpose
- composition
- safe area
- desktop/mobile crop
- realism/style
- motion needs
- performance implication

## Motion concept

Determine:

- what moves
- why it moves
- what user action triggers it
- whether motion explains, connects, reveals, transforms, or simply decorates

Core rule:

> **Motion supports the experience. Motion is not the experience.**

## Exit Gate — Creative Direction Approved

The visual idea, image language, and interaction direction are coherent enough that full design should elaborate rather than rediscover the concept.

---

# 9. Phase 06 — Design + Systemize

## Purpose

Turn creative direction into a responsive, reusable production design.

## Actions

Design the required pages/screens/states.

At the same time define or extend the production design system:

- variables/tokens
- colors/themes
- typography
- spacing/fluid sizing
- containers/grids
- buttons/links
- forms
- reusable components
- states
- image/media behavior
- responsive rules

For Webflow projects, maintain the real:

- `Style Sheet`
- variables/modes
- components
- approved framework conventions

For Figma projects, use the canonical library/variables/components where appropriate.

## Responsive design

Design across **ranges**, not just three screenshots.

Consider:

- desktop
- intermediate widths
- tablet
- mobile landscape when relevant
- mobile
- type wrap
- long content
- touch vs hover
- image crop
- motion substitution
- browser zoom/text enlargement

## Prototype key interactions

Prototype interactions only where doing so reduces implementation ambiguity or helps approval.

## Exit Gate — Design Ready to Build

Before production build, we have:

- approved key page design/direction
- responsive intent
- design-system mapping
- interaction/motion specification where needed
- image/asset plan
- no critical unresolved design-system conflicts

---

# 10. Phase 07 — Build + Connect

## Purpose

Implement the approved experience in the selected production environment.

## Rules

- Follow the client's design system.
- Keep responsive behavior active throughout implementation.
- Keep performance active throughout implementation.
- Use native platform capability before unnecessary custom code.
- Use the simplest suitable technology.
- Preserve existing functioning systems when possible.
- Record material architecture decisions.

## Webflow

Use:

- native Designer capabilities first
- existing framework or Lumos when appropriate
- real variables
- real components
- real CMS
- native responsive controls
- native states/interactions when capable

Custom CSS/JS/GSAP extends Webflow only beyond real platform limits.

## Code platforms

Keep semantic structure, progressive enhancement, accessibility, and runtime cost in view.

## Integrations

Implement only approved requirements:

- CMS
- forms
- CRM
- analytics
- APIs
- database
- automation
- search
- authentication
- payments
- AI

## Build-complete definition

`Build complete` means feature/content implementation is substantially present.

It does **not** mean ready to launch.

## Exit Gate — Feature Complete

All in-scope functionality/content is implemented enough for systematic QA.

Known remaining issues are recorded rather than hidden.

---

# 11. Phase 08 — Verify + Optimize

## Purpose

Prove the real implementation works rather than assuming it does because the design/code looks correct.

## Browser / responsive QA

Test the actual rendered environment across:

- desktop
- intermediate widths
- tablet
- mobile
- touch behavior
- hover/focus
- navigation
- forms
- sticky/fixed states
- motion
- image crops
- long content
- localization where relevant

## Functional QA

Verify:

- links
- forms
- success/error states
- CMS
- integrations
- analytics events
- APIs
- authentication/payments when applicable

## Accessibility

Check relevant:

- semantic structure
- keyboard access
- visible focus
- contrast
- accessible names
- alt text
- reduced motion
- zoom/text enlargement
- form errors/instructions

## Performance

Use PageSpeed Insights/Lighthouse at appropriate staging/production checkpoints.

Evaluate current Core Web Vitals and real-user data when available.

Review:

- images/video
- fonts
- scripts
- third parties
- layout shifts
- interaction responsiveness
- animation cost
- mobile runtime

Core rule:

> **Preserve the idea. Remove the waste.**

## SEO

Where relevant verify:

- titles/descriptions
- headings
- canonical/indexing
- sitemap
- redirects
- robots rules
- structured data
- CMS metadata
- internal linking

## Security

Activate security review for projects involving user data, authentication, payments, APIs, database access, uploads, secrets, or other sensitive systems.

## Content QA

Search for:

- placeholder copy
- unverified claims
- outdated content
- spelling/grammar
- inconsistent terminology
- broken media

## Exit Gate — Release Candidate

Critical issues are fixed.

Remaining accepted issues/tradeoffs are documented.

The project is safe to present as a launch candidate.

---

# 12. Phase 09 — Review + Launch

## Purpose

Move deliberately from release candidate to live project.

## Review

Present/collect feedback against the approved objective and system rather than treating every preference as an isolated patch.

Classify changes:

- defect
- content correction
- approved-scope refinement
- new scope
- changed strategic/design decision

When a change alters an earlier decision, return to the earliest affected phase rather than layering contradictory fixes at the end.

## Pre-launch

Verify:

- final content
- responsive
- forms/integrations
- analytics
- SEO/indexing
- redirects/migration
- performance
- accessibility-critical items
- domain/DNS/SSL where relevant
- backup/version/rollback path
- production secrets/configuration

## Launch

Publish/deploy intentionally.

Do not publish unfinished work merely to test something that can be tested in staging/preview.

## Immediate post-launch

Verify the live environment:

- primary pages
- primary CTA/journey
- forms
- analytics
- redirects
- console/network errors
- mobile
- performance sanity check

## Exit Gate — Live + Verified

The production environment is live and critical flows have been verified there.

---

# 13. Phase 10 — Handoff + Learn

## Purpose

Make the project maintainable and improve the Admonk system from real evidence.

## Handoff

Where relevant provide:

- client editing guidance
- CMS guidance
- component/system guidance
- Webflow Style Sheet explanation
- safe/unsafe editing areas
- custom-code documentation
- integration/data-flow documentation
- deployment notes
- credentials ownership transfer through secure channels
- known limitations

## Post-launch observation

When useful review:

- analytics
- search performance
- conversions
- PageSpeed/Core Web Vitals field data
- errors
- client/editor friction
- user feedback

## Learning

Ask:

- What worked particularly well?
- What created unnecessary friction?
- Which skill/process rule was missing?
- What should become reusable studio knowledge?
- What was specific to this client and must stay private?

Promote only generalizable, non-confidential lessons into the Admonk agent system.

## Exit Gate — Handoff Complete

Ownership, documentation, known issues, and follow-up expectations are clear.

---

# 14. Approval Gates

The lifecycle uses gates to prevent expensive downstream rework.

| Gate | Question |
|---|---|
| Project Ready | Do we know what project this is and what sources/unknowns exist? |
| Understanding Approved | Do we understand the business, audience, objective, and constraints? |
| Alignment Approved | Do we understand the brand/design system and existing-project gaps? |
| Definition Approved | Are scope, journeys, IA, platform direction, and success criteria clear? |
| Content Ready | Is there enough real content/structure to design responsibly? |
| Creative Direction Approved | Is there a coherent visual/interaction idea? |
| Design Ready to Build | Is the responsive/systemized design clear enough to implement? |
| Feature Complete | Is the in-scope build present and ready for full QA? |
| Release Candidate | Have critical QA/performance/accessibility/SEO/function issues been resolved? |
| Live + Verified | Has production been verified after launch? |
| Handoff Complete | Can the client/team operate the delivered system responsibly? |

Not every small project requires a formal client meeting for every gate. The decision still needs to be explicit in project status.

---

# 15. Who Does What

## Admonk / Human Owner

Typically owns final judgment on:

- client relationship
- scope/commercial commitments
- strategic direction
- brand interpretation
- creative direction approval
- important tradeoffs
- client-facing approval
- launch authorization

## Agent

Should actively support/own:

- source gathering and organization
- research
- audits
- gap identification
- structured recommendations
- design-system mapping
- content analysis/drafting
- implementation
- code/platform work
- image/motion production support
- responsive checks
- performance review
- browser QA
- documentation
- decision/status tracking

The agent should challenge weak decisions with evidence, not merely execute them silently.

---

# 16. Change Management

Do not patch every late request directly into production.

Determine which decision the request changes.

Example:

```text
Client wants a different button color
→ Design-system change
→ update token/system + affected states

Client changes primary audience
→ Discovery/Definition change
→ revisit messaging, IA, creative direction, and design implications

Client adds membership/login
→ Definition/Platform change
→ revisit architecture, security, scope, QA
```

Return to the **earliest affected phase**, update the decision, then propagate forward.

This keeps the project coherent.

---

# 17. Existing Project / Admonk Website Mode

Do not restart an existing site from Phase 00 as if nothing exists.

Run a **reverse lifecycle audit**.

For each phase mark:

- Complete
- Partial
- Missing
- Conflicting
- Not applicable

Record:

- evidence
- missing information/work
- impact
- recommended action
- priority
- dependency

Then create a recovery sequence based on dependencies and business impact.

Example:

```text
Brand system complete
Content partial
Responsive inconsistent
Performance weak
Analytics missing

→ do not redesign brand
→ fix content gaps
→ fix responsive system
→ optimize performance
→ install/verify analytics
```

The process is therefore useful both for starting projects and diagnosing mature ones.

---

# 18. Daily Working Loop

Within any phase, use this short loop:

```text
READ CURRENT STATUS
      ↓
IDENTIFY NEXT DECISION / TASK
      ↓
CHECK REQUIRED CONTEXT
      ↓
DO THE WORK
      ↓
VERIFY THE RESULT
      ↓
RECORD MATERIAL DECISION / ISSUE
      ↓
UPDATE PROJECT STATUS
      ↓
CONTINUE OR REQUEST APPROVAL
```

This is the behavior both Admonk and the agent should learn until it becomes routine.

---

# 19. Standard Commands / Intent

When the user says:

## “Start a new project”

- initialize project context
- create status
- gather sources
- begin Phase 00/01

## “Continue the project”

- read `PROJECT-STATUS.md`
- read relevant current-phase docs
- read active `PROJECT-DECISIONS.md`
- continue the next unblocked action

## “What is missing?”

- run/update the lifecycle audit
- classify Complete / Partial / Missing / Conflicting
- prioritize gaps

## “Are we ready to design/build/launch?”

- check the relevant gate
- answer yes/no with missing gate requirements

## “Apply the process to this existing site”

- run reverse lifecycle audit
- do not assume the project should be rebuilt

---

# 20. Definition of Done

A project is not done because the page looks finished.

Admonk delivery requires, where applicable:

- business objective addressed
- client brand/design system respected
- real content approved/verified
- responsive behavior intentional
- accessibility reviewed
- performance/PageSpeed reviewed
- integrations/forms functional
- analytics implemented/verified
- SEO production checks complete
- browser QA complete
- production environment verified
- documentation/handoff complete
- known exceptions recorded

---

# Final Principle

> **Every phase should reduce uncertainty for the next one.**

The process exists so creativity can move faster without losing alignment, quality, performance, or technical discipline.