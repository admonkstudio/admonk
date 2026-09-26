# R008 — Design-System Maturity Direction

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** Awaiting product-owner Q1 + cost acceptance  
**Target:** `research/design-system-maturity-model.md`, Design Foundation governance, Marketing Hub design-stage expectations

## Research question

How mature should the Admonk Design Foundation become before and during its first serious product use, so it provides real quality leverage without becoming a large theoretical system that slows product learning?

## Source A — Carbon Design System lifecycle

**Source:** SRC-DESMAT-001

Carbon uses a formal asset lifecycle:
- Draft;
- Preview candidate;
- Preview;
- Stable.

Its current component checklist treats "Stable" as a high bar across design, code, documentation, accessibility and production readiness.

### What it optimizes for
Predictable reusable-asset quality and clear maturity status.

### Strongest ideas for Admonk
- reusable assets should expose maturity rather than pretending every component is equally stable;
- "stable" should mean more than "looks finished";
- design/code/docs/accessibility should converge before a shared asset becomes a durable dependency;
- lifecycle status makes breaking-change expectations clearer;
- maturity can increase progressively rather than requiring perfection at creation.

### Challenge
Copied literally:
- the documentation/review burden can exceed the value of a young component;
- teams may spend too long making a reusable asset "Stable" before proving the product need;
- a studio with one initial consumer can create process designed for a large community of consumers;
- design-system work can become its own roadmap independent of product outcomes.

Carbon is strongest as an **asset-maturity/lifecycle model**.

## Source B — GOV.UK Design System contribution + Trial lifecycle

**Source:** SRC-DESMAT-002

GOV.UK requires a proposed component/pattern to be:
- useful;
- unique;
- backed by evidence;
and before publication to be usable, consistent and versatile.

Current GOV.UK guidance also supports **Trial** components: usable components can enter real services before being considered Stable, allowing feedback and evidence to accumulate.

### What it optimizes for
Evidence-led system growth from real service needs.

### Strongest ideas for Admonk
- do not build a shared asset just because it seems theoretically reusable;
- demonstrate user need and reuse before system promotion;
- real-product usage can precede stable status;
- accessibility/user evidence should be part of promotion;
- trial status makes uncertainty visible rather than hiding it;
- a design system should learn from consumers, not dictate them.

### Challenge
Copied literally:
- waiting for many use cases can leave obvious common behavior duplicated;
- evidence gathering can be slower than a small studio needs;
- community-style prioritization is unnecessary for Admonk's early scale;
- "trial" assets still require enough quality to be safe in production, which can be misread as permission to ship half-finished UI.

GOV.UK is strongest as an **evidence-before-promotion model**.

## Research finding

The sources are less opposed than they first appear.

Both reject:
- instant "stable" status;
- building reusable components without evidence;
- treating a design system as a static finished library.

The useful difference is emphasis:

- Carbon makes **maturity status and completeness** explicit.
- GOV.UK makes **real-product evidence and promotion criteria** explicit.

This is not a reason to blindly combine every process from both.

## Decision type

**Conditional / staged choice.**

Admonk should use different levels of system investment at different evidence stages rather than running both full governance systems simultaneously.

## Decision Cost Ledger — recommended direction

### Benefit gained
- Design Foundation exists early enough to protect accessibility/behavior quality.
- Marketing Hub can create real product evidence without waiting for a huge component library.
- Components/patterns can expose maturity and breaking-change risk.
- Stable cross-product assets are promoted only when maintenance is justified.
- Future products inherit proven patterns rather than theoretical ones.

### Problem solved
Avoids both:
- premature design-system platform building; and
- uncontrolled local component drift.

### New problem introduced
Temporary duplication and later migration.

Some early Marketing Hub components may remain local, then need:
- refactoring;
- renaming;
- token migration;
- API cleanup;
- documentation;
- cross-product extraction.

### Complexity / operating cost
**Low now → Moderate later.**

Early governance remains light.
Promotion to Stable/cross-product status becomes deliberately more expensive.

### Speed cost
**Low initially.**
A product can use a local or Trial asset without waiting for full cross-product maturity.

### Governance / cognitive cost
**Moderate.**
Every reusable asset needs a visible maturity/ownership state once it enters the shared system.

### Flexibility / differentiation cost
**Low.**
Products may solve local/domain needs without forcing them into the shared foundation.

### Migration / exit cost
**Moderate.**
Local/Trial assets may later need migration to an approved shared asset.

### AI/token/tool cost
**Low/positive.**
A clear maturity state should reduce AI re-analysis/reinvention. It may increase repository context/documentation modestly.

### Who pays
- early product team pays local implementation cost;
- later foundation owner pays promotion/migration cost;
- consumers pay compatibility migration only when they adopt a promoted shared asset.

### Containment
- no shared asset without owner;
- no Stable status without required evidence;
- no forced promotion from local/domain to foundation;
- migration only when the central value exceeds migration cost;
- allow Trial/shared candidate status;
- deprecate shared assets that stop paying for themselves.

## Proposed Admonk maturity model

### Level 0 — Local
No shared Design Foundation dependency beyond universal safety/accessibility doctrine.

Use for:
- experiments;
- highly product-specific work;
- unproven patterns.

### Level 1 — Foundation rules
Approved:
- design principles;
- accessibility/state rules;
- responsive/interaction expectations;
- product-vs-family boundaries;
- contribution/promotion rules.

**Admonk is approaching this level now.**

### Level 2 — Semantic foundation + first proven assets
Add only when a serious product needs them:
- semantic token architecture;
- small proven primitive/component set;
- component maturity labels;
- implementation/documentation basics.

**Marketing Hub may become the first serious consumer.**

### Level 3 — Domain system
After repeated real use:
- stable domain patterns;
- component workbench/documentation if justified;
- visual/regression checks where valuable;
- governed deprecation/promotion.

### Level 4 — Cross-product governed system
Only after multiple real products prove common semantics:
- cross-product components/patterns;
- versioning/compatibility;
- consumer-impact testing;
- drift management;
- shared package/service only where justified.

## Component/asset maturity labels

Separate **product-system maturity** from **individual asset maturity**.

Candidate asset lifecycle:

```text
Local
→ Candidate
→ Trial
→ Stable
→ Deprecated
```

### Local
Owned by one product. No shared compatibility promise.

### Candidate
Potentially reusable. Evidence gathering underway.

### Trial
Approved for limited real use. Behavior/accessibility baseline met, but API/visual details may still evolve.

### Stable
Shared contract is proven, documented, tested, owned and versioned appropriately.

### Deprecated
Still supported for migration period but not for new use.

## Synthesis Compatibility Check

This is **not** a full Carbon + GOV.UK hybrid.

Admonk should borrow only:
- explicit maturity states from the formal lifecycle idea;
- evidence-before-promotion from the service-driven model.

Do **not** import:
- Carbon's full enterprise contribution machinery;
- GOV.UK's community voting/governance process.

### Hybrid penalty avoided
By keeping:
- one lightweight lifecycle;
- one promotion policy;
- one owner;
- project evidence as the promotion trigger.

## Proposed direction

> **Start with foundation rules. Let real products create candidates. Let evidence promote assets. Make stability expensive enough to mean something.**

## Q1 — maturity cost acceptance

Which maturity direction should Admonk lock?

### A. Foundation-first Level 2 before serious product design
Define semantic tokens and a shared starter component set before Marketing Hub's serious UX work.

**Benefit:** more consistency from day one.  
**Price:** delays product learning and risks theoretical components/tokens.

### B. Progressive evidence-gated maturity — RECOMMENDED
Lock Level 1 rules first. Let Marketing Hub create Local/Candidate/Trial assets as needed. Promote only proven assets. Reach Level 2/3 from real use, and Level 4 only after cross-product evidence.

**Benefit:** preserves quality rules while keeping system investment tied to product evidence.  
**Price:** accepts temporary local duplication and later migration/refactoring.

### C. Product-first, design system later
Keep almost everything local through Marketing Hub. Build the reusable Design Foundation only after a second product exposes common needs.

**Benefit:** fastest immediate product work.  
**Price:** higher inconsistency/rework risk and delayed accessibility/interaction standardization.

## Research recommendation

**B — Progressive evidence-gated maturity.**

The price is explicit:
> **Admonk accepts some temporary duplication and future migration cost in exchange for avoiding a speculative shared system.**

This is consistent with the approved engineering doctrine:
**simple core + deliberate change seams**.

## Lock plan after Q1

If B and its price are accepted:
1. lock the maturity model;
2. update `research/design-system-maturity-model.md`;
3. add asset maturity labels to Design Foundation governance;
4. clarify Marketing Hub may create local/trial assets without immediate foundation promotion;
5. lock R008;
6. move to R009 — Token architecture direction.
