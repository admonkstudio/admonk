# Product-Development Feedback Loops

**Status:** Research framework, not approved toolchain.

A capability/tool earns its place by improving a decision or action.

## Loop contract

```text
Problem / uncertainty
→ observation or evidence
→ responsible reviewer
→ decision
→ action
→ new evidence
→ improvement / correction
```

For every candidate capability, identify the loop it closes.

## Example loop shapes to investigate

### Design consistency
semantic/token decision
→ implementation
→ visual/accessibility review
→ defect/drift evidence
→ token/component improvement

### Browser quality
critical journey
→ automated/manual browser test
→ failure evidence
→ engineering correction
→ regression protection

### Production reliability
runtime failure
→ error/log evidence
→ diagnosis
→ fix
→ recurrence monitoring

### Product learning
user behavior/feedback
→ product evidence
→ scope/UX decision
→ product change
→ new behavior evidence

### Cost/scaling
usage/cost evidence
→ architecture/capability review
→ optimization/scale decision
→ measured cost/performance outcome

## Anti-pattern

```text
Tool
→ dashboard
→ nobody owns/reviews it
→ no decision changes
```

This is instrumentation without a feedback loop and should normally be removed or deferred.
