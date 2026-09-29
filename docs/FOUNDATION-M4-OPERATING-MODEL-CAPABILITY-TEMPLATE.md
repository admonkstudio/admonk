# FOUNDATION-M4 — Operating-Model / Capability Template

**Status:** FINAL CANDIDATE V6 — M5 COMPLETE / OWNER LOCK PENDING  
**Date:** 29/09/2026  
**Authority:** Foundation candidate; requires M5 reference-model validation before final M4 lock.

---

# 0. Requirement model

This template uses four requirement classes:

- **CORE** — required for the object/concept to exist safely;
- **CONDITIONAL** — required only when the related feature/behavior exists;
- **RECOMMENDED** — useful default/reference metadata;
- **OPTIONAL** — extension metadata.

The detailed sections below describe the full semantic catalog.

They do **not** require every Domain Pack to populate every object.

## Minimum Domain Pack CORE

A valid reference Domain Pack needs only:

1. stable domain identity;
2. purpose/business outcomes;
3. semantic owner/boundary;
4. stable version/revision;
5. customization/inheritance boundary;
6. responsibility vocabulary, or an explicit statement that responsibility modeling is not yet configured.

Role Archetypes, processes, capabilities, connectors, metrics, artifacts, diagnostics, specialists, dedicated workspaces and automations are conditional/optional.

## Sparse-by-default safety

Absence never grants authority or invents facts:

- missing capability → unavailable/deny;
- missing evidence → unknown;
- missing metric value → unknown, not zero;
- missing role/workspace default → inherit/common shell;
- missing connector → dependent capability blocked;
- missing specialist → no specialist delegation;
- missing process observation → no observed-process claim.

M4-02 audit:
`docs/research/FOUNDATION-M4-02-TEMPLATE-CONSISTENCY-MINIMUM-CORE-AUDIT-2026-09-29.md`

# 1. Purpose

This template defines the reusable structure by which SIA understands and operates across business domains without requiring one fixed organization chart, one provider stack or one agent per role.

> **Model the work first. Assign the worker second. Authorize execution separately.**

A domain implementation should use only the sections it materially needs, but it must preserve the invariants in this document.

---

# 1A. Progressive composition

Domain Packs grow only as real work requires:

### A — Reference Core
identity, outcomes, authority boundary, responsibilities, minimal vocabulary, customization/versioning.

### B — Operable
processes, capabilities, connectors, artifacts and action/approval semantics.

### C — Measurable
metrics, goals, reports, quality/freshness and drill-through.

### D — Intelligent
diagnostics, Skills, Specialist Profiles, observed-process analysis and evals.

### E — Experience / Automation
dedicated workspace patterns, role/domain defaults, automations and human/digital handoff.

These are composable layers, not maturity grades.

A field/object is added only when required for semantic correctness, authority/safety, real interaction, execution, evidence/measurement or compatibility.

## Detailed-section requirement precedence

The requirement classes in **Section 0** and the M4-02 audit control this document.

Where a detailed section below still uses the word **Required**, interpret it as:

> **required if that object/feature is instantiated**, unless Section 0 explicitly classifies it as CORE at Domain Pack level.

Therefore:
- Role Archetype is OPTIONAL at Domain Pack level;
- Process Template is CONDITIONAL;
- Capability Definition is CONDITIONAL;
- Connector Requirement is CONDITIONAL;
- Metric Definition is CONDITIONAL;
- Goal is OPTIONAL;
- Artifact Definition is CONDITIONAL;
- Diagnostic Playbook is OPTIONAL;
- Skill Reference is OPTIONAL;
- Specialist Profile is OPTIONAL;
- Workspace/Interaction Pattern is OPTIONAL;
- Automation is CONDITIONAL;
- Human/Digital Handoff is CONDITIONAL.

This precedence rule prevents detailed object schemas from being misread as universal Domain Pack requirements.

# 2A. Shared-definition reference rule

Domain Packs should **reference** stable shared/platform definitions rather than cloning them.

Common candidates include:
- task/work item;
- case/request;
- conversation/thread;
- project;
- approval;
- decision;
- meeting;
- notification;
- connector/connection;
- automation Definition/Deployment/Run;
- issue/incident;
- audit/provenance envelopes;
- shared artifact shells;
- Engineering Reliability & Quality capabilities.

A domain may extend a shared definition only with domain-specific semantics.

Rules:

- shared stable identity remains owned by the shared/platform contract;
- domain extensions must not fork security/authority behavior;
- if two domains only need the same semantic concept, reference the shared contract;
- create a domain-owned definition only when the business meaning materially differs.

Shared case/request or conversation/thread contracts provide transport/work-container semantics only.

They do not take semantic authority over the domain object or business process referenced by the case.

# 2B. Communication / interaction audience rule

Where a communication, comment, note, message, thread item or evidence object can be exposed to different audiences, preserve explicit audience/visibility semantics.

At minimum, the relevant contract should be able to represent:
- intended audience/visibility;
- origin/author;
- timestamp;
- channel/surface;
- relationship to the governing case/process/artifact;
- sensitivity where relevant;
- provenance.

Rules:

- internal/private/restricted content must not be silently surfaced to an external or broader audience;
- transforming content across visibility boundaries is a consequential disclosure action and requires effective authority/policy;
- generating a draft does not grant delivery/send authority;
- summaries and agent context must preserve visibility restrictions;
- provider-specific labels such as "private note" or "public comment" map to shared visibility semantics rather than becoming universal vocabulary.


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

## 2.4 Subject identity vs domain-record identity

Where multiple domain records may refer to the same real-world subject, distinguish:

- **subject identity/linkage** — the governed assertion that records refer to the same natural person, organization or other real-world subject;
- **domain-record identity** — the stable identity and lifecycle of the business record inside its owning domain.

Rules:

- subject linkage does not collapse domain records;
- one subject may legitimately have multiple records in one domain or across domains;
- each domain record retains its own semantics, authority, lifecycle, evidence and permissions;
- cross-record/cross-domain linkage should preserve source, provenance and confidence where the linkage is not authoritative;
- uncertain linkage must remain uncertain rather than being silently merged;
- linking records does not transfer semantic or action authority between domains.

Example:
one natural person may have one Recruiting candidate record, multiple application records and later a separate employee/worker record.


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

## 5.4 Cross-domain process authority

A process may span more than one semantic domain.

For cross-domain processes, define:

- `process_type: cross_domain`;
- participating domains;
- coordinating owner/responsibility where one exists;
- stage-level semantic/domain owner;
- source authority for each stage/entity/metric;
- handoff boundary;
- shared artifact/evidence references;
- reconciliation/attribution confidence where data is joined.

Rules:

- one coordinating domain does not gain semantic authority over another domain's entities;
- each stage preserves the owning domain's definitions and authoritative source;
- cross-domain analytics must preserve provenance and confidence rather than flattening conflicting populations;
- a cross-domain process may have no single semantic owner for the entire end-to-end outcome.

Example:
Marketing may own campaign/spend/acquisition semantics while Recruiting owns candidate/application/hire semantics in one recruitment-acquisition outcome process.

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

## 6.3 Human-impact decision boundary

Where a capability, process, automation or specialist materially influences a consequential decision about a natural person, define the applicable decision boundary.

Conditional fields should include:

- **decision_role:** INFORM / ANALYZE / RECOMMEND / DECIDE / EXECUTE;
- accountable human/policy authority;
- required review/approval where applicable;
- permitted/prohibited evidence, factors or uses;
- required decision evidence;
- explanation/notification requirements where policy or law requires;
- override/appeal/accommodation path where applicable;
- jurisdiction/policy applicability;
- audit/provenance requirements.

Rules:

- access to a capability or connector does not by itself grant authority to make a consequential decision;
- ANALYZE or RECOMMEND does not silently become DECIDE;
- DECIDE does not silently become EXECUTE;
- automation of a procedural step does not imply authority over the underlying human-impact decision;
- applicable law, tenant policy and platform ceilings may require human review even when the technical action is available;
- the overlay is conditional and should not impose one jurisdiction's policy globally.


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

## 15.1 Lens/context vs execution target

Role/domain/company lenses may shape presentation and context selection.

They do not themselves define action scope or grant authority.

For material execution, bind the action to the relevant:
- tenant;
- organizational/domain scope;
- resource/entity;
- capability;
- responsibility/context where relevant;
- connector/resource authority;
- approval state.

Rules:

- changing visual/role lens does not grant or revoke authority by itself;
- company-wide synthesis may span several authorized domains while preserving each domain's source authority;
- context from one responsibility must not silently authorize an action in another;
- when the execution target is materially ambiguous, remain in draft/planning state or require target resolution rather than executing against a guessed lens.


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

## 16.1 Approval eligibility and independence

Where an action requires approval, the applicable approval policy should be able to declare:

- eligible approver class/scope;
- whether the initiator/requester may also approve;
- whether the executor may also approve;
- whether explicit self-confirmation is permitted;
- whether an independent/separate approver is mandatory;
- fallback/escalation when no eligible approver exists.

Rules:

- owner/founder/admin status does not silently bypass an independent-approval requirement;
- if policy requires independent approval and no eligible approver exists, the action remains blocked/deferred or follows an explicitly allowed external-review path;
- self-confirmation and independent approval are different controls;
- provider/platform ceilings remain final regardless of local approval policy.


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

### M5-01 Marketing validation corrections

Marketing reference validation produced two template corrections:

1. explicit **cross-domain process authority** with stage-level semantic ownership;
2. explicit **shared-definition references** to avoid cloning platform/common objects into each domain.

Evidence:
`docs/research/FOUNDATION-M5-01-MARKETING-REFERENCE-VALIDATION-2026-09-29.md`

### M5-02 Recruiting validation corrections

Recruiting reference validation produced two reusable template corrections:

1. explicit **subject identity vs domain-record identity** so one real-world subject can link to multiple governed records without collapsing their independent semantics/lifecycles;
2. explicit **human-impact decision boundary** separating INFORM / ANALYZE / RECOMMEND / DECIDE / EXECUTE participation and preventing technical write access from becoming decision authority.

Evidence:
`docs/research/FOUNDATION-M5-02-RECRUITING-REFERENCE-VALIDATION-2026-09-29.md`

### M5-03 Support validation corrections

Support reference validation produced two reusable template corrections:

1. add **case/request** and **conversation/thread** to shared-definition candidates so generic service/ticket mechanics are not cloned into each domain;
2. add explicit **communication/interaction audience visibility** so internal/private/restricted content cannot silently cross into customer/external communication through AI or automation.

Evidence:
`docs/research/FOUNDATION-M5-03-SUPPORT-REFERENCE-VALIDATION-2026-09-29.md`

### M5-04 Founder / multi-role solo validation corrections

Founder / multi-role solo validation produced two reusable template corrections:

1. explicit **lens/context vs execution-target** separation so a role/company lens cannot become implicit action scope;
2. explicit **approval eligibility/independence** semantics so solo operation does not silently weaken separation-of-duties policy or deadlock on undefined approval behavior.

Evidence:
`docs/research/FOUNDATION-M5-04-FOUNDER-MULTI-ROLE-SOLO-VALIDATION-2026-09-29.md`

# 24. Status

**M4 FINAL CANDIDATE V6 — all planned M5 reference validations complete.**

Not yet final/locked.

The template has completed **M5 reference-model validation** and is ready for final reconciliation / owner lock.

M5 confirmed that the Reference Core can remain sparse while Operable / Measurable / Intelligent / Experience layers are added only when the scenario requires them.

Marketing, Recruiting, Support and Founder/multi-role solo all passed without requiring separate products, provider-bound capability identities or one-agent-per-role architecture. M4 remains unlocked until final reconciliation and owner approval are recorded.
