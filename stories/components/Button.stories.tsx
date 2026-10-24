import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button, Doodle } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Primitives/Button',
  component: Button,
  args: {
    children: 'Order a cake',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'soft', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['pill', 'circle'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Pill buttons, as on every pin. Bold sentence case, like pin 16\'s "Order a cake". **Primary (deep cherry, pins 08 and 16) is the one filled action color: use one per view.** `sticker` adds the cocoa outline and a hard shadow that presses in (pin 01). Pass `href` to render a link.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Button {...args} variant="primary">
        Order a cake
      </Button>
      <Button {...args} variant="secondary">
        See the menu
      </Button>
      <Button {...args} variant="soft">
        Add to box
      </Button>
      <Button {...args} variant="ghost">
        Allergen info
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Sticker: Story = {
  args: { sticker: true, variant: 'soft', children: 'Join the bake club' },
  parameters: {
    docs: {
      description: {
        story: 'Hover lifts the sticker, and a press pushes it into the page (pin 01).',
      },
    },
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Button {...args} leadingIcon={<Doodle name="heart" />}>
        Save for later
      </Button>
      <Button {...args} variant="secondary" trailingIcon={<span>→</span>}>
        Continue to pick-up
      </Button>
      <Button
        {...args}
        variant="secondary"
        shape="circle"
        aria-label="Add a cupcake"
        leadingIcon={<Doodle name="cupcake" />}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="sb-stack">
      <Button loading>Placing order</Button>
      <Button variant="secondary" loading>
        Saving
      </Button>
      <Button disabled>Sold out</Button>
      <Button variant="secondary" disabled>
        Sold out
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  args: { href: '#menu', variant: 'secondary', children: 'See this week’s menu' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, size: 'lg', children: 'Order on WhatsApp' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
