import type { Meta, StoryObj } from '@storybook/react-vite';
import { JournalSection } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Journal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 01 (Berloga), the blog row.** Arch-shaped frames with cocoa outlines and offset shadows.',
          ['01'],
          'journal.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <JournalSection /> };
