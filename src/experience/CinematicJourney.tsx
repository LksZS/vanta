import { useRef } from "react";
import { useCinematicJourney } from "../hooks/useCinematicJourney";
import { Glass } from "./Glass";
import { Arrow, Magnetic } from "../components/Shared";
export function CinematicJourney() {
  const root = useRef<HTMLDivElement>(null);
  useCinematicJourney(root);
  return (
    <div className="cinematic-journey" ref={root}>
      <div className="world-traveler" aria-hidden="true">
        <div className="world-aperture">
          <picture>
            <source
              media="(max-width:600px)"
              srcSet="/images/threshold-small.webp"
            />
            <img
              className="world-image"
              src="/images/threshold.webp"
              alt=""
              width="1920"
              height="1080"
              fetchPriority="high"
            />
          </picture>
          <div className="world-shade" />
        </div>
      </div>
      <section id="home" className="cinema-hero">
        <div className="hero-kicker mono">
          <span /> INDEPENDENT MINDS. EXTRAORDINARY POSSIBILITIES.
        </div>
        <h1 className="cinema-title" aria-label="Beyond the interface.">
          <span className="cinema-line" aria-hidden="true">
            <span>Beyond the</span>
          </span>
          <span className="cinema-line" aria-hidden="true">
            <span>
              <em>interface.</em>
            </span>
          </span>
        </h1>
        <div className="hero-floater hero-floater-a">
          <Glass>
            <div className="orbital-icon" aria-hidden="true">
              ◎
            </div>
            <div>
              <span className="mono">VANTA INTELLIGENCE</span>
              <p>Possibility, connected.</p>
            </div>
            <span className="connection-dot" />
          </Glass>
        </div>
        <div className="hero-floater hero-floater-b">
          <Glass>
            <span className="mono">DESIGNED TO FEEL</span>
            <strong>Entirely natural.</strong>
            <div className="micro-wave" aria-hidden="true">
              {Array.from({ length: 19 }, (_, i) => (
                <i
                  key={i}
                  style={{ height: 8 + Math.sin(i * 0.65) * 6 + (i % 3) * 4 }}
                />
              ))}
            </div>
          </Glass>
        </div>
        <div className="cinema-foot">
          <div className="hero-description">
            <p>
              Intelligent systems. Instinctive experiences.
              <br />
              Technology that feels like second nature.
            </p>
            <Magnetic>
              <a className="liquid-action" href="#gallery">
                Enter our world{" "}
                <span>
                  <Arrow diagonal />
                </span>
              </a>
            </Magnetic>
          </div>
          <a href="#approach" className="cinema-scroll mono">
            <span>↓</span> SCROLL TO FEEL THE DIFFERENCE
          </a>
          <div className="hero-index mono">
            EXPLORATION 001
            <br />
            <span>THE THRESHOLD</span>
          </div>
        </div>
      </section>
      <section id="approach" className="arrival-section">
        <div className="arrival-copy">
          <div className="eyebrow">
            <span>01 — A DIFFERENT INSTINCT</span>
            <i />
          </div>
          <h2 className="arrival-statement">
            The best technology
            <br />
            doesn’t ask
            <br />
            for your attention.
            <br />
            <em>It understands it.</em>
          </h2>
          <p>
            We make the complex feel effortless. Bringing intelligence, systems,
            and interfaces together to create a more natural relationship with
            technology.
          </p>
          <a href="#experience" className="quiet-link">
            Meet a new kind of intelligence <Arrow diagonal />
          </a>
        </div>
        <div className="arrival-slot">
          <img
            className="static-arrival-image"
            src="/images/threshold-small.webp"
            alt="A reflective lens in a calm alpine landscape"
            loading="lazy"
          />
          <div className="arrival-caption mono">
            <span>FIG. 001 — HUMAN AT THE CENTER</span>
            <span>∞</span>
          </div>
        </div>
        <div className="arrival-bottom mono">
          <span>LESS FRICTION. MORE POSSIBILITY.</span>
          <span>NOT JUST BUILT. CONSIDERED.</span>
        </div>
      </section>
    </div>
  );
}
