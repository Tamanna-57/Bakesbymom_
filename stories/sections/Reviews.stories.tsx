import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewsSection } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Reviews',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 01 (Berloga).** Scalloped cards with a cocoa outline and offset shadow, each with a name, a short quote, stars spoken as "Rated 5 out of 5" and what they bought, under a handwritten pill label.',
          ['01', '07', '12'],
          'reviews.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <ReviewsSection /> };
