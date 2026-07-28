// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://astraltechacademy.github.io',
  base: 'beve-astro-web',
  vite: {
    plugins: [tailwindcss()]
  },
});