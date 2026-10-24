import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Process',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 02 (Pretty OK Studios), "How it works".** Four stacked, slightly tilted cards in different flavor colors, each with a sticker, on wide stripes. Alternates (row, tabs, cards) are on the StepList component page.',
          ['02', '04', '08', '10'],
          'process.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: tilted cards on pink stripes. */
export const Lead: Story = { render: () => <ProcessSection /> };
