# FOUNDATION-M1 — BriefFlow Revalidation

**Fixture:** BriefFlow — AI Content Brief Workspace
**Date:** 2026-09-26
**Purpose:** Controlled crash test of the Studio Foundation before Marketing Hub revalidation.

## Baseline fixture
A small internal web app where:
- user enters campaign context + content goal;
- AI drafts a structured content brief;
- user edits and approves it;
- approved briefs are stored/searchable;
- no sensitive customer data;
- no autonomous external writes.

## Escalation fixture
Add a CMS connector and request:
> Allow the AI to publish an approved article directly to Production.

The test asks whether the Foundation stays lightweight at baseline and increases control only when consequence increases.

## BF01 — Progressive artifact splitting
**Decision:** LOCKED.

Low-risk Prototypes require the necessary information, not four separate governance files. One compact Prototype Definition may combine product/scope, capability, basic architecture/risk and current state. Split dedicated artifacts when complexity, risk, duration or Production maturity makes the separation useful.

**Why:** governance should follow risk and learning need, not document count.

**Foundation changes:** Product Supervisor, Product Supervisor skill, project-governance README, self-audit fixture and Prototype Definition template updated.

## Next test
Run the CMS-read / Production-publish escalation through:
- S004 AI Autonomy;
- S015 Progressive Delivery;
- S020 Secrets;
- S025 Incident/Recovery;
- PB02 Production Release;
- PB03 AI Change;
- Product Supervisor action classes/permission boundaries.

Do not create BF02 unless the escalation exposes a real decision/gap.


## BF02 — Action-bound approval without double approval
**Decision:** LOCKED.

A consequential action still requires human approval, but approval must be bound to the actual action being authorized. One approval is enough when it explicitly covers the exact action, target and material parameters/content and remains valid.

Examples:
- **Approve Draft** → does not authorize Production publishing.
- **Approve & Publish this exact article to Site X** → may authorize the publish action without another confirmation.
- Material content/action/target change, expiry or revocation → re-approval required.

**Why:** preserve meaningful human control without creating approval fatigue or ceremonial double confirmation.

**Foundation changes:** S004, AI autonomy doctrine, Product Supervisor Control Matrix/action classes, PB03, capability manifest template and BriefFlow self-audit updated.

## Escalation result
The CMS publishing scenario now has a coherent proportional path:
1. CMS read access does not imply write/publish authority.
2. Production publish is EXECUTE_CONSEQUENTIAL.
3. Connector permission is narrowly scoped to the publish capability.
4. Human approval is bound to the exact Production action.
5. Audit evidence records actor, approved action and result.
6. Recovery/rollback is required where feasible.
7. If the article/target/action materially changes after approval, re-approval is required.
8. A redundant second confirmation is not required when the existing approval remains valid.

No additional Foundation decision is required for this scenario.
