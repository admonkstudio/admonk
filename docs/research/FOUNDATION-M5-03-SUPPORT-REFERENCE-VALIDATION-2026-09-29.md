# FOUNDATION-M5-03 Validation — Support / Support Manager

**Date:** 29/09/2026  
**Result:** PASS WITH M4 CORRECTIONS  
**Reference model:** `docs/reference-models/SUPPORT-SUPPORT-MANAGER-REFERENCE-MODEL.md`

## What M5-03 validated

The M4 template can represent high-volume Support/service operations without:
- defining every ticket as a Support-owned business object;
- creating a separate Support application;
- equating assignment with permission;
- equating provider status with domain process state;
- exposing internal notes to requesters;
- requiring one permanent Support agent per role.

## Evidence basis

### Kalam operational evidence

Kalam's Zoho Desk evidence is valuable because Desk is not used only by a single customer-support team.

Verified setup includes multiple operational departments, cross-department ticket movement/sharing, explicit roles vs permission profiles, direct assignment rules, and native/custom reporting for:
- ticket volume/distribution;
- channel/source;
- status/backlog;
- response/resolution;
- SLA;
- lifecycle/stages;
- reopened work;
- agent workload/performance;
- incoming threads.

This makes Kalam a strong test of whether a provider ticket can remain an implementation/container concept while domain authority stays intact.

### Provider/reference evidence

Current Zoho Desk documentation confirms:
- Blueprint states/transitions can have specific owners and required transition behavior;
- SLA dashboards distinguish tickets, violation instances, residual/violation time, channels, agents and statuses;
- lifecycle/stage reports track ticket transitions and time;
- responses, public comments and private/internal communication have different purposes/history;
- dashboards are visual/derived operational views, not replacements for source case history.

## M4 defects found

### M5-03-A — shared case/request + conversation/thread definitions

Support shows that several domains may reuse the same case/request and conversation mechanics.

A provider ticket may represent:
- support case;
- marketing request;
- recruiting inquiry;
- change request;
- internal service request.

Required M4 correction:
include case/request and conversation/thread among shared-definition candidates, and state that the shared container does not gain authority over the referenced domain object/process.

### M5-03-B — communication audience/visibility

Sensitivity alone is insufficient.

A Support case can contain:
- requester-visible reply;
- public comment;
- private/internal note;
- restricted evidence;
- system event.

Required correction:
when an interaction/evidence object supports multiple audiences, preserve intended audience/visibility, origin and channel; crossing visibility boundaries requires explicit authority and must not happen implicitly through AI summarization or automation.

## Product insight

Recruiting validated a dense pipeline workspace.

Support independently validates a dense queue/case workspace.

Together they show the unified environment should not mean "one generic screen."

The stable pattern is:

```
common shell
→ SIA/context
→ domain-scoped durable workspace when work density justifies it
→ shared component/runtime contracts
→ domain-owned semantics
```

This supports deep domain experiences without product/app duplication.

## SLA insight

M4 does not need a new universal SLA object beyond its process/metric capability, but configured service commitments must be able to carry:
- population/scope;
- target;
- trigger;
- pause/resume semantics where used;
- calendar/timezone where used;
- violation meaning;
- escalation behavior.

Support metrics must distinguish ticket/case vs thread/event grain and not average incompatible populations silently.

## Analytics mirror interpretation

Dashboards/reporting remain valuable as observed/derived evidence.

They can expose:
- backlog;
- bottlenecks;
- SLA risk;
- workload;
- reopening;
- channel trends.

But a dashboard snapshot does not replace ticket history or the domain system that owns the underlying business object referenced by a request.

## SIA safety boundary

SIA may:
- triage;
- summarize;
- analyze backlog/SLA;
- draft replies;
- suggest knowledge;
- coordinate escalations;
- create findings.

SIA must:
- preserve public/private/internal visibility;
- separate draft from send authority;
- preserve cross-domain ownership;
- expose uncertainty/stale knowledge;
- avoid declaring a downstream domain task complete merely because a ticket was closed.

## M5-03 result

**PASS WITH TWO M4 CORRECTIONS.**

After promoting:
1. shared case/request + conversation/thread references;
2. communication audience/visibility semantics;

the next validation is:

**M5-04 — Founder / multi-role solo.**

This final M5 case should stress:
- one person holding many roles/responsibilities;
- sparse configuration;
- progressive setup;
- no artificial department hierarchy;
- personal vs organization context;
- authority when owner/operator are the same person;
- transition from solo to first hires without remodelling the company.
