import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import useLenis from "../hooks/useLenis";

export default function AppShell({ children }) {
  useLenis();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 map-watermark opacity-90" />
      <Navbar />
      <motion.main
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
        exit={{ opacity: 0, y: -18 }}
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
