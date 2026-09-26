# Design-System Drift Research

**Status:** Research scaffold; no synchronization policy approved.

## Research question

Which design-system elements require automated synchronization between design tools and code, and which are better governed through periodic review?

## Drift record contract

For each governed design-system area record:

**Design source:**  
**Code source:**  
**Token source:**  
**Component owner:**  
**Version:**  
**Last reviewed:**  
**Known drift:**  
**Material impact:**  
**Resolution owner:**  
**Resolution target/review date:**  

## Areas to investigate

- semantic tokens;
- component names/variants;
- component states;
- accessibility behavior;
- responsive behavior;
- interaction patterns;
- documentation/examples;
- iconography/assets;
- deprecated components.

## Questions

- Which source is authoritative for each type of information?
- Is bidirectional synchronization actually necessary?
- Which drift creates user risk versus cosmetic inconsistency?
- What can be detected automatically?
- What should be reviewed manually?
- What is the operational cost of keeping tools perfectly synchronized?
- At what maturity level does automated drift detection earn its complexity?

## Principle under investigation

Perfect synchronization is not automatically the goal.

The desired outcome is:
**materially important design decisions remain consistent enough to preserve product quality without creating unnecessary tooling overhead.**
