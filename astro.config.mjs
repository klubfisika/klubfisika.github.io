// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import qwikdev from '@qwikdev/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://klubfisika.github.io',
  integrations: [mdx(), sitemap(), qwikdev()],

  vite: {
    plugins: [tailwindcss()],
  },
});