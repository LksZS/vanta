# VANTA 02 — implemented design

## Direction

**Beyond the interface.** Titanium optical artwork against a glacial landscape introduces the relationship between human instinct and intelligent systems. Graphite `#101719`, ivory `#f0f0e9` and mineral `#cce2ba`; oversized Geist paired with editorial Georgia italics. Light editorial sections give the dark cinematic scenes room to breathe. Glass is a control material, not a page-wide card treatment.

## Continuity storyboard

| Track | Persistent object | Choreography | Resolution |
|---|---|---|---|
| `hero-continuity` | Same `.world-traveler` DOM image | Opening mask expands; hero type and floating UI depart at different rates; measured translation/scale and image-height adaptation accompany the background change | Image lands in the philosophy's measured slot |
| `gallery-continuity` | Current selected study | Small framed image, four overlapping satellite images, central typography; selected image expands while neighbors rotate/translate out | New statement over the same full-screen image |
| `product-continuity` | Same `.workspace` | Introduce, isolate, expand/flatten, reveal detail, change scenery/palette, relocate | Workspace and manifesto share an ivory composition |

The last two tracks use CSS-sticky viewport stages within reserved scroll ranges and GSAP `scrub:true`, not duplicated mounted sections. Hero geometry is measured on refresh; animation functions are not re-measured every scroll frame. All three timelines reverse on upward scrolling. Mobile gets different geometry, masks and final workspace position; reduced motion exposes the complete content without pinned choreography.

## Selection choreography

Six tiles begin in a varied editorial grid. `Flip.getState` captures the previous layout before React changes the selected item; scoped Flip animation moves to the new CSS layout. The active tile becomes a large study and the neighbors reorganize. Selection is propagated into the expansion scene. Reset restores the original layout; rapid repeated selections settle on the latest input. This is layout morphing, not an image crossfade.

## Material system

`Glass` provides optical rim/shadow layers and a pointer-responsive specular light. A generated edge-displacement map adds small-area navigation refraction on compatible Chromium engines, only on hover/focus. Fixed surfaces retain a stable optical base while the page moves. An IntersectionObserver suspends off-screen blur sampling. Unsupported-filter/reduced-transparency treatments preserve readability. The big animated workspace uses a stable material rather than continuously sampling a large backdrop.

The glass family appears in navigation, hero floaters, action controls, chapter dock, supporting product objects and contextual UI. Most editorial content uses solid contrast and open space rather than glass cards.

## Interaction and motion ownership

GSAP owns outer scroll transforms; Motion owns inner component state; CSS owns hover styling. Separate wrappers prevent competing writes. Lenis uses the GSAP ticker, not another RAF loop, with native touch behavior. Magnetic behavior is fine-pointer-only. SplitText comes from the actually installed GSAP package and has readable semantic fallback.

Menu uses a native dialog with focus containment, Escape and focus restoration. Gallery uses pressed-state buttons. Workspace modes, contextual detail and dock expansion are available to keyboard and touch. A live region reports selected-study changes. Reduced motion skips the long transformation tracks and reveals static narratives.

## Refinement record

### Pass 1 — functional, responsive and animation

- Corrected measured hero landing geometry and verified the same DOM image's target position.
- Protected mobile philosophy copy with an ivory inset panel; animated mobile image height to match its final slot.
- Separated hero CTA, floating cards and dock on narrow screens.
- Fixed final workspace clipping and selected-last-tile layout.
- Corrected low-contrast SplitText starting opacity, metadata and preserved workflow labels.
- Defined contextual-overlay exit timing; tested rapid Flip selection, reset, reverse scroll, touch and breakpoint teardown.

### Pass 2 — composition, timing, material and rendering

- Replaced the generic gradient material image with an original optical-glass still life.
- Tightened mobile philosophy proportions; raised the final desktop workspace and repositioned mobile scene metadata.
- Staged the portal image dimmer for bright selected images without sacrificing the middle expansion view.
- Refined caption contrast, optical focus/hover behavior and stable workspace surfaces.
- Suspended off-screen glass blur; reduced persistent backdrop sampling on fixed UI.
- Added correctly matched hero image preloads and responsive gallery thumbnails.
- Removed gallery name overrides so accessible button names include their actual contents; final label/content-name audit passes.

Rendered desktop/mobile sequence sheets were inspected after implementation. These changes are implemented, not suggestions. They did **not** solve the desktop scroll-frame target; see delivery measurements rather than assuming every visual optimization improved performance.
