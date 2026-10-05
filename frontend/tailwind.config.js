/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        // Superficies (claro, Stripe-like)
        canvas: "#f6f7f9",
        surface: "#ffffff",
        elevated: "#ffffff",
        accent: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          soft: "#4f46e514",
        },
      },
      borderColor: {
        subtle: "rgba(17,24,39,0.08)",
        strong: "rgba(17,24,39,0.16)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,0.06), 0 0 0 1px rgba(17,24,39,0.05)",
        pop: "0 20px 48px -16px rgba(17,24,39,0.25), 0 0 0 1px rgba(17,24,39,0.06)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.15s ease-out",
        "pop-in": "pop-in 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
