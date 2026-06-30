import { useRef } from "react";
import { FiActivity, FiBox, FiCpu, FiHeart, FiHome, FiPackage, FiShoppingBag, FiTruck } from "react-icons/fi";
import PageHero from "../components/PageHero";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

const icons = [FiCpu, FiHome, FiBox, FiHeart, FiShoppingBag, FiTruck, FiActivity, FiPackage];

export default function IndustriesPage() {
  const content = siteContent.industries;
  const scopeRef = useRef(null);

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description="AZION aligns sector knowledge with international talent pipelines so clients receive candidates who are relevant, qualified, and ready for deployment."
        title={content.title}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-body/60">Coverage</p>
            <p className="mt-4 font-display text-3xl font-bold text-brand-heading">8 industries</p>
            <p className="mt-3 text-sm leading-7 text-brand-body">Engineering, healthcare, logistics, hospitality, energy, and more.</p>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={card.title}
                data-reveal
                className="premium-card group overflow-hidden border-t-4 border-t-transparent hover:scale-[1.01] hover:border-t-brand-primary"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl transition duration-300 group-hover:bg-brand-primary/15" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/8 text-brand-primary transition duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-brand-heading">{card.title}</h2>
                <p className="mt-4 text-base leading-8 text-brand-body">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
