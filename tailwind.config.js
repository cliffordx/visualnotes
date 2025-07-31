/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* light gray */
        input: "var(--color-input)", /* pure white */
        ring: "var(--color-ring)", /* sage green */
        background: "var(--color-background)", /* warm off-white */
        foreground: "var(--color-foreground)", /* deep charcoal */
        primary: {
          DEFAULT: "var(--color-primary)", /* sage green */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* neutral gray */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* controlled red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* very light gray */
          foreground: "var(--color-muted-foreground)", /* medium gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* deeper emerald */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* pure white */
          foreground: "var(--color-popover-foreground)", /* deep charcoal */
        },
        card: {
          DEFAULT: "var(--color-card)", /* pure white */
          foreground: "var(--color-card-foreground)", /* deep charcoal */
        },
        success: {
          DEFAULT: "var(--color-success)", /* fresh green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm amber */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* controlled red */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* pure white */
        'text-primary': "var(--color-text-primary)", /* deep charcoal */
        'text-secondary': "var(--color-text-secondary)", /* medium gray */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'heading-xl': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        'heading-lg': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'nav': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'nav-project': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
      },
      spacing: {
        'sidebar': '280px',
        'sidebar-padding': '24px',
        'content-margin': '32px',
        'nav-item': '40px',
        'nav-spacing': '12px',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.10)',
        'elevation-3': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        'sidebar': '100',
        'dropdown': '200',
        'overlay': '150',
        'backdrop': '140',
        'modal': '1000',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}