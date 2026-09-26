# Jarvis Experience Direction

**Status:** OWNER DIRECTION — research/pilot track  
**Date:** 2026-09-27  
**Relationship to FOUNDATION-M2:** Parallel experience-validation track; does not silently rewrite locked M2 decisions.

## Product direction

Jarvis is the intelligent experience layer above Admonk specialist products and shared platform capabilities.

It is not a separate source of truth and does not replace specialist products, their dashboards, permissions, data ownership, workflows or governance.

A user's effective Jarvis experience is composed from:
- tenant;
- subscribed product/SKU capabilities;
- organizational scope;
- user permissions;
- approved context and knowledge;
- product/domain workflows and agents;
- company/department strategy;
- runtime/credit limits.

Department-level Jarvis uses the same core experience with department-scoped context and capabilities.

Executive/company Jarvis combines authorized department capabilities with company-level strategy and cross-department context. It is an expanded context/capability scope, not a separate unrelated brain.

## Experience principle

**AI-first, not chat-only.**

Jarvis may use:
- text conversation;
- voice;
- animated AI-state presence;
- proactive briefings;
- dynamic cards/workspaces;
- charts and data views;
- simulations/scenarios;
- approvals;
- governed actions;
- generated artifacts.

Traditional dashboards remain available where persistent, dense, precise or bulk interaction is superior.

Users can switch between Jarvis and the owning product/dashboard without losing tenant, product or resource context.

## Surface boundary to validate

### Jarvis-first candidates
- questions and discovery;
- daily/weekly briefings;
- prioritization;
- diagnosis and explanation;
- cross-domain reasoning;
- guided workflows;
- scenario/simulation;
- recommendations;
- natural-language action requests;
- proactive surfacing of important changes.

### Dashboard-first candidates
- dense tables/lists;
- bulk operations;
- detailed configuration;
- role/permission administration;
- connector/setup administration;
- audit/history investigation;
- billing/subscription administration;
- precise repeated data entry;
- long-form structured comparison where persistent layout matters.

### Both
- analytics;
- approvals;
- reports;
- notifications;
- workflow status;
- task execution;
- resource drill-down.

Jarvis should summarize/orchestrate; the dashboard should remain the durable structured surface.

## Commercial direction

Department/product subscriptions feed Jarvis capabilities rather than creating unrelated assistant products.

A customer adding a product/SKU effectively gives Jarvis additional governed domain capabilities and context.

Executive/company intelligence is a cross-product capability that can combine subscribed/authorized departmental domains with company strategy.

## Foundation compatibility

Jarvis consumes rather than replaces:
- M2-03 identity/tenant context;
- M2-05 permissions;
- M2-06 SKUs;
- M2-09 integration control plane;
- M2-10 context plane;
- M2-11 agent authority/approvals;
- M2-12 audit/provenance;
- M2-13 notifications;
- M2-14 AI credits;
- M2-15 resource links;
- M2-16 theme inheritance;
- M2-17 locale/time;
- M2-18 data governance once canonically recorded.

No locked M2 decision is reopened merely because Jarvis exists.

## Pilot direction

Prototype Jarvis against existing n8n automations before full product implementation.

Pilot goals:
1. validate voice/text interaction;
2. validate animated state feedback;
3. validate dynamic UI/card/workspace rendering;
4. validate intent → workflow → result;
5. validate approval before consequential actions;
6. measure perceived and actual latency;
7. validate fallback to dashboard/resource deep links;
8. measure AI-credit/usage visibility;
9. capture user confusion/failures as evidence.

Use existing automations as test harnesses, not as the permanent Jarvis runtime architecture.

## Current research evidence

Two primary current directions are being used:
- SAP Joule Work — intent-driven adaptive enterprise workspace over governed business systems;
- OpenAI Apps SDK — conversation combined with interactive UI rather than chat-only interaction.

Implementation experiments with third-party/open-source Jarvis repositories are separate from architecture authority and require repository/license/code review before reuse.

## Next decisions

1. Jarvis vs Dashboard surface contract.
2. Voice/realtime latency and quality target.
3. Jarvis state/animation language.
4. Dynamic UI/workspace contract.
5. Department vs executive context composition.
6. n8n pilot boundary and evaluation criteria.
7. Failure/fallback behavior.
8. Production integration gate.
