import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doodle, Marquee } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Ribbons are the most common device on the board (11 of 15 designs). The lead is pin 02's **double ribbon** (blue over cocoa, moving in opposite directions); also a **tilted** ribbon (pin 07), **bubble** words (pin 11), **icon separators** (pin 06) and a **center badge** (pin 04). Screen readers get the items once; the moving copy is hidden; a pause button meets WCAG 2.2.2 and motion stops under reduced motion.",
      },
    },
  },
  args: {
    items: ['Baked this morning', "Made in Mom's kitchen", 'Real butter, real eggs', 'Order by Wednesday'],
    label: 'What Mom bakes',
    caps: false,
    separator: <Doodle name="heart" size="0.95em" />,
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 02. */
export const Double: Story = { args: { rows: 2 } };

export const Single: Story = { args: { tone: 'pink', caps: true, items: ['Cakes', 'Cookies', 'Pies', 'Breads'] } };

/** Pin 07: tilted across a section edge. */
export const Tilted: Story = {
  args: {
    tone: 'butter',
    tilt: -3,
    caps: true,
    items: ['Cakes', 'Fillings', 'Coffee'],
    separator: <Doodle name="sparkle" size="0.9em" />,
  },
  decorators: [(Story) => <div style={{ padding: '48px 0', overflow: 'hidden' }}>{Story()}</div>],
};

/** Pin 06: category words with doodle separators. */
export const IconSeparators: Story = {
  args: {
    tone: 'blue',
    caps: true,
    items: ['Cakes', 'Cookies', 'Pies', 'Breads'],
    separator: <Doodle name="cupcake" size="1.3em" />,
  },
};

/** Pin 04: a doodle badge in the middle. */
export const CenterBadge: Story = {
  args: { tone: 'beige', caps: true, size: 'lg', items: ['How to order'], badge: <Doodle name="whisk" size={36} /> },
};

/** Pin 11: big pink bubble words on cocoa. */
export const Bubble: Story = {
  args: {
    variant: 'bubble',
    items: ['fresh from the oven', 'baked with love'],
    separator: <Doodle name="sparkle" size="0.6em" />,
  },
  decorators: [(Story) => <div style={{ background: 'var(--bbm-color-bg-inverse)' }}>{Story()}</div>],
};
