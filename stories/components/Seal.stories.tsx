import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doodle, Seal, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Ephemera/Seal',
  component: Seal,
  args: {
    text: 'Baked fresh daily • Made with love • ',
    size: 140,
    tone: 'cherry',
    shape: 'scallop',
    spin: false,
    children: <Doodle name="heart" size={40} />,
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    shape: { control: 'inline-radio', options: ['scallop', 'circle', 'oval'] },
    size: { control: { type: 'range', min: 80, max: 240, step: 4 } },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A circular sticker with text set on a ring, like the Book Nook society seal, Lilli Pilli's rubber stamp or the badge circles in the stripe pack. `spin` rotates the ring slowly (and stops under reduced motion). `oval` is the outlined claim sticker from the Bolo de Morango promo. The seal is announced as a single image using `label` or `text`.",
      },
    },
  },
} satisfies Meta<typeof Seal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scallop: Story = {};

export const Spinning: Story = {
  args: {
    spin: true,
    tone: 'strawberry',
    text: 'Welcome gift • Welcome gift • ',
    children: <Doodle name="cupcake" size={44} />,
  },
};

export const WithWord: Story = {
  args: { tone: 'butter', shape: 'circle', text: 'Small batch • Hand mixed • ', children: 'Est. 2026' },
};

export const Oval: Story = {
  args: { shape: 'oval', text: 'Impossible to eat just one slice', size: 110, tone: 'strawberry', children: undefined },
};

export const Tones: Story = {
  render: (args) => (
    <div className="sb-stack" style={{ gap: 20 }}>
      {TONES.map((tone) => (
        <Seal key={tone} {...args} tone={tone} size={112} text={`${tone} • ${tone} • ${tone} • `}>
          <Doodle name="star" size={30} />
        </Seal>
      ))}
    </div>
  ),
};
