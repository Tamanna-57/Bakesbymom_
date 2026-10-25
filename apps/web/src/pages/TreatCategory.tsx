import { Button, Card, PatternSurface, ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { treatCategories, type TreatCategory } from '../content/treats';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

/** One kind of treat (the old site's /shop/<type>): what to know, then every item. */
export function TreatCategoryPage({ category }: { category: TreatCategory }) {
  const image = treatArt[category.slug] ?? stock.cupcakes;
  return (
    <Layout path="/shop">
      <section className="site-section">
        <div className="site-container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Treats', href: '/shop' }, { label: category.name }]}
          />
          <div className="shop-category">
            <PatternSurface pattern="gingham" tone="pink" className="shop-category__art">
              <img src={image.src} alt={image.alt} width={320} height={320} />
              <p className="shop-photo-note">Photo for reference. Every box is baked to order.</p>
            </PatternSurface>
            <div className="shop-category__intro">
              <SectionHeading level={1} size="xl" title={category.name} description={category.blurb} />
              <EgglessNote />
              <Card tone="blue" outline padding="md">
                <p className="bbm-text-eyebrow">Good to know</p>
                <ul className="shop-know">
                  <li>
                    Smallest order: {category.minQty} {category.unit}
                  </li>
                  {category.perBox && (
                    <li>
                      One box holds {category.perBox} {category.unit}
                    </li>
                  )}
                  {category.choices && (
                    <li>
                      {category.choiceLabel}: {category.choices.join(', ')}. Pick yours when you open one; any flavour
                      can be baked in any of these.
                    </li>
                  )}
                  <li>Baked to order, never off a shelf</li>
                  <li>Price confirmed on WhatsApp</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section--beige">
        <div className="site-container">
          <ul className="site-menu__grid">
            {category.items.map((treat, i) => (
              <li key={treat.slug}>
                <ProductCard
                  as="div"
                  variant="menu"
                  name={treat.name}
                  image={{ src: image.src, alt: '' }}
                  description={treat.blurb}
                  price="Customise & order"
                  href={`/shop/${category.slug}/${treat.slug}`}
                  tone={TONES[i % TONES.length]}
                  headingLevel={2}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionHeading title="More from the kitchen" size="md" align="center" />
          <div className="shop-more">
            <Button variant="secondary" href="/catalog">
              Cakes
            </Button>
            {treatCategories
              .filter((other) => other.slug !== category.slug)
              .map((other) => (
                <Button key={other.slug} variant="secondary" href={`/shop/${other.slug}`}>
                  {other.name}
                </Button>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
