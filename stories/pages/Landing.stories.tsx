import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, EdgeDivider, Hero, SiteHeader } from '@bakesbymom/ui';
import { art } from '../assets';
import { announcement, headerActions, mobileCta, navLinks } from '../assets/site';
import {
  BakeClubSection,
  ChatDemo,
  CustomCakesSection,
  DoubleRibbon,
  FaqSection,
  FindUsSection,
  Footer,
  GallerySection,
  MeetMomSection,
  MenuSection,
  NewsletterSection,
  ProcessSection,
  ReviewsSection,
} from '../sections/blocks';
import { fromBoard } from '../sections/ref';

function LandingPage() {
  return (
    <div>
      <SiteHeader
        links={navLinks}
        actions={headerActions}
        mobileCta={mobileCta}
        announcement={announcement}
        scallop
        capsuleOnScroll
      />
      <main>
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
              <Button size="lg" variant="secondary" href="#menu">
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
        <EdgeDivider
          shape="checker"
          color="var(--bbm-color-cherry-700)"
          altColor="var(--bbm-color-pink-300)"
          size="sm"
        />
        <MeetMomSection />
        <GallerySection />
        <ReviewsSection />
        <BakeClubSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatDemo inline={false} defaultOpen={false} />
    </div>
  );
}

const meta = {
  title: 'Pages/Landing page',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The Bakes by Mom home page, in the order of **pin 15 (Nectar)**, the board's closest match to a small family bake business: hero → this week → find us → custom cakes → club. The sections the Nectar page doesn't have use the best version on the board: menu (16), process (02), Meet Mom (05), gallery and reviews (01), FAQ (02), newsletter and footer (03). Bright cherry appears once (the schedule band). The Ask Mom chat sits in the corner.",
          ['15', '16', '02', '05', '01', '03'],
          'landing-page.md',
        ),
      },
    },
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageStory: Story = { name: 'Landing page' };
