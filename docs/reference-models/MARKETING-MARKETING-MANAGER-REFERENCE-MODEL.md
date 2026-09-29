# FOUNDATION-M5-01 — Marketing / Marketing Manager Reference Model

**Date:** 29/09/2026  
**Status:** COMPLETE — REFERENCE MODEL / M4 VALIDATION INPUT  
**Milestone:** FOUNDATION-M5  
**Reference domain:** Marketing  
**Reference role:** Marketing Manager  
**Template under test:** `docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

---

# 1. Purpose

Validate the M4 Operating-Model / Capability Template using a rich real-world domain without turning Kalam's current Marketing structure into a universal template.

This model separates:

## Source-derived evidence

Supported by the Marketing Hub discovery:
- Marketing operates as a continuous loop:
  **Strategy → Evidence → Analytics → Planning → Execution → Measurement → Learning → Strategy**;
- Marketing work spans strategy, evidence/analytics, planning/operations, performance, AI intelligence and governance;
- important operational areas include website/SEO, paid media, social/content, recruitment acquisition, CRM/lead generation, marketing automation, requests, events/partnerships and internal communication where assigned;
- provider-native systems remain authoritative for the data they own;
- metrics/evidence must preserve source, period, definition and quality;
- recruitment acquisition can require cross-domain linkage into downstream Recruiting outcomes;
- AI should reason over governed evidence and must not become source of truth.

## Foundation synthesis

The reusable reference model below generalizes those findings into:
- a Marketing domain pack;
- a Marketing Manager role archetype;
- reusable responsibility families;
- provider-neutral process/capability patterns;
- optional specialist/experience layers.

Anything not supported as universal is marked conditional/optional.

---

# 2. Layer A — Reference Core

## 2.1 Domain identity

**domain_key:** `marketing`  
**name:** Marketing  
**purpose:** Create, communicate, distribute and measure value propositions and market-facing/internal marketing activity in support of organizational outcomes.  
**semantic_owner:** Marketing domain  
**lifecycle:** PREVIEW reference model  
**revision:** M5-01-v1

### Reference business outcomes

Common outcomes may include:

- stronger brand awareness/trust;
- effective audience acquisition;
- qualified demand or recruitment acquisition;
- improved website/search discovery and conversion;
- effective content/channel performance;
- reliable marketing measurement;
- coordinated campaign/project execution;
- efficient resource/spend use;
- evidence-based strategy improvement.

Not every company needs every outcome.

---

## 2.2 Domain authority boundary

Marketing owns the semantics of:

- marketing objective;
- campaign;
- channel;
- audience/segment;
- content/creative marketing work;
- marketing plan;
- marketing performance interpretation;
- website/search marketing performance;
- paid-media performance;
- marketing request/operation;
- marketing evidence/metric definitions within its domain.

Marketing does **not** automatically own:

- sales opportunity/revenue semantics;
- candidate/application/hire semantics;
- support ticket/customer-resolution semantics;
- finance/accounting authority;
- HR/employee policy;
- provider-generated operational truth owned by another domain.

Cross-domain analysis must preserve the owning domain for each entity/metric.

---

## 2.3 Minimal vocabulary

Reference entities:

- **marketing_objective** — intended Marketing outcome aligned to higher-level goals;
- **initiative** — bounded body of strategic work;
- **campaign** — coordinated marketing effort with audience, channel, timing and outcome;
- **audience_segment** — defined target population;
- **channel** — distribution/acquisition surface;
- **content_item** — marketing communication/content unit;
- **creative_asset** — reusable creative/media asset;
- **marketing_request** — request for Marketing work/service;
- **marketing_evidence** — evidence used to verify execution/performance;
- **marketing_metric_definition** — governed metric semantics.

Conditional entities:
- lead;
- event;
- partnership;
- offer/product;
- reputation_signal;
- recruitment_acquisition_record.

These become first-class only where the tenant actually uses them.

---

# 3. Marketing Manager Role Archetype

**role_key:** `marketing_manager`  
**name:** Marketing Manager  
**purpose:** Provide strategic and operational oversight of Marketing outcomes, resources, performance and cross-functional coordination.

This is a reference lens, not an authorization bundle.

## Typical outcomes

- Marketing work aligns to organizational priorities;
- responsibilities have clear owners;
- performance is measured against governed targets;
- budgets/resources are used intentionally;
- major risks/gaps are surfaced early;
- team work is coordinated;
- cross-domain dependencies are managed;
- SIA/automation usage remains governed.

## Typical responsibility interests

A Marketing Manager commonly oversees some subset of:

- marketing strategy & planning;
- brand/message governance;
- content/channel operations;
- website/search performance;
- paid acquisition/campaign performance;
- measurement/reporting;
- marketing operations/requests;
- marketing automation oversight;
- cross-functional Marketing coordination.

Optional depending on company:
- internal communications;
- recruitment/employer marketing;
- events/partnerships;
- reputation/earned presence;
- product/service marketing;
- direct commercial lead-generation ownership.

## Default experience hypothesis

No dedicated "Marketing Manager app" is required.

Reference lens should compose primarily from the common shell:

- **SIA** — ask, delegate, investigate;
- **Work** — tasks/approvals/requests;
- **Projects** — campaigns/initiatives;
- **Performance** — goals/KPIs/reports;
- **Settings** — role/access/connections/automations where authorized.

Marketing-specific work appears as scoped data/components/artifacts, not as mandatory extra top-level navigation.

---

# 4. Reference Responsibility Families

Responsibilities are assignable independently from the Marketing Manager role.

## R-MKT-01 — Marketing Strategy & Planning

**responsibility_key:** `marketing.strategy_planning`  
**outcome:** Approved Marketing objectives, priorities and initiatives remain aligned to organizational direction.  
**default worker policy:** HUMAN_PREFERRED / HYBRID  
**escalation:** accountable Marketing leader/owner.

Typical evidence:
- strategy;
- approved objectives;
- KPI/target definitions;
- plan/review artifacts.

---

## R-MKT-02 — Brand & Message Governance

**responsibility_key:** `marketing.brand_message_governance`  
**outcome:** Brand/message application remains coherent and appropriate across approved surfaces.  
**default worker policy:** HUMAN_PREFERRED / HYBRID

Conditional:
not every tenant centralizes brand governance inside Marketing.

---

## R-MKT-03 — Content & Channel Operations

**responsibility_key:** `marketing.content_channel_operations`  
**outcome:** Planned communications are created, reviewed, distributed and evidenced through appropriate channels.  
**default worker policy:** HYBRID

Can be split into social/content/email/community responsibilities where scale justifies it.

---

## R-MKT-04 — Website & Search Marketing

**responsibility_key:** `marketing.website_search`  
**outcome:** Marketing-owned website/search surfaces support discoverability, audience journeys and governed conversions.  
**default worker policy:** HYBRID

Technical development may remain outside this responsibility.

---

## R-MKT-05 — Paid Acquisition & Campaign Performance

**responsibility_key:** `marketing.paid_acquisition`  
**outcome:** Paid campaigns are planned, monitored and optimized against approved business outcomes and budgets.  
**default worker policy:** HYBRID / DIGITAL_ALLOWED

Consequential provider writes remain separately authorized.

---

## R-MKT-06 — Measurement, Reporting & Decision Support

**responsibility_key:** `marketing.measurement_reporting`  
**outcome:** Marketing decisions use governed metrics, source evidence, quality states and clear comparisons.  
**default worker policy:** HYBRID / DIGITAL_PREFERRED

Strong candidate for specialist assistance.

---

## R-MKT-07 — Marketing Operations & Requests

**responsibility_key:** `marketing.operations_requests`  
**outcome:** Incoming Marketing work is classified, assigned, tracked, completed and evidenced.  
**default worker policy:** HYBRID

---

## R-MKT-08 — Marketing Automation Oversight

**responsibility_key:** `marketing.automation_oversight`  
**outcome:** Marketing-related automations remain intentional, healthy, owned, observable and governed.  
**default worker policy:** HUMAN_PREFERRED / HYBRID

Automation runtime may be platform-owned.

---

## R-MKT-09 — Cross-Functional Marketing Coordination

**responsibility_key:** `marketing.cross_function_coordination`  
**outcome:** Marketing dependencies with Recruiting, Sales, Support, Product, HR or other domains are explicit and tracked.  
**default worker policy:** HUMAN_PREFERRED / HYBRID

This responsibility does not transfer semantic authority over the participating domains.

---

# 5. Layer B — Operable Reference Patterns

Marketing does not need every process below.

These are reference process families.

---

## P-MKT-01 — Strategy-to-Performance Loop

**process_key:** `marketing.strategy_to_performance`

Reference flow:

```
Organizational context
→ Marketing objective
→ KPI / baseline / target
→ initiative/project
→ execution
→ evidence
→ actual performance
→ review / learning
→ strategy adjustment
```

Important rules:
- ideas are not approved objectives;
- targets carry version/approval history;
- actuals come from authoritative sources;
- learning does not silently rewrite approved strategy.

---

## P-MKT-02 — Campaign Lifecycle

**process_key:** `marketing.campaign_lifecycle`

Typical semantic stages:

```
Brief / objective
→ audience/channel plan
→ asset/content preparation
→ approval
→ launch
→ monitor
→ optimize
→ close
→ report / learn
```

Stages may be simplified/expanded by tenant.

Provider workflow is implementation metadata.

---

## P-MKT-03 — Content Lifecycle

**process_key:** `marketing.content_lifecycle`

Typical flow:

```
Need / idea
→ brief
→ draft
→ creative
→ review
→ approved
→ publish/distribute
→ publication evidence
→ performance review
```

Important evidence distinction from Kalam discovery:
**creative evidence is not publication evidence**.

Reference implication:
execution artifact and provider publication receipt may be different evidence objects.

---

## P-MKT-04 — Website / Search Improvement Cycle

**process_key:** `marketing.website_search_improvement`

Typical flow:

```
measurement / issue
→ diagnosis
→ recommendation
→ approved change
→ implementation owner
→ verification
→ performance observation
```

Marketing may own the performance/requirement while Development owns technical implementation.

---

## P-MKT-05 — Marketing Reporting & Review

**process_key:** `marketing.reporting_review`

Typical flow:

```
question / reporting period
→ source readiness
→ data retrieval
→ validation/reconciliation
→ governed calculations
→ report artifact
→ explanation/findings
→ review/decision
```

No silent substitution for missing/conflicting data.

---

## P-MKT-06 — Marketing Request Delivery

**process_key:** `marketing.request_delivery`

Typical flow:

```
request
→ classify
→ assign responsibility
→ plan/execute
→ review/approval
→ deliver
→ evidence
→ close / measure where relevant
```

This may be backed by a ticketing/project system but is provider-neutral.

---

## P-MKT-07 — Recruitment Acquisition to Hiring Outcome — CROSS-DOMAIN

**process_key:** `marketing.recruitment_acquisition_outcome`  
**type:** cross-domain  
**participating_domains:** Marketing + Recruiting

Reference boundary:

### Marketing-owned segment
campaign / channel / spend / lead-or-application acquisition attribution.

### Recruiting-owned segment
candidate/application / stage / disposition / hire outcome.

### Shared analytical layer
joins only through governed identifiers/mappings and carries attribution confidence.

Marketing must not redefine Recruiting's candidate/hire states.

Recruiting must not redefine Marketing campaign/spend semantics.

This process exposed a required M4 cross-domain authority rule.

---

# 6. Capability References

M5-01 does not attempt a complete capability catalog.

Reference capabilities sufficient to test M4:

## Domain-owned read/analyze

- `marketing.performance.read`
- `marketing.performance.analyze`
- `marketing.report.generate`
- `marketing.website_performance.read`
- `marketing.search_performance.read`
- `marketing.paid_media_performance.read`
- `marketing.content_performance.read`
- `marketing.strategy.read`

## Domain-owned draft/write examples

- `marketing.plan.draft`
- `marketing.content.draft`
- `marketing.campaign.draft`

Provider consequential actions should be separated, for example:
- publish content;
- modify advertising budget;
- change live campaign;
- modify website production content.

Exact keys/contracts remain M6/runtime work.

## Shared platform capabilities referenced, not duplicated

Marketing may use shared capabilities for:
- task/project operations;
- connector management;
- automation deployment/health;
- notifications;
- meeting/scheduling;
- artifact storage;
- Engineering Reliability & Quality.

This validates the need for cross-pack references instead of cloning shared definitions into Marketing.

---

# 7. Layer C — Measurable Reference Model

There is no universal Marketing KPI list.

M5-01 defines **metric families**, not mandatory KPIs.

## Strategy / outcome
- objective progress;
- target variance;
- initiative progress.

## Acquisition
Conditional:
- spend;
- leads/applications;
- qualified outcomes;
- CPL/CPA/CPH or other governed efficiency ratios;
- conversion rates;
- attribution confidence.

Ratio metrics must be recalculated from governed numerator/denominator semantics where applicable.

## Website / search
Conditional:
- traffic/engagement;
- defined conversion/key-event outcomes;
- journey/audience segmentation;
- organic visibility/performance;
- technical/mobile performance where relevant.

Raw traffic is not automatically business success.

## Content / social
Conditional:
- publication volume;
- reach/impressions;
- engagement;
- audience growth;
- clicks/conversions;
- content outcome measures.

## Operations
- request/task throughput;
- backlog;
- cycle time;
- approval/rework;
- SLA where defined.

## Automation / system health
Reference shared ERQ/platform metrics rather than inventing Marketing-specific infrastructure truth.

## Quality states

Marketing reporting may need:
- VERIFIED;
- PROVISIONAL;
- DATA_QUALITY_WARNING;
- ATTRIBUTION_WARNING;
- STALE;
- BLOCKED.

---

# 8. Reference Goal Examples

Goals remain optional objects.

Examples:
- increase governed non-branded organic conversions;
- reduce paid acquisition cost for a defined qualified outcome;
- improve content publication consistency;
- reduce Marketing request cycle time.

A goal must bind to a governed metric definition and population.

---

# 9. Reference Artifact Types

Domain-specific candidates:

- **marketing_plan**
- **campaign_brief**
- **content_plan**
- **marketing_report**
- **marketing_finding**
- **marketing_experiment**

Shared artifacts referenced rather than cloned:
- task;
- project;
- decision;
- approval;
- meeting/minutes;
- issue/incident;
- automation proposal/run evidence.

---

# 10. Layer D — Intelligent Reference

## Diagnostic playbooks

Useful Marketing diagnostic classes:

### marketing.performance_variance
Question:
why did performance change relative to a governed comparison?

### marketing.data_quality
Question:
can the Marketing conclusion be trusted?

### marketing.acquisition_efficiency
Question:
which campaign/channel/audience differences explain cost/outcome variance?

### marketing.website_conversion_gap
Question:
is traffic failing to translate into defined business outcomes, or is instrumentation missing?

### marketing.process_bottleneck
Question:
where is Marketing work waiting/reworking/failing?

Diagnostics must disclose:
- missing data;
- conflicting sources;
- attribution uncertainty;
- non-comparable periods/populations.

---

## Eligible Specialist Profiles

Reference candidates:

### Marketing Reporting & Analysis Specialist
Strong candidate because:
- repeated data/metric context;
- structured report artifact;
- provider read capabilities;
- stable evaluation criteria.

### Content & Social Specialist
Candidate; benchmark against Direct SIA.

### SEO / Website Specialist
Candidate where task boundary/context justifies it.

### Recruitment Marketing Specialist
Cross-domain candidate; must preserve Recruiting authority.

### Workflow Architect
Shared/platform specialist rather than Marketing-owned.

### Engineering Reliability & Quality
Shared SIA specialist, referenced by Marketing.

No one-specialist-per-role rule.

---

# 11. Layer E — Experience / Automation

## Common shell

Marketing Manager should work primarily through:

1. SIA
2. Work
3. Projects
4. Performance
5. Settings

## Marketing-specific semantic components

Candidate components/patterns:

- objective/KPI progress;
- campaign summary;
- funnel/attribution view;
- content calendar;
- report viewer;
- evidence/data-quality panel;
- campaign/project Kanban;
- website/search performance view;
- budget/spend comparison.

These do not automatically become top-level tabs.

## Navigation defaults

Role/domain may recommend:
- Marketing-scoped Performance landing;
- pinned active campaigns/projects;
- report shortcuts.

User customization remains bounded by permissions.

## Automation

Marketing may define automations such as:
- reporting schedules;
- content/calendar workflow;
- campaign alerts;
- evidence capture;
- internal communication journeys.

But AutomationDefinition/Deployment/Run remain shared platform contracts.

---

# 12. Marketing Manager + SIA behavior

Reference examples:

> "SIA, show which Marketing objectives are off track."

SIA should:
- identify applicable goals/metrics;
- retrieve governed evidence;
- expose quality/freshness;
- explain variance;
- create/reuse a report/finding artifact.

> "SIA, prepare next month's content plan."

SIA may:
- use Marketing strategy/audience/content context;
- invoke Direct/Specialist mode;
- create a draft artifact;
- create/link work items;
- request approval where publishing/action requires it.

> "SIA, why did French recruitment acquisition get more expensive?"

SIA must compose:
- Marketing campaign/spend evidence;
- Recruiting outcome evidence;
- attribution mapping/confidence;
without claiming ownership over Recruiting truth.

---

# 13. Reference / Configured / Observed test

## Reference

The model above is a reusable Marketing reference.

## Configured example

A tenant may configure:
- no internal communications under Marketing;
- paid media owned by Growth;
- SEO owned by Marketing;
- creative production outsourced;
- specific campaign approval stages.

## Observed example

Evidence may show:
- content repeatedly bypasses approval;
- Marketing Manager performs media buying despite configured ownership;
- website requests queue in another team;
- reports use stale data.

SIA may flag variance.

SIA does not silently rewrite configured ownership/process.

---

# 14. M4 validation findings from M5-01

## PASS — semantic separations work

Marketing validates:

- role != permission;
- responsibility can move independently;
- provider-neutral capabilities;
- process != workflow implementation;
- artifact != source truth;
- specialist optionality;
- sparse progressive layers.

## DEFECT M5-01-A — detailed requirement ambiguity

M4-02 made objects optional/conditional but detailed sections retained generic "Required" wording.

Risk:
new implementer could interpret all object schemas as Domain Pack mandatory fields.

Fix:
M4 now contains a controlling **Detailed-section requirement precedence** rule.

Status:
**FIXED during M5-01.**

## DEFECT M5-01-B — cross-domain process authority

A process such as recruitment acquisition → hiring outcome cannot safely have one domain flatten the entire flow.

Required M4 addition:
- cross-domain process type;
- participating domains;
- coordinating owner where applicable;
- stage-level semantic/domain authority;
- cross-domain metrics/artifacts preserve source ownership.

Status:
**FIX REQUIRED.**

## DEFECT M5-01-C — shared definition references

Marketing naturally uses shared:
- task/project;
- automation;
- issue/incident;
- meetings;
- connector/control-plane behavior.

Domain packs should reference shared definitions rather than cloning them.

Status:
**FIX REQUIRED.**

---

# 15. What was deliberately not universalized

Not promoted as universal Marketing semantics:

- Kalam's seven 2027 objectives;
- specific team members/job allocation;
- Recruit Department = Language mapping;
- Zoho-specific statuses;
- n8n workflow IDs;
- Google Drive folder/naming rules;
- current Meta/LinkedIn account structure;
- Kalam's specific CPL/CPH historical values;
- internal communication being necessarily owned by Marketing;
- recruitment marketing being mandatory for every company.

These remain tenant/reference evidence, not Foundation defaults.

---

# 16. M5-01 verdict

**PASS WITH TWO M4 TEMPLATE CORRECTIONS.**

The Marketing / Marketing Manager reference model fits the M4 structure without requiring a separate product/app or one agent per role.

The strongest validation is that the same common shell can express a broad Marketing Manager role while domain semantics live in responsibilities, processes, metrics, artifacts and scoped components.

Required before M5-02:
1. add cross-domain process authority semantics to M4;
2. add shared-definition reference semantics to M4.

After those fixes:
proceed to **M5-02 — Recruiting / Recruiter**.
