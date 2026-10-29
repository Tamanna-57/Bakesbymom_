import type { Preview } from '@storybook/react-vite';
import '@bakesbymom/tokens/css';
import '../packages/ui/src/styles.css';
import './preview.css';
import { loadCatalog } from '../apps/web/src/content/catalog';
import theme from './theme';

// The cakes come from the bakesbymom D1 catalog, as on the website: load it before any story reads it.
await loadCatalog();

// The page base (canvas, ink, body type) for every story and docs page.
document.body.classList.add('bbm-theme');

// Website links (/menu, /#custom) point at pages of apps/web; inside Storybook they'd load a missing page.
document.addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href^="/"]') : null;
  if (link) event.preventDefault();
});

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: { color: /(background|color)$/i },
    },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas (beige-50)', value: '#fbf7ef' },
        surface: { name: 'Paper', value: '#fffdf6' },
        beige: { name: 'Beige (beige-200)', value: '#ece3c6' },
        blue: { name: 'Baby blue (blue-200)', value: '#c4d7e8' },
        pink: { name: 'Baby pink (pink-200)', value: '#f5d7d5' },
        cocoa: { name: 'Cocoa (brown-900)', value: '#32180b' },
      },
    },
    docs: { theme, toc: { headingSelector: 'h2, h3' } },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Brand kit',
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Shape', 'Patterns & Decoration'],
          'Board',
          'Sections',
          'Components',
          'Pages',
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'canvas' },
  },
};

export default preview;
