import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AboutUsCard,
  CakesTreatsWheel,
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
import { CurvedSignOff, FlavourWall, FooterWord, PromiseDeck } from '../../apps/web/src/sections/fx';
import { cakeFlavours } from '../../apps/web/src/content/bakery';
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

/**
 * The home page's Cakes & Treats: every kind of bake as a ticket card on a rainbow arc over the words, turning right
 * to left when the visitor drags, swipes, scrolls sideways or uses the arrows (the page itself scrolls on as usual),
 * the band blending in from blue and out to pink as the page scrolls past. After a
 * tea shop's "Our products" section.
 */
export const CakesAndTreats: Story = { render: () => <CakesTreatsWheel /> };

/** Pin 13's bestsellers row: a lead tile, then the treats, with filter pills. Not on the home page now (the wheel
 * replaced it); kept for reuse. */
export const ShopByTheBox: Story = { render: () => <ShopByBoxSection /> };

/** Sunday Bakehouse's quote on a checker band. */
export const Quote: Story = { render: () => <QuoteBand /> };

/** Pin 16's lockup, the stamp-edged order card and the cherry tiles. */
export const HowToOrder: Story = { render: () => <CraftedSection /> };

/** Pin 13's split about with the cartouche frame. */
export const MomsKitchen: Story = { render: () => <KitchenSplit /> };

/** Pin 13's sign-off ribbon. */
export const SignOff: Story = { render: () => <SignOffRibbon /> };

/**
 * Teh Tarik Nation's "we're also…" deck: the section pins, and the promises fly up one card at a time and land in a
 * fan, with tilted tape labels round the edges. With reduced motion the cards lie open side by side.
 */
export const PromiseDeckStory: Story = { name: 'Promise deck', render: () => <PromiseDeck /> };

/** Beca Tea's sliding rows: the flavour names, filled and outlined, sliding in turn round a slice of cake. */
export const FlavourWallStory: Story = {
  name: 'Flavour wall',
  render: () => (
    <div className="site-section site-section--blue">
      <FlavourWall words={cakeFlavours} />
    </div>
  ),
};

/** The sign-off on a curve (Teh Tarik Nation): the note before you go runs along an arc over a cake. */
export const CurvedSignOffStory: Story = { name: 'Curved sign-off', render: () => <CurvedSignOff /> };

/** Beca Tea's foot: the name, huge, rising letter by letter under the footer on every page. */
export const FooterWordStory: Story = { name: 'Footer word', render: () => <FooterWord /> };
