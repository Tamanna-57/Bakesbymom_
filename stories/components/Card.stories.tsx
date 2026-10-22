import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Card, TONES } from '@bakesbymom/ui';

const Body = ({
  title = 'Custom celebration cakes',
  text = 'Tell Mom the flavor, the colors and the name. She’ll sketch it and send you a quote within a day.',
}) => (
  <>
    <h3 className="bbm-text-heading-md" style={{ margin: '0 0 8px' }}>
      {title}
    </h3>
    <p className="bbm-text-body-md" style={{ margin: 0 }}>
      {text}
    </p>
  </>
);

const meta = {
  title: 'Components/Surfaces/Card',
  component: Card,
  args: { tone: 'paper', fill: 'soft', padding: 'md', shape: 'rounded', frame: 'none', children: <Body /> },
  argTypes: {
    tone: { control: 'select', options: ['paper', ...TONES] },
    fill: { control: 'inline-radio', options: ['soft', 'solid'] },
    outline: { control: 'select', options: [false, true, 'brand'] },
    shape: { control: 'inline-radio', options: ['rounded', 'scallop'] },
    frame: { control: 'inline-radio', options: ['none', 'stripes'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The surface everything sits on. Depth comes from cream-to-pastel steps, cocoa outlines and hard sticker shadows, never blur. `shape="scallop"` cuts cookie edges (Berloga). `frame="stripes"` adds the airmail border (Pretty OK). `outline="brand"` is the heavy cherry frame (SugarLace).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paper: Story = {};

export const Sticker: Story = { args: { sticker: true, tone: 'butter' } };

export const Scalloped: Story = { args: { shape: 'scallop', sticker: true, tone: 'strawberry' } };

export const AirmailFrame: Story = {
  args: {
    frame: 'stripes',
    tone: 'butter',
    rotate: -2,
    children: (
      <Body
        title="Meet Mom"
        text="Thirty years of birthday cakes, one very loved recipe box, and a kitchen that always smells like butter."
      />
    ),
  },
};

export const BrandFrame: Story = { args: { outline: 'brand', padding: 'lg' } };

export const Tones: Story = {
  decorators: [
    (Story) => (
      <div className="sb-frame">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="sb-grid">
      {TONES.map((tone) => (
        <Card key={tone} {...args} tone={tone} outline>
          <Body title={tone} text="fg tokens on the soft tone background." />
        </Card>
      ))}
      {(['cocoa', 'pistachio', 'cherry'] as const).map((tone) => (
        <Card key={`${tone}-solid`} {...args} tone={tone} fill="solid">
          <Body title={`${tone} · solid`} text="on-solid text on the solid fill." />
          <div style={{ marginTop: 12 }}>
            <Button size="sm" variant="secondary">
              Learn more
            </Button>
          </div>
        </Card>
      ))}
    </div>
  ),
};
