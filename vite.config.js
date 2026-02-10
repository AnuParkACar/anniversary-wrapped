import { defineConfig } from 'vite';

export default defineConfig({
  // Base URL for GitHub Pages deployment
  // Change 'anniversary-wrapped' to your actual repository name
  base: '/anniversary-wrapped/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  
  server: {
    port: 3000,
    open: true,
  },
});
