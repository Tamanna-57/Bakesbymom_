import { FaqSection, GallerySection, ReviewsSection } from '../sections/blocks';
import {
  AboutUsCard,
  CraftedSection,
  FeatureStrip,
  FlavoursSection,
  HomeHero,
  KitchenSplit,
  OccasionBand,
  QuoteBand,
  ShapeRibbon,
  ShopByBoxSection,
  SignOffRibbon,
} from '../sections/home';
import { Layout } from './Layout';

/**
 * The home page, after pin 16 (SugarLace) and pin 13 (Puzzle Pantry): striped hero, the shape ribbon,
 * the feature strip, about us, flavours, shop by the box, occasions, a quote, how to order with the
 * cherry tiles, Mom's kitchen, then the gallery, reviews and FAQ. Only the gallery shows cake photos.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement>
      <HomeHero />
      <ShapeRibbon />
      <FeatureStrip />
      <AboutUsCard />
      <FlavoursSection />
      <ShopByBoxSection />
      <OccasionBand />
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
