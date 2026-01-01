import { defineConfig } from 'astro/config';

export default defineConfig({
  // Profile page specific optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'profile-core': ['src/components/ProfileCard.astro'],
          'profile-interactive': ['src/components/qwik/ShareProfile.tsx', 'src/components/qwik/StatsGrid.tsx'],
          'profile-advanced': ['src/components/qwik/ContributionGraph.tsx']
        }
      }
    }
  },
  
  // Prerender profile pages for better performance
  output: 'static',
  
  // Optimize images and assets
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
});
