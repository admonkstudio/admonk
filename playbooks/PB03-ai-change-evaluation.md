# PB03 — AI Change & Evaluation

**Trigger:** Material model/provider, prompt, tool, retrieval/context, routing/workflow, permission/autonomy or capability change.
**Outcome:** Evidence shows intended improvement without unacceptable regression, authority expansion, safety degradation or economic cost.

## Flow
1. Define exactly what changed.
2. Define intended improvement + must-not-break behavior.
3. Classify autonomy/risk; AI cannot approve its own permission increase.
4. Run critical regression suite.
5. Add targeted capability tests only when new capability/risk justifies them.
6. Evaluate end-to-end traces: decisions, tools, results, handoffs, retries, guardrails, outcome.
7. Periodically calibrate subjective automated grading against human judgment.
8. Check authority, data access, approvals and safeguards.
9. Compare quality gain versus cost/latency/resources; prefer cost per useful successful outcome.
10. Release proportionally through PB02.
11. Feed meaningful Production failures back into regression cases.

## Required record
**Change → Intended improvement → Risk/autonomy → Regression → Capability result if needed → Trace findings → Safety/authority → Cost impact → Release decision → Production follow-up**

**Implements:** S004, S005, S010, S015; supported by S002, S008, S030 and security/privacy standards.
