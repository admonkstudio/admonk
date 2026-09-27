# Jarvis Interaction Graph / Semantic Zoom Hypothesis

**Date:** 2026-09-27  
**Status:** OWNER DESIGN HYPOTHESIS — NOT LOCKED  
**Future evaluation:** JX-03 state/motion language + JX-04 dynamic workspace contract

## Owner thought

The central Jarvis circle/orb should not be a static object that merely changes color or animation while the system works.

A stronger concept is to let the circle represent, at a larger scale, the connected product/capability environment around Jarvis:
- subscribed products;
- authorized capabilities;
- connected systems;
- automations/workflows;
- data/evidence sources;
- active tasks and relationships where useful.

When a user asks a question or requests an action, the experience can spatially narrow or zoom from the broader connected environment into the exact product, capability, workflow, source, resource or chain involved in that task.

The screen therefore reacts semantically to the instruction, not only cosmetically.

## Working interpretation

Possible experience pattern:

```text
Idle / overview
Jarvis + connected capability universe
        ↓ user asks a question
Relevant domain(s) become prominent
        ↓
Relevant capability/source path is revealed
        ↓
Jarvis zooms/focuses into the active task
        ↓
Evidence / workspace / approval / execution appears
        ↓
Result presented
        ↓
User can drill down or zoom back out
```

This could provide:
- immediate visible acknowledgement before backend work completes;
- orientation about where Jarvis is working;
- a natural visual explanation of cross-product orchestration;
- a transition mechanism from conversation to dynamic workspace;
- meaningful motion rather than decorative waiting animation;
- an original recognizable Jarvis interaction language.

## Important guardrails for later research

Do not assume the entire underlying architecture should be literally displayed.

The visual graph should be a user-facing semantic abstraction, not an infrastructure topology diagram.

Later JX-03/JX-04 research must test:
- whether semantic zoom improves comprehension rather than distracting;
- what level of connection detail is useful;
- how to prevent visual overload as products/capabilities grow;
- reduced-motion/accessibility behavior;
- mobile/small-screen behavior;
- whether active paths should represent domain, capability, evidence source, workflow or a combination;
- how truthful progress/state maps onto the spatial model;
- how the model behaves when several domains are involved simultaneously;
- whether users can interact directly with nodes/paths or whether the graph remains primarily explanatory;
- how dashboard/resource drill-down emerges from the focused state.

**Do not lock visual form, node taxonomy, motion language or interaction grammar in RQ-02.**
