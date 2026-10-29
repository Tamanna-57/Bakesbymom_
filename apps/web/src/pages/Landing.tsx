import { MenuSection, ReviewsSection } from '../sections/blocks';
import { ChooseSection, HomeHero, HomeIntro, KitchenSplit, OrderCtaSection } from '../sections/home';
import { Layout } from './Layout';

/**
 * The home page, one idea per section: the hero, the four promises, a chooser (a cake for an occasion, or a box
 * of treats), the most-loved cakes, Mom's kitchen, what people say, and one call to order. Everything else has a
 * page of its own: the full menu, how to order (with the questions), and our story.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement>
      <HomeHero />
      <HomeIntro />
      <ChooseSection />
      <MenuSection limit={6} filters={false} title="Most loved" />
      <KitchenSplit />
      <ReviewsSection />
      <OrderCtaSection />
    </Layout>
  );
}
