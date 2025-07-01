import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Personnalisations spécifiques au Token Creator si nécessaire
      // Par exemple, des couleurs ou des polices différentes
      // Ou hériter/étendre un thème global du monorepo
    },
  },
  plugins: [],
};
export default config;
