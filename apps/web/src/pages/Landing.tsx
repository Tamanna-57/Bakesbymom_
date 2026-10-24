import { Button, EdgeDivider, Hero } from '@bakesbymom/ui';
import { findCake } from '../content/catalog';
import { orderLink } from '../content/site';
import {
  CustomCakesSection,
  DoubleRibbon,
  FaqSection,
  GallerySection,
  GiftSection,
  InstagramSection,
  MeetMomSection,
  MenuSection,
  OrderBandSection,
  ProcessSection,
  ReviewsSection,
  TreatsSection,
} from '../sections/blocks';
import { Layout } from './Layout';

const heroCake = findCake('cake-choco-drip')!;

/**
 * The home page, in the order of pin 15 (Nectar): hero, the cakes, how to order, the order band,
 * custom cakes, Mom, the gallery and the rest. See design/board/sections/landing-page.md.
 */
export function LandingPage() {
  const photo = heroCake.photos[0]!;
  return (
    <Layout path="/" withAnnouncement>
      <Hero
        eyebrow="Home bakery · Panipat"
        title={
          <>
            Homemade cakes, <em>still warm</em> from Mom's oven.
          </>
        }
        description="Cakes, brownies, cookies, cupcakes and breads, baked to order in Mom's kitchen. Everything is 100% eggless."
        actions={
          <>
            <Button size="lg" href="/catalog">
              See the cakes
            </Button>
            <Button size="lg" variant="secondary" href={orderLink} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </Button>
          </>
        }
        media={
          <img
            className="site-hero-photo"
            src={photo.src}
            alt={`${heroCake.name}: ${heroCake.description}`}
            width={photo.width}
            height={photo.height}
          />
        }
        note="100% eggless!"
      />
      <DoubleRibbon />
      <MenuSection limit={8} />
      <EdgeDivider shape="dots" color="var(--bbm-color-brown-900)" background="var(--bbm-color-bg-blue)" />
      <TreatsSection />
      <ProcessSection />
      <OrderBandSection />
      <CustomCakesSection />
      <EdgeDivider shape="checker" color="var(--bbm-color-cherry-700)" altColor="var(--bbm-color-pink-300)" size="sm" />
      <MeetMomSection />
      <GallerySection />
      <ReviewsSection />
      <GiftSection />
      <FaqSection />
      <InstagramSection />
    </Layout>
  );
}
