import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import { PATTERNS, PatternSurface, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Surfaces/PatternSurface',
  component: PatternSurface,
  args: { pattern: 'stripes', tone: 'strawberry', scale: 'md' },
  argTypes: {
    pattern: { control: 'inline-radio', options: PATTERNS },
    tone: { control: 'select', options: TONES },
    scale: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    ground: { control: 'color' },
    as: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Paints a signature pattern from tokens: cabana stripes, pinstripes, gingham, checkerboard, graph paper or polka dots. Pure CSS, any size, any tone. Use it for backdrops, bands and frames, never behind paragraphs.',
      },
    },
  },
  render: (args) => (
    <PatternSurface
      {...args}
      style={{ width: 420, height: 220, borderRadius: 20, border: '1.5px solid var(--bbm-color-border-default)' }}
    />
  ),
} satisfies Meta<typeof PatternSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CabanaStripes: Story = { args: { pattern: 'stripes', tone: 'blueberry' } };
export const Pinstripe: Story = { args: { pattern: 'pinstripe', tone: 'strawberry' } };
export const Gingham: Story = { args: { pattern: 'gingham', tone: 'cherry' } };
export const Checkerboard: Story = { args: { pattern: 'checker', tone: 'cherry', scale: 'sm' } };
export const GraphPaper: Story = { args: { pattern: 'grid', tone: 'strawberry' } };
export const PolkaDots: Story = { args: { pattern: 'dots', tone: 'cocoa', ground: 'var(--bbm-color-blueberry-200)' } };

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `120px repeat(${PATTERNS.length}, 1fr)`,
        gap: 8,
        alignItems: 'center',
      }}
    >
      <span />
      {PATTERNS.map((p) => (
        <span key={p} className="sb-note">
          {p}
        </span>
      ))}
      {TONES.map((tone) => (
        <Fragment key={tone}>
          <span className="sb-note">{tone}</span>
          {PATTERNS.map((pattern) => (
            <PatternSurface
              key={pattern}
              pattern={pattern}
              tone={tone}
              scale="sm"
              style={{ height: 64, borderRadius: 10, border: '1px solid var(--bbm-color-border-subtle)' }}
            />
          ))}
        </Fragment>
      ))}
    </div>
  ),
};
