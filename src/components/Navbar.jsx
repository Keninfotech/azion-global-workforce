import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../lib/siteContent";
import MagneticButton from "./MagneticButton";

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-11 w-11 rounded-2xl bg-brand-navy">
        <div className="absolute left-3 top-2 h-6 w-3 rotate-[12deg] rounded-full bg-brand-light" />
        <div className="absolute left-5 top-2 h-7 w-1 rounded-full bg-white" />
        <div className="absolute left-5 top-5 h-1 w-4 -rotate-[28deg] rounded-full bg-brand-secondary" />
      </div>
      <div>
        <p className="font-display text-lg font-bold tracking-[0.18em] text-brand-heading">AZION</p>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-body/70">Global Workforce</p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(22px)" : "blur(0px)",
            backgroundColor: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0)",
            borderColor: scrolled ? "rgba(230,237,248,0.95)" : "rgba(230,237,248,0)",
            boxShadow: scrolled ? "0 16px 42px rgba(8,21,45,0.09)" : "0 0 0 rgba(8,21,45,0)",
          }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all sm:px-6"
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Link to="/">
            <motion.div animate={{ scale: scrolled ? 0.96 : 1 }} transition={{ duration: 0.35 }}>
              <BrandMark />
            </motion.div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "text-brand-primary" : "text-brand-heading/80 hover:text-brand-primary"
                  }`
                }
                to={link.href}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-primary"
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton icon={<FiArrowUpRight />} to="/contact">
              Talk To AZION
            </MagneticButton>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white/80 text-brand-heading lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-4 top-24 z-40 rounded-[28px] border border-brand-border bg-white/92 p-6 shadow-float backdrop-blur-xl lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-semibold ${
                      isActive ? "bg-brand-primary/8 text-brand-primary" : "text-brand-heading"
                    }`
                  }
                  to={link.href}
                >
                  {link.label}
                </NavLink>
              ))}
              <MagneticButton className="mt-2 w-full" icon={<FiArrowUpRight />} to="/contact">
                Talk To AZION
              </MagneticButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
