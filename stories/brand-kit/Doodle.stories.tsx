import type { Meta, StoryObj } from '@storybook/react-vite';
import { DOODLES, Doodle } from '@bakesbymom/ui';

const meta = {
  title: 'Brand kit/Doodles',
  component: Doodle,
  args: { name: 'cherry', size: 64, color: 'var(--bbm-color-cherry-500)' },
  argTypes: {
    name: { control: 'select', options: DOODLES },
    size: { control: { type: 'range', min: 16, max: 160, step: 4 } },
    color: { control: 'text' },
    accent: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          "One cocoa line, flat palette fills, round caps: the candy doodles of pin 15, the sparkles of pins 01 and 11, the line icons of 06 and 07. `cherries-halftone` is pin 16's print-like illustration, the one large illustration style. Decorative by default (hidden from screen readers); pass `title` when a doodle carries meaning.",
      },
    },
  },
} satisfies Meta<typeof Doodle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const FullSet: Story = {
  render: () => (
    <div className="sb-stack" style={{ gap: 28 }}>
      {DOODLES.map((name) => (
        <figure key={name} style={{ margin: 0, textAlign: 'center', color: 'var(--bbm-color-cherry-500)' }}>
          <Doodle
            name={name}
            size={name === 'squiggle' ? 120 : name === 'arrow' ? 96 : name === 'cherries-halftone' ? 88 : 56}
          />
          <figcaption className="sb-note">{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

export const InkColors: Story = {
  render: () => (
    <div className="sb-stack" style={{ gap: 20 }}>
      {[
        '--bbm-color-cherry-500',
        '--bbm-color-cherry-700',
        '--bbm-color-brown-900',
        '--bbm-color-blue-500',
        '--bbm-color-pink-400',
        '--bbm-color-brown-400',
      ].map((c) => (
        <Doodle key={c} name="sparkle" size={44} color={`var(${c})`} />
      ))}
    </div>
  ),
};
