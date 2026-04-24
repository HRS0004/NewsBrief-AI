/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          100: '#DBE8FE',
          200: '#BFCFFE',
          300: '#93ADFD',
          400: '#6084FA',
          500: '#3B5FF5',
          600: '#1A3FEA',
          700: '#1A32D7',
          800: '#1C2BAF',
          900: '#1C2A8A',
          950: '#161C54',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          raised: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
          faint: '#CBD5E1',
        },
        emerald: {
          50: '#ECFDF5',
          600: '#059669',
          700: '#047857',
        },
        rose: {
          50: '#FFF1F2',
          600: '#E11D48',
          700: '#BE123C',
        },
        amber: {
          50: '#FFFBEB',
          500: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 4px rgba(15, 23, 42, 0.04)',
        'soft': '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'soft-md': '0 4px 16px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 8px 32px rgba(15, 23, 42, 0.10), 0 2px 8px rgba(15, 23, 42, 0.06)',
        'soft-xl': '0 16px 48px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)',
        'brand-glow': '0 4px 24px rgba(59, 95, 245, 0.25), 0 2px 8px rgba(59, 95, 245, 0.15)',
        'brand-glow-lg': '0 8px 40px rgba(59, 95, 245, 0.30), 0 4px 16px rgba(59, 95, 245, 0.18)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'pulse-soft': 'pulseSoft 3s infinite ease-in-out',
        'gradient-shift': 'gradientShift 8s infinite ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
