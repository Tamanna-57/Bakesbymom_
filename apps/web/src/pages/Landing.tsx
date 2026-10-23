import { Button, EdgeDivider, Hero } from '@bakesbymom/ui';
import { art } from '../content';
import {
  BakeClubSection,
  CustomCakesSection,
  DoubleRibbon,
  FaqSection,
  FindUsSection,
  GallerySection,
  MeetMomSection,
  MenuSection,
  NewsletterSection,
  ProcessSection,
  ReviewsSection,
} from '../sections/blocks';
import { Layout } from './Layout';

/**
 * The home page, in the order of pin 15 (Nectar): hero, this week, find us,
 * custom cakes, club. See design/board/sections/landing-page.md.
 */
export function LandingPage() {
  return (
    <Layout path="/" withAnnouncement>
      <Hero
        eyebrow="Baked in Mom's kitchen"
        title={
          <>
            Homemade cakes, <em>still warm</em> from Mom's oven.
          </>
        }
        description="Cakes, cookies and pies baked to order every week, ready for Saturday pick-up."
        actions={
          <>
            <Button size="lg" href="#custom">
              Order a cake
            </Button>
            <Button size="lg" variant="secondary" href="/menu">
              See the menu
            </Button>
          </>
        }
        media={
          <img
            src={art.strawberryCake}
            alt="Strawberry layer cake with pink buttercream and a cherry on top"
            width={440}
            height={440}
          />
        }
        note="made with real butter!"
      />
      <DoubleRibbon />
      <MenuSection />
      <EdgeDivider shape="dots" color="var(--bbm-color-brown-900)" background="var(--bbm-color-bg-blue)" />
      <ProcessSection />
      <FindUsSection />
      <CustomCakesSection />
      <EdgeDivider shape="checker" color="var(--bbm-color-cherry-700)" altColor="var(--bbm-color-pink-300)" size="sm" />
      <MeetMomSection />
      <GallerySection />
      <ReviewsSection />
      <BakeClubSection />
      <FaqSection />
      <NewsletterSection />
    </Layout>
  );
}
