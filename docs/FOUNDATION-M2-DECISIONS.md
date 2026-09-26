# FOUNDATION-M2 — Decision Log

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** Active

| ID | Status | Decision | Accepted cost / tradeoff |
|---|---|---|---|
| M2-01 | LOCKED | Federated product repositories + promoted shared contracts/packages. No duplicate stable shared behavior; no premature generic abstraction; monorepo only when measured cross-repo friction justifies migration. | Some temporary duplication while shared semantics are still unproven. |
| M2-02 | LOCKED | Tenant is the hard customer boundary; recursive organizational scopes model internal structure; products are orthogonal; shared capabilities are versioned; Ask Kalam is the first reference implementation/learning source. | More context than a flat tenant model, but avoids both duplicated department tenants and premature enterprise hierarchy. |
| M2-03 | LOCKED | One global user account + tenant memberships + optional scope affiliations + shared suite shell/app launcher + layered shared settings. Product permissions remain domain-scoped; external contacts and machine identities stay separate. Ask Kalam is learning evidence, not validation evidence yet. | More relational structure than per-product user tables, but removes duplicate login/profile systems and enables one-account navigation across the suite. |

## Current
**M2-04 — Organization Roles vs Product / Domain Roles**


## M2-04 owner requirements — recorded, decision pending
Custom tenant-defined roles/scopes are mandatory. Defaults should accelerate setup, not constrain it. Department setup must be configurable to real operating structures. Admin UX should use simple templates, grouped toggles, plain-language descriptions, scope selectors and an access preview instead of exposing authorization-model complexity directly.
