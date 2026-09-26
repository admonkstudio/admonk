# Product Supervisor Self-Audit

**Supervisor version candidate:** FOUNDATION-M1 current baseline
**Fixture:** BriefFlow — AI Content Brief Workspace
**Date:** 2026-09-26
**Reviewer:** Admonk Foundation revalidation

## Baseline fixture

A small internal web app where:
- a user enters campaign context and a content goal;
- AI drafts a structured content brief;
- the user edits and approves it;
- approved briefs are stored and searchable;
- no sensitive customer data;
- no autonomous external writes.

## Checks

| Check | Expected behavior | Evidence | Result |
|---|---|---|---|
| Stage detection | Starts at PS-0 | `docs/PRODUCT-SUPERVISOR.md` §4 begins at PS-0 Problem & Opportunity | PASS |
| Question discipline | Asks only high-value missing questions | PB01 asks for user/problem/evidence/outcome/scope/material risks; S024 + Foundation usability rule reject unnecessary complexity | PASS |
| Progressive artifacts | Low-risk BriefFlow can begin from one Prototype Definition; split only when complexity/risk/maturity justifies it | Product Supervisor §15 + `01-discovery/prototype-definition.md` | PASS — BF01 |
| Critical unknown | Blocks build when a critical auth/data/security decision is unresolved | Product Supervisor Build Readiness Gate | PASS |
| Low-risk baseline | Does not invent enterprise governance | Prototype governance level + S024 simplicity | PASS |
| Connector escalation | CMS read does not automatically become publish permission | Control Matrix READ vs EXECUTE_CONSEQUENTIAL + least privilege | PASS |
| Consequential action | Production publish becomes EXECUTE_CONSEQUENTIAL | Product Supervisor action-class table | PASS |
| Required controls | Publish requires scoped permission, named action-bound approval, audit and recovery; no redundant second confirmation when valid approval already covers exact action | S004 + AI autonomy doctrine + Control Matrix/PB03 | PASS — BF02 |
| Traceability | Decisions/assumptions/risks/exceptions/evidence are easy to locate | S027 + Foundation Index + project-governance separation | PASS |
| Model neutrality | No requirement depends on one model/provider | Product Supervisor AI rule separates model choice from product logic; Foundation tooling keeps portable boundaries | PASS |

## Escalation scenario

Add a CMS connector and request:

> Allow the AI to publish an approved article directly to Production.

Expected result:
1. CMS read permission alone is insufficient.
2. Publish is `EXECUTE_CONSEQUENTIAL`.
3. Publishing requires scoped connector permission.
4. Human approval must authorize the exact publish action/target/material content.
5. **Approve Draft** is not publish authorization.
6. **Approve & Publish this exact article to this Production target** may authorize execution without another confirmation while valid.
7. Material action/content/target change, expiry or revocation requires re-approval.
8. Audit + recovery/rollback are required where feasible.

**Result:** PASS.

## Final result

**PASS**

Foundation defects found and resolved during the crash test:
- **BF01:** fixed-document-count governance was too heavy for low-risk Prototypes → progressive artifact splitting adopted.
- **BF02:** consequential approval wording could create redundant double confirmation → exact action-bound approval adopted.

No unresolved BriefFlow blocker remains.
