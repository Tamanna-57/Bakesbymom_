import { FaqSection, GallerySection, MenuSection, ReviewsSection } from '../sections/blocks';
import {
  CraftedSection,
  FlavoursSection,
  HomeHero,
  HomeIntro,
  QuoteBand,
  ShapeRibbon,
  CakesTreatsWheel,
} from '../sections/home';
import { CurvedSignOff, PromiseDeck } from '../sections/fx';
import { Layout } from './Layout';

/**
 * The home page, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry): striped hero, the shape ribbon,
 * the cake shelf (the first few cakes from the catalog), the promise deck (Teh Tarik Nation's pinned card deck),
 * about us, flavours (under Beca Tea's sliding wall of names), the Cakes & Treats wheel (every category on an arc),
 * a quote typed out, how to order with the cherry tiles, then the gallery (every occasion; scrolling opens the
 * strips), reviews, FAQ and the sign-off running along a curve.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement edgeOverHero>
      <HomeHero />
      <ShapeRibbon />
      <MenuSection limit={10} />
      <PromiseDeck />
      <HomeIntro />
      <FlavoursSection />
      <CakesTreatsWheel />
      <QuoteBand />
      <CraftedSection />
      <GallerySection />
      <ReviewsSection />
      <FaqSection />
      <CurvedSignOff />
    </Layout>
  );
}
