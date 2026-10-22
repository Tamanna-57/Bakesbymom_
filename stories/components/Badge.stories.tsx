import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Doodle, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Primitives/Badge',
  component: Badge,
  args: { children: 'Bestseller', tone: 'cherry', variant: 'soft', shape: 'pill', size: 'md' },
  argTypes: {
    tone: { control: 'select', options: TONES },
    variant: { control: 'inline-radio', options: ['soft', 'solid', 'outline'] },
    shape: { control: 'inline-radio', options: ['pill', 'tape', 'tab'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Labels for status and category: "Bestseller", "New", "Gluten-free", dates. `tape` is the stamped mono label (Sunday Brunch date tape, the pastry guide\'s "IMPORTANT"); `tab` is the edge offer tab (Bolo de Morango).',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllTones: Story = {
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
  render: (args) => (
    <div className="sb-stack">
      <Badge {...args} icon={<Doodle name="star" />}>
        Bestseller
      </Badge>
      <Badge {...args} shape="tape" variant="solid">
        Sat 16 Nov · 9am
      </Badge>
      <Badge {...args} shape="tab" variant="solid" tone="butter">
        10% off this weekend
      </Badge>
    </div>
  ),
};

export const DietaryTags: Story = {
  render: () => (
    <div className="sb-stack">
      <Badge tone="pistachio" size="sm">
        Gluten-free option
      </Badge>
      <Badge tone="butter" size="sm">
        Contains nuts
      </Badge>
      <Badge tone="blueberry" size="sm">
        Dairy-free
      </Badge>
      <Badge tone="lavender" size="sm">
        Vegan on request
      </Badge>
    </div>
  ),
};
