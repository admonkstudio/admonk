# Design Drift Policy

**Status:** APPROVED GOVERNANCE POLICY  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio / Design Foundation  
**Research basis:** `../research/synthesis/R011-design-code-figma-drift.md`

## Rule

> **Each material fact has one canonical authority. Other artifacts mirror, map to, or test that authority; they do not silently compete with it.**

### Authority

- Repository: doctrine and Stable shared-token definitions.
- Code: runtime component behavior/API.
- Approved design artifact/Figma: intended design/composition.
- Tests/workbench: implementation evidence where adopted.
- Deployed product: actual runtime/user-facing evidence.

### Drift handling

**Material drift** must be tracked and resolved or explicitly accepted.  
**Intentional variation** is not drift when owned at the product/domain layer.  
**Cosmetic drift** may be deferred when correction cost exceeds impact.

### Automation

- No mandatory two-way Figma/code synchronization.
- No mandatory Code Connect, Storybook or visual-regression tooling for Local/Candidate assets.
- Automate only when repeated material drift makes the automation cheaper than continued manual correction.
- Stable shared assets may justify stronger mappings/checks as maturity increases.

### Stable token authority

When Level 2 token implementation begins, repository machine-readable token files are the canonical authority for Stable shared token definitions. Figma mirrors or maps those definitions as tooling permits.

### Cost accepted

Admonk accepts moderate authority-management work and some temporary tracked drift in exchange for avoiding fragile perfect-synchronization infrastructure and unnecessary vendor/tooling dependence.
