import { useRef, useState, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "./Shared";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
export function Playground() {
  const root = useRef<HTMLElement>(null),
    field = useRef<HTMLDivElement>(null),
    spot = useRef<HTMLDivElement>(null);
  const [density, setDensity] = useState(50),
    [layout, setLayout] = useState(false),
    [active, setActive] = useState(false);
  const reduce = useReducedMotion();
  const path = useMemo(
    () =>
      Array.from(
        { length: 161 },
        (_, i) =>
          `${i ? "L" : "M"}${i * 5},${100 + Math.sin(i * 0.1) * Math.cos(i * 0.04) * (active ? density : 12)}`,
      ).join(" "),
    [density, active],
  );
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${NO_REDUCE} and (pointer:fine)`, () => {
        const zone = field.current!,
          node = spot.current!;
        const x = gsap.quickTo(node, "x", {
            duration: 0.45,
            ease: "power3.out",
          }),
          y = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = zone.getBoundingClientRect();
          x(e.clientX - r.left);
          y(e.clientY - r.top);
          node.style.opacity = "1";
        };
        const leave = () => {
          node.style.opacity = "0";
        };
        zone.addEventListener("pointermove", move);
        zone.addEventListener("pointerleave", leave);
        return () => {
          zone.removeEventListener("pointermove", move);
          zone.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );
  return (
    <section id="playground" className="playground section-pad" ref={root}>
      <SectionLabel number="07" total="08">
        LIVE EXPERIMENT / OPEN TO CURIOSITY
      </SectionLabel>
      <div className="play-heading">
        <h2>
          Don’t just look.
          <br />
          <span className="muted">Get a feel for it.</span>
        </h2>
        <p>
          Good interfaces invite participation.
          <br />
          This one is no different.
        </p>
      </div>
      <div className="lab">
        <div className="lab-field" ref={field}>
          <div className="lab-spot" ref={spot} />
          <div className="lab-meta mono">
            <span>VANTA — SIGNAL LAB</span>
            <span aria-live="polite">
              {active ? "SIGNAL ACTIVE" : "AWAITING INPUT"}{" "}
              <span className={`tiny-dot ${active ? "live" : ""}`} />
            </span>
          </div>
          <div
            className={`lab-particles ${layout ? "orbit-layout" : ""}`}
            aria-hidden="true"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <motion.i
                layout
                key={i}
                transition={{
                  duration: reduce ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={
                  layout
                    ? {
                        position: "absolute",
                        left: `${50 + Math.cos((i / 24) * Math.PI * 2) * 34}%`,
                        top: `${50 + Math.sin((i / 24) * Math.PI * 2) * 35}%`,
                        opacity: 0.35 + density / 160,
                      }
                    : { opacity: 0.35 + density / 160 }
                }
              />
            ))}
          </div>
          <svg
            className="signal-wave"
            viewBox="0 0 800 200"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d={path}
              stroke="currentColor"
              strokeWidth="1.3"
              animate={{
                pathLength: active ? 1 : 0.4,
                opacity: active ? 1 : 0.35,
              }}
              transition={{ duration: reduce ? 0 : 0.65 }}
            />
          </svg>
          <span className="field-caption mono">MOVE. ADJUST. RECONFIGURE.</span>
          <span className="field-coordinate mono">
            X / Y<br />
            LIVE EXPLORATION
          </span>
        </div>
        <div className="lab-controls">
          <div>
            <span className="mono">01 / INTENSITY</span>
            <label htmlFor="density">
              Find your frequency.<output>{density}%</output>
            </label>
            <input
              id="density"
              type="range"
              min="10"
              max="90"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
            />
          </div>
          <div>
            <span className="mono">02 / STRUCTURE</span>
            <p>Different forms. Same potential.</p>
            <button
              className="lab-button"
              aria-pressed={layout}
              onClick={() => setLayout(!layout)}
            >
              {layout ? "Return to matrix" : "Reconfigure to orbit"}
              <span>↗</span>
            </button>
          </div>
          <div>
            <span className="mono">03 / RESPONSE</span>
            <p>A little input changes everything.</p>
            <button
              className={`lab-button ${active ? "active" : ""}`}
              aria-pressed={active}
              onClick={() => setActive(!active)}
            >
              {active ? "Quiet the signal" : "Activate the signal"}
              <span>{active ? "−" : "+"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
