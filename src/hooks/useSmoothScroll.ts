import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/motion";
import "lenis/dist/lenis.css";
export function useSmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.11,
        syncTouch: false,
        anchors: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      mm.revert();
    };
  }, []);
}
