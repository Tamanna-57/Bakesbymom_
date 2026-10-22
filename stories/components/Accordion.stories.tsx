import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, Doodle, TONES } from '@bakesbymom/ui';

const faq = [
  {
    title: 'How far ahead should I order?',
    content: (
      <p>Three days for menu items, two weeks for custom celebration cakes. Order by Wednesday for Saturday pick-up.</p>
    ),
    icon: <Doodle name="cupcake" />,
  },
  {
    title: 'Do you have gluten-free or vegan options?',
    content: (
      <p>
        Most cakes and cookies can be made gluten-free. Vegan on request. Everything is baked in a home kitchen that
        also handles nuts, dairy and eggs.
      </p>
    ),
    icon: <Doodle name="daisy" />,
  },
  {
    title: 'Do you deliver?',
    content: (
      <p>Yes, within 10 miles for orders over $40. Otherwise pick up from the porch or the Saturday market stall.</p>
    ),
    icon: <Doodle name="heart" color="var(--bbm-color-cherry-500)" />,
  },
  {
    title: 'Can I gift a bake club subscription?',
    content: <p>Of course. Choose “gift” at checkout and Mom will tuck a handwritten card in the first box.</p>,
    icon: <Doodle name="star" color="var(--bbm-color-butter-500)" />,
  },
];

const meta = {
  title: 'Components/Content/Accordion',
  component: Accordion,
  args: { items: faq, variant: 'pills', tone: 'strawberry', exclusive: false, defaultOpen: [0] },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pills', 'rows'] },
    tone: { control: 'select', options: TONES },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Built on native `<details>`/`<summary>`, so it works with keyboards, screen readers, find-in-page and even without JavaScript. `pills` are tinted sticker rows (Pretty OK FAQ); `rows` is the hairline specials list (Berloga). `exclusive` keeps one item open.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(620px, 92vw)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FAQ: Story = {};

export const Specials: Story = {
  args: {
    variant: 'rows',
    exclusive: true,
    defaultOpen: [1],
    items: [
      { title: 'Dessert hour', content: <p>Every Friday 3–5pm: half-price slices with any coffee.</p> },
      {
        title: 'Happy Sundays',
        content: <p>Last Sunday of the month: 20% off a dozen cookies, because we love you.</p>,
      },
      {
        title: 'Morning bun club',
        content: <p>Pre-order cinnamon rolls by Thursday and they’re still warm at pick-up.</p>,
      },
    ],
  },
};
