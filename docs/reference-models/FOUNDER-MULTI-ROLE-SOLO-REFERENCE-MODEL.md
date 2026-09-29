# FOUNDATION-M5-04 — Founder / Multi-Role Solo Reference Model

**Date:** 29/09/2026  
**Status:** COMPLETE — REFERENCE MODEL / M4 VALIDATION INPUT  
**Milestone:** FOUNDATION-M5  
**Reference role:** Founder / Multi-Role Operator  
**Scenario:** one-person company that can grow without remodelling the product  
**Template under test:** `docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

---

# 1. Purpose

Validate the M4 Operating-Model / Capability Template at the smallest practical organizational scale.

This scenario deliberately contains:
- one tenant/company;
- one human member;
- multiple responsibilities across domains;
- optional role archetypes;
- no required department hierarchy;
- a mixture of personal and organization connections;
- SIA as the single visible operator;
- deterministic automation and specialists where justified;
- owner/operator decisions that may have no second internal human available.

The test is not to create a "Founder domain."

It is to prove that the same Marketing, Recruiting, Support and future domain packs can compose around one person and later expand to a team without migration into a different product architecture.

---

# 2. Foundation evidence

The locked Product Master Plan explicitly requires:
- one coherent operating environment from one-person business to enterprise;
- new users joining the existing company model rather than installing departmental products;
- role lenses assembled from archetype + actual responsibilities + scope + permissions + systems + process/capability context;
- progressive complexity: solo simple, enterprise governed;
- human, automation, SIA Specialist or hybrid responsibility fulfillment;
- temporary digital coverage while human-required decisions remain with authorized people.

Locked M2 decisions additionally establish:
- tenant as the hard customer boundary;
- custom roles/scopes and additive capability authorization;
- personal connections do not become organization authority automatically;
- agent authority is an intersection, not inherited wholesale;
- high-risk policy may require separation of duties/self-approval prevention.

The Founder scenario therefore validates composition and governance rather than introducing new product semantics.

---

# 3. Scenario identity

**scenario_key:** `company.multi_role_solo`  
**name:** Founder / Multi-Role Solo  
**purpose:** Allow one person to operate multiple company responsibilities through one SIA environment while preserving domain semantics, authority and future growth compatibility.  
**lifecycle:** PREVIEW reference scenario  
**revision:** M5-04-v1

This is a reference composition scenario, not a new domain pack or SKU.

---

# 4. Founder Role Archetype

**role_key:** `founder`  
**name:** Founder / Owner-Operator  
**purpose:** Provide a company-level lens for an individual carrying multiple strategic and operational responsibilities.

The Founder role is **not**:
- tenant ownership itself;
- a universal admin role;
- automatic access to every connector;
- automatic approval authority;
- a separate SIA personality;
- a replacement for domain responsibilities.

## Typical interests

Depending on the company:
- cash/revenue/growth;
- customers/support;
- Marketing/acquisition;
- sales/business development;
- recruiting/hiring;
- delivery/operations;
- projects/tasks;
- compliance/risk;
- meetings/decisions;
- system/automation health;
- usage/cost.

No fixed list is required.

---

# 5. Sparse company model

A one-person company may validly start with:

- one tenant;
- one member;
- no departments;
- zero or a few role archetypes;
- a small set of explicit responsibilities;
- only the domain packs/capabilities actually needed;
- minimal goals/metrics;
- only required connectors;
- common shell;
- no dedicated specialist unless justified.

Absence remains safe:
- no department → no invented department;
- no role archetype → responsibility/context still works;
- no connector → dependent actions blocked;
- no process observation → no observed-process claim;
- no second approver → policy outcome depends on the approval's independence requirement, not an invented person.

This is positive validation of M4 sparse-by-default composition.

---

# 6. Multi-role responsibility composition

The same human may simultaneously fulfill responsibilities such as:

```
marketing.strategy_planning
marketing.content_channel_operations
support.case_resolution
support.measurement_reporting
recruiting.demand_intake
finance/cash-review (future domain)
company.goal_ownership
```

Rules:
- responsibility identity does not change because the same person holds several;
- one person may switch lenses without moving records between domains;
- assigning a responsibility does not automatically grant required provider capability;
- SIA may synthesize across authorized domains but preserves source authority;
- a domain may be enabled without requiring a department node.

When the first employee joins, responsibilities may be reassigned without changing the tenant or recreating domain data.

---

# 7. Active lens / execution context

A multi-role user makes UI/context ambiguity more dangerous.

Example:
the same person may have authority to:
- publish Marketing content;
- answer Support requests;
- approve a Recruiting requisition;
- administer company settings.

A visual "Founder" lens or currently open workspace must not become implicit action authority.

For any material action, SIA/runtime should bind:
- target tenant;
- target organizational/domain scope;
- target resource/entity;
- target capability;
- active responsibility/context where relevant;
- connector/resource authority;
- approval state.

Rules:
- lens is context/presentation, not permission;
- changing lens does not grant/revoke authority by itself;
- cross-domain synthesis may be company-wide;
- an ambiguous target action should remain draft/ask for target rather than execute against a guessed domain/resource;
- context from one responsibility must not silently authorize an action in another.

This Founder test exposes a reusable lens-vs-execution-context rule.

---

# 8. Approval and self-approval in a one-person company

Solo operation must not weaken governance, but governance must also avoid assuming that every approval can be performed by a second employee.

Every approval policy should be able to declare:
- whether approval is required;
- eligible approver class/scope;
- whether the requester/executor may also approve;
- whether independent/separate approval is mandatory;
- whether explicit self-confirmation is permitted;
- what happens when no eligible independent approver exists.

Reference behavior:

### Low/normal-risk action with policy allowing self-confirmation
The owner-operator may receive a clear action-bound confirmation and proceed.

### Policy requiring independent approval
If no eligible independent approver exists:
- do not silently self-approve;
- block/defer the action or route to an allowed external/owner-defined reviewer;
- explain the unmet control.

### Provider-controlled action
Provider approval/permission remains final regardless of Founder status.

This extends M2's separation-of-duties principle into explicit M4 approval semantics.

---

# 9. Personal vs organization connections

A Founder may initially connect a provider personally.

Rules:
- personal connection ownership remains personal;
- organization/service connections remain organization/service-owned;
- responsibility reassignment does not transfer a personal credential;
- hiring an employee does not automatically expose the Founder's personal connection;
- SIA should show which connection/source supplies an action;
- migration from personal to organization connection is an explicit administrative change.

This validates existing M4/M2 connector ownership rules with no correction required.

---

# 10. Company-level SIA behavior

> "SIA, what needs my attention today?"

SIA may synthesize across all authorized active responsibilities:
- customers/cases;
- campaigns;
- goals;
- recruiting;
- projects/tasks;
- approvals;
- system health;
- meetings/follow-ups.

The output should organize by importance/context without pretending those domains share one source of truth.

> "SIA, handle whatever you safely can."

SIA should:
1. identify candidate work;
2. route deterministic work first where appropriate;
3. act only inside effective authority;
4. separate reversible procedural work from consequential decisions;
5. request action-bound approval where needed;
6. create durable evidence/receipts;
7. leave blocked work visible with reason.

It should not interpret "I'm the founder" as unlimited authority.

> "SIA, cover customer support while I focus on sales."

SIA may temporarily fulfill eligible Support responsibilities under the human/digital lifecycle and configured limits.

Human-required or independently approved decisions remain governed.

---

# 11. Progressive growth test

## Solo

```
1 tenant
1 user
few responsibilities
few connectors
SIA + deterministic workflows
optional specialists
```

## First hire

Add:
- member;
- responsibilities;
- role lens if useful;
- narrower capability scope;
- team context only if needed.

No domain migration.

## Small team

Optionally add:
- team/organizational scopes;
- managers/approvers;
- shared/service connections;
- workload routing;
- stronger separation of duties.

## Enterprise

Add as justified:
- recursive org scopes;
- formal role templates;
- policies/ceilings;
- independent approvals;
- governed connectors;
- specialist/automation capacity;
- compliance/retention overlays.

The company model evolves by configuration and assignment, not by replacing the product.

---

# 12. Layer E — experience

## Common shell

The Founder should begin with the same shell:
1. SIA
2. Work
3. Projects
4. Performance
5. Settings

But progressive complexity matters.

A solo user should not be forced to configure:
- departments;
- team supervisors;
- unused domain packs;
- complex approval chains;
- enterprise reporting;
- specialist catalogs;
- unnecessary dashboards.

SIA can progressively expose:
- role/domain workspaces;
- metrics;
- automations;
- team/admin capabilities
as real needs appear.

## Company-level workspace

A Founder may benefit from a company overview composed from:
- priorities;
- goals;
- cash/growth metrics where connected;
- customer/support risks;
- active projects;
- recruiting/hiring;
- approvals;
- meetings;
- system/automation health.

This should be an assembled lens/artifact workspace, not a new "Founder product."

---

# 13. Metrics / goals

The Founder scenario does not define a universal KPI list.

Company-level performance may combine domain-owned metrics only when:
- each metric retains its definition/source;
- period/population is explicit;
- incompatible measures are not collapsed into opaque AI scores;
- SIA can drill back into domain evidence.

A Founder dashboard is therefore a composed view over governed domain metrics, not a new numerical authority.

---

# 14. Specialists / automation

A solo operator may get disproportionate value from digital capacity, but one-agent-per-job is still rejected.

Useful candidates depend on actual work:
- Reporting & Analysis;
- Content;
- Support triage/response;
- Recruiting sourcing/coordination;
- Workflow Automation;
- Engineering Reliability & Quality.

Routing principle remains:
**DIRECT → deterministic workflow → specialist → team only when justified.**

Cost/latency matter strongly in solo/free entry.

---

# 15. Reference / Configured / Observed test

## Reference
The Foundation provides common role/responsibility/process defaults.

## Configured
The solo company may configure:
- no departments;
- one founder;
- selected responsibilities;
- selected domain packs;
- personal connections;
- limited approvals;
- a few automations.

## Observed
Evidence may show:
- the Founder repeatedly performs work outside the configured responsibility set;
- one function consumes most time;
- repeated manual work should be automated;
- approval flow is blocked by lack of independent approver;
- a personal connection is becoming an organizational dependency;
- a new hire now owns a responsibility.

SIA may recommend configuration evolution.

It must not silently create roles, departments, access or approval exceptions.

---

# 16. What was deliberately not universalized

Not promoted:
- a fixed Founder job description;
- one startup operating method;
- mandatory departments;
- universal founder KPIs;
- Founder = tenant admin;
- Founder = approver for every action;
- all personal accounts becoming company accounts;
- one specialist per missing employee;
- a special solo product fork;
- a mandatory company dashboard.

---

# 17. M4 validation findings

## PASS — sparse/progressive architecture

M4 successfully supports:
- one user holding multiple roles/responsibilities;
- no mandatory department hierarchy;
- domain packs without separate products;
- personal vs organization connector ownership;
- progressive organizational growth;
- temporary digital fulfillment;
- common shell + optional domain workspaces;
- role as lens rather than authorization.

## DEFECT M5-04-A — lens/context must not become action scope

M4's navigation/lens section says user customization cannot create authority, but multi-role solo operation requires a stronger invariant:

**presentation/context lens is not execution target.**

Required correction:
material actions bind explicit tenant/domain/resource/capability/scope context; ambiguous cross-domain actions stay draft/request target instead of executing from a guessed lens.

## DEFECT M5-04-B — approval independence semantics

M4 references approval policy but does not explicitly state whether the initiator/executor may also approve.

Required correction:
approval policy should declare approver eligibility and independence:
- self-approval allowed?;
- explicit self-confirmation allowed?;
- independent approver required?;
- fallback when no eligible approver exists?

If independent approval is required and unavailable, the action remains blocked/deferred rather than being auto-approved because the user is owner/founder.

---

# 18. M5-04 verdict

**PASS WITH TWO M4 CORRECTIONS.**

No Founder domain, separate solo product or alternative authorization model is required.

The same operating environment can begin with one person and scale by:
- adding members;
- reassigning responsibilities;
- adding scopes/roles;
- adding organization-owned connections;
- strengthening policies/approvals;
without changing core semantics.

With the two corrections promoted, M5 has completed all four planned reference validations.

Next gate:
**M5 final reconciliation → M4 final candidate/owner lock → FOUNDATION-M6 Cross-Domain / SIA Contract Freeze.**
