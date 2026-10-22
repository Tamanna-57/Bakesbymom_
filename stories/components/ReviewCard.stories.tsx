import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewCard, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Content/ReviewCard',
  component: ReviewCard,
  args: {
    quote: 'The strawberry cake tasted exactly like the one my grandmother used to make. Not a crumb left.',
    author: 'Priya S.',
    detail: 'Strawberry layer cake · May',
    rating: 5,
    tone: 'strawberry',
    shape: 'scallop',
    sticker: true,
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    shape: { control: 'inline-radio', options: ['scallop', 'rounded'] },
    rating: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Customer reviews on cookie-edged sticker cards (Berloga). The star rating is announced in words ("Rated 5 out of 5").',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scalloped: Story = {};

export const Rounded: Story = { args: { shape: 'rounded', tone: 'butter', sticker: false, outline: true } };

export const Row: Story = {
  decorators: [
    (Story) => (
      <div className="sb-frame">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <ul className="sb-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <ReviewCard {...args} as="li" />
      <ReviewCard
        {...args}
        as="li"
        tone="blueberry"
        quote="Ordered cupcakes for my son’s class. Twenty-four kids, zero leftovers."
        author="Marcus T."
        detail="Birthday cupcakes"
      />
      <ReviewCard
        {...args}
        as="li"
        tone="butter"
        quote="The cinnamon rolls are dangerous. We pre-order every Saturday now."
        author="Ana & Luis"
        detail="Cinnamon rolls"
      />
      <ReviewCard
        {...args}
        as="li"
        tone="pistachio"
        quote="She made a gluten-free version of my wedding cake and nobody could tell."
        author="Hannah K."
        detail="Custom cake"
      />
    </ul>
  ),
};
