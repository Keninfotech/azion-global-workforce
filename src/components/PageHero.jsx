import { motion } from "framer-motion";

export default function PageHero({ badge, title, description, aside }) {
  return (
    <section className="page-shell pt-28">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="section-shell relative overflow-hidden bg-white/78"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_320px] lg:items-end">
          <div>
            <span className="eyebrow">{badge}</span>
            <h1 className="page-title mt-6 max-w-3xl">{title}</h1>
            <p className="body-copy mt-6 max-w-3xl">{description}</p>
          </div>
          {aside ? <div className="glass-panel rounded-[28px] p-6">{aside}</div> : null}
        </div>
      </motion.div>
    </section>
  );
}
