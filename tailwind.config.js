/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Deep Patina Green (dark canvas & oxidized copper)
        patina: {
          DEFAULT: '#12302B',   // Deep Patina Green — dark canvas
          dark: '#0B1F1C',      // deepest shadow
          light: '#1A3D37',     // hover state on dark
          950: '#071513',
          900: '#0B1F1C',
          800: '#12302B',
          700: '#1A423B',
          600: '#23554D',
          500: '#307166',
        },
        // Copper Tokens (contrast-checked: copper-text for all text/buttons, copper-glow for large decorative only)
        copper: {
          DEFAULT: '#8C4E28',   // copper-text for text, links and button fills (~5:1 on parchment)
          text: '#8C4E28',      // ALL copper text, links, button fills
          glow: '#B26A3C',      // large decorative use only (never small button labels or body text)
          light: '#CA7E4D',     // virgin copper / active hover glow
          deep: '#8C4E28',      // living bronze
          dark: '#753B18',      // wax seal dark
          900: '#572E15',
          800: '#8C4E28',
          700: '#8C4E28',
          600: '#9C562D',
          500: '#B26A3C',
          400: '#CA7E4D',
          300: '#E4A982',
          200: '#F0C9AC',
          100: '#F7E3D4',
          50: '#FDF7F2',
        },
        'copper-text': '#8C4E28',
        'copper-glow': '#B26A3C',
        // Antique Brass Gold (borders, dividers, rules; text only on patina, never on parchment)
        brass: {
          DEFAULT: '#B8964F',   // Antique Brass Gold — borders, dividers
          muted: 'rgba(184, 150, 79, 0.35)',
          bright: '#D4B36A',
          800: '#6B5424',
          700: '#8A6E30',
          600: '#9E7E38',
          500: '#B8964F',
          400: '#CFB26F',
          300: '#E0CA94',
          200: '#EFE2BE',
          100: '#F7F1DF',
          50: '#FBF9F2',
        },
        // Parchment (light page background, never pure white)
        parchment: {
          DEFAULT: '#EFE4CF',   // light page background
          deep: '#E5D8BE',      // hover / inset
          900: '#82745C',
          800: '#A49579',
          700: '#C0B397',
          600: '#D5C9AE',
          500: '#E5D8BE',
          400: '#EFE4CF',
          300: '#F4EBD9',
          200: '#F7F0E1',
          100: '#FAF6ED',
          50: '#FDFBF7',
        },
        // Aged Ivory (card surfaces, text on patina)
        ivory: {
          DEFAULT: '#FAF4E8',   // card surfaces
          soft: '#F7F0E1',      // alternate card
        },
        // Walnut Ink (primary text on light, never harsh black)
        walnut: {
          DEFAULT: '#2A1A12',   // primary text on light
          950: '#1B110B',
          900: '#2A1A12',
          800: '#3E281C',
          700: '#5A3D2D',
          600: '#755440',
        },
        // Sage Green (success, NABL assay pass, in-stock)
        sage: {
          DEFAULT: '#4E6E58',   // success, in-stock
          light: '#6B8A73',
          900: '#263B2C',
          800: '#36533F',
          700: '#4E6E58',
          600: '#658B70',
          50: '#EDF5EE',
        },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'var(--font-cormorant)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'Cambria', 'serif'],
        body: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-tiro-devanagari)', 'var(--font-noto-devanagari)', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        atelier: '0.18em',
      },
      backgroundImage: {
        'patina-sheen': 'radial-gradient(ellipse at top, #1A423B 0%, #12302B 55%, #0B1F1C 100%)',
        'burnished-gradient': 'linear-gradient(135deg, #B26A3C 0%, #CA7E4D 50%, #8C4E28 100%)',
        'brass-gradient': 'linear-gradient(135deg, #B8964F 0%, #CFB26F 50%, #8A6E30 100%)',
        'parchment-sheen': 'linear-gradient(180deg, #F7F0E1 0%, #EFE4CF 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
