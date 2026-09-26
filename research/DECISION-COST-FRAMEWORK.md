# Admonk Decision Cost & Coupling Framework

**Status:** Active research control  
**Established:** 2026-09-26  
**Applies to:** Every research recommendation, synthesis, architecture choice, tool choice, doctrine choice, and product-direction decision.

## Purpose

Prevent a common research failure:

> combining the attractive parts of two approaches while accidentally inheriting the costs and failure modes of both.

A synthesis is not automatically better than either original approach.

Sometimes two approaches solve different problems by making **incompatible trade-offs**.

## Core rule

> **Every benefit has a price. A decision is not ready to lock until Admonk understands the price and accepts it.**

## 1. Decision Cost Ledger

Every material recommendation must record:

**Benefit gained:**  
**Problem solved:**  
**New problem introduced:**  
**Complexity cost:**  
**Operating cost:**  
**Cognitive/governance cost:**  
**Speed cost:**  
**Flexibility cost:**  
**Consistency cost:**  
**Differentiation cost:**  
**Security/privacy cost:**  
**Migration/exit cost:**  
**AI/token/tool cost:**  
**Who pays the cost:**  
**When the cost appears:**  
**How the cost is contained:**  
**Revisit trigger:**  

Not every field must be non-zero, but each must be considered.

## 2. Synthesis Compatibility Check

Before combining two approaches, ask:

1. Do their benefits depend on mutually exclusive assumptions?
2. Does combining them require running two systems/processes instead of one?
3. Does the synthesis introduce a new coordination layer?
4. Are we keeping both approaches' controls while losing either approach's simplicity?
5. Does the synthesis move complexity somewhere less visible rather than remove it?
6. Are we paying an ongoing governance cost to preserve both benefits?
7. Which failure modes from Source A still remain?
8. Which failure modes from Source B still remain?
9. What new failure mode exists only because we combined them?
10. Would choosing one approach cleanly be better at our current stage?

## 3. Hybrid Penalty

A hybrid has a **penalty** whenever it requires extra:
- synchronization;
- governance;
- translation;
- compatibility;
- duplication;
- testing;
- documentation;
- ownership;
- runtime orchestration.

The penalty is acceptable only when the combined value materially exceeds that ongoing cost.

## 4. Decision types

### Dominant choice
One direction clearly wins for the current context.

Use it directly. Do not synthesize merely for balance.

### Layered choice
Two approaches operate at different layers without conflicting.

Example:
- shared accessibility behavior;
- product-specific visual identity.

This is not necessarily a costly hybrid if the boundary is clean.

### Conditional choice
Different approaches apply under different risk/stage/product conditions.

Do not merge them. State the trigger for each.

### True hybrid
Both approaches are combined in the same layer/system.

Require an explicit Hybrid Penalty review before approval.

### Defer
If the value/cost cannot yet be resolved, preserve the decision as open rather than forcing a synthesis.

## 5. Lock rule addition

No recommendation becomes LOCKED until:
- benefits are explicit;
- costs are explicit;
- residual problems are explicit;
- the synthesis compatibility check passes;
- any hybrid penalty is accepted by the owner when material.

## Final principle

> **Do not optimize for having the benefits of both worlds. Optimize for the best total system after paying the price of the decision.**
