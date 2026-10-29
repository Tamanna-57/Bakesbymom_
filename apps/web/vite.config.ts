import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The Cloudflare Worker that serves the bakesbymom D1 catalog and its R2 photos. On Vercel, vercel.json rewrites
// /api to it; here the dev and preview servers proxy it, so the site reads the same database either way.
const api = { target: 'https://bakesbymom.snehagupta.workers.dev', changeOrigin: true };

// The website uses the built packages (`npm run build` at the repo root first), like any consumer would.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': api } },
  preview: { proxy: { '/api': api } },
});
