import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Ticket, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Ephemera/Ticket',
  component: Ticket,
  args: { variant: 'ticket', tone: 'blueberry', fill: 'soft', outline: true },
  argTypes: {
    variant: { control: 'inline-radio', options: ['ticket', 'stamp'] },
    tone: { control: 'select', options: TONES },
    fill: { control: 'inline-radio', options: ['soft', 'solid'] },
    children: { control: false },
    stub: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Paper ephemera from the Book Nook, SugarLace and Spring Bouquet references. `ticket` has side notches and an optional tear-off stub (gift cards, class seats, order summaries). `stamp` has a perforated postage edge (order steps, dates, "secure your seat").',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Ticket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GiftCard: Story = {
  args: {
    stub: 'Admit one · Nov ’26',
    children: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
          Gift card
        </p>
        <p className="bbm-text-heading-md" style={{ margin: 0 }}>
          A dozen cookies, on Mom
        </p>
        <p className="bbm-text-body-sm" style={{ margin: 0 }}>
          Redeem online or at the Saturday market stall.
        </p>
        <p className="bbm-text-price" style={{ margin: 0 }}>
          $14.00
        </p>
      </div>
    ),
  },
};

export const BakingClassSeat: Story = {
  args: {
    tone: 'strawberry',
    stub: 'Sun 8 Mar · 10am',
    children: (
      <div style={{ display: 'grid', gap: 6 }}>
        <p className="bbm-text-heading-md" style={{ margin: 0 }}>
          Cupcake <em className="bbm-script-word">workshop</em>
        </p>
        <ul className="bbm-text-body-sm" style={{ margin: 0, paddingInlineStart: 18 }}>
          <li>All ingredients and tools provided</li>
          <li>Take home a box of six</li>
        </ul>
      </div>
    ),
  },
};

export const Stamp: Story = {
  args: {
    variant: 'stamp',
    tone: 'caramel',
    rotate: -3,
    children: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p className="bbm-text-script-sm" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
          How to order
        </p>
        <ol className="bbm-text-body-sm" style={{ margin: 0, paddingInlineStart: 18, display: 'grid', gap: 4 }}>
          <li>
            <strong>Pick a cake</strong> from the menu, or ask for something custom.
          </li>
          <li>
            <strong>Choose a date</strong> at least 3 days ahead.
          </li>
          <li>
            <strong>Collect it warm</strong> on Saturday morning.
          </li>
        </ol>
        <Badge shape="tape" variant="solid" tone="cherry" size="sm">
          Order by Wednesday
        </Badge>
      </div>
    ),
  },
};
