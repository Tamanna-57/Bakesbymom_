import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from '@bakesbymom/ui';

const meta = {
  title: 'Components/SectionHeading',
  component: SectionHeading,
  parameters: {
    docs: {
      description: {
        component:
          'The board\'s title moves. **default**: a serif title where `<em>` words switch to script (pins 13, 15). **`bubble`**: one huge outlined word like GALLERY (pin 01), once per page. **`ribbon`**: a big script title between two cherry ribbons (pin 16\'s "Fillings"). **`stamp`**: a heavy title overlapped by the same words in script (pin 16), once per page; the script copy is hidden from screen readers. Eyebrows: tracked caps, a **handwritten pill** (pin 01) or **brackets** (pin 15).',
      },
    },
  },
  args: {
    eyebrow: 'Fresh this week',
    title: (
      <>
        Baked with <em>love</em>
      </>
    ),
    description: 'Cakes, cookies and pies, baked to order in Mom’s kitchen.',
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Pin 01. */
export const PillEyebrow: Story = {
  args: { eyebrow: 'reviews', eyebrowStyle: 'pill', title: 'Kind words', align: 'center', description: undefined },
};

/** Pin 15. */
export const BracketEyebrow: Story = {
  args: { eyebrow: "Baked in Mom's kitchen", eyebrowStyle: 'bracket', size: 'xl' },
};

/** Pin 01. */
export const Bubble: Story = {
  args: { variant: 'bubble', title: 'Gallery', eyebrow: undefined, description: undefined },
};

/** Pin 16. */
export const Ribbon: Story = {
  args: { variant: 'ribbon', title: 'Menu', eyebrow: undefined, description: undefined },
  decorators: [(Story) => <div style={{ width: 'min(960px, 90vw)' }}>{Story()}</div>],
};

/** Pin 16. */
export const Stamp: Story = {
  args: { variant: 'stamp', title: 'About us', eyebrow: undefined, description: undefined },
};

export const Inverse: Story = {
  args: { tone: 'inverse' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bbm-color-bg-inverse)', padding: 32, borderRadius: 16 }}>{Story()}</div>
    ),
  ],
};
