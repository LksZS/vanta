import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });
export const MOTION = { ease: "expo.out", duration: 0.9, stagger: 0.075 };
export const NO_REDUCE = "(prefers-reduced-motion: no-preference)";
export { gsap, ScrollTrigger, SplitText, useGSAP };
