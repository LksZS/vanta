import { MotionConfig } from "motion/react";
import { LiquidNavigation } from "./experience/LiquidNavigation";
import { CinematicJourney } from "./experience/CinematicJourney";
import { GalleryExperience } from "./experience/GalleryExperience";
import { ProductJourney } from "./experience/ProductJourney";
import { Offerings } from "./components/Offerings";
import { Playground } from "./components/Playground";
import { Contact } from "./components/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
export default function App() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <LiquidNavigation />
      <main id="main" className="vanta-v2">
        <CinematicJourney />
        <GalleryExperience />
        <ProductJourney />
        <Offerings />
        <Playground />
        <Contact />
      </main>
    </MotionConfig>
  );
}
