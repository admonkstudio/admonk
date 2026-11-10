# Playwright CLI Upstream

Source project: `microsoft/playwright-cli`

Maintainer: Microsoft

Upstream skill:

```text
skills/playwright-cli/SKILL.md
```

License: Apache License 2.0

The Admonk `playwright-cli` skill is a condensed adaptation of the official Microsoft Playwright CLI guidance. It keeps the commands and workflow most relevant to Admonk's browser testing and visual QA work rather than copying the complete upstream reference set.

## Why CLI Instead of Playwright MCP by Default

Microsoft's current Playwright documentation explicitly distinguishes the two approaches:

- **Playwright CLI + skills** is recommended for coding agents because it is more token-efficient and does not force large MCP tool schemas or verbose accessibility trees into the model context.
- **Playwright MCP** remains useful for specialized persistent agentic loops where continuous browser state, rich introspection, or autonomous long-running interaction justifies the extra context cost.

Admonk therefore uses Playwright CLI + skills as the default browser QA layer.

Playwright MCP may be added later only if a real workflow demonstrates that persistent MCP browser state is materially more useful than the CLI approach.

## Integration Decision

### Keep

- Browser navigation and interaction through Playwright.
- Accessibility snapshots and stable element refs.
- Screenshots for visual evidence.
- Responsive viewport/device testing.
- Console and network inspection.
- Tracing and video for difficult bugs.
- Named browser sessions.
- Interactive annotation through `show --annotate`.
- Test/locator assistance when useful.

### Modify

- Admonk treats screenshots as essential for visual QA even though structured snapshots are preferred for many automation tasks.
- Responsive widths are representative QA probes, not fixed design breakpoints.
- Browser automation is integrated with Admonk's existing design, UX, motion, and quality skills.
- Persistent browser profiles are used selectively rather than by default.

### Skip

- Adding Playwright MCP simply because browser automation is needed.
- Copying the entire upstream reference directory into Admonk when the normal QA workflow does not need it.
- Treating browser automation output as permission to perform destructive or external actions without explicit user intent.

## Apache License 2.0

The upstream repository declares Apache License 2.0. The original license remains available in the Microsoft repository and applies to upstream material adapted here.
