# R011 — Design / Code / Figma Drift Policy

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** LOCKED — C selected and decision cost explicitly accepted 2026-09-26  
**Target:** `research/design-system-drift.md`, future `design-foundation/design-drift-policy.md`, token/source-of-truth rules

## Research question

What should be authoritative when Figma, design tokens, code components and rendered production UI disagree—and how much synchronization automation should Admonk pay for at the current maturity level?

## Source A — Figma Code Connect + Variables API

**Source:** SRC-DRIFT-001

Figma provides two relevant mechanisms:

1. **Code Connect** maps Figma components to actual code components so Dev Mode and AI agents can use production component references instead of generic generated snippets.
2. **Variables REST API** can integrate variables with CI and can synchronize a design-system source of truth to and from Figma.

### What it optimizes for

Keeping design and implementation close together from the design-tool side.

### Strongest ideas for Admonk

- design components can be linked to actual production components rather than guessed equivalents;
- property/variant mappings make handoff and AI implementation more accurate;
- token/variable synchronization can be automated;
- Figma can become a strong shared design context for designers, engineers and agents;
- one design component can map to multiple implementation frameworks.

### Challenge

A Figma-centered synchronization model has real costs:

- Code Connect availability is tied to paid Organization/Enterprise seats;
- Variables REST API requires Enterprise;
- the design artifact still does not prove actual runtime behavior;
- bidirectional sync creates conflict-resolution questions: what happens when Figma and code both changed?
- API/tooling dependence increases vendor lock-in;
- a perfectly synchronized Figma library can still represent a broken production component;
- synchronizing every local/Trial asset would contradict Admonk's progressive maturity model.

Figma is strongest as the **design intent + mapping bridge**, not automatically the universal source of truth.

## Source B — Storybook design integrations + visual/component tests

**Source:** SRC-DRIFT-002

Storybook takes a code-rendered approach:

- stories render actual UI components in browser states;
- Figma designs can be embedded in Storybook;
- Storybook stories can be linked back into Figma;
- visual tests compare rendered UI against previous known-good baselines;
- component tests exercise actual behavior;
- accessibility checks can run against stories.

### What it optimizes for

Making the implemented component/state observable and testable.

### Strongest ideas for Admonk

- code behavior is verified where it actually runs;
- states can be isolated and reviewed;
- designers can compare implementation and design without pretending they are the same artifact;
- visual regression can detect code drift;
- implementation documentation can stay close to the component;
- code changes participate naturally in repository review/CI.

### Challenge

A code/Storybook-centered model also has costs:

- it can make implementation become "truth" even when it implemented the design incorrectly;
- design intent may lag or be lost if Figma is treated only as reference;
- maintaining stories/tests is work;
- Chromatic or similar hosted visual testing adds vendor/cost considerations;
- Storybook does not solve token-source synchronization by itself;
- product teams may prematurely build Storybook infrastructure for Local/Candidate assets that do not warrant it.

Storybook is strongest as the **implemented-behavior verification layer**, not the authority for creative/product design intent.

## Core finding

There should not be one universal source of truth for every kind of design information.

Trying to make Figma authoritative for runtime behavior is wrong.

Trying to make production code authoritative for unresolved design intent is also wrong.

The more useful principle is:

> **One canonical authority per artifact type, with explicit bridges between them.**

## Decision options

### A. Figma-centered synchronized system

Figma variables/components are the primary design-system source; code synchronizes to/from Figma; Code Connect links implementations.

**Benefit**
- designer-friendly;
- strong visual-library coherence;
- direct design-tool control.

**Price**
- higher Figma plan/vendor dependence;
- bidirectional conflict handling;
- runtime verification still required separately;
- sync automation becomes infrastructure to maintain.

### B. Repository/runtime-centered system

Repository token files and code components are authoritative. Figma consumes/mirrors them and serves mainly as design/reference.

**Benefit**
- versionable, testable and CI-friendly;
- strongest engineering/runtime authority;
- lower dependence on Figma APIs.

**Price**
- designers may feel downstream of code;
- Figma can lag;
- exploration and product-specific visual decisions may be forced prematurely into code-shaped constraints;
- design drift can become socially normalized.

### C. Artifact-specific authority + selective automation — RECOMMENDED

Assign one authority per information type:

| Information | Canonical authority at relevant maturity |
|---|---|
| Studio/product doctrine | Repository |
| Stable shared token definitions | Repository, DTCG-compatible token files when Level 2 implementation begins |
| Runtime component behavior/API | Production code |
| Implemented component states/evidence | Code + Storybook/tests when justified |
| Design intent / product-specific composition | Approved Figma design or explicit product design artifact |
| Figma-to-code component relationship | Code Connect mapping when the component maturity justifies it |
| Actual production behavior | Deployed product / runtime evidence |

Do not build mandatory bidirectional sync at Level 1/early Level 2.

Use one-way or mapped bridges first:
- repository tokens → code;
- repository tokens → Figma mirror when useful/tooling permits;
- Figma component ↔ Code Connect mapping;
- Figma reference ↔ Storybook story;
- Storybook/tests → implementation evidence.

Automate drift detection only when the cost of material drift is repeatedly greater than the automation cost.

## Decision type

**Layered choice, not a true hybrid.**

Figma and Storybook/code own different artifact types.

The system does **not** say "both are the source of truth."

It says:
> **each fact has one canonical home.**

## Drift classes

### Class 1 — Material drift
Examples:
- accessibility behavior differs;
- supported states/variants differ;
- token semantic meaning differs;
- destructive/recovery interaction differs;
- component API/behavior differs from documented design contract.

Requires tracked resolution.

### Class 2 — Intentional product variation
Examples:
- product-specific density;
- visual expression;
- layout composition;
- domain-specific copy or information hierarchy.

Not drift when explicitly owned at the product/domain layer.

### Class 3 — Cosmetic/non-material drift
Small differences that do not change meaning, accessibility, behavior, brand intent or quality.

May be accepted until normal maintenance if fixing it costs more than the difference matters.

## Automation maturity

### Level 1
Manual authority declaration + review.
No automated synchronization requirement.

### Level 2
For Stable semantic tokens and proven components:
- machine-readable token source;
- basic mapping/version metadata;
- targeted checks where cheap.

### Level 3
When domain/shared assets justify it:
- component workbench if adopted;
- targeted visual/accessibility regression;
- drift reporting for high-value shared assets.

### Level 4
Only if multiple products and change volume justify it:
- broader automated synchronization;
- consumer impact checks;
- richer Figma/code/token drift automation.

## Decision Cost Ledger — Option C

**Benefit gained:**  
Clear authority without forcing one tool to own information it cannot prove.

**Problem solved:**  
Avoids both runtime-vs-design ambiguity and expensive perfect synchronization.

**New problem introduced:**  
People/agents must understand which artifact is authoritative for which fact.

**Complexity / operating cost:**  
Low/Moderate now. Metadata and review are needed; automation grows only from evidence.

**Speed cost:**  
Low now. No mandatory sync pipeline for Local/Candidate assets.

**Governance / cognitive cost:**  
Moderate. Authority matrix and drift classification must remain explicit.

**Flexibility / differentiation cost:**  
Low. Figma can remain strong for product-specific design while code remains authoritative for runtime behavior.

**Migration/exit cost:**  
Low/Moderate. Repository token authority reduces tool lock-in, but future Figma automation may require mapping/migration.

**Vendor cost:**  
Lower than Figma-centered full automation initially. Advanced Figma Variables API would require Enterprise; hosted visual testing may later add cost if adopted.

**AI/token/tool cost:**  
Positive if mappings reduce implementation guessing. Avoiding constant full-artifact synchronization also avoids unnecessary automated processing.

**Who pays:**  
Design/foundation owners pay authority/drift-review cost; engineering pays tests/mappings only for assets whose maturity justifies them.

**When cost appears:**  
During handoff, shared-asset changes, and promotion to Trial/Stable.

**Containment:**  
- one authority per fact;
- no mandatory two-way sync;
- automation only after measured drift pain;
- mappings only for sufficiently mature components;
- explicit accepted-drift state;
- one owner for each material discrepancy.

**Revisit trigger:**  
- repeated token mismatch;
- frequent design/code implementation disputes;
- multi-product shared assets change often enough that manual review becomes costly;
- Figma/API plan/tooling becomes economically justified;
- Storybook or equivalent clearly pays for itself in defect reduction.

## Synthesis Compatibility Check

This is layered, not "best of both worlds."

We deliberately do **not** buy:
- full bidirectional token synchronization now;
- mandatory Code Connect for Local assets;
- mandatory Storybook for every component;
- perfect Figma/code pixel parity;
- an Enterprise Figma dependency merely to achieve theoretical synchronization.

The accepted residual problem is:
> **some drift will exist temporarily and must be triaged rather than eliminated automatically.**

## Proposed rule

> **One canonical authority per fact. Use mappings and tests to connect artifacts. Automate only material drift whose recurring cost exceeds the automation cost.**

## Product-owner decision and cost acceptance

Which direction should Admonk lock?

### A. Figma-centered synchronization
Use Figma as the main design-system authority and invest earlier in API/Code Connect synchronization.

**Benefit:** strong design-tool coherence.  
**Price:** higher vendor/plan dependence and synchronization infrastructure.

### B. Repository/runtime-centered
Make repository tokens and code the main authority; treat Figma largely as design reference.

**Benefit:** simpler engineering governance.  
**Price:** design intent and designer workflow become more downstream from implementation.

### C. Artifact-specific authority + selective automation — RECOMMENDED
Repository owns doctrine and Stable shared token definitions; code owns runtime behavior; Figma owns approved design intent/composition; mappings/tests connect them; automation grows only from observed drift cost.

**Benefit:** each tool owns what it can actually prove.  
**Price:** moderate authority/governance discipline and acceptance of some temporary drift.

## Locked Admonk direction

**C — Artifact-specific authority + selective automation.**

Explicit price:
> **Admonk accepts some temporary, tracked drift and moderate authority-management work so it does not pay for fragile perfect synchronization or force design and runtime truth into one tool.**

## Lock result

- Artifact-specific authority + selective automation locked.
- Temporary tracked drift and moderate authority-management work explicitly accepted.
- Repository is the future authority for Stable shared token definitions at Level 2.
- Code owns runtime behavior; approved design artifacts own design intent; deployed runtime remains behavioral evidence.
- Automation/tool adoption remains evidence-triggered.
- R011 locked under the Decision Cost & Coupling Framework.
- Priority 2 Design Foundation research complete.
- Next item: R012 — Minimum Production Feedback Loops.
