import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Library build: one ESM bundle with React left external. Types come from
// `tsc -p tsconfig.build.json` and CSS from `scripts/build-css.mjs`.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
