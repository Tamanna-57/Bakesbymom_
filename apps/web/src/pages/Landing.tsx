import { FaqSection, GallerySection, MenuSection, ReviewsSection } from '../sections/blocks';
import {
  CraftedSection,
  FlavoursSection,
  HomeHero,
  HomeIntro,
  KitchenSplit,
  QuoteBand,
  ShapeRibbon,
  ShopByBoxSection,
  SignOffRibbon,
} from '../sections/home';
import { Layout } from './Layout';

/**
 * The home page, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry): striped hero, the shape ribbon,
 * the cake shelf (the first few cakes from the catalog), the feature strip, about us, flavours, shop by the box,
 * a quote, how to order with the cherry tiles, Mom's kitchen, then the gallery (every occasion, scrolled sideways),
 * reviews and FAQ.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement>
      <HomeHero />
      <ShapeRibbon />
      <MenuSection limit={10} />
      <HomeIntro />
      <FlavoursSection />
      <ShopByBoxSection />
      <QuoteBand />
      <CraftedSection />
      <KitchenSplit />
      <GallerySection />
      <ReviewsSection />
      <FaqSection />
      <SignOffRibbon />
    </Layout>
  );
}
