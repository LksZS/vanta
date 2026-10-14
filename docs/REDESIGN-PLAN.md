# VANTA 02 — Beyond the interface

## Design Read
1. Reimagine the existing experience, preserving React/Vite/TS/Tailwind/GSAP/Lenis/Motion and working inquiry/product/lab functionality.
2. Visual direction: cinematic alpine optics, warm editorial breathing spaces, technical interface details—not a glass card landing page.
3. Palette: abyss #101719, graphite #1C2528, ivory #F0F0E9, mineral #CCE2BA, steel #A6B7BF. Orange retained only in archival V1 assets.
4. Typography: existing local Geist variable, 80–132px display, light weight, close tracking; restrained italic Georgia for contrast; legible 10–12px technical annotations.
5. Continuity: a landscape image travels from hero to philosophy; a selected gallery image expands into the next scene; a workspace resolves into a manifesto layout.

## Reference research actually performed
- Re-read installed Frontend Atlas SKILL.md, scroll-gsap recipes 6 (expansion), 16 (hero-to-grid Flip), color-surfaces 16 (tiered liquid glass), component-recipes 46/47/48 (container scroll/parallax), plus existing motion/a11y recipes.
- MotionSites sections: full catalog fetched; Liquid Glass Features, Liquid Glass CTA, Projects Catalog, Glassmorphic Feature Tabs, Nimbus Sticky Cards identified. Actual Liquid Glass preview inspected. Full implementation source not exposed in fetched page.
- 21st: fetched Scroll media expansion hero, Container Scroll Animation, Scroll Morph Hero, Morph Gallery, Scroll Choreography, Liquid Glass Button. Usage examples and dependencies inspected. Registry source for Aceternity Container Scroll Animation fetched and read. Preview imagery inspected for choreography and glass button. Full internal sources for the other 21st components were not obtained; no claim of direct reuse.
- Observed patterns: scroll-based scale/rotate/translate instead of wheel traps; multi-image stages resolving into one; a selected-image focal state; material reserved for controls. Implement original versions with existing dependencies rather than importing unknown registries.

## Architecture / ownership
New experience components compose with preserved Offerings, Playground, Contact. Old V1 components remain available in source but are not mounted. Existing configuration preserved. GSAP owns scroll and Flip gallery geometry. Motion owns nav/overlays/dock expansion. CSS owns nested image hover and material sheen. No element gets transform updates from both engines.

One Lenis instance and one GSAP ticker. useGSAP scopes and matchMedia revert all timelines. Fixed-height sticky scene tracks reserve layout space without runtime pin spacers. Hero's actual DOM image travels between two normal-flow sections, with function-based measurements and invalidateOnRefresh. Gallery Flip captures bounds before React selection state, then animates new layout. Filmstrip/selected state supports mouse, keyboard and touch. No auto-advancing carousel.

## Choreography storyboard
A. Hero → philosophy: root spans two sections. Same image surface starts as a near-fullscreen framed landscape. First scroll expands clip, moves hero typography upward, moves independent glass labels. Next phase scales/translates the actual image into the philosophy slot, while the canvas becomes ivory and the next words reveal. Scrubbed, reversible; desktop extended range, mobile simpler scale/translation; reduced motion shows separate static media.
B. Gallery → immersive vision: selected cover is accompanied by four surrounding photographs. CSS-sticky stage and a single scrubbed timeline expand its mask to fullscreen, send satellites away at separate rates, hide the gallery headline behind media, and resolve new scene typography over the same cover. Mobile retains a shorter expansion. Reduced motion shows both statements in ordinary flow.
C. Product → manifesto: a glass workspace starts tilted with independent notes and signal satellites. It grows/levels, details assemble, then moves into a smaller off-center resolved composition while a new typographic statement enters and the background turns ivory. Same workspace persists throughout; reduced motion displays one static workspace and both statements.

Other interactions: pointer-responsive beveled glass; magnetic CTA; animated accessible navigation dialog; expandable dock with contextual section links; gallery selection and reset; hover/focus project metadata; workspace mode control; preserved signal controls and validated brief download.

## Performance and accessibility constraints
Generate hero artwork once, use optimized local WebP and responsive source. Five supporting images downloaded locally; attribution source URLs recorded. Lazy-load noncritical images, explicit dimensions, no autoplay/video/WebGL runtime. No fullscreen backdrop blur. Only a small glass navigation surface gets optional SVG optical displacement, with static opaque fallback. Native dialog focus/Escape, visible focus, reduced motion and transparency, coarse-pointer alternatives. Test five requested viewports plus intermediate scroll points, backward scroll, resizing, rapid selection, form and keyboard.

## Refinement gates
Pass 1: functional geometry, image decode, Flip interruption, pin/sticky overflow, mobile navigation, contrast, cleanup.
Pass 2: image crops, typography, glass opacity/rims, timeline handoffs, negative space and runtime frame pacing.
