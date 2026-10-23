import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaqSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/FAQ',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 02 (Pretty OK Studios).** Two columns of pink question cards with sticker doodles, built on native details/summary, one open at a time per column. The pill style from pin 08 is on the Accordion component page.',
          ['02', '08', '01'],
          'faq.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <FaqSection /> };
