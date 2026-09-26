# Complexity Budget

**Project:**  
**Owner:**  
**Governance level:** Prototype / Production / High-risk  
**Last reviewed:**  

## Purpose

Define how much permanent product/technical complexity this project is willing to carry at its current stage.

This is not a numeric score. It is a set of boundaries, approvals and revisit triggers.

## Current architecture limits

**Application shape:**  
**Primary datastore(s):**  
**Deployment environments:**  
**Background execution:**  
**AI/model providers:**  
**External connectors/vendors:**  
**Observability level:**  
**Expected user/load range:**  

## Default complexity rules

- Prefer existing platform capabilities before custom systems.
- Prefer existing project patterns before new abstractions.
- One new dependency/vendor/service must solve a real current need.
- New connectors require explicit ownership, permissions, failure behavior and exit/revocation path.
- New AI/model providers require quality/cost/privacy/fallback justification.
- New data stores require explicit ownership/synchronization reasoning.
- Shared extraction requires a stable concept and proven reuse or a security/consistency reason.
- Temporary shortcuts must enter the Technical Debt & Scale Register when they create material future work.

## Approval triggers

A specific approval/review is required before introducing:

| Change | Required review |
|---|---|
| New external connector/vendor | Security + permissions + operations + cost |
| New datastore / queue / cache | Architecture + data ownership + migration |
| New AI/model provider | AI quality/evaluation + privacy + cost |
| New framework-level abstraction | Simplicity + platform engineering |
| New cross-project shared package | Organization/reuse + ownership/testing |
| Consequential/destructive action | Capability control + security + adversarial review |
| Material recurring cost | Product owner + cost/scale review |

## Feature complexity assessment template

**Feature/change:**  
**UI impact:**  
**Code impact:**  
**Data impact:**  
**Permission impact:**  
**Infrastructure impact:**  
**Operational impact:**  
**Vendor impact:**  
**AI/evaluation impact:**  
**Support impact:**  
**Migration/reversal plan:**  
**Why justified now:**  

## Accepted temporary complexity

Link to:
`09-scale-and-debt/technical-debt-scale-register.md`

## Simplification / consolidation triggers

- duplicated behavior is now stable across real consumers;
- vendor/service cost crosses approved threshold;
- maintenance incidents show a boundary is too complex;
- permissions become difficult to reason about;
- multiple data copies create reconciliation burden;
- support/operations cost exceeds feature value;
- architecture blocks testing or safe change.
