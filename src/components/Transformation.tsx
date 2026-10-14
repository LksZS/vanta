import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
import { SectionLabel } from "./Shared";
export function Transformation() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          })
          .fromTo(
            root.current,
            { backgroundColor: "#eae9e3" },
            { backgroundColor: "#111110", duration: 1 },
            0,
          )
          // Do not interpolate inverse foreground/background colors through
          // identical gray. Switch polarity at the accessible luminance boundary.
          .set(root.current, { color: "#000000" }, 0)
          .set(root.current, { color: "#ffffff" }, 0.54)
          .to(root.current, { color: "#eae9e3", duration: 0.2 }, 0.8)
          .fromTo(
            ".transform-core",
            { scale: 0.65, rotation: -35 },
            { scale: 1, rotation: 0, duration: 1 },
            0,
          )
          .fromTo(
            ".core-lines",
            { opacity: 0.12 },
            { opacity: 1, duration: 0.8 },
            0.2,
          )
          .fromTo(
            ".transform-caption",
            { y: 20 },
            { y: 0, duration: 0.6 },
            0.4,
          );
      });
    },
    { scope: root },
  );
  return (
    <section className="transformation section-pad" ref={root}>
      <SectionLabel number="06">THE INVISIBLE ADVANTAGE</SectionLabel>
      <div className="transformation-heading">
        <h2>
          Everything changes.
          <br />
          When it all connects.
        </h2>
        <p>
          One connected ecosystem.
          <br />
          Infinite possible futures.
        </p>
      </div>
      <div className="core-stage">
        <div className="core-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="transform-core" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              style={{ transform: `translate(-50%,-50%) rotate(${i * 15}deg)` }}
            />
          ))}
          <b>V</b>
        </div>
        <span className="core-label label-left mono">INTELLIGENCE</span>
        <span className="core-label label-right mono">INTERFACES</span>
        <span className="core-label label-bottom mono">SYSTEMS</span>
      </div>
      <div className="transform-caption mono">
        <span className="status-dot" /> NOT THREE SERVICES. ONE LIVING SYSTEM.
      </div>
    </section>
  );
}
