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
