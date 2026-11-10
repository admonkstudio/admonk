# Admonk MCP Servers

This document records the MCP capability layer used by Codex when working with the Admonk repository.

MCP servers provide tools, external context, component discovery, and generation capability. They do **not** define Admonk's design direction, business positioning, or technical stack.

Admonk rules remain authoritative according to `AGENTS.md`.

> **Use MCP to expand what the agent can access. Use Admonk skills to decide what the agent should create.**

---

## 1. Current MCP Servers

The repository currently configures:

- `shadcn` — reliable React UI primitives and registry discovery.
- `21st` — component/catalog exploration and optional AI-assisted UI ideation.

Project configuration lives at:

```text
.codex/config.toml
```

Current configuration:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["-y", "shadcn@latest", "mcp"]
startup_timeout_sec = 30
enabled = true

[mcp_servers."21st"]
url = "https://21st.dev/api/mcp"
env_http_headers = { "x-api-key" = "API_KEY_21ST" }
startup_timeout_sec = 30
default_tools_approval_mode = "writes"
enabled = true
```

Never commit the value of `API_KEY_21ST` to this repository.

---

# 2. shadcn MCP

Provider: shadcn/ui

## Purpose

Use shadcn to:

- Discover shadcn-compatible components and registry items.
- Inspect established component implementations and usage patterns.
- Reuse reliable accessible primitives when a React project benefits from them.
- Work with additional shadcn-compatible registries configured by a client project.

## Why the Official shadcn MCP

Admonk uses the official shadcn MCP exposed through the shadcn CLI rather than the previously considered third-party `Jpisnice/shadcn-ui-mcp-server`.

Reason:

- shadcn provides its own MCP server.
- It works directly with the official registry.
- It supports compatible third-party and private registries.
- It removes an unnecessary intermediary from the toolchain.

If the official server stops meeting a real requirement, reassess rather than retaining it by habit.

## When to Use shadcn

Use it when:

- The actual project uses React and shadcn/ui or is compatible with it.
- A robust primitive such as a dialog, dropdown, form control, tabs, command interface, or similar component is useful.
- Existing accessible behavior is preferable to rebuilding a complex primitive from scratch.
- The agent needs to inspect a component or registry item before implementation.

Do not migrate Webflow, static HTML, or another stack to shadcn merely because the MCP exists.

---

# 3. 21st MCP

Provider: 21st.dev

The former **Magic MCP** has been replaced by the unified **21st MCP**. Do not add the legacy `@21st-dev/magic` package to new Admonk configurations unless compatibility with an older environment specifically requires it.

## Purpose

Use 21st as an **exploration and acceleration layer** for:

- Searching the 21st component catalog.
- Inspecting component ideas and implementation references.
- Exploring themes and templates.
- Generating several UI directions from a prompt.
- Comparing variants before committing to a design direction.
- Retrieving component code when it genuinely saves implementation time.
- Exploring community patterns when the project needs broader visual research.
- Team libraries when Admonk later establishes reusable internal component collections.

21st is especially useful during the transition between:

```text
Design direction
      ↓
Rapid visual exploration
      ↓
Selected direction
      ↓
Admonk-quality implementation
```

## What 21st Is Not

21st is not:

- Admonk's design system.
- Admonk's creative director.
- A replacement for `DESIGN-LANGUAGE.md`.
- A reason to use React/Tailwind on every project.
- A source whose generated output should automatically be shipped unchanged.
- A substitute for UX review, accessibility, responsive design, or engineering review.

The presence of an attractive community component does not mean it belongs in the project.

---

# 4. 21st Usage Rule

The preferred workflow is:

```text
Brief / business objective
        ↓
Admonk creative direction
        ↓
Use 21st for exploration when useful
        ↓
Select or reject ideas
        ↓
Adapt to the client's identity
        ↓
Rebuild/refine in the real project stack
        ↓
Admonk UX + quality review
```

When 21st generates a sketch or variant, treat it as a **design draft**, not finished production code.

Prefer extracting:

- Composition ideas
- Interaction ideas
- Component relationships
- Useful implementation patterns
- Alternative directions

Then rebuild or adapt them according to the actual project.

---

# 5. shadcn vs 21st

These tools overlap, but they serve different purposes.

## Prefer shadcn when

You already know what component is needed and want a reliable implementation foundation.

Examples:

- Dialog
- Dropdown
- Tabs
- Form control
- Command palette
- Sheet/drawer
- Popover

Think:

> **Reliable primitive.**

## Prefer 21st when

You want broader visual exploration, references, component discovery, or multiple generated UI directions.

Examples:

- Explore several hero concepts.
- Search for unusual portfolio treatments.
- Compare pricing-section structures.
- Find inspiration for an interactive service card.
- Generate several rough interface directions before choosing one.

Think:

> **Exploration accelerator.**

## Use neither when

The existing project already has the necessary component or a simpler custom implementation is better.

---

# 6. Design Authority

Neither shadcn nor 21st may automatically determine:

- Page composition
- Visual identity
- Typography
- Color
- Radius
- Spacing character
- Art direction
- Motion language
- Image direction
- Overall website aesthetic

For those decisions, defer to:

- `docs/ADMONK-BUSINESS.md`
- `docs/DESIGN-LANGUAGE.md`
- `docs/MOTION-LANGUAGE.md`
- `docs/IMAGE-DIRECTION.md`
- `.agents/skills/admonk-web-design/SKILL.md`
- `.agents/skills/admonk-design-quality/SKILL.md`
- `.agents/skills/admonk-ux-systems/SKILL.md`
- `.agents/skills/admonk-motion/SKILL.md`

A third-party primitive may supply robust behavior while its appearance is completely adapted to the client.

---

# 7. Existing Project First

Before importing or generating a component through any MCP:

1. Inspect the project's framework and dependencies.
2. Check whether an equivalent component already exists.
3. Preserve the existing design system when it works.
4. Decide whether external code actually saves time or improves quality.
5. Add only the behavior or primitive needed.
6. Adapt the visual treatment to the client's identity.
7. Test responsive, keyboard, focus, loading, error, and reduced-motion behavior where relevant.
8. Remove unused dependencies and demo code.

Prefer:

> **Reuse → Adapt → Add → Replace only when justified.**

---

# 8. 21st Free-Tier Awareness

21st's current public MCP/CLI offering allows catalog search, publishing, and management without charge, while component installs are limited on the free tier and AI generation uses credits.

This means Admonk should use 21st deliberately rather than making unnecessary generation calls.

Prefer:

- Search before generating.
- Compare several directions in one thoughtful request.
- Batch refinements rather than issuing many tiny AI edits.
- Use generated variants to make a decision, not as an endless exploration loop.

Do not design a workflow that becomes dependent on unlimited paid generation.

---

# 9. 21st Authentication

The 21st MCP requires a current 21st API key.

The repository expects the key through:

```text
API_KEY_21ST
```

The MCP configuration maps that environment variable to the required `x-api-key` HTTP header.

Codex supports environment-backed HTTP headers for remote MCP servers, allowing the secret to remain outside source control.

Do not place a real key directly inside `.codex/config.toml`.

If an old Magic MCP key exists, do not assume it still works. Generate a current 21st key from the active 21st MCP setup page.

---

# 10. Local Activation

Project-scoped MCP configuration is committed to GitHub, but authentication remains local to each machine/user.

## shadcn

No Admonk credential is required for the standard public registry.

## 21st

On the local machine:

1. Create/sign in to a 21st account.
2. Generate a current API key from the 21st MCP page.
3. Set it as the environment variable:

```text
API_KEY_21ST
```

4. Open the Admonk repository as a trusted Codex project.
5. Restart Codex after setting the environment variable.
6. Run:

```text
/mcp
```

or:

```bash
codex mcp list
```

Both `shadcn` and `21st` should appear in the configured MCP list.

---

# 11. Tool Approval

The 21st server is configured with:

```toml
default_tools_approval_mode = "writes"
```

This allows read-oriented discovery to remain convenient while asking for approval when the MCP exposes an operation classified as a write.

Do not weaken approval behavior simply to remove an occasional confirmation prompt.

---

# 12. Secrets

Never commit:

- API keys
- OAuth tokens
- Private registry credentials
- Authorization headers
- `.env` files containing secrets

Use environment variables or the authentication mechanism provided by the relevant MCP client.

If a future MCP requires a secret, prefer an environment-backed configuration rather than a static credential inside GitHub.

---

# 13. Final Capability Rule

MCP servers should make Admonk **more capable**, not more generic.

The final hierarchy is:

```text
Business objective
      ↓
Client identity
      ↓
Admonk creative direction
      ↓
UX and interaction logic
      ↓
Choose the appropriate tools
      ↓
shadcn / 21st / other MCP capability where useful
      ↓
Implementation
      ↓
Admonk quality review
```

> **A component being available is not a reason to use it.**

Use it only when it helps create a stronger Web Experience.
