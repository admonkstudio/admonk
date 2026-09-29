# FOUNDATION-M4 — Operating-Model / Capability Template

**Status:** CANDIDATE V1 — M4-01  
**Date:** 29/09/2026  
**Authority:** Foundation candidate; requires M5 reference-model validation before final M4 lock.

---

# 1. Purpose

This template defines the reusable structure by which SIA understands and operates across business domains without requiring one fixed organization chart, one provider stack or one agent per role.

> **Model the work first. Assign the worker second. Authorize execution separately.**

A domain implementation should use only the sections it materially needs, but it must preserve the invariants in this document.

---

# 2. Domain Pack

## 2.1 Identity

Required:

- **domain_key** — stable machine identity;
- **name**;
- **purpose**;
- **business_outcomes**;
- **semantic_owner**;
- **lifecycle**;
- **version/revision**.

Optional:

- industry overlay eligibility;
- aliases/local terminology;
- commercial/entitlement references.

### Rule

Domain identity must be independent from:
- department name;
- vendor/provider;
- repository;
- product SKU.

---

## 2.2 Domain authority

Define:

- authoritative operational systems;
- authoritative numerical sources;
- authoritative policy sources;
- derived/secondary sources;
- conflict/reconciliation rules.

For each source:

- source class;
- scope;
- freshness expectation;
- provenance requirement;
- fallback/degradation behavior.

### Required truth states

Where relevant:

- AUTHORITATIVE
- VERIFIED
- OBSERVED
- INFERRED
- CLAIMED
- CONFLICTING
- UNKNOWN

---

## 2.3 Entities / vocabulary

For each important business entity define:

- **entity_key**;
- human name;
- meaning;
- domain owner;
- stable identifier strategy;
- relationships;
- sensitivity;
- source authority;
- lifecycle where relevant.

Examples:

- campaign;
- candidate;
- ticket;
- project;
- contract.

Do not normalize two different entities merely because providers use similar field names.

---

# 3. Role Archetype

A Role Archetype is a **reference lens**, not an authorization object.

Required:

- **role_key**;
- name;
- purpose;
- typical outcomes;
- typical responsibilities;
- typical metrics;
- default workspace/lens;
- default diagnostic interests.

Optional:

- suggested capabilities;
- suggested specialist access;
- onboarding defaults;
- default navigation;
- common skills;
- common artifacts.

### Role constraints

- role does not grant capabilities;
- role does not imply department membership;
- role does not imply connector ownership;
- role does not require one dedicated specialist;
- one user may hold multiple roles;
- tenant may create custom roles without forking core domain logic.

---

# 4. Responsibility Definition

Responsibilities are the primary assignable work-ownership object.

Required:

- **responsibility_key**;
- purpose;
- expected outcome;
- owning domain;
- eligible scopes;
- related processes;
- expected evidence;
- default worker policy;
- escalation policy.

Optional:

- suggested role archetypes;
- suggested capabilities;
- workload indicators;
- continuity criticality;
- handoff requirements.

## 4.1 Worker policy

Allowed values:

- HUMAN_ONLY
- HUMAN_PREFERRED
- HYBRID
- DIGITAL_PREFERRED
- DIGITAL_ALLOWED
- DETERMINISTIC_AUTOMATION
- APPROVAL_REQUIRED

## 4.2 Fulfillment

Current fulfillment may be:

- human;
- SIA Specialist;
- deterministic automation;
- hybrid;
- unfilled.

The Responsibility Definition does not change when fulfillment changes.

---

# 5. Process Template

Required:

- **process_key**;
- purpose/outcome;
- owning domain;
- trigger;
- semantic stages;
- terminal states;
- participating responsibilities;
- required evidence/artifacts;
- approval/risk points;
- exception/escalation behavior;
- completion condition.

Optional:

- SLA/SLO semantics;
- dependencies;
- notification semantics;
- recommended automation;
- specialist intervention points;
- diagnostic checkpoints.

## 5.1 Stage definition

Each stage should define:

- stage_key;
- business meaning;
- entry condition;
- exit condition;
- accountable responsibility;
- required evidence;
- allowed transitions;
- exception behavior.

## 5.2 Reality layers

Every process may have:

- **Reference Process**;
- **Configured Process**;
- **Observed Process**.

SIA may compare them.

SIA may recommend configuration change.

SIA may not silently rewrite Configured Process from observation.

## 5.3 Technical implementation

A Process Template may map to:

- manual work;
- provider workflow;
- n8n/Temporal/other workflow;
- SIA Specialist;
- hybrid orchestration.

Implementation references are replaceable metadata.

---

# 6. Capability Definition

A capability is a governed ability to read, decide or act.

Required:

- **capability_key**;
- purpose;
- owning domain/platform boundary;
- action class;
- input/output contract reference;
- eligible scope types;
- data sensitivity;
- risk class;
- authority requirements;
- approval policy;
- audit/provenance requirement;
- readiness semantics;
- version/revision.

Optional:

- connector dependencies;
- idempotency requirement;
- retry policy;
- cost class;
- latency class;
- specialist eligibility;
- exposure level.

## 6.1 Capability action classes

At minimum distinguish:

- READ
- ANALYZE
- DRAFT
- WRITE_LOW
- WRITE_HIGH
- ADMIN / PRIVILEGED

Concrete platform action policy remains governed by M2/M6 authority contracts.

## 6.2 Capability identity rule

Good:

`recruiting.application_status.read`

Bad:

`zoho_node_17`

Provider/workflow identity stays implementation metadata.

---

# 7. Connector Requirement

Define when a capability requires external connection context.

Fields:

- provider/service class;
- supported ownership:
  - PERSONAL
  - DEPARTMENT
  - ORGANIZATION
  - SERVICE;
- required scopes/permissions;
- resource selection;
- effective readiness semantics;
- degradation behavior.

### Rule

Connector ownership never follows role/responsibility reassignment automatically.

Personal connections never transfer with responsibility.

---

# 8. Metric Definition

Required:

- **metric_key**;
- business question;
- formula/semantic definition;
- authoritative source;
- grain;
- dimensions;
- valid filters;
- freshness;
- quality states;
- unit/currency/time semantics where relevant;
- version/revision.

Optional:

- target/goal eligibility;
- warning thresholds;
- diagnostic playbook links;
- drill-through resource.

### Quality states

Suggested:

- VERIFIED
- PROVISIONAL
- DATA_QUALITY_WARNING
- ATTRIBUTION_WARNING
- STALE
- BLOCKED

Do not average or combine incompatible metric populations silently.

---

# 9. Goal Definition / Goal Instance

A goal connects a governed metric to desired change.

Required:

- title;
- owner/scope;
- metric definition revision;
- baseline;
- target;
- period;
- source;
- current value;
- progress state.

Optional:

- projects;
- responsibilities;
- tasks;
- findings;
- SIA recommendations.

Goals are not opaque AI performance scores.

---

# 10. Artifact Definition

Required:

- **artifact_type_key**;
- purpose;
- owning domain;
- required metadata;
- source/evidence references;
- version/revision behavior;
- sensitivity;
- freshness/refreshability;
- relationships.

Examples:

- report;
- finding;
- brief;
- decision;
- meeting record;
- issue/incident;
- automation proposal.

### Artifact rule

Artifact is durable work product.

It does not replace the authoritative source it summarizes.

---

# 11. Diagnostic Playbook

A diagnostic playbook teaches SIA how to investigate a class of problem.

Required:

- **diagnostic_key**;
- triggering questions/signals;
- evidence required;
- ordered investigation logic;
- uncertainty states;
- possible diagnosis classes;
- prohibited conclusions;
- recommended actions;
- escalation criteria.

Optional:

- specialist profile;
- metrics;
- artifacts;
- process checkpoints;
- simulation/test cases.

### Rule

Diagnostic playbook does not self-authorize consequential remediation.

---

# 12. Skill Reference

Deep reusable instructions belong in progressively loaded Skill packages rather than giant role/system prompts.

A Skill reference should define:

- **skill_key**;
- purpose;
- when to load;
- compatible roles/specialists/processes;
- required context;
- output expectation;
- version.

Suggested package:

```
skill/
  SKILL.md
  references/
  templates/
  scripts/
```

---

# 13. Specialist Profile Reference

A Domain Pack may reference eligible Specialist Profiles.

Required Specialist Profile fields:

- **specialist_key**;
- Job;
- eligible tasks;
- decision taxonomy;
- allowed capabilities;
- context mode;
- output/artifact contract;
- prohibited work;
- Done signal;
- escalation;
- effort/budget;
- eval policy;
- version.

### Constraints

- a role is not a specialist;
- one specialist may serve many roles;
- one role may use many specialists;
- specialist use should be benchmarked against Direct SIA/deterministic alternatives where material.

---

# 14. Workspace / Interaction Pattern

Define only interaction patterns that are semantically useful.

Possible patterns:

- inbox;
- task list;
- calendar;
- Kanban;
- funnel;
- report;
- dashboard;
- timeline;
- approval review;
- conversation;
- knowledge/training;
- health/incident console.

For each pattern define:

- purpose;
- entities/artifacts shown;
- actions;
- permission behavior;
- loading/empty/error/blocked states;
- SIA contextual actions;
- drill-through;
- responsive/accessibility requirements.

### Rule

Do not create a dedicated workspace merely because a job title exists.

---

# 15. Navigation / Lens Defaults

Domain/role packs may propose defaults.

Effective navigation order:

```
Platform mandatory/security
→ Tenant-enabled capabilities
→ Effective permissions
→ Domain/role defaults
→ Active responsibilities/projects
→ User customization
```

User customization cannot create authority.

---

# 16. Authority / Escalation

Every executable process/capability/specialist must reference:

- applicable authority model;
- risk/action class;
- required approval;
- escalation recipient/class;
- failure behavior;
- audit requirement.

At execution time, the deterministic authority layer intersects:

- delegator authority;
- capabilities;
- scope;
- connector/provider scopes;
- policy;
- runtime limits;
- approval state;
- execution grant.

The model cannot expand this intersection.

---

# 17. Human / Digital Handoff

Where digital fulfillment is allowed, define:

- activation condition;
- shadow/supervised mode;
- handoff-in evidence;
- current responsibility owner;
- limits;
- escalation;
- handback condition;
- handoff-out artifact/history.

Reference lifecycle:

- DRAFT
- SIMULATION
- SHADOW
- SUPERVISED
- BOUNDED_AUTONOMOUS
- SUSPENDED
- RETIRED

Promotion is policy/evidence-driven, never self-declared.

---

# 18. Automation Definition Reference

Where repeatable work is automated, separate:

## Definition
Purpose, trigger, conditions, actions, dependencies, owner, risk, version.

## Deployment
Desired state vs observed state, environment, implementation refs, health, schedule, connection dependencies.

## Run
Execution result, evidence, usage/cost, failures.

Automation identity must not equal one n8n workflow ID.

---

# 19. Configuration / Customization Boundary

Every configurable field should declare:

- valid configuration levels;
- inheritable?;
- override allowed?;
- lower-level strictness ceiling?;
- reset behavior;
- source-of-value visibility.

Default hierarchy follows M2:

```
Platform Default
→ Tenant
→ Organizational Scope
→ Domain/Product
→ User where allowed
```

Domain-specific overlays may add narrower configuration but cannot weaken platform constraints.

---

# 20. Versioning / Compatibility

Each reusable definition uses:

- stable key;
- immutable revision/version;
- lifecycle;
- compatibility metadata;
- replacement/deprecation metadata where relevant.

Running/waiting work pins the definition revision that gave the work meaning.

Do not silently resume work against incompatible definitions.

---

# 21. Evidence / Observability

Each important executable concept should define relevant evidence:

- audit;
- provenance;
- trace/correlation;
- cost/usage;
- result;
- failure;
- validation/eval;
- source freshness.

Do not store private reasoning as operational evidence.

---

# 22. Domain Pack Validation Checklist

Before promotion to STABLE:

- [ ] purpose/outcomes are explicit;
- [ ] domain/source authority is explicit;
- [ ] entities preserve semantics;
- [ ] roles are not permissions;
- [ ] responsibilities are assignable independently;
- [ ] processes define evidence and exceptions;
- [ ] reference/configured/observed distinction works;
- [ ] capabilities are provider-neutral;
- [ ] metrics have source/formula/grain;
- [ ] artifacts are durable/provenanced;
- [ ] connectors declare ownership/readiness;
- [ ] risky actions reference approval/authority;
- [ ] workspace patterns are justified by work semantics;
- [ ] specialist use is optional/evidence-driven;
- [ ] diagnostics preserve uncertainty;
- [ ] customization cannot weaken security;
- [ ] versioning/migration semantics exist;
- [ ] test/reference scenarios pass.

---

# 23. M5 handoff

Use this candidate template to build only the following first reference models:

1. **Marketing / Marketing Manager**
2. **Recruiting / Recruiter**
3. **Support / Support Manager**
4. **Founder / multi-role solo**

M5 must challenge this template.

If reference models require awkward exceptions or repeated fields, fix M4 before final lock.

---

# 24. Status

**M4-01 candidate template complete.**

Not yet final/locked.

Next bounded milestone:

> **M4-02 — Template Consistency & Minimum-Core Audit**

Goal:
identify which fields are truly mandatory vs optional before M5, so the template does not become an oversized ontology that every domain must populate.
