import { Button, Card, Doodle, PatternSurface, SectionHeading, StepList } from '@bakesbymom/ui';
import { whatsappLink } from '../content/bakery';
import { howToOrder } from '../content/site';
import { FaqSection, OrderBandSection, SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs } from './order';

const external = { target: '_blank', rel: 'noreferrer' } as const;

const specials = [
  {
    icon: <Doodle name="cupcake" size={44} />,
    title: 'A custom cake',
    text: 'A theme, a photo you love, a number cake or tiers for a crowd. Send Mom the idea and she plans it with you.',
    action: 'Plan a custom cake',
    message: "Hello Bakes by Mom! I'd like to plan a custom cake 🎂",
    tone: 'pink' as const,
  },
  {
    icon: <Doodle name="bow" size={44} color="var(--bbm-color-cherry-500)" />,
    title: 'Sending it as a gift',
    text: 'Any cake or box can go out wrapped, with a gift box, a note in your words and a message piped on top.',
    action: 'Send a gift',
    message: "Hello Bakes by Mom! I'd like to send a cake as a gift 🎁",
    tone: 'blue' as const,
  },
];

/** Everything about ordering on one page: the steps, timings and pickup, custom cakes and gifts, and questions. */
export function HowToOrderPage() {
  return (
    <Layout path="/how-to-order">
      <PatternSurface
        as="section"
        pattern="stripes"
        tone="pink"
        scale="xl"
        ground="var(--bbm-color-bg-canvas)"
        className="site-section"
      >
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How to order' }]} />
          <div className="site-process__card order-steps">
            <SectionHeading
              level={1}
              size="xl"
              align="center"
              title={
                <>
                  How to <em>order</em>
                </>
              }
              description="No account and no checkout. You choose, the order opens in WhatsApp, and Mom takes it from there."
            />
            <StepList variant="row" steps={howToOrder} />
            <div className="site-center">
              <Button size="lg" href="/menu">
                See the menu
              </Button>
            </div>
          </div>
        </div>
      </PatternSurface>

      <OrderBandSection />

      <section id="special" className="site-section site-section--beige site-section--edged">
        <SectionEdge color="var(--bbm-color-bg-beige)" shape="wave" />
        <div className="site-container">
          <SectionHeading title="Something special?" align="center" />
          <div className="order-specials">
            {specials.map((special) => (
              <Card key={special.title} tone={special.tone} outline padding="lg" className="order-special">
                {special.icon}
                <h3 className="bbm-text-heading-md">{special.title}</h3>
                <p>{special.text}</p>
                <Button href={whatsappLink(special.message)} {...external}>
                  {special.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </Layout>
  );
}
