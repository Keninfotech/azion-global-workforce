import { useRef } from "react";
import { FiCheckSquare, FiClipboard, FiGlobe, FiShield, FiStar, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import PageHero from "../components/PageHero";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

const icons = [FiUsers, FiCheckSquare, FiGlobe, FiShield, FiClipboard, FiTarget, FiStar, FiTrendingUp];

export default function WhyAzionPage() {
  const scopeRef = useRef(null);
  const content = siteContent.why;

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description={content.intro}
        title={content.title}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-body/60">Partner Advantage</p>
            <p className="mt-4 font-display text-3xl font-bold text-brand-heading">Long-term value</p>
            <p className="mt-3 text-sm leading-7 text-brand-body">
              AZION combines rigorous delivery standards with a human, client-focused approach to international recruitment.
            </p>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.pillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={pillar.title}
                data-reveal
                className="premium-card hover:-translate-y-2 hover:border-brand-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/8 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-heading">{pillar.title}</h2>
                    <p className="mt-4 text-base leading-8 text-brand-body">{pillar.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
