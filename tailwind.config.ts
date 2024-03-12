import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          50: '#AEAEAE',
          200: '#1E1E1E',
          900: '#323232',
        },
        green: {
          50: '#00CF79',
          100: '#00D074',
          200: '#202827',
          300: '#25312F',
        },
        white: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#FBFBFB',
        },
        red: {
          100: '#D00000',
        },
        yellow: {
          100: '#F79E1B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
