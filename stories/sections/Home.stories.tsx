import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AboutUsCard,
  CakesTreatsWheel,
  FeatureStrip,
  HomeHero,
  KitchenSplit,
  ShapeRibbon,
  ShopByBoxSection,
  SignOffRibbon,
} from '../../apps/web/src/sections/home';
import { CurvedSignOff, FlavourDeck, FooterWord } from '../../apps/web/src/sections/fx';
import { OrderRail } from '../../apps/web/src/sections/order-rail';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Home',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**The home page sections, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry).** Stripes, the outlined about card and the order lockup come from SugarLace; the shape ribbon, shop by the box with filter pills and the split about with the cartouche frame come from Puzzle Pantry. The feature strip and the starburst sticker come from other bakery sites on Pinterest (Sweet Crumbs, joe & dough). The flavour deck, the sideways order ride and the curved sign-off take their motion from Teh Tarik Nation. Flavours, treats and the hero use stock photos; photos of the cakes we sell stay in the catalog.',
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

/**
 * How to order as a ride sideways (Teh Tarik Nation's pinned horizontal section): the section pins and the page's
 * scroll slides a strip of panels past, pin 16's lockup breaking apart, each step's number rising, stickers flying
 * across at their own depths and titles typed out on tags, then the shortcuts dropping in with a bounce. With reduced
 * motion, or on a short screen, the panels stack down the page.
 */
export const HowToOrder: Story = { render: () => <OrderRail /> };

/** Pin 13's split about with the cartouche frame. */
export const MomsKitchen: Story = { render: () => <KitchenSplit /> };

/** Pin 13's sign-off ribbon. */
export const SignOff: Story = { render: () => <SignOffRibbon /> };

/**
 * The flavours as Teh Tarik Nation's "we're also…" deck: the section pins, and the flavours fly up one card at a time
 * and land in a fan, with tilted tape labels round the edges. Each card opens every cake in that flavour. With
 * reduced motion the cards lie open side by side.
 */
export const FlavourDeckStory: Story = { name: 'Flavour deck', render: () => <FlavourDeck /> };

/** The sign-off on a curve (Teh Tarik Nation): the note before you go runs along an arc over a cake. */
export const CurvedSignOffStory: Story = { name: 'Curved sign-off', render: () => <CurvedSignOff /> };

/** Beca Tea's foot: the name, huge, rising letter by letter under the footer on every page. */
export const FooterWordStory: Story = { name: 'Footer word', render: () => <FooterWord /> };
