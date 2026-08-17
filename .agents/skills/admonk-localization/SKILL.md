---
name: admonk-localization
description: Use for multilingual websites, Arabic/RTL, locale routing, hreflang, translated content, localized CMS, locale-aware UI, direction switching, typography across scripts, or internationalized forms/date/number behavior.
---

# Admonk Localization & RTL

Localization is a design and content-system concern, not a final text-replacement step.

## Plan Early

Define:

- supported locales
- URL/routing strategy
- source-of-truth content workflow
- CMS localization model
- translation ownership/approval
- fallback behavior
- locale-specific SEO
- RTL requirements
- fonts/script coverage

## RTL

For Arabic and other RTL interfaces:

- use semantic document direction (`dir`) rather than manually reversing everything
- prefer logical CSS properties where practical
- inspect icons/arrows/progress/navigation semantics individually; not every visual should mirror
- preserve numbers, codes, email addresses and mixed-direction content correctly
- review text alignment and optical composition rather than mechanically flipping the desktop layout
- test forms, dropdowns, carousels, sliders, menus and motion directions
- choose fonts with strong native-script quality, not merely glyph coverage

## Content

Translation should preserve meaning, terminology, hierarchy and brand voice. Do not translate names, technical terms or CTAs mechanically when approved terminology exists.

## SEO

Use locale-aware metadata, canonical strategy, language/region annotations such as hreflang where applicable, and valid localized URLs/sitemaps. Verify current search-engine guidance before launch.

## QA

Test every supported locale for:

- overflow and wrapping
- missing translations
- incorrect direction
- layout shifts
- truncation
- dates/numbers/currency
- form validation
- navigation
- metadata
- mobile behavior

## Admonk Principle

> Translate the experience, not only the words.
