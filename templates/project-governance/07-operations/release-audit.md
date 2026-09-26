# Product Release Audit

**Playbook:** `playbooks/PB02-production-readiness-release.md`

**Release:**
**Environment:**
**Governance level:** Prototype / Production / High-risk
**Release risk:** Low / Medium / High
**Date:**
**Accountable owner:**
**Supervisor/reviewer:**

## Decision
**PASS / PASS WITH ACCEPTED RISKS / BLOCKED**

## Universal Production minimum
Confirm applicable minimum:
- critical behavior works;
- automated quality checks pass;
- secrets/access remain protected;
- no material issue is silently ignored;
- affected critical journey verified;
- failure detection exists where failure matters;
- recovery/mitigation path known.

## Risk-triggered evidence
Apply only what the change affects.

| Requirement | Domain | Risk | Evidence link/result | Status | Owner | Remediation/cleanup | Release effect |
|---|---|---|---|---|---|---|---|
|  | Product truth |  |  | Pass / Risk accepted / Blocked |  |  |  |
|  | UX & accessibility |  |  |  |  |  |  |
|  | Security & privacy |  |  |  |  |  |  |
|  | Code & delivery |  |  |  |  |  |  |
|  | Reliability/recovery |  |  |  |  |  |  |
|  | Data/migration integrity |  |  |  |  |  |  |
|  | API compatibility |  |  |  |  |  |  |
|  | Performance |  |  |  |  |  |  |
|  | AI behavior/authority/economics |  |  |  |  |  |  |
|  | Business/support readiness |  |  |  |  |  |  |
|  | Documentation/ownership |  |  |  |  |  |  |

## Minimum release-evidence record
**Change → Release risk → Tests/evidence → Conditional controls → Rollout → Failure signals → Recovery → Approval if required → Result/post-release verification**

CI/PR/canonical records may satisfy this. Do not duplicate paperwork. No universal coverage percentage.

## High-risk controls when relevant
Human approval; staged rollout/flag; migration rehearsal; API compatibility; stronger security/privacy review; AI regression evaluation; backup/restore or recovery rehearsal.

## Adversarial review when applicable
Anonymous visitor; unauthorized access attempt; accidental admin harm; malformed/rapid requests/files; AI prompt/tool manipulation; dependency outage; failed job; leaked/rotated secret; bad deployment/rollback.

## Feature flags / temporary controls
If used, record owner + cleanup/removal condition.

## Accepted risks / exceptions
Link material accepted risk to owner, reason, mitigation and PB07/S030 exception record.

## Approval
Accountable owner:
Additional required approver(s):
Final decision:
