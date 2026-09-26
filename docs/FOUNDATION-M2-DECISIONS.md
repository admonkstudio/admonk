# FOUNDATION-M2 — Decision Log

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** Active

| ID | Status | Decision | Accepted cost / tradeoff |
|---|---|---|---|
| M2-01 | LOCKED | Federated product repositories + promoted shared contracts/packages. No duplicate stable shared behavior; no premature generic abstraction; monorepo only when measured cross-repo friction justifies migration. | Some temporary duplication while shared semantics are still unproven. |
| M2-02 | LOCKED | Tenant is the hard customer boundary; recursive organizational scopes model internal structure; products are orthogonal; shared capabilities are versioned; Ask Kalam is the first reference implementation/learning source. | More context than a flat tenant model, but avoids both duplicated department tenants and premature enterprise hierarchy. |
| M2-03 | LOCKED | One global user account + tenant memberships + optional scope affiliations + shared suite shell/app launcher + layered shared settings. Product permissions remain domain-scoped; external contacts and machine identities stay separate. Ask Kalam is learning evidence, not validation evidence yet. | More relational structure than per-product user tables, but removes duplicate login/profile systems and enables one-account navigation across the suite. |
| M2-04 | LOCKED | Layered scoped authorization with default role templates, tenant-defined custom roles, stable capability catalog, optional scope inheritance, delegation ceilings, and simple toggle-based setup UX. | More capability/scope metadata than a fixed role list, but avoids role explosion, product coupling and customer-specific code forks. |
| M2-05 | LOCKED | Default deny; applicable roles add capabilities; explicit ceilings/restrictions reduce access and win; provider limits and action approvals are final gates; every result is explainable through one shared evaluator. | Requires a central evaluator/explanation model, but avoids conflicting product-specific authorization logic. |
| M2-06 | LOCKED | Atomic sellable SKU entitlement model: every independently sellable product/major add-on is ON/OFF; bundles compose SKUs; Corporate Brain is a cross-product add-on; permissions, flags and usage limits stay separate; billing providers do not own permanent SKU identity. | More catalog SKUs than a single-plan model, but much simpler runtime entitlement and more flexible packaging. |
| M2-07 | LOCKED | Typed hierarchical settings: Platform Default → Tenant → Organizational Scope → Product → User/Product where applicable; settings declare valid levels/override rules; configuration may inherit/override while constraints cannot be weakened; UI shows source/inheritance/reset. | Requires a shared registry/resolver, but removes duplicated company settings and makes overrides safe/explainable. |
| M2-08 | LOCKED | Shared Setup Center for common organization/people/security/product setup plus product-owned setup checklists; progressive Required/Recommended/Later tasks; resumable; only subscribed products shown; onboarding evolves into Setup & Health. | Requires shared setup-state/health contracts, but avoids duplicate onboarding and repeated tenant configuration. |
| M2-09 | LOCKED | Admonk One shared integration control plane: connect/backfill/sync once where practical; centrally protected credentials; specialist products retain domain semantics and expose governed data contracts; Corporate Brain normally consumes authorized domain data rather than reconnecting providers; data-read and provider-action access are separate. | Requires reusable sync/data-contract infrastructure, but removes repeated integrations and supports efficient cross-product intelligence. |
| M2-10 | LOCKED | Federated permission-aware Context Plane: keep approved knowledge, operational data, operational memory and temporary task context distinct; preserve domain authority, provenance and history; Corporate Brain composes only authorized context. | Requires shared context metadata/contracts and governed retrieval composition, but avoids duplicated truth and unsafe centralization. |
| M2-11 | LOCKED | Shared intersection-based Agent Authority Envelope: effective agent authority is the intersection of delegator authority, agent capabilities, policy, context, provider scopes, runtime limits, action class and approval state; reuse M1 action classes; enforcement stays outside the model. | Requires capability/delegation metadata and deterministic evaluation, but avoids full user-permission inheritance and duplicate AI authorization systems. |

| M2-12 | LOCKED | Shared versioned event, audit and provenance envelope with common identity, suite context and correlation metadata. Domain products retain state and domain-event ownership; audit, provenance and telemetry stay distinct. | Small shared schema/indexing cost in exchange for coherent cross-suite traceability without centralizing product state. |

## Current
**M2-13 — Notification / Communication Preferences**


## M2-04 owner requirements — recorded, decision pending
Custom tenant-defined roles/scopes are mandatory. Defaults should accelerate setup, not constrain it. Department setup must be configurable to real operating structures. Admin UX should use simple templates, grouped toggles, plain-language descriptions, scope selectors and an access preview instead of exposing authorization-model complexity directly.


## M2-06 owner direction — recorded, decision pending
Prefer atomic sellable subscription SKUs with simple ON/OFF entitlement. A commercially standalone feature may itself become an add-on SKU. Bundles/plans should compose SKUs rather than hide feature-level entitlement logic. Corporate AI/company brain is a cross-product add-on layer. Permissions and feature flags remain separate.


## M2-09 owner direction — Admonk One control plane, decision pending
Future Admonk One should centralize suite access, connector administration and reusable ingestion. Connect providers once where practical; historical backfill + incremental sync happen once; products consume governed data contracts. Corporate Brain normally reads authorized department/product data rather than reconnecting raw providers, while direct connector access remains an explicit exception for capabilities not safely exposed through shared/domain contracts.
