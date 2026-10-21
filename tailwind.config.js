/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        editor: {
          bg: "#090d16",
          card: "#0d1322",
          sidebar: "#070a11",
          activeTab: "#111827",
          inactiveTab: "#0b0f19",
          border: "#1f293d",
          borderFocus: "#38bdf8",
          line: "#1e293b",
          status: "#0b0f19",
          badge: "#17223b",
        },
        syntax: {
          keyword: "#c084fc", // purple
          func: "#38bdf8",    // cyan
          string: "#4ade80",  // emerald green
          variable: "#e2e8f0",// light slate
          number: "#fb923c",  // orange
          comment: "#64748b", // slate gray
          tag: "#f43f5e",     // rose
          operator: "#94a3b8",// muted slate
          accent: "#00f0ff",  // neon cyan
        },
      },
      fontFamily: {
        code: ["'Fira Code'", "'JetBrains Mono'", "Consolas", "monospace"],
        sans: ["'Outfit'", "'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 25px -5px rgba(56, 189, 248, 0.4)",
        "neon-purple": "0 0 25px -5px rgba(192, 132, 252, 0.4)",
        "neon-emerald": "0 0 25px -5px rgba(74, 222, 128, 0.4)",
        "glow-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
