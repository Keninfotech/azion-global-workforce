import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "../components/PageHero";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessPage() {
  const content = siteContent.process;
  const scopeRef = useRef(null);
  const lineRef = useRef(null);
  const listRef = useRef(null);

  usePageReveal(scopeRef);

  useLayoutEffect(() => {
    if (!lineRef.current || !listRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description={content.intro}
        title={content.title}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-body/60">Outcome</p>
            <p className="mt-4 font-display text-3xl font-bold text-brand-heading">Transparent delivery</p>
            <p className="mt-3 text-sm leading-7 text-brand-body">
              A nine-step model that keeps employers informed from consultation through onboarding.
            </p>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="section-shell">
          <div ref={listRef} className="relative mx-auto max-w-4xl">
            <div className="absolute left-[21px] top-1 h-[calc(100%-2rem)] w-px bg-brand-border sm:left-1/2 sm:-ml-px" />
            <div ref={lineRef} className="absolute left-[21px] top-1 h-[calc(100%-2rem)] w-px bg-brand-primary sm:left-1/2 sm:-ml-px" />
            <div className="space-y-8">
              {content.steps.map((step, index) => (
                <div
                  key={step.title}
                  data-reveal
                  className={`relative grid gap-4 sm:grid-cols-2 ${index % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}
                >
                  <div className={`hidden sm:block ${index % 2 === 0 ? "sm:pr-16" : "sm:pl-16"}`} />
                  <div
                    className={`ml-14 rounded-[28px] border border-brand-border bg-white p-6 shadow-glass sm:ml-0 ${
                      index % 2 === 0 ? "sm:pr-16" : "sm:pl-16"
                    }`}
                  >
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white shadow-glow">
                        {index + 1}
                      </div>
                      <h2 className="text-xl font-bold text-brand-heading">{step.title}</h2>
                    </div>
                    <p className="text-base leading-8 text-brand-body">{step.description}</p>
                  </div>
                  <div className="absolute left-0 top-7 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-brand-primary shadow-glow sm:left-1/2 sm:-ml-[22px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

