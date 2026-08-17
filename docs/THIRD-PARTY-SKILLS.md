# Third-Party Skills

This repository includes selected external AI skills and adapted guidance that supplement Admonk's own business, design, image, motion, and implementation rules.

Admonk's internal instructions remain authoritative according to the priority defined in `AGENTS.md`.

## GSAP Skills

Source project: `greensock/gsap-skills`

Maintainer: GreenSock

Imported/adapted skills:

- `gsap-core`
- `gsap-timeline`
- `gsap-scrolltrigger`
- `gsap-performance`
- `gsap-plugins`
- `gsap-react`

Some files are copied directly and some are condensed/adapted for Admonk's workflow while preserving the technical guidance and attribution.

### GSAP License

MIT License

Copyright (c) 2026 GreenSock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Taste Skill

Source project: `Leonxlnx/taste-skill`

Maintainer: Leonxlnx

Admonk does **not** import the main Taste Skill unchanged. Its strongest quality-control ideas are adapted into:

- `admonk-design-quality`

### Integration Decision

#### Keep

Ideas retained because they strengthen Admonk's workflow without defining the aesthetic:

- Read the brief and audience before choosing a visual direction.
- Actively challenge generic AI/frontend defaults.
- Audit existing projects before redesigning them.
- Preserve strong existing brand and functionality instead of rewriting automatically.
- Explicit responsive/mobile review for major compositions.
- Dependency verification before importing libraries.
- Production-state checks for interactive components.
- Real/project-specific visual assets instead of meaningless fake screenshots.
- Copy self-audit and removal of generic marketing filler.
- No fabricated proof, metrics, testimonials, or results.
- Pre-flight quality review before delivery.
- Complete requested implementation instead of placeholder code.

#### Modify

Useful ideas retained but changed to fit Admonk:

- Taste's anti-card and anti-layout-pattern guidance becomes a repetition/context check rather than a ban.
- Its imagery guidance becomes "use imagery when it strengthens the concept," not a mandatory image count.
- Its motion guidance becomes purpose-led and follows Admonk's more restrained motion philosophy.
- Its redesign rules become brand-preserving diagnosis rather than automatic font/color/style replacement.
- Its visual-cliche rules become questions requiring justification rather than universal prohibitions.

#### Skip

The following are intentionally not imported as governing rules:

- Fixed design/motion/density dial presets.
- Mandatory React/Next.js/Tailwind/Motion stack.
- Mandatory image generation for every marketing page.
- Universal requirement for multiple real images even when the concept does not need them.
- Fixed font preferences and blanket serif discouragement.
- Absolute light/dark page-theme restrictions.
- Absolute em-dash ban.
- Absolute bans on section numbers, scroll cues, decorative lines, or other legitimate art-direction techniques.
- Forced replacement of common UI patterns simply to appear different.
- Any rule that prioritizes avoiding a trend over serving the client's objective and brand.

#### Reference Only

Taste remains useful as a vocabulary/reference source for:

- Alternative layout patterns.
- Interaction-pattern names.
- Redesign audit ideas.
- Common LLM-generated visual clichés.
- Frontend completion checks.

These references may inspire exploration but do not override Admonk's design language.

### Taste Skill License

MIT License

Copyright (c) 2026 Leonxlnx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## UI UX Pro Max

Source project: `nextlevelbuilder/ui-ux-pro-max-skill`

Maintainer: Next Level Builder

Admonk does **not** import the full searchable UI UX Pro Max catalog or its design-system generator unchanged. The parts that strengthen usability and interface-system quality are adapted into:

- `admonk-ux-systems`

### Integration Decision

#### Keep

Ideas retained because they provide strong UX foundations:

- Accessibility before cosmetic polish.
- Keyboard navigation and visible focus treatment.
- WCAG-aware contrast and non-color-only communication.
- Meaningful alt text and accessible names for controls.
- Reduced-motion support.
- Touch/pointer target and interaction feedback checks.
- Hover-independent critical interactions.
- Explicit loading, error, success, disabled, and empty states where relevant.
- Form labels, inline errors, helper text, and recovery behavior.
- Responsive behavior as an explicit design responsibility.
- Layout-stability and Core Web Vitals awareness.
- Semantic color and system tokens where repeated UI benefits from them.
- Consistent icon language and state behavior.
- Stack detection before framework-specific implementation advice.
- Dependency verification before adding packages.
- Navigation clarity, back behavior, and task completion.
- Accessible chart and data-presentation checks.
- Pre-delivery UX/accessibility review.

#### Modify

Useful ideas retained but adapted to Admonk's philosophy:

- UI UX Pro Max's design-system generation becomes a UX/system reference layer, not the source of creative direction.
- Product palettes and font recommendations are treated as research inputs rather than automatic choices.
- Spacing systems provide technical rhythm but do not override optical composition.
- Touch-target recommendations are interpreted by platform and context rather than applying one measurement universally.
- Motion recommendations defer to Admonk's `MOTION-LANGUAGE.md` and `admonk-motion` skill.
- Component-library guidance preserves reliable behavior while allowing complete visual art direction.
- Responsive rules protect usability without requiring a fixed universal breakpoint set.
- System consistency is balanced with Admonk's preference for distinctive, non-repetitive composition.

#### Skip

The following are intentionally not imported as governing rules:

- The full product/style/color/font recommendation catalog as a default creative engine.
- Automatic generation of a project's visual identity from industry keywords.
- Design variance, motion, and density dials as authoritative creative decisions.
- Fixed palette recommendations based solely on product category.
- Fixed typography pairings based solely on database matching.
- Automatic GSAP presets that bypass Admonk's motion reasoning.
- Any recommendation that turns a client website into a preconfigured design-system aesthetic.
- Large upstream font/icon datasets that add repository weight without being necessary for normal Admonk work.

#### Reference Only

The upstream project remains useful as a research source for:

- UX guideline lookup.
- Accessibility edge cases.
- Platform-specific interface conventions.
- Chart-selection references.
- Icon semantics.
- Technology-stack UI implementation patterns.
- Product/industry pattern exploration when a project needs broader research.

These sources may inform a decision but must be evaluated against the client's actual brand, objectives, users, and Admonk's creative direction.

### UI UX Pro Max License

MIT License

Copyright (c) 2024 Next Level Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Vercel React Best Practices

Source project: `vercel-labs/agent-skills`

Source skill: `react-best-practices`

Maintainer: Vercel Engineering

Admonk does **not** import the full compiled Vercel React guide unchanged. Its highest-value performance and architecture principles are adapted into:

- `admonk-react-engineering`

The upstream skill is specifically designed for React and Next.js performance work and organizes its guidance around eight prioritized categories: eliminating waterfalls, bundle optimization, server-side performance, client data fetching, re-render optimization, rendering performance, JavaScript performance, and advanced patterns.

### Integration Decision

#### Keep

Ideas retained because they improve real implementation quality:

- Treat request/data waterfalls as the highest-priority performance problem.
- Run independent asynchronous work concurrently where safe.
- Start asynchronous work early and await it only when needed.
- Use Suspense/streaming where progressive rendering meaningfully improves the experience.
- Treat bundle size and unnecessary client JavaScript as critical constraints.
- Use direct imports and dynamic loading where they reduce real initial cost.
- Defer non-critical third-party scripts.
- Keep React Server Component/client boundaries intentional.
- Minimize server-to-client serialization.
- Authenticate and authorize sensitive server actions.
- Use caching according to request scope, data sensitivity, and invalidation semantics.
- Avoid mutable request-specific state at server module scope.
- Prevent duplicated client fetching/listeners where possible.
- Derive values during render instead of synchronizing unnecessary state through effects.
- Keep interaction logic in event paths rather than effect chains when appropriate.
- Use functional state updates for previous-state-dependent updates.
- Avoid defining stable component types inside other component renders.
- Use transitions/deferred rendering for genuinely non-urgent expensive UI updates.
- Use refs for transient high-frequency values that should not re-render the UI.
- Review browser rendering cost, not only React render counts.
- Apply JavaScript micro-optimizations only after high-impact architecture problems are handled.

#### Modify

Useful upstream ideas are adapted as follows:

- React and Next.js guidance applies **only when the actual project uses that stack**; it is not Admonk's default technology recommendation.
- SWR and other named libraries are treated as options, not mandatory dependencies.
- Framework caching guidance must be reconciled with the project's exact Next.js/version/runtime behavior before implementation.
- Performance optimizations must preserve Admonk's intended visual design, motion, responsiveness, accessibility, and conversion flow.
- Animation-specific React guidance defers to Admonk's motion rules and GSAP skills when GSAP is involved.
- Memoization is treated as a targeted optimization, not a blanket coding style.
- Concurrency is balanced against rate limits, backend capacity, and data dependencies.
- The smallest meaningful architectural fix is preferred over broad rewrites.

#### Skip

The following are intentionally not adopted as universal Admonk rules:

- Using React or Next.js by default for every Admonk website.
- Migrating Webflow/static/other-framework projects to React simply to gain access to React optimization techniques.
- Installing SWR, cache libraries, or helper packages without verifying project need.
- Applying every low-impact JavaScript optimization mechanically.
- Introducing complex React abstractions before measuring or identifying a real bottleneck.
- Treating Vercel deployment architecture as mandatory when a project uses another hosting environment.
- Any optimization that damages the project's creative experience for negligible technical gain.

#### Reference Only

The upstream skill remains useful as a detailed technical reference for:

- Individual performance rule examples.
- Incorrect/correct React code comparisons.
- Next.js server performance patterns.
- Bundle and import analysis.
- Re-render diagnosis.
- Advanced React scheduling/event patterns.
- Performance review checklists.

### Vercel React Best Practices License

The upstream `react-best-practices/SKILL.md` declares:

- `license: MIT`
- author: Vercel
- version: `1.0.0`

Its metadata identifies the organization as Vercel Engineering and dates the guide January 2026.

This Admonk integration is an adapted summary rather than a verbatim copy of the upstream compiled guide.
