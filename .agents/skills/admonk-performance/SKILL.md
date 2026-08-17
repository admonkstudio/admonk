---
name: admonk-performance
description: Use for production web performance, PageSpeed Insights, Core Web Vitals, Lighthouse-style audits, loading speed, interaction responsiveness, layout stability, image/font/script optimization, runtime cost, network/bundle analysis, or performance regressions.
---

# Admonk Web Performance

Performance is part of the experience, not a score-chasing exercise.

Core rule:

> **Performance is designed in from the beginning and verified throughout the build. It is not a final cleanup task.**

---

# 1. Current Baseline

Verify current Core Web Vitals guidance from Google/web.dev before using thresholds because metrics and tooling evolve.

At the time this skill was updated, the stable Core Web Vitals are:

- **LCP** — good at `≤ 2.5s`
- **INP** — good at `≤ 200ms`
- **CLS** — good at `≤ 0.1`

Google evaluates Core Web Vitals using the 75th percentile of page loads, segmented across mobile and desktop.

Treat current official documentation as authoritative if these values change.

---

# 2. PageSpeed Insights Is Part of the Workflow

For production websites, PageSpeed Insights should be considered during the project rather than only after launch.

Recommended checkpoints:

```text
Architecture / early build
→ identify obvious performance risks

Major visual + motion implementation
→ check expensive assets, scripts and rendering

Responsive implementation
→ test mobile performance as a first-class case

Pre-handoff / pre-launch
→ run PageSpeed Insights on mobile + desktop

Post-launch
→ review field/Core Web Vitals data when enough real-user data exists
```

PSI provides both lab diagnostics and, where sufficient data exists, real-user/CrUX data.

Do not treat a single Lighthouse/PSI score as the whole user experience.

Use the score to diagnose. Use Core Web Vitals and real user impact to decide.

---

# 3. Project Performance Targets

Every substantial web project should record its performance expectations in the project/platform context.

At minimum document:

- Core Web Vitals target
- PageSpeed/Lighthouse expectations if the client has a required score
- Mobile performance expectations
- image/media constraints
- font strategy
- third-party script constraints
- known unavoidable performance costs

Default Admonk expectation when no stricter contractual target exists:

> **Aim to pass current Core Web Vitals on mobile and desktop, avoid preventable regressions, and deliver the strongest PageSpeed result compatible with the intended experience.**

Do not fabricate a performance score before the real site can be measured.

---

# 4. Priority Order

1. Real user-impacting bottlenecks.
2. Critical rendering/loading path.
3. Interaction responsiveness and long main-thread work.
4. Layout stability.
5. Images/video/fonts.
6. JavaScript and third-party scripts.
7. Framework/runtime-specific optimizations.
8. Micro-optimizations only after larger costs are addressed.

---

# 5. Design-Time Performance Decisions

Performance decisions begin before development.

During design/art direction consider:

- number and dimensions of hero assets
- whether video is actually needed
- whether large 3D/WebGL is justified
- font family/weight count
- image aspect ratios and responsive crops
- whether an interaction requires continuous animation
- whether effects depend on expensive blur/filter/rendering
- whether third-party embeds are necessary
- how below-the-fold content will load

A visual idea should not accidentally commit the project to unnecessary runtime cost.

Preserve strong creative concepts, but choose the most efficient implementation that retains the intended experience.

---

# 6. Implementation Review

Check when relevant:

- server/TTFB and caching
- render-blocking CSS/scripts
- LCP resource discovery and priority
- responsive image sizing/format/compression
- image intrinsic dimensions / aspect-ratio reservation
- lazy loading below the fold
- font files, subsets, preload strategy and `font-display`
- JS shipped vs JS actually needed
- hydration/island boundaries
- third-party analytics/chat/ad scripts
- long tasks and expensive event handlers
- animation properties and GPU/render cost
- unexpected layout shifts
- DOM complexity
- 3D/canvas render resolution and frame rate
- mobile/low-power devices

---

# 7. Images and Media

Coordinate with `admonk-image-production`.

For important media:

- generate/crop at an appropriate source resolution
- use responsive variants where the platform supports them
- avoid serving desktop-scale assets to small mobile layouts unnecessarily
- preserve dimensions/aspect ratio to reduce layout shift
- use modern formats where practical
- avoid autoplay media unless it creates enough experience value to justify its cost
- lazy-load media that does not need to participate in the initial viewport

Do not destroy image quality merely to improve a synthetic score. Balance perceptual quality and transfer/render cost.

---

# 8. Motion Performance

Coordinate with `admonk-motion` and `admonk-motion-production`.

Check:

- whether the animation runs only when visible/needed
- whether loops pause offscreen
- whether transforms/opacity can replace layout-heavy animation
- whether ScrollTrigger/listeners are cleaned up correctly
- whether continuous pointer/scroll handlers are unnecessarily expensive
- whether heavy visual effects degrade mobile devices
- reduced-motion behavior

Motion that feels smooth on a powerful desktop but stutters on normal mobile hardware is not finished.

---

# 9. Measurement

Use both:

- lab diagnostics during development
- field/real-user data when available

For a new or staging URL, field data may not exist yet. Do not interpret missing CrUX data as good or bad performance.

A Lighthouse run is evidence, not the entire performance story. Field metrics capture real devices, networks, and interactions that lab tools cannot fully reproduce.

When measuring INP-related risk before sufficient field data exists, use interaction testing and lab diagnostics such as long tasks/TBT as supporting evidence rather than pretending lab tools reproduce real INP exactly.

---

# 10. Responsive Performance

Performance must be reviewed by viewport/device context, not only at desktop width.

Mobile is especially important because:

- network/CPU constraints may be lower
- responsive imagery may change
- navigation and interaction behavior may change
- layout shifts may appear only after reflow
- animations may need different behavior
- third-party UI may occupy proportionally more of the screen

Do not assume a desktop pass means the responsive experience passes.

---

# 11. Regression Rule

When adding or materially changing:

- motion
- imagery/video
- 3D
- analytics
- chat/widgets
- third-party systems
- fonts
- major components

measure or otherwise verify the performance effect before and after when practical.

If performance regresses materially:

1. identify the actual cause
2. preserve the intended experience where possible
3. reduce waste
4. retest
5. document an intentional tradeoff if one remains

---

# 12. Handoff / Launch Gate

Before a production website is considered technically ready:

- run real-browser responsive QA
- run PageSpeed Insights for mobile and desktop when the environment is publicly testable
- review current Core Web Vitals signals/diagnostics
- inspect major image/font/script costs
- inspect console/network failures
- verify no avoidable layout shift was introduced
- record known performance exceptions/tradeoffs

Performance findings should be actionable, not just a screenshot of a score.

---

# Creative Work

Do not remove an intentional visual experience for a tiny synthetic score gain without evaluating business and perceptual value. Search for a cheaper implementation of the same idea first.

---

# Admonk Principle

> **Preserve the idea. Remove the waste.**
