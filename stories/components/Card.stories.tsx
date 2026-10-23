import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Card, Doodle, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'The board\'s paper objects. `outline` is the 1.5px cocoa sticker line; `sticker` adds the hard offset shadow (pins 01, 02, 05). `shape="scallop"` cuts cookie edges (pins 01, 15) and `"cloud"` big puffy bumps (pin 07). `frame="stripes"` is the candy-stripe border of the Meet Elia note (pin 05). `outline="brand"` is pin 16\'s thick cherry frame. `rotate` tilts it by hand (keep within ±3°).',
      },
    },
  },
  args: {
    outline: true,
    padding: 'md',
    children: (
      <>
        <p className="bbm-text-heading-md" style={{ margin: 0 }}>
          Made from scratch
        </p>
        <p style={{ margin: '8px 0 0' }}>No mixes, no shortcuts: flour, butter, sugar, time.</p>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 340 }}>{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paper: Story = {};

export const Sticker: Story = { args: { sticker: true, tone: 'pink' } };

export const Tones: Story = {
  decorators: [(Story) => <div style={{ width: 'min(960px, 90vw)' }}>{Story()}</div>],
  render: (args) => (
    <div className="sb-grid" style={{ '--sb-min': '12rem' } as CSSProperties}>
      {TONES.map((tone) => (
        <Card key={tone} {...args} tone={tone} fill={tone === 'cherry' || tone === 'brown' ? 'solid' : 'soft'}>
          <p className="bbm-text-heading-md" style={{ margin: 0, textTransform: 'capitalize' }}>
            {tone}
          </p>
        </Card>
      ))}
    </div>
  ),
};

/** Pins 01 and 15. */
export const Scallop: Story = { args: { shape: 'scallop', tone: 'pink', sticker: true } };

/** Pin 07's cloud text card. */
export const Cloud: Story = {
  args: {
    shape: 'cloud',
    outline: true,
    padding: 'lg',
    children: (
      <div style={{ textAlign: 'center' }}>
        <p className="bbm-text-eyebrow" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
          Many layers
        </p>
        <p className="bbm-text-heading-lg" style={{ margin: '6px 0 0' }}>
          Laminated by <span className="bbm-squiggle">hand</span>
        </p>
      </div>
    ),
  },
};

/** Pin 05's candy-stripe note, tilted. */
export const StripedNote: Story = { args: { frame: 'stripes', tone: 'cherry', rotate: -2, padding: 'lg' } };

/** Pin 16's thick cherry frame. */
export const BrandFrame: Story = {
  args: { outline: 'brand', padding: 'lg' },
  render: (args) => (
    <Card {...args}>
      <Doodle name="cherries-halftone" size={96} color="var(--bbm-color-cherry-700)" />
      <p className="bbm-text-heavy" style={{ margin: '8px 0 0', fontSize: 40 }}>
        About us
      </p>
    </Card>
  ),
};
