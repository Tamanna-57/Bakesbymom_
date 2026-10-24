import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { PatternSurface, PATTERNS } from '@bakesbymom/ui';

const meta = {
  title: 'Components/PatternSurface',
  component: PatternSurface,
  parameters: {
    docs: {
      description: {
        component:
          "The board's patterns, painted from tokens: stripes (pins 02, 07, 16), pinstripe (15), dotted and wavy stripes (09), gingham (12), checker (05, 15), graph paper (08, 15) and polka dots (05). Pure CSS, so it recolors with `tone` and scales with `scale` (`xl` is pin 02's wide process stripes). Keep patterns behind photos, labels and edges, never behind paragraphs.",
      },
    },
  },
  args: {
    pattern: 'stripes',
    tone: 'blue',
    style: { width: 320, height: 200, borderRadius: 16, border: '1.5px solid var(--bbm-color-border-default)' },
  },
} satisfies Meta<typeof PatternSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const All: Story = {
  render: () => (
    <div className="sb-grid" style={{ width: 'min(960px, 90vw)', '--sb-min': '13rem' } as CSSProperties}>
      {PATTERNS.map((pattern, i) => (
        <figure key={pattern} style={{ margin: 0 }}>
          <PatternSurface
            pattern={pattern}
            tone={(['blue', 'pink', 'pink', 'cherry', 'pink', 'pink', 'pink', 'blue'] as const)[i]}
            style={{ height: 140, borderRadius: 16, border: '1.5px solid var(--bbm-color-border-default)' }}
          />
          <figcaption className="sb-note" style={{ marginTop: 8 }}>
            {pattern}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};

/** Pin 02's wide stripes for the process section. */
export const WideStripes: Story = {
  args: { pattern: 'stripes', tone: 'pink', scale: 'xl', style: { width: 480, height: 240 } },
};

/** Pin 05's polka-dot ground on baby blue. */
export const PolkaDots: Story = {
  args: {
    pattern: 'dots',
    tone: 'brown',
    ground: 'var(--bbm-color-bg-blue)',
    style: { width: 320, height: 240, border: '1.5px solid var(--bbm-color-border-default)' },
  },
};

/** Pin 15's grid paper. */
export const GridPaper: Story = { args: { pattern: 'grid', tone: 'pink', scale: 'lg' } };
