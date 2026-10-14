# VANTA — delivery and validation report

## Delivered

A runnable React/TypeScript website with all nine requested sections, original vector art, local fonts, Tailwind 4, GSAP 3.15 / ScrollTrigger / SplitText, Lenis, and Motion for React. Source, dependency lockfile, design specification, animation storyboard, reproducible art generator, and browser QA scripts are included.

## Actual checks

| Check | Result |
|---|---|
| TypeScript (`npm run typecheck`) | Passed |
| ESLint (`npm run lint`) | Passed |
| Production compilation (`npm run build`) | Passed; one nonblocking Tailwind CSS sourcemap warning |
| Dependency audit after removing one-off Lighthouse tooling | 0 vulnerabilities, including development dependencies |
| 1440 × 900 | Nine sections; no horizontal overflow; no browser exceptions; axe WCAG A/AA checks passed |
| 1280 × 800 | Same |
| 768 × 1024 | Same; story is vertical |
| 390 × 844 | Same; story is vertical |
| 360 × 800 | Same; story is vertical |
| Reduced motion at all five sizes | No axe violations; essential content preserved |
| Interaction regression | 19 assertions passed; raw results in `qa/interaction-results.json` |
| Touch input emulation | Menu, intelligence, layout, and signal controls passed |
| Landscape coarse pointer, 1024 × 768 | No story pin |
| Invalid inquiry | Native validation prevents brief creation |
| Valid inquiry | Download created; contents and filename checked |
| Transformation contrast | No axe color-contrast violations at progress 0, .25, .5, .535, .545, .65, 1 |
| Keyboard menu | Focus contained, Escape closes, trigger focus restored |
| Breakpoint round trip | No duplicated ScrollTriggers; nine initially and nine after return |
| Story math | At 1440: start 1840, end 3384, measured travel 1544 px; positions verified at 0%, 50%, 100%; natural unpin checked |
| Visual review | Hero screenshots, full-page static desktop/mobile screenshots, all-section responsive captures, and GOATED audit contact sheets inspected |

### Final measured Lighthouse results

Lighthouse **12.8.2**, Chromium, production build served locally on port 4173. Default mobile simulated throttling and desktop preset. These are single-run lab results; preceding mobile runs scored 91–92 before the final 93.

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | **93** | **100** |
| Accessibility | **100** | **100** |
| Best practices | **96** | **100** |
| SEO | **100** | **100** |
| First contentful paint | 2.0 s | 0.5 s |
| Largest contentful paint | 2.4 s | 0.6 s |
| Total blocking time | 200 ms | 10 ms |
| CLS | 0 | 0 |

Raw reports: `qa/lighthouse-mobile-final.json`, `qa/lighthouse-desktop-final.json`.

Lighthouse was installed temporarily, executed, and then removed from the project's dependency tree because its transitive auditing dependencies contained advisories. It is not bundled or required to run the website. Reproduce with an isolated installation of `lighthouse@12.8.2` (or a newer audited version), set `CHROME_PATH` to your Chrome executable, and run against the production preview. Scores vary by hardware and tool version.

### GOATED motion audit

The actual upstream `motion-audit.mjs` and `contact-sheet.mjs` were run, not just referenced. Last optimized rendering checkpoint:

| Mode | Width | p95 frame time | Long animation frames | CLS | Overflow | Invisible content | Errors |
|---|---:|---:|---:|---:|---:|---:|---:|
| Motion | 1440 | 16.8 ms | 0 | .003 | 0 px | 0 | 0 |
| Motion | 390 | 16.8 ms | 0 | .001 | 0 px | 0 | 0 |
| Reduced | 1440 | 16.7 ms | 0 | 0 | 0 px | 0 | 0 |
| Reduced | 390 | 16.7 ms | 0 | 0 | 0 px | 0 | 0 |

Report: `qa/motion-optimized/report.json`. This audit reported **“No problems detected.”** A subsequent contrast-only timeline adjustment was separately checked at seven scroll positions; final Lighthouse was run after that adjustment. Headless frame pacing is a lab diagnostic, not proof of smoothness on every device.

## Refinement pass 1 — correctness and accessibility

Real changes after initial browser tests:

- Fixed insufficient contrast in the crossed-out typographic statement.
- Removed a low-opacity endpoint that made meaningful type unreadable.
- Replaced an ARIA-labeled paragraph with a semantic heading before SplitText processing.
- Increased initial word contrast while retaining scroll-linked word emphasis.
- Corrected accessible names that did not contain their visible button text.
- Enlarged touch targets for mode controls, interface layout, and text actions.
- Added an explicit coarse-pointer story fallback, including large touch viewports.
- Added a proper robots file; verified native form validation and actual download behavior.
- Verified modal focus, Escape, anchor dismissal, resize teardown, and plugin counts.

Initial accessibility results were not clean (Lighthouse 90 and an axe contrast violation). Final automated checks are clean; those issues were fixed rather than hidden from the report.

## Refinement pass 2 — art direction and rendering

Real changes after screenshot and motion review:

- Reduced/repositioned the desktop sculpture so it no longer competes with the supporting paragraph.
- Repositioned mobile art annotations inside the viewport.
- Reduced mobile manifesto type slightly to preserve the intended editorial line breaks.
- Kept the large type, calm negative space, and thin technical rules; did not add unnecessary effects to fill space.
- Preloaded a single local Latin variable font, avoiding duplicate subset delivery and reducing font-related CLS.
- Split GSAP and Motion into separate browser-cacheable build chunks.
- Limited Tailwind's source scan to `src/`, excluding screenshot/audit report content.
- Reduced vector curve sampling without changing the silhouette.
- Converted the inline filament path tree into an original cached SVG image surface; removed unnecessary decorative shadows and 3D flattening work. Desktop p95 improved from 33.3 ms to 16.8 ms; long animation frames dropped to zero in the final motion audit.
- Added contrast-safe foreground polarity switching to the light-to-dark section. Interpolating opposite text/background colors would produce unreadable gray-on-gray; the background now remains continuous while text switches at the luminance boundary.
- Formatted source and configuration files for maintainability.

## Most technically challenging interactions

### 1. The horizontal story

The travel distance must derive from the rendered track, not a guessed number of viewport widths. ScrollTrigger's end is recalculated on refresh; the track and ruler share one linear timeline. A transform pin keeps the geometry stable. Fonts trigger a guarded refresh after loading. Touch/reduced-motion modes use the same semantic articles in normal flow. Resize reversal was checked for duplicate triggers and stale pin spacers.

### 2. A readable visual transformation

Background, scale, rotation, line opacity, and captions share one scrubbed timeline. The text does **not** crossfade through the same middle-gray as the background. It changes polarity at the threshold where black/white contrast can be preserved, then settles back into warm paper as carbon arrives. This was tested at seven intermediate positions, including both sides of the switch.

### 3. Shared-layout controls without animation ownership conflicts

Motion handles the intelligence selector, workspace layout, particle grid/orbit state, and waveform. GSAP handles only separate scroll containers or pointer-following layers. Pointer motion uses `quickTo`, reads a stable local interaction surface, never replaces the native pointer, and is disabled on coarse pointers and reduced-motion systems.

## Remaining limitations / unverified behavior

- Chromium was tested with desktop and mobile/touch emulation. Physical iOS/Android hardware, Safari, and Firefox were not tested.
- A manual assistive-technology session with VoiceOver/NVDA was not performed. Automated axe/Lighthouse and keyboard checks are not full accessibility certification.
- Mobile best-practices score is 96 because the deliberately small technical annotations trigger Lighthouse's small-font diagnostic. Main headings, copy, forms, and controls remain independently readable; browser zoom is not disabled.
- Lighthouse still identifies unused JavaScript and animation/layout measurement work. The animation libraries are the main JS budget; further reduction could dynamically load below-the-fold interaction code. Doing so would require reserved geometry and careful ScrollTrigger refresh sequencing.
- Tailwind's Vite plugin does not supply a CSS sourcemap for its transformation, producing one nonblocking sourcemap warning. JavaScript sourcemaps are emitted; the actual production build succeeds.
- No backend, real company inbox, analytics, or external service is connected. The inquiry is deliberately local and never claims a successful transmission.
- This is a client-rendered single-page experience. It requires JavaScript; production deployment and real-network field monitoring are not configured.
- Public paths assume deployment at a domain root. Subdirectory hosting needs path/base configuration.
- No claim of an Awwwards award or certification is made; this is an original design-engineering implementation.
