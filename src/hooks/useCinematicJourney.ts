import type { RefObject } from "react";
import { gsap, useGSAP, NO_REDUCE, SplitText } from "../lib/motion";
export function useCinematicJourney(root: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: NO_REDUCE, desktop: "(min-width: 800px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const el = root.current!,
          desktop = ctx.conditions.desktop;
        const mover = el.querySelector<HTMLElement>(".world-traveler")!,
          slot = el.querySelector<HTMLElement>(".arrival-slot")!;
        const position = () => {
          const a = el.getBoundingClientRect(),
            b = slot.getBoundingClientRect();
          return {
            x: b.left - a.left,
            y: b.top - a.top,
            scale: b.width / el.clientWidth,
          };
        };
        gsap.from(".cinema-line>span", {
          yPercent: 110,
          duration: 1.05,
          stagger: 0.08,
          ease: "expo.out",
        });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "hero-continuity",
            trigger: el,
            start: "top top",
            end: () =>
              `+=${position().y - window.innerHeight * (desktop ? 0.28 : 0.1)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(
          ".world-aperture",
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.25 },
          0,
        )
          .to(
            ".cinema-title",
            { y: desktop ? -130 : -65, opacity: 0, duration: 0.3 },
            0,
          )
          .to(
            ".hero-floater-a",
            { y: -100, x: 70, rotation: 8, autoAlpha: 0, duration: 0.35 },
            0,
          )
          .to(
            ".hero-floater-b",
            { y: -160, x: -60, rotation: -9, autoAlpha: 0, duration: 0.35 },
            0,
          )
          .to(".cinema-foot", { opacity: 0, y: -30, duration: 0.2 }, 0)
          .to(
            mover,
            {
              x: () => position().x,
              y: () => position().y,
              scale: () => position().scale,
              transformOrigin: "0 0",
              duration: 0.72,
            },
            0.28,
          )
          .to(
            ".world-image",
            {
              height: desktop ? "100%" : innerWidth < 601 ? "54%" : "46%",
              duration: 0.4,
            },
            0.6,
          )
          .to(
            ".world-aperture",
            {
              clipPath: desktop
                ? "inset(0% 0% 0% 0% round 24px)"
                : innerWidth < 601
                  ? "inset(0% 0% 46% 0% round 24px)"
                  : "inset(0% 0% 54% 0% round 24px)",
              duration: 0.4,
            },
            0.6,
          )
          .to(el, { backgroundColor: "#f0f0e9", duration: 0.6 }, 0.28)
          .from(
            ".arrival-copy",
            { y: desktop ? 65 : 0, opacity: desktop ? 0 : 1, duration: 0.35 },
            0.65,
          )
          .from(".arrival-caption", { opacity: 0, duration: 0.15 }, 0.85);
        SplitText.create(".arrival-statement", {
          type: "words,lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              opacity: 0.85,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: ".arrival-copy",
                start: "top 80%",
                end: "center 50%",
                scrub: true,
              },
            });
          },
        });
      });
    },
    { scope: root },
  );
}
