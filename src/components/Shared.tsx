import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, NO_REDUCE } from "../lib/motion";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function SectionLabel({
  number,
  children,
  total = "09",
}: {
  number: string;
  children: ReactNode;
  total?: string;
}) {
  return (
    <div className="section-label">
      <span className="cross">+</span>
      <span>{children}</span>
      <span className="section-number">
        {number} / {total}
      </span>
    </div>
  );
}
export function Magnetic({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${NO_REDUCE} and (pointer: fine)`, () => {
        const zone = root.current!,
          target = zone.firstElementChild!;
        const x = gsap.quickTo(target, "x", {
            duration: 0.35,
            ease: "power3.out",
          }),
          y = gsap.quickTo(target, "y", { duration: 0.35, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = zone.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.15);
          y((e.clientY - r.top - r.height / 2) * 0.15);
        };
        const leave = () => {
          x(0);
          y(0);
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
    <span className="magnetic" ref={root}>
      <span>{children}</span>
    </span>
  );
}
