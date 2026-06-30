import { useRef } from "react";
import { FiCompass, FiEye, FiFlag, FiUsers } from "react-icons/fi";
import PageHero from "../components/PageHero";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

const icons = [FiUsers, FiFlag, FiEye, FiCompass];

export default function AboutPage() {
  const scopeRef = useRef(null);
  const content = siteContent.about;

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description={content.sections[0].paragraphs[0]}
        title={content.title}
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-body/60">Global Hiring Footprint</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Europe", "Australia", "GCC", "Bangalore"].map((label) => (
                <div key={label} className="rounded-2xl border border-brand-border bg-white/85 px-4 py-3 text-sm font-semibold text-brand-heading">
                  {label}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.sections.map((section, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={section.heading}
                data-reveal
                className="premium-card group min-h-[280px] hover:-translate-y-2 hover:border-brand-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/8 text-brand-primary transition duration-300 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 section-title text-[1.75rem]">{section.heading}</h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-brand-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
