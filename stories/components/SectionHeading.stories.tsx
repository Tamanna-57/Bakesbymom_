import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Content/SectionHeading',
  component: SectionHeading,
  args: {
    eyebrow: 'Fresh this week',
    title: 'Baked in small batches',
    description:
      'Everything is made to order in Mom’s kitchen, with real butter, free-range eggs and fruit from the Saturday market.',
    align: 'start',
    size: 'lg',
    level: 2,
    tone: 'ink',
    eyebrowStyle: 'text',
  },
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'center'] },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md', 'sm'] },
    tone: { control: 'inline-radio', options: ['ink', 'brand', 'inverse'] },
    eyebrowStyle: { control: 'inline-radio', options: ['text', 'pill'] },
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    title: { control: 'text' },
    script: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The section opener: a mono eyebrow, a Fraunces title and an optional script line or script word. Wrap a word in `<em>` to swap it into Pinyon Script (Puzzle Pantry), or pass `script` for a second line (Cherry Cloud, Pastry Guide). `eyebrowStyle="pill"` clips the label onto a rule (Berloga).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(760px, 90vw)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ScriptWord: Story = {
  args: {
    title: (
      <>
        For the nights that need <em>something</em> sweet
      </>
    ),
    eyebrow: 'Weeknight treats',
  },
};

export const ScriptLine: Story = {
  args: {
    title: 'Cherry cloud',
    script: 'Shortcake',
    align: 'center',
    size: 'xl',
    tone: 'brand',
    eyebrow: 'Soft opening · 9 August',
    description: undefined,
  },
};

export const PillEyebrow: Story = {
  args: { eyebrowStyle: 'pill', eyebrow: 'special events', align: 'center', title: 'Dessert hour, every Friday' },
};

export const OnCocoa: Story = {
  args: {
    tone: 'inverse',
    title: (
      <>
        Join the <em>bake</em> club
      </>
    ),
    eyebrow: 'Monthly subscription',
  },
  globals: { backgrounds: { value: 'cocoa' } },
};
