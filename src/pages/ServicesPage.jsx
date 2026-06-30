import { useRef } from "react";
import { FiArrowRight, FiBriefcase, FiLayers, FiMap, FiUsers } from "react-icons/fi";
import PageHero from "../components/PageHero";
import MagneticButton from "../components/MagneticButton";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

const serviceIcons = [FiBriefcase, FiUsers, FiLayers, FiMap];

export default function ServicesPage() {
  const content = siteContent.services;
  const scopeRef = useRef(null);

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description={content.intro}
        title={content.title}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-body/60">Delivery Scope</p>
            <p className="mt-4 font-display text-3xl font-bold text-brand-heading">From search to onboarding</p>
            <p className="mt-3 text-sm leading-7 text-brand-body">
              Executive hiring, project staffing, permanent recruitment, workforce support, and strategic talent mapping.
            </p>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-3">
          {content.coreServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <article
                key={service.title}
                data-reveal
                className="premium-card group flex h-full flex-col hover:-translate-y-2 hover:border-brand-primary/20 hover:shadow-glow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/8 text-brand-primary transition duration-300 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-brand-heading">{service.title}</h2>
                <p className="mt-4 flex-1 text-base leading-8 text-brand-body">{service.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                  Learn more
                  <FiArrowRight className="transition duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-shell pt-4">
        <div data-reveal className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <span className="eyebrow">Workforce Solutions</span>
              <h2 className="section-title mt-6">Integrated support beyond hiring.</h2>
              <p className="body-copy mt-5">{content.workforce.intro}</p>
              <div className="mt-8">
                <MagneticButton icon={<FiArrowRight />} to="/contact">
                  Build Your Hiring Plan
                </MagneticButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.workforce.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-brand-border bg-brand-alt/80 px-5 py-5 text-base font-semibold text-brand-heading"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
