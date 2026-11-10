# Design Foundation — Document Contracts

These contracts define what each future Design Foundation document must answer.

They intentionally do **not** pre-populate design doctrine, token values, visual style or component APIs.

## design-principles.md

**Purpose:** State approved, research-backed design-system principles that apply across Admonk products without imposing one visual identity.  
**Must answer:** What should be consistent across products? What should remain product-specific? What makes reuse valuable versus constraining?  
**Required evidence:** Design-system research, accessibility/usability evidence, product validation.  
**Must not contain:** One universal aesthetic, palette, typeface, density or dashboard style.

## design-tokens.md

**Purpose:** Define the token architecture and semantic roles used to express approved design decisions consistently.  
**Approved direction:** Lean semantic-first + evidence-gated component tokens.  
**Architecture:** Reference/primitive values support themes; semantic roles are the normal public contract; component tokens are introduced only from proven customization/reuse need.  
**Interchange direction:** Prefer the stable DTCG 2025.10 format where selected tools support the needed subset reliably. This is not a mandatory tooling/source-of-truth decision.  
**Must answer:** Which semantic roles are justified? Which values are product-theme-owned? Which component-level needs have earned tokens? How are platform/design-tool outputs synchronized?  
**Required evidence:** Cross-platform implementation needs + design-system research + real product usage.  
**Must not contain yet:** Unresearched numeric scales, copied vendor token values, a speculative universal component-token layer, or a prematurely selected canonical token-management tool.

## component-governance.md

**Purpose:** Define when a component should be reused, extended, created, promoted, deprecated or extracted.  
**Approved governance:** Use `component-promotion-policy.md` with Local → Candidate → Trial → Stable → Deprecated.  
**Must answer:** What qualifies as a component? What evidence is proportional to its scope/consequence? Who owns it? What maintenance/compatibility promise exists? How are breaking changes reviewed?  
**Required evidence:** Real product usage, semantic fit, relevant quality evidence, and maintenance economics proportional to the promotion level.  
**Must not contain:** Premature shared abstractions based only on visual similarity, mandatory user research for every primitive, or a fixed reuse-count rule for every asset.

## interaction-states.md

**Purpose:** Define the expected state model for reusable interactive components and product surfaces.  
**Must answer:** Which states are universal, conditional, domain-specific or product-specific? How is async/error/permission behavior represented?  
**Required evidence:** UX research, accessibility guidance, product validation.

## accessibility-rules.md

**Purpose:** Translate approved accessibility doctrine and authoritative requirements into reusable design-system constraints.  
**Approved baseline:** Production web products target WCAG 2.2 AA; material interactions receive manual critical-journey verification; non-critical gaps require documented time-bound exceptions.  
**Must answer:** Which requirements are universal? Which depend on platform/context? What automated/manual/user evidence is required? What is release-blocking?  
**Required evidence:** Current authoritative accessibility standards plus real implementation/manual interaction evidence. Automated scanning alone is insufficient.

## responsive-rules.md

**Purpose:** Define cross-product responsive principles without imposing one layout system.  
**Must answer:** What behavior must remain invariant across viewport/input changes? What may adapt? How are complex/data-heavy surfaces handled?  
**Required evidence:** UX research + implementation evidence.

## content-guidelines.md

**Purpose:** Define reusable product-interface content guidance while preserving each product's brand voice.  
**Must answer:** What makes labels/errors/empty states/help text understandable? What must be disclosed for AI-generated content? What belongs to product voice?  
**Required evidence:** Content-design research + product testing.

## contribution-and-review.md

**Purpose:** Define how the foundation evolves safely.  
**Must answer:** When is design-system review required? What evidence supports new patterns/components/tokens? How are exceptions handled? How are changes validated across consumers?  
**Required evidence:** Real cross-product usage and governance research.


## Planned research outputs

Do not create these as authoritative documents until the relevant research is synthesized and approved.

### design-system-doctrine.md
**Type:** Doctrine  
**Purpose:** State the researched beliefs governing shared product-design foundations and product-specific expression.

### design-foundation-standard.md
**Type:** Standard  
**Purpose:** Convert approved doctrine into testable requirements for reusable design foundations.

### component-promotion-policy.md
**Type:** Standard / governance policy  
**Purpose:** Define evidence required to move a local component/pattern through the promotion ladder.

### design-review-playbook.md
**Type:** Playbook  
**Purpose:** Define how risk/impact-routed design-system reviews are performed and evidenced.

### design-drift-policy.md
**Type:** Standard / operations policy  
**Purpose:** Define authority, review cadence, acceptable drift, automation, and resolution ownership between design/code/token sources.

### design-system-maturity-model.md
**Type:** Standard / planning model  
**Purpose:** Define optional maturity levels and evidence-based progression without forcing every product to reach the highest level.

The current provisional maturity research lives at:
`../research/design-system-maturity-model.md`
