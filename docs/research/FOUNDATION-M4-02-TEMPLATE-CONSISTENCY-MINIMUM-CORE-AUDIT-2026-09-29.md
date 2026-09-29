# FOUNDATION-M4-02 — Template Consistency & Minimum-Core Audit

**Date:** 29/09/2026  
**Status:** COMPLETE — PASS WITH SIMPLIFICATION  
**Milestone:** FOUNDATION-M4  
**Audited candidate:** `docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

---

## 1. Audit question

Does M4-01 define enough structure for SIA without forcing every company/domain to populate a giant ontology?

Verdict:

> **PASS WITH SIMPLIFICATION.**

The semantic model is sound.

The problem is requirement density: M4-01 marks too many fields as universally required even when the corresponding behavior is not used.

This would violate the Product Master Plan principle:

> **Progressive complexity: solo simple, enterprise governed.**

---

## 2. Requirement classes

M4 adopts four requirement levels.

### CORE

Required for the concept/object to exist safely and coherently.

### CONDITIONAL

Required only when a related feature/behavior is enabled.

Example:
connector scopes are required only when the capability depends on a connector.

### RECOMMENDED

Useful reference/default metadata, but absence does not make the model invalid.

### OPTIONAL

Extension metadata.

---

## 3. Sparse-by-default semantics

Absence must never create accidental authority or false facts.

Rules:

- missing permission/capability grant → **DENY / unavailable**;
- missing approval state where approval policy applies → **not approved**;
- missing source evidence → **UNKNOWN**, never verified;
- missing metric value → **UNKNOWN**, never zero;
- missing role default → inherit/no recommendation;
- missing workspace pattern → use common shell;
- missing specialist → Direct SIA/workflow remains possible;
- missing automation → manual/human process remains valid;
- missing connector → capability readiness is blocked/unavailable when required;
- missing tenant override → inherit higher-level configured value;
- missing process observation → no observed conclusion.

---

## 4. Minimum viable Domain Pack

A Domain Pack does **not** require roles, specialists, metrics, dedicated UI or automations.

Minimum CORE:

1. `domain_key`;
2. name;
3. purpose;
4. at least one business outcome;
5. semantic owner/boundary;
6. stable version/revision;
7. customization boundary/inheritance behavior;
8. responsibility vocabulary **or an explicit declaration that the domain has no assignable responsibility model yet**.

Recommended at reference stage:
- entity vocabulary;
- source-authority intent;
- role archetypes.

Conditional later:
- processes;
- capabilities;
- connectors;
- metrics;
- artifacts;
- diagnostics;
- skills;
- specialists;
- workspace patterns;
- automation definitions.

This allows a reference domain to exist before every provider/process is configured.

---

## 5. Object-by-object audit

### Domain Identity

CORE:
- domain_key;
- name;
- purpose;
- business outcomes;
- semantic owner;
- version/revision.

RECOMMENDED:
- aliases/local terminology.

OPTIONAL:
- industry overlays;
- commercial references.

Result:
**KEEP.**

---

### Domain Authority

CORE principle:
every claim must preserve source/provenance semantics.

But a reference pack may not yet have real operational sources.

Therefore:

CORE:
- authority policy / owner boundary;
- conflict rule at semantic level.

CONDITIONAL when connected/configured:
- operational sources;
- numerical sources;
- policy sources;
- freshness;
- fallback/degradation.

Result:
**SIMPLIFY.**

---

### Entity Vocabulary

Do not require a complete domain ontology.

CONDITIONAL:
define entities only when referenced by:
- responsibilities;
- processes;
- capabilities;
- metrics;
- artifacts;
- workspace/resource links.

CORE per defined entity:
- entity_key;
- human meaning;
- domain owner;
- identity/reference strategy.

CONDITIONAL:
- relationships;
- sensitivity;
- lifecycle;
- source authority.

Result:
**SIMPLIFY.**

---

### Role Archetype

Role Archetypes are **OPTIONAL at Domain Pack level**.

A solo user or custom company may operate directly from responsibilities without adopting a reference role.

CORE if a role is defined:
- role_key;
- name;
- purpose.

RECOMMENDED:
- typical outcomes;
- typical responsibilities.

OPTIONAL:
- metrics;
- default workspace;
- navigation;
- skills;
- artifacts;
- specialist suggestions.

Result:
**SIGNIFICANT SIMPLIFICATION.**

This protects the principle:
role is a lens, not the operating-model foundation.

---

### Responsibility Definition

Responsibility remains the most important assignable semantic object.

CORE if defined:
- responsibility_key;
- purpose;
- expected outcome;
- owning domain;
- default worker policy;
- escalation/failure owner.

RECOMMENDED:
- related processes;
- expected evidence.

CONDITIONAL:
- eligible scopes;
- handoff requirements;
- continuity criticality;
- workload indicators;
- suggested capabilities/roles.

Result:
**KEEP AS CORE OPERATING OBJECT, REDUCE METADATA.**

---

### Process Template

Processes are CONDITIONAL.

Do not require a formal process for every responsibility.

CORE if process exists:
- process_key;
- purpose/outcome;
- trigger;
- completion/terminal condition;
- responsible ownership.

CONDITIONAL:
- stages, when the flow is genuinely staged;
- approval/risk points;
- evidence/artifacts;
- exceptions;
- dependencies;
- SLA/SLO;
- notifications;
- automation;
- specialist checkpoints.

A one-step process is valid.

Result:
**SIMPLIFY.**

---

### Capability Definition

Capabilities are CONDITIONAL: required only for executable/readable product behavior.

CORE if capability exists:
- capability_key;
- purpose;
- owning boundary;
- action class;
- risk class;
- authority requirement;
- version/revision.

CONDITIONAL:
- input/output schema reference — required when exposed to runtime/model/tooling;
- approval policy — required when action class/policy requires it;
- eligible scopes;
- sensitivity;
- audit/provenance;
- readiness;
- connector dependency;
- idempotency/retry;
- cost/latency class.

Result:
**SIMPLIFY WHILE PRESERVING SECURITY.**

---

### Connector Requirement

CONDITIONAL only.

Required when a capability/provider path actually needs an external connection.

No connector section is required for a purely internal/reference domain.

Result:
**KEEP CONDITIONAL.**

---

### Metric Definition

CONDITIONAL.

Only required when:
- Performance/goal use exists;
- process diagnostic needs a metric;
- reporting artifact depends on it.

CORE if metric exists:
- metric_key;
- business question;
- semantic/formula definition;
- authoritative source;
- grain;
- version/revision.

CONDITIONAL:
- dimensions;
- filters;
- freshness;
- units/currency/time;
- quality states.

Result:
**SIMPLIFY.**

---

### Goal

OPTIONAL product object.

Required only when goal-setting is enabled.

Result:
**MOVE OUT OF DOMAIN MINIMUM CORE.**

---

### Artifact Definition

CONDITIONAL.

Define only durable output types actually produced/reused.

CORE if artifact exists:
- artifact_type_key;
- purpose;
- owner/domain;
- provenance/source behavior;
- revision behavior.

CONDITIONAL:
- sensitivity;
- freshness;
- relationship model;
- required metadata.

Result:
**SIMPLIFY.**

---

### Diagnostic Playbook

OPTIONAL intelligent extension.

Do not require diagnostics merely to define a domain.

Result:
**KEEP OPTIONAL.**

---

### Skill

OPTIONAL execution/knowledge extension.

Result:
**KEEP OPTIONAL.**

---

### Specialist Profile

OPTIONAL execution extension.

No specialist required merely because a role exists.

Result:
**KEEP OPTIONAL / benchmark before promotion.**

---

### Workspace / Interaction Pattern

OPTIONAL experience extension.

If absent:
use the common product shell and generic semantic components.

Dedicated workspace exists only when work semantics justify it.

Result:
**KEEP OPTIONAL.**

---

### Navigation Defaults

OPTIONAL recommendation.

Authorization/navigation remain platform-resolved.

Result:
**KEEP OPTIONAL.**

---

### Authority / Escalation

Authority separation is CORE as a platform invariant.

But a domain pack need only declare domain-specific additions where necessary.

No duplication of the complete M2 authorization model.

Result:
**REFERENCE, DON'T DUPLICATE.**

---

### Human / Digital Handoff

CONDITIONAL.

Required only when digital/hybrid fulfillment is allowed.

Result:
**KEEP CONDITIONAL.**

---

### Automation

CONDITIONAL.

Required only when repeatable work has an automation definition/deployment.

Result:
**KEEP CONDITIONAL.**

---

### Configuration / Customization Boundary

CORE.

Every domain pack must declare what may be configured/overridden, even if the answer is initially "no domain-specific overrides."

This prevents accidental tenant forks.

Result:
**KEEP CORE.**

---

### Versioning

CORE for reusable definitions.

Do not require full migration metadata before STABLE lifecycle, but stable key + revision/lifecycle is required from the beginning.

Result:
**KEEP CORE.**

---

### Evidence / Observability

CORE principle, CONDITIONAL implementation.

Every executable object must declare its evidence requirement.

Pure reference objects need provenance/version but not runtime telemetry.

Result:
**SIMPLIFY.**

---

## 6. Progressive Domain Pack layers

M4 adopts a sparse progressive composition model.

### Layer A — REFERENCE CORE

Enough to understand the domain:

- identity/purpose/outcomes;
- semantic authority;
- responsibilities;
- optional role archetypes;
- minimal vocabulary;
- customization boundary;
- version.

### Layer B — OPERABLE

Add only when work is executed:

- process templates;
- capabilities;
- connectors;
- artifacts;
- provider/source bindings;
- approval/risk additions.

### Layer C — MEASURABLE

Add when performance/goal/diagnostic behavior is required:

- metrics;
- goals;
- report definitions;
- quality/freshness;
- drill-through.

### Layer D — INTELLIGENT

Add when SIA specialization/diagnostics are valuable:

- diagnostic playbooks;
- Skills;
- Specialist Profiles;
- observed-process analysis;
- evals.

### Layer E — EXPERIENCE / AUTOMATION

Add when semantics justify dedicated interaction/execution:

- workspace patterns;
- role/domain navigation defaults;
- automations;
- human/digital handoff lifecycle.

These layers are **composable**, not maturity grades.

A domain may need Layer E automation without a dedicated Layer D specialist.

---

## 7. Complexity-budget rule

A field/object is added to a Domain Pack only if at least one applies:

- required to preserve semantic correctness;
- required for deterministic authority/safety;
- required by an actual user interaction;
- required by an executable process;
- required by evidence/measurement;
- required by version/migration compatibility.

Do not add metadata merely because it could be useful later.

---

## 8. M5 construction rule

M5 reference models should begin from **Layer A only**.

Then add B–E only when the reference scenario needs them.

This is deliberate.

M5 should reveal whether the model grows naturally from real work.

Do not pre-populate every field simply because the template contains it.

---

## 9. Audit conclusion

M4-01 semantics survive.

M4-02 changes the usage contract from:

> populate a comprehensive domain ontology

to:

> **start with the smallest safe semantic core and progressively add executable, measurable, intelligent and experience layers only when justified.**

This better supports:
- solo mode;
- simple teams;
- mature enterprises;
- low setup burden;
- AI/token/context efficiency;
- maintainable domain packs.

---

## 10. M4 status recommendation

With this simplification, the M4 template is ready to enter **M5 reference-model validation**.

M4 should remain CANDIDATE until M5 tests:
- Marketing;
- Recruiting;
- Support;
- Founder/multi-role.

If M5 does not reveal structural defects, M4 can be locked without adding another planning sub-milestone.
