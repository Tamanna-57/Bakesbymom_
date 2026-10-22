import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Hero, PATTERNS, Polaroid, TONES } from '@bakesbymom/ui';
import { art } from '../assets';

const meta = {
  title: 'Components/Sections/Hero',
  component: Hero,
  args: {
    eyebrow: 'Home-baked · small batch · made to order',
    title: (
      <>
        Baked with <span className="bbm-squiggle">love</span>, by <em>Mom</em>
      </>
    ),
    description:
      'Celebration cakes, cookies by the dozen and Sunday sourdough, made in a home kitchen and ready for Saturday pick-up.',
    actions: (
      <>
        <Button size="lg" href="#menu">
          See this week’s menu
        </Button>
        <Button size="lg" variant="secondary" href="#custom">
          Order a custom cake
        </Button>
      </>
    ),
    pattern: 'stripes',
    accent: 'strawberry',
    align: 'start',
    media: (
      <div style={{ position: 'relative', width: 340, height: 360 }}>
        <Polaroid
          src={art.strawberryCake}
          alt="Strawberry layer cake"
          rotate={-5}
          width={230}
          tape="gingham"
          style={{ position: 'absolute', left: 0, top: 10 }}
        />
        <Polaroid
          src={art.cookies}
          alt="Chocolate chip cookies"
          rotate={6}
          width={190}
          caption="fresh today"
          style={{ position: 'absolute', right: 0, bottom: 0 }}
        />
      </div>
    ),
  },
  argTypes: {
    pattern: { control: 'select', options: [undefined, ...PATTERNS] },
    tone: { control: 'select', options: [undefined, ...TONES] },
    accent: { control: 'select', options: TONES },
    align: { control: 'inline-radio', options: ['start', 'center'] },
    title: { control: false },
    actions: { control: false },
    media: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The opening statement: eyebrow, fluid display title (with an optional script word or squiggle underline), lead, actions and media on a pattern backdrop. `awning` adds the striped shop awning along the top edge.',
      },
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SplitWithPolaroids: Story = {};

export const CenteredWithAwning: Story = {
  args: {
    awning: true,
    accent: 'cherry',
    tone: 'cream',
    align: 'center',
    eyebrow: 'Soft opening · Saturday 9 August',
    title: 'Cherry cloud',
    script: 'Shortcake',
    description: 'Our first weekend at the farmers’ market. Come say hi, and bring a big box.',
    actions: <Button size="lg">Get directions</Button>,
    media: undefined,
    pattern: undefined,
  },
};
