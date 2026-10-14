# VANTA® — Make the next inevitable.

A complete nine-section experimental technology website. Original computational art, editorial typography, and carefully scoped scroll choreography. No external runtime image URLs, font CDNs, or paid assets.

## Run

Node.js 20.19+ (tested with 20.20.2).

```sh
npm ci
npm run dev -- --port 5173
```

Production:

```sh
npm run build
npm run preview -- --port 4173
```

Deploy `dist/` to any static web host. All public assets use root-relative URLs; configure Vite's base and asset paths if deploying under a subdirectory. The preview server accepts the Arena preview host and binds to `0.0.0.0`.

## What is inside

1. **Cinematic introduction** — masked typography entrance, original filament sculpture, restrained scroll rotation.
2. **Experimental depth** — three independently scrubbed layers: background grid, rings, headline.
3. **Pinned horizontal story** — three distinct chapters, measured travel, synchronized progress ruler; vertical mobile/touch alternative.
4. **Typography laboratory** — accessible SplitText word reveal, tracking and lateral movement, interactive statement.
5. **Intelligent interfaces** — switchable intelligence modes, runnable/resettable workflow, changeable workspace layout.
6. **Visual transformation** — continuous paper-to-carbon background, expanding computational core, contrast-safe text polarity change.
7. **Signal laboratory** — pointer-following field, intensity control, shared-layout grid/orbit transition, interactive SVG waveform.
8. **Editorial manifesto** — large, restrained statement with one subtle scroll-linked rule and text movement.
9. **Conversion and footer** — masked closing headline, validated local project-brief form, actual file download, working anchor navigation.

## Project structure

```text
src/
  App.tsx                       Page composition and progress indicator
  main.tsx                      React entry, StrictMode, stylesheet
  lib/motion.ts                 GSAP plugins and shared motion tokens
  hooks/useSmoothScroll.ts      One Lenis instance on the GSAP ticker
  components/
    Header.tsx                  Native dialog + Motion menu entrance
    Hero.tsx                    Intro timeline and scroll treatment
    Filament.tsx                Cached original SVG image surface
    Approach.tsx                Three-layer parallax
    Story.tsx                   Measured horizontal pin
    Typography.tsx              SplitText and interactive copy
    Offerings.tsx               Three different product demos
    Transformation.tsx          Coordinated theme/core timeline
    Playground.tsx              Reactive signal laboratory
    Manifesto.tsx               Quiet scroll composition
    Contact.tsx                 Validation and local download
    Shared.tsx                  Labels, arrow, magnetic wrapper
  styles.css                    Tailwind 4, design tokens and art-directed CSS
public/
  filament.svg                  Generated original vector artwork
  fonts/                        Locally hosted Geist + OFL license
scripts/
  generate-filament.mjs          Reproducible parametric art generator
  vendor/                       GOATED motion/contact-sheet audits + MIT license
qa/                             Executable browser checks and raw result JSON
 docs/                          Design, storyboard, delivery report
```

## Architecture

**GSAP** owns coordinated entrances, SplitText, parallax, pinning, scroll progress, and the theme transformation. `useGSAP` scopes selectors and reverts animations. `gsap.matchMedia` owns motion and breakpoint alternatives. The horizontal section measures `track.scrollWidth - section.clientWidth`, invalidates on refresh, and uses a transform pin. No arbitrary wheel trapping or snap.

**Lenis** is driven by GSAP's ticker; its scroll event updates ScrollTrigger. There is no second application RAF loop. Touch scrolling remains native; reduced-motion mode removes Lenis.

**Motion for React** owns the selected mode indicator, workspace layout, grid/orbit layout, waveform interaction, and dialog entrance. It never shares ownership of a transform with GSAP. CSS handles ordinary hover/focus/press feedback.

The original SVG sculpture is rendered as a cached image surface instead of thousands of live vector coordinates in the DOM. This was a measured performance refinement: desktop p95 scroll frame time improved from 33.3 ms to 16.8 ms in the GOATED audit.

## Skills and resources actually used

The initially empty environment had no preinstalled skills. The requested repository was fetched and consulted locally:

- [flash-hero/GOATED-UI-SKILL](https://github.com/flash-hero/GOATED-UI-SKILL), Frontend Atlas `SKILL.md`.
- Commit: `8c51536e2525797f0e5a0743bf68cf03b3bfaf61`.
- Scroll/GSAP recipes: ticker synchronization, useGSAP lifecycle, SplitText, horizontal galleries, parallax, matchMedia and refresh discipline.
- Motion principles: shared easing, choreography, duration and stagger budgets.
- Interactions: magnetic controls and fine-pointer gating.
- Page transitions: menu/focus lifecycle, adapted to a native dialog and Motion.
- SVG backgrounds: normalized stroke/path drawing.
- Performance/accessibility: reduced-motion alternatives, property cost, actual motion audit and contact-sheet scripts.
- Official [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), and [Motion layout](https://motion.dev/docs/react-layout-animations) documentation.

No companion skill is claimed as installed or used. SplitText comes from the available public GSAP 3.15 package; no unavailable API was substituted. Flip and WebGL were intentionally omitted because Motion layout and 2D SVG fulfill those roles with less complexity.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
npm audit
npx playwright install --with-deps chromium
# With the development server on port 5173:
npm run qa:responsive
npm run qa:interactions
npm run qa:touch
# With the production preview on port 4173:
npm run qa:motion
```

Measured Lighthouse 12.8.2 production results: **93 performance / 100 accessibility / 96 best practices / 100 SEO** on mobile; **100 in all four categories** on desktop. These are local lab results, not a guarantee for deployed environments.

See [the delivery and validation report](docs/DELIVERY.md) for measured metrics, actual refinement changes, limitations, and reproduction details. The [design specification](docs/DESIGN.md) includes the animation storyboard.

## Inquiry behavior

VANTA is fictional. Form validation creates a text project brief and allows a real download. **Nothing is transmitted, stored remotely, or presented as sent.** Connecting a real CRM/email endpoint requires a backend and an appropriate privacy policy.
