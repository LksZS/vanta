# VANTA® 02 — Beyond the interface.

A cinematic, interactive redesign of the existing VANTA experience. Original campaign artwork, three reversible continuity stories, a six-image layout-morphing gallery, and a selective Liquid Glass system. Existing product demos, signal lab, and local brief download are preserved.

## Run

Node.js **20.19+** (tested: 20.20.2).

```sh
npm ci
npm run dev -- --port 5173
```

Production:

```sh
npm run build
npm run preview -- --port 4173
```

Deploy the generated `dist/` to a static host. Public assets use root-relative URLs; a subdirectory deployment requires adjusting Vite's base and asset paths. Both preview servers bind to `0.0.0.0` and accept the Arena preview hostname. No runtime image/font CDN or external service is required. Original artwork masters in `artwork/` are not shipped to the browser.

## The experience

1. **Beyond the interface** — giant editorial typography over an original lens landscape. The actual image element expands, changes its mask and lands in the next section, while typography and page color move together.
2. **Selected explorations** — six meaningful visual studies. Selecting a tile changes its size, position, neighboring layout and the image used in the following scroll story. GSAP Flip, interruptible, keyboard/touch accessible; no carousel.
3. **Look closer** — the selected image expands from a framed composition to the viewport. Four satellite images leave at different rates; the next statement resolves over the same visual.
4. **VANTA OS → human instinct** — one interactive workspace is introduced, isolated, expanded, detailed, then relocated into a light editorial resolution. Secondary glass objects and scenery form a coordinated movement sequence.
5. **Useful preserved functionality** — intelligence modes, runnable/resettable workflow, workspace layouts, signal controls, shared-layout playground, native dialog menu and validated TXT brief download.

The reusable glass system includes optical edges, layered shadows/reflections, pointer light, selected backdrop sampling, floating navigation, action controls, a chapter dock and contextual overlays. The Chromium navigation refraction is a CSS/SVG approximation, not Apple's proprietary material renderer.

## Project map

```text
src/App.tsx                         New composition + retained functional sections
src/experience/
  CinematicJourney.tsx              Hero and philosophy composition
  GalleryExperience.tsx             Six-image Flip selection and reset
  GalleryBridge.tsx                 Expansion / satellite / typography scene
  ProductJourney.tsx                Six-phase workspace story + controls
  Glass.tsx                         Optical material and pointer light
  LiquidNavigation.tsx              Native dialog, chapter dock and progress
  data.ts                           Editorial image data
  experience.css                    New layout, material and responsive system
src/hooks/useCinematicJourney.ts    Same-element measured hero timeline
src/hooks/useSmoothScroll.ts        Single Lenis instance on GSAP's ticker
src/components/                    Preserved demos, lab and contact
public/images/                     Local WebP artwork, responsive thumbnails
artwork/                           Original generated PNG masters
qa/redesign-*.mjs                   Current browser validation scripts
qa/redesign/                        Redesign reports and rendered evidence
scripts/vendor/                    GOATED audit tools + MIT license
```

Unused V1 components remain as source history; they are not imported into the new page. Earlier README/design/delivery notes are archived as `docs/V1-*` and are **not** validation evidence for this redesign.

## Motion ownership and accessibility

- GSAP owns complex scroll transforms, masks, backgrounds, SplitText and gallery Flip.
- Motion owns component state transitions and inner workspace layouts; it does not animate the outer GSAP scene transforms.
- CSS owns hover surfaces and optical rims. A normal cursor is retained.
- Scroll scenes reserve space with CSS-sticky pin tracks; GSAP scrubs reversible timelines over those tracks. No wheel hijacking, delayed navigation or auto-advancing galleries.
- `useGSAP`, `matchMedia`, observers/listeners and Lenis have teardown. No React state updates per scroll frame.
- Native touch scrolling, fine-pointer-only magnetic effects, complete reduced-motion static stories, semantic text and native dialog focus management.
- Off-screen glass blur is suspended. Large moving workspace blur is replaced by a stable layered material; fixed optical controls engage refraction on hover/focus.

## Verify

Install Playwright's browser once:

```sh
npx playwright install chromium
```

With the **development** server running on 5173 (these tests inspect the GSAP module):

```sh
npm run qa:interactions
npm run qa:responsive
npm run qa:inspect
```

With a fresh build and **production preview** on 4173:

```sh
npm run qa:motion
```

Also: `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit`.
The supplied GOATED motion auditor reports problems in its output/report; do not treat a zero process exit code as proof of a performance pass.

### Actual results, October 13, 2026

- TypeScript, ESLint, production build: pass. Dependency audit: 0 vulnerabilities.
- **18 interaction assertions pass**, including three reverse-scroll sequences, exact hero landing, rapid Flip interruption, touch, menu focus restoration, preserved demos, brief download and breakpoint cleanup.
- **1440×900, 1280×800, 768×1024, 390×844, 360×800:** 0 reported axe violations in normal and reduced-motion runs; no runtime exceptions or horizontal overflow. Also checked intermediate timeline overflow. Separate label/content-name test: 0 violations.
- Production Lighthouse 12.8.2: **desktop 100 / 100 / 100 / 100**, **mobile 85 / 100 / 96 / 100** (performance / accessibility / best practices / SEO). Mobile LCP 3.5s, TBT 220ms in the throttled lab run. Lighthouse scores are lab results, not field guarantees.
- Production GOATED scroll audit: **mobile p95 16.8ms**, 0 long animation frames; reduced desktop/mobile p95 16.8ms, 0 long frames. **Normal desktop p95 49.9ms, 17 long animation frames: the smooth-frame target is NOT met.** No stuck-invisible content, runtime errors or overflow; CLS .005 desktop / .002 mobile.

Desktop loading scores do **not** establish smooth scrolling. The desktop scroll-performance limitation is intentionally left visible in the handoff. See `docs/DELIVERY.md` for implemented refinement passes and qualifications.

## Scope and provenance

Contact creates a validated local text brief; it does not email, store leads or call an API. Dashboard values and product interactions are illustrative, not live telemetry. No backend is implied.

See `docs/REDESIGN-RESOURCES.md` for actual reference access, image sources and material compatibility. Only the Aceternity container-scroll registry implementation was fully read; other references were studied through public previews, usage/API and dependency information. Two images were generated for this project; four supporting editorial images are locally hosted Unsplash derivatives. Font/license and vendored audit licenses are included.
