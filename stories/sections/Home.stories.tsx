import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AboutUsCard,
  CraftedSection,
  FeatureStrip,
  FlavoursSection,
  HomeHero,
  KitchenSplit,
  QuoteBand,
  ShapeRibbon,
  ShopByBoxSection,
  SignOffRibbon,
} from '../../apps/web/src/sections/home';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Home',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**The home page sections, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry).** Stripes, the outlined about card, the flavour grid and the order card with cherry tiles come from SugarLace; the shape ribbon, shop by the box with filter pills and the split about with the cartouche frame come from Puzzle Pantry. The feature strip, the starburst sticker and the checker quote come from other bakery sites on Pinterest (Sweet Crumbs, joe & dough, Sunday Bakehouse). Flavours, treats and the hero use stock photos; photos of the cakes we sell stay in the catalog and the gallery.',
          ['16', '13'],
          'landing-page.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pin 16's stripes with the drawn cake, a starburst and a cream label card. */
export const Hero: Story = { render: () => <HomeHero /> };

/** Pin 13's ribbon over a strip of shapes. */
export const Ribbon: Story = { render: () => <ShapeRibbon /> };

/** Sweet Crumbs' icon row. */
export const Features: Story = { render: () => <FeatureStrip /> };

/** Pin 16's outlined about card with halftone cherries. */
export const AboutUs: Story = { render: () => <AboutUsCard /> };

/** Pin 16's "Fillings": a cross-section for each flavour. */
export const Flavours: Story = { render: () => <FlavoursSection /> };

/** Pin 13's bestsellers row: a lead tile, then the treats, with filter pills. */
export const ShopByTheBox: Story = { render: () => <ShopByBoxSection /> };

/** Sunday Bakehouse's quote on a checker band. */
export const Quote: Story = { render: () => <QuoteBand /> };

/** Pin 16's lockup, the stamp-edged order card and the cherry tiles. */
export const HowToOrder: Story = { render: () => <CraftedSection /> };

/** Pin 13's split about with the cartouche frame. */
export const MomsKitchen: Story = { render: () => <KitchenSplit /> };

/** Pin 13's sign-off ribbon. */
export const SignOff: Story = { render: () => <SignOffRibbon /> };
