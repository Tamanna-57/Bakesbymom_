import type { Preview } from '@storybook/react-vite';
import '@bakesbymom/tokens/css';
import '../packages/ui/src/styles.css';
import './preview.css';
import theme from './theme';

// The page base (canvas, ink, body type) for every story and docs page.
document.body.classList.add('bbm-theme');

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
