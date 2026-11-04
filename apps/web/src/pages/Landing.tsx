import { FaqSection, MenuSection, ReviewsSection } from '../sections/blocks';
import { CakesTreatsWheel, HomeHero, HomeIntro, ShapeRibbon } from '../sections/home';
import { CurvedSignOff, FlavourDeck } from '../sections/fx';
import { OrderRail } from '../sections/order-rail';
import { Layout } from './Layout';

/**
 * The home page, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry), with the big moves of Teh Tarik Nation:
 * striped hero, the shape ribbon, the cake shelf (ticket cards dealt in from the sides), the flavours as a pinned
 * deck of cards, about us, the Cakes & Treats wheel (every category on an arc), how to order as a ride sideways
 * through a pinned strip of panels, reviews, FAQ and the sign-off running along a curve.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement edgeOverHero>
      <HomeHero />
      <ShapeRibbon />
      <MenuSection limit={10} />
      <FlavourDeck />
      <HomeIntro />
      <CakesTreatsWheel />
      <OrderRail />
      <ReviewsSection />
      <FaqSection />
      <CurvedSignOff />
    </Layout>
  );
}
