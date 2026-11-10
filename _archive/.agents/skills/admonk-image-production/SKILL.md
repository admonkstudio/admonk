---
name: admonk-image-production
description: Plan, generate, edit, validate, prepare, and integrate image assets for Admonk and client web experiences. Use when AI-generated raster imagery, photo edits, product/mockup visuals, transparent cutouts, image variants, responsive crops, or image asset production is required. This skill owns production workflow; admonk-image-direction owns art direction.
---

# Admonk Image Production

This skill turns an approved visual idea into usable project assets.

Use it together with:

- `admonk-image-direction` for art direction.
- `admonk-web-design` for page composition.
- `admonk-design-quality` for final visual quality.
- `admonk-browser-qa` for rendered validation.

Core rule:

> **Art direction decides what the image should be. Image production makes it usable, consistent, and project-ready.**

---

# 1. Decide Whether Generation Is Appropriate

Use image generation/editing when the task benefits from a raster visual such as:

- Photography
- Editorial/cinematic imagery
- Product or device mockups
- Environment scenes
- Surreal but photoreal compositions
- Textures
- Transparent object/person cutouts
- Background replacement
- Compositing
- Image variants

Prefer repo-native SVG, HTML/CSS, canvas, or editable design assets when the requirement is:

- A simple diagram
- A UI icon
- A logo that must remain vector-precise
- Existing editable SVG artwork
- A deterministic geometric graphic
- A code-native visual effect

Do not use AI imagery simply because generation is available.

---

# 2. Load the Visual Brief

Before generation, establish:

1. **Objective** — what job does the asset perform?
2. **Placement** — hero, card, portfolio, background, transition, etc.
3. **Subject** — what must be present?
4. **Composition** — crop, perspective, safe areas, focal point.
5. **Art direction** — lighting, camera, materials, mood, realism.
6. **Brand relationship** — palette, environment, identity cues.
7. **Responsive requirement** — desktop/mobile crops or separate assets.
8. **Motion requirement** — static, layered, parallax, reveal, animated sequence.
9. **Accuracy requirement** — real interface/logo/product/text that must not be hallucinated.
10. **Avoid list** — visual clichés or changes that are unacceptable.

If the request is already precise, do not add unrelated creative details.

---

# 3. Generation vs Edit

## Generate

Use when creating a new asset from text/reference images.

Reference images may guide:

- Mood
- Composition
- Camera
- Lighting
- Material
- Subject identity
- Brand character

Do not assume a reference image is an edit target unless the user clearly wants it modified.

## Edit

Use when an existing image must remain substantially intact while selected elements change.

For edits, explicitly preserve invariants.

Example:

```text
Change only the background.
Preserve the person, facial features, pose, proportions, clothing, crop, and lighting direction.
```

Repeat invariants during later edits if drift appears.

---

# 4. Production Prompt Structure

Use only the fields that improve the result.

```text
OBJECTIVE:
ASSET TYPE / PLACEMENT:
PRIMARY SUBJECT:
SCENE / ENVIRONMENT:
COMPOSITION / SAFE AREA:
CAMERA / PERSPECTIVE:
LIGHTING:
MATERIALS / TEXTURE:
COLOR / BRAND TREATMENT:
MOOD:
REALISM REQUIREMENTS:
MOTION/LAYER REQUIREMENTS:
PRESERVE (for edits):
AVOID:
```

For website assets, include practical composition notes such as:

- leave negative space for copy
- keep face outside mobile crop danger zone
- keep hero focal point within center-safe region
- allow foreground/background separation for parallax

---

# 5. Interface, Logo, and Text Accuracy

Do not ask generative imagery to reproduce important interface text, real product UI, or exact logos when an accurate source exists.

Preferred workflow:

```text
Generate environment / device / person / lighting
        ↓
Use real project UI/logo/type as a separate source
        ↓
Composite or place accurately
```

If exact in-image text is essential, verify it visually rather than assuming generation is correct.

---

# 6. Variant Strategy

Do not generate random alternatives without a reason.

Variants should test meaningful differences such as:

- Camera angle
- Subject scale
- Lighting direction
- Negative-space placement
- Material/environment treatment
- Emotional tone
- Brand accent intensity

Name the intent of each variant before generation.

Prefer 2–4 purposeful directions over a large pile of nearly identical images.

---

# 7. Evaluation Loop

After generation, review against the brief.

Check:

## Purpose

- Does it communicate the intended idea?
- Does it belong in this section/page?

## Composition

- Does the crop work?
- Is the focal point correct?
- Is text-safe space usable?
- Does it work at actual website dimensions?

## Realism

- Anatomy
- Hands
- Faces
- Perspective
- Reflections
- Materials
- Shadows
- Product geometry
- Interface/device integration

## Brand

- Does it support the client's identity?
- Is the accent treatment controlled?
- Does it feel specific rather than generic?

## Quality

- Does it look intentional at full size?
- Does it survive responsive cropping?
- Are there obvious AI artifacts?

Iterate by fixing one or two specific problems rather than regenerating blindly.

---

# 8. Responsive Asset Production

Do not assume one crop works everywhere.

For important hero/editorial imagery, consider:

- Wide desktop asset
- Tablet crop
- Portrait/mobile asset
- Alternate focal placement

If one source image can safely support responsive `object-position` or art direction, prefer that.

Create separate mobile imagery when preserving the concept requires a different composition.

---

# 9. Motion-Aware Assets

When an image will move, plan the file accordingly.

Possible requirements:

- Transparent background
- Separable foreground/background
- Extended bleed beyond viewport
- Extra crop area for parallax
- Clean edges for masks
- Subject isolated from background
- Multiple state/sequence frames

Coordinate with `admonk-motion-production` before final export when the asset is central to an animation.

---

# 10. Project Integration

A generated image is not finished until it is usable in the project.

For project-bound assets:

1. Select the approved output.
2. Save/copy it into the project asset structure.
3. Use a descriptive filename.
4. Do not overwrite an existing approved asset unless replacement is intentional.
5. Optimize format/size according to the target platform.
6. Update the consuming Figma/Webflow/code implementation.
7. Verify the final rendered result.

Discarded experiments should not become production dependencies.

---

# 11. Platform Notes

## Figma

Use generated imagery as editable design assets and test crop/composition across frames before production.

## Webflow

Prepare practical web formats and responsive crops. Keep file weight appropriate and verify actual rendering in published/staging output.

## Astro / Code

Use the framework's image pipeline where appropriate. Preserve intrinsic dimensions, responsive sizing, lazy/eager loading decisions, and accessible alt behavior.

---

# 12. Source Guidance

This production workflow is informed in part by OpenAI's official Codex image-generation guidance, especially its distinction between raster generation/editing and code/vector-native assets, use of reference images, invariant-preserving edits, project-bound asset handling, and targeted iteration.

Admonk's own image direction remains authoritative for aesthetic decisions.

---

# Final Standard

Do not optimize for:

> More generated images.

Optimize for:

> **The smallest set of art-directed assets that makes the web experience meaningfully stronger.**
