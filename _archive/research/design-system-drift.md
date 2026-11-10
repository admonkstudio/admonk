# Design-System Drift Model

**Status:** APPROVED DIRECTION — standards/playbook conversion pending  
**Approved:** 2026-09-26  
**Research basis:** `synthesis/R011-design-code-figma-drift.md`

## Core rule

> **One canonical authority per fact. Use mappings and tests to connect artifacts. Automate only material drift whose recurring cost exceeds the automation cost.**

## Authority matrix

| Information | Canonical authority |
|---|---|
| Studio/product doctrine | Repository |
| Stable shared token definitions at Level 2+ | Repository machine-readable token files |
| Runtime component behavior/API | Production code |
| Implemented states/evidence | Code + tests/workbench when justified |
| Approved design intent/composition | Approved Figma or explicit product design artifact |
| Design-to-code mapping | Mapping metadata such as Code Connect when justified |
| Actual user-facing runtime behavior | Deployed product/runtime evidence |

## Drift classes

### Material drift
Affects meaning, accessibility, behavior, state coverage, recovery, semantic token meaning, or an approved component contract.

Must be tracked and resolved/accepted.

### Intentional product variation
Product/domain-specific density, layout, visual expression, copy, hierarchy or other explicitly owned differences.

Not drift.

### Cosmetic / non-material drift
Differences that do not materially change behavior, accessibility, brand intent, meaning or quality.

May be accepted until normal maintenance when correction costs more than the discrepancy matters.

## Automation maturity

### Level 1
Manual authority declaration and review.

### Level 2
Machine-readable Stable token source plus basic mapping/version metadata and cheap targeted checks.

### Level 3
Targeted component workbench, accessibility/visual regression and drift reporting only where evidence justifies them.

### Level 4
Broader synchronization and consumer-impact automation only after multi-product change volume proves the value.

## Drift record

Record as relevant:

**Design source:**  
**Code source:**  
**Token source:**  
**Owner:**  
**Version:**  
**Last reviewed:**  
**Known drift:**  
**Class:** Material / Intentional variation / Cosmetic  
**Impact:**  
**Resolution owner:**  
**Resolution target/review date:**  
**Accepted until:**  

## Cost rule

Perfect synchronization is not the objective.

The objective is:
**materially important design decisions remain consistent enough to preserve product quality without paying unnecessary tooling, vendor or process cost.**

## Revisit triggers

Increase automation when:
- token mismatches recur;
- design/code disputes recur;
- shared assets change frequently across several products;
- manual review becomes more expensive than automation;
- a tooling plan/API becomes economically justified;
- targeted automation demonstrably reduces defects/rework.
