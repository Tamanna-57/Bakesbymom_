import type { Meta, StoryObj } from '@storybook/react-vite';
import { findCake } from '../../apps/web/src/content/catalog';
import { findTreatCategory } from '../../apps/web/src/content/treats';
import { CakePage } from '../../apps/web/src/pages/CakePage';
import { HowToOrderPage } from '../../apps/web/src/pages/HowToOrder';
import { MenuPage } from '../../apps/web/src/pages/Menu';
import { TreatCategoryPage } from '../../apps/web/src/pages/TreatCategory';
import { fromBoard } from '../sections/ref';

// The live website's shop pages (apps/web), shown here with their source pins.
const meta = {
  title: 'Pages/Menu & ordering',
  component: MenuPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The old site's catalog and shop, rebuilt in the board's look: cakes **by occasion** with pin 13's **filter pills** and pin 16's **menu cards**, a page per cake that builds a WhatsApp order, and the treat types (brownies, cookies, jar cakes, dry cakes, cupcakes, bento cakes, combos) with their own order pages.",
          ['16', '13', '08'],
          'menu.md',
        ),
      },
    },
  },
} satisfies Meta<typeof MenuPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** /menu (and the old /catalog and /shop): every cake by occasion, then the treats by the box. */
export const Menu: Story = {};

/** /catalog/cake-spiderman: one cake and its order builder. */
export const Cake: Story = { render: () => <CakePage cake={findCake('cake-spiderman')!} /> };

/** /shop/brownies: one kind of treat, its flavours picked in the order form. */
export const TreatType: Story = { render: () => <TreatCategoryPage category={findTreatCategory('brownies')!} /> };

/** /how-to-order: the steps, timings and pickup, custom cakes and gifts, and the questions. */
export const HowToOrder: Story = { render: () => <HowToOrderPage /> };
