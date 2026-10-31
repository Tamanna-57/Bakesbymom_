import { Button, Card, Doodle, ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { whatsappLink } from '../content/bakery';
import { cakes } from '../content/catalog';
import { qtyLabel, treatCategories } from '../content/treats';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

const customLink = whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake or box 🎂");

/**
 * Cakes & Treats: the one place to order from. Every category, cakes first; each opens its own page (the cakes by
 * occasion, or a treat type), where you pick a bake, make it yours and send the order on WhatsApp. For anything not
 * on the menu, a custom order goes straight to Mom.
 */
export function ShopPage() {
  return (
    <Layout path="/shop">
      <section className="site-section site-section--pink">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cakes & Treats' }]} />
          <SectionHeading
            level={1}
            size="xl"
            align="center"
            eyebrow="order here"
            eyebrowStyle="pill"
            title={
              <>
                Cakes & <em>treats</em>
              </>
            }
            description="Pick a category, choose a cake or a treat, make it yours, and send the order on WhatsApp. Cakes for every occasion, and brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos by the box, all baked to order."
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
                price={cakes.length ? `${cakes.length} cakes` : 'By occasion'}
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
                  price={`From ${qtyLabel(category.minQty, category.unit)}`}
                  href={`/shop/${category.slug}`}
                  tone={TONES[(i + 1) % TONES.length]}
                  headingLevel={2}
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
    </Layout>
  );
}
