# R009 — Token Architecture Direction

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** Awaiting product-owner Q1 + cost acceptance  
**Target:** future `design-foundation/design-tokens.md`, Product Platform theme contract, Marketing Hub Level-2 token implementation

## Research question

What token architecture should Admonk use when the Design Foundation reaches Level 2 so it can support product identity, themes and future cross-product reuse without creating a large token bureaucracy before real components exist?

## Source A — Material Design 3: reference → system → component tokens

**Source:** SRC-TOK-001

Material uses three conceptual token layers:

```text
Reference
→ System
→ Component
```

- Reference tokens hold concrete values.
- System tokens express semantic/theme decisions.
- Component tokens describe specific component properties and can map to system/reference values.

### What it optimizes for

Powerful theming and fine-grained component customization across a mature design system.

### Strongest ideas for Admonk

- raw values and semantic meaning should be separated;
- themes should change semantic mappings rather than require widespread component edits;
- component-specific decisions can be addressable when they genuinely need independent theming;
- the architecture supports deliberate propagation from brand/theme decisions to components.

### Challenge

Copied literally, the full three-tier model can:
- create a very large number of tokens;
- require naming/ownership/governance for component properties that may never need independent customization;
- make Figma/code synchronization harder;
- turn every component detail into a public design-system API;
- increase migration and compatibility obligations;
- encourage Level-3/4 infrastructure while Admonk is only reaching Level 1/2.

Material's model is strongest when many components, themes and consumers already justify the extra layer.

## Source B — Atlassian: meaning-first semantic tokens

**Source:** SRC-TOK-002

Atlassian's current consumer guidance emphasizes:
- tokens as a single source of truth for design decisions;
- semantic names describing intended use;
- choosing a token based on meaning, not a matching raw value;
- themes remapping token values;
- consumers using semantic roles such as text/background/danger rather than literal palette values.

### What it optimizes for

A stable semantic contract that lets themes and foundations evolve without consumers depending on raw values.

### Strongest ideas for Admonk

- the public token API should describe intent rather than visual coincidence;
- semantic roles provide a cleaner contract between Product Brand Theme and product UI;
- theme changes can happen beneath stable semantic names;
- consumers should not reach into primitive palettes merely because the color looks right;
- a smaller semantic surface is easier for humans and AI agents to use correctly.

### Challenge

A semantic-first model can:
- become too generic if token roles are badly named;
- force unrelated component needs through broad semantic roles;
- make one-off component differences awkward;
- encourage ad-hoc local values when no semantic token fits;
- still require a disciplined underlying primitive/reference source even if consumers rarely see it.

Atlassian is strongest as the **public semantic-contract model**.

## Interoperability constraint — DTCG 2025.10

**Source:** SRC-TOK-003

DTCG's first stable format provides:
- typed token values;
- groups;
- aliases/references;
- a portable interchange format across tools.

Importantly, DTCG explicitly does **not** prescribe one token architecture/methodology.

Therefore:

> **Admonk should separate token architecture from token file format.**

A future Level-2 implementation should target DTCG-compatible interchange where practical, but the Foundation should not select a token-management tool merely because it claims DTCG support.

Do not implement the current 2026 DTCG draft resolver/context work as authoritative; only the stable 2025.10 report is eligible for the present baseline.

## Decision options

### A. Full three-tier from Level 2
```text
Reference → Semantic/System → Component
```

Create component tokens as a normal expected layer from the beginning.

**Benefit**
- strongest theming/customization precision;
- explicit component APIs;
- clear path for many themes/products.

**Price**
- largest token surface;
- highest documentation/sync burden;
- more breaking-change/versioning obligations;
- likely speculative component tokens before proven need.

### B. Lean semantic-first with evidence-gated component tokens — RECOMMENDED
```text
Reference/Primitive values
        ↓
Semantic roles  ← primary public contract
        ↓
Component tokens only when proven necessary
```

Reference/primitives exist to support themes and semantic mapping, but product/component consumers should normally use semantic roles.

A component-specific token is added only when evidence shows:
- semantic roles cannot express the need cleanly;
- multiple instances/themes need that component property independently controlled;
- the component contract is stable enough to maintain centrally.

**Benefit**
- supports themes and product identity;
- keeps the public token API small;
- delays component-token explosion;
- easier for AI/humans to choose tokens by meaning;
- compatible with progressive evidence-gated maturity.

**Price**
- some component styles remain local/raw initially;
- later promotion may require migration;
- semantic role design requires careful naming;
- there may be an intermediate period where local components use a mix of semantic tokens and product-local values.

### C. Product-local variables first
No formal primitive/semantic architecture initially. Products define their own variables; shared tokens are extracted only after multiple products.

**Benefit**
- lowest immediate token governance.

**Price**
- theming and accessibility mapping can drift early;
- cross-product migration becomes larger;
- AI/developers lack a stable semantic vocabulary;
- harder to build the coherent product family already approved.

## Decision type

**Conditional / staged choice.**

The recommendation deliberately chooses B now.

A more complete Material-like component-token layer may emerge later if Level 3/4 evidence demonstrates enough independent component theming/customization need.

This is not "take both."

It is:
- semantic-first at current maturity;
- component-token layer only behind an evidence trigger.

## Decision Cost Ledger — Option B

**Benefit gained:**  
Small, understandable token contract with real theming capability.

**Problem solved:**  
Separates product/theme values from UI meaning without creating a component-token universe prematurely.

**New problem introduced:**  
Temporary inconsistency in how product-local component details are represented until promotion evidence exists.

**Complexity / operating cost:**  
Low/Moderate initially; grows only with promoted semantic/component roles.

**Speed cost:**  
Low. Product teams can use approved semantic roles and retain local details.

**Governance / cognitive cost:**  
Moderate. Semantic names need clear meaning and misuse guidance.

**Flexibility cost:**  
Low initially. Extremely fine-grained cross-theme component customization is not available automatically.

**Differentiation cost:**  
Low. Product themes own underlying values and may preserve product-specific expression.

**Migration/exit cost:**  
Moderate. Local values may later migrate to new semantic/component tokens.

**AI/token/tool cost:**  
Positive overall: a smaller meaning-based vocabulary should reduce design-token misuse and unnecessary context, though token metadata/documentation still consumes some context.

**Who pays:**  
Product teams pay occasional later migration; Design Foundation owner pays semantic naming/governance cost.

**When cost appears:**  
Mostly when a local pattern is promoted or a new theme reveals an insufficient semantic role.

**Containment:**  
- keep semantic vocabulary purpose-based;
- do not expose raw palette values as the default product API;
- allow product-local values when no reusable semantic meaning exists;
- add component tokens only against an evidence trigger;
- preserve aliases/references so remapping is cheap;
- use migration tooling only when volume justifies it.

**Revisit trigger:**  
- repeated local overrides around the same component property;
- multiple product themes require independent component-level control;
- semantic roles become overloaded/ambiguous;
- cross-platform needs expose missing token granularity;
- migration cost from local values becomes recurrent.

## Synthesis Compatibility Check

**Decision type:** Conditional / staged, not true hybrid.

We are not maintaining two competing token systems.

The architecture is one progression:

```text
Reference values
→ semantic contract now
→ component-specific contract only where evidence later earns it
```

### Hybrid penalty avoided

Admonk does not create:
- a universal component-token layer today;
- duplicate semantic and component roles for the same purpose;
- a mandatory enterprise token-management platform.

## Proposed DTCG position

When Level 2 implementation begins:

- use the stable DTCG 2025.10 format as the **preferred portable interchange/storage direction** where selected tools support the needed subset reliably;
- preserve aliases/references and explicit types;
- do not depend on draft resolver/context syntax;
- do not require Style Dictionary, Tokens Studio, Figma variables or another tool as canonical yet;
- decide source-of-truth/synchronization in R011 (Design/code/Figma drift), not here.

## Proposed direction

> **Expose meaning, not raw values. Keep primitives behind the semantic contract. Add component tokens only when real customization/reuse proves their maintenance cost is worth paying.**

## Q1 — token architecture + price acceptance

Which direction should Admonk lock?

### A. Full three-tier from Level 2
Reference → Semantic → Component as a standard structure from the beginning.

**Price:** maximum governance/token-surface cost now in exchange for maximum fine-grained theming later.

### B. Lean semantic-first + evidence-gated component tokens — RECOMMENDED
Reference/primitives support themes; semantic roles are the normal public contract; component tokens are promoted only from proven need.

**Price:** accept some local component values and later migration in exchange for a much smaller, clearer token system now.

### C. Product-local variables first
Delay token architecture until several products exist.

**Price:** minimum work now, larger theming/accessibility/cross-product migration risk later.

## Research recommendation

**B — Lean semantic-first + evidence-gated component tokens.**

The cost is explicit:
> **Admonk accepts limited product-local token/value debt and later migration so it does not pay permanent governance for component tokens that have not earned their existence.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R009;
2. update the Design Foundation token contract with the approved architecture;
3. record DTCG 2025.10 as the preferred stable interchange direction, not a mandatory tool choice;
4. preserve source-of-truth/sync decisions for R011;
5. move to R010 — Component Promotion Policy.
