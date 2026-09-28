# FOUNDATION-M2 — Product-Model Reconciliation Addendum

**Date:** 2026-09-29  
**Status:** ACTIVE INTERPRETATION ADDENDUM — DOES NOT ERASE M2 HISTORY  
**Related authority:** `docs/PRODUCT-MASTER-PLAN.md`

## Purpose

FOUNDATION-M2 remains the locked shared technical/platform foundation.

Later M3 discovery changed the **commercial/customer product model** from a family of separately operated specialist applications to one unified company operating environment with role/domain lenses and SIA as the company brain.

This addendum records how to interpret M2 without silently rewriting its historical decisions.

## Retained without change

Keep:
- tenant hard boundary;
- organizational scopes;
- identity/membership;
- authorization;
- settings inheritance;
- setup/health contracts;
- connector/credential ownership;
- Context Plane;
- Agent Authority Envelope;
- audit/provenance/events;
- notifications;
- AI-credit economics;
- data governance;
- versioning/migration;
- operator authority;
- runtime-boundary principles;
- workload identity;
- operational lifecycle separation.

## Reinterpreted terms

### Product
In M2, `product` may now represent an internal **domain/capability authority boundary**.

It does not imply a separately marketed application.

### SKU
Atomic entitlement remains valid.

The SKU may entitle:
- capability pack;
- advanced domain feature;
- specialist capacity;
- connector/action capability;
- enterprise governance;
- AI/storage/usage tier.

### Corporate Brain / Jarvis Company Intelligence
Historical commercial packaging assumption.

Current architecture:
**SIA is the single company brain from the start, operating only within the user's authorized lens.**

High-cost or enterprise-wide capabilities may still be separately entitled.

### Admonk One
Historical name.

Keep the shared responsibilities:
- administration;
- setup/health;
- people/access;
- subscriptions/entitlements;
- integrations;
- policy/security;
- usage/cost;
- lifecycle.

Expose them inside the unified environment.

### Product switcher / cross-product navigation
Historical customer-UX assumption.

Current environment primarily navigates through:
- role/domain lenses;
- workspaces;
- artifacts;
- resources;
- contextual transitions.

Resource Links remain valid.

### Specialist product runtime
May still exist as a domain/capability runtime where independent authority, security, scaling or lifecycle justifies it.

It does not automatically correspond to a commercial product.

### Jarvis Interactive runtime
Rename conceptually to:
**SIA Interactive / Orchestration Runtime**.

## M2-06 clarification

Retain entitlement mechanics.

Supersede only the assumption that:
- specialist applications are the primary independently sellable units;
- a separate Corporate Brain add-on is required for company-level intelligence.

## M2-09 clarification

Retain:
- connect/backfill once;
- credential centralization;
- provider/data read separation from provider action authority;
- governed contracts.

Use a shared integration control plane inside the unified environment.

## M2-15 clarification

Retain stable Resource Links and context preservation.

Do not require product switching as the primary information architecture.

## M2-20 clarification

The coarse runtime estate becomes conceptually:

- Platform Management;
- SIA Interactive / Orchestration;
- domain/capability runtimes where justified;
- Execution / Workers;
- Connector Runtime;
- Platform Operations;
- optional Voice / Sandbox.

This is a terminology/consumer-model change, not a reason for microservice extraction.

## Principle

> **M2 governs boundaries and authority. M3 governs how those capabilities are assembled into the customer product.**

The revised M3 product model can therefore change substantially without discarding M2's strongest technical decisions.
