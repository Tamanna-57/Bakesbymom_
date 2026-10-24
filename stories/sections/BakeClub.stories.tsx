import type { Meta, StoryObj } from '@storybook/react-vite';
import { BakeClubSection } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Bake Club',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 01 (Berloga), the loyalty band.** A pink band with outlined scallops top and bottom, a mascot doodle on the edge, a letter from Mom and the membership **ticket from pin 10**.',
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
export const Lead: Story = { render: () => <BakeClubSection /> };
