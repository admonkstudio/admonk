# FOUNDATION-M4 Research Input — Kalam SIA Pilot Final Audit

**Date:** 2026-09-29  
**Status:** RESEARCH INPUT — NOT YET FOUNDATION AUTHORITY  
**Source pilot:** `kalamcx/ask-kalam-v2`  
**Source audit:** `docs/audits/SIA-PILOT-FINAL-ARCHITECTURE-UX-SECURITY-COST-AUDIT-2026-09-29.md`

---

## 1. Purpose

Promote only the reusable architecture findings from the Kalam department-scale SIA pilot into the FOUNDATION-M4 research queue.

Do not copy Kalam-specific providers, field mappings, workflows, UI labels or organization structure into SIA Core.

---

## 2. Strong reusable candidates

### Operating-model separation

Keep distinct:
- person/identity;
- department membership;
- role assignment;
- responsibility ownership;
- temporary project assignment;
- capability authorization;
- connector ownership.

This separation proved necessary to model:
- multi-department users;
- responsibility transfer;
- temporary work;
- personal/shared connections.

---

### Capability contract

A capability should define:
- stable key;
- purpose;
- input/output schema;
- risk;
- identity/scope;
- approval;
- idempotency where needed;
- connection dependency;
- readiness;
- audit/provenance;
- exposure.

Provider/workflow IDs remain implementation metadata.

---

### Specialist contract

Reusable Specialist Profile candidate fields:
- Job / purpose;
- eligible tasks;
- decision taxonomy;
- tools/capabilities;
- context mode;
- output/artifact schema;
- boundary/prohibited work;
- Done signal;
- escalation;
- budget/effort;
- eval policy;
- version.

A role is not automatically a specialist.

---

### Skills

Use progressively loaded skills for deep reusable domain/procedure instructions.

Candidate package:

```
skill/
  SKILL.md
  references/
  templates/
  scripts/
```

Do not load the complete operating-model library into every SIA request.

---

### Execution modes

Retain:
- DIRECT
- WORKFLOW
- SPECIALIST
- TEAM
- HYBRID

TEAM remains non-default and must justify cost/parallelism.

---

### Runtime authority

Materialize the Agent Authority Envelope per run as a short-lived scoped Execution Grant/receipt:

- initiating principal;
- tenant/org;
- department/resource scope;
- allowed capabilities;
- eligible connection IDs;
- risk ceiling;
- approval state;
- expiry;
- run/correlation ID.

Agents/workers do not inherit ambient user authority.

---

### Tool/result trust

Treat external/provider/tool content as untrusted data.

Untrusted content cannot:
- enlarge authority;
- redefine policy;
- self-authorize actions.

Use schema validation/structured extraction and concrete approval for high-risk action boundaries.

---

### Artifact contract

Important specialist/workflow results should become persistent artifacts rather than copied long-form through agent chains.

---

### Automation model

Separate:

- AutomationDefinition;
- AutomationDeployment;
- AutomationRun.

Use product-level desired state vs runtime observed state.

This avoids coupling SIA's automation semantics to n8n or any future workflow engine.

---

### Dynamic UI

Promote principles, not a protocol dependency:

- controlled component catalog;
- typed surface/events;
- progressive updates;
- authoritative server business state;
- ephemeral UI state;
- durable view preferences separately;
- no arbitrary generated production UI code.

A2UI/MCP Apps remain interoperability references.

---

### Navigation / role lenses

Candidate precedence:

```
platform mandatory/security
→ tenant capabilities
→ permissions
→ department/role defaults
→ active responsibilities/projects
→ user customization
```

Customization cannot create authority.

---

### Performance / goals

Goals should reference governed metric definitions and authoritative sources.

No opaque employee scoring.

---

### Evaluation

Use:
- trace IDs;
- representative regression cases;
- structured evaluation;
- real corrections/failures;
- versioned specialist/skill/capability inputs.

Keep evaluation portable across model vendors.

---

### Experience quality

Foundation should consider explicit contracts for:
- immediate truthful feedback;
- background/resumable work;
- component loading/empty/error/blocked states;
- reduced motion/accessibility;
- measurable latency/usage.

---

## 3. Reusable reference-domain evidence

Strong M5 candidates from the pilot:

- Marketing Manager;
- Digital Marketing Specialist;
- Recruitment Marketing workflow;
- Talent Acquisition funnel;
- Support/Omnichannel domain;
- multi-department user;
- responsibility transfer;
- personal vs shared connector ownership.

These should be normalized before promotion.

---

## 4. Not reusable without further evidence

Do not promote as universal:

- ClickUp as work authority;
- n8n as platform execution engine;
- Webflow;
- Zoho field/status mappings;
- Recruit Department = Language;
- current Marketing team structure;
- current Marketing/TA workflow IDs;
- exact pilot navigation labels;
- Meta/Recruit attribution specifics.

---

## 5. Technology findings for M4/M6 research

### Strong directions
- code-first typed contracts;
- generated/validated JSON Schema;
- progressive Agent Skills;
- controlled UI catalog;
- short-lived execution grants;
- workflow checkpoints/resume;
- provider-neutral model/runtime adapter.

### Conditional / research
- OpenAI Agents SDK;
- A2UI;
- MCP Apps;
- Promptfoo;
- dedicated Reflex model/router.

### Do not establish as new core dependency
- OpenAI Agent Builder;
- OpenAI hosted Evals platform;
- Jev/System-One vendor;
- graph database solely because conceptual model is called a Company Graph.

---

## 6. Relationship to locked M3

This research input does not reopen M3.

It strengthens the already-locked M3 principles:
- one company operating environment;
- SIA as company brain;
- model work first;
- dynamic specialists;
- deterministic workflows;
- persistent artifacts;
- bounded authority;
- progressive complexity.

Use this document when constructing the M4 Operating-Model / Capability Template and M6 cross-domain contract candidates.
