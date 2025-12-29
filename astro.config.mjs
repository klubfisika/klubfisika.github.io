import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import qwikdev from '@qwikdev/astro';
import { rehypeTaskListLabel } from './src/plugins/rehype-task-list-label.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://klubfisika.github.io',
  integrations: [mdx(), sitemap(), qwikdev()],
  markdown: {
    rehypePlugins: [rehypeTaskListLabel]
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'fix-invalid-selectors',
            Rule(rule) {
              // Remove invalid :visible:is() selectors
              if (rule.selector && rule.selector.includes(':visible:is()')) {
                rule.remove();
              }
            }
          }
        ]
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        '@assets': '/src/assets',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@styles': '/src/styles',
        '@scripts': '/src/scripts',
        '@types': '/src/types',
        '@data': '/src/data',
        '@ui': '/src/components/ui',
        '@blog': '/src/components/blog',
        '@sections': '/src/components/sections'
      }
    }
  },
  image: {
    domains: ['localhost'],
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80
  },
  // Add TinaCMS admin route
  output: 'static',
  adapter: undefined
});