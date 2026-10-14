import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Arrow } from "./Shared";
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Vanta home">
          VANTA<sup>®</sup>
        </a>
        <span className="header-descriptor mono">
          INDEPENDENT MINDS.
          <br />
          EXTRAORDINARY POSSIBILITIES.
        </span>
        <nav className="desktop-nav" aria-label="Primary">
          <a href="#approach">Approach</a>
          <a href="#offerings">Capabilities</a>
          <a href="#playground">
            Playground <span className="tiny-dot" />
          </a>
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
          aria-label="Open menu"
          aria-expanded={open}
        >
          Menu <span aria-hidden="true">+</span>
        </button>
      </header>
      <dialog
        ref={dialog}
        className="nav-dialog"
        data-lenis-prevent=""
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="menu-top">
          <span className="wordmark">
            VANTA<sup>®</sup>
          </span>
          <button onClick={close} autoFocus>
            Close ×
          </button>
        </div>
        <motion.nav
          key={String(open)}
          initial={{ opacity: 0, y: reduce ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          aria-label="Expanded navigation"
        >
          {[
            ["01", "Approach", "approach"],
            ["02", "Capabilities", "offerings"],
            ["03", "Playground", "playground"],
            ["04", "Let’s talk", "contact"],
          ].map(([n, label, id]) => (
            <a key={id} href={`#${id}`} onClick={close}>
              <span className="mono">{n}</span>
              {label}
              <Arrow diagonal />
            </a>
          ))}
        </motion.nav>
        <p className="mono">THE NEXT IS OURS TO MAKE.</p>
      </dialog>
    </>
  );
}
