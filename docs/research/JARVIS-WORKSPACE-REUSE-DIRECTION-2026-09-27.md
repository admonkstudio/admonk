# Jarvis Workspace Reuse / Precomputed Loading Direction

**Date:** 2026-09-27  
**Status:** OWNER-APPROVED RQ-06 OPTIMIZATION DIRECTION

## Direction

Dynamic Jarvis UI should not require AI to rediscover known workspace choices.

The product should maintain:
- a predetermined library of interactive charts, tables, controls and domain UI primitives;
- known task → workspace/template mappings where task shape is stable;
- known task → source/capability mappings where source authority is stable;
- versioned prior workspace plans/history that can be reused when compatible;
- cached workspace structure independently from current business data.

Preferred resolution order:

```text
Known task + compatible cached workspace?
        ↓ yes
reuse workspace structure
        ↓
bind current governed data
        ↓
render

        no
        ↓
U0 deterministic template
        ↓ if unresolved
C1D bounded component/pattern selection
        ↓ if unresolved
C1G/C2 declarative workspace planning
```

## Rules

- reuse does not bypass current authorization or product entitlement;
- revalidate task/product/catalog/protocol compatibility;
- live business data must be refreshed according to source/freshness rules;
- history is an optimization input, not source-of-truth business data;
- invalidate/replan when the component catalog, domain contract or task semantics materially change;
- cache keys should prefer semantic task/resource/catalog versions rather than raw user wording;
- measure cache hit rate, avoided AI calls, first-useful-render latency and task-success impact.

## Product principle

> **Do not ask AI to recompute a deterministic or previously solved software decision.**