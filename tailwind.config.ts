import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        border: {
          DEFAULT: "hsl(var(--border))",
          hover: "hsl(var(--border-hover))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          focus: "hsl(var(--input-focus))",
        },
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--destructive-light))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          hover: "hsl(var(--muted-hover))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent-light))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
          foreground: "hsl(var(--warning-foreground))",
        },
        hot: {
          DEFAULT: "hsl(var(--hot))",
          foreground: "hsl(var(--hot-foreground))",
        },
        discount: {
          DEFAULT: "hsl(var(--discount))",
          foreground: "hsl(var(--discount-foreground))",
        },
        rating: {
          DEFAULT: "hsl(var(--rating))",
          empty: "hsl(var(--rating-empty))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-background': 'var(--gradient-background)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'elegant': 'var(--shadow-lg)',
        'hover': 'var(--shadow-hover)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
            opacity: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: {
            height: "0",
            opacity: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "pulse": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
