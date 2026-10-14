import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
import { SectionLabel } from "./Shared";
export function Approach() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 800px)", motion: NO_REDUCE }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const d = ctx.conditions.desktop ? 1 : 0.35;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(
            ".depth-grid",
            { y: -60 * d, opacity: 0.3 },
            { y: 60 * d, opacity: 0.7 },
            0,
          )
          .fromTo(
            ".depth-disc",
            { y: 90 * d, rotation: -20, scale: 0.92 },
            { y: -90 * d, rotation: 25, scale: 1.04 },
            0,
          )
          .fromTo(".depth-type", { y: 20 * d }, { y: -20 * d }, 0);
      });
    },
    { scope: root },
  );
  return (
    <section id="approach" className="approach section-pad" ref={root}>
      <SectionLabel number="02">BEYOND THE SURFACE</SectionLabel>
      <div className="approach-layout">
        <div className="approach-copy">
          <h2 className="depth-type">
            Complexity
            <br />
            beneath.
            <br />
            <span className="muted">
              Simplicity
              <br />
              above.
            </span>
          </h2>
          <p>
            The best technology disappears. We go deep into the complex, so your
            experience feels effortless.
          </p>
          <div className="small-rule mono">
            LESS FRICTION. MORE POSSIBILITY.
          </div>
        </div>
        <div className="depth-scene" aria-hidden="true">
          <div className="depth-grid" />
          <div className="depth-disc">
            {Array.from({ length: 18 }, (_, i) => (
              <i
                key={i}
                style={{
                  width: `${100 - i * 4.4}%`,
                  height: `${100 - i * 4.4}%`,
                  transform: `translate(-50%,-50%) rotateX(${i * 2}deg)`,
                }}
              />
            ))}
          </div>
          <span className="depth-marker">[ SIGNAL / 001 ]</span>
          <span className="depth-front">HUMAN AT THE CORE.</span>
          <div className="scene-cross">+</div>
        </div>
      </div>
    </section>
  );
}
