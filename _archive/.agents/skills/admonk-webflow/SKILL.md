---
name: admonk-webflow
description: Design, build, edit, integrate, and QA Admonk or client websites in Webflow. Use when working with the Webflow Designer, pages, elements, classes, variables, components, CMS, assets, forms, scripts/custom code, analytics, sitemap, site publishing, or site-level agent instructions. For substantial new Webflow production builds, evaluate and normally use the Admonk Lumos architecture skill unless the project already has a coherent framework. This skill preserves client brand/design-system authority and Admonk creative standards while treating Webflow as an implementation platform rather than a house style.
---

# Admonk Webflow

Webflow is an implementation environment.

It should not determine the creative direction merely because its Designer makes certain patterns convenient.

Core rule:

> **Design for the business and brand first. Use Webflow's systems to implement it cleanly.**

Native implementation rule:

> **If Webflow itself supports the required structure, style, responsive behavior, state, CMS behavior, component behavior, or interaction natively, use Webflow rather than recreating it in custom code.**

Custom code is an extension layer for capabilities Webflow does not support cleanly. It is not a shortcut around learning or using the Designer.

Client-system rule:

> **Inspect and reuse the client's approved Style Sheet, variables, components, classes, and Brand Guideline before creating a parallel system.**

---

# 1. Inspect Before Building

Before significant changes:

- Identify the correct site.
- Inspect the project's `Style Sheet` page when one exists.
- Inspect the project's `Brand Guideline` page and linked brand sources when one exists.
- Inspect existing variables/modes.
- Inspect existing components/slots/properties.
- Inspect existing classes and framework conventions.
- Check the project docs such as `DESIGN-SYSTEM.md`, `BRAND-GUIDELINES.md`, `PROJECT-BRIEF.md`, and `PLATFORM.md` when available.
- Preserve functioning client systems where possible.
- Determine whether custom code already controls relevant behavior.

Do not duplicate an existing component or class system without a reason.

If a live project source conflicts with a project document, identify the conflict rather than silently mixing them.

---

# 1A. Brand + Design System Gate

Before substantial design or implementation, answer:

```text
What is the client's positioning and audience?
What should the brand feel/sound like?
What is the approved visual identity?
Where is the production design system documented?
Which classes/variables/components already exist?
What framework/version is the project using?
What are the project-specific deviations?
```

For projects using the normal Admonk client structure, use:

- `docs/BRAND-GUIDELINES.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/PROJECT-BRIEF.md`
- `docs/PLATFORM.md`

For Webflow projects, the live `Style Sheet` page should normally demonstrate important reusable implementation primitives and states.

The `Brand Guideline` page/source should normally establish brand strategy, voice, visual rules, imagery, and other client-specific direction.

Do not let Lumos, Client-First, Webflow defaults, or an AI-generated pattern override those client sources.

---

# 1B. Native Designer First

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

---

# 2. Designer Structure

Build maintainable structure even when the visual composition is unconventional.

Prefer:

- Clear semantic wrappers
- Predictable class naming that follows the project's system
- Reusable components where repetition exists
- Existing variables/tokens for repeated values
- Responsive rules that can be understood later
- Design-system additions documented on the Style Sheet when reusable

Avoid:

- Unnecessary wrapper nesting
- One-off classes for every minor property
- AI-invented classes that duplicate an existing class/system role
- Designer structure that exists only to satisfy an animation hack
- Rebuilding an established system for stylistic preference

When a new reusable class/component/token is genuinely required, add it coherently to the system rather than leaving it undocumented on one production page.

---

# 3. Creative Freedom

Do not allow Webflow defaults to force:

- Generic hero sections
- Card-grid page grammar
- Fixed container patterns everywhere
- Repetitive section composition
- Built-in interactions where a better production method genuinely exists

Use the platform's native layout capability creatively.

Use custom layout/CSS/JS only when the concept genuinely exceeds the native capability or an approved advanced implementation is justified.

The final site should still be understandable to future editors/developers.

---

# 4. Responsive Behavior

Responsiveness is designed continuously, not added after desktop completion.

Use the project's fluid/responsive strategy and actual configured Webflow breakpoints rather than assuming a universal set.

For each significant section/component:

- Verify desktop.
- Verify tablet/intermediate widths.
- Verify mobile landscape/portrait where applicable.
- Drag/test the canvas at intermediate widths rather than checking only breakpoint icons.
- Confirm grid/flex reflow.
- Confirm image crops/art direction.
- Confirm type wrapping/scaling.
- Confirm navigation behavior.
- Confirm touch substitutions for hover.
- Confirm motion substitutions.
- Confirm fixed/sticky/pinned behavior.
- Confirm long content/localization where relevant.
- Confirm browser zoom/text enlargement remains usable when required.

Prefer fluid/content-driven behavior where possible and explicit breakpoint changes where the composition genuinely needs them.

Mobile should preserve the design concept, hierarchy, brand, and usability rather than merely stacking desktop elements.

Do not treat the Designer preview alone as final QA; test the published/staging output in a real browser.

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

Before creating a new component, inspect the existing project library and Style Sheet.

Do not componentize unique art-directed compositions unless reuse/editability benefits from it.

Do not create a duplicate component because the agent failed to discover the existing one.

---

# 6. CMS

Design CMS collections around the content model, not around the first page layout.

Before changing CMS:

- Inspect existing collections/fields.
- Identify relationships/reference fields.
- Preserve IDs/slugs and data dependencies where possible.
- Consider localization.
- Understand how template pages and collection lists consume the data.
- Confirm CMS-rendered content still works with responsive layouts and the design system.

Do not use static content where the client needs ongoing structured editing.

Do not add CMS complexity for content that is truly one-off.

---

# 7. Assets

Coordinate with `admonk-image-production`.

For assets:

- Use descriptive names.
- Set useful alt text or mark decorative images appropriately.
- Organize folders when scale warrants it.
- Use suitable responsive image dimensions/crops.
- Avoid unnecessarily large desktop assets on mobile.
- Preserve image dimensions/aspect ratios to reduce layout shift.
- Optimize/compress only with awareness that destructive compression may replace hosted files.
- Verify the visual result after optimization.

Asset quality and page performance must be considered together.

---

# 8. Custom Code

Use custom code only when Webflow-native capabilities cannot express the required behavior cleanly, or an explicitly approved advanced implementation clearly benefits from code.

Valid examples may include:

- advanced GSAP choreography / ScrollTrigger
- advanced SVG/path animation
- API integrations
- dynamic application logic
- custom form/integration behavior Webflow cannot provide
- specialized performance/analytics behavior
- CSS capabilities Webflow does not expose cleanly

Invalid reason:

> "Writing CSS/JavaScript is faster for the agent than using Webflow Designer."

Before replacing existing site/page custom code, read it first.

Prefer additive/surgical changes over overwriting entire code blocks when unrelated scripts exist.

Document important custom-code dependencies in the project context.

---

# 9. Motion

Use `admonk-motion` and `admonk-motion-production`.

Default routing:

```text
Simple native CSS/state behavior
→ Webflow Style panel / state / interaction

Normal Webflow-supported interaction
→ native Webflow interaction

Advanced choreography / ScrollTrigger / SVG / complex sequence
that exceeds Webflow cleanly
→ custom GSAP/JS
```

Do not force Webflow-native interactions when the platform genuinely cannot express the intended advanced choreography cleanly.

Do not force GSAP for a simple hover/fade that Webflow can maintain natively.

Test motion for mobile performance and reduced-motion behavior.

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
- Mobile form usability
- Layout stability around validation/success states

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

Do not change indexing status or publish changes without understanding the effect.

---

# 12. Performance / PageSpeed

Performance is a continuous Webflow implementation constraint.

Use `admonk-performance`.

During the build consider:

- image/video delivery
- font count/weights
- third-party scripts/apps
- custom-code runtime cost
- DOM complexity
- animation/rendering cost
- layout stability
- interaction responsiveness
- mobile/low-power-device behavior

Run PageSpeed Insights/Lighthouse diagnostics at meaningful milestones and before handoff when a public/staging URL is testable.

Test mobile and desktop separately.

Use current Core Web Vitals guidance as the primary real-user performance baseline and field data when available.

Do not wait until launch to discover that the visual system or motion implementation created avoidable performance problems.

---

# 13. Analyze / Real Usage

When Webflow Analyze is available, use real engagement/traffic data to inform improvements rather than redesigning from taste alone.

Possible evidence:

- Top pages
- Device split
- Traffic sources
- Engagement events
- Time on page

Separate observation from inference.

---

# 14. Agent Instructions Inside Webflow

When the Webflow platform supports site-level agent rules/skills, client-specific instructions may be stored with that Webflow site when it improves continuity.

Suitable examples:

- Site naming conventions
- Style Sheet / design-system conventions
- Brand Guideline source locations
- CMS-specific procedures
- Client-specific publishing rules
- Project-local editing constraints
- The project's Lumos version and project-specific Lumos deviations when Lumos is used
- Performance/responsive exceptions

Do not push Admonk's entire studio knowledge into every Webflow site.

Keep reusable studio intelligence in the Admonk agent system and site-specific context with the site/project.

---

# 15. Publishing Safety

Publishing changes the live environment.

Before publish:

- Confirm intended site/page/environment.
- Run responsive/interaction checks at representative and intermediate widths.
- Check forms/integrations affected by the change.
- Check console errors where custom code changed.
- Confirm no placeholder content/assets remain.
- Confirm client design-system/brand alignment.
- Run performance/PageSpeed checks appropriate to the release stage.

Do not publish merely to see whether unfinished code works if a preview/staging path exists.

---

# 16. Benchmarking Webflow

When comparing Webflow with Figma/Astro, measure:

- Speed from design to production
- Visual fidelity
- Native Designer utilization
- Design-system reuse
- Responsive control across real viewport ranges
- CMS/editability
- Motion/native-vs-custom-code freedom
- AI autonomy
- Maintainability by non-developers
- PageSpeed/Core Web Vitals potential
- Integration capability
- Production readiness

Evaluate the published result, not only the Designer canvas.

---

# 17. Lumos Architecture

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

The client's Style Sheet / Brand Guideline / approved design system remain authoritative over Lumos starter values.

Do not migrate an existing coherent Webflow system into Lumos automatically.

For existing projects:

> **Preserve the existing architecture unless migration has a clear maintainability/business benefit.**

Because Lumos evolves, record the project's Lumos version and verify version-sensitive rules against current official documentation rather than memory.

---

# Final Rule

> **Use Webflow's visual speed without inheriting Webflow's visual sameness. Follow the client's system. Build natively first. Design responsively. Protect performance. Extend with code only where Webflow itself ends.**
