# Admonk Security & Privacy Principles

**Status:** APPROVED DOCTRINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R004-security-privacy-baseline.md`  
**Sources:** SRC-SEC-001, SRC-SEC-002

## Purpose

Define the security/privacy posture that applies across Admonk products without imposing the same control depth on every prototype and every high-risk production system.

## 1. Non-negotiable floor + risk-based escalation

> **Every project receives a small universal security/privacy floor. Assurance and control depth increase with sensitivity, privilege, autonomy and consequence.**

Risk changes the depth of assurance.
Risk does not determine whether security/privacy matter at all.

## 2. Security/privacy begins before implementation

Before build, identify as relevant:
- actors/users;
- tenant/data ownership;
- sensitive/personal/private data;
- trust boundaries;
- external providers/connectors;
- consequential actions;
- likely abuse/misuse;
- data-processing purpose;
- retention/export/deletion expectations.

Do not postpone fundamental identity, authorization or privacy questions until release QA.

## 3. Universal floor

Across projects, apply the relevant minimum principles:
- never commit secrets to source/client;
- enforce authorization at trusted/server/data boundaries, not only in UI;
- use least privilege for humans, agents and connectors;
- define tenant/data isolation where multi-tenant;
- collect/retain sensitive data only for an identified purpose;
- make credentials/tokens revocable;
- treat external/user-controlled inputs as untrusted;
- preserve important security/privacy assumptions visibly;
- ensure production-important data has a practical recovery path.

Exact verification depth is maturity/risk dependent.

## 4. Risk-based escalation

Increase controls/review when any of these increase:
- data sensitivity;
- user count;
- privilege;
- action consequence;
- financial/legal/regulatory exposure;
- agent autonomy;
- external reach;
- recovery difficulty;
- tenant blast radius.

Prototype, Production and High-risk governance determine review depth.

## 5. Privacy by purpose

For personal/private/sensitive data:
- identify why it is needed;
- minimize collection;
- scope access to the job;
- preserve source/ownership/provenance;
- define retention/export/deletion where material;
- do not promote user-private data into shared/company knowledge automatically;
- consider harm from intended processing, not only from breach.

## 6. Verification over claims

Do not treat statements such as:
- "auth is implemented";
- "RLS is enabled";
- "encrypted";
- "secure connector";
- "privacy compliant"

as sufficient evidence by themselves.

Verify the relevant behavior.

## 7. Provider authority

Admonk authorization can never grant more access than the upstream provider or source system allows.

Connector availability is not permission to exercise every available action.

## 8. Security/privacy is also product design

Make important security/privacy behavior understandable:
- permissions;
- connection scopes;
- approvals;
- destructive actions;
- data use;
- recovery;
- consent where applicable.

A secure backend with misleading UX is not sufficient.

## 9. Exceptions expire

Any accepted exception must record:
- owner;
- requirement affected;
- reason;
- compensating control;
- scope;
- expiry/review date;
- release effect.

No silent permanent exceptions.

## 10. Standards rule

Doctrine defines the principles.

Binding technical standards must use current final authoritative sources when they are created. Draft standards/framework revisions may inform research but should not be represented as final compliance requirements.

## Final rule

> **Protect the system and the people affected by its data and actions: keep a universal safety floor, minimize unnecessary exposure, verify important controls, and increase assurance as consequence rises.**
