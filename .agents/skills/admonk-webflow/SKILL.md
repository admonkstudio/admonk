---
name: admonk-webflow
description: Design, build, edit, integrate, and QA Admonk or client websites in Webflow. Use when working with the Webflow Designer, pages, elements, classes, variables, components, CMS, assets, forms, scripts/custom code, analytics, sitemap, site publishing, or site-level agent instructions. For substantial new Webflow production builds, evaluate and normally use the Admonk Lumos architecture skill unless the project already has a coherent framework. This skill preserves Admonk creative standards while treating Webflow as an implementation platform rather than a house style.
---

# Admonk Webflow

Webflow is an implementation environment.

It should not determine the creative direction merely because its Designer makes certain patterns convenient.

Core rule:

> **Design for the business and brand first. Use Webflow's systems to implement it cleanly.**

Native implementation rule:

> **If Webflow itself supports the required structure, style, responsive behavior, state, CMS behavior, component behavior, or interaction natively, use Webflow rather than recreating it in custom code.**

Custom code is an extension layer for capabilities Webflow does not support cleanly. It is not a shortcut around learning or using the Designer.

---

# 1. Inspect Before Building

Before significant changes:

- Identify the correct site.
- Inspect existing pages/components/classes/variables where relevant.
- Check whether the project already has a naming/system convention.
- Preserve functioning client systems where possible.
- Determine whether custom code already controls relevant behavior.

Do not duplicate an existing component or class system without a reason.

---

# 1A. Native Designer First

Use the full Webflow platform before adding custom code.

Default implementation order:

```text
1. Native Webflow element / semantic structure
        ↓
2. Native classes + Style panel
        ↓
3. Native variables / modes / design-system features
        ↓
4. Native flex / grid / positioning / sizing / overflow / effects / transforms
        ↓
5. Native breakpoints / responsive controls
        ↓
6. Native components / slots / properties
        ↓
7. Native CMS / conditional visibility / bindings / forms / settings
        ↓
8. Native attributes / states / interactions when the platform supports the requirement
        ↓
9. Custom CSS only for a CSS capability Webflow itself cannot express cleanly
        ↓
10. Custom JavaScript / GSAP only for behavior Webflow itself cannot express cleanly
```

Examples:

- If Webflow exposes a CSS property in the Style panel, set it there instead of writing the same property in a `<style>` block.
- If Webflow variables can control a repeated value, use variables instead of custom CSS variables created only in code.
- If Webflow Grid/Flex can create the layout, do not recreate it through embedded CSS.
- If native component properties/slots solve reuse, do not create JavaScript templating for the same problem.
- If a native interaction can achieve the intended behavior cleanly, do not replace it with JavaScript merely because writing code is easier for the agent.

## MCP / Tool Limitation Is Not a Platform Limitation

A connected agent may not expose every capability that exists in the Webflow Designer.

If Webflow supports a feature natively but the currently available MCP/tool cannot manipulate it:

1. Do **not** automatically substitute custom CSS/JavaScript.
2. Use another available native Webflow operation if one exists.
3. If direct automation is unavailable, document the required native Designer step clearly.
4. Only use custom code if the **Webflow platform itself** cannot produce the required result cleanly, or the user explicitly approves a code-based alternative.

This distinction is mandatory:

```text
MCP cannot do it
≠
Webflow cannot do it
```

The goal is to produce a professional Webflow project that remains understandable and editable inside Webflow after the agent leaves.

---

# 2. Designer Structure

Build maintainable structure even when the visual composition is unconventional.

Prefer:

- Clear semantic wrappers
- Predictable class naming
- Reusable components where repetition exists
- Variables/tokens for repeated values when useful
- Responsive rules that can be understood later

Avoid:

- Unnecessary wrapper nesting
- One-off classes for every minor property
- Designer structure that exists only to satisfy an animation hack
- Rebuilding an established system for stylistic preference

---

# 3. Creative Freedom

Do not allow Webflow defaults to force:

- Generic hero sections
- Card-grid page grammar
- Fixed container patterns everywhere
- Repetitive section composition
- Built-in interactions where a better production method genuinely exists

Creative freedom does not justify bypassing Webflow's native implementation capabilities.

If Webflow natively supports the required CSS/layout behavior, implement the creative composition through the Designer first.

Use custom CSS/JS only when the concept requires a capability that Webflow itself cannot express cleanly.

The final site should still be understandable to future editors/developers.

---

# 4. Responsive Behavior

Use the site's actual configured breakpoints rather than assuming a universal set.

For each significant section/component:

- Verify desktop.
- Verify tablet.
- Verify mobile landscape/portrait where applicable.
- Confirm image crops.
- Confirm type wrapping.
- Confirm interaction substitutions for hover.
- Confirm fixed/sticky/pinned behavior.

Prefer Webflow's native responsive controls, fluid units, variables, flex/grid behavior, and supported container-responsive features before adding CSS media/container-query code manually.

Do not treat the Designer preview alone as final QA; test the published/staging output.

---

# 5. Components

Create components when a reusable element has meaningful shared structure/behavior.

Examples:

- Navigation
- Footer
- Repeated CTA
- Reusable content modules
- Card families
- Structured UI patterns

Do not componentize unique art-directed compositions unless reuse/editability benefits from it.

Use Webflow component slots/properties and native component capabilities before custom scripting for content variants or reuse.

---

# 6. CMS

Design CMS collections around the content model, not around the first page layout.

Before changing CMS:

- Inspect existing collections/fields.
- Identify relationships/reference fields.
- Preserve IDs/slugs and data dependencies where possible.
- Consider localization.
- Understand how template pages and collection lists consume the data.

Do not use static content where the client needs ongoing structured editing.

Do not add CMS complexity for content that is truly one-off.

Prefer native CMS bindings, collection lists, conditional visibility, references, and supported filtering/sorting before writing client-side JavaScript to recreate CMS behavior.

---

# 7. Assets

Coordinate with `admonk-image-production`.

For assets:

- Use descriptive names.
- Set useful alt text or mark decorative images appropriately.
- Organize folders when scale warrants it.
- Optimize/compress only with awareness that destructive compression may replace hosted files.
- Verify the visual result after optimization.

---

# 8. Custom Code

Custom code is a controlled extension layer.

Use it only after confirming Webflow itself cannot express the requirement cleanly through native Designer/platform capabilities.

Appropriate use cases may include:

- Advanced GSAP choreography beyond native interaction capability
- Specialized scroll behavior Webflow cannot provide cleanly
- APIs and external integrations
- Complex dynamic application logic
- Specialized form processing unavailable natively
- Unsupported CSS features/selectors/properties that materially improve the design
- Specialized analytics/performance behavior unavailable through native settings

Before adding code, ask:

1. Can Webflow's Style panel do this?
2. Can variables do this?
3. Can native layout/responsive controls do this?
4. Can components/slots/properties do this?
5. Can CMS/settings/bindings do this?
6. Can native states/interactions do this cleanly?
7. Is the limitation actually Webflow's, or only the current MCP/tool's?

If the answer is that Webflow supports it natively, use the native implementation.

Before replacing existing site/page custom code, read it first.

Prefer additive/surgical changes over overwriting entire code blocks when unrelated scripts exist.

When custom code is necessary, document why the native platform was insufficient.

---

# 9. Motion

Use `admonk-motion` and `admonk-motion-production`.

Default routing:

```text
Simple CSS hover / transition / transform
→ Webflow Style panel / native state

Standard Webflow interaction that the platform supports cleanly
→ Webflow native interaction

Advanced choreography / ScrollTrigger / complex SVG / behavior beyond Webflow capability
→ custom GSAP/JS
```

Do not force GSAP for a simple hover, transition, transform, opacity change, or state that Webflow can implement natively.

Do not use code merely because the MCP cannot currently author a Webflow interaction. If Webflow itself supports the interaction, treat it as a native Designer implementation unless there is a genuine technical reason to use code.

Use GSAP/custom motion when it materially exceeds Webflow's native capabilities or produces a substantially cleaner and more maintainable solution for an advanced requirement.

---

# 10. Forms and Automation

Forms are part of the business system, not merely visual components.

Verify:

- Required fields
- Validation
- Success/error states
- Spam/security considerations
- Submission destination
- CRM/automation routing
- Analytics events where needed
- Privacy/consent requirements

Use Webflow's native form fields, settings, validation, states, and supported integrations when they meet the requirement.

If a project uses webhooks or external automation, document the data flow in the client project's platform context.

---

# 11. SEO / Indexing

Treat SEO/indexing as part of production readiness.

Check where relevant:

- Page titles/descriptions
- Canonical behavior
- Sitemap inclusion
- Structured CMS page metadata
- Image alt text
- Heading hierarchy
- Redirect/migration requirements

Use Webflow's native SEO/page/site settings where available rather than injecting equivalent metadata through custom code.

Do not change indexing status or publish changes without understanding the effect.

---

# 12. Analyze / Real Usage

When Webflow Analyze is available, use real engagement/traffic data to inform improvements rather than redesigning from taste alone.

Possible evidence:

- Top pages
- Device split
- Traffic sources
- Engagement events
- Time on page

Separate observation from inference.

---

# 13. Agent Instructions Inside Webflow

When the Webflow platform supports site-level agent rules/skills, client-specific instructions may be stored with that Webflow site when it improves continuity.

Suitable examples:

- Site naming conventions
- CMS-specific procedures
- Client-specific publishing rules
- Project-local editing constraints
- The project's Lumos version and project-specific Lumos deviations when Lumos is used

Do not push Admonk's entire studio knowledge into every Webflow site.

Keep reusable studio intelligence in the Admonk agent system and site-specific context with the site/project.

---

# 14. Publishing Safety

Publishing changes the live environment.

Before publish:

- Confirm intended site/page/environment.
- Run responsive/interaction checks.
- Check forms/integrations affected by the change.
- Check console errors where custom code changed.
- Confirm no placeholder content/assets remain.
- Audit custom CSS/JS and verify none of it merely duplicates a native Webflow capability without justification.

Do not publish merely to see whether unfinished code works if a preview/staging path exists.

---

# 15. Benchmarking Webflow

When comparing Webflow with Figma/Astro, measure:

- Speed from design to production
- Visual fidelity
- Responsive control
- Native Designer capability utilization
- Percentage of implementation achieved without custom code
- CMS/editability
- Native motion capability
- Advanced custom-motion freedom
- AI autonomy
- Maintainability by non-developers
- Performance
- Integration capability
- Production readiness

For benchmark builds, apply the Native Designer First rule strictly.

A custom-code solution to a capability Webflow already supports natively counts as an implementation-quality failure, even if the rendered output looks correct.

Evaluate the published/staging result and the Designer architecture, not only the visual canvas.

---

# 16. Lumos Architecture

For a **substantial new Webflow production project** with no established framework, Lumos is the preferred Admonk starting architecture.

Use:

`.agents/skills/admonk-lumos/SKILL.md`

Lumos should provide implementation discipline for:

- Class naming
- Utilities/combo classes
- Variables
- Typography/color systems
- Fluid sizing/spacing
- Grid/container systems
- Components and slots
- Page architecture
- Responsive/state systems
- Client handoff
- Figma-to-Webflow system translation

Admonk remains responsible for creative direction, composition, imagery, motion concept, storytelling, and client brand translation.

Do not migrate an existing coherent Webflow system into Lumos automatically.

For existing projects:

> **Preserve the existing architecture unless migration has a clear maintainability/business benefit.**

Because Lumos evolves, record the project's Lumos version and verify version-sensitive rules against current official documentation rather than memory.

---

# Final Rule

> **Use Webflow's visual speed and native capabilities first. Extend the platform only where the platform actually ends. Use Lumos when it makes the implementation cleaner without making the design more generic.**
