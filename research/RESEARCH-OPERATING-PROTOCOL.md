# Admonk Research Operating Protocol

**Status:** Active research operating method  
**Established:** 2026-09-26  
**Applies to:** FOUNDATION-M1 and later foundation/product research  
**Owner:** Admonk Studio

## Purpose

Turn research into fast, challenged, owner-approved decisions instead of long reports or generic AI prose.

The working loop is:

```text
Research
→ compare two credible directions/resources
→ challenge both
→ identify the price of each decision
→ test whether synthesis creates a hybrid penalty
→ choose / layer / condition / synthesize
→ ask one simple directional question when owner input is required
→ approve / revise
→ lock the artifact or decision
→ move immediately to the next item
```

The objective is **high decision quality with low process friction**.

## Core rule

> **Research informs. The owner decides. The repository records. The Supervisor enforces.**

AI must not silently convert research into approved doctrine, standards, product truth, or architecture.

---

# 1. Three research modes

## Mode A — Document Population Research

Use when Admonk needs to populate a foundational document.

Examples:
- doctrine/product-principles.md
- design-system doctrine
- architecture principles
- release standard
- AI autonomy principles

Process:

1. Define the exact decision/job of the document.
2. Select **two credible, materially different resources or methods** that address how that document/problem should be structured or reasoned about.
3. Prefer current primary/authoritative resources when the subject changes quickly.
4. For durable disciplines, an older canonical source may outrank a newer trend.
5. Extract what each approach is optimizing for.
6. Challenge both:
   - assumptions;
   - context;
   - strengths;
   - weaknesses;
   - hidden cost/complexity;
   - failure modes;
   - applicability to Admonk;
   - applicability to low-budget start → scalable growth;
   - AI-assisted-development implications.
7. Classify the result as **Dominant / Layered / Conditional / True Hybrid / Defer** using `research/DECISION-COST-FRAMEWORK.md`.
8. Record the cost and residual problem of the recommended direction.
9. If combining approaches, run the Synthesis Compatibility Check and identify any Hybrid Penalty.
10. Produce the Admonk direction only after the total-system cost is understood.
11. Use Q1 only for decisions that genuinely require product-owner judgment or explicit acceptance of a material trade-off.
12. After approval, populate the canonical document and mark the decision locked/versioned.

### Important
Do not manufacture false disagreement.

If the evidence is strongly aligned:
- say so;
- compare implementation approaches instead of inventing an opposing position.

---

## Mode B — Choice / Direction Research

Use when a real choice must be made.

Examples:
- Storybook vs an alternative;
- one database vs multiple domain stores;
- shared service vs shared contract;
- one auth provider vs another;
- visual-regression tool choice;
- feature-flag direction.

Process:

1. Define the decision and constraints.
2. Select the **two strongest current viable directions/resources**.
3. Compare:
   - value;
   - evidence produced;
   - complexity;
   - cost;
   - security/privacy;
   - portability;
   - maturity;
   - scalability;
   - operating burden;
   - fit with current Admonk architecture;
   - exit path.
4. Challenge both.
5. Complete the Decision Cost Ledger for the serious candidates.
6. If recommending a combination, run the Synthesis Compatibility Check.
7. State:
   - what each is best for;
   - where each fails;
   - which direction is recommended and why.
8. Ask a Q1 when owner preference/strategy or acceptance of a material cost changes the decision.
9. Record outcome:
   - Adopt now
   - Adopt conditionally
   - Pilot
   - Defer
   - Reject
10. Lock the decision and continue.

---

## Mode C — Q1 Quick Directional Intake

Use when the missing information belongs to the owner rather than external research.

Q1 should be:
- one simple question at a time;
- directional rather than exhaustive;
- answerable quickly;
- accompanied by 2–4 choices when useful;
- explicit about why the answer matters.

Preferred shape:

```text
Q1 — [short question]

A. ...
B. ...
C. ...

Why it matters:
[one sentence]

Current recommendation:
[optional; concise]
```

Do not turn Q1 into a long questionnaire.

The goal is:
**minimum question → maximum decision value**.

---

# 2. Two-resource selection rule

A research pair should ideally be:

- credible;
- materially relevant;
- current enough for the subject;
- different enough to create useful tension;
- primary/official when possible.

Preferred hierarchy:
1. standards bodies / official specifications;
2. official vendor/framework/product guidance;
3. recognized research/books/practitioners;
4. strong case studies/postmortems;
5. respected industry analysis;
6. community evidence;
7. AI suggestions only as question generators.

"Trendy" is not sufficient evidence.

For fast-moving choices, recency matters strongly.
For foundational doctrine, durability and evidence may matter more than novelty.

---

# 3. Required challenge lens

Every research comparison should test:

- What problem is this approach actually solving?
- What assumptions does it make about team size, budget, maturity and risk?
- What happens if Admonk follows it too literally?
- What complexity does it introduce permanently?
- What does it fail to cover?
- What evidence supports it?
- What is opinion versus requirement?
- Does it preserve reversibility?
- Does it work for AI-assisted development?
- Does it support the composable-product-family direction?
- Does it preserve domain/product differentiation?
- What would cause us to revisit the decision?

---

## Decision cost / hybrid penalty

Every material recommendation must expose:
- benefit gained;
- price paid;
- residual problem;
- new problem introduced;
- who pays the cost;
- when the cost appears;
- containment/revisit trigger.

Use:
`research/DECISION-COST-FRAMEWORK.md`

Do not assume a synthesis is superior merely because it contains attractive elements from both sources.

---

# 4. Research output format

Keep the owner-facing output concise.

## Research finding
What the two sources/directions say.

## Challenge
Where each succeeds/fails.

## Admonk direction
The recommendation, classified as Dominant / Layered / Conditional / True Hybrid / Defer.

## Decision price
What benefit is gained, what cost is accepted, what problem remains, and whether a hybrid penalty exists.

## Q1
Only if owner input is required.

## Lock condition
What must be approved/proven before the document/decision becomes canonical.

## Next item
The next research/document milestone.

Detailed evidence belongs in the repository research artifacts.

---

# 5. Lock rule

A document or decision becomes **LOCKED** only when:

- evidence is recorded;
- alternatives/challenges are visible;
- owner input is resolved where required;
- contradictions are resolved or explicitly accepted;
- canonical location is clear;
- downstream documents are updated;
- review/revisit trigger is recorded.

Locked does not mean permanent.

A locked item may be reopened by:
- new evidence;
- product change;
- platform change;
- material incident;
- cost/scale trigger;
- owner decision.

---

# 6. Efficiency rules

- Research one decision-sized question at a time.
- Do not produce encyclopedic reports when a decision can be made from a focused comparison.
- Reuse existing evidence before searching again.
- Ask the owner only what external evidence cannot answer.
- Do not make the owner choose between technical options without translating the consequences.
- Do not research tools before identifying the capability/feedback-loop need.
- Stop research when additional sources are unlikely to change the decision materially.

---

# Final principle

> **Research deeply enough to make the decision; communicate simply enough to keep momentum.**
