---
name: admonk-simplicity-engineering
description: Minimize unnecessary permanent implementation and architecture complexity while preserving correctness, security, maintainability, and product quality. Use when scoping features, choosing architecture, reviewing implementation plans/PRs, adding dependencies/connectors/models/services, or evaluating whether an abstraction is justified.
---

# Admonk Simplicity-First Engineering

## Purpose

Choose the smallest correct implementation for the current requirement while preserving a safe path to change.

Core rule:

> **Minimum necessary complexity, not minimum code.**

## Inputs

- feature/capability specification;
- project architecture and current patterns;
- proposed change;
- current lifecycle stage;
- risk/governance level;
- relevant platform skill.

## Outputs

- simplest viable approach;
- complexity impact;
- alternatives considered;
- new dependencies/services/abstractions;
- simplification opportunities;
- code-simplicity review for meaningful changes.

## Before adding complexity

Ask:

1. What is the simplest correct implementation?
2. Can an existing platform capability solve it?
3. Can an existing project component/helper solve it?
4. Is a new abstraction needed now, or only imagined for later?
5. What is the smallest meaningful test?
6. Which permanent complexity dimensions does this introduce?
7. Can the decision be reversed cheaply?

Preferred order:

**existing platform feature → existing project pattern → small local implementation → reusable module after repeated need → larger abstraction only with evidence**

## Anti-overengineering rules

- Do not create an abstraction for one use unless it materially improves clarity, safety or consistency.
- Do not add service/repository/factory/hook/configuration layers without demonstrated need.
- Do not add dependencies for small functions already easy to implement safely.
- Do not generalize from hypothetical future use.
- Do not rewrite stable code without measurable benefit.
- Do not hide failures with fallback behavior.
- Do not remove validation/security/recovery behavior to reduce line count.
- Do not build speculative extension points.
- Do not add a service, connector, model, vendor or datastore without recording its complexity impact.
- Preserve domain-required complexity when the alternative would be unsafe or misleading.

## Complexity Impact

For a substantial feature/change, assess:

- UI impact
- Code impact
- Data impact
- Permission impact
- Infrastructure impact
- Operational impact
- Vendor impact
- AI/evaluation impact
- Support impact
- Migration/reversal plan
- Why the complexity is justified

Link the assessment to the project's `project-governance/complexity-budget.md` when one exists.

## Code Simplicity Review

For meaningful implementation changes record, as relevant:

- changed surface/files;
- new abstractions;
- new dependencies;
- duplicated logic;
- new service/provider boundaries;
- new permission paths;
- failure/recovery behavior;
- whether an existing pattern could solve it;
- whether the implementation can be simpler without reducing correctness.

Line count is supporting context only; it is never a quality target.

## Risk-based depth

Do not run a heavyweight review for trivial changes.

Examples:
- copy correction → usually no engineering review;
- small UI behavior → lightweight simplicity check;
- new DB entity → architecture/data/migration simplicity review;
- new external connector → permissions/vendor/operations/cost complexity review;
- consequential agent action → full capability/control + failure/recovery review.

## Relationship to platform skills

This skill is stack-neutral.

Platform skills decide how to implement the chosen approach correctly.
This skill challenges whether the approach is more complex than necessary.

## Technical debt

Temporary complexity/simplification is acceptable when:
- deliberate;
- documented;
- reversible where practical;
- risk understood;
- revisit trigger defined.

Record long-lived trade-offs in the Technical Debt & Scale Register.

## Evidence

Do not claim a design is "simple" by intuition alone.

Evidence can include:
- dependency diff;
- architecture diff;
- number of new services/boundaries;
- removal of duplicate paths;
- reduced failure modes;
- simpler permission model;
- test coverage of the chosen boundary;
- explicit rejected alternatives.

## Final rule

> **Complexity is a cost that must earn its place.**
