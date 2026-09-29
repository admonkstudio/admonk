# FOUNDATION-M5-02 — Recruiting / Recruiter Reference Model

**Date:** 29/09/2026  
**Status:** COMPLETE — REFERENCE MODEL / M4 VALIDATION INPUT  
**Milestone:** FOUNDATION-M5  
**Reference domain:** Recruiting  
**Reference role:** Recruiter  
**Template under test:** `docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

---

# 1. Purpose

Validate the M4 Operating-Model / Capability Template against Recruiting without turning Kalam's current Talent Acquisition setup, Zoho configuration or terminology into universal product semantics.

Recruiting is intentionally a stronger M4 stress test than Marketing because it combines:
- one real person with multiple domain records and lifecycles;
- high-volume case/pipeline work;
- consequential decisions affecting natural persons;
- sensitive personal information;
- cross-domain acquisition, hiring-manager, HR/onboarding and finance handoffs;
- configurable stages/statuses;
- audit/history requirements;
- analytics whose grain can easily be confused.

## Source-derived evidence

Kalam operational evidence supports:
- candidate and application are distinct concepts;
- one candidate may have multiple applications;
- recruiting reporting should use application-level time/grain where the business question is application flow;
- source/UTM attribution can connect Marketing acquisition to Recruiting outcomes without transferring semantic ownership;
- recruiter workload/ownership, application stage/disposition, aging and data-quality exceptions are operationally meaningful;
- Recruiting depends on configurable pipeline stages, interview/assessment coordination, candidate communication, job-opening/requisition work and cross-functional handoffs;
- referral processes can span Marketing, Recruiting, Service Delivery and finance/payment responsibilities;
- provider-native Recruiting records remain authoritative while analytical mirrors are secondary/derived evidence.

Kalam-specific configuration such as `Language = Department`, provider status strings and current report IDs is evidence only.

## External/reference evidence

Current official Zoho Recruit documentation was reviewed for:
- Applications;
- Hiring Pipelines;
- Blueprint states/transitions;
- application-level pipeline history.

It reinforces that candidate, application, stage, status and transition ownership are separate semantics.

Employment-AI governance references were also reviewed, including current U.S. disability/employment guidance, NIST trustworthy-AI guidance and EU AI Act employment/recruitment risk treatment. These are used to validate the need for an explicit human-impact decision boundary, not to impose one jurisdiction's law globally.

## Foundation synthesis

The reusable model below therefore separates:
- real-world subject identity from Recruiting record identity;
- candidate from application;
- role from permission;
- process stage from provider implementation;
- analysis/recommendation from consequential decision authority;
- Recruiting truth from Marketing/HR/Finance truth;
- durable Recruiting workspaces from separate product/app boundaries.

---

# 2. Layer A — Reference Core

## 2.1 Domain identity

**domain_key:** `recruiting`  
**name:** Recruiting  
**purpose:** Fulfill organizational talent demand through governed sourcing, application processing, assessment coordination, selection, offer/hire handoff and measurable candidate-pipeline operations.  
**semantic_owner:** Recruiting domain  
**lifecycle:** PREVIEW reference model  
**revision:** M5-02-v1

### Reference business outcomes

Common outcomes may include:
- approved talent demand becomes an actionable recruiting pipeline;
- appropriate candidate populations are sourced and processed;
- applications progress with timely, traceable evidence;
- candidate communication remains timely and consistent;
- selection activity is evidence-backed and authority-safe;
- source/channel quality is measurable;
- offers/hire handoffs are controlled;
- recruiting workload and bottlenecks are visible;
- data quality supports trustworthy decisions and reporting.

Not every company needs every outcome.

---

## 2.2 Domain authority boundary

Recruiting commonly owns the semantics of:
- recruiting candidate record;
- job application;
- recruiting pipeline;
- recruiting stage/status/disposition;
- recruiting source attribution after intake;
- recruiter assignment/workload;
- recruiting assessment/interview coordination;
- recruiting communication state;
- recruiting recommendation/selection workflow;
- recruiting offer/hire workflow where assigned;
- recruiting performance definitions.

Recruiting does **not** automatically own:
- the originating workforce/headcount demand;
- compensation-budget approval;
- Marketing campaign/spend semantics;
- hiring-manager business evaluation authority;
- employment/worker record after handoff;
- onboarding/training semantics after handoff;
- payroll/finance authority;
- employment policy/legal authority;
- provider truth owned by another domain.

Cross-domain work must preserve stage/entity/source ownership.

---

# 3. Recruiting vocabulary and identity

## 3.1 Reference entities

- **talent_demand** — a business need for capacity/skill; conditional where modeled separately;
- **requisition** — authorized request to recruit for defined need; conditional;
- **job_opening** — recruitable opening/position context;
- **candidate** — Recruiting-domain representation of a person who may be considered for work;
- **application** — candidate-to-job-opening recruiting case with its own lifecycle;
- **source_attribution** — governed source/referral/acquisition context for a candidate/application;
- **assessment** — structured evidence gathered for a defined evaluation purpose;
- **interview** — scheduled evaluation/conversation event and its evidence;
- **recruiting_disposition** — Recruiting outcome/state for an application;
- **offer** — conditional offer object/workflow where Recruiting owns it;
- **hire_handoff** — controlled transition/evidence package into the next owning domain;
- **talent_pool_membership** — optional reusable relationship between a candidate and future opportunity pool.

## 3.2 Candidate != application

A candidate is not an application.

One candidate may have:
- zero applications;
- one application;
- multiple concurrent or historical applications.

Each application may have:
- a different job opening;
- independent stage/status history;
- independent evidence;
- independent disposition;
- independent owner;
- independent timestamps.

Metrics and actions must declare whether their grain is candidate, application, opening, interview, offer or hire.

## 3.3 Subject identity != domain-record identity

A real-world natural person may correspond to multiple governed records across domains and time.

Example:

```
natural person
├── recruiting candidate
│   ├── application A
│   └── application B
└── employee/worker record after hire
```

A subject linkage:
- helps reconcile that records refer to the same real-world person;
- does not collapse their business meaning;
- does not merge independent lifecycles;
- does not transfer authority between domains;
- should carry source/provenance/confidence where the linkage is not authoritative.

This Recruiting test exposes a reusable M4 identity rule.

---

# 4. Recruiter Role Archetype

**role_key:** `recruiter`  
**name:** Recruiter  
**purpose:** Operate assigned Recruiting responsibilities across sourcing, application progress, candidate communication, assessment coordination, selection support and hiring handoff.

This is a reference lens, not an authorization bundle.

## Typical outcomes/interests

A Recruiter may need visibility into:
- assigned openings/requisitions;
- new/unreviewed applications;
- candidates/applications requiring action;
- application aging and stage bottlenecks;
- interviews/assessments awaiting completion;
- missing decision evidence or feedback;
- candidate communications;
- source quality;
- recruiter workload;
- offers/hire handoffs;
- data-quality exceptions.

## Experience hypothesis

A separate top-level "Recruiting app" is not required.

The common shell remains:
- **SIA**
- **Work**
- **Projects**
- **Performance**
- **Settings**

However Recruiting materially justifies an optional **durable domain workspace** under the shared Work/runtime model because high-volume application-case management benefits from persistent dense views.

Candidate Recruiting workspace patterns:
- application pipeline/funnel;
- application table;
- candidate/application detail;
- evidence/timeline;
- interview/scheduling view;
- decision/review panel;
- aging/data-quality view.

This validates the Product Master Plan's durable structured workspace concept without creating a separate product boundary.

---

# 5. Reference Responsibility Families

## R-REC-01 — Talent Demand / Requisition Intake

**responsibility_key:** `recruiting.demand_intake`  
**outcome:** Recruiting receives sufficient authorized role/demand context to begin work.  
**default worker policy:** HUMAN_PREFERRED / HYBRID.

Business/headcount authority may remain with another domain.

## R-REC-02 — Sourcing & Pipeline Development

**responsibility_key:** `recruiting.sourcing_pipeline`  
**outcome:** Appropriate candidate populations are sourced and traceably associated to opportunities.  
**default worker policy:** HYBRID / DIGITAL_ALLOWED.

## R-REC-03 — Application Screening

**responsibility_key:** `recruiting.application_screening`  
**outcome:** Applications receive timely evidence-based preliminary review under configured criteria.  
**default worker policy:** HYBRID.

Digital assistance does not imply autonomous final selection authority.

## R-REC-04 — Interview & Assessment Coordination

**responsibility_key:** `recruiting.interview_assessment_coordination`  
**outcome:** Required assessments/interviews are scheduled, completed and evidenced.  
**default worker policy:** HYBRID / DETERMINISTIC_AUTOMATION for procedural scheduling where authorized.

## R-REC-05 — Candidate Communication

**responsibility_key:** `recruiting.candidate_communication`  
**outcome:** Candidates receive timely, appropriate communication tied to the correct application/process state.  
**default worker policy:** HYBRID.

## R-REC-06 — Selection Coordination

**responsibility_key:** `recruiting.selection_coordination`  
**outcome:** Required evidence and accountable decision-makers are brought together for application disposition.  
**default worker policy:** HUMAN_PREFERRED / APPROVAL_REQUIRED.

The responsibility does not imply that the Recruiter personally owns every hiring decision.

## R-REC-07 — Offer & Hire Handoff

**responsibility_key:** `recruiting.offer_hire_handoff`  
**outcome:** Approved selection is translated into the configured offer/hire/handoff process with traceable evidence.  
**default worker policy:** HUMAN_PREFERRED / HYBRID.

## R-REC-08 — Talent Pool / Re-engagement

**responsibility_key:** `recruiting.talent_pool`  
**outcome:** Eligible candidates may be retained/re-engaged under configured policy and consent/retention requirements.  
**default worker policy:** HYBRID.  
**conditional:** not all organizations maintain talent pools.

## R-REC-09 — Measurement & Reporting

**responsibility_key:** `recruiting.measurement_reporting`  
**outcome:** Recruiting decisions use governed populations, metrics, source evidence and quality states.  
**default worker policy:** DIGITAL_PREFERRED / HYBRID.

## R-REC-10 — Recruiting Data Quality

**responsibility_key:** `recruiting.data_quality_operations`  
**outcome:** Missing, conflicting, duplicate or semantically invalid Recruiting records are surfaced and reconciled.  
**default worker policy:** HYBRID / DETERMINISTIC_AUTOMATION where rules are safe.

## R-REC-11 — Cross-Functional Recruiting Coordination

**responsibility_key:** `recruiting.cross_function_coordination`  
**outcome:** Dependencies with Marketing, hiring managers, HR/People, Training, Finance or Operations remain explicit and tracked.  
**default worker policy:** HUMAN_PREFERRED / HYBRID.

---

# 6. Layer B — Operable Reference Processes

## P-REC-01 — Demand / Requisition to Opening

Typical flow:

```
business demand
→ requisition/context
→ authority/approval
→ job-opening definition
→ recruiting ownership
→ sourcing activated
```

The organization may combine or omit demand/requisition objects.

## P-REC-02 — Application Lifecycle

**process_key:** `recruiting.application_lifecycle`

Reference semantic flow:

```
application/intake
→ initial review
→ screening
→ assessment/interview
→ decision-ready
→ disposition
→ offer/hire handoff OR close/archive
```

Exact stages are tenant-configurable.

Rules:
- application stage != candidate identity;
- stage != provider workflow node;
- stage/status/disposition may be distinct;
- transitions can have accountable owners, evidence and SLAs;
- historical applications remain independent.

## P-REC-03 — Screening / Assessment / Interview

Typical flow:

```
criteria/context ready
→ evidence collection
→ structured review
→ interview/assessment
→ feedback complete
→ recommendation/decision-ready
```

Any AI assistance must respect the human-impact decision boundary.

## P-REC-04 — Offer to Hire Handoff

Typical flow:

```
approved selection
→ offer preparation/approval
→ candidate response
→ hire confirmation
→ Recruiting evidence package
→ HR/People/Onboarding handoff
```

Downstream employee/onboarding truth belongs to its owning domain.

## P-REC-05 — Talent Pool / Re-engagement

Conditional process for policy-compliant future opportunity matching.

## P-REC-06 — Recruiting Reporting & Review

```
business question
→ population/grain definition
→ source readiness
→ retrieval
→ quality/reconciliation
→ calculation
→ report/finding
→ review/action
```

No silent candidate/application population mixing.

## P-REC-07 — Recruiting Data Quality Reconciliation

Typical classes:
- missing source/UTM;
- invalid/missing stage/status;
- duplicate or uncertain person linkage;
- opening/application mismatch;
- stale ownership;
- missing decision evidence;
- inconsistent terminal states;
- missing timestamps required by metrics.

## P-REC-08 — Recruitment Acquisition to Hiring Outcome — CROSS-DOMAIN

**participating domains:** Marketing + Recruiting

Marketing owns:
- campaign;
- channel;
- spend;
- acquisition creative/audience;
- marketing attribution inputs.

Recruiting owns:
- candidate;
- application;
- Recruiting stage/disposition;
- hire outcome.

Shared analytics require governed joins and attribution confidence.

## P-REC-09 — Hire to Onboarding — CROSS-DOMAIN

**participating domains:** Recruiting + HR/People/Onboarding (tenant-specific)

Recruiting owns Recruiting completion/handoff evidence.

The receiving domain owns employee/onboarding lifecycle after accepted handoff.

## P-REC-10 — Referral Campaign to Hire / Bonus Readiness — CROSS-DOMAIN

Reference only where configured.

Kalam evidence shows a valid multi-domain pattern:
Marketing may own campaign/form communication; Recruiting may own eligibility/hire validation; operational/financial teams may own payout readiness.

The reusable rule is stage-level semantic authority, not Kalam's exact departments or process.

---

# 7. Capability References

## Read / analyze

- `recruiting.job_opening.read`
- `recruiting.candidate.read`
- `recruiting.application.read`
- `recruiting.pipeline.read`
- `recruiting.performance.read`
- `recruiting.performance.analyze`
- `recruiting.source_quality.analyze`
- `recruiting.data_quality.analyze`

## Draft / assist

- `recruiting.requisition.draft`
- `recruiting.candidate_message.draft`
- `recruiting.interview_plan.draft`
- `recruiting.assessment_summary.draft`
- `recruiting.recommendation.draft`

A recommendation capability is not a decision capability.

## Write/action examples

Conditional provider-neutral actions may include:
- schedule interview;
- send approved communication;
- update non-consequential application metadata;
- assign recruiter;
- move application stage;
- record evidence;
- issue approved offer;
- close/reject application.

Action class/risk must reflect consequence, not merely API method.

Bulk consequential actions require stronger controls.

---

# 8. Human-impact decision boundary

Recruiting demonstrates why generic WRITE_HIGH is not sufficient by itself.

For any capability/process/specialist that materially influences a consequential decision about a natural person, configure:
- **decision role:** INFORM / ANALYZE / RECOMMEND / DECIDE / EXECUTE;
- accountable human/policy authority;
- required human review/approval where applicable;
- permitted/prohibited evidence or factors;
- required decision evidence;
- explanation/notification requirements where policy/law requires;
- override/appeal/accommodation path where applicable;
- jurisdiction/policy applicability;
- audit/provenance.

Reference default:
- SIA may summarize, analyze, draft and recommend;
- SIA does not gain authority to make a final hire/reject/offer decision merely because it can read/write Recruiting records;
- procedural automation such as scheduling/notifications may be automated separately where authorized.

A tenant may configure different authority only within applicable law/policy and platform ceilings.

---

# 9. Layer C — Measurable Reference Model

There is no universal Recruiting KPI list.

Reference metric families:

## Demand/opening
- open requisitions/openings;
- opening aging;
- demand coverage.

## Funnel
- applications by defined population;
- stage entry/exit counts;
- stage conversion/drop-off;
- terminal dispositions.

## Speed
- time to first action;
- stage aging;
- time to decision;
- time to fill/hire where definitions are governed.

## Source quality
- applications by source;
- qualified outcomes by source;
- hires by source;
- source-to-stage/hire conversion;
- cost metrics where Marketing/Finance sources are governed;
- attribution confidence.

## Workload
- applications/openings by recruiter;
- assigned backlog;
- throughput;
- aging by owner.

## Interview/assessment
- scheduled/completed/pending;
- feedback completion;
- decision-ready delays.

## Offer/hire
- offers issued;
- offer response/acceptance;
- hires;
- offer/hire handoff completion.

## Candidate communication
- response/service timeliness where configured;
- pending candidate communication;
- SLA violations.

## Data quality
- records missing required source, owner, stage/status, dates or evidence;
- duplicate/uncertain subject linkage;
- conflicting terminal states.

### Metric rule

Every metric must declare:
- grain/population;
- authoritative source;
- numerator/denominator where relevant;
- time anchor;
- terminal-state mapping;
- dimensions/filters;
- quality state;
- attribution/reconciliation state where cross-domain.

"Candidate Created Time" and "Application Created Time" are not interchangeable merely because both are dates.

---

# 10. Reference Artifacts

Domain-specific candidates:
- **recruiting_requisition_brief**
- **application_assessment**
- **interview_summary**
- **recruiting_recommendation**
- **recruiting_pipeline_report**
- **recruiting_finding**
- **source_quality_report**
- **hire_handoff**

Shared artifacts referenced instead of cloned:
- decision;
- approval;
- task/work item;
- meeting;
- notification;
- issue/incident;
- automation definition/run evidence.

---

# 11. Layer D — Intelligent Reference

## Diagnostic playbooks

### recruiting.pipeline_bottleneck
Where and why are applications waiting?

### recruiting.source_quality
Which sources differ in downstream qualified/hire outcomes, with what confidence?

### recruiting.application_aging
Which application cases exceed configured expectations and why?

### recruiting.data_quality
Can the current Recruiting conclusion be trusted?

### recruiting.recruiter_workload
Is work unevenly distributed or blocked by ownership/dependency?

### recruiting.decision_evidence_gap
Which applications are awaiting required evidence/feedback/approval?

### recruiting.handoff_gap
Where does a cross-domain Recruiting handoff stop or lose evidence?

Diagnostics must not:
- infer protected traits;
- use unsupported proxies for protected traits;
- treat correlation as candidate suitability;
- conceal missing evidence;
- turn a recommendation into an authorized decision.

## Eligible Specialist Profiles

Reference candidates:
- **Recruiting Reporting & Analysis Specialist**
- **Sourcing Research Specialist**
- **Candidate Communication / Scheduling Specialist**
- **Recruiting Data Quality Specialist** or shared data-quality capability
- **Recruiting Process Specialist**

A Candidate Screening/Assessment Specialist is possible only when:
- narrowly scoped;
- evidence/criteria are governed;
- human-impact decision role is explicit;
- prohibited factors/uses are defined;
- eval/fairness/error monitoring is appropriate;
- it is benchmarked against Direct SIA/deterministic alternatives.

It must not become a hidden autonomous hiring authority.

Shared specialists:
- Engineering Reliability & Quality;
- Workflow/Automation architecture where shared.

---

# 12. Layer E — Experience / Automation

## Common shell

Recruiter remains inside:
1. SIA
2. Work
3. Projects
4. Performance
5. Settings

## Durable Recruiting workspace

Recruiting is the first M5 scenario that materially justifies a persistent dense domain workspace.

Possible composed patterns:
- funnel/Kanban;
- application table;
- candidate/application detail drawer/page;
- stage/history timeline;
- evidence panel;
- interview calendar;
- approval/review panel;
- aging/workload view;
- source-quality report;
- data-quality exceptions.

This workspace is:
- domain-scoped;
- permission-aware;
- composed from shared runtime/components;
- reachable from Work/SIA;
- not proof that Recruiting is a separate application.

## Automation candidates

- application intake normalization;
- assignment rules;
- scheduling;
- reminders;
- candidate communications;
- data-quality checks;
- reporting schedules;
- stale-case alerts;
- handoff preparation.

Automation Definition/Deployment/Run remain shared contracts.

---

# 13. Recruiter + SIA behavior examples

> "SIA, what needs my attention today?"

SIA should combine:
- assigned applications/openings;
- aging;
- upcoming interviews;
- missing evidence;
- candidate communications;
- configured SLAs/priority;
without inventing a candidate ranking.

> "SIA, why are French-language applications taking longer this month?"

SIA should:
- define the application population/time anchor;
- retrieve authoritative pipeline evidence;
- compare stages/owners/sources;
- expose missing/conflicting data;
- produce a finding/report artifact;
- distinguish operational causes from speculation.

> "SIA, summarize this application for the hiring review."

SIA may:
- summarize governed evidence;
- distinguish fact from inference;
- identify missing evidence;
- draft a recommendation if allowed;
- disclose source/provenance.

It must not silently make the final employment decision.

> "SIA, reject all candidates who failed criterion X."

Before action, the system must evaluate:
- whether criterion X is allowed/configured;
- whether the action is consequential/high-impact;
- whether human review/approval is required;
- exact scope/population;
- audit and notification requirements.

Possession of a write connector alone is insufficient authority.

---

# 14. Reference / Configured / Observed test

## Reference
This model provides reusable Recruiting semantics.

## Configured
A tenant may define:
- its own pipelines/stages/statuses;
- hiring-manager approval points;
- assessments/interview structure;
- ownership rules;
- communication templates;
- offer/hire handoff;
- retention/talent-pool policy;
- metrics and SLAs.

## Observed
Operational evidence may show:
- applications bypass configured stages;
- recruiter assignment differs from configured ownership;
- candidate communications lag;
- stale application cases accumulate;
- analytics mirror a workflow differently from the source system;
- selection evidence is incomplete;
- one person appears in multiple records.

SIA may identify variance and recommend correction.

SIA must not silently rewrite configured process from observation.

---

# 15. What was deliberately not universalized

Not promoted as universal Recruiting semantics:
- Kalam `Language = Department`;
- Kalam-specific Zoho status values;
- current Recruit report IDs;
- specific recruiter names;
- current Zoho module/field labels where provider-specific;
- exact referral bonus process;
- current n8n tags/workflow IDs;
- a particular assessment sequence;
- one universal KPI target;
- one universal definition of "qualified";
- Recruiting owning onboarding in every company;
- Marketing owning all sourcing in every company;
- any one jurisdiction's employment-AI rule as global policy.

---

# 16. M4 validation findings

## PASS — existing M4 semantics

M4 successfully represents:
- Recruiting domain authority;
- candidate/application entity separation;
- configurable pipelines;
- roles independent from permission;
- responsibilities independent from role;
- Reference / Configured / Observed process reality;
- cross-domain Recruiting/Marketing and Recruiting/HR processes;
- provider-neutral capabilities;
- governed metric grain/time/source;
- durable artifacts;
- optional specialist profiles;
- dense domain workspaces without separate apps.

## DEFECT M5-02-A — subject vs domain-record identity

M4's existing entity rule prevents accidental normalization but does not explicitly model the common case where several domain records legitimately refer to one real-world subject.

Required correction:
add a subject-linkage rule that preserves distinct domain-record identity/lifecycle while allowing governed cross-record/cross-domain linkage with provenance/confidence.

## DEFECT M5-02-B — human-impact decision boundary

M4 models risk/action classes and approvals but does not explicitly separate AI/system participation in a decision from authority to make that decision.

Required correction:
for consequential decisions about natural persons, allow policy to define INFORM / ANALYZE / RECOMMEND / DECIDE / EXECUTE roles, accountable authority, human review, prohibited factors, required evidence and applicable policy/jurisdiction controls.

This is a conditional overlay, not a Recruiting-only object and not a universal ban on AI assistance.

---

# 17. M5-02 verdict

**PASS WITH TWO M4 CORRECTIONS.**

Recruiting fits the unified SIA operating environment without:
- a separate Recruiting product;
- one permanent Recruiter agent;
- role-as-permission;
- provider-bound architecture;
- one universal recruiting pipeline.

The strongest product insight is that a unified environment can still support a dense, persistent Recruiting pipeline workspace when the work semantics justify it.

Required before M5-03:
1. promote subject-vs-domain-record identity into M4;
2. promote the human-impact decision boundary into M4.

After those corrections:
proceed to **M5-03 — Support / Support Manager**.
