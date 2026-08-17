# Platform Benchmark Log

This file records observed evidence before final scoring. Scores in `SCORECARD.md` should only be filled after each environment has been rendered and tested.

## Figma — Pass 1

Status: first editable design direction created.

Evidence:

- Dedicated file created for the AERA benchmark.
- Desktop and mobile frames were generated as editable Figma layers rather than flattened screenshots.
- The brief translated well into a restrained architectural composition with dark hero, controlled amber light language, editorial off-white sections, non-card collection treatment, process storytelling, project showcase, and final CTA.
- Figma was fast for composition and direct visual iteration.
- Separate mobile art direction was easy to create deliberately rather than relying only on a responsive runtime.
- The environment can expose design context, component metadata, Code Connect information, screenshots, motion context, and timeline/video export for later tests.
- This first pass used Figma-native shapes/gradients rather than AI-generated raster imagery so image-generation quality can be tested as its own controlled stage.

Current unknowns:

- Runtime responsive behavior cannot be judged from the static design alone.
- Production semantics, SEO, runtime performance, and browser accessibility require implementation elsewhere.
- Motion-context quality still needs a dedicated Figma animation pass.

## Webflow — Pass 1

Status: isolated draft page created and AERA structure/styling/micro-motion inserted; not published.

Evidence:

- The benchmark is isolated on a draft page and does not modify the live Admonk homepage.
- Webflow MCP successfully created the page and inserted the full semantic content structure.
- Page-scoped custom head/footer code was used for the benchmark styling and minimal IntersectionObserver motion.
- The WHTML builder exposed a concrete AI-workflow limitation: its CSS input accepts a restricted selector grammar. An initial attempt failed on angle-bracket combinators and another failed on a bare `html` selector.
- Splitting structure from page-scoped CSS was an effective workaround and preserved the design without changing site-wide styles.
- The Webflow connector provides direct access to pages, branches, elements, WHTML, components, CMS, assets, scripts, localization, sitemap controls, analytics, comments, breakpoints, and site-native agent instructions.
- No benchmark page publish has occurred.

Current unknowns:

- The Webflow element-snapshot call failed with an empty/undefined response, so rendered visual verification still needs a Designer/browser preview step.
- Advanced Webflow-native Interactions are not part of this first pass; the current motion is custom page code.
- Production/client editing advantages should be evaluated after a rendered preview and a small content-editing exercise.

## Astro — Pass 1

Status: self-contained Astro benchmark implementation committed.

Evidence:

- The same AERA content and visual logic are implemented in `labs/platform-benchmark/astro/`.
- The first pass uses one `.astro` page, semantic HTML, CSS, and a small IntersectionObserver script.
- No JavaScript framework or motion dependency was added merely to reproduce the concept.
- Reduced-motion behavior is included.
- The implementation is intentionally dependency-light so later GSAP, CMS, image, or API additions can be measured rather than assumed.
- Astro is pinned to the current npm `latest` tag at install time for this temporary benchmark instead of freezing an unverified stale version.

Current unknowns:

- The Astro build has not yet been executed in a local/CI runtime from this repository.
- Browser screenshots, console/network checks, Lighthouse/Core Web Vitals, and mobile runtime behavior still need Playwright/browser validation.
- Client editing/CMS behavior is intentionally absent in pass 1 and should be tested as a second-stage integration rather than assumed.

---

# Next Controlled Passes

1. Render and visually QA the Webflow draft.
2. Install/build the Astro benchmark and run browser QA.
3. Add one equivalent image-production task to all three environments.
4. Add one equivalent motion-design task to all three environments.
5. Test client/editor correction loops in Figma and Webflow, and code correction in Astro.
6. Fill `SCORECARD.md` only after comparable evidence exists.

Do not declare a platform winner from pass 1.
