import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ticket, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Ticket',
  component: Ticket,
  args: { variant: 'ticket', tone: 'blue', fill: 'soft', outline: true },
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
          "Paper ephemera. `ticket` is pin 10's membership ticket: side notches and a tear-off stub with vertical text (the Bake Club perks, gift cards, thank-you cards). `stamp` is the perforated edge of pin 08's notes and pin 16's \"How do I place an order?\" card (and the chat's opening card).",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 460 }}>{Story()}</div>],
} satisfies Meta<typeof Ticket>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 10. */
export const ClubPerks: Story = {
  args: {
    stub: 'June ’26',
    children: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
          Bake Club · member perks
        </p>
        <ul style={{ margin: 0, paddingInlineStart: 20, lineHeight: 1.6 }}>
          <li>A box of 4 seasonal treats</li>
          <li>First pick of holiday orders</li>
          <li>Mom's recipe card every month</li>
        </ul>
      </div>
    ),
  },
};

export const GiftCard: Story = {
  args: {
    tone: 'pink',
    stub: 'Gift · on Mom',
    children: (
      <div style={{ display: 'grid', gap: 6 }}>
        <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
          Gift card
        </p>
        <p className="bbm-text-heading-md" style={{ margin: 0 }}>
          A dozen cookies, on Mom
        </p>
        <p className="bbm-text-price" style={{ margin: 0 }}>
          $14
        </p>
      </div>
    ),
  },
};

/** Pin 16's order card. */
export const OrderSteps: Story = {
  args: {
    variant: 'stamp',
    tone: 'beige',
    children: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p className="bbm-text-script-sm" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
          How do I order?
        </p>
        <p style={{ margin: 0 }}>
          <strong>Step 1:</strong> Pick the cake and filling, or ask for a custom design.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Step 2:</strong> Choose the date and how many people.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Step 3:</strong> Mom confirms by email with the pick-up time.
        </p>
      </div>
    ),
  },
};
