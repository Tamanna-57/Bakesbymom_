import type { Meta, StoryObj } from '@storybook/react-vite';
import { Polaroid } from '@bakesbymom/ui';
import { art } from '../../apps/web/src/content';

const meta = {
  title: 'Components/Polaroid',
  component: Polaroid,
  parameters: {
    docs: {
      description: {
        component:
          "Photos as physical objects. `polaroid` is the taped instant photo of pins 10 and 11; `scallop` cuts the photo with a scalloped edge like Meet Elia (pin 05); `pattern` is pin 12's printed border; `flower` is pin 07's avatar; `cartouche` is pin 13's ornate frame. Captions are handwritten.",
      },
    },
  },
  args: { src: art.mom, alt: 'Mom in her apron, smiling', width: 260 },
} satisfies Meta<typeof Polaroid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InstantPhoto: Story = { args: { tape: true, caption: 'Mom, apron on', rotate: -3 } };

export const Scallop: Story = { args: { frame: 'scallop', rotate: 0 } };

export const Pattern: Story = {
  args: {
    frame: 'pattern',
    pattern: 'gingham',
    tone: 'pink',
    src: art.strawberryCake,
    alt: 'Strawberry layer cake',
    rotate: 0,
  },
};

export const Flower: Story = { args: { frame: 'flower', tone: 'blue', rotate: 0, width: 160 } };

export const Cartouche: Story = {
  args: { frame: 'cartouche', tone: 'pink', src: art.kitchen, alt: "Mom's kitchen", rotate: 0 },
};

/** Pin 11: two taped photos overlapping. */
export const Cluster: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Polaroid src={art.cupcake} alt="Pink cupcake" tape="gingham" rotate={-5} width={220} caption="Birthday batch" />
      <Polaroid
        src={art.cherryPie}
        alt="Cherry pie"
        tape="cherry"
        rotate={4}
        width={220}
        style={{ marginLeft: -40, marginTop: 48 }}
      />
    </div>
  ),
};
