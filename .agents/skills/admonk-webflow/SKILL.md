---
name: admonk-webflow
description: Design, build, edit, integrate, and QA Admonk or client websites in Webflow. Use when working with the Webflow Designer, pages, elements, classes, variables, components, CMS, assets, forms, scripts/custom code, analytics, sitemap, site publishing, or site-level agent instructions. This skill preserves Admonk creative standards while treating Webflow as an implementation platform rather than a house style.
---

# Admonk Webflow

Webflow is an implementation environment.

It should not determine the creative direction merely because its Designer makes certain patterns convenient.

Core rule:

> **Design for the business and brand first. Use Webflow's systems to implement it cleanly.**

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
- Built-in interactions where a better production method exists

Use custom layout/CSS/JS when the concept genuinely requires it.

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

Use custom code when Webflow-native capabilities cannot express the required behavior cleanly.

Common use cases:

- GSAP
- Advanced scroll interactions
- API integrations
- Custom form behavior
- Dynamic logic
- Specialized performance/analytics behavior

Before replacing existing site/page custom code, read it first.

Prefer additive/surgical changes over overwriting entire code blocks when unrelated scripts exist.

---

# 9. Motion

Use `admonk-motion` and `admonk-motion-production`.

Default routing:

```text
Simple Webflow-native behavior
→ Webflow interaction/native CSS

Advanced choreography / ScrollTrigger / SVG / complex sequence
→ custom GSAP/JS
```

Do not force Webflow-native interactions when they make an advanced animation difficult to understand or maintain.

Do not force GSAP for a simple hover/fade.

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

Do not publish merely to see whether unfinished code works if a preview/staging path exists.

---

# 15. Benchmarking Webflow

When comparing Webflow with Figma/Astro, measure:

- Speed from design to production
- Visual fidelity
- Responsive control
- CMS/editability
- Motion/custom-code freedom
- AI autonomy
- Maintainability by non-developers
- Performance
- Integration capability
- Production readiness

Evaluate the published result, not only the Designer canvas.

---

# Final Rule

> **Use Webflow's visual speed without inheriting Webflow's visual sameness.**
