import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
import { SectionLabel } from "./Shared";
import { Filament } from "./Filament";
const chapters = [
  {
    n: "01",
    title: "See what’s next.",
    tag: "DISCOVER",
    text: "Find the opportunity hiding inside the complexity. Ask better questions. Challenge the obvious.",
  },
  {
    n: "02",
    title: "Connect the dots.",
    tag: "ENGINEER",
    text: "Turn ambitious thinking into intelligent systems. Built with precision, designed to work together.",
  },
  {
    n: "03",
    title: "Make it matter.",
    tag: "TRANSFORM",
    text: "Put possibility into people’s hands. Create experiences that move businesses—and the world—forward.",
  },
];
export function Story() {
  const root = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 900px) and (pointer: fine) and ${NO_REDUCE}`, () => {
        const distance = () =>
          track.current!.scrollWidth - root.current!.clientWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinType: "transform",
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        tl.to(track.current, { x: () => -distance(), duration: 1 }, 0)
          .fromTo(
            ".story-progress span",
            { scaleX: 0 },
            { scaleX: 1, duration: 1 },
            0,
          )
          .fromTo(
            ".chapter-art",
            { rotation: -5 },
            { rotation: 5, duration: 1 },
            0,
          );
      });
    },
    { scope: root },
  );
  return (
    <section id="process" className="story" ref={root}>
      <div className="story-heading">
        <SectionLabel number="03">FROM WHAT IF TO WHAT’S NEXT</SectionLabel>
        <div className="flex items-end justify-between gap-6">
          <h2>Possibility. In motion.</h2>
          <span className="mono story-instruction">THREE MOVES FORWARD ↗</span>
        </div>
      </div>
      <div className="story-window">
        <div className="story-track" ref={track}>
          {chapters.map((c, i) => (
            <article className={`chapter chapter-${i}`} key={c.n}>
              <div className="chapter-top mono">
                <span>{c.tag}</span>
                <span>0{i + 1} / 03</span>
              </div>
              <div className="chapter-art" aria-hidden="true">
                {i === 0 ? (
                  <div className="discovery-art">
                    {Array.from({ length: 13 }, (_, n) => (
                      <i
                        key={n}
                        style={{ transform: `rotate(${n * 13.8}deg)` }}
                      />
                    ))}
                  </div>
                ) : i === 1 ? (
                  <div className="connection-art">
                    {Array.from({ length: 9 }, (_, n) => (
                      <i key={n} />
                    ))}
                  </div>
                ) : (
                  <Filament />
                )}
              </div>
              <div className="chapter-copy">
                <span className="chapter-number">{c.n}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="story-progress">
        <span />
      </div>
      <div className="story-foot mono">
        <span>STRATEGY → INTELLIGENCE → IMPACT</span>
        <span>BUILT TO MOVE YOU FORWARD</span>
      </div>
    </section>
  );
}
