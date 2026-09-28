# FOUNDATION-M3-03 — Product / Module Catalog & Boundaries

**Date:** 2026-09-28  
**Status:** LOCKED — OWNER SELECTED SCENARIO B  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Locked direction:
- M3-01: **Specialist-first. Platform-backed. Progressively unified.**
- M3-02: **Business-led, cross-functional buying unit.**
- specialist products remain independently useful;
- shared Platform Foundation is common infrastructure/administration, not domain truth;
- Jarvis Company Intelligence is cross-product intelligence over subscribed/authorized products;
- entitlements support atomic products/modules/add-ons without customer-specific forks.

Current known domains:
- Marketing Hub;
- Support Platform / Ask Kalam;
- Jarvis Company Intelligence;
- shared Admonk Platform / Admonk One administration.

## External source 1 — Gartner

Gartner's 2024 composable-product research says modularity creates the most value when it serves both provider and customer strategy, and highlights autonomy/orchestration/discovery of composable components.

Source:
https://www.gartner.com/en/documents/5351663

Admonk implication:
- components should be modular enough to combine and govern independently where customer value requires it;
- composability is useful, but module autonomy must have a customer/business purpose.

## External source 2 — McKinsey

McKinsey distinguishes:
- **products** as technology-enabled offerings directly used to perform activities that create business value;
- **platforms** as underlying capabilities that power products.

It also stresses organizing around products/platforms with clear ownership rather than confusing the two.

Source:
https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/products-and-platforms-is-your-technology-operating-model-ready

Admonk implication:
- customer-facing catalog boundaries should follow direct business outcomes;
- shared platform capabilities should not automatically become sellable products.

## Scenario A — Highly granular composable catalog

Make many capabilities independently purchasable/entitled:
- analytics;
- automation;
- knowledge;
- connectors;
- Jarvis;
- campaign tools;
- ticketing;
- reporting;
- etc.

### Strengths
- maximum packaging flexibility;
- easy upsell at feature level;
- customer pays only for exact capabilities;
- aligns superficially with composable-product thinking.

### Challenge
- catalog/price complexity grows quickly;
- product story starts mirroring internal architecture;
- entitlement/support/testing combinations multiply;
- fragmented user experience;
- unclear buyer/outcome ownership;
- risks recreating customer-specific product configurations through SKU combinations.

## Scenario B — Outcome-owned products + selective modules/add-ons

Keep the top-level catalog small.

### Product
A capability becomes a **specialist product** when it has:
- a distinct measurable business outcome;
- a recognizable business owner/buyer;
- meaningful standalone value;
- its own domain semantics/workflows;
- a durable operating surface;
- enough independent roadmap/lifecycle to justify product ownership.

### Module
A capability is a **module** when it:
- extends one product's same outcome/domain;
- may be optionally entitled;
- does not justify a separate customer/buyer/domain identity.

### Cross-product add-on
A capability is an **add-on** when its value depends on or expands across one or more subscribed products without becoming a new domain authority.

### Shared platform capability
Identity, permissions, settings, connectors, setup, audit, lifecycle and similar Foundation capabilities remain **platform-owned infrastructure**, normally included with subscribed products rather than sold as separate specialist products.

### Current directional catalog

#### Shared platform — included foundation
**Admonk Platform / Admonk One**
- tenant administration;
- identity/access;
- setup;
- integrations;
- shared settings/governance.

Not a standalone specialist product by default.

#### Specialist Product 1
**Marketing Hub**
- marketing operating/intelligence system;
- owns marketing strategy/evidence/analytics/workflows;
- analytics remains a core layer, not a separate Analytics product.

#### Specialist Product 2
**Support Platform / Ask Kalam**
- customer-resolution/support product;
- owns support cases/resolution/outcome workflows.

#### Cross-product add-on
**Jarvis Company Intelligence**
- same Jarvis core under Company/Executive Operating Lens;
- combines authorized capabilities from subscribed products;
- no independent domain truth;
- strongest value increases with multiple connected products.

#### Future specialist products
Added only when they pass the Product Boundary Test rather than because a department or feature exists.

## Product Boundary Test

Create a separate product only if most are true:
1. distinct customer/business outcome;
2. identifiable economic champion;
3. meaningful standalone value;
4. durable domain data/semantics/workflows;
5. dedicated operating surface;
6. independent roadmap/lifecycle is valuable;
7. customer can understand why it exists without explaining internal architecture.

Otherwise classify as:
- module;
- capability;
- add-on;
- shared platform function.

## Synthesis

Choose **Scenario B**.

The catalog should be commercially composable but intentionally small.

Architecture can contain many capabilities; the customer catalog should contain only distinctions that matter to buying, value, ownership and lifecycle.

## Recommended lock

> **M3-03 — Outcome-Owned Product Catalog with Selective Modules & Cross-Product Add-ons**
>
> Admonk keeps a small top-level catalog of specialist products organized around distinct measurable business outcomes and recognizable business owners.
>
> A specialist product must provide meaningful standalone value, own domain semantics/workflows and justify its own durable operating surface and roadmap.
>
> Capabilities that extend the same product outcome remain modules/features, even when optionally entitled.
>
> Cross-product capabilities whose value depends on subscribed products are add-ons rather than new domain products.
>
> Shared Platform Foundation capabilities are normally included infrastructure, not separate specialist SKUs.
>
> Directional current catalog:
> - **Admonk Platform / Admonk One** — shared included platform/admin foundation;
> - **Marketing Hub** — specialist product;
> - **Support Platform / Ask Kalam** — specialist product;
> - **Jarvis Company Intelligence** — cross-product add-on;
> - future specialist products only when they pass the Product Boundary Test.
>
> Do not expose internal architecture granularity directly as commercial catalog granularity.
>
> **Composability belongs underneath the catalog; customer value determines what earns a product name.**

**Recommendation:** LOCKED — Scenario B.
