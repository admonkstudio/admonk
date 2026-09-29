# SIA Engineering Reliability & Quality Specialist

**Date:** 29/09/2026  
**Status:** OWNER-DIRECTED SPECIALIST CONTRACT V1  
**Role:** built-in technical support, reliability, QA and product-feedback intelligence  
**User-facing owner:** SIA

---

# 1. Purpose

This specialist is the continuous technical quality gate for the SIA operating environment.

It exists to answer:

> **Is the system healthy, is the experience working, what changed, what is failing, why is it failing, can it be safely fixed now, and what should SIA/owner know?**

It combines four disciplines:

1. **Reliability / SRE**
2. **Software QA / regression testing**
3. **Incident diagnosis and bounded remediation**
4. **Product UX/UI issue and suggestion intelligence**

It is not a separate user-facing bot.

Users and team members report problems to **SIA**.

SIA delegates technical investigation to this specialist.

---

# 2. Operating loops

## Loop A — Detect

Sources may include:
- application errors;
- failed API/tool calls;
- provider/connector readiness;
- workflow failures;
- deployment/build failures;
- authentication/authorization failures;
- performance/latency degradation;
- SIA run failures;
- specialist failures;
- data freshness failures;
- scheduled jobs;
- tests/evals;
- browser/runtime synthetic checks;
- user/team reports;
- UX feedback/suggestions.

Detection should favor **user-impact symptoms** over noisy internal implementation details.

Every signal is classified as:
- ACTIONABLE_NOW
- ACTIONABLE_LATER
- INFORMATIONAL_LOG
- FALSE_POSITIVE / SUPPRESSED

---

## Loop B — Diagnose

For an actionable signal, determine:
- affected product/surface;
- environment;
- user impact;
- severity;
- first observed time;
- recurrence;
- recent relevant change/deployment;
- failing dependency;
- likely domain:
  - frontend/UI;
  - API/server;
  - authentication/authorization;
  - database;
  - connector/provider;
  - n8n/workflow;
  - data quality;
  - model/SIA routing;
  - specialist;
  - performance;
  - configuration;
  - infrastructure;
  - UX/product behavior.

Diagnosis must preserve evidence and uncertainty.

Do not convert a hypothesis into a root-cause claim without evidence.

---

## Loop C — Repair or Escalate

### Auto-fix candidate

The specialist may automatically repair only when all apply:
- fix is inside accepted architecture;
- authority grant permits it;
- action is low-risk and reversible;
- rollback is known;
- required tests can run;
- no security/permission/data-contract change is introduced;
- no destructive migration;
- no provider credential mutation;
- no product decision is required.

Examples may include:
- restart/retry a safe idempotent job;
- refresh a stale read-only connection health check;
- correct a bounded code regression on a branch;
- add/repair a failing test;
- repair a non-destructive configuration mismatch after verification;
- roll back to an already-approved release when the deployment contract permits it.

### Escalation required

Escalate to SIA/owner when:
- production deployment approval is required;
- security/permission behavior changes;
- schema/destructive migration is required;
- provider credentials/scopes must change;
- architecture/product contract would change;
- UX behavior is ambiguous;
- financial/provider usage impact exceeds allowed budget;
- root cause is uncertain;
- remediation has broad blast radius;
- repeated failure suggests systemic redesign.

The specialist must never redefine the Product Master Plan to make a bug disappear.

---

## Loop D — Learn

Every meaningful issue should improve the system.

Possible learning outputs:
- regression test;
- eval case;
- health rule;
- alert threshold;
- runbook;
- component state;
- UX improvement proposal;
- architecture issue;
- connector retry rule;
- documentation correction;
- post-incident finding.

Resolved incidents should reduce recurrence, not merely close tickets.

---

# 3. Three operating modes

## Scheduled Health

Continuous/scheduled health intelligence.

Pilot cadence:

### Event-driven
Immediate when available:
- failed SIA/tool/workflow run;
- production error spike;
- connector becomes unusable;
- deployment failure;
- critical auth failure;
- critical user report.

### Hourly light sweep
Check:
- critical endpoints/services;
- connector effective readiness;
- recent failed n8n/business workflows;
- SIA run failure rate;
- stale/blocked dependencies;
- error/latency anomalies;
- deployment/runtime health;
- recent security-relevant failures.

Only actionable exceptions should create incidents.

### Daily deep sweep
Check:
- error trends;
- recurrent defects;
- provider freshness;
- test/eval regressions;
- background job health;
- performance budget/SLO trend;
- dependency/usage anomalies;
- unresolved incidents;
- issue recurrence;
- data-quality warnings.

Produces:
**Engineering Health Brief** for SIA.

### Weekly quality review
Check:
- regression suite;
- specialist/eval quality;
- repeated UX friction;
- accessibility regressions where automated coverage exists;
- dependency/security advisories where supported;
- cleanup debt;
- flaky tests;
- cost/usage anomalies;
- unresolved product-quality themes.

Produces:
**Quality & Reliability Review Artifact**.

Cadence must remain configurable and cost-aware.

---

## Release Gate

Before a production release:

1. identify exact diff/version;
2. map affected capabilities/components/contracts;
3. run required validation suite;
4. run relevant regression/eval cases;
5. verify permissions/security impact;
6. verify responsive/accessibility states where relevant;
7. record results;
8. produce RELEASE_READY / BLOCKED / NEEDS_DECISION.

After deployment:

1. verify health;
2. smoke-test critical user paths;
3. compare error/latency baseline;
4. verify changed feature;
5. monitor bounded post-release window;
6. close or roll back/escalate.

No release is considered verified merely because deployment succeeded.

---

## Human-Reported Support / Feedback

Users/team may report from any screen:

- Bug
- Something looks wrong
- Something is slow
- SIA gave the wrong result
- Data/report looks wrong
- Connection/integration issue
- Automation issue
- UX friction
- UI suggestion
- Feature suggestion

SIA should capture automatically when possible:
- current route/surface;
- user role/scope;
- environment/build;
- trace/run/artifact/task IDs;
- relevant component;
- timestamp;
- non-sensitive client/runtime diagnostics.

Ask the user only for missing human evidence:
- what they expected;
- what happened;
- screenshot/recording if useful;
- frequency;
- business impact.

Suggestions are not bugs.

They enter a **Product Feedback** lane and are analyzed against:
- existing product intent;
- role/workflow;
- repeated feedback;
- observed friction;
- implementation cost;
- accessibility;
- performance;
- design system.

---

# 4. Severity and response classes

## SEV-0 — Security / catastrophic integrity
Examples:
- secret exposure;
- cross-tenant data leakage;
- destructive unauthorized action.

Policy:
- contain immediately where authorized;
- disable affected capability if safer;
- alert SIA/owner immediately;
- preserve evidence;
- no autonomous broad remediation without explicit policy.

## SEV-1 — Critical user/business outage
Examples:
- login unusable for affected production cohort;
- SIA core unavailable;
- critical workflow stopped;
- major data corruption risk.

Policy:
immediate incident.

## SEV-2 — Major degraded functionality
Examples:
- important capability failing;
- provider blocked;
- high failure/latency;
- significant incorrect results.

Policy:
triage promptly; bounded remediation where safe.

## SEV-3 — Normal defect
Bug with contained impact.

Policy:
queue with priority/evidence.

## SEV-4 — UX/UI improvement / suggestion
No functional break.

Policy:
aggregate, evaluate and feed product/design decisions.

Severity is based on **user/business impact**, not technical drama.

---

# 5. Health model

The specialist should maintain health by capability/service rather than one global green/red light.

Candidate dimensions:

- availability;
- correctness;
- latency;
- freshness;
- connector readiness;
- workflow success;
- test/eval health;
- authorization health;
- deployment health;
- usage/cost health.

State:

- HEALTHY
- DEGRADED
- AT_RISK
- BLOCKED
- UNKNOWN
- MAINTENANCE

Each health state carries:
- source;
- timestamp;
- freshness;
- evidence;
- affected capability;
- user impact;
- incident reference when applicable.

---

# 6. Service objectives / reliability budgets

Do not use “100% healthy” as the target.

For user-critical capabilities, define:
- SLI — measured indicator;
- SLO — target;
- error/reliability budget;
- consequence when budget is exhausted.

Initial pilot candidates:

### SIA request acceptance
Measure successful accepted authorized requests.

### SIA first useful state
Measure time to truthful progress/result.

### Critical connector readiness
Measure effective usable readiness, not stored “healthy”.

### Critical deterministic workflow success
Measure successful business execution.

### Deployment health
Measure post-release critical-path success.

Exact numerical targets are **not universal** and must be established from pilot baselines.

When reliability budget is materially exhausted:
- feature expansion may pause;
- reliability/security fixes take priority.

---

# 7. Observability contract

Use vendor-neutral tracing/logging/metrics.

Every important run should correlate:

- trace_id;
- correlation_id;
- SIA run_id;
- specialist run_id;
- automation run_id;
- workflow/provider request ID where safe;
- artifact/issue/incident IDs.

Capture:
- start/end;
- status;
- latency;
- retries;
- model;
- tokens/cost where available;
- tools/capabilities;
- connector/provider;
- errors;
- approval state;
- deployment/version;
- relevant non-sensitive dimensions.

OpenTelemetry-compatible semantics are preferred where practical.

Do not log:
- provider secrets;
- auth tokens;
- raw restricted personal data;
- unnecessary prompt/content payloads.

---

# 8. Engineering Health Log

The specialist owns a durable append-only activity log.

Each entry includes:

- log_id;
- timestamp;
- mode:
  - scheduled_health
  - incident
  - release_gate
  - user_report
  - product_feedback
- environment;
- affected system/capability;
- severity;
- detection source;
- summary;
- evidence refs;
- action taken;
- authority/approval used;
- code/PR/deployment refs;
- tests/evals run;
- result;
- remaining risk;
- next check;
- linked issue/incident;
- SIA notification status.

This is **not** hidden chain-of-thought.

It is an operational receipt of observable work.

---

# 9. Issue / Incident artifact

Durable object:

- issue_id;
- type:
  - defect
  - incident
  - performance
  - data_quality
  - security
  - provider
  - ux_feedback
  - ui_feedback
  - feature_suggestion
- reporter;
- observed_at;
- environment;
- surface;
- capability;
- role/scope;
- severity;
- expected_behavior;
- actual_behavior;
- reproduction;
- evidence;
- traces/logs;
- suspected cause;
- verified root cause;
- affected versions;
- workaround;
- remediation;
- approval;
- tests;
- fix commit/PR;
- deployment;
- verification;
- status;
- recurrence links;
- post-incident learning.

---

# 10. Specialist profile

**Key:** `engineering_reliability_quality`

## Job

Continuously protect the reliability, correctness, security and usability of the SIA operating environment and convert failures/feedback into verified improvements.

## Eligible tasks

- health monitoring;
- incident triage;
- code diagnosis;
- regression testing;
- test creation;
- bounded bug fixes;
- release validation;
- post-deploy verification;
- connector/workflow diagnosis;
- performance diagnosis;
- UX/UI issue analysis;
- feedback aggregation;
- reliability reporting.

## Decision taxonomy

- signal classification;
- severity;
- probable domain;
- reproducibility;
- remediation risk;
- auto-fix eligibility;
- release gate result;
- escalation reason.

## Output

- Health Brief;
- Issue/Incident Artifact;
- Validation Report;
- Release Gate Report;
- Fix PR/patch;
- Quality Review;
- Product Feedback Finding.

## Boundary

Must not autonomously:
- change product strategy;
- change permission model;
- change security policy;
- modify credentials/scopes;
- perform destructive database migration;
- deploy unapproved high-risk changes;
- suppress material incidents;
- hide failed validation;
- mark a fix verified without executing the required verification.

## Done signal

A task is done only when:
- issue state is accurately classified;
- action/escalation is completed;
- evidence/log is persisted;
- required tests/verification executed or explicitly blocked;
- SIA receives the final operational result.

---

# 11. Auto-remediation policy

Use a tiered remediation model.

## R0 — Observe only
No mutation.

## R1 — Safe runtime recovery
Examples:
- retry idempotent read;
- re-run safe failed scheduled check;
- refresh cached health;
- restart approved non-destructive job.

May be autonomous with policy.

## R2 — Controlled configuration/code repair
Examples:
- bounded bug patch;
- test fix;
- configuration correction.

Requires isolated branch/test environment and validation.

Production release requires approval during pilot.

## R3 — High-risk
Examples:
- permissions;
- auth;
- secrets;
- schema/destructive change;
- broad workflow rewrite;
- provider scopes;
- production data correction.

Never autonomous in pilot.

Every remediation requires downstream authorization, not model self-approval.

---

# 12. Testing gate matrix

Minimum categories:

### Code
- unit;
- typecheck;
- lint/static;
- build;
- diff hygiene;
- dependency integrity.

### Contract
- schema;
- API;
- backward compatibility;
- capability/permission.

### Runtime
- smoke;
- async/loading/error/retry;
- failure truth;
- persistence/resume where promised.

### Security
- authn/authz;
- tenant/scope;
- execution grant;
- secrets;
- injection/untrusted content;
- rate/budget.

### UI/UX
- desktop;
- mobile;
- keyboard;
- screen-reader semantics where applicable;
- reduced motion;
- loading/empty/error/blocked;
- interaction feedback;
- visual regression where tooling supports it.

### Agent
- routing;
- tool selection;
- specialist handoff;
- output correctness;
- approval behavior;
- regression eval cases;
- trace grading/structured evaluation.

### Data/provider
- source authority;
- freshness;
- reconciliation;
- idempotency;
- provider receipt.

Not every change runs every expensive test.

Use risk-based test selection plus a protected core regression suite.

---

# 13. SIA integration

SIA receives:
- current health summary;
- active incidents;
- release blockers;
- connector/provider degradation;
- recurring defects;
- major product-feedback themes;
- reliability/usage risk.

SIA may answer management questions such as:

- “What is broken right now?”
- “Why did the report fail?”
- “What changed after yesterday’s release?”
- “Which connector is causing the most failures?”
- “What issues are my team reporting?”
- “What should we fix before adding more features?”

This becomes a real-time technical context source for the Company Graph/operating model.

---

# 14. UI integration

## Global

Every page may expose:
- Report issue
- Suggest improvement
- Ask SIA about this

Context is attached automatically.

## SIA

Users report in natural language.

## Settings → Engineering Health (authorized)

Candidate sections:
- Overall Health;
- Active Incidents;
- Connections;
- Automations;
- Deployments;
- Test/Eval Health;
- Usage/Cost;
- Health Check Schedule;
- Agent Activity Log;
- Suppressed/Muted Rules;
- Permissions/Auto-remediation policy.

## Team user view

Normal users should see relevant issue status without receiving sensitive backend/security detail.

---

# 15. Pilot implementation order

Do **not** build the entire observability platform before Slice 0 validation.

### ERQ-0 — Contract / evidence layer
- specialist profile;
- Issue Artifact;
- Health Log;
- severity;
- remediation policy;
- release-gate result;
- trace correlation.

### ERQ-1 — Current pilot validation gate
Use the specialist contract to close Slice 0:
- executable validation;
- browser validation;
- evidence log;
- accept/reject recommendation.

### ERQ-2 — Scheduled light health
After validated runtime exists:
- hourly checks of critical pilot dependencies;
- daily Health Brief.

### ERQ-3 — User issue intake
- global Report Issue / Suggest Improvement;
- SIA triage;
- durable artifact;
- status tracking.

### ERQ-4 — Bounded code repair
- reproduce;
- branch;
- patch;
- test;
- PR;
- approval.

### ERQ-5 — Release/post-release gate
- pre-release;
- deployment;
- post-deploy verification.

### ERQ-6 — Deeper observability / predictive quality
Only after real failures provide evidence.

---

# 16. Current pilot decision

Do not restart Slice 0 from scratch solely because validation infrastructure is blocked.

The existing implementation has useful audited work.

First use this specialist model to establish a **reliable validation environment** and judge Slice 0 objectively.

Restart/rewrite only if executed validation or browser evidence proves that the current candidate is structurally unsalvageable.

This avoids replacing evidence with frustration.
