import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          "three-core": ["three"],
          "three-fiber": ["@react-three/fiber"],
          "three-drei": ["@react-three/drei"],
          motion: ["gsap", "framer-motion", "lenis"],
        },
      },
    },
  },
});
