# R003 — Engineering Simplicity

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** LOCKED — product-owner approved 2026-09-26  
**Target:** future `doctrine/engineering-principles.md`, complexity-budget standard, architecture review behavior

## Research question

What should "simple engineering" mean for Admonk so products start small and inexpensive without creating brittle systems that become expensive to change?

The central tension is:

- **minimize technology and abstractions now**, versus
- **invest enough in evolvability so change remains cheap later**.

## Source A — Choose Boring Technology

**Source:** SRC-SIMP-001

### What it optimizes for

Low operational and cognitive overhead.

The core argument:
- every new technology introduces permanent baggage;
- well-understood technologies have better-known failure modes;
- the "best tool for the local job" may make the global system worse;
- teams should first ask whether the immediate problem can be solved without adding technology;
- new technology should be introduced deliberately and incrementally.

### Strongest ideas for Admonk

- every dependency/vendor/service has an operational cost beyond its license price;
- novelty should be spent only where it creates meaningful product value;
- solve problems with the existing stack before introducing another tool;
- understand failure modes before depending on a technology;
- avoid redundant technologies lingering indefinitely;
- technology choice should optimize the whole product/organization, not one feature.

This strongly supports the current Admonk Complexity Budget.

### Challenge

Copied literally, "boring technology" can:
- make incumbency itself look like evidence;
- preserve a poor existing stack because migration looks expensive;
- underweight the strategic value of technologies that dramatically reduce future complexity;
- slow adoption of genuinely better managed/platform capabilities;
- confuse "well understood" with "appropriate."

The essay is strongest as a **novelty/operations restraint**, not as a complete architecture doctrine.

## Source B — Building Evolutionary Architectures

**Source:** SRC-SIMP-002

### What it optimizes for

Architecture that can change incrementally while preserving important characteristics.

The approach emphasizes:
- incremental architectural change;
- multiple architecture characteristics rather than one fixed "best" structure;
- fitness functions / automated governance to detect architectural drift;
- structuring systems so change can happen without uncontrolled degradation.

### Strongest ideas for Admonk

- simplicity must include **cost of change**, not only smallness today;
- architecture should preserve the qualities that matter while the product evolves;
- important architecture rules can eventually become executable evidence rather than documentation only;
- irreversible decisions deserve more care than reversible ones;
- long-term architecture should emerge through controlled evolution rather than speculative prediction.

### Challenge

Copied literally, evolutionary-architecture practice can:
- encourage teams to build fitness-function infrastructure before there is enough architecture to govern;
- create architecture frameworks around hypothetical future change;
- add automated governance that costs more than the risk it protects;
- overfit to complex organizations and systems;
- turn "evolvability" into an excuse for abstraction layers everywhere.

It is strongest as a **change-safety principle**, not as permission to engineer for every possible future.

## Synthesis

The two approaches protect against opposite engineering failures.

"Choose boring technology" protects against:
> **permanent complexity added for local convenience or novelty.**

Evolutionary architecture protects against:
> **a simple first build becoming rigid, decayed or unsafe to change.**

Admonk needs:
**minimal present complexity + deliberate changeability at the boundaries that matter.**

## Proposed Admonk engineering-simplicity doctrine

### 1. Minimum permanent complexity

Choose the smallest architecture, technology set and abstraction set that correctly satisfies the current validated requirement.

Complexity includes:
- code;
- services;
- databases;
- vendors;
- permissions;
- deployment;
- operations;
- testing;
- support;
- migrations;
- AI evaluation;
- team cognition.

### 2. Existing before new

Before adding a dependency/service/provider/abstraction ask:
1. Can the current stack solve this safely?
2. Is the problem real now?
3. What permanent burden does the new thing add?
4. What capability/evidence does it unlock?
5. Who owns it?
6. How do we leave it?

### 3. Reversibility before flexibility

Do not build generic flexibility for hypothetical futures.

Instead preserve:
- clear domain boundaries;
- explicit interfaces where external dependencies exist;
- migration-safe data/IDs;
- versioned contracts where multiple consumers exist;
- tests around important behavior;
- recoverable deployments/data changes;
- provider isolation where lock-in risk is material.

This creates the ability to change without predicting every future change.

### 4. Local simplicity, global simplicity

A locally elegant solution can make the full system harder to operate.

Evaluate architecture across:
- total dependency count;
- operational burden;
- permission paths;
- data synchronization;
- failure modes;
- cognitive load;
- compatibility/migration cost.

### 5. Abstraction must earn promotion

Do not generalize because two pieces of code look similar.

Promote an abstraction when:
- semantics/behavior are genuinely shared;
- repeated use is real;
- the boundary is stable enough;
- centralization reduces total complexity;
- testing/ownership are clear.

### 6. Evolvability is selective

Invest extra change-safety where:
- the dependency is external or volatile;
- data migration would be costly;
- the capability is core to the product;
- several products/consumers rely on the contract;
- security/permissions are sensitive;
- downtime/recovery cost is high.

Do not build architecture fitness/governance machinery for trivial, reversible internals.

### 7. Technology novelty budget

New technology is justified when its benefit exceeds:
- learning cost;
- integration cost;
- operations;
- security surface;
- monitoring;
- incident burden;
- migration/exit cost.

"Industry standard" and "newer" are not sufficient reasons.

### 8. Refactor from evidence

Refactor/centralize/split when evidence shows:
- repeated change pain;
- recurring defects;
- duplication with genuinely shared semantics;
- scaling bottleneck;
- operational fragility;
- team ownership conflict;
- security/permission complexity;
- excessive cost.

Do not refactor solely to achieve architectural elegance.

## Proposed definition

> **Simple engineering minimizes today's permanent complexity while preserving cheap, safe change at the boundaries most likely to matter.**

This is not:
- fewest lines;
- fewest files;
- no abstractions;
- never adopting new technology;
- one monolith forever;
- designing every future extension in advance.

## Implication for the product family

For Admonk's composable product family:

- default to shared **contracts** before shared runtime services;
- centralize identity/permissions/settings only when the semantics are proven shared and centralization reduces total complexity;
- keep domain logic local;
- avoid per-customer forks;
- preserve version/migration paths for genuine shared contracts;
- promote shared runtime infrastructure only from real multi-product evidence.

## Product-owner decision

**Approved direction: B — Simple core + deliberate change seams.**

### A. Minimum-now
Build the absolute simplest current implementation and refactor only after pain appears.

**Benefit:** cheapest/fastest initial build.  
**Risk:** some changes become disproportionately expensive because no deliberate seams were preserved.

### B. Simple core + deliberate change seams — RECOMMENDED
Keep the implementation minimal, but preserve explicit boundaries/reversibility around external providers, shared contracts, data migrations, permissions and other expensive-to-change areas.

**Benefit:** retains low initial complexity while protecting the highest-cost future changes.  
**Risk:** requires judgment about which seams actually deserve protection.

### C. Future-flexible
Invest early in generalized interfaces, extensibility and automated architecture governance across most of the system.

**Benefit:** broad future flexibility.  
**Risk:** high speculative complexity and slower first delivery.

## Locked Admonk direction

**B — Simple core + deliberate change seams.**

It fits Admonk's principle:
**start small, build correctly, scale only from evidence.**

## Lock result

- Engineering-simplicity doctrine promoted.
- Complexity Budget updated with deliberate change seams.
- Product Platform Foundation strengthened around shared contracts before shared services.
- R003 locked.
- Next item: R004 — Security / Privacy baseline doctrine.
