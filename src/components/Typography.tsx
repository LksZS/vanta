import { useRef, useState } from "react";
import { gsap, useGSAP, SplitText, NO_REDUCE } from "../lib/motion";
import { SectionLabel } from "./Shared";
export function Typography() {
  const root = useRef<HTMLElement>(null);
  const [word, setWord] = useState(false);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        SplitText.create(".type-sentence", {
          type: "words,lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              opacity: 0.6,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top 65%",
                end: "center 45%",
                scrub: true,
              },
            });
          },
        });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 60%",
              end: "bottom 50%",
              scrub: true,
            },
          })
          .to(".type-before", { xPercent: -4, duration: 1 })
          .from(
            ".type-after",
            { xPercent: 5, letterSpacing: "-.015em", duration: 1 },
            0,
          );
      });
    },
    { scope: root },
  );
  return (
    <section className="typography section-pad" ref={root}>
      <SectionLabel number="04">A DIFFERENT LANGUAGE</SectionLabel>
      <h2 className="type-sentence">
        Not more technology. <br />
        More human possibility.
      </h2>
      <div className="type-statements">
        <div className="type-before">Artificial.</div>
        <div className="type-after">
          Absolutely{" "}
          <button
            className="human-word"
            onClick={() => setWord(!word)}
            aria-label={`${word ? "limitless." : "human."} — change the perspective`}
          >
            {word ? "limitless." : "human."}
            <span className="word-corner" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>
      </div>
      <div className="type-foot">
        <span className="mono">
          THE MOST ADVANCED THING WE MAKE?
          <br />
          SOMETHING THAT FEELS NATURAL.
        </span>
        <span className="mono">[ TAP THE WORD. CHANGE THE PERSPECTIVE. ]</span>
      </div>
    </section>
  );
}
