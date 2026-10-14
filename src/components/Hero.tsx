import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE, MOTION } from "../lib/motion";
import { Filament } from "./Filament";
import { Arrow, Magnetic } from "./Shared";
export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        gsap
          .timeline({ defaults: { ease: MOTION.ease } })
          .from(".hero-line > span", {
            yPercent: 105,
            duration: 0.95,
            stagger: 0.075,
          })
          .from(".hero-art", { scale: 0.9, opacity: 0, duration: 1.2 }, 0.1)
          .from(".hero-details", { y: 12, opacity: 0, duration: 0.65 }, 0.35);
        gsap.to(".hero-art-inner", {
          rotation: 13,
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );
  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-eyebrow mono">
        <span className="status-dot" /> EXPERIMENTAL TECHNOLOGY. EXCEPTIONAL
        OUTCOMES.
        <span className="hero-edition">EST. 2026 — GLOBAL BY DESIGN</span>
      </div>
      <div className="hero-main">
        <h1 aria-label="Make the next inevitable.">
          <span className="hero-line" aria-hidden="true">
            <span>MAKE THE</span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <span>NEXT</span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <span>
              INEVITABLE<span className="orange">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-art">
          <div className="hero-orbit" />
          <div className="hero-art-inner">
            <Filament priority />
          </div>
          <span className="art-axis axis-one">+</span>
          <span className="art-axis axis-two">+</span>
          <div className="art-caption mono">
            <span>FIG. 001 — CONTINUOUS POTENTIAL</span>
            <span>∞</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom hero-details">
        <a className="scroll-cue mono" href="#approach">
          <span>↓</span> SCROLL TO DISCOVER
        </a>
        <div className="hero-summary">
          <p>
            Technology should not feel like technology.
            <br />
            It should feel inevitable.
          </p>
          <Magnetic>
            <a className="text-link" href="#offerings">
              Explore our capabilities <Arrow diagonal />
            </a>
          </Magnetic>
        </div>
        <span className="hero-coordinate mono">
          INTELLIGENCE.
          <br />
          SYSTEMS.
          <br />
          INTERFACES.
        </span>
      </div>
      <div className="hero-bottom-rule">
        <span className="mono">A NEW KIND OF TECHNOLOGY PARTNER</span>
        <span className="mono">01 — 09</span>
      </div>
    </section>
  );
}
