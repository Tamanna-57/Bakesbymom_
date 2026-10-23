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
  args: { amount: '₹1,050', label: 'cakes from', shape: 'scallop', tone: 'pink', size: 128 },
} satisfies Meta<typeof PriceTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Pin 15's three shapes. */
export const EventPricing: Story = {
  render: () => (
    <div className="sb-stack">
      <PriceTag shape="scallop" tone="pink" amount="₹1,050" label="cakes from" size={128} rotate={-4} />
      <PriceTag shape="flower" tone="cherry" amount="½–3 kg" label="any size" size={128} rotate={3} />
      <PriceTag shape="cloud" tone="blue" amount="₹700" label="per pound from" size={128} rotate={-2} />
    </div>
  ),
};

/** Pin 08's key tags. */
export const KeyTags: Story = {
  render: () => (
    <div className="sb-stack">
      <PriceTag shape="tag" tone="blue" amount="₹1,350" size={56} />
      <PriceTag shape="tag" tone="cherry" amount="₹3,200" size={56} rotate={-8} />
    </div>
  ),
};

/** Pin 08's package card, with the key tag hanging off the corner. */
export const PackageCard: Story = {
  render: () => (
    <div style={{ width: 320, paddingTop: 24 }}>
      <PricingCard
        title="1 kg · 2 pound"
        price="from ₹1,350"
        features={['About 8–10 slices', 'The usual birthday size', 'Photo print or name plaque']}
        action={<Button fullWidth>See the cakes</Button>}
      />
    </div>
  ),
};
