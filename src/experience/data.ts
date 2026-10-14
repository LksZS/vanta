export const studies = [
  {
    id: "threshold",
    title: "The threshold",
    type: "Spatial intelligence",
    year: "01",
    src: "/images/threshold.webp",
    alt: "A reflective titanium lens above a glacial lake",
    description:
      "An exploration of the space between human intention and intelligent response.",
  },
  {
    id: "architecture",
    title: "A quieter structure",
    type: "Connected systems",
    year: "02",
    src: "/images/architecture.webp",
    alt: "Sculptural white architecture against a pale sky",
    description:
      "Complex systems, composed with the clarity and intention of great architecture.",
  },
  {
    id: "ocean",
    title: "Always in motion",
    type: "Adaptive interfaces",
    year: "03",
    src: "/images/ocean.webp",
    alt: "Blue ocean waves folding into an open horizon",
    description:
      "Interfaces that adapt to the way people move, think, and make decisions.",
  },
  {
    id: "dunes",
    title: "Natural intelligence",
    type: "Generative thinking",
    year: "04",
    src: "/images/dunes.webp",
    alt: "Desert mesas and stratified sandstone under a pale blue sky",
    description:
      "Finding useful patterns in complexity. Intelligence shaped by context.",
  },
  {
    id: "prism",
    title: "Another perspective",
    type: "Material exploration",
    year: "05",
    src: "/images/prism.webp",
    alt: "A folded optical-glass ribbon refracting light on an ivory surface",
    description:
      "A material study in light, depth, and the feeling of a digital surface.",
  },
  {
    id: "alpine",
    title: "Clarity, by design",
    type: "Human experience",
    year: "06",
    src: "/images/alpine.webp",
    alt: "Alpine peaks reflected in a still mountain lake",
    description:
      "Removing the unnecessary until the next action feels completely natural.",
  },
] as const;
export type Study = (typeof studies)[number];
