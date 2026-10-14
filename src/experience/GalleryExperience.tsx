import { useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { gsap, useGSAP, NO_REDUCE, ScrollTrigger } from "../lib/motion";
import { studies, type Study } from "./data";
import { GalleryBridge } from "./GalleryBridge";
import { Arrow } from "../components/Shared";
gsap.registerPlugin(Flip);
export function GalleryExperience() {
  const root = useRef<HTMLElement>(null),
    grid = useRef<HTMLDivElement>(null),
    state = useRef<Flip.FlipState | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const active = studies.find((s) => s.id === selected) || studies[0];
  const select = (id: string | null) => {
    gsap.killTweensOf(".morph-tile");
    state.current = Flip.getState(
      grid.current!.querySelectorAll(".morph-tile"),
    );
    setSelected(id === selected ? null : id);
  };
  useGSAP(
    () => {
      if (!state.current) return;
      if (!matchMedia("(prefers-reduced-motion:reduce)").matches)
        Flip.from(state.current, {
          duration: 0.75,
          ease: "power3.inOut",
          absolute: true,
          nested: true,
          scale: true,
          onComplete: () => ScrollTrigger.refresh(),
        });
      state.current = undefined;
    },
    { scope: root, dependencies: [selected], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        gsap.from(".gallery-heading h2", {
          y: 30,
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "top 25%",
            scrub: true,
          },
          ease: "none",
        });
      });
    },
    { scope: root },
  );
  return (
    <>
      <section id="gallery" className="curated-gallery" ref={root}>
        <div className="gallery-heading">
          <div>
            <div className="eyebrow">02 — SELECTED EXPLORATIONS</div>
            <h2>
              Different worlds.
              <br />
              <em>One way of seeing.</em>
            </h2>
          </div>
          <div className="gallery-intro">
            <p>
              Not a portfolio of what is.
              <br />
              An exploration of what could be.
            </p>
            <span className="mono">
              SIX PERSPECTIVES / ENDLESS POSSIBILITIES
            </span>
          </div>
        </div>
        <div
          ref={grid}
          className={`morph-grid ${selected ? "has-selection" : ""}`}
          data-selected={selected || "none"}
        >
          {studies.map((s, i) => (
            <GalleryTile
              key={s.id}
              study={s}
              i={i}
              selected={selected === s.id}
              onSelect={() => select(s.id)}
            />
          ))}
        </div>
        <div className="gallery-selection" aria-live="polite">
          <div>
            <span className="mono">
              {selected
                ? `SELECTED / ${active.year}`
                : "AN OPEN FIELD OF POSSIBILITIES"}
            </span>
            <p>
              {selected
                ? active.description
                : "Select a perspective. Watch the composition find a new balance."}
            </p>
          </div>
          <button
            className="gallery-reset"
            onClick={() => select(null)}
            disabled={!selected}
          >
            Reset composition <span>↺</span>
          </button>
        </div>
      </section>
      <GalleryBridge study={active} />
    </>
  );
}
function GalleryTile({
  study,
  i,
  selected,
  onSelect,
}: {
  study: Study;
  i: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`morph-tile tile-${i} ${selected ? "is-selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="tile-image">
        <img
          src={study.src}
          srcSet={`${study.src.replace(".webp", "-thumb.webp")} 600w, ${study.src} ${study.id === "threshold" ? 1920 : study.id === "prism" ? 1200 : 1600}w`}
          sizes={
            selected
              ? "(max-width:799px) 90vw, 50vw"
              : "(max-width:799px) 44vw, 35vw"
          }
          alt={study.alt}
          loading="lazy"
          decoding="async"
          width="1600"
          height="1067"
        />
        <span className="tile-view">
          {selected ? "Selected" : "Explore"} <Arrow diagonal />
        </span>
      </div>
      <div className="tile-caption">
        <div>
          <span className="mono">{study.type}</span>
          <h3>{study.title}</h3>
        </div>
        <span className="mono">/{study.year}</span>
      </div>
    </button>
  );
}
