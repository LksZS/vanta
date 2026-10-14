import { writeFileSync } from "node:fs";
// Original deterministic 3D torus projected into a lightweight, browser-cached 2D SVG.
const paths = Array.from({ length: 76 }, (_, i) => {
  const u = (i / 76) * Math.PI * 2;
  const d = Array.from({ length: 81 }, (_, j) => {
    const v = (j / 80) * Math.PI * 2,
      r = 164 + 72 * Math.cos(v);
    const x = r * Math.cos(u),
      y = r * Math.sin(u),
      z = 72 * Math.sin(v);
    const rx = x * 0.91 + z * 0.42,
      rz = -x * 0.42 + z * 0.91,
      ry = y * 0.67 - rz * 0.74,
      depth = y * 0.74 + rz * 0.67,
      s = 650 / (650 - depth);
    return `${j ? "L" : "M"}${(300 + (rx * 0.91 - ry * 0.41) * s).toFixed(1)},${(300 + (rx * 0.41 + ry * 0.91) * s).toFixed(1)}`;
  }).join(" ");
  return `<path d="${d}" opacity="${0.55 + (i % 7) * 0.06}"/>`;
});
writeFileSync(
  "public/filament.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none"><defs><linearGradient id="f" x1="80" y1="50" x2="470" y2="580" gradientUnits="userSpaceOnUse"><stop stop-color="#FFBD88"/><stop offset=".36" stop-color="#FF702F"/><stop offset=".72" stop-color="#FF471A"/><stop offset="1" stop-color="#722311"/></linearGradient></defs><g stroke="url(#f)" stroke-width=".72">${paths.join("")}</g></svg>`,
);
