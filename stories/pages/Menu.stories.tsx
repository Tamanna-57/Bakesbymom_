import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Badge,
  Card,
  Doodle,
  PatternSurface,
  ProductCard,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  Ticket,
} from '@bakesbymom/ui';
import { menu, type MenuItem } from '../assets';
import { footerBottom, footerColumns, headerActions, navLinks } from '../assets/site';
import './pages.css';

const CATEGORIES = ['All', 'Cakes', 'Cookies', 'Pies', 'Breads', 'Little treats'] as const;
type Category = (typeof CATEGORIES)[number];

const badgeTone = (badge: MenuItem['badge']) =>
  badge === 'New' ? 'pistachio' : badge === 'Bestseller' ? 'cherry' : 'butter';

function MenuPage() {
  const [category, setCategory] = useState<Category>('All');
  const items = category === 'All' ? menu : menu.filter((item) => item.category === category);

  return (
    <div>
      <SiteHeader
        variant="capsule"
        layout="start"
        links={navLinks.map((l) => ({ ...l, current: l.label === 'Menu' }))}
        actions={headerActions}
      />

      <PatternSurface pattern="checker" tone="cherry" scale="sm" style={{ height: 24 }} aria-hidden="true" />

      <section className="pg-section">
        <div className="bbm-container pg-stack">
          <div className="pg-row" style={{ alignItems: 'flex-end' }}>
            <SectionHeading
              level={1}
              size="xl"
              eyebrow="Order by Wednesday · pick up Saturday"
              title={
                <>
                  The <em>menu</em>
                </>
              }
            />
            <div role="group" aria-label="Filter by category" className="sb-stack" style={{ gap: 8 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="pg-chip"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  <Badge tone={category === c ? 'cherry' : 'cream'} variant={category === c ? 'solid' : 'soft'}>
                    {c}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <ul className="pg-grid" aria-live="polite">
            {items.map((item) => (
              <ProductCard
                key={item.name}
                as="li"
                name={item.name}
                image={{ src: item.image, alt: item.alt }}
                description={item.description}
                price={item.price}
                pricePill
                href={`#${item.name}`}
                badge={
                  item.badge && (
                    <Badge size="sm" variant="solid" tone={badgeTone(item.badge)}>
                      {item.badge}
                    </Badge>
                  )
                }
              />
            ))}
          </ul>

          <div className="pg-split" style={{ alignItems: 'start' }}>
            <Card tone="pistachio" outline>
              <p className="bbm-text-heading-sm" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Doodle name="daisy" size={28} /> Allergies & preferences
              </p>
              <p className="bbm-text-body-md" style={{ margin: '8px 0 0' }}>
                Most bakes can be made gluten-free, dairy-free or nut-free. Just add a note at checkout. Everything is
                made in a home kitchen that also handles nuts, dairy, eggs and wheat.
              </p>
            </Card>
            <Ticket variant="stamp" tone="caramel" rotate={-2}>
              <p className="bbm-text-script-sm" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
                How do I order?
              </p>
              <ol
                className="bbm-text-body-sm"
                style={{ margin: '8px 0 0', paddingInlineStart: 18, display: 'grid', gap: 4 }}
              >
                <li>
                  <strong>Choose</strong> from the menu or ask for something custom.
                </li>
                <li>
                  <strong>Pick a date</strong> at least three days ahead.
                </li>
                <li>
                  <strong>Collect</strong> from the porch, or ask about delivery.
                </li>
              </ol>
            </Ticket>
          </div>
        </div>
      </section>

      <SiteFooter columns={footerColumns} bottom={footerBottom} edge="wave" />
    </div>
  );
}

const meta = {
  title: 'Pages/Menu',
  component: MenuPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A filterable menu: capsule header (Emily Jane), category chips (Puzzle Pantry), price-pill cards (SugarLace), the allergy note and a stamp-edged "how to order" card.',
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof MenuPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};
