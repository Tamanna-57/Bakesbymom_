import type { Meta, StoryObj } from '@storybook/react-vite';
import { FindUsSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Find us',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 15 (Nectar), "Where to catch the cart this week".** A seven-day schedule on a notebook card inside the page\'s one bright cherry band, then the newsletter bar. Each day is a list item with a heading; today and closed days are said in words, not just color.',
          ['15', '06', '12'],
          'find-us.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: the weekly schedule and the newsletter bar on bright cherry. */
export const Lead: Story = { render: () => <FindUsSection /> };
