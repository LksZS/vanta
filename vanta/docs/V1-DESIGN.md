# VANTA — design and motion specification

## Design Read (Frontend Atlas)
1. Purpose: an experimental technology studio; turn curiosity into a considered project inquiry.
2. Direction: Swiss computational editorial, titled “The inevitable next.”
3. Palette: carbon #111110, warm paper #EAE9E3, signal orange #FF5A24, muted #A6A59E, rule #363632.
4. Typography: locally hosted Geist variable sans, tight display tracking, system monospace technical labels; no external runtime assets.
5. Signature: a wire-filament toroidal sculpture becomes the visual grammar of signal, system, and interface.

## Architecture and compatibility
Empty workspace: establish Vite / React / TypeScript; Tailwind 4 Vite plugin. GSAP owns entrance/scroll timelines, Motion owns layout and React state, CSS owns hover. Single Lenis instance on GSAP ticker; no wheel interception beyond Lenis, no CSS smooth-scroll. gsap.matchMedia reverts responsive animations. SplitText 3.15 is available from installed public GSAP package; use aria:auto and responsive splitting. No WebGL or Flip: lightweight SVG and Motion layout already express the concept. Single-page anchor navigation needs no route transition framework; animated native dialog supplies the menu transition and focus containment.

## Grid and type
12-column conceptual desktop grid; 64px max / 4.45vw fluid outer gutter; mobile 22px. 8px spacing rhythm, 1px dividers. Display 64–148px, section headings 44–96px, body 16–20px, labels 10–12px. Corners square except circular controls and meaningful chips. Hero sculpture occupies right half, headline left; intersection is controlled, never text collision.

## Emotional sequence / hierarchy
01 Arrival: label → giant claim → sculpture → concise explanation and scroll cue.
02 Depth: editorial statement → three-layer signal composition → principle text.
03 Discovery: section headline → three horizontal illustrated chapters → progress ruler.
04 Clarity: huge negative/positive statements → interactive alternate word → small annotation.
05 Substance: three asymmetric product compositions, intelligence mode control, automation run, interface density control.
06 Transformation: paper composition dissolves to carbon; expanding orange rings resolve into a computational core.
07 Participation: signal laboratory; pointer field, density slider, waveform activation, layout mode.
08 Conviction: quiet oversized manifesto, one underline/line movement; little other motion.
09 Invitation: giant closing type → project inquiry form → fitted wordmark and navigation.

## Animation storyboard
All scroll animations use ease:none and scrub:true; one clock smooths wheel scrolling. useGSAP scopes + matchMedia/context revert own every timeline; event listeners and Lenis ticker are explicitly removed.

| Sequence / purpose | Trigger / range | Start → end | Timing / relation | Mobile / reduced motion |
|---|---|---|---|---|
| Hero / establish hierarchy | mount | masked lines y:105% → 0; sculpture scale .9 → 1 | .9s expo.out, .075 stagger; metadata follows at .3 | shorter travel / static |
| Depth / expose signal layers | top bottom → bottom top | background y:-60 → 60, sculpture 90 → -90, title 20 → -20; scale .92 → 1.04 | coordinated scroll timeline | ratios reduced / static |
| Story / three chapters | desktop top top → measured track width minus viewport | track x:0 → -travel; bar 0 → 100%; inner graphics gently rotate | transform pin, functional end measurement, invalidateOnRefresh | vertical chapters; no pin / same |
| Type / complexity to clarity | top 75% → bottom 45% | words opacity .6 → 1; first statement y:-10%, alternate rises; tracking tightens | SplitText line mask, word stagger, reversible scrub | smaller headings / readable static copy |
| Products / explain systems | user mode / run / density | selected indicator shared layout; connected nodes consolidate; dashboard layout reflows | Motion .35s and CSS .2s; not GSAP-owned | identical touch controls / immediate layout |
| Transformation / arrival at core | top 65% → bottom 60% | paper → carbon; contrast-safe text polarity → paper; core scale .6 → 1; side line opacity increases | one timeline, no full-viewport blur or mask | compact scene / dark final state |
| Playground / agency | pointer, range, button | spotlight position, SVG amplitude, grid/orbit arrangement | event-driven, no infinite loop; Motion layout .45s | no pointer; controls remain / static transitions |
| Manifesto / pause | top bottom → bottom center | vertical rule scaleY 0 → 1; text y:12 → 0 | restrained scrub, copy always readable | same smaller travel / static |
| Close / invitation | top 90% | SplitText masked lines → visible | .8s expo.out, .06 stagger | static reduced-motion; validated form |

## Resources actually consulted
Repository: flash-hero/GOATED-UI-SKILL, skills/frontend-atlas/SKILL.md.
References: scroll-gsap recipes 1,2,4,8,11,19,20; motion-principles easing/tokens and choreography; interactions custom cursor and magnetic recipe 2; backgrounds-svg-canvas stroke drawing recipe 14; page-transitions fullscreen menu recipe 23; performance-a11y reduced-motion, property costs, audit script. Official GSAP ScrollTrigger and SplitText docs, Motion React layout docs.

## Risks and mitigations
Horizontal pins: desktop only, transform pin avoids fixed-pin CLS; measurements refreshed after fonts and on resize. SVG complexity: bounded line counts, no perpetual rendering. Pointer effects: local only, fine pointer, no replacement cursor. Color tween repaints: one deliberate section and finite scroll range. Keyboard: native dialog, Escape, visible focus, no interactive controls in hidden story panels. Reduced motion: no Lenis, no pin, no parallax; all content remains. No fictional backend success: inquiry generates a downloadable project brief ; clearly identified demo company.
