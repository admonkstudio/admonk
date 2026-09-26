# Product Release Audit

**Release:**  
**Environment:**  
**Audit level:** Prototype / Production / High-risk  
**Date:**  
**Accountable owner:**  
**Supervisor/reviewer:**  

## Decision

**PASS / PASS WITH ACCEPTED RISKS / BLOCKED**

## Audit evidence

| Requirement | Domain | Risk | Evidence link / result | Status | Owner | Remediation deadline | Release effect |
|---|---|---|---|---|---|---|---|
|  | Product truth |  |  | Pass / Risk accepted / Blocked |  |  |  |
|  | UX & accessibility |  |  |  |  |  |  |
|  | Security & privacy |  |  |  |  |  |  |
|  | Code & delivery |  |  |  |  |  |  |
|  | Reliability |  |  |  |  |  |  |
|  | Data integrity |  |  |  |  |  |  |
|  | Performance |  |  |  |  |  |  |
|  | Business readiness |  |  |  |  |  |  |
|  | Cost & scale |  |  |  |  |  |  |
|  | Documentation |  |  |  |  |  |  |

## Minimum release-evidence bundle

For material Production changes, record or link evidence for:
- **Change** — what changed;
- **Risk** — what can materially fail;
- **Evidence** — tests/reviews/measurements that prove important requirements;
- **Critical journey impact** — primary flows verified;
- **Specialist evidence** — security/accessibility/data/performance/AI where relevant;
- **Known gaps/exceptions** — explicit and owned;
- **Recovery** — rollback/restore/mitigation path;
- **Release owner** — accountable owner;
- **Post-release verification** — signal that confirms release health.

This may be satisfied through CI, PR evidence, the Evidence Index, and other canonical records when traceable. Do not create duplicate paperwork solely to satisfy the bundle.

No universal code-coverage percentage is required. Testing depth follows the risk introduced by the actual change.

## Adversarial review

Record applicable tests and evidence:
- anonymous visitor;
- user attempting unauthorized data/action access;
- harmful accidental admin action;
- malformed/rapid/unexpected requests or files;
- AI prompt-injection/tool manipulation where relevant;
- dependency outage;
- failed background job;
- leaked/rotated secret;
- bad deployment/rollback.

## Release blockers

Confirm relevant blockers are cleared:
- authorization verified for sensitive actions/data;
- no exposed secrets;
- practical backup/recovery path;
- critical error monitoring;
- deployment/data recovery or rollback;
- named production incident owner;
- critical flow verification;
- no unresolved Critical/High security finding;
- required privacy/consent handling.

## Accepted risks

Link each accepted risk to its owner, mitigation and deadline.

## Operational references

**Rollback method:**  
**Backup/recovery:**  
**Monitoring/error dashboard:**  
**Incident/runbook:**  
**Known risks:**  
**Next review date:**  

## Approval

**Accountable owner:**  
**Additional required approver(s):**  
**Final decision:**  
