import type { Meta, StoryObj } from '@storybook/react-vite';
import { GiftSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Gifting band',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 01 (Berloga), the loyalty band**, used on the site for gifting. A pink band with outlined scallops top and bottom, a mascot doodle on the edge, a short note and **pin 10's ticket** listing the gift add-ons (gift wrapping, gift box, greeting card note).",
          ['01', '10', '15'],
          'bake-club.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <GiftSection /> };
