# Admonk Browser QA

This document defines the browser testing and visual QA layer for Admonk's coding-agent workflow.

The objective is simple:

> **Verify the experience that actually renders, not only the code that was written.**

---

## 1. Current Decision

Admonk uses:

```text
Microsoft Playwright CLI
        +
playwright-cli skill
        +
admonk-browser-qa skill
```

as the default browser QA approach.

Admonk does **not** currently add Playwright MCP to `.codex/config.toml`.

---

## 2. Why CLI + Skills Instead of Playwright MCP

Microsoft's current Playwright guidance explicitly recommends Playwright CLI + skills as the better fit for coding agents.

The reason is context efficiency:

- CLI calls are concise.
- Large MCP tool schemas do not need to remain in model context.
- Accessibility/page data can be requested only when needed.
- The agent can spend more context on the codebase, design reasoning, debugging, and implementation.

Playwright MCP remains useful for specialized workflows that need persistent browser state, rich introspection, or long-running autonomous browser loops.

For normal Admonk design/build/test iterations, CLI + skills is the stronger default.

If future evidence shows that a project benefits materially from Playwright MCP, add it for that project instead of changing the global Admonk default automatically.

---

## 3. Repository Skills

### Technical browser commands

```text
.agents/skills/playwright-cli/SKILL.md
```

This provides the browser automation command vocabulary.

### Admonk QA workflow

```text
.agents/skills/admonk-browser-qa/SKILL.md
```

This defines what Admonk should verify and how defects should be judged, prioritized, fixed, and re-tested.

The relationship is:

```text
admonk-browser-qa
→ what to test and what quality means

playwright-cli
→ how to operate the browser
```

---

## 4. Local Installation

The repository contains the skill instructions, but the Playwright CLI executable must exist on the machine running the coding agent.

Requirements:

- Node.js 18 or newer.

Recommended installation:

```bash
npm install -g @playwright/cli@latest
```

Verify:

```bash
playwright-cli --help
```

The upstream CLI can also be invoked through `npx` when appropriate:

```bash
npx -y @playwright/cli@latest --help
```

Do not add Playwright CLI to a client's production bundle merely to provide the agent with QA tooling.

---

## 5. Basic Smoke Test

After local installation:

```bash
playwright-cli open https://example.com
playwright-cli snapshot
playwright-cli screenshot
playwright-cli console
playwright-cli close
```

If these commands work, the browser QA layer is available.

---

## 6. Normal Admonk QA Loop

For significant frontend work:

```text
Implement
   ↓
Open actual local/preview/live page
   ↓
Functional test
   ↓
Responsive test
   ↓
Interaction / motion test
   ↓
Console / network check
   ↓
Visual review
   ↓
Collect evidence
   ↓
Fix
   ↓
Re-test original scenario
```

Do not skip the re-test step after a fix.

---

## 7. Representative Responsive Checks

A typical first pass may include approximately:

```text
1440px — large desktop
1024px — laptop
768px  — tablet
390px  — mobile
```

These are QA probes, not mandatory design-system breakpoints.

Adapt them to the actual site and audience.

---

## 8. Visual QA

Playwright accessibility snapshots are useful for structure and element targeting.

They are not enough for judging:

- Composition.
- Spacing.
- Image cropping.
- Typography relationships.
- Color.
- Visual hierarchy.
- Art direction.
- Motion appearance.

For those, capture screenshots and inspect the rendered page.

When a visual issue is ambiguous and the user is available, use:

```bash
playwright-cli show --annotate
```

so the user can mark the live interface directly.

---

## 9. Browser QA and Admonk Skills

Use the browser evidence together with:

```text
admonk-web-design
→ creative direction

admonk-design-quality
→ generic/incomplete/polish review

admonk-ux-systems
→ usability/accessibility/state review

admonk-motion
→ motion/interaction judgment

admonk-react-engineering
→ React/Next.js implementation quality when relevant

playwright-cli
→ browser operation

admonk-browser-qa
→ verification workflow
```

The QA tool should not redefine the design.

It verifies whether the intended design and behavior survived implementation.

---

## 10. What to Verify Before Delivery

For important pages, check relevant items across:

- Load/runtime health.
- Critical user flows.
- Navigation.
- Forms and feedback states.
- Desktop/tablet/mobile layout.
- Console errors.
- Failed requests.
- Hover/tap behavior.
- Scroll and pinned interactions.
- GSAP/Motion conflicts.
- Image crops.
- Text wrapping.
- Focus/keyboard basics.
- Reduced-motion behavior where motion is significant.
- Visual polish.

The required depth depends on the project and risk.

---

## 11. Evidence Standard

A meaningful QA finding should identify:

```text
Severity
Page / URL
Viewport / device
Steps to reproduce
Observed result
Expected result
Evidence
```

Avoid statements such as:

> "The animation is probably broken because of ScrollTrigger."

until browser evidence supports the diagnosis.

Prefer:

> "At 390px, opening the menu twice leaves the overlay at opacity 0 while it still intercepts pointer input. Reproduced twice after reload."

Then investigate the cause.

---

## 12. Security and External Actions

Browser QA may interact with real websites.

Do not use testing as implicit permission to:

- Purchase something.
- Send real email/messages.
- Publish content.
- Delete data.
- Create real leads/orders/accounts.
- Change account/security settings.

unless the user explicitly requested that action or a safe test environment makes the operation non-destructive.

---

## 13. Future MCP Option

Playwright MCP is intentionally **not banned**.

Consider it when a future workflow requires:

- Long-running autonomous browser sessions.
- Persistent browser context across complex loops.
- Rich continuous introspection of page structure.
- Self-healing exploratory automation where MCP state is genuinely useful.

If that need appears, evaluate the current Microsoft Playwright MCP implementation at that time before adding it.

Do not add both CLI and MCP merely for redundancy.

---

## 14. Final Rule

> **Code review tells us what should happen. Browser QA tells us what did happen.**

Admonk delivery requires both when the frontend change is important enough to justify browser verification.
