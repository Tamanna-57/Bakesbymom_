import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewCard } from '@bakesbymom/ui';
import { reviews } from '../assets/site';

const meta = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
  parameters: {
    docs: {
      description: {
        component:
          'Pin 01\'s review cards: scalloped edges, a cocoa outline and offset shadow, the name in caps, a short quote, stars spoken as "Rated 5 out of 5" and what they bought in handwriting. Reviews must be real, with permission.',
      },
    },
  },
  args: reviews[0]!,
  decorators: [(Story) => <div style={{ width: 260 }}>{Story()}</div>],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pink: Story = {};
export const Blue: Story = { args: reviews[1]! };
export const Butter: Story = { args: reviews[2]! };
