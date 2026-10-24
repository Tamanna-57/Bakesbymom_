import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepList } from '@bakesbymom/ui';
import { howToOrder } from '../../apps/web/src/content/site';

const meta = {
  title: 'Components/StepList',
  component: StepList,
  parameters: {
    docs: {
      description: {
        component:
          'Ordered steps, in the four ways the board shows a process. **`stack`** (the lead): tilted flavor cards with a sticker, pin 02. **`row`**: checkboxes joined by a line, pin 04. **`tabs`**: numbered folder tabs that overlap downward, pin 08, for 5–7 steps. **`cards`**: paper cards with a "Step 1" tab, pin 10. Always an `<ol>`.',
      },
    },
  },
  args: { steps: howToOrder },
  decorators: [(Story) => <div style={{ width: 'min(680px, 90vw)' }}>{Story()}</div>],
} satisfies Meta<typeof StepList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 02. */
export const Stack: Story = {};

/** Pin 04. */
export const Row: Story = {
  args: { variant: 'row', steps: howToOrder.slice(0, 3).map(({ title, description }) => ({ title, description })) },
  decorators: [(Story) => <div style={{ width: 'min(960px, 90vw)' }}>{Story()}</div>],
};

/** Pin 08. */
export const Tabs: Story = {
  args: {
    variant: 'tabs',
    steps: [
      { title: 'Tell Mom the date', description: 'And how many people.' },
      { title: 'Pick the flavor', description: 'Any sponge and filling on the menu.' },
      { title: 'Share your idea', description: 'A photo, a theme or a color.' },
      { title: 'See the sketch', description: 'Mom draws it and sends a quote.' },
      { title: 'Pay the deposit', description: '50% holds your date.' },
      { title: 'Taste day', description: 'Optional, for weddings.' },
      { title: 'Pick it up', description: 'Or have it delivered.' },
    ],
  },
};

/** Pin 10. */
export const Cards: Story = {
  args: {
    variant: 'cards',
    steps: [
      { title: 'Sign up', description: 'By the last day of the month.' },
      { title: 'Pick your treats', description: 'Or let Mom surprise you.' },
      { title: 'Unbox on the 1st', description: 'With a recipe card inside.' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 'min(960px, 90vw)' }}>{Story()}</div>],
};
