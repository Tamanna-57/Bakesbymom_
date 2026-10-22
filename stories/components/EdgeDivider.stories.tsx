import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Doodle, EDGE_SHAPES, EdgeDivider } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Surfaces/EdgeDivider',
  component: EdgeDivider,
  args: {
    shape: 'scallop',
    size: 'md',
    color: 'var(--bbm-color-bg-blush)',
    background: 'var(--bbm-color-bg-canvas)',
    flip: false,
    outline: false,
  },
  argTypes: {
    shape: { control: 'inline-radio', options: EDGE_SHAPES },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'text' },
    altColor: { control: 'text' },
    background: { control: 'text' },
    outline: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Decorative section edges: scallops (Berloga, Emily Jane), waves (Lilli Pilli), zigzags, torn paper (Taplink), an awning (strawberry poster, Lilli Pilli) and half-dot trim (Pretty OK). Set `color` to the section above and `background` to the section below. They are hidden from assistive technology.',
      },
    },
  },
  render: (args) => (
    <div>
      <div style={{ height: 80, background: args.color }} />
      <EdgeDivider {...args} />
      <div style={{ height: 60 }} />
    </div>
  ),
} satisfies Meta<typeof EdgeDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scallop: Story = { args: { outline: true } };
export const Wave: Story = { args: { shape: 'wave', color: 'var(--bbm-color-caramel-300)' } };
export const Zigzag: Story = { args: { shape: 'zigzag', color: 'var(--bbm-color-bg-sky)' } };
export const TornPaper: Story = { args: { shape: 'torn', color: 'var(--bbm-color-cream-300)', size: 'lg' } };
export const Awning: Story = {
  args: { shape: 'awning', size: 'lg', color: 'var(--bbm-color-cherry-600)', altColor: 'var(--bbm-color-cream-50)' },
  render: (args) => (
    <div>
      <EdgeDivider {...args} />
      <div style={{ height: 60 }} />
    </div>
  ),
};
export const PolkaTrim: Story = {
  args: { shape: 'dots', color: 'var(--bbm-color-cocoa-900)', background: 'var(--bbm-color-blueberry-200)' },
};

export const StickerOnTheSeam: Story = {
  parameters: {
    docs: { description: { story: 'Use `.bbm-seam` to straddle a section edge with stickers (Stevie Kay).' } },
  },
  render: () => (
    <div>
      <div style={{ height: 100, background: 'var(--bbm-color-bg-inverse)' }} />
      <div style={{ position: 'relative', height: 120, background: 'var(--bbm-color-bg-blush)' }}>
        {[30, 50, 70].map((x, i) => (
          <span
            key={x}
            className="bbm-seam"
            style={
              {
                '--bbm-seam-x': `${x}%`,
                '--bbm-seam-rotate': `${(i - 1) * 12}deg`,
                color: 'var(--bbm-color-cherry-500)',
              } as CSSProperties
            }
          >
            <Doodle name="star" size={44} />
          </span>
        ))}
      </div>
    </div>
  ),
};
