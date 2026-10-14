import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Glass } from "./Glass";
import { Arrow } from "../components/Shared";
import { gsap, useGSAP, ScrollTrigger } from "../lib/motion";
const links = [
  ["The approach", "approach"],
  ["Selected explorations", "gallery"],
  ["VANTA OS", "experience"],
  ["Capabilities", "offerings"],
  ["The playground", "playground"],
  ["Start a conversation", "contact"],
];
export function LiquidNavigation() {
  const dialog = useRef<HTMLDialogElement>(null),
    bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false),
    [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      },
    );
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="liquid-header">
        <a className="new-wordmark" href="#home" aria-label="VANTA home">
          VANTA<sup>®</sup>
        </a>
        <Glass className="nav-lens" optical>
          <nav aria-label="Primary">
            <a href="#approach">Studio</a>
            <a href="#gallery">
              Explorations<span className="nav-count">06</span>
            </a>
            <a href="#experience">VANTA OS</a>
            <button
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
              }}
            >
              <span className="desktop-menu">Menu</span>
              <span className="menu-lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </nav>
        </Glass>
        <a className="nav-inquiry" href="#contact">
          Let’s make what’s next <Arrow diagonal />
        </a>
      </header>
      <dialog
        className="liquid-menu"
        ref={dialog}
        data-lenis-prevent=""
        onClose={() => setOpen(false)}
      >
        <div className="menu-heading">
          <span className="new-wordmark">
            VANTA<sup>®</sup>
          </span>
          <button onClick={close} autoFocus>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-layout">
          <motion.nav
            key={String(open)}
            initial={{ opacity: 0, y: reduce ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            aria-label="Expanded navigation"
          >
            {links.map(([text, id], i) => (
              <a href={`#${id}`} key={id} onClick={close}>
                <span className="mono">0{i + 1}</span>
                {text}
                <Arrow diagonal />
              </a>
            ))}
          </motion.nav>
          <div className="menu-image">
            <img
              src="/images/threshold-small.webp"
              alt="Reflective lens in an alpine landscape"
            />
            <p>
              Independent minds.
              <br />
              Extraordinary possibilities.
            </p>
          </div>
        </div>
        <div className="menu-footer mono">
          EXPERIMENTAL TECHNOLOGY STUDIO <span>GLOBAL BY DESIGN / 2026</span>
        </div>
      </dialog>
      <aside className="experience-dock" aria-label="Experience controls">
        <Glass className="dock-shell">
          <motion.div
            layout
            transition={{
              duration: reduce ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id="chapter-popover"
                  className="dock-popover"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                >
                  <p className="mono">CHOOSE YOUR NEXT</p>
                  {links.map(([text, id]) => (
                    <a
                      href={`#${id}`}
                      key={id}
                      onClick={() => setExpanded(false)}
                    >
                      {text}
                      <span>↗</span>
                    </a>
                  ))}
                  <p className="dock-note">
                    Scroll to explore. Your pace, always.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="dock-row">
              <span className="dock-dot" />
              <button
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls="chapter-popover"
              >
                {expanded ? "Close chapters" : "Explore the experience"}
                <span aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              <button
                className="top-control"
                aria-label="Back to top"
                onClick={() => {
                  window.scrollTo(0, 0);
                  ScrollTrigger.update();
                }}
              >
                ↑
              </button>
            </div>
            <div className="dock-progress">
              <div ref={bar} />
            </div>
          </motion.div>
        </Glass>
      </aside>
    </>
  );
}
