---
name: admonk-performance
description: Use for production web performance, Core Web Vitals, Lighthouse-style audits, loading speed, interaction responsiveness, layout stability, image/font/script optimization, runtime cost, network/bundle analysis, or performance regressions.
---

# Admonk Web Performance

Performance is part of the experience, not a score-chasing exercise.

## Current Baseline

Verify current Core Web Vitals guidance from web.dev/Chrome before using thresholds. At the time this skill was authored the stable Core Web Vitals are LCP, INP, and CLS; treat their current official definitions and thresholds as the source of truth.

## Priority Order

1. Real user-impacting bottlenecks.
2. Critical rendering/loading path.
3. Interaction responsiveness and long main-thread work.
4. Layout stability.
5. Images/video/fonts.
6. JavaScript and third-party scripts.
7. Framework/runtime-specific optimizations.
8. Micro-optimizations only after larger costs are addressed.

## Review

Check when relevant:

- server/TTFB and caching
- render-blocking CSS/scripts
- LCP resource discovery and priority
- responsive image sizing/format/compression
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

## Creative Work

Do not remove an intentional visual experience for a tiny synthetic score gain without evaluating business and perceptual value. Instead, search for a cheaper implementation of the same idea first.

## Measurement

Use both:

- lab diagnostics during development
- field/real-user data when available

A Lighthouse run is evidence, not the entire performance story. Field metrics capture real devices, networks, and interactions that lab tools cannot fully reproduce.

## Regression Rule

When adding motion, imagery, analytics, 3D, widgets, or third-party systems, measure before and after when the change is substantial.

## Admonk Principle

> Preserve the idea. Remove the waste.
