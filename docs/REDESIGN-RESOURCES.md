# VANTA 02 — reference and image provenance

## References inspected

- https://motionsites.ai/sections — catalog, animated Liquid Glass preview, gallery/sticky-card examples. Full internal component source not obtained.
- https://21st.dev/community/components — component discovery and published previews.
- https://21st.dev/@arunachalam/components/scroll-expansion-hero — usage contract and image/video expansion patterns.
- https://21st.dev/@manuarora700/components/container-scroll-animation — usage, dependencies, MIT metadata.
- https://ui.aceternity.com/registry/container-scroll-animation.json — complete public source inspected: useScroll/useTransform rotate/scale/translate, resize listener cleanup. Not copied into the application.
- https://21st.dev/@prashantsom75/components/scroll-morph-hero — preview, usage, dependency information; internal implementation not retrieved.
- https://21st.dev/@componentry/components/scroll-choreography and https://componentry.dev/docs/components/scroll-choreography — four-object-to-fullscreen pattern, props and installation requirements; no direct code import.
- https://21st.dev/@kedhareswer/components/morph-gallery — published WebGL/noise approach, image-item API, keyboard/touch expectations. Our design deliberately uses GSAP Flip instead of a WebGL carousel.
- https://21st.dev/@designali-in/components/liquid-glass-button — material preview, usage, dependency information. Our controls are original, using existing React/CSS rather than adding Radix/CVA.
- Existing GOATED UI SKILL / Frontend Atlas: SKILL.md; color-surfaces liquid-glass tiers; scroll-gsap expansion and Flip hero-to-grid; component-recipes container scroll/parallax; motion and performance guidance. Original skill commit remains recorded in README/V1 documentation.

Screenshots of selected reference previews were actually downloaded and inspected. No reference images or component code from those previews are used in the finished site. The application is original, not a verbatim clone or assembly of downloaded registry components.

## Artwork

- `public/images/threshold.webp` and `threshold-small.webp`: original AI-generated campaign image for this redesign; titanium lens, alpine setting. Master PNG kept in `artwork/`.
- `public/images/prism.webp`: original AI-generated optical-glass material study; master kept in `artwork/`.
- Supporting editorial images were downloaded from Unsplash and converted to local WebP. No browser runtime dependency on an external image host.
  - Architecture: https://images.unsplash.com/photo-1487958449943-2429e8be8625
  - Ocean: https://images.unsplash.com/photo-1518837695005-2083093ee35b
  - Desert: https://images.unsplash.com/photo-1509316785289-025f5b846b35
  - Alpine: https://images.unsplash.com/photo-1470770841072-f978cf4d019e
- Unsplash license: https://unsplash.com/license . These are editorial visual explorations, not client work or endorsements. No exclusivity is asserted.
- Original V1 filament artwork and generator remain available; reused in the preserved product graphics as appropriate.
- Geist font remains local, with OFL license included.

## Material compatibility

The glass system uses a stable tinted optical base, beveled highlight/shadow rims, pointer-responsive specular light, and selective backdrop filtering. A static, generated edge-displacement map enhances the navigation on Chromium during hover/focus. This is a CSS/SVG approximation of optical material, not Apple's proprietary renderer and not physically accurate ray tracing. Unsupported/reduced-transparency environments get a solid, readable surface. Blur work is suspended off screen, and the large moving workspace uses a stable layered surface rather than continuous backdrop sampling.
