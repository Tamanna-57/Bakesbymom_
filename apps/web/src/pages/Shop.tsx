import { Button, ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { cakes } from '../content/catalog';
import { orderLink } from '../content/site';
import { treatCategories } from '../content/treats';
import { OrderStepScene, TreatsCounterScene, ComboScene } from '../iso/scenes';
import { SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

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

/** Every kind of bake, by the box. */
export function ShopPage() {
  return (
    <Layout path="/shop">
      <section className="site-section site-section--pink shop-hero">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treats' }]} />
          <div className="shop-hero__grid">
            <div className="shop-hero__copy">
              <SectionHeading
                level={1}
                size="xl"
                eyebrow="products"
                eyebrowStyle="pill"
                title={
                  <>
                    Treats, <em>by the box</em>
                  </>
                }
                description="Brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos, all baked to order in Mom's kitchen."
              />
              <div className="shop-hero__actions">
                <Button href="#treats">See every treat</Button>
                <Button variant="secondary" href={orderLink} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </Button>
              </div>
              <ul className="shop-hero__facts" aria-label="At a glance">
                <li>
                  <strong>{treatCategories.length}</strong> kinds of treat
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

      <section id="treats" className="site-section site-section--edged site-section--beige">
        <SectionEdge color="var(--bbm-color-bg-beige)" shape="scallop" />
        <div className="site-container">
          <SectionHeading
            align="center"
            eyebrow="pick a box"
            title={
              <>
                Something for <em>every craving</em>
              </>
            }
            description="Open one to see the sizes, the flavours and what a box costs, then send it to Mom."
          />
          <EgglessNote />
          <ul className="site-menu__grid shop-grid">
            <li className="shop-grid__feature">
              <ProductCard
                as="div"
                variant="menu"
                name="Cakes"
                image={{ src: stock.occasions.src, alt: '' }}
                description="Every cake, by occasion: birthdays, anniversaries, festivals and more."
                price={`${cakes.length} cakes`}
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
                  price={`From ${category.minQty} ${category.unit}`}
                  href={`/shop/${category.slug}`}
                  tone={TONES[(i + 1) % TONES.length]}
                  headingLevel={3}
                />
              </li>
            ))}
          </ul>
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
