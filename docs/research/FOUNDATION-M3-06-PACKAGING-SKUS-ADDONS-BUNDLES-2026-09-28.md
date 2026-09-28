# FOUNDATION-M3-06 — Packaging: SKUs, Add-ons, Bundles & Plan Composition

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — OWNER DECISION PENDING  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Locked direction:
- M2-06: atomic sellable SKUs; bundles compose SKUs; permissions/flags/usage remain separate;
- M2-14: provider cost and customer Admonk Credits remain separate; included grants/top-ups supported;
- M3-03: small outcome-owned catalog;
- M3-04: Product Jarvis included; Jarvis Company Intelligence is cross-product add-on;
- M3-05: standalone products remain complete; connected value compounds.

The commercial packaging question is:
> Should customers see the atomic entitlement catalog directly, or should Admonk keep atomic SKUs underneath while selling a simpler set of product packages/bundles above them?

## External source 1 — Stripe

Stripe's 2026 SaaS pricing guidance says:
- packaging tiers should map to real customer segments and real needs;
- pricing/packaging should create a natural upgrade path;
- hybrid pricing (base subscription + variable usage) fits software that has both baseline platform value and variable consumption;
- bill predictability and usage visibility matter.

Source:
https://stripe.com/resources/more/saas-pricing-and-packaging-strategy

Admonk implication:
- do not invent tiers merely for convention;
- base product value should be predictable;
- AI consumption can sit on top through included credits/top-ups/overage-style mechanisms;
- commercial packaging should be legible before purchase.

## External source 2 — McKinsey

McKinsey's B2B tech pricing research finds:
- best-in-class pricing/packaging correlates with stronger NRR;
- predefined upsell paths and attractive cross-sell bundles support expansion;
- excessive bundles/add-ons/pricing metrics create buyer and seller complexity;
- simpler structures with a small number of tiers/add-ons tend to perform better operationally.

Sources:
https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-net-revenue-retention-advantage-driving-success-in-b2b-tech
https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-art-of-software-pricing-unleashing-growth-with-data-driven-insights

Admonk implication:
- preserve multiple expansion paths without exposing combinatorial complexity;
- keep the visible offer small and understandable;
- bundles should simplify buying, not hide entitlement logic.

## Scenario A — Expose the atomic SKU catalog directly

Customers select:
- Marketing Hub;
- Support Platform;
- Jarvis Company Intelligence;
- optional modules/features;
- AI credits;
- integrations/capabilities where separately entitled.

### Strengths
- maximum flexibility;
- exact commercial-to-entitlement mapping;
- no hidden bundle composition.

### Challenge
- the buying surface starts mirroring architecture;
- combinations multiply;
- harder proposals/quotes;
- greater discounting/support complexity;
- violates M3-03's small-catalog principle;
- customers must understand Admonk internals before buying outcomes.

## Scenario B — Simple commercial packages over atomic entitlement SKUs

Keep M2-06 atomic SKUs underneath, but expose a simpler commercial model.

### Base layer
Each specialist product is independently purchasable:
- Marketing Hub;
- Support Platform / Ask Kalam;
- future specialist products.

Each subscription includes:
- the shared Admonk Platform / Admonk One foundation;
- product-scoped Jarvis;
- an included AI Credit allowance appropriate to that product/plan;
- normal product features required for the promised standalone outcome.

### Cross-product add-on
**Jarvis Company Intelligence**
- separately entitled;
- available when prerequisite eligible product subscriptions exist;
- includes/uses its own defined AI Credit allocation/rate treatment.

### Bundles
Bundles are commercial conveniences that compose atomic SKUs:
- two-product bundle;
- multi-product/company bundle;
- future industry/organization packages only if evidence supports them.

Bundles may offer:
- simpler procurement;
- coordinated setup;
- commercial discount;
- shared credit grants/allowances where economically sound.

They do **not** create hidden product permissions or unique product forks.

### AI usage
Use a **hybrid model**:
- predictable base subscription;
- included Admonk AI Credits;
- visible usage;
- top-ups / additional credit packs;
- optional budgets/caps;
- no raw provider-token pricing exposed to customers.

### Product plan tiers
Do **not** force universal Good/Better/Best tiers at the family level yet.

A specialist product may later introduce 2–3 plans only when evidence shows genuinely different customer segments/needs.

Do not create tiers by withholding ordinary core outcome features.

### Strengths
- simple buying story;
- clean runtime entitlement underneath;
- predictable base spend;
- natural expansion/cross-sell;
- AI economics remain governable;
- bundles can evolve without changing product identity.

### Challenge
- requires disciplined mapping from package → SKU set;
- bundle discounting must not destroy unit economics;
- credit grants require monitoring;
- product-specific tier design is deferred rather than solved universally.

## Synthesis

Choose **Scenario B**.

The architecture should stay more granular than the commercial offer.

Commercial packaging hierarchy:

```text
Customer-facing offer
    Product subscription
    + optional cross-product add-on
    + optional bundle
    + included AI credits / top-ups
            ↓
Commercial package resolver
            ↓
Atomic SKU entitlement set
            ↓
Permissions / settings / flags / lifecycle / usage
```

These remain separate layers.

## Recommended lock

> **M3-06 — Simple Commercial Packages over Atomic SKU Entitlements**
>
> Admonk retains atomic product/add-on SKUs as the canonical entitlement layer but does not expose the full entitlement graph as the buying experience.
>
> Each specialist product is independently purchasable and includes the shared Admonk Platform, product-scoped Jarvis and a defined included AI Credit allowance.
>
> Jarvis Company Intelligence remains a separately entitled cross-product add-on.
>
> Commercial bundles compose existing SKUs for simpler procurement, coordinated setup and optional commercial advantage; bundles do not create hidden permissions, custom product forks or alternative runtime entitlement semantics.
>
> AI monetization uses a hybrid model: predictable subscription + included Admonk AI Credits + visible usage + top-ups/additional credits and optional budget controls.
>
> Do not impose universal family-level Good/Better/Best tiers. Product-specific tiers are created only when evidence identifies materially different customer segments/needs, preferably keeping visible choices small.
>
> Pricing, entitlement, permissions, feature flags, lifecycle and usage remain distinct.
>
> **The customer buys a simple offer; the platform resolves it into precise entitlements underneath.**

**Recommendation:** LOCK Scenario B.
