import type { Meta, StoryObj } from '@storybook/react-vite';
import { findCake } from '../../apps/web/src/content/catalog';
import { findTreatCategory } from '../../apps/web/src/content/treats';
import { CakePage } from '../../apps/web/src/pages/CakePage';
import { CatalogPage } from '../../apps/web/src/pages/Catalog';
import { ShopPage } from '../../apps/web/src/pages/Shop';
import { TreatCategoryPage } from '../../apps/web/src/pages/TreatCategory';
import { TreatPage } from '../../apps/web/src/pages/TreatPage';
import { fromBoard } from '../sections/ref';

// The live website's shop pages (apps/web), shown here with their source pins.
const meta = {
  title: 'Pages/Catalog & shop',
  component: CatalogPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The old site's catalog and shop, rebuilt in the board's look: cakes **by occasion** with pin 13's **filter pills** and pin 16's **menu cards**, a page per cake that builds a WhatsApp order, and the treat types, all under one **Cakes & Treats** page (/shop) that opens each category (brownies, cookies, jar cakes, dry cakes, cupcakes, bento cakes, combos) with their own order pages.",
          ['16', '13', '08'],
          'menu.md',
        ),
      },
    },
  },
} satisfies Meta<typeof CatalogPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** /catalog: every cake, by occasion. */
export const Catalog: Story = {};

/** /catalog/cake-spiderman: one cake and its order builder. */
export const Cake: Story = { render: () => <CakePage cake={findCake('cake-spiderman')!} /> };

/** /shop: Cakes & Treats, every category in one place, and a custom order. */
export const CakesAndTreats: Story = { render: () => <ShopPage /> };

/** /shop/cookies: one treat type. */
export const TreatType: Story = { render: () => <TreatCategoryPage category={findTreatCategory('cookies')!} /> };

/** /shop/brownies/oreo-brownie: one treat and its order builder. */
export const Treat: Story = {
  render: () => {
    const category = findTreatCategory('brownies')!;
    return <TreatPage category={category} treat={category.items[0]!} />;
  },
};
