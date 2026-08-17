# Admonk MCP Servers

This document records the MCP capability layer used by Codex when working with the Admonk repository.

MCP servers provide tools and external context. They do **not** define Admonk's design direction, business positioning, or technical stack.

Admonk rules remain authoritative according to `AGENTS.md`.

---

## 1. Current MCP Servers

### shadcn

Provider: shadcn/ui

Purpose:

- Discover shadcn-compatible components and registry items.
- Inspect established component implementations and usage patterns.
- Use reliable UI primitives when a React project actually benefits from them.
- Work with additional shadcn-compatible registries when a client project configures them.

Project configuration:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["-y", "shadcn@latest", "mcp"]
startup_timeout_sec = 30
enabled = true
```

The repository stores this configuration at:

```text
.codex/config.toml
```

---

## 2. Why the Official shadcn MCP

Admonk uses the official shadcn MCP exposed through the shadcn CLI rather than the previously considered third-party `Jpisnice/shadcn-ui-mcp-server`.

Reason:

- shadcn now provides its own MCP server.
- It works directly with the official shadcn registry.
- It supports shadcn-compatible third-party and private registries.
- It removes an unnecessary intermediary from the toolchain.

If the official server stops meeting a real requirement, reassess rather than retaining it by habit.

---

## 3. Design Authority

The shadcn MCP is a **component capability**, not a design system for Admonk.

Use it to improve:

- Component behavior
- Accessibility foundations
- Interaction reliability
- Implementation speed
- Reference discovery

Do not let it automatically determine:

- Page composition
- Visual identity
- Typography
- Color
- Radius
- Spacing character
- Art direction
- Motion language
- Overall website aesthetic

For those decisions, defer to:

- `docs/DESIGN-LANGUAGE.md`
- `.agents/skills/admonk-web-design/SKILL.md`
- `.agents/skills/admonk-ux-systems/SKILL.md`
- `docs/MOTION-LANGUAGE.md`
- `docs/IMAGE-DIRECTION.md`

A shadcn primitive may supply robust behavior while its appearance is completely adapted to the client.

---

## 4. When to Use shadcn

Use the MCP when:

- The actual project uses React and shadcn/ui or is compatible with it.
- A robust primitive such as a dialog, dropdown, form control, tabs, command interface, or similar component is useful.
- Existing accessible behavior is preferable to rebuilding a complex primitive from scratch.
- The agent needs to inspect a component or registry item before implementation.

Do not use it merely because the MCP is available.

Do not migrate Webflow, static HTML, or another stack to shadcn without a project reason.

---

## 5. Existing Project First

Before adding a shadcn component:

1. Inspect the project's framework and dependencies.
2. Check whether an equivalent component already exists.
3. Preserve the existing design system when it works.
4. Add only the primitive or behavior actually needed.
5. Adapt styling to the client's visual direction.
6. Test responsive, keyboard, focus, loading, error, and reduced-motion behavior where relevant.

Prefer:

> **Reuse → Adapt → Add → Replace only when justified.**

---

## 6. Local Codex Activation

The repository configuration is project-scoped.

On a local machine:

1. Open or clone the `admonk` repository.
2. Ensure Node.js/npm and a current Codex client are installed.
3. Open the repository as a trusted Codex project.
4. Start Codex from the repository.
5. Run:

```text
/mcp
```

or from a terminal:

```bash
codex mcp list
```

The `shadcn` server should appear as enabled/connected.

Project-scoped MCP configuration is intentionally committed to GitHub so the capability travels with the repository. Local project trust remains a machine/user decision and should not be bypassed in the repository.

---

## 7. Registries

No extra registry configuration is required for access to the standard shadcn/ui registry.

A real client project may define additional registries in its own `components.json` when needed.

Do not add a `components.json` to the Admonk agent-configuration repository merely to enable the standard shadcn MCP server.

---

## 8. Secrets

Do not commit API tokens, private registry credentials, or authorization headers to this repository.

For authenticated/private registries:

- Use environment variables.
- Reference those variables from the client project's registry configuration.
- Keep `.env` files containing secrets out of source control.

The standard public shadcn registry does not require Admonk to commit a credential.

---

## 9. Capability Rule

The governing principle is:

> **Use MCP to expand what the agent can access. Use Admonk skills to decide what the agent should create.**

A component being available is not a reason to use it.

A component should enter a project because it improves the Web Experience.
