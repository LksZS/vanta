# VANTA 02 — delivery and measured limitations

Date: October 13, 2026. Main source: `/home/user/vanta`. Download: `/home/user/VANTA-website.zip`.

## Delivered

A working React/TypeScript/Tailwind 4 redesign using existing GSAP, Lenis and Motion dependencies. Original cinematic lens hero; three reversible continuity sequences; six-image Flip gallery with state propagated into a scroll expansion scene; coordinated floating-object/product story; reusable optical glass controls; complete mobile and reduced-motion compositions. Existing product demos, signal lab and local brief download remain functional.

Implementation plan and reference research preceded the new code. The actual two refinement passes are documented in `DESIGN.md`. `REDESIGN-RESOURCES.md` distinguishes full source access from public usage/preview inspection.

## Final correctness checks

| Check | Result |
|---|---|
| TypeScript / ESLint / production build | Pass |
| npm audit | 0 vulnerabilities |
| Interaction suite | 18 passing assertions |
| 1440×900, 1280×800, 768×1024, 390×844, 360×800 | No runtime exceptions or horizontal overflow |
| axe normal and reduced motion at all five sizes | 0 reported violations |
| Label/content-name rule, production build | 0 violations |
| Three timelines at .25/.5/.8/1 | No measured horizontal overflow |
| Native-touch emulation | Menu, gallery and dock pass |
| Breakpoint round trip | ScrollTrigger count stable; no duplicate accumulation |

The functional suites use the development server so they can inspect the GSAP module and timeline ranges. Production rendering/loading/scroll behavior is additionally tested through Lighthouse and the GOATED auditor. Browser tests use Chromium/Playwright; this is not a claim of exhaustive real-device Safari/Firefox or assistive-technology certification. Axe passing is not a complete accessibility certification.

## Production loading audit

Lighthouse 12.8.2, headless Chromium, local production server; mobile uses Lighthouse's throttling.

| Metric | Desktop | Mobile |
|---|---:|---:|
| Performance | 100 | 85 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 96 |
| SEO | 100 | 100 |
| Largest contentful paint | 0.7s | 3.5s |
| Total blocking time | 30ms | 220ms |
| CLS | 0 | 0 |

Adding responsive hero preloads and thumbnails improved the measured mobile score from 77 to 85 (earlier LCP 4.3s, final 3.5s). Scores can vary between runs. Mobile still has small editorial metadata noted by Lighthouse's legible-font diagnostic and the bundle has optimization opportunities; no perfect-mobile claim is made.

## Production scroll performance — unresolved desktop limitation

GOATED audit at 1440×900 / 390×844, 14 scroll steps, normal and reduced motion. This instrumented lab audit records during scroll/settling and screenshot capture; it is not field telemetry.

| Run | Normal desktop p95 / long frames | Normal mobile p95 / long frames |
|---|---|---|
| Refinement 1 | 33.4ms / 13 | 16.8ms / 0 |
| Refinement 2 | 49.9ms / 15 | 16.7ms / 0 |
| Final production audit | **49.9ms / 17** | **16.8ms / 0** |

Final reduced-motion desktop/mobile: p95 16.8ms, 0 long frames. Final normal-motion CLS .005 desktop / .002 mobile. All final runs: no stuck-invisible content, runtime errors or horizontal overflow.

**The desktop <=17–20ms frame target is not met.** A separate wheel-driven section sample (without screenshots) measured about 33.4ms p95 in the hero, 33.3ms in the initial gallery, and 16.7–16.8ms in the portal/product/offerings ranges. Disabling backdrop sampling in a diagnostic run improved that sample, but cache/order differences prevent attributing all of the improvement to blur. Off-screen blur suspension, fixed-control sampling changes and workspace material simplification did not produce a pass in the final whole-scroll audit. No universal 60fps claim is made; real-device GPU/browser profiling remains the next performance step.

## Evidence

- `qa/redesign/interactions.json`
- `qa/redesign/validation-final.json`
- `qa/redesign/label-content-final.json`
- `qa/redesign/lighthouse-{desktop,mobile}-final.json`
- `qa/redesign/motion-final/report.json` and `motion-final-log.txt`
- `qa/redesign/{1440,390}-review-final.jpg`: actual rendered scene review sheets
- Earlier audit reports are retained for comparison. Intermediate raw screenshots were pruned; final raw captures remain in the workspace. The ZIP includes source, reproducible QA scripts, reports and the two final review sheets, not every scratch capture.

## Important scope boundaries

- Inquiry produces a validated local TXT download. It does not email or store a lead. Backend integration is not implemented.
- Workspace numbers, AI states and workflow events are interactive demonstrations, not live data or a production intelligence service.
- Two original images are AI-generated; four editorial images are local Unsplash derivatives, not a commissioned client portfolio. Provenance is documented.
- Glass refraction is an original CSS/SVG approximation with fallback, not Apple's renderer. No expensive full-page shader is required.
- Build emits a non-blocking Tailwind/Vite source-map warning; production compilation succeeds.
- Public references were studied honestly: full Aceternity container-scroll source; mostly previews, usage/API and dependency information for the other requested components. No claim of having obtained their private/internal source.
- V1 validation notes are archived and do not substantiate this redesign.

## Reproduce

See README for server commands. Run current `qa:interactions`, `qa:responsive` and `qa:inspect` against the dev server; build and run `qa:motion` against the production preview. Treat motion auditor warnings as failures of the target even when its process exits with code zero.
