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
        canvas: { name: 'Canvas (cream-100)', value: '#fdf6e9' },
        surface: { name: 'Surface (cream-50)', value: '#fffcf6' },
        blush: { name: 'Blush (strawberry-100)', value: '#fce7e7' },
        sky: { name: 'Sky (blueberry-100)', value: '#e4eef5' },
        butter: { name: 'Butter (butter-100)', value: '#fff5cf' },
        cocoa: { name: 'Cocoa (inverse)', value: '#3a1e17' },
      },
    },
    docs: { theme, toc: { headingSelector: 'h2, h3' } },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Shape', 'Patterns & Decoration'],
          'Brand',
          'Components',
          'Pages',
          'References',
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'canvas' },
  },
};

export default preview;
