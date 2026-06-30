import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function usePageReveal(scopeRef) {
  useLayoutEffect(() => {
    if (!scopeRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        const triggerReveal = () => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
            }
          );
        };

        if (document.body.classList.contains("is-loading")) {
          const onLoaderComplete = () => {
            // If the element is within the viewport on loader completion, reveal it now
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
              // Add a slight stagger delay for hero elements
              gsap.delayedCall(0.15, triggerReveal);
            } else {
              // Otherwise, register normal ScrollTrigger
              ScrollTrigger.create({
                trigger: element,
                start: "top 88%",
                onEnter: triggerReveal,
                once: true,
              });
            }
          };
          window.addEventListener("loader-complete", onLoaderComplete, { once: true });
        } else {
          ScrollTrigger.create({
            trigger: element,
            start: "top 88%",
            onEnter: triggerReveal,
            once: true,
          });
        }
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
