# PB02 — Production Readiness & Release

**Trigger:** Any change going to Production. Evidence depth follows risk.
**Outcome:** What changed, how risky it is, proof it works, failure signals and safe recovery are explicit.

## Flow
1. Classify **Low / Medium / High** release risk.
2. Confirm universal Production floor: critical behavior, quality checks, access/secrets, critical journey, failure detection, recovery.
3. Add evidence proportionally: targeted integration/E2E at Medium; relevant approval/staging/flags/migration/API/security/AI/recovery controls at High.
4. Apply DB/API controls only when relevant.
5. Choose rollout by asking: **If this is wrong, how many users should discover it before we do?**
6. Define success/failure signals before release.
7. Define rollback/fix-forward/disable/restore path.
8. Release and verify; expand staged rollout only when healthy.
9. If impact crosses the incident threshold, switch to PB06.

## Required record
**Change → Risk level → Tests/evidence → Conditional controls → Rollout → Failure signals → Recovery → Approval if required → Result**

## Completion
Intended behavior is live, critical checks are healthy, rollout complete, temporary controls have cleanup ownership, and no material risk is hidden.

**Implements:** S001, S002, S007, S008, S015, S016, S017, S018 plus affected specialist standards.
