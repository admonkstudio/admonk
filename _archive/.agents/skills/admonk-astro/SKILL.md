---
name: admonk-astro
description: Build, review, optimize, and QA Admonk or client websites using Astro. Use for Astro pages, layouts, components, content collections, islands/hydration, framework components, view transitions, image handling, static/SSR decisions, GSAP/custom JavaScript integration, and comparing Astro with Webflow or Figma. This is a project-development skill, not guidance for contributing to Astro's own monorepo.
---

# Admonk Astro

Astro is a code-native website implementation option.

Use it when the project benefits from lightweight output, strong content/site architecture, precise engineering control, or custom behavior that should not be constrained by a visual builder.

Core rule:

> **Keep static content static. Add client-side complexity only where the experience earns it.**

---

# 1. Choose Astro for a Reason

Astro may be a strong fit when the project needs:

- Content-heavy marketing/editorial pages
- Strong performance control
- Static generation
- Headless CMS integration
- Fine-grained JavaScript hydration
- Custom HTML/CSS/JS
- Framework islands only where needed
- Advanced custom motion/visual behavior

Do not choose Astro merely because it is technically elegant if the client needs a highly visual non-developer editing workflow that another platform serves better.

---

# 2. Inspect the Project First

Before implementing:

- Read `astro.config.*`.
- Inspect `package.json`.
- Identify integrations/frameworks.
- Inspect existing layouts/components/content collections.
- Identify styling conventions.
- Check build/deploy target.
- Check whether routing is static, server-rendered, hybrid, or uses client-side navigation features.

Do not introduce React/Svelte/Vue islands if native Astro/HTML can solve the requirement cleanly.

---

# 3. Component Strategy

Prefer `.astro` components for largely static server-rendered markup.

Use UI framework components when their runtime capabilities are actually useful.

Examples:

- Stateful interactive tools
- Complex client-side component ecosystems
- Existing React/Svelte/Vue libraries
- Motion/layout behavior better owned by that framework

Do not hydrate a component by default just because it is written in a framework.

---

# 4. Hydration / Islands

Astro framework components render without client JavaScript unless a client directive is used.

Choose hydration intentionally.

Typical reasoning:

```text
Immediately interactive above-fold UI
→ client:load

Lower-priority interactive UI
→ client:idle

Heavy/below-fold interaction
→ client:visible

Breakpoint-specific UI
→ client:media

Truly client-only component
→ client:only
```

Use the current Astro documentation before relying on version-sensitive directive behavior.

The target is not "zero JavaScript." The target is **only the JavaScript the experience needs**.

---

# 5. Design Implementation

Use Admonk design skills before framework conventions.

Astro should support:

- Art-directed composition
- Semantic HTML
- Strong typography
- Responsive imagery
- CSS Grid/Flex/custom layout
- Purposeful animation
- Accessible interaction

Do not let a component/template ecosystem flatten the design into a generic developer portfolio aesthetic.

---

# 6. Styling

Preserve the project's established styling strategy when it works.

Possible strategies include:

- Scoped Astro styles
- Global CSS
- CSS modules/framework-specific styles
- Tailwind or another utility system
- Design tokens/custom properties

Do not install a styling framework merely because an example skill prefers it.

For Admonk work, custom properties/tokens are useful where repeated design values need system behavior, but optical composition may still require deliberate one-off art direction.

---

# 7. Content

Astro is strong for structured content workflows.

Use content collections or an external/headless CMS when structured reusable content benefits from validation and clear modeling.

Do not over-model one-off page content.

When a client needs non-technical editing, the CMS/editor experience must be considered alongside developer experience.

---

# 8. Images

Coordinate with `admonk-image-production`.

For production assets:

- Preserve dimensions/aspect ratio intent.
- Use responsive sizing.
- Choose loading priority intentionally.
- Avoid serving unnecessarily huge files.
- Keep alt behavior correct.
- Use Astro's current image tooling where it materially improves optimization and delivery.

Do not sacrifice art direction for automated optimization; use different source crops when the concept requires them.

---

# 9. Motion

Coordinate with `admonk-motion-production`.

Default routing:

```text
Simple interaction
→ CSS

Complex DOM/SVG/scroll choreography
→ GSAP

React component presence/layout/gesture
→ Motion, if React island already justified

Page-to-page continuity
→ evaluate browser/Astro view transitions
```

Do not add a framework island solely to gain an animation library if plain JS/GSAP/CSS is cleaner.

---

# 10. View Transitions and Client Routing

Astro supports browser-native view transitions and enhanced client-side routing options.

Use them selectively for meaningful navigation continuity.

Important production concern:

When client-side navigation swaps page DOM, scripts/animations may require lifecycle-aware initialization and cleanup.

If using Astro client routing/view-transition behavior:

- Test forward/back navigation.
- Test script reinitialization.
- Clean up GSAP/listeners where necessary.
- Verify persistent elements/state.
- Respect reduced motion.
- Confirm focus/navigation accessibility.

Do not assume code that works on first page load will automatically work after every client-side navigation.

---

# 11. GSAP Integration

When GSAP is used:

- Scope selectors to the relevant component/page.
- Avoid duplicate initialization after navigation.
- Kill timelines/ScrollTriggers/listeners when DOM is replaced.
- Refresh ScrollTrigger after layout/assets stabilize when necessary.
- Keep animation ownership clear.

Use Admonk GSAP skills for implementation details.

---

# 12. Performance

Astro's architecture can reduce unnecessary client JavaScript, but performance still depends on implementation.

Review:

- Hydrated island count
- Third-party scripts
- Large images/video
- Font loading
- Expensive client animation
- Layout shifts
- Network waterfalls
- CMS/data fetching
- Bundle sizes of framework islands

Measure actual rendered performance rather than assuming framework choice guarantees it.

---

# 13. Accessibility

Use semantic markup as the baseline.

Verify:

- Keyboard navigation
- Focus states
- Form behavior
- Heading structure
- Alt text
- Reduced motion
- Route/page transition announcements where relevant
- Color contrast
- Touch targets

Use `admonk-ux-systems` and `admonk-browser-qa` for review.

---

# 14. Testing

Before delivery:

```text
build/lint/typecheck where configured
→ run local/preview site
→ browser QA
→ desktop responsive check
→ mobile/device check
→ motion/navigation check
→ console/network check
→ production build verification
```

Use Playwright CLI where available for repeatable browser verification.

---

# 15. Benchmarking Astro

When comparing Astro with Figma/Webflow, measure:

- Creative implementation freedom
- Code/DOM quality
- Performance
- Motion freedom
- Responsive fidelity
- CMS/editor experience
- AI autonomy
- Development speed
- Maintainability
- Deployment complexity
- Production readiness

Do not compare raw build time alone. Compare the complete path from brief to verified client-ready result.

---

# 16. Official Astro Agent Skills

Astro's own repository includes agent skills for contributing to Astro itself (for example `astro-developer` and `astro-code-review`). Those skills are valuable references for Astro internals but are not automatically appropriate for building normal client Astro websites.

Use official Astro documentation as the source of truth for current framework behavior.

---

# Final Rule

> **Use Astro's freedom to remove unnecessary runtime complexity, not to add unnecessary developer complexity.**
