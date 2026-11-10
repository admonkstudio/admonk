# Admonk Engineering Principles

**Status:** APPROVED DOCTRINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R003-engineering-simplicity.md`  
**Sources:** SRC-SIMP-001, SRC-SIMP-002

## Purpose

Define what engineering simplicity means for Admonk so products begin lean without becoming expensive or unsafe to change.

## 1. Simple core + deliberate change seams

> **Keep the implementation minimal, but deliberately protect boundaries that would be expensive to change later.**

Default protected seams include, when relevant:
- external providers/vendors;
- shared cross-product contracts;
- tenant boundaries;
- permissions/authorization;
- data migrations and durable identifiers;
- consequential action interfaces;
- deployment/data recovery boundaries;
- other high-cost irreversible dependencies.

Do not generalize the whole system merely because some boundaries deserve protection.

## 2. Minimum permanent complexity

Choose the smallest architecture, technology set and abstraction set that correctly satisfies the validated requirement.

Count complexity across:
- code;
- dependencies;
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

## 3. Existing before new

Before adding a dependency, service, provider or abstraction, ask:
1. Can the current system solve this safely?
2. Is the need real now?
3. What permanent burden does the new thing add?
4. What capability/evidence does it unlock?
5. Who owns it?
6. How do we exit or replace it?

## 4. Reversibility before speculative flexibility

Do not build generalized flexibility for imagined futures.

Prefer:
- clear domain boundaries;
- explicit interfaces around volatile/external dependencies;
- migration-safe data structures;
- versioned contracts only when real multiple consumers exist;
- tests around important behavior;
- recoverable deployments and data changes.

## 5. Local and global simplicity

A locally elegant choice can make the whole system harder to operate.

Evaluate total:
- dependency count;
- operational burden;
- permission paths;
- data synchronization;
- failure modes;
- cognitive load;
- compatibility/migration cost.

## 6. Abstractions must earn promotion

Promote a shared abstraction when:
- semantics/behavior are genuinely shared;
- repeated use is real;
- the boundary is stable enough;
- centralization reduces total complexity;
- ownership/testing are clear.

Similarity alone is not sufficient.

## 7. Evolvability is selective

Invest extra change-safety where:
- the dependency is external or volatile;
- data migration would be costly;
- the capability is core;
- multiple products/consumers rely on it;
- permissions/security are sensitive;
- recovery cost is high.

Do not build architecture-governance machinery for trivial, reversible internals.

## 8. Technology novelty must earn its cost

A new technology must justify:
- learning;
- integration;
- security surface;
- operations;
- monitoring;
- incident burden;
- migration/exit cost.

"Industry standard," "newer," or "AI-native" are not sufficient reasons.

## 9. Refactor from evidence

Refactor, centralize or split when evidence shows:
- repeated change pain;
- recurring defects;
- stable duplicated semantics;
- scaling bottleneck;
- operational fragility;
- ownership conflict;
- permission/security complexity;
- excessive cost.

Do not refactor solely for architectural elegance.

## 10. Composable-product implication

For Admonk's product family:
- prefer shared contracts before shared runtime services;
- centralize only when semantics are proven shared and total complexity falls;
- keep domain logic with its owning product;
- avoid tenant-specific forks by default;
- preserve version/migration paths for genuine shared contracts.

## Final rule

> **Simple engineering minimizes today's permanent complexity while preserving cheap, safe change at the boundaries most likely to matter.**
