# FOUNDATION-M1 — Marketing Hub Revalidation

**Date:** 2026-09-26
**Product:** Marketing Hub
**Purpose:** Validate the Studio Foundation against a large, evidence-heavy product still in discovery.

## Revalidation rule
A finding becomes a Foundation defect only when the shared Foundation creates ambiguity, unnecessary burden or unsafe behavior across products. Marketing Hub-specific product decisions remain owned by the Marketing Hub repository.

## MH01 — Separate lifecycle from risk
**Decision:** LOCKED.

The previous Product Supervisor model used Prototype / Production / High-risk as one governance scale. Marketing Hub exposed the flaw: the application is clearly non-production, while discovery already uses real confidential business evidence.

### New model

**Lifecycle state**
- Prototype
- Production

**Independent risk overlays**
- REAL_OR_SENSITIVE_DATA
- CONSEQUENTIAL_ACTION
- REGULATED_OR_HIGH_IMPACT
- ELEVATED_PRIVILEGE_OR_BLAST_RADIUS

The overlays activate proportionate safeguards at any lifecycle state. They do not automatically change Prototype to Production.

### Lifecycle transition
Real data or a read-only live connector alone does not make a project Production. Move to Production when the product becomes an operational service relied upon by real users/business operations, or performs live external side effects as part of a real operating workflow.

### Consequences
- Marketing Hub discovery remains **Prototype**.
- Its real Kalam evidence activates **REAL_OR_SENSITIVE_DATA** controls.
- Consequential external actions remain prohibited today; if introduced, the CONSEQUENTIAL_ACTION overlay activates and real operational execution also triggers Production lifecycle.
- Low / Medium / High **release risk** remains separate and unchanged.
- High/Critical finding severity remains separate and unchanged.

### Accepted cost
One extra classification dimension in exchange for removing the dangerous assumption that “not live” means “not sensitive.”

## Next test
Continue Marketing Hub revalidation against discovery gating, product/domain authority, evidence/source-of-truth rules, tool adoption, and AI/data boundaries. Do not create MH02 unless another genuine Foundation defect appears.


## Final Marketing Hub scorecard

- **Lifecycle/gating:** PASS after MH01. Discovery remains Prototype; real data protection is handled by overlays.
- **Product/domain authority:** PASS. Marketing Hub remains authoritative for marketing semantics; shared suite/Foundation owns only reusable contracts/process.
- **Source of truth/evidence:** PASS. Provider-native systems own source metrics; Drive owns large operational evidence; GitHub owns product rules/specifications/pointers.
- **Product definition discipline:** PASS. Implementation remains blocked until MH-PS1 Product Definition Freeze.
- **Architecture simplicity:** PASS. No Production stack is frozen; modular/managed defaults remain provisional and complexity is explicitly budgeted.
- **Tool adoption:** PASS. n8n/Supabase/providers are not adopted merely for uniformity; workflow-by-workflow/tool-by-capability decisions remain required.
- **AI authority:** PASS. AI is not truth authority; read-only is the default; connector availability does not imply write permission; consequential execution is still blocked.
- **Design system:** PASS. No premature shared-component/token implementation is required before the product reaches the relevant design stage.
- **Production controls:** PASS. Release/observability/migration/performance/incident requirements remain dormant until implementation/Production makes them applicable.
- **Security/privacy:** PASS after MH01. Real evidence is protected without falsely declaring the application Production.
- **Data lifecycle:** PRODUCT GAP, not Foundation defect. Detailed Marketing Hub retention/export/deletion commitments remain open and must be resolved in the appropriate product/architecture gate. Current discovery must minimize sensitive copies and respect source/tenant handling rules.

## Final verdict — PASS

Marketing Hub validates the Studio Foundation as a serious discovery-stage product.

Foundation defect discovered and fixed:
- **MH01 — Separate lifecycle state from risk overlays**

No MH02 is justified by the current evidence.

The remaining open items belong to Marketing Hub product definition/architecture rather than the shared Studio Foundation.

**Next FOUNDATION-M1 stage:** repository contradiction/navigation audit.
