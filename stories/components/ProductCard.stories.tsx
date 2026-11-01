import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, ProductCard } from '@bakesbymom/ui';
import { art, menu } from '../../apps/web/src/content';

const item = menu()[0]!;

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component:
          'A bake on the menu. **`variant="menu"`** is pin 16\'s menu card: a paper card with an outline, the photo inside, a "what\'s inside" line and a cherry price pill beside an arrow. `plain` has no card. Photo frames: `rounded`, `arch` (pin 01\'s journal), `oval` (pin 04) and `circle`. `layout="row"` for phones and lists. The whole card is one link.',
      },
    },
  },
  args: {
    variant: 'menu',
    name: item.name,
    image: { src: item.image, alt: item.alt },
    description: item.description,
    price: item.price,
    href: item.href,
    tone: 'pink',
  },
  decorators: [(Story) => <div style={{ width: 280 }}>{Story()}</div>],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 16. */
export const MenuCard: Story = {};

export const WithBadge: Story = {
  args: {
    badge: (
      <Badge tone="cherry" variant="solid">
        Bestseller
      </Badge>
    ),
  },
};

export const SoldOut: Story = { args: { soldOut: true } };

/** Pin 04's oval teaser. */
export const Oval: Story = { args: { variant: 'plain', imageShape: 'oval', price: undefined } };

/** Pin 01's arch, for journal posts. */
export const Arch: Story = {
  args: {
    variant: 'plain',
    imageShape: 'arch',
    name: "Mom's brown butter cookies",
    image: { src: art.cookies, alt: '' },
    description: 'Recipe · 12 May',
    price: undefined,
  },
};

export const Row: Story = {
  decorators: [(Story) => <div style={{ width: 380 }}>{Story()}</div>],
  args: {
    variant: 'plain',
    layout: 'row',
    action: (
      <Button size="sm" variant="soft">
        Add
      </Button>
    ),
    href: undefined,
  },
};
