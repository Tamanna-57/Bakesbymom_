import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '@bakesbymom/ui';
import { faqItems } from '../../apps/web/src/content/site';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Disclosure list on native `<details>`/`<summary>`: keyboard and screen-reader accessible, works without JavaScript. **`cards`** are pin 02's outlined question cards with stickers (the FAQ lead); **`pills`** are pin 08's rounded rows with an arrow in a circle; **`rows`** are pin 01's hairline list. `columns={2}` splits the list so an open card only pushes its own column; `exclusive` keeps one open per column.",
      },
    },
  },
  args: { items: faqItems.slice(0, 4), defaultOpen: [0] },
  decorators: [(Story) => <div style={{ maxWidth: 960 }}>{Story()}</div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 02: cards with stickers. */
export const Cards: Story = {};

/** Pin 02's two columns. */
export const TwoColumns: Story = { args: { items: faqItems, columns: 2, exclusive: true } };

/** Pin 08: blue pills with an arrow in a circle. */
export const Pills: Story = {
  args: { variant: 'pills', items: faqItems.slice(0, 4).map(({ title, content }) => ({ title, content })) },
};

/** Pin 01: a hairline list for "This week's specials". */
export const Rows: Story = {
  args: {
    variant: 'rows',
    items: [
      {
        title: 'Janmashtami: lotus cake',
        content: <p>Ivory buttercream, a sugar lotus and a peacock feather. ₹1,450 for 1 kg.</p>,
      },
      { title: 'Diwali: dry fruit cookie tins', content: <p>Almonds, cashews and raisins in every one.</p> },
      { title: 'Raksha Bandhan: jar cakes', content: <p>Rasmalai, Biscoff or chocolate truffle, one jar each.</p> },
    ],
  },
};
