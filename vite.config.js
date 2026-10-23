// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Makes asset paths relative so both Cloudflare and Mobile work out of the box
  build: {
    outDir: 'dist',
  }
});