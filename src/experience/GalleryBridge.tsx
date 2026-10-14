import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
import type { Study } from "./data";
import { studies } from "./data";
export function GalleryBridge({ study }: { study: Study }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: NO_REDUCE, desktop: "(min-width:800px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = ctx.conditions.desktop;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "gallery-continuity",
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          ".portal-cover",
          {
            clipPath: desktop
              ? "inset(20% 28% 20% 28% round 18px)"
              : "inset(20% 9% 23% 9% round 16px)",
          },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.6 },
          0,
        )
          .fromTo(
            ".portal-cover img",
            { scale: 1.16 },
            { scale: 1, duration: 0.7 },
            0,
          )
          .to(
            ".portal-satellite-0",
            {
              xPercent: -90,
              yPercent: -75,
              rotation: -18,
              opacity: 0,
              duration: 0.45,
            },
            0,
          )
          .to(
            ".portal-satellite-1",
            {
              xPercent: 95,
              yPercent: -40,
              rotation: 20,
              opacity: 0,
              duration: 0.5,
            },
            0,
          )
          .to(
            ".portal-satellite-2",
            {
              xPercent: -90,
              yPercent: 50,
              rotation: 12,
              opacity: 0,
              duration: 0.4,
            },
            0,
          )
          .to(
            ".portal-satellite-3",
            {
              xPercent: 100,
              yPercent: 70,
              rotation: -15,
              opacity: 0,
              duration: 0.5,
            },
            0,
          )
          .to(".portal-intro", { y: -100, autoAlpha: 0, duration: 0.25 }, 0.1)
          .fromTo(
            ".portal-dimmer",
            { opacity: 0.58 },
            { opacity: 0.12, duration: 0.2 },
            0.25,
          )
          .to(".portal-dimmer", { opacity: 0.62, duration: 0.2 }, 0.48)
          .from(
            ".portal-resolution",
            { y: 80, autoAlpha: 0, duration: 0.35 },
            0.55,
          )
          .from(
            ".portal-resolution h2",
            { letterSpacing: "-.01em", duration: 0.3 },
            0.55,
          )
          .to(".portal-line", { scaleX: 1, duration: 0.2 }, 0.8);
      });
    },
    { scope: root },
  );
  return (
    <div className="gallery-bridge" ref={root}>
      <div className="portal-stage">
        <div className="portal-cover">
          <img
            src={study.src}
            alt={study.alt}
            width="1600"
            height="1067"
            loading="lazy"
          />
          <div className="portal-dimmer" />
        </div>
        {[studies[1], studies[2], studies[3], studies[4]].map((s, i) => (
          <img
            key={s.id}
            className={`portal-satellite portal-satellite-${i}`}
            src={s.src}
            alt=""
            aria-hidden="true"
            width="400"
            height="300"
            loading="lazy"
          />
        ))}
        <section className="portal-intro">
          <span className="eyebrow">A SHIFT IN PERSPECTIVE</span>
          <h2>Look closer.</h2>
          <span className="mono">YOUR SELECTED WORLD, REIMAGINED ↓</span>
        </section>
        <section className="portal-resolution">
          <span className="eyebrow">03 — FROM POSSIBILITY TO PRESENCE</span>
          <h2>
            When everything
            <br />
            connects, <em>it flows.</em>
          </h2>
          <div className="portal-line" />
          <p>
            One connected intelligence.
            <br />
            Built around the way you think.
          </p>
          <span className="mono">THIS IS WHERE THE NEXT BEGINS.</span>
        </section>
        <div className="portal-caption mono">
          <span>
            {study.title.toUpperCase()} / {study.type.toUpperCase()}
          </span>
          <span>VANTA RESEARCH — 2026</span>
        </div>
      </div>
    </div>
  );
}
