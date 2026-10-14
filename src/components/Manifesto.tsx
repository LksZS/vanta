import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
import { SectionLabel } from "./Shared";
export function Manifesto() {
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
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          })
          .from(".manifesto-rule", { scaleY: 0, transformOrigin: "top" }, 0)
          .from("h2", { y: 12 }, 0);
      });
    },
    { scope: root },
  );
  return (
    <section id="manifesto" className="manifesto section-pad" ref={root}>
      <SectionLabel number="08">WHAT WE BELIEVE</SectionLabel>
      <div className="manifesto-body">
        <span className="manifesto-rule" />
        <h2>
          The future isn’t
          <br />
          something we enter.
          <br />
          It’s something
          <br />
          we <em>make.</em>
        </h2>
      </div>
      <div className="manifesto-foot">
        <span className="mono">
          NO NOISE.
          <br />
          NO TECHNOLOGY FOR TECHNOLOGY’S SAKE.
        </span>
        <p>
          Just ambitious people, asking better questions.
          <br />
          And the conviction to build the answers.
        </p>
      </div>
    </section>
  );
}
