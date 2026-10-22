import type { Meta, StoryObj } from '@storybook/react-vite';
import { PATTERNS, Polaroid, TONES } from '@bakesbymom/ui';
import { art } from '../assets';

const meta = {
  title: 'Components/Ephemera/Polaroid',
  component: Polaroid,
  args: {
    src: art.strawberryCake,
    alt: 'Strawberry layer cake',
    caption: 'June’s 7th birthday',
    tape: 'plain',
    rotate: -2,
    frame: 'polaroid',
    aspect: '1/1',
    width: 260,
  },
  argTypes: {
    tape: { control: 'select', options: [false, 'plain', 'gingham', 'cherry'] },
    frame: { control: 'inline-radio', options: ['polaroid', 'scallop', 'pattern'] },
    pattern: { control: 'select', options: PATTERNS },
    tone: { control: 'select', options: TONES },
    aspect: { control: 'inline-radio', options: ['1/1', '4/5', '3/4', '4/3'] },
    rotate: { control: { type: 'range', min: -8, max: 8, step: 0.5 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Photos as physical objects: an instant photo with tape and a handwritten caption (Book Nook, Stevie Kay, Spring Bouquet), a scalloped frame (Pretty OK) or a printed pattern frame (September Sun). Keep tilts within ±3° for anything people need to read.',
      },
    },
  },
} satisfies Meta<typeof Polaroid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InstantPhoto: Story = {};

export const GinghamTape: Story = {
  args: { tape: 'gingham', rotate: 3, src: art.cherryPie, alt: 'Cherry pie', caption: 'Sunday pie club' },
};

export const ScallopFrame: Story = {
  args: {
    frame: 'scallop',
    tone: 'blueberry',
    tape: false,
    rotate: 0,
    src: art.mixingBowl,
    alt: 'Mixing bowl and whisk',
    caption: 'with love, Mom',
  },
};

export const PatternFrame: Story = {
  args: {
    frame: 'pattern',
    pattern: 'gingham',
    tone: 'cherry',
    tape: false,
    rotate: 0,
    src: art.cookies,
    alt: 'Chocolate chip cookies',
    caption: undefined,
  },
};

export const Stack: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 420, height: 340 }}>
      <Polaroid
        src={art.macarons}
        alt="Macarons"
        rotate={-6}
        width={220}
        tape="cherry"
        style={{ position: 'absolute', left: 0, top: 30 }}
      />
      <Polaroid
        src={art.cupcake}
        alt="Cupcake"
        rotate={5}
        width={220}
        tape="gingham"
        caption="xoxo"
        style={{ position: 'absolute', right: 0, top: 0 }}
      />
    </div>
  ),
};
