import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#FFF7E9',
        ink: '#000000',
        'ink-soft': '#111111',
        brand: '#F66F00',
        'logo-blue': '#144E80',
        'logo-blue-hover': '#0F3D66',
        'brand-deep': '#4C2806',
        sun: '#FCCC3C',
        sky: '#BED5FF',
        violet: '#321F61',
        cream: '#DACAB6',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'sans-serif'],
      },
      fontSize: {
        '10': ['10px', '1.4'],
        '11': ['11px', '1.45'],
        '12': ['12px', '1.5'],
        '14': ['14px', '1.45'],
        '16': ['16px', '1.5'],
        '18': ['18px', '1.45'],
        '20': ['20px', '1.35'],
        '24': ['24px', '1.25'],
        '28': ['28px', '1.06'],
        '36': ['36px', '1.15'],
        '50': ['50px', '1.15'],
        '64': ['64px', '1.12'],
        '85': ['85px', '1.16'],
        '120': ['120px', '1.22'],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem' },
      maxWidth: { content: '1440px' },
      transitionTimingFunction: { smooth: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
export default config;
