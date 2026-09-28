# FOUNDATION-M3-12 — Release / Compatibility Expectations Visible to Customers

**Date:** 2026-09-28  
**Status:** LOCKED — OWNER SELECTED SCENARIO B  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Research depth:** Deep decision research  
**Implementation authority:** None

---

## 1. Topic overview

M2 already solved the **internal architecture** of versioning and compatibility.

Locked M2-19 says Admonk must:
- version the contracts, schemas and immutable definitions that consumers depend on;
- keep release versions, contract/schema versions, definition revisions and migrations distinct;
- use a lifecycle of DEVELOPMENT → PREVIEW → STABLE → DEPRECATED → RETIRED for shared stability;
- explicitly classify compatibility;
- allow federated products to release independently;
- avoid a universal N-1 support rule;
- use managed migration and explicit deprecation instead of silent breaking change;
- prevent feature flags from becoming permanent tenant-specific compatibility forks.

M3-12 therefore does **not** decide how source code is versioned.

It decides the customer promise:

> How much release visibility, preparation time, preview/control and compatibility information should Admonk expose to customers while still remaining an evergreen SaaS platform that can evolve quickly?

This decision affects:
- enterprise change-management trust;
- user disruption;
- support burden;
- training/readiness;
- API/integration stability;
- cross-product compatibility;
- product release independence;
- cost and QA matrix size;
- the future role of Admonk One / Setup & Health.

A poor answer has two opposite failure modes:

1. **Too little customer control:** Admonk changes quickly but surprises customer teams, creates support load, and makes business-critical automation risky.
2. **Too much customer control:** every tenant drifts onto a different effective version, creating release branches, compatibility matrices, migration debt and operational cost.

The desired answer must preserve the locked Admonk model:
- federated specialist products;
- independently releasable products;
- stable shared contracts;
- one coherent suite;
- no customer-specific product forks;
- low unnecessary operational complexity;
- clear enterprise governance.

---

## 2. Authoritative source 1 — Microsoft 365 change/release management

### Primary evidence

Microsoft 365 currently supports Standard and Targeted release patterns and is moving toward audience-based release management. Targeted release can expose changes to selected users before the wider organization so admins can test, prepare documentation, prepare help desks, and perform compliance/security review.

Microsoft's Message center communicates material product changes with structured information including:
- what is changing and why;
- rollout schedule and phased rollout;
- preview vs General Availability status;
- who and what is affected;
- UI/behavior/default-setting impact;
- actions required;
- compliance/data-handling implications.

Sources:
- https://learn.microsoft.com/en-us/microsoft-365/admin/manage/release-options-in-office-365
- https://learn.microsoft.com/en-us/microsoft-365/admin/manage/message-center-updates

### What Microsoft is optimizing for

Microsoft's model assumes that enterprise customers need **change readiness**, not permanent version ownership.

The customer can:
- expose selected people to changes earlier;
- prepare support/training/governance;
- understand rollout impact;
- receive structured material-change communications.

But Microsoft does not generally promise that every tenant may indefinitely pin every feature to an old version.

### Strong lesson for Admonk

The useful pattern is:

> **Separate release audience from product version.**

A user or test group may see a feature earlier, but the organization is still on the same SaaS product family.

This gives customers preparation time without creating a long-lived customer-specific software branch.

A second strong lesson is that release communication should be **action-oriented**, not a changelog dump.

A material change should answer:
- What?
- Why?
- When?
- Who is affected?
- What behavior changes?
- What does the admin need to do?
- Are there data/security/governance implications?

This maps naturally to Admonk One.

---

## 3. Authoritative source 2 — Atlassian Cloud release management

### Primary evidence

Atlassian Cloud supports several bounded change-management controls:
- Continuous track — changes arrive as available;
- Bundled track — most visible workflow changes arrive together on a monthly cadence;
- Preview track — sandbox receives the bundled changes in advance;
- selected change deferral;
- temporary freeze windows around important business periods.

Atlassian explicitly excludes some classes from ordinary bundling/deferral. Security, performance and bug-fix changes can continue to roll out, and not all large/long-running changes fit the same release-control path.

Sources:
- https://support.atlassian.com/organization-administration/docs/what-are-release-tracks/
- https://support.atlassian.com/organization-administration/docs/what-are-my-options-to-control-the-rollout-of-changes/

### What Atlassian is optimizing for

Atlassian gives enterprise admins more control over **when visible workflow change reaches production**.

The important point is that this is still bounded SaaS change management:
- a few predefined release tracks;
- defined preview behavior;
- defined deferral/freeze mechanisms;
- no arbitrary permanent pinning of every customer to an old application release.

### Strong lesson for Admonk

The useful pattern is:

> **Control disruptive change windows, not software lineage.**

This is particularly relevant for Admonk customers whose:
- campaign operations;
- customer support workflows;
- automations;
- executive reporting;
- Jarvis behaviors

may be business-critical.

An organization may reasonably want:
- preview;
- a short preparation window;
- a temporary freeze around a high-risk business period.

But that does not mean Admonk should maintain a unique software version for that tenant.

---

## 4. What the two sources agree on

Despite different implementations, Microsoft and Atlassian converge on five important principles.

### 4.1 SaaS stays evergreen

Neither pattern turns cloud software into indefinitely customer-pinned legacy installations.

### 4.2 Early exposure is useful

Targeted/preview users or environments help admins, support teams and power users understand change before broad adoption.

### 4.3 Material changes deserve structured communication

Customers need impact, timing and action—not just release-note prose.

### 4.4 Customer controls are bounded

Where delay/defer/freeze exists, it is limited and policy-driven.

### 4.5 Not every change is equally controllable

Security fixes, reliability corrections and some platform changes cannot safely follow the same delay rules as ordinary visible product changes.

---

## 5. Scenario A — Pure Evergreen / Platform-Controlled Release

Admonk owns all rollout timing.

Every tenant receives the current supported product behavior through progressive deployment.

Customers receive:
- release notes;
- major-change notifications;
- deprecation notices.

But customers do not receive:
- preview audiences;
- production deferral;
- freeze windows;
- release-track configuration.

### How it would work

Admonk internally:
- deploys progressively;
- uses flags/canaries;
- checks compatibility;
- can pause/rollback;
- migrates contracts safely.

Customer sees:
- current behavior;
- upcoming major changes;
- required actions.

### Strengths

**Engineering simplicity**
- one effective customer release path;
- smallest test matrix;
- fastest product iteration;
- simplest support model.

**Compatibility simplicity**
- fewer combinations of UI/behavior;
- easier cross-product release coordination;
- easier Jarvis capability compatibility.

**Cost efficiency**
- no customer release-track engine;
- no tenant release scheduling;
- no parallel behavior windows beyond internal rollout.

**Strong fit with early-stage Admonk**
- avoids building enterprise controls before demand exists.

### Challenge Scenario A

#### Customer-change risk

Marketing Hub, Support and future products are operational systems, not casual consumer apps.

A visible workflow change can affect:
- SOPs;
- training;
- automations;
- screenshots/documentation;
- support scripts;
- governance approval;
- customer business events.

Customers may need to prepare before significant changes.

#### Enterprise readiness

Pure forced evergreen behavior weakens the value of:
- customer sandboxes;
- UAT;
- change-management teams;
- regulated/internal approval workflows.

#### Support burden

Without early tenant exposure:
- the first meaningful testing by that customer may occur in production;
- support teams and customer admins learn about behavior at the same time as users.

#### Cross-product effect

A change may be technically backward-compatible but operationally disruptive when Jarvis + Marketing + Support use the same business process.

### Scenario A verdict

Excellent for technical simplicity.

Too rigid as Admonk grows into a business-critical multi-product suite.

---

## 6. Scenario B — Managed Evergreen with Bounded Customer Change Controls

Admonk remains an evergreen SaaS platform.

Customers do **not** own product versions.

Instead, Admonk provides a small governed change-management layer.

### Default model

**Stable / Standard** is the normal production experience for nearly all customers.

Admonk can progressively release internally before broad stable availability.

### Preview

Material changes may be exposed early to:
- selected preview users;
- tenant test groups;
- future sandbox/test tenant where the product supports one.

Preview is:
- optional;
- clearly labeled;
- non-authoritative for long-term compatibility;
- not an alternate permanent version.

### Bounded deferral / freeze

For customer-visible, operationally disruptive changes, Admonk may later support:
- short deferral;
- scheduled production freeze windows;
- bundled-change cadence for qualifying enterprise needs.

These controls:
- have a hard maximum window;
- do not apply to every change;
- never create permanent branches;
- may be plan/capability dependent;
- are introduced only when customer evidence justifies the implementation cost.

Security, critical reliability fixes and mandatory provider/API changes may bypass ordinary deferral under documented policy.

### Customer-facing Change & Compatibility Center

Admonk One should eventually expose one **Changes & Compatibility** surface, connected to Setup & Health.

For a material upcoming change it should show:

**Change**
- product/capability;
- what is changing;
- why;
- customer-visible benefit/rationale.

**Timing**
- preview availability;
- planned stable rollout window;
- deprecation date;
- retirement/enforcement date where applicable.

**Impact**
- affected products;
- affected roles/users;
- UI/workflow impact;
- automations/agents affected;
- connector/provider implications;
- API/contracts affected;
- data/security/governance implications.

**Required action**
- none;
- review;
- test;
- reauthorize;
- update configuration;
- migrate automation/API;
- train users;
- approve a new capability.

**Compatibility**
- compatible;
- compatible with deprecation;
- migration required;
- blocked/unsupported.

These labels already align with M2-19.

**Readiness**
- whether the tenant is affected;
- whether required migration/setup is complete;
- whether a blocking compatibility issue remains.

### Product vs platform ownership

Shared Platform / Admonk One owns:
- release/change presentation contract;
- tenant release preferences where offered;
- aggregated upcoming-change view;
- compatibility/deprecation state;
- tenant readiness summary;
- notification routing;
- cross-product collision detection.

Specialist products own:
- product release content;
- product-specific impact;
- product migration steps;
- product preview eligibility;
- product rollback/recovery semantics;
- detailed domain guidance.

Product Supervisor owns internal release/migration governance, not the customer UI.

Control Room observes operational rollout health but does not become the customer release-management surface.

### Cross-product compatibility rule

Admonk does not ask customers to manually reason about internal product-version combinations.

Foundation owns supported compatibility.

If Marketing Hub stable release requires a newer shared contract:
- Expand/Coexist/Migrate/Verify/Contract rules apply internally;
- the customer sees only the meaningful readiness/migration consequence.

If a customer action is required, Admonk One surfaces it.

### API / integration consumers

Machine-facing contracts need stronger customer promises than ordinary UI details.

Stable externally consumable APIs/contracts should expose:
- compatibility/version boundary;
- deprecation status;
- replacement path;
- migration deadline;
- relevant release notes;
- failure behavior after retirement.

No silent breaking change.

### Jarvis / AI behavior

AI creates a special problem because model-driven behavior can change without a traditional UI release.

Admonk should classify material Jarvis changes where they meaningfully alter:
- available capabilities/actions;
- required permission;
- data access;
- approval behavior;
- agent/task contract;
- cost/credit behavior;
- customer-configured workflow outcome.

Model/provider swaps that preserve the approved capability contract do not automatically require customer release management.

This prevents model-version noise from becoming customer-facing release clutter.

### Strengths

**Customer trust**
- predictable material change;
- preparation without software ownership burden.

**Enterprise fit**
- supports testing/training/compliance/change-management workflows.

**Federated product fit**
- independent products can release while one shared surface explains cross-product impact.

**Compatibility fit**
- directly reuses M2-19 instead of inventing a second compatibility model.

**Operational clarity**
- upcoming changes can become actionable Setup & Health items.

**Scalability**
- bounded tracks avoid a per-tenant version explosion.

### Challenge Scenario B

#### QA matrix growth

Even a Preview + Standard model means multiple active behavior cohorts.

Adding defer/freeze can enlarge the matrix further.

**Mitigation:** keep the number of release audiences intentionally tiny and time-bounded.

#### Cross-product cohort mismatch

Marketing Hub could be preview while Support remains standard.

Cross-product behavior must still be compatible.

**Mitigation:** M2-19 compatibility gates must include supported cross-product release combinations. Preview may never assume another product is also preview unless that dependency is explicit.

#### Operational complexity

Release scheduling, tenant targeting, visibility and notifications require platform capability.

**Mitigation:** do not implement full Atlassian-style tracks at SCALE-1. Start with standard + controlled preview/flags; promote defer/freeze only when evidence justifies it.

#### Customer confusion

Customers could mistake release audience for software version.

**Mitigation:** use language such as **Preview / Standard / Temporary Change Freeze**, not numbered tenant application versions.

#### Security risk

A customer might try to defer a security correction.

**Mitigation:** release-policy metadata declares whether a change is deferrable. Security/reliability/legal/provider-forced changes can bypass freeze/defer.

#### Slow innovation

Too much notification/approval can turn every small improvement into governance overhead.

**Mitigation:** only classify **material customer-impacting change** into the change-management contract. Routine backward-compatible improvements remain ordinary evergreen releases.

---

## 7. Direct comparison

| Dimension | Scenario A — Pure Evergreen | Scenario B — Managed Evergreen |
|---|---|---|
| Engineering simplicity | Strongest | Moderate |
| Customer preparation | Weak | Strong |
| Enterprise governance | Weak–moderate | Strong |
| Release velocity | Strongest | Strong if controls remain bounded |
| QA matrix | Smallest | Larger but controllable |
| Long-lived version fragmentation | None | None if rules are enforced |
| Cross-product readiness | Mostly hidden | Explicitly surfaced |
| API/deprecation clarity | Can be documented | First-class |
| Setup & Health integration | Limited | Strong |
| Support readiness | Reactive | More proactive |
| Alignment with M2-19 | Technically aligned | Technically + customer-experience aligned |
| Early-stage cost | Lowest | Can be low if introduced progressively |

---

## 8. Challenge against the locked Admonk plan

### M3-01 / M3-03 — specialist-first product family

Scenario B preserves specialist release independence.

It does not require the entire suite to release as one train.

### M3-05 — standalone value is complete

A standalone Marketing Hub customer receives complete release/change information without requiring another product.

### M3-07 — Admonk One administration

Change and compatibility visibility belongs naturally in Admonk One because it is a shared administrative concern.

Product-specific details still deep-link into the specialist product.

### M3-08 — thin shared shell

Release administration does not pollute the navigation shell.

It lives in Admonk One.

### M3-09 — federated domain authority

Products own product-change semantics. Shared Platform aggregates the compatibility/readiness contract.

### M3-10 — guided lifecycle

A migration/compatibility blocker may affect readiness or reactivation and is therefore visible through lifecycle/Setup & Health.

### M3-11 — tenant-visible health

A compatibility/migration problem may become an Attention Needed health item, but release planning remains distinct from operational outage/incident state.

### Cost/complexity principle

Admonk should **not** build Microsoft's or Atlassian's entire enterprise release-management system immediately.

The architecture should permit it.

Initial product behavior can be:
1. stable evergreen;
2. internal progressive rollout;
3. controlled Preview for selected tenants/users/test environments;
4. structured material-change/deprecation communication.

Deferred release, freeze windows and bundled cadence become later capability promotions only when actual customer evidence justifies their cost.

---

## 9. Admonk synthesis

The strongest answer is not “customers get every change immediately” and not “customers choose their own product version.”

Admonk should adopt:

> **Evergreen software + bounded change control + explicit compatibility promises.**

This gives Admonk:
- fast product evolution;
- one maintainable SaaS lineage;
- independent specialist-product releases;
- enterprise-grade preparation;
- controlled preview;
- explicit deprecation/migration;
- room to add bounded freeze/defer later;
- no permanent customer release forks.

### Customer promise

Customers should be able to know:

1. **What is changing?**
2. **Why does it matter to us?**
3. **When will we receive it?**
4. **Can we preview it?**
5. **Can it be temporarily deferred, if policy allows?**
6. **What must we do?**
7. **Will our integrations/automations/Jarvis workflows remain compatible?**
8. **What is being deprecated and by when?**

They should **not** need to know:
- internal deployment topology;
- internal package versions;
- service-by-service implementation revisions;
- migration mechanics that have no customer action;
- raw feature-flag state;
- internal compatibility matrix details.

---

## 10. Recommended lock

> **M3-12 — Managed Evergreen Releases with Bounded Customer Change Control**
>
> Admonk remains an evergreen SaaS platform with one supported product lineage rather than customer-pinned application versions.
>
> Standard/Stable is the default customer release experience.
>
> Material changes may use controlled Preview for selected users/tenants/test environments so customers can validate workflows, training, governance and support readiness before broader adoption.
>
> Admonk One provides a customer-facing Changes & Compatibility view for material upcoming changes, rollout timing, affected scope, required actions, compatibility/deprecation state and tenant readiness.
>
> Products remain independently releasable; specialist products own domain-specific release impact/migration guidance while Shared Platform owns the common change/compatibility presentation contract.
>
> Stable external contracts never break silently: deprecation, replacement and migration expectations are explicit under M2-19.
>
> Customer deferral, freeze windows or bundled release cadence may be added as bounded capabilities when evidence justifies them; they never become indefinite version pinning or tenant-specific product forks.
>
> Security, critical reliability, legal/compliance or provider-forced changes may bypass ordinary deferral according to declared policy.
>
> Routine backward-compatible improvements remain evergreen and should not create unnecessary change-management overhead.
>
> **Customers can prepare for change; they do not own a permanent fork of Admonk.**

**Recommendation:** LOCKED — Scenario B.
