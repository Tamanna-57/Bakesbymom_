import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Doodle, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Short labels on photos and cards ("Bestseller", "New", "Sold out this week"). `pill` for tags, `tape` for a stamped label like the stickers on pin 07, `tab` for an offer tab. Every tone pairing is AA.',
      },
    },
  },
  args: { children: 'Bestseller', tone: 'cherry', variant: 'solid' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <div key={variant} className="sb-stack">
          {TONES.map((tone) => (
            <Badge key={tone} {...args} tone={tone} variant={variant}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="sb-stack">
      <Badge tone="cherry" variant="solid" icon={<Doodle name="heart" />}>
        Bestseller
      </Badge>
      <Badge tone="butter" variant="solid" shape="tape">
        Baked this morning
      </Badge>
      <Badge tone="blue" shape="tab">
        A day's notice
      </Badge>
    </div>
  ),
};
