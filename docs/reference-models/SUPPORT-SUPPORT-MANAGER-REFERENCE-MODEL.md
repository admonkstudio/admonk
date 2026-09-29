# FOUNDATION-M5-03 — Support / Support Manager Reference Model

**Date:** 29/09/2026  
**Status:** COMPLETE — REFERENCE MODEL / M4 VALIDATION INPUT  
**Milestone:** FOUNDATION-M5  
**Reference domain:** Support  
**Reference role:** Support Manager  
**Template under test:** `docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

---

# 1. Purpose

Validate the M4 Operating-Model / Capability Template against Support/service operations without assuming that every provider ticket is a Support-domain business object or that every organization uses the same support process.

Support is a useful M4 stress test because it combines:
- high-volume case/request work;
- multi-channel conversations and threads;
- assignment/reassignment and cross-team transfer;
- customer-visible vs internal communication;
- SLA clocks and escalation;
- reopen/closure semantics;
- knowledge-assisted resolution;
- dense operational queues;
- provider ticket systems that may also be used by non-Support departments.

## Source-derived evidence

Kalam operational evidence supports:
- Zoho Desk is used across multiple departments, including Onboarding, Marketing, Training, Service Delivery, Talent Acquisition and Project Management;
- department routing, ownership, ticket movement/sharing and permissions are distinct concerns;
- business role hierarchy and provider permission profile are not the same thing;
- operational reporting needs include volume/distribution, channel/source, status/backlog, response time, resolution time, SLA, lifecycle/stage, reopened tickets, agent performance/availability and incoming threads;
- direct assignment rules route new requests, while broader workflow/Blueprint behavior remains separately configurable;
- the provider-native Desk record remains the operational source of truth for its ticket mechanics.

Kalam-specific departments, role names, forms and statuses are evidence only.

## External/reference evidence

Current Zoho Desk documentation was reviewed for:
- Blueprint states/transitions and transition ownership;
- SLA dashboards and violation semantics;
- lifecycle/stage/reopened/response/resolution reporting;
- agent performance;
- public replies vs comments and comment history;
- dashboard/report behavior.

This evidence reinforces that ticket state, conversation event, SLA clock, assignment and business resolution are related but distinct semantics.

## Foundation synthesis

The reusable model below separates:
- shared case/request mechanics from domain-specific work semantics;
- requester/customer subject identity from case identity;
- case lifecycle from underlying domain process lifecycle;
- assignment from authorization;
- customer-visible communication from internal notes/evidence;
- knowledge/recommendation from authoritative resolution;
- provider dashboards from source records.

---

# 2. Layer A — Reference Core

## 2.1 Domain identity

**domain_key:** `support`  
**name:** Support / Service Operations  
**purpose:** Receive, triage, coordinate, resolve and learn from service requests/issues while preserving ownership, communication, service commitments and evidence.  
**semantic_owner:** Support domain where the request is genuinely Support-owned  
**lifecycle:** PREVIEW reference model  
**revision:** M5-03-v1

### Reference business outcomes

Common outcomes may include:
- requests reach the correct accountable owner;
- urgent/high-impact requests are identified and escalated;
- customers/requesters receive timely communication;
- cases progress with traceable ownership;
- service commitments are visible and managed;
- resolutions are evidenced;
- recurring issues and knowledge gaps are surfaced;
- workload/backlog is manageable;
- service quality can be measured without misleading averages.

Not every tenant needs every outcome.

---

# 3. Domain authority and shared case boundary

## 3.1 Support-owned semantics

Where Support owns the service process, it may own:
- support/service case;
- issue/request classification;
- support priority/severity where configured;
- support queue;
- assignment/escalation;
- support response/resolution state;
- support SLA/service commitment;
- customer/support conversation state;
- support resolution;
- support performance definitions.

## 3.2 What Support does not automatically own

Support does not automatically own:
- the underlying Marketing campaign;
- Recruiting application;
- Training enrollment;
- Project Management change request;
- Finance transaction;
- product defect root cause;
- infrastructure incident truth;
- customer/account master truth;
- engineering release truth.

A ticketing provider may host a request about these objects without taking semantic ownership of them.

## 3.3 Provider ticket != universal Support-domain object

A provider ticket can act as:
- Support case;
- internal service request;
- cross-functional request envelope;
- incident intake;
- escalation/approval intake;
- work handoff.

Therefore:
- provider `ticket_id` is implementation identity;
- the reusable business concept should be `case/request` plus domain extension where needed;
- the domain-specific object/process referenced by the case retains its authority;
- moving a ticket between queues/departments does not silently transfer semantic ownership of the referenced business object;
- case status must not silently redefine the underlying domain process status.

This Support test validates a reusable shared case/request boundary.

---

# 4. Reference entities / vocabulary

Reference Support-owned entities where applicable:

- **support_case** — bounded service/support case;
- **requester** — subject/account initiating or affected by the request;
- **support_queue** — operational grouping for intake/assignment;
- **support_classification** — type/category/priority/severity metadata;
- **conversation_thread** — ordered communication associated with a case;
- **support_response** — customer/requester-visible response event;
- **internal_note** — internal collaboration/evidence item not intended for external disclosure;
- **service_commitment** — configured response/resolution/other timing commitment;
- **escalation** — governed elevation/handoff due to risk, time, authority or dependency;
- **support_resolution** — documented Support-side resolution/outcome;
- **reopen_event** — renewed activity after a prior resolved/closed state;
- **support_finding** — durable analytical finding about operations;
- **knowledge_reference** — link to governed knowledge used during resolution.

Shared/platform candidates:
- case/request shell;
- conversation/thread shell;
- task/work item;
- approval;
- incident;
- notification;
- meeting;
- audit/provenance.

---

# 5. Support Manager Role Archetype

**role_key:** `support_manager`  
**name:** Support Manager  
**purpose:** Oversee service quality, workload, escalation, people/process performance and cross-functional resolution without becoming the owner of every underlying business domain.

This is a reference lens, not an authorization bundle.

## Typical interests

- open/backlog volume;
- aging and overdue work;
- priority/severity distribution;
- SLA/service-commitment risk;
- unresolved escalations;
- reassignment/transfer patterns;
- reopened cases;
- agent/team workload;
- response/resolution performance;
- customer feedback/quality;
- recurring issue categories;
- knowledge gaps;
- cross-domain blockers;
- automation/connector health.

## Experience hypothesis

A Support Manager does not require a separate product.

The common shell remains:
- **SIA**
- **Work**
- **Projects**
- **Performance**
- **Settings**

Support materially justifies a persistent queue/case workspace under Work because high-volume triage and case operations require dense, stateful views.

---

# 6. Reference Responsibility Families

## R-SUP-01 — Intake & Classification
**responsibility_key:** `support.intake_classification`  
**outcome:** New requests are captured, minimally classified and routed without inventing unsupported priority/ownership.  
**worker policy:** HYBRID / DETERMINISTIC_AUTOMATION where rules are safe.

## R-SUP-02 — Triage & Assignment
**responsibility_key:** `support.triage_assignment`  
**outcome:** Cases are assigned to an eligible accountable owner/queue based on configured policy.  
**worker policy:** HYBRID.

Assignment does not grant permissions that the assignee does not already possess.

## R-SUP-03 — Requester Communication
**responsibility_key:** `support.requester_communication`  
**outcome:** Requesters receive timely, accurate and appropriately visible responses.  
**worker policy:** HYBRID.

## R-SUP-04 — Case Resolution Coordination
**responsibility_key:** `support.case_resolution`  
**outcome:** The case progresses to an evidenced resolution or appropriate terminal/handoff state.  
**worker policy:** HUMAN_PREFERRED / HYBRID.

## R-SUP-05 — Escalation & Cross-Domain Coordination
**responsibility_key:** `support.escalation_coordination`  
**outcome:** Cases requiring additional authority/domain expertise are handed off without losing context or ownership.  
**worker policy:** HUMAN_PREFERRED / HYBRID.

## R-SUP-06 — SLA / Service Commitment Management
**responsibility_key:** `support.service_commitment_management`  
**outcome:** Time-bound commitments are monitored, risks surfaced and violations investigated.  
**worker policy:** DIGITAL_PREFERRED / HYBRID.

## R-SUP-07 — Knowledge & Resolution Quality
**responsibility_key:** `support.knowledge_resolution_quality`  
**outcome:** Reusable knowledge supports accurate resolution while stale/unsafe knowledge is identified.  
**worker policy:** HYBRID.

## R-SUP-08 — Support Measurement & Reporting
**responsibility_key:** `support.measurement_reporting`  
**outcome:** Support decisions use governed metrics, populations and service-clock semantics.  
**worker policy:** DIGITAL_PREFERRED / HYBRID.

## R-SUP-09 — Workforce / Queue Oversight
**responsibility_key:** `support.workload_oversight`  
**outcome:** Workload, availability and queue pressure are visible and manageable.  
**worker policy:** HYBRID.

## R-SUP-10 — Support Automation Oversight
**responsibility_key:** `support.automation_oversight`  
**outcome:** Routing, reminders, responses and other automations remain governed, observable and safe.  
**worker policy:** HUMAN_PREFERRED / HYBRID.

---

# 7. Layer B — Operable Reference Processes

## P-SUP-01 — Case Lifecycle

Typical semantic flow:

```
intake
→ classify/triage
→ assign
→ investigate/work
→ respond/update
→ resolve
→ close
→ reopen if new activity/evidence requires
```

Exact states are tenant-configurable.

Rules:
- provider status names are implementation/configuration;
- closed/resolved may differ;
- reopen is an event with provenance, not a silent reset;
- case closure does not prove the referenced underlying business object is complete.

## P-SUP-02 — Escalation / Cross-Domain Handoff

```
support case
→ blocker/risk identified
→ target domain/responsibility resolved
→ evidence/context packaged
→ handoff/approval
→ dependent work
→ result returned
→ requester update
→ support resolution
```

The receiving domain owns its own semantic work.

## P-SUP-03 — SLA / Service Commitment Loop

```
applicable commitment
→ clock/context established
→ monitor
→ risk threshold
→ escalation
→ achieved OR violated
→ explanation/learning
```

The commitment definition must govern:
- trigger;
- target;
- applicable population;
- pause/resume conditions where used;
- business/timezone calendar where used;
- violation semantics;
- escalation behavior.

No universal SLA is implied.

## P-SUP-04 — Knowledge-Assisted Resolution

```
case question
→ retrieve governed knowledge
→ check freshness/applicability
→ draft/apply response
→ verify against case evidence
→ respond
→ capture reusable learning where appropriate
```

Knowledge is not automatically authoritative merely because it is retrieved.

## P-SUP-05 — Reopen / Recurrence Review

Reopened/recurring cases may trigger:
- quality review;
- incomplete-resolution diagnosis;
- product/process problem investigation;
- knowledge correction;
- escalation.

## P-SUP-06 — Support Reporting & Review

```
question
→ define ticket/case/thread population
→ source readiness
→ metric/service-clock semantics
→ calculate/reconcile
→ report/finding
→ review/action
```

## P-SUP-07 — Internal Service Request — CROSS-DOMAIN

When Desk/ticketing is used as a generic internal request platform:

- shared case/request mechanics remain platform/shared;
- request-specific semantics belong to the destination domain;
- queue/assignment state does not replace destination-domain process state;
- closure evidence should identify what was actually delivered/resolved.

---

# 8. Communication audience / visibility

Support demonstrates that communication content requires explicit audience semantics.

A case may contain:
- requester/customer-visible reply;
- public comment/update;
- internal/private note;
- restricted evidence;
- system event.

Where the same interaction system supports multiple visibility classes, every communication/evidence item must preserve:
- intended audience/visibility;
- author/origin;
- timestamp;
- channel/surface;
- relationship to case/thread;
- provenance;
- sensitivity where relevant.

Rules:
- internal/private content must not be surfaced externally by summarization, automation or channel conversion;
- changing audience/visibility is a consequential disclosure action;
- a generated draft inherits no delivery authority;
- SIA must distinguish "tell me internally" from "send to requester";
- provider labels are mapped into shared visibility semantics rather than treated as universal names.

This is a reusable Foundation safety requirement beyond Support.

---

# 9. Capability References

## Read/analyze
- `support.case.read`
- `support.queue.read`
- `support.thread.read`
- `support.service_commitment.read`
- `support.performance.read`
- `support.performance.analyze`
- `support.backlog.analyze`
- `support.knowledge_quality.analyze`

## Draft
- `support.response.draft`
- `support.internal_note.draft`
- `support.escalation.draft`
- `support.resolution_summary.draft`

## Write/action examples
- assign/reassign case;
- update classification;
- change case state;
- send requester response;
- add internal note;
- transfer/move case;
- escalate;
- close/reopen;
- create linked task/incident.

Risk depends on content, audience, scope and downstream effect.

---

# 10. Layer C — Measurable Reference Model

No universal Support KPI list is mandatory.

Reference families:

## Volume / demand
- cases created;
- incoming threads/interactions;
- channel distribution;
- category/request-type distribution.

## Backlog / aging
- open backlog;
- aging;
- overdue;
- waiting states;
- unassigned.

## Response
- first response time;
- response time;
- pending responses;
- response SLA achievement/violation.

## Resolution
- resolution time;
- resolution rate;
- first-contact resolution where meaningful;
- closure/reopen;
- handoff dependency time.

## SLA / service commitment
- applicable commitments;
- achieved vs violated;
- violation count/instances;
- residual/violation time;
- violation by status/channel/owner.

## Workforce / ownership
- assigned cases;
- throughput;
- workload distribution;
- availability where a reliable source exists.

## Quality / experience
- customer/requester feedback;
- reopen/recurrence;
- QA review;
- escalation rate;
- knowledge effectiveness where defined.

### Metric rule

Metric definitions must declare:
- case vs thread/event grain;
- creation/response/resolution time anchors;
- business-hours/calendar semantics if used;
- open/closed/resolved/reopened population;
- pause/wait rules;
- authoritative source;
- quality/freshness.

Do not compare raw counts or averages across incompatible departments/channels without preserving context.

---

# 11. Reference artifacts

Domain-specific:
- **support_case_summary**
- **support_resolution**
- **support_escalation**
- **support_report**
- **support_finding**
- **support_quality_review**
- **knowledge_gap_finding**

Shared references:
- task/work item;
- case/request shell;
- conversation/thread shell;
- decision/approval;
- incident/problem where shared;
- notification;
- audit/provenance;
- automation run evidence.

---

# 12. Layer D — Intelligent Reference

## Diagnostic playbooks

### support.backlog_bottleneck
Why is backlog growing or aging?

### support.sla_violation
Which commitment failed, at what stage, and why?

### support.reopen_recurrence
Why are cases reopening or recurring?

### support.routing_mismatch
Are cases reaching the wrong owner/queue/domain?

### support.response_quality
Is the response delayed, incomplete, inconsistent or unsupported?

### support.knowledge_gap
Is a missing/stale/conflicting knowledge source causing repeat work?

### support.cross_domain_blocker
Is Support waiting on another domain, and is ownership/evidence clear?

Diagnostics must preserve:
- requester-visible vs internal context;
- uncertainty;
- source freshness;
- domain ownership.

## Eligible specialists

- **Support Reporting & Analysis Specialist**
- **Case Triage Specialist**
- **Response Drafting Specialist**
- **Knowledge Quality Specialist**
- **Support Operations / SLA Specialist**

These are reusable specialist profiles, not personas or permanent agents per Support role.

Shared:
- Engineering Reliability & Quality;
- Workflow/Automation specialist where justified.

---

# 13. Layer E — Experience / Automation

## Common shell

Support Manager remains primarily in:
1. SIA
2. Work
3. Projects
4. Performance
5. Settings

## Durable Support workspace

Semantically justified patterns:
- queue/inbox;
- case table;
- SLA-risk queue;
- case detail + thread;
- internal/external communication composer;
- escalation panel;
- timeline/history;
- workload view;
- knowledge/evidence panel;
- report/dashboard.

This is a domain workspace, not a separate customer product.

## Automation candidates

- intake normalization;
- deterministic routing;
- assignment;
- reminders/escalation;
- SLA-risk alerts;
- acknowledgement messages;
- knowledge suggestions;
- internal-note drafts;
- reporting schedules;
- stale-case checks.

External responses and consequential transfers must preserve audience/authority.

---

# 14. Support Manager + SIA behavior examples

> "SIA, what is at risk today?"

SIA should surface:
- SLA/service commitment risk;
- aging/unassigned/high-priority cases;
- cross-domain blockers;
- workload pressure;
- data/connector degradation;
with traceable evidence.

> "SIA, reply to this customer."

SIA should:
- distinguish draft vs send;
- retrieve relevant case + governed knowledge;
- preserve private/internal content boundaries;
- draft a requester-visible response;
- execute send only with effective authority/policy.

> "SIA, why are Training tickets taking longer?"

If the ticket system is merely the request envelope:
- SIA may analyze Support/request mechanics;
- it must not redefine Training's underlying process;
- cross-domain findings should preserve Training-owned semantics.

> "SIA, summarize this ticket."

The summary should distinguish:
- requester statements;
- agent/public replies;
- private/internal notes;
- system events;
- linked authoritative records;
- unresolved uncertainty.

---

# 15. Reference / Configured / Observed test

## Reference
The model above is reusable Support/service-operations guidance.

## Configured
A tenant may define:
- departments/queues;
- request types;
- states/statuses;
- priorities/severities;
- assignment rules;
- SLAs;
- escalation policy;
- visibility rules;
- knowledge sources;
- customer communication templates.

## Observed
Evidence may show:
- cases routed differently from configuration;
- assignments repeatedly moved;
- one status becoming a bottleneck;
- SLA risk concentrated by channel/time;
- internal notes leaking into drafts;
- cases closed before downstream work finishes;
- knowledge causing repeat incorrect responses.

SIA may identify differences.

SIA must not silently rewrite configured workflow or cross-domain authority from observation.

---

# 16. What was deliberately not universalized

Not promoted:
- Kalam department names;
- Kalam role/profile mapping;
- specific Zoho status labels;
- current Desk report IDs;
- one-year reporting limitations as Foundation semantics;
- Zoho Blueprint itself;
- current forms;
- specific assignment rules;
- one SLA target;
- one support priority taxonomy;
- Support ownership of all internal requests;
- a universal requirement for business-hours calendars.

---

# 17. M4 validation findings

## PASS — existing M4 semantics

M4 successfully represents:
- role != permission;
- responsibility != assignment;
- provider workflow != process;
- configurable status/stage;
- SLA as process/metric semantics;
- cross-domain handoffs;
- source vs analytics mirror;
- durable domain workspace;
- optional specialists/automation;
- artifacts/evidence;
- authority/escalation.

## DEFECT M5-03-A — shared case/request and conversation shells

M4's shared-definition examples include task/project/etc. but Support demonstrates that reusable **case/request** and **conversation/thread** mechanics are also shared platform candidates.

Without an explicit shared reference:
- Marketing request tickets;
- Recruiting inquiries;
- internal service requests;
- Support cases
could each clone the same case/thread mechanics.

Required correction:
add case/request and conversation/thread to shared-definition candidates and explicitly preserve the referenced domain object's semantic authority.

## DEFECT M5-03-B — communication audience/visibility

M4 models sensitivity but not the operationally distinct audience of a communication/evidence item.

Support requires a reusable rule:
- intended audience/visibility must be explicit where content can be public/external vs internal/restricted;
- transforming or sending content across visibility boundaries is separately authorized;
- internal content must not leak through AI summaries/drafts/automation.

This applies beyond Support to Recruiting, Marketing, HR and company operations.

---

# 18. M5-03 verdict

**PASS WITH TWO M4 CORRECTIONS.**

Support fits the same unified operating environment without a separate product or permanent Support Manager agent.

The strongest validation is that high-volume queue/case work can use a durable workspace while shared case/thread mechanics remain reusable across domains.

Required before M5-04:
1. extend shared-definition references with case/request and conversation/thread;
2. add communication audience/visibility semantics.

Then proceed to:
**M5-04 — Founder / multi-role solo**.
