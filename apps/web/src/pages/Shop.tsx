import { ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { cakes } from '../content/catalog';
import { treatCategories } from '../content/treats';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

/** Every kind of bake, by the box. */
export function ShopPage() {
  return (
    <Layout path="/shop">
      <section className="site-section">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treats' }]} />
          <SectionHeading
            level={1}
            size="xl"
            align="center"
            eyebrow="products"
            eyebrowStyle="pill"
            title={
              <>
                Treats, <em>by the box</em>
              </>
            }
            description="Brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos, all baked to order."
          />
          <EgglessNote />
          <ul className="site-menu__grid">
            <li>
              <ProductCard
                as="div"
                variant="menu"
                name="Cakes"
                image={{ src: stock.occasions.src, alt: '' }}
                description="Every cake, by occasion: birthdays, anniversaries, festivals and more."
                price={`${cakes.length} cakes`}
                href="/catalog"
                tone="pink"
                headingLevel={2}
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
                  headingLevel={2}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
