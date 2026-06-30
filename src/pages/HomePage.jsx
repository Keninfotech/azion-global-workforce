import { Suspense, lazy, useRef } from "react";
import { FiArrowRight, FiCheckCircle, FiGlobe, FiShield, FiUsers } from "react-icons/fi";
import { siteContent } from "../lib/siteContent";
import MagneticButton from "../components/MagneticButton";
import usePageReveal from "../hooks/usePageReveal";

const WorldGlobe = lazy(() => import("../components/WorldGlobe"));
const iconMap = [FiGlobe, FiUsers, FiShield, FiCheckCircle];

function GlobeFallback() {
  return (
    <div className="relative aspect-square min-h-[320px] overflow-hidden rounded-[32px] border border-white/10 bg-brand-navy shadow-float">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,123,255,0.25),transparent_34%)]" />
      <div className="absolute inset-6 rounded-full border border-brand-light/15" />
      <div className="absolute inset-12 rounded-full border border-brand-light/10" />
      <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-brand-light/10" />
      <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-brand-light/10" />
    </div>
  );
}

export default function HomePage() {
  const content = siteContent.home;
  const scopeRef = useRef(null);

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <section className="page-shell pb-12 pt-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <div data-reveal>
            <span className="eyebrow">{content.eyebrow}</span>
            <h1 className="display-title mt-6 max-w-3xl">{content.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-brand-body">{content.hero.lead}</p>
            <p className="body-copy mt-6 max-w-2xl">{content.hero.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <MagneticButton icon={<FiArrowRight />} to="/contact">
                {content.hero.ctas[0]}
              </MagneticButton>
              <MagneticButton icon={<FiArrowRight />} to="/services" variant="secondary">
                {content.hero.ctas[1]}
              </MagneticButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-brand-border bg-white/85 px-4 py-2 text-sm font-semibold text-brand-heading"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal className="relative hero-globe-container">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-brand-primary/10 blur-3xl" />
            <Suspense fallback={<GlobeFallback />}>
              <WorldGlobe />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="page-shell pt-4">
        <div className="section-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-center">
          <div data-reveal>
            <span className="eyebrow">Bangalore Based, Globally Connected</span>
            <h2 className="section-title mt-6 max-w-2xl">Modern international recruitment with clarity, care, and compliance.</h2>
            <p className="body-copy mt-5 max-w-3xl">{content.intro}</p>
          </div>
          <div data-reveal className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Regions Covered", value: "3+" },
              { label: "Industries Served", value: "8" },
              { label: "Support Model", value: "End-to-End" },
              { label: "Recruitment Style", value: "Ethical" },
            ].map((item) => (
              <div key={item.label} className="premium-card rounded-[24px]">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-body/60">{item.label}</p>
                <p className="mt-4 font-display text-2xl font-bold text-brand-heading">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.highlights.map((highlight, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <article
                key={highlight}
                data-reveal
                className="premium-card group hover:-translate-y-2 hover:border-brand-primary/20 hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/8 text-brand-primary transition duration-300 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-brand-heading">{highlight.split(":")[0]}</p>
                    <p className="mt-3 text-base leading-7 text-brand-body">
                      {highlight.includes(":") ? highlight.split(":").slice(1).join(":").trim() : highlight}
                    </p>
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
