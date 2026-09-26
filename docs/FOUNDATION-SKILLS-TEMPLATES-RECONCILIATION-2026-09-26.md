# FOUNDATION-M1 — Skills & Templates Reconciliation Audit

**Date:** 2026-09-26
**Scope:** Shared Admonk product/app skills, Product Supervisor/governance templates and Design Foundation artifacts.
**Result:** PASS WITH TARGETED FIXES — reconciliation complete for FOUNDATION-M1 baseline.

## Method
Compare existing reusable guidance against approved S001–S030 and PB01–PB07. Change only hard contradictions, stale authority/status, or missing canonical routing. Do not rewrite healthy specialist guidance merely for stylistic consistency.

## Fixed
1. **Exception semantics:** replaced legacy “No permanent exceptions” rule with S030/PB07 Temporary/Permanent model.
2. **Accessibility exception semantics:** temporary gaps remain time-bound; explicitly approved Permanent exceptions remain reviewable and cannot be misrepresented as WCAG conformance.
3. **Release risk:** Product Supervisor now distinguishes product governance level from PB02 Low/Medium/High release risk.
4. **Design Foundation status:** root AGENTS no longer describes the approved baseline as merely research/scaffolding.
5. **Governance templates:** Product Brief aligned to PB01; Release Audit aligned to PB02; Exception Register aligned to S030/PB07.
6. **Canonical Foundation population:** S001–S030, PB01–PB07 and missing T024–T028 decisions promoted into the repository; Foundation Index/Status updated.

## Confirmed materially aligned — no rewrite required
- `.agents/skills/admonk-product-supervisor/SKILL.md`
- `.agents/skills/admonk-simplicity-engineering/SKILL.md`
- `.agents/skills/admonk-organization-reuse/SKILL.md`
- `.agents/skills/admonk-security-review/SKILL.md`
- `.agents/skills/admonk-performance/SKILL.md`
- `.agents/skills/admonk-deployment/SKILL.md`
- `.agents/skills/admonk-analytics/SKILL.md`
- `.agents/skills/admonk-figma/SKILL.md`
- `.agents/skills/admonk-supabase/SKILL.md`
- Design Foundation component-promotion and drift rules.

## Important interpretation
The Design Foundation rule that repository machine-readable files are canonical for **Stable shared token definitions** is compatible with S013: Figma owns design intent, while repository token files may own the machine-readable shared-token contract. These are different information types under S027. Drift must be resolved rather than silently choosing whichever copy is convenient.

## Deferred by design
- Do not force every specialist skill to repeat all Standards/Playbooks.
- Do not retrofit Product Platform Foundation (M2) contracts into M1.
- Do not rewrite client/web-experience templates unless a real project validation shows a conflict.
- Marketing Hub-specific reconciliation belongs to the later Marketing Hub revalidation stage.

## Exit conclusion
The shared skills/templates baseline is consistent enough to proceed to **BriefFlow revalidation**. Any new contradiction discovered by BriefFlow becomes a Foundation defect to fix before Marketing Hub revalidation.
