import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceTag, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Ephemera/PriceTag',
  component: PriceTag,
  args: { amount: '$38', label: '6 inch cake', shape: 'flower', tone: 'butter', size: 132, rotate: 0 },
  argTypes: {
    shape: { control: 'inline-radio', options: ['flower', 'cloud', 'circle', 'tag'] },
    tone: { control: 'select', options: TONES },
    size: { control: { type: 'range', min: 80, max: 220, step: 4 } },
    rotate: { control: { type: 'range', min: -15, max: 15, step: 1 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Playful shaped prices for packages, events and boxes: flower and cloud (Nectar), coin, and the hotel key tag (Taplink). The price stays real, readable text. Use plain `ProductCard` prices for everyday menu items.',
      },
    },
  },
} satisfies Meta<typeof PriceTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Flower: Story = {};

export const EventPackages: Story = {
  render: () => (
    <div className="sb-stack" style={{ gap: 28 }}>
      <PriceTag amount="$180" label="Dessert table" shape="flower" tone="caramel" rotate={-6} />
      <PriceTag amount="$4" label="Per guest" shape="flower" tone="cherry" />
      <PriceTag amount="$25" label="Per added dozen" shape="cloud" tone="strawberry" rotate={5} />
      <PriceTag amount="$12" label="Delivery" shape="circle" tone="blueberry" size={112} />
    </div>
  ),
};

export const KeyTag: Story = {
  args: { shape: 'tag', amount: '$29/mo', label: 'Bake club', tone: 'strawberry', size: 96, rotate: -8 },
};
