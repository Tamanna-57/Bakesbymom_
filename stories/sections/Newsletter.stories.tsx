import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Newsletter',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 03 (Emily Jane).** A paper card with a tilted sticker on its corner, on a dotted butter band with a scalloped top edge. The one-line bar from **pin 15** is shown under the weekly schedule and on the NewsletterSignup docs.',
          ['03', '15'],
          'newsletter.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <NewsletterSection /> };
