import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Fonts load from Google Fonts in index.html.
import 'lenis/dist/lenis.css';
import '@bakesbymom/ui/styles.css';
import './site.css';
import { App } from './App';
import { loadCatalog } from './content/catalog';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

// The pages render from catalog.json and pick up the live catalog from D1 when it lands.
void loadCatalog();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
