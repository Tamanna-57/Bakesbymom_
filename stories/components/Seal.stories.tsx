import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doodle, Seal, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Seal',
  component: Seal,
  parameters: {
    docs: {
      description: {
        component:
          "Round stickers with text on a ring: pin 10's seals overlapping photo corners, pin 03's slowly turning \"pre-order now\" badge, pin 06's stamp. Also the chat launcher and the logo's seal lockup. `spin` stops under reduced motion.",
      },
    },
  },
  args: {
    text: 'Fresh this morning • Fresh this morning • ',
    size: 128,
    tone: 'cherry',
    children: <Doodle name="heart" size={30} />,
  },
} satisfies Meta<typeof Seal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scalloped: Story = {};
export const Spinning: Story = { args: { spin: true, tone: 'pink', text: 'Ask Mom • Ask Mom • Ask Mom • ' } };
export const Circle: Story = { args: { shape: 'circle', tone: 'blue' } };
export const Oval: Story = { args: { shape: 'oval', text: 'Designed to delight', tone: 'pink', children: undefined } };

export const Tones: Story = {
  render: (args) => (
    <div className="sb-stack">
      {TONES.map((tone) => (
        <Seal key={tone} {...args} tone={tone} size={104} text={`${tone} • ${tone} • ${tone} • `} />
      ))}
    </div>
  ),
};
