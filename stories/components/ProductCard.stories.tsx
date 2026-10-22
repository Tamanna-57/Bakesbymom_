import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, ProductCard, TONES } from '@bakesbymom/ui';
import { art, menu } from '../assets';

const meta = {
  title: 'Components/Content/ProductCard',
  component: ProductCard,
  args: {
    name: 'Strawberry layer cake',
    image: { src: art.strawberryCake, alt: 'Strawberry layer cake with pink frosting' },
    price: 'From $38',
    description: 'Vanilla sponge, fresh strawberry jam, whipped buttercream.',
    href: '#strawberry-layer-cake',
    imageShape: 'rounded',
    layout: 'stack',
    tone: 'cream',
  },
  argTypes: {
    imageShape: { control: 'inline-radio', options: ['rounded', 'arch', 'oval', 'circle'] },
    layout: { control: 'inline-radio', options: ['stack', 'row'] },
    tone: { control: 'select', options: TONES },
    badge: { control: false },
    action: { control: false },
    image: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A menu item: photo first, minimal chrome, honest pricing (Pretty OK, Lilli Pilli, SugarLace). With `href`, the whole card is one link and the heading carries the name. Extra `action`s sit above the link. Frames: rounded, arch (Berloga blog), oval (Hopf Haus) or circle (category cut-outs).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badge: (
      <Badge tone="cherry" variant="solid" size="sm">
        Bestseller
      </Badge>
    ),
  },
};

export const MenuCard: Story = {
  args: {
    pricePill: true,
    price: '$14 / dozen',
    name: 'Brown butter cookies',
    image: { src: art.cookies, alt: 'Chocolate chip cookies' },
    description: 'Crisp edges, chewy middles, two kinds of chocolate.',
    tone: 'blueberry',
  },
};

export const ArchFrame: Story = {
  args: {
    imageShape: 'arch',
    name: 'Sour cherry pie',
    image: { src: art.cherryPie, alt: 'Lattice cherry pie' },
    price: '$28',
    badge: (
      <Badge tone="butter" variant="solid" size="sm">
        Weekend only
      </Badge>
    ),
  },
};

export const OvalFrame: Story = {
  args: {
    imageShape: 'oval',
    name: 'Cinnamon rolls',
    image: { src: art.cinnamonRoll, alt: 'Cinnamon roll' },
    price: '$18 / four',
  },
};

export const WithAction: Story = {
  args: {
    href: undefined,
    action: (
      <Button size="sm" variant="soft">
        Add to box
      </Button>
    ),
    name: 'Birthday cupcakes',
    image: { src: art.cupcake, alt: 'Cupcake' },
    price: '$24 / six',
  },
};

export const RowList: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div>
      {menu.slice(0, 4).map((item) => (
        <ProductCard
          key={item.name}
          layout="row"
          name={item.name}
          image={{ src: item.image, alt: item.alt }}
          description={item.description}
          price={item.price}
          href={`#${item.name}`}
          headingLevel={4}
        />
      ))}
    </div>
  ),
};

export const CategoryTiles: Story = {
  decorators: [
    (Story) => (
      <div className="sb-frame">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24 }}>
      {[
        ['Cakes', art.strawberryCake],
        ['Cookies', art.cookies],
        ['Pies', art.cherryPie],
        ['Breads', art.sourdough],
        ['Little treats', art.macarons],
      ].map(([name, src]) => (
        <ProductCard
          key={name}
          compact
          imageShape="circle"
          name={name!}
          image={{ src: src!, alt: '' }}
          href={`#${name}`}
        />
      ))}
    </div>
  ),
};

export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="sb-frame">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="sb-grid">
      {menu.map((item) => (
        <ProductCard
          key={item.name}
          name={item.name}
          image={{ src: item.image, alt: item.alt }}
          price={item.price}
          href={`#${item.name}`}
          badge={
            item.badge && (
              <Badge
                size="sm"
                variant="solid"
                tone={item.badge === 'New' ? 'pistachio' : item.badge === 'Bestseller' ? 'cherry' : 'butter'}
              >
                {item.badge}
              </Badge>
            )
          }
        />
      ))}
    </div>
  ),
};
