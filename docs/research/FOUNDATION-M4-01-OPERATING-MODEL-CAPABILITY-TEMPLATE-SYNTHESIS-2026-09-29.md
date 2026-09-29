# FOUNDATION-M4-01 — Operating-Model / Capability Template Synthesis

**Date:** 29/09/2026  
**Status:** SYNTHESIS COMPLETE — CANDIDATE PROMOTION  
**Milestone:** FOUNDATION-M4  
**Scope:** reusable operating-model contract for domains, roles, responsibilities, processes, capabilities, artifacts, metrics, workspaces and specialists.

---

## 1. Problem

The unified operating environment needs enough structure for SIA to understand how a company works without forcing every customer into one org chart or turning every job title into a separate product.

The model must support:

- one-person companies;
- multi-role users;
- departments and nested scopes;
- mature custom processes;
- companies starting from reference templates;
- responsibilities moving between people;
- human/digital/hybrid fulfillment;
- shared capabilities across domains;
- preserved domain semantics;
- provider/source authority;
- SIA diagnostics and recommendations;
- safe tenant customization.

The template must not collapse:

- role into permission;
- responsibility into role;
- capability into provider;
- process into workflow implementation;
- artifact into source of truth;
- specialist into employee;
- observed work into configured policy.

---

## 2. Sources reconciled

This synthesis reconciles:

- `docs/PRODUCT-MASTER-PLAN.md`;
- `docs/SIA-EXPERIENCE-DIRECTION.md`;
- `docs/FOUNDATION-M2-DECISIONS.md`;
- `docs/research/FOUNDATION-M4-KALAM-SIA-PILOT-AUDIT-INPUT-2026-09-29.md`;
- `docs/addenda/SIA-ENGINEERING-RELIABILITY-QUALITY-SPECIALIST-V1-2026-09-29.md`;
- Kalam SIA pilot evidence.

No Kalam-specific provider, workflow ID, department mapping or current team structure is promoted as universal.

---

## 3. Core semantic separations

### Identity
A person/workload identity.

### Organizational affiliation
Where the identity belongs:
- company;
- department;
- team;
- temporary project/scope.

### Role Archetype
A reusable description of a typical work lens.

Example:
`marketing_manager`

A role describes:
- common outcomes;
- typical responsibilities;
- preferred surfaces;
- likely metrics;
- common skills.

It does **not** grant authority by itself.

### Responsibility
A unit of accountable work.

Example:
`paid_media_ownership`

Responsibilities may be assigned to:
- human;
- SIA specialist;
- hybrid team;
- deterministic automation;
- temporarily unfilled.

### Capability
A governed ability to read, decide or act.

Example:
`ads.performance.read`

Capability authorization remains independent from role/responsibility labels.

### Process Template
A reusable business flow.

Example:
`campaign_to_hiring_outcome`

A process describes semantic stages, ownership and evidence.

It is not the n8n/Temporal/provider implementation.

### Workflow Implementation
One technical implementation of process/action behavior.

Replaceable.

### Specialist Profile
A reusable expert execution profile.

Role != Specialist.

One role can use many specialists.
One specialist can serve many roles.

### Artifact
A durable result/object.

Example:
report, finding, brief, issue, decision.

Artifact != authoritative operational source.

### Connector
Provider/account access and data/action boundary.

Connector ownership != role ownership.

---

## 4. Three-reality operating model

Every material process/role configuration may exist in three forms:

### Reference
How the template says the work commonly works.

### Configured
How the tenant says the work should work.

### Observed
How evidence shows the work actually works.

SIA compares them.

Variance is classified as:

- INTENTIONAL_VARIATION;
- CONFIGURATION_DRIFT;
- PROCESS_GAP;
- DATA_GAP;
- UNKNOWN.

SIA never silently rewrites Configured reality from Observed evidence.

---

## 5. Pack composition

A **Domain Pack** is the reusable unit for one semantic business domain.

It may contain:

- domain definition;
- entities/vocabulary;
- role archetypes;
- responsibility definitions;
- process templates;
- capabilities;
- metrics;
- artifacts;
- workspaces/components;
- diagnostic playbooks;
- skill references;
- specialist profile references;
- connector requirements;
- authority/escalation policies;
- configuration boundaries;
- version metadata.

A Domain Pack is not automatically a purchased product or separate application.

---

## 6. Inheritance / composition

Recommended composition order:

```
Global Platform Invariants
→ Shared Vocabulary
→ Domain Pack
→ Industry Overlay optional
→ Tenant Configuration
→ Organizational Scope Override
→ Responsibility / Project Context
→ User View Preference
```

Security, data-governance and authority ceilings cannot be weakened downward.

A lower layer may customize behavior only where the owning definition explicitly allows it.

---

## 7. M4 invariants

### I01 — role is not authority
Role archetypes may recommend capabilities but cannot grant them.

### I02 — responsibility is assignable
Responsibility ownership can move without rewriting the role or process definition.

### I03 — work first, worker second
Model responsibility/process independently from the current human/digital worker.

### I04 — provider IDs are implementation metadata
Stable capabilities/processes cannot use provider/workflow IDs as semantic identity.

### I05 — domain owns semantics
Shared platform cannot flatten domain meaning for convenience.

### I06 — source authority is explicit
Metrics/artifacts/process evidence must declare numerical/operational authority.

### I07 — configured and observed differ safely
Observed behavior cannot silently overwrite configured policy/process.

### I08 — capability authorization is deterministic
Models may select/propose capabilities; deterministic policy grants execution.

### I09 — specialists are optional
Create a Specialist Profile only when specialization improves quality, context isolation, risk boundaries or maintainability enough to justify complexity.

### I10 — deterministic work remains deterministic
Do not add agent reasoning where stable workflow logic is sufficient.

### I11 — artifacts are durable
Important reusable output receives a stable artifact identity/version/provenance.

### I12 — customization is bounded
Tenant customization cannot create a fork of global security/integrity rules.

### I13 — every executable concept is versionable
Definitions needed by running/waiting work must carry stable key + immutable revision semantics.

### I14 — diagnostics use evidence
A diagnostic playbook must identify required evidence and uncertainty states.

### I15 — experience is semantic
Workspace/components are chosen by work semantics, not job title decoration.

---

## 8. Required validation in M5

M4 cannot lock solely because the template reads well.

Validate with:

1. Marketing Manager / Marketing;
2. Recruiter / Recruiting;
3. Support Manager / Support;
4. Founder / multi-role solo.

Additional cross-cutting scenarios:

- one person with two departments;
- responsibility transfer;
- temporary project role;
- human → SIA Specialist → human handback;
- mature custom process;
- missing role/process started from reference template.

M5 should identify:
- fields nobody uses;
- missing semantic concepts;
- accidental Kalam assumptions;
- role explosion;
- capability duplication;
- UI complexity;
- customization failure.

---

## 9. Technology posture

M4 is a semantic contract, not a runtime schema implementation.

Later runtime direction:

- code-first typed contracts;
- generated/validated JSON Schema;
- declarative manifests;
- progressive Skill packages;
- deterministic authority resolver;
- relational/projection-first Company Graph.

Do not prematurely bind M4 to:
- graph database;
- n8n;
- OpenAI SDK types;
- Webflow;
- Zoho;
- any one agent framework.

---

## 10. Synthesis conclusion

The reusable operating model should be based on:

> **Domain → outcomes → entities → responsibilities → processes → metrics/evidence → capabilities/actions → artifacts → workspace patterns → diagnostics → eligible specialists**

Role Archetypes provide a common user lens over that model.

Worker assignment is dynamic.

Authority remains separate.

This is the candidate structure promoted into the M4 template.
