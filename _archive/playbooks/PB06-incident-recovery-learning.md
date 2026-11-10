# PB06 — Incident, Recovery & Learning

**Trigger:** Material Production incident: critical workflow outage, important data loss/corruption, security/privacy incident, significant AI misbehavior/unauthorized action, widespread impact, unresolved failed deployment, or repeated systemic failure.
**Outcome:** Harm is contained, recovery verified, and serious/repeated incidents create owned learning actions.

## Flow
1. Detect/classify impact, affected users/data, severity and growth.
2. Assign one incident owner/lead.
3. Stabilize first: protect people/data → stop spread → restore useful service → deeper diagnosis later.
4. Choose safest recovery: rollback, fix forward, disable/isolate, restore or fail over; respect RTO/RPO where defined.
5. Communicate proportionally.
6. Verify recovery through critical journeys, signals and data integrity.
7. Trigger structured review for serious/repeated/security/privacy/data-loss/unauthorized-AI/material-business incidents or important control weaknesses.
8. Run blameless review: what happened, impact, contributing conditions, detection gap, recovery helpers/blockers, changes needed.
9. Create only meaningful corrective actions with owner/priority/completion expectation.
10. Feed lessons into tests/evals/monitoring/recovery/Foundation/docs.

## Required record
**Impact → Severity → Timeline → Owner → Mitigation → Recovery → Verification → Cause/contributors → Lessons → Corrective actions**

**Implements:** S008, S016, S025; supported by S007, S010, S015, S029, S030.
