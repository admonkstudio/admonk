# FOUNDATION-M2 — Decision Log

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** Active

| ID | Status | Decision | Accepted cost / tradeoff |
|---|---|---|---|
| M2-01 | LOCKED | Federated product repositories + promoted shared contracts/packages. No duplicate stable shared behavior; no premature generic abstraction; monorepo only when measured cross-repo friction justifies migration. | Some temporary duplication while shared semantics are still unproven. |
| M2-02 | LOCKED | Tenant is the hard customer boundary; recursive organizational scopes model internal structure; products are orthogonal; shared capabilities are versioned; Ask Kalam is the first reference implementation. | More context than a flat tenant model, but avoids both duplicated department tenants and premature enterprise hierarchy. |

## Current
**M2-03 — User + Membership Model**
