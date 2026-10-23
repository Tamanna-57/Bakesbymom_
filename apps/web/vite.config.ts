import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The website uses the built packages (`npm run build` at the repo root first), like any consumer would.
export default defineConfig({
  plugins: [react()],
});
