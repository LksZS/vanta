import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Glass } from "./Glass";
import { gsap, useGSAP, NO_REDUCE, SplitText } from "../lib/motion";
export function ProductJourney() {
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
            id: "product-continuity",
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(".product-intro", { y: -90, autoAlpha: 0, duration: 0.22 }, 0)
          .fromTo(
            ".workspace-mover",
            { scale: 0.8, rotationX: desktop ? 17 : 7, y: 80 },
            { scale: 1, rotationX: 0, y: 0, duration: 0.32 },
            0,
          )
          .fromTo(
            ".workspace-reveal",
            { clipPath: "inset(0% 0% 45% 0% round 14px)" },
            { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.35 },
            0,
          )
          .to(
            ".product-satellite-a",
            {
              x: desktop ? 200 : 70,
              y: 100,
              rotation: 15,
              autoAlpha: 0,
              duration: 0.32,
            },
            0.08,
          )
          .to(
            ".product-satellite-b",
            {
              x: desktop ? -140 : -70,
              y: -80,
              rotation: -10,
              autoAlpha: 0,
              duration: 0.32,
            },
            0.12,
          )
          .fromTo(
            ".product-phase",
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.14 },
            0.25,
          )
          .to(".product-phase", { autoAlpha: 0, y: -20, duration: 0.13 }, 0.5)
          .to(".product-backdrop", { opacity: 0, duration: 0.35 }, 0.6)
          .to(
            ".product-stage",
            { backgroundColor: "#f0f0e9", duration: 0.35 },
            0.6,
          )
          .to(
            ".workspace-mover",
            {
              x: () => (desktop ? innerWidth * 0.235 : 0),
              y: () => (desktop ? -innerHeight * 0.04 : innerHeight * 0.02),
              scale: desktop ? 0.62 : 0.83,
              rotationY: desktop ? -7 : 0,
              duration: 0.4,
            },
            0.6,
          )
          .from(
            ".product-outro",
            { autoAlpha: 0, y: 50, duration: 0.24 },
            0.76,
          );
        SplitText.create(".product-outro h2", {
          type: "words,lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              y: 20,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            });
          },
        });
      });
    },
    { scope: root },
  );
  return (
    <div id="experience" className="product-journey" ref={root}>
      <div className="product-stage">
        <div className="product-backdrop">
          <img
            src="/images/alpine.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <div />
        </div>
        <section className="product-intro">
          <div className="eyebrow">04 — INTRODUCING VANTA OS</div>
          <h2>
            Everything you need.
            <br />
            <em>Nothing in your way.</em>
          </h2>
        </section>
        <div className="product-satellite product-satellite-a">
          <Glass>
            <span className="satellite-glyph">⌘</span>
            <div>
              <span className="mono">CONNECTED INTELLIGENCE</span>
              <p>Context, not commands.</p>
            </div>
          </Glass>
        </div>
        <div className="product-satellite product-satellite-b">
          <Glass>
            <div className="signal-bars" aria-hidden="true">
              {[15, 24, 40, 28, 46, 20, 32].map((h, i) => (
                <i key={i} style={{ height: h }} />
              ))}
            </div>
            <span className="mono">LESS NOISE. MORE SIGNAL.</span>
          </Glass>
        </div>
        <div className="workspace-mover">
          <Workspace />
        </div>
        <p className="product-phase mono">
          INTELLIGENCE, SYSTEMS, AND INTERFACES.
          <br />
          FINALLY SPEAKING THE SAME LANGUAGE.
        </p>
        <section className="product-outro">
          <div className="eyebrow">05 — HUMAN ABOVE EVERYTHING</div>
          <h2>
            Less interface.
            <br />
            <em>More instinct.</em>
          </h2>
          <p>
            The future is not another screen.
            <br />
            It’s the freedom to look beyond it.
          </p>
          <span className="mono">THIS IS TECHNOLOGY, IN ITS ELEMENT.</span>
        </section>
        <div className="product-stage-bottom mono">
          <span>VANTA OS / INTERACTIVE CONCEPT</span>
          <span>DESIGNED AROUND YOU.</span>
        </div>
      </div>
    </div>
  );
}
function Workspace() {
  const [focus, setFocus] = useState(false),
    [info, setInfo] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Glass className="workspace-shell">
      <div className="workspace-top">
        <div className="workspace-brand">
          V<span>VANTA OS</span>
          <span className="workspace-version">01.04</span>
        </div>
        <div className="workspace-top-actions">
          <span className="mono">WORKSPACE / PERSONAL</span>
          <button
            onClick={() => setInfo(!info)}
            aria-expanded={info}
            aria-controls="workspace-info"
            aria-label="About this workspace"
          >
            i
          </button>
          <span className="workspace-avatar">A</span>
        </div>
      </div>
      <AnimatePresence>
        {info && (
          <motion.div
            id="workspace-info"
            className="workspace-info"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <strong>A workspace that gets you.</strong>
            <p>
              This interactive concept brings signal, context, and actions
              together. Try Focus mode to change the layout. All data here is
              illustrative.
            </p>
            <button onClick={() => setInfo(false)}>Got it ↗</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="workspace-reveal">
        <div className="workspace-greeting">
          <div>
            <span className="mono">A CLEARER PERSPECTIVE</span>
            <h3>Good things are in motion.</h3>
          </div>
          <div className="workspace-switch" aria-label="Workspace view">
            {["Overview", "Focus"].map((l, i) => (
              <button
                key={l}
                onClick={() => setFocus(i === 1)}
                aria-pressed={focus === (i === 1)}
              >
                {focus === (i === 1) && (
                  <motion.span
                    layoutId="workspace-mode"
                    className="workspace-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span>{l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={`workspace-panels ${focus ? "is-focused" : ""}`}>
          <motion.div
            layout
            className="workspace-chart"
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <div className="chart-label">
              <span>Signals that matter</span>
              <span className="mono">LAST 7 DAYS ↗</span>
            </div>
            <div className="chart-value">
              A little clearer.<span>+24.8% clarity</span>
            </div>
            <svg viewBox="0 0 500 140" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#cce2ba" stopOpacity=".25" />
                  <stop offset="1" stopColor="#cce2ba" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 120C40 120 35 88 75 90S115 115 145 79S190 100 225 64S270 88 305 47S335 65 375 35S410 55 450 19L500 5V140H0Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 120C40 120 35 88 75 90S115 115 145 79S190 100 225 64S270 88 305 47S335 65 375 35S410 55 450 19L500 5"
                stroke="#cce2ba"
                strokeWidth="2"
              />
            </svg>
            <div className="chart-days mono">
              <span>MON</span>
              <span>WED</span>
              <span>FRI</span>
              <span>TODAY</span>
            </div>
          </motion.div>
          <motion.div
            layout
            className="workspace-context"
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <span className="mono">YOUR NEXT, CONNECTED</span>
            <div>
              <i />
              <p>
                Strategy aligned<span>A shared direction.</span>
              </p>
              <b>↗</b>
            </div>
            <div>
              <i />
              <p>
                Ideas in motion<span>Space to think bigger.</span>
              </p>
              <b>↗</b>
            </div>
            <div>
              <i />
              <p>
                Systems in sync<span>Nothing left between.</span>
              </p>
              <b>↗</b>
            </div>
          </motion.div>
        </div>
        <div className="workspace-command">
          <span className="command-spark">✳</span>
          <span>
            {focus
              ? "Your focus is protected. Let’s make something matter."
              : "What would you like to make possible?"}
          </span>
          <span className="command-key">⌘ K</span>
        </div>
      </div>
    </Glass>
  );
}
