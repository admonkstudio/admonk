# R004 — Security & Privacy Baseline

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** Awaiting product-owner Q1  
**Target:** future `doctrine/security-principles.md`, security/privacy standards, Product Supervisor release blockers

## Research question

How should Admonk define a security/privacy baseline that is strong enough to protect users and tenants without imposing the same heavyweight control set on every prototype, internal tool and high-risk production product?

The central tension is:

- **concrete universal verification controls**, versus
- **contextual risk management based on data processing, users, consequences and business context**.

## Source A — OWASP ASVS 5.0.0

**Source:** SRC-SEC-001

### What it optimizes for

Concrete, testable application-security requirements.

OWASP ASVS provides a basis for verifying technical controls and gives developers explicit requirements across areas such as:
- authentication;
- session management;
- access control;
- validation/encoding;
- cryptography;
- error handling/logging;
- data protection;
- communications;
- business logic;
- APIs;
- configuration.

ASVS also supports graduated assurance rather than assuming every application has identical security needs.

### Strongest ideas for Admonk

- security requirements should be testable rather than expressed as "secure by design";
- authorization, data protection, API behavior and configuration deserve explicit verification;
- higher-consequence applications should have higher assurance;
- security can become machine/reference-checkable over time;
- release evidence should point to specific verified controls rather than broad claims.

### Challenge

Copied literally, ASVS can:
- turn security into a long application checklist;
- encourage compliance with controls without understanding business/privacy harm;
- over-focus on web application technical controls;
- under-specify data-purpose questions, individual privacy impacts and organizational accountability;
- become disproportionate for disposable/low-risk prototypes.

ASVS is strongest as a **verification/control source**, not the entire security/privacy doctrine.

## Source B — NIST Privacy Framework 1.1 IPD

**Source:** SRC-SEC-002

### What it optimizes for

Risk-based privacy governance across data processing.

NIST frames privacy risk around how data is processed and how that processing can affect individuals. Its framework is flexible rather than a fixed checklist: organizations select outcomes based on their mission/business drivers, role in the data ecosystem, types of processing and individuals' privacy needs.

The 1.1 draft also strengthens governance alignment and explicitly updates the framework for current AI/privacy concerns.

### Strongest ideas for Admonk

- privacy is broader than preventing a breach;
- data collection/use itself can create privacy risk even when technically secure;
- context, purpose and user impact matter;
- accountability should connect executives/product owners, business/process roles and implementers;
- privacy requirements should flow to external providers and be verifiable;
- one static control list should not replace risk judgment.

### Challenge

Copied literally, the Privacy Framework can:
- remain too high-level for engineering teams to know exactly what to test;
- create profiles/governance artifacts without concrete enforcement;
- allow "risk-based" reasoning to become an excuse for weak technical controls;
- require adaptation before it can serve a small product studio effectively;
- create uncertainty because version 1.1 is still an Initial Public Draft rather than a final stable release.

NIST PF is strongest as the **privacy/risk/accountability lens**, not as the application-security checklist.

## Synthesis

The two approaches protect against opposite failures.

ASVS protects against:
> **security-by-intention without concrete verification.**

NIST Privacy Framework protects against:
> **security controls that protect a system while ignoring whether the data processing itself is excessive, opaque or harmful.**

Admonk needs both:
**a universal non-negotiable floor + risk-based escalation + privacy-by-purpose.**

## Proposed Admonk security/privacy doctrine

### 1. Security/privacy begins before implementation

Before build, identify:
- actors/users;
- tenant/data ownership;
- sensitive data;
- trust boundaries;
- external systems/providers;
- consequential actions;
- likely abuse/misuse;
- privacy/data-processing purpose;
- retention/export/deletion expectations.

Do not wait for release QA to discover fundamental permission or privacy questions.

### 2. Universal non-negotiable floor

Some controls should not be waived merely because a product is low-budget.

Candidate universal principles:
- no secrets committed to source/client;
- authorization enforced at trusted/server/data boundaries, not only hidden UI;
- least privilege for users, agents and connectors;
- explicit tenant/data isolation for multi-tenant systems;
- sensitive data collected/retained only for an identified purpose;
- credentials/tokens revocable;
- important actions auditable when consequence/sensitivity warrants it;
- input/output/file boundaries treated as untrusted;
- production-important data has a practical recovery path;
- security/privacy assumptions remain visible.

The later standard must define exact evidence and maturity exceptions.

### 3. Risk-based escalation

Controls increase with:
- data sensitivity;
- user count;
- privilege;
- action consequence;
- financial/legal/regulatory exposure;
- automation/autonomy;
- external reach;
- recovery difficulty;
- tenant blast radius.

Prototype / Production / High-risk governance should determine review depth, not whether security exists at all.

### 4. Privacy by purpose, not collection opportunity

For personal/private/sensitive data:
- identify why it is needed;
- avoid collection that does not support a real capability;
- scope access to the job;
- make source/ownership visible;
- define retention/deletion/export where material;
- do not promote user-private data into company/shared knowledge automatically;
- consider individual impact even when processing is technically secure.

### 5. Verification over claims

Do not accept:
- "auth is implemented";
- "RLS is enabled";
- "encrypted";
- "privacy compliant";
- "secure connector"

as release evidence by themselves.

Verify the relevant behavior.

### 6. Provider controls remain authoritative

Admonk permission models cannot grant access beyond:
- provider scopes;
- source-system permissions;
- tenant/company policy;
- product/domain policy;
- action approval.

A connector being installed does not authorize its full action surface.

### 7. Security/privacy and product design are connected

Security/privacy failures can be UX failures:
- unclear permissions;
- hidden data use;
- misleading confirmations;
- destructive actions without recovery;
- overbroad role presets;
- inaccessible security controls;
- confusing consent/connection flows.

Design should make consequential behavior understandable.

### 8. Exceptions are explicit and expiring

Risk acceptance must record:
- owner;
- reason;
- affected requirement;
- compensating control;
- scope;
- expiry/review date;
- release effect.

No silent permanent exceptions.

## Proposed definition

> **Admonk security and privacy protect both the system and the people affected by its data and actions: enforce a non-negotiable safety floor, verify important controls, minimize unnecessary data exposure, and increase assurance as consequence rises.**

## Q1 required

How should Admonk treat the baseline across low-risk prototypes and production products?

### A. Maximum common baseline
Require nearly the same comprehensive control set for every serious project from the beginning.

**Benefit:** strong consistency and fewer gaps.  
**Risk:** high friction/cost; prototypes may spend heavily on controls unrelated to their real risk.

### B. Non-negotiable floor + risk-based escalation — RECOMMENDED
Every project receives a small universal safety/privacy floor. Production and high-risk systems add deeper verification and controls according to sensitivity, privilege and consequence.

**Benefit:** security/privacy never disappear, while governance remains proportional.  
**Risk:** the universal floor must be defined carefully so "risk based" cannot become a loophole.

### C. Fully contextual
No universal security/privacy controls beyond avoiding obvious secrets; each project defines controls from its own threat/privacy assessment.

**Benefit:** maximum flexibility.  
**Risk:** important basics become inconsistent and easy to miss, especially with AI-assisted implementation.

## Research recommendation

**B — Non-negotiable floor + risk-based escalation.**

This matches Admonk's existing Prototype / Production / High-risk governance while adding a crucial rule:

> **Risk changes the depth of assurance, not whether security/privacy matter.**

## Important research limitation

NIST Privacy Framework 1.1 is still an Initial Public Draft at the time of this research.

If this direction is approved:
- use its risk/accountability concepts in doctrine;
- do not claim compliance with PF 1.1;
- verify the final NIST release before converting draft-specific structure into a binding Admonk standard.

## Lock plan after Q1

If B is approved:
1. promote `doctrine/security-principles.md`;
2. preserve the universal-floor vs risk-escalation distinction;
3. update Product Supervisor governance/release-blocker wording if necessary;
4. later derive testable security/privacy standards from current final authoritative sources;
5. lock R004;
6. move to R005 — AI autonomy / agent authority doctrine.
