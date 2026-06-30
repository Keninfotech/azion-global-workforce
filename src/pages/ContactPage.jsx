import { useRef } from "react";
import { FiArrowRight, FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import PageHero from "../components/PageHero";
import MagneticButton from "../components/MagneticButton";
import { siteContent } from "../lib/siteContent";
import usePageReveal from "../hooks/usePageReveal";

export default function ContactPage() {
  const scopeRef = useRef(null);
  const content = siteContent.contact;

  usePageReveal(scopeRef);

  return (
    <div ref={scopeRef}>
      <PageHero
        badge={content.eyebrow}
        description={content.intro}
        title={content.title}
        aside={
          <div className="space-y-4 text-sm text-brand-body">
            <p className="font-display text-lg font-semibold text-brand-heading">{content.office.name}</p>
            <p className="flex items-start gap-3">
              <FiMapPin className="mt-1 h-4 w-4 text-brand-primary" />
              <span>{content.office.location}</span>
            </p>
            <a className="flex items-center gap-3 transition hover:text-brand-primary" href={`mailto:${content.office.email}`}>
              <FiMail className="h-4 w-4 text-brand-primary" />
              <span>{content.office.email}</span>
            </a>
          </div>
        }
      />

      <section className="page-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div data-reveal className="section-shell">
            <span className="eyebrow">Direct Contact</span>
            <h2 className="section-title mt-6">Reach AZION for employers or candidate pathways.</h2>
            <p className="body-copy mt-5">
              Whether you are building a workforce or exploring international opportunities, AZION can guide the next
              step with clarity and professionalism.
            </p>
            <div className="mt-8 space-y-4">
              <a
                className="flex items-center gap-3 rounded-2xl border border-brand-border px-4 py-4 text-sm font-semibold text-brand-heading transition hover:border-brand-primary/25 hover:text-brand-primary"
                href={`mailto:${content.office.email}`}
              >
                <FiMail className="h-5 w-5 text-brand-primary" />
                {content.office.email}
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-border px-4 py-4 text-sm font-semibold text-brand-heading">
                <FiPhoneCall className="h-5 w-5 text-brand-primary" />
                International recruitment support from Bangalore
              </div>
            </div>
          </div>

          <div data-reveal className="section-shell">
            <div className="grid gap-5 sm:grid-cols-2">
              {content.formFields.map((field, index) => (
                <label key={field} className={index === content.formFields.length - 1 ? "sm:col-span-2" : ""}>
                  <span className="mb-3 block text-sm font-semibold text-brand-heading">{field}</span>
                  {field === "Message" ? (
                    <textarea
                      className="min-h-[160px] w-full rounded-[24px] border border-brand-border bg-brand-alt/55 px-4 py-4 text-sm text-brand-heading outline-none transition focus:border-brand-primary/35"
                      placeholder={`Enter ${field.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      className="h-14 w-full rounded-[24px] border border-brand-border bg-brand-alt/55 px-4 text-sm text-brand-heading outline-none transition focus:border-brand-primary/35"
                      placeholder={`Enter ${field.toLowerCase()}`}
                      type={field === "Email" ? "email" : "text"}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-8">
              <MagneticButton icon={<FiArrowRight />}>Submit</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
