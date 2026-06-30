import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothTouch: false,
    });

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
