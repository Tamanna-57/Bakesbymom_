import type { Meta, StoryObj } from '@storybook/react-vite';
import { DOODLES, Doodle } from '@bakesbymom/ui';

const meta = {
  title: 'Brand/Doodles',
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
          'Hand-drawn doodles in one cocoa-ink style with pastel fills. They are decorative by default (hidden from screen readers); pass `title` when a doodle carries meaning.',
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
          <Doodle name={name} size={name === 'squiggle' ? 120 : 56} />
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
        '--bbm-color-cocoa-900',
        '--bbm-color-blueberry-500',
        '--bbm-color-pistachio-600',
        '--bbm-color-caramel-500',
      ].map((c) => (
        <Doodle key={c} name="sparkle" size={44} color={`var(${c})`} />
      ))}
    </div>
  ),
};
