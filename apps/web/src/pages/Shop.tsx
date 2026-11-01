import { Button, Card, Doodle, ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { whatsappLink } from '../content/bakery';
import { cakes } from '../content/catalog';
import { orderLink } from '../content/site';
import { qtyLabel, treatCategories } from '../content/treats';
import { ComboScene, OrderStepScene, TreatsCounterScene } from '../iso/scenes';
import { SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

const customLink = whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake or box 🎂");

const STEPS = [
  {
    scene: 'message' as const,
    title: 'Message Mom',
    body: "Tell her the treat, how many and the day on WhatsApp. A day's notice helps, more for tiered cakes.",
  },
  {
    scene: 'bake' as const,
    title: 'Baked to order',
    body: 'Nothing is pre-made or pulled off a shelf. Your box is baked for you, eggless like everything else.',
  },
  {
    scene: 'box' as const,
    title: 'Boxed and tied',
    body: 'Pick it up from the kitchen in Panipat, or choose delivery and Mom sorts out the details with you.',
  },
];

/**
 * Cakes & Treats: the one place to order from. Every category, cakes first; each opens its own page (the cakes by
 * occasion, or a treat type), where you pick a bake, make it yours and send the order on WhatsApp. For anything not
 * on the menu, a custom order goes straight to Mom. Around the menu: an illustrated hero, how an order works, and
 * the combo.
 */
export function ShopPage() {
  return (
    <Layout path="/shop">
      <section className="site-section site-section--pink shop-hero">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cakes & Treats' }]} />
          <div className="shop-hero__grid">
            <div className="shop-hero__copy">
              <SectionHeading
                level={1}
                size="xl"
                eyebrow="order here"
                eyebrowStyle="pill"
                title={
                  <>
                    Cakes & <em>treats</em>
                  </>
                }
                description="Pick a category, choose a cake or a treat, make it yours, and send the order on WhatsApp. Cakes for every occasion, and brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos by the box, all baked to order."
              />
              <div className="shop-hero__actions">
                <Button href="#menu">See the menu</Button>
                <Button variant="secondary" href={orderLink} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </Button>
              </div>
              <ul className="shop-hero__facts" aria-label="At a glance">
                <li>
                  <strong>{treatCategories.length + 1}</strong> categories
                </li>
                <li>
                  <strong>100%</strong> eggless
                </li>
                <li>
                  <strong>0</strong> days on a shelf
                </li>
              </ul>
            </div>
            <div className="shop-hero__art">
              <TreatsCounterScene />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="site-section site-section--edged site-section--beige">
        <SectionEdge color="var(--bbm-color-bg-beige)" shape="scallop" />
        <div className="site-container">
          <SectionHeading
            align="center"
            eyebrow="pick a category"
            title={
              <>
                Something for <em>every craving</em>
              </>
            }
            description="Open one to see the bakes, the sizes and what they cost, then send your order to Mom."
          />
          <EgglessNote />
          <ul className="site-menu__grid shop-grid">
            <li>
              <ProductCard
                as="div"
                variant="menu"
                name="Cakes"
                image={{ src: stock.occasions.src, alt: '' }}
                description="Every cake, by occasion: birthdays, anniversaries, festivals and more."
                price={cakes.length ? `${cakes.length} cakes` : 'By occasion'}
                href="/catalog"
                tone="pink"
                headingLevel={3}
              />
            </li>
            {treatCategories.map((category, i) => (
              <li key={category.slug}>
                <ProductCard
                  as="div"
                  variant="menu"
                  name={category.name}
                  image={{ src: treatArt[category.slug]?.src ?? stock.cupcakes.src, alt: '' }}
                  description={category.blurb}
                  price={`From ${qtyLabel(category.minQty, category.unit)}`}
                  href={`/shop/${category.slug}`}
                  tone={TONES[(i + 1) % TONES.length]}
                  headingLevel={3}
                />
              </li>
            ))}
          </ul>
          <Card tone="beige" outline padding="md" className="shop-custom">
            <Doodle name="sparkle" size={40} color="var(--bbm-color-cherry-500)" />
            <div>
              <h2 className="shop-custom__title">Something of your own?</h2>
              <p>
                A theme, a photo, a size or a box that isn't on the menu: tell Mom the idea and the date, and she'll
                plan it with you.
              </p>
            </div>
            <Button href={customLink} target="_blank" rel="noreferrer">
              Plan a custom order
            </Button>
          </Card>
        </div>
      </section>

      <section
        className="site-section site-section--edged site-section--blue shop-steps"
        aria-labelledby="shop-steps-title"
      >
        <SectionEdge color="var(--bbm-color-bg-blue)" shape="wave" />
        <div className="site-container">
          <SectionHeading
            id="shop-steps-title"
            align="center"
            eyebrow="how it works"
            eyebrowStyle="pill"
            title={
              <>
                From a message <em>to a ribbon</em>
              </>
            }
          />
          <ol className="shop-steps__list">
            {STEPS.map((step, i) => (
              <li key={step.scene} className="shop-step">
                <div className="shop-step__art">
                  <OrderStepScene step={step.scene} />
                </div>
                <p className="shop-step__num" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="shop-step__title">{step.title}</h3>
                <p className="shop-step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-section site-section--edged site-section--cocoa shop-combo">
        <SectionEdge color="var(--bbm-color-bg-inverse)" shape="scallop" />
        <div className="site-container">
          <div className="shop-combo__art">
            <ComboScene />
          </div>
          <div className="shop-combo__copy">
            <p className="shop-combo__kicker">can't pick one?</p>
            <h2 className="shop-combo__title">
              Make it a <em>combo</em>
            </h2>
            <p>
              A cake and a set of cupcakes iced to match, in one box. Tell Mom the occasion and the colours, she'll do
              the rest.
            </p>
            <div className="shop-hero__actions">
              <Button href="/shop/combos">See the combos</Button>
              <Button variant="ghost" href={orderLink} target="_blank" rel="noreferrer" className="shop-combo__ghost">
                Ask Mom on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
