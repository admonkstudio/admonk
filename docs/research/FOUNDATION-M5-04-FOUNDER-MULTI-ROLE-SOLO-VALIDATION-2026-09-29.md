# FOUNDATION-M5-04 Validation — Founder / Multi-Role Solo

**Date:** 29/09/2026  
**Result:** PASS WITH M4 CORRECTIONS  
**Reference model:** `docs/reference-models/FOUNDER-MULTI-ROLE-SOLO-REFERENCE-MODEL.md`

## What M5-04 validated

The M4/Product Master Plan combination can support a one-person company without:
- inventing departments;
- creating a separate solo product;
- treating Founder as super-admin;
- forcing one role per user;
- requiring every process to have multiple humans;
- transferring personal credentials when responsibilities move;
- losing the ability to grow into a team/enterprise.

This is the strongest validation of the locked principle:

> Progressive complexity: solo simple, enterprise governed.

## Evidence basis

Primary authority:
- locked Product Master Plan;
- locked M2 tenant/authorization/connector/agent-authority decisions;
- M4 candidate after Marketing, Recruiting and Support validation.

The test is architectural/compositional rather than provider-specific.

## M4 defects found

### M5-04-A — lens/context vs execution target

Multi-role users can legitimately operate across several domains in one session.

A Founder lens may aggregate context but must not become implicit action scope.

Required M4 correction:
- lens/presentation context does not grant authority;
- material actions bind explicit tenant/domain/resource/capability/scope context;
- ambiguous target stays draft/asks for resolution rather than executing against a guessed context.

### M5-04-B — approval independence

A solo company exposes an assumption hidden by larger organizations: "requires approval" does not say whether the initiator may approve.

Required correction:
approval policies must be able to state:
- eligible approver;
- self-approval allowed or prohibited;
- independent approval requirement;
- explicit self-confirmation policy;
- fallback when no eligible independent approver exists.

If independent approval is required and unavailable, the action remains blocked/deferred.

Founder/owner status never bypasses provider, platform or policy ceilings.

## Existing M4/M2 rules validated with no change

### Sparse-by-default
Works: no departments, optional roles, minimal capabilities/connectors.

### Responsibility model
Works: one human can fulfill many independent responsibilities.

### Connector ownership
Works: personal connections do not transfer automatically when work/responsibility moves.

### Role != permission
Works: Founder can be a lens without becoming a universal capability grant.

### Human/digital fulfillment
Works: SIA/automation can cover eligible work while human-required decisions remain governed.

### Growth
Works: first hire joins the same tenant and receives responsibility/capability scope rather than causing product/data migration.

## Product insight — solo-to-enterprise continuity is configuration, not migration

Reference path:

```
solo
→ add first member
→ assign responsibilities
→ add team/org scopes only when useful
→ add shared/service connections
→ strengthen approvals/policies
→ add specialist/automation capacity
→ enterprise governance
```

The company does not graduate into a different product.

This validates the unified-environment thesis more strongly than a department-only model would.

## Experience insight

The common shell remains:
SIA / Work / Projects / Performance / Settings

For solo:
- SIA is likely the primary entry;
- Work aggregates responsibilities;
- domain workspaces appear only when useful;
- Settings exposes complexity progressively;
- company Performance composes governed domain metrics without creating an opaque company score.

## M5-04 result

**PASS WITH TWO M4 CORRECTIONS.**

After promotion:
- all four planned M5 scenarios pass;
- no reference model requires a separate product/app;
- no model requires one permanent agent per role;
- no model requires provider-bound capability identity;
- M4 can move to final M5 reconciliation and owner-lock review.

## Next

1. apply M5-04 corrections to M4;
2. run M5 cross-model reconciliation;
3. mark M4 final candidate if no contradictions remain;
4. request/record owner lock;
5. begin FOUNDATION-M6 only after M4 is locked.
