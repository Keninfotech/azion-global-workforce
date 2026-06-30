/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0057FF",
          secondary: "#2E7BFF",
          light: "#8EC5FF",
          navy: "#08152D",
          heading: "#111827",
          body: "#4B5563",
          background: "#FFFFFF",
          alt: "#F8FAFC",
          border: "#E6EDF8",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        float: "0 20px 60px rgba(8, 21, 45, 0.12)",
        glow: "0 18px 50px rgba(0, 87, 255, 0.18)",
        glass: "0 12px 40px rgba(8, 21, 45, 0.08)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top right, rgba(46, 123, 255, 0.22), transparent 35%), radial-gradient(circle at left center, rgba(142, 197, 255, 0.18), transparent 30%)",
      },
    },
  },
  plugins: [],
};
