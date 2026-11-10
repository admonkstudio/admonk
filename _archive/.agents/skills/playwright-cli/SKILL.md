---
name: playwright-cli
description: Use Microsoft's Playwright CLI for browser automation, functional testing, responsive checks, screenshots, console/network inspection, tracing, and interactive UI review. Use when an Admonk agent needs to verify a real website or web app in a browser.
---

# Playwright CLI

Use this skill for browser automation and verification.

This skill is intentionally CLI-based. For coding-agent workflows, prefer Playwright CLI over loading a large browser MCP tool surface unless a persistent autonomous browser loop genuinely requires MCP.

## 1. Availability

First check:

```bash
playwright-cli --help
```

If the command is unavailable, check whether the package can run through `npx`:

```bash
npx -y @playwright/cli@latest --help
```

For a machine used regularly for Admonk work, the recommended local installation is:

```bash
npm install -g @playwright/cli@latest
```

Requires Node.js 18 or newer.

Do not add Playwright to a client project's production dependencies merely to use browser QA.

---

## 2. Core Workflow

Open a page:

```bash
playwright-cli open https://example.com
```

Inspect the page structure and obtain element refs:

```bash
playwright-cli snapshot
```

Interact using refs from the snapshot:

```bash
playwright-cli click e15
playwright-cli fill e5 "user@example.com"
playwright-cli hover e8
playwright-cli press Enter
```

Capture visual evidence:

```bash
playwright-cli screenshot --hires
```

Close the session:

```bash
playwright-cli close
```

---

## 3. Navigation and Page Inspection

```bash
playwright-cli goto https://example.com/page
playwright-cli go-back
playwright-cli go-forward
playwright-cli reload
playwright-cli snapshot
playwright-cli snapshot --boxes
playwright-cli find "Contact"
playwright-cli find --regex "/sign (in|up)/i"
```

Prefer snapshot refs over brittle CSS selectors when practical.

Use `eval` only when the snapshot does not expose the information needed:

```bash
playwright-cli eval "document.title"
playwright-cli eval "el => el.getAttribute('aria-label')" e5
```

---

## 4. Common Interaction Commands

```bash
playwright-cli click e3
playwright-cli dblclick e7
playwright-cli fill e5 "Example text"
playwright-cli fill e5 "Example text" --submit
playwright-cli type "Example text"
playwright-cli hover e4
playwright-cli select e9 "option-value"
playwright-cli check e12
playwright-cli uncheck e12
playwright-cli drag e2 e8
playwright-cli upload ./document.pdf
playwright-cli press Escape
```

Never perform a destructive, financial, publishing, deletion, account, or external-communication action unless the user explicitly requested that action.

---

## 5. Responsive Testing

Resize the current browser:

```bash
playwright-cli resize 1440 1000
playwright-cli resize 1024 900
playwright-cli resize 768 900
playwright-cli resize 390 844
```

Or open using mobile/device emulation:

```bash
playwright-cli open https://example.com --mobile
playwright-cli open https://example.com --device="iPhone 15"
```

Representative widths are QA probes, not mandatory design breakpoints. Adapt them to the project's real audience and layout.

At each important width, verify:

- No horizontal overflow.
- Navigation remains usable.
- Text does not collide or clip.
- Images crop intentionally.
- Sticky/fixed elements do not obscure content.
- Critical controls remain reachable.
- The visual concept survives the layout change.

---

## 6. Visual Evidence

Use screenshots for visual/design QA:

```bash
playwright-cli screenshot
playwright-cli screenshot --hires
playwright-cli screenshot --filename=homepage-desktop.png
playwright-cli screenshot e5 --filename=component.png
```

Use snapshots for structure and interaction state; use screenshots for actual visual appearance.

Do not claim that spacing, cropping, alignment, color, or animation looks correct based only on source code or accessibility snapshots.

---

## 7. Console and Network Debugging

Inspect browser console output:

```bash
playwright-cli console
playwright-cli console warning
```

Inspect requests:

```bash
playwright-cli requests
playwright-cli request 5
```

For a bug report, check both console and network before concluding that the problem is purely visual or JavaScript-related.

---

## 8. Tracing and Video

For difficult interaction bugs:

```bash
playwright-cli tracing-start
# reproduce the issue
playwright-cli tracing-stop
```

For motion or multi-step flows:

```bash
playwright-cli video-start review.webm
# reproduce the flow
playwright-cli video-stop
```

Use tracing/video when they add diagnostic value; do not create them automatically for every small check.

---

## 9. Interactive Design Review

When the user wants to point at the live interface and explain changes visually:

```bash
playwright-cli show --annotate
```

This is useful for:

- UI review.
- Design feedback.
- Identifying a specific element or region.
- Clarifying what the user means by a visual adjustment.

Use this instead of guessing which element the user is referring to when interactive annotation is practical.

---

## 10. Sessions

Use named sessions when multiple sites or states must remain open:

```bash
playwright-cli -s=admonk open https://example.com
playwright-cli -s=admonk snapshot
playwright-cli -s=admonk close
playwright-cli list
playwright-cli close-all
```

Use persistent profiles only when login/session persistence is genuinely useful:

```bash
playwright-cli -s=client open https://example.com --persistent
```

Do not persist authentication state unnecessarily.

---

## 11. Useful Browser Code

For checks that require Playwright APIs directly:

```bash
playwright-cli run-code "async page => { console.log(await page.title()) }"
```

Use `run-code` selectively. Prefer built-in CLI commands for ordinary interactions because they are clearer and easier to audit.

---

## 12. Evidence Rule

Browser QA should produce evidence, not assumptions.

For each meaningful defect, record:

- Page/URL.
- Viewport/device if relevant.
- Action that exposes the issue.
- What was observed.
- What was expected.
- Severity.
- Screenshot/trace when useful.

After changing code, reproduce the same path again to verify the fix.

---

## 13. Tool Relationship

Use:

- `admonk-browser-qa` to decide **what and how to verify**.
- `playwright-cli` for the **browser commands**.
- `admonk-ux-systems` for usability/accessibility judgment.
- `admonk-design-quality` for design/polish judgment.
- `admonk-motion` for interaction/motion judgment.

The browser is the source of truth for what the implemented experience actually does.
