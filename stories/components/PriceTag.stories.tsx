import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceTag, PricingCard, Button } from '@bakesbymom/ui';

const meta = {
  title: 'Components/PriceTag',
  component: PriceTag,
  parameters: {
    docs: {
      description: {
        component:
          "Prices as playful shapes. Pin 15 prices its events with a **scalloped square**, a **flower** and a **cloud**; pin 08 hangs **key tags** off its pricing cards. The amount is real text, so it's read normally.",
      },
    },
  },
  args: { amount: '$45', label: '6-inch cake', shape: 'scallop', tone: 'pink', size: 128 },
} satisfies Meta<typeof PriceTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Pin 15's three shapes. */
export const EventPricing: Story = {
  render: () => (
    <div className="sb-stack">
      <PriceTag shape="scallop" tone="pink" amount="$45" label="6-inch cake" size={128} rotate={-4} />
      <PriceTag shape="flower" tone="cherry" amount="$4" label="per cupcake" size={128} rotate={3} />
      <PriceTag shape="cloud" tone="blue" amount="$15" label="custom message" size={128} rotate={-2} />
    </div>
  ),
};

/** Pin 08's key tags. */
export const KeyTags: Story = {
  render: () => (
    <div className="sb-stack">
      <PriceTag shape="tag" tone="blue" amount="$45" size={56} />
      <PriceTag shape="tag" tone="cherry" amount="$140" size={56} rotate={-8} />
    </div>
  ),
};

/** Pin 08's package card, with the key tag hanging off the corner. */
export const PackageCard: Story = {
  render: () => (
    <div style={{ width: 320, paddingTop: 24 }}>
      <PricingCard
        title="Party cake"
        price="$70"
        features={['8-inch, 3 layers', 'Serves 16–20', 'Piped flowers or sprinkles']}
        action={<Button fullWidth>Choose this cake</Button>}
      />
    </div>
  ),
};
