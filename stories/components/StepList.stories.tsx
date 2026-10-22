import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepList } from '@bakesbymom/ui';

const steps = [
  { title: 'Choose your bake', description: 'Pick from the menu, or describe your dream cake.' },
  { title: 'Pick a date', description: 'Order by Wednesday for Saturday pick-up.' },
  { title: 'Collect it warm', description: 'From the porch, 9am–1pm, or at the market stall.' },
];

const meta = {
  title: 'Components/Content/StepList',
  component: StepList,
  args: { steps, variant: 'row' },
  argTypes: { variant: { control: 'inline-radio', options: ['row', 'stack', 'numbered'] } },
  parameters: {
    docs: {
      description: {
        component:
          'An ordered process in three styles: `row` (check markers joined by a line, from Hopf Haus), `stack` (letters dropped at jaunty angles, from Pretty OK) and `numbered` (big number tabs, from Taplink). It renders a real `<ol>`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(860px, 92vw)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StepList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {};

export const Stack: Story = {
  args: {
    variant: 'stack',
    steps: [
      { title: 'Join the bake club', description: 'Sign up by the last day of the month.' },
      { title: 'A new box every month', description: 'Four seasonal treats and a recipe card from Mom.' },
      { title: 'Delivered by the 6th', description: 'Packed in a striped box, sealed with a sticker.' },
      { title: 'Skip or pause anytime', description: 'No questions, no fees.' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(560px, 92vw)' }}>
        <Story />
      </div>
    ),
  ],
};

export const Numbered: Story = {
  args: {
    variant: 'numbered',
    steps: [
      { title: 'Cakes & celebration bakes' },
      { title: 'Cookies by the dozen' },
      { title: 'Pies & tarts' },
      { title: 'Breads (Sundays)' },
      { title: 'Little treats & gift boxes' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(480px, 92vw)' }}>
        <Story />
      </div>
    ),
  ],
};
