import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { navLinks, siteContent } from "../lib/siteContent";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="page-shell pt-0">
      <div className="section-shell overflow-hidden bg-brand-navy text-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <span className="eyebrow border-white/10 bg-white/5 text-brand-light">Global Recruitment Partner</span>
            <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
              Premium international hiring support from Bangalore to the world.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
              AZION helps employers build qualified, diverse, and dependable teams across Europe, Australia, and the
              GCC through ethical end-to-end recruitment solutions.
            </p>
            <div className="mt-8">
              <MagneticButton className="bg-white text-brand-navy hover:text-brand-navy" icon={<FiArrowUpRight />} to="/contact">
                Start A Conversation
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-lg font-semibold text-white">Explore</p>
              <div className="mt-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} className="text-sm text-white/70 transition hover:text-brand-light" to={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">Contact</p>
              <div className="mt-4 space-y-4 text-sm text-white/70">
                <p className="flex items-start gap-3">
                  <FiMapPin className="mt-1 h-4 w-4 text-brand-light" />
                  <span>{siteContent.contact.office.location}</span>
                </p>
                <a className="flex items-center gap-3 transition hover:text-brand-light" href={`mailto:${siteContent.contact.office.email}`}>
                  <FiMail className="h-4 w-4 text-brand-light" />
                  <span>{siteContent.contact.office.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © 2026 AZION. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
