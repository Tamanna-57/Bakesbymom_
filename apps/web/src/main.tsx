import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Fonts load from Google Fonts in index.html.
import 'lenis/dist/lenis.css';
import '@bakesbymom/ui/styles.css';
import './site.css';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
