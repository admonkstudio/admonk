# Admonk Product Supervisor — Changelog

## 2.0.0 — 2026-09-26

Major governance release included in **Admonk Studio Foundation v1.0.0**. This release changes lifecycle classification, approval semantics and required governance behavior, so it is versioned as a major Product Supervisor release.

### Added / changed
- S001–S030 canonical Studio Standards and PB01–PB07 workflow playbooks.
- BF01 — low-risk/simple Prototypes require the necessary information, not four mandatory separate files; one Prototype Definition may split progressively as complexity/risk/maturity grows.
- BF02 — consequential approval is action-bound; one valid approval may authorize the exact action without ceremonial double confirmation; material action/target/content change, expiry or revocation requires re-approval.
- MH01 — lifecycle and risk are separate dimensions:
  - lifecycle: Prototype / Production;
  - overlays: REAL_OR_SENSITIVE_DATA, CONSEQUENTIAL_ACTION, REGULATED_OR_HIGH_IMPACT, ELEVATED_PRIVILEGE_OR_BLAST_RADIUS.
- “High-risk” is no longer a lifecycle/governance state; High remains valid for release risk and finding severity.
- Temporary/Permanent exception semantics aligned to S030/PB07.
- Product Brief, Release Audit, Exception Register, Prototype Definition, Project State and Complexity Budget templates reconciled to the Foundation.
- Design Foundation Level-1 baseline approved for accessibility, promotion, semantic tokens and design↔code authority.

### Validation
- BriefFlow revalidation — **PASS** after BF01/BF02.
- Marketing Hub revalidation — **PASS** after MH01.
- Marketing Hub product-specific open gap retained: detailed retention/export/deletion commitments remain a product requirement and do not block Studio Foundation validation.

---

## 1.1.0 — 2026-09-26

Backward-compatible quality/governance expansion.

### Added
- `admonk-organization-reuse`;
- `admonk-simplicity-engineering`;
- project `complexity-budget.md` template;
- risk/change-impact specialist routing;
- complete-state UI rule;
- evidence-based quality rule;
- stable-concept reuse policy;
- early-lifecycle organization/simplicity participation;
- explicit coordination principle: central coordination, specialized execution, shared canonical state, evidence-based gates, no duplicated authority.

### Strengthened
- UX Systems with complete-surface and evidence requirements;
- Design Quality with evidence-based review;
- Capability Router with organization/simplicity routing;
- Product Supervisor skill with proportional specialist selection.

### Validation
BriefFlow:
- `labs/product-supervisor-self-audit/brief-flow/ORGANIZATION-REUSE-AUDIT.md` — PASS
- `labs/product-supervisor-self-audit/brief-flow/SIMPLICITY-ENGINEERING-AUDIT.md` — PASS

Marketing Hub:
- Product-level Organization & Reuse audit — PASS WITH FINDINGS
- Product-level Simplicity-First Engineering audit — PASS WITH CONSTRAINTS
- project complexity budget established before architecture freeze

No additional runtime tools/connectors were added as part of this release.


## 1.0.0 — 2026-09-26

First stable governance baseline.

### Included
- PS-0 through PS-7 lifecycle;
- Prototype / Production / High-risk governance levels (historical model; superseded by Product Supervisor v2.0.0 lifecycle + risk-overlay model);
- progressive project artifacts;
- Build Readiness Gate;
- Product Release Audit;
- Project Decision Log;
- Assumptions & Open Questions Register;
- Technical Debt & Scale Register;
- Control Matrix;
- machine-readable Capability Permission Manifest;
- Exception Register;
- Evidence Index;
- adversarial/release-blocker review;
- evidence-based scaling;
- model-neutral AI/agent governance;
- reusable project-governance templates.

### Validation
Self-audit fixture:
`labs/product-supervisor-self-audit/brief-flow/`

Result:
**PASS**

The self-audit exposed and corrected one framework gap: required pre-build MVP/Capability and Architecture/Risk artifacts existed in policy but initially lacked reusable templates.

### Next validation
Apply v1.0.0 to Marketing Hub as the first substantive real-project validation.

Any material rule changes discovered during that validation should be versioned according to the semantic-versioning policy in `docs/PRODUCT-SUPERVISOR.md`.
