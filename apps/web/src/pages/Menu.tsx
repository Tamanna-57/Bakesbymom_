import { useState } from 'react';
import { Button, FilterChips, ProductCard, SectionHeading } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { cakes, occasions } from '../content/catalog';
import { treatCategories } from '../content/treats';
import { replaceUrl } from '../router';
import { CakeCard, CatalogNote, occasionOptions, SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

const initialOccasion = () => new URLSearchParams(window.location.search).get('occasion') ?? 'all';

/**
 * The whole menu on one page (/menu, and the old /catalog and /shop): cakes by occasion, then treats by the box.
 * A cake opens its own page; a treat opens its type's page, where the flavour is picked in the order form.
 */
export function MenuPage() {
  const [filter, setFilter] = useState<string[]>(() => [initialOccasion()]);
  // Checked on every render: the catalog may still be on its way when the page opens.
  const slug = occasions.some((occasion) => occasion.slug === filter[0]) ? filter[0]! : 'all';
  const shown = slug === 'all' ? occasions : occasions.filter((occasion) => occasion.slug === slug);

  const choose = (next: string[]) => {
    setFilter(next);
    const url = next[0] && next[0] !== 'all' ? `/menu?occasion=${next[0]}` : '/menu';
    replaceUrl(url);
  };

  return (
    <Layout path="/menu">
      <section className="site-section site-section--blue menu-head">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Menu' }]} />
          <SectionHeading
            level={1}
            size="xl"
            align="center"
            eyebrow="the menu"
            eyebrowStyle="pill"
            title={
              <>
                Everything <em>Mom bakes</em>
              </>
            }
            description="Cakes for every occasion, and treats by the box. Open one, make it yours, and send the order on WhatsApp."
          />
          <nav className="shop-more menu-jump" aria-label="Jump to">
            <Button size="sm" href="#cakes">
              Cakes
            </Button>
            {treatCategories.map((category) => (
              <Button key={category.slug} size="sm" variant="secondary" href={`/shop/${category.slug}`}>
                {category.name}
              </Button>
            ))}
          </nav>
          <EgglessNote />
        </div>
      </section>

      <section id="cakes" className="site-section site-section--pink site-section--edged">
        <SectionEdge color="var(--bbm-color-bg-pink)" />
        <div className="site-container">
          <SectionHeading
            title="Cakes"
            align="center"
            description="Prices are for the listed weight. Pick any size and flavour on the cake's page; Mom confirms on WhatsApp."
          />
          <div className="site-menu__filters">
            <FilterChips label="Show cakes for" options={occasionOptions()} value={[slug]} onChange={choose} />
            <p className="bbm-visually-hidden" aria-live="polite">
              Showing {shown.reduce((n, o) => n + o.cakes.length, 0)} of {cakes.length} cakes
            </p>
          </div>
          <CatalogNote />
          {shown.map((occasion, i) => (
            <div key={occasion.slug} id={occasion.slug} className="menu-shelf">
              <h3 className="menu-shelf__title">{occasion.name}</h3>
              <ul className="site-menu__grid">
                {occasion.cakes.map((cake, j) => (
                  <li key={cake.slug}>
                    <CakeCard cake={cake} index={j + i} headingLevel={4} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="treats" className="site-section site-section--beige site-section--edged">
        <SectionEdge color="var(--bbm-color-bg-beige)" shape="wave" />
        <div className="site-container">
          <SectionHeading
            title={
              <>
                Treats, <em>by the box</em>
              </>
            }
            align="center"
            description="Open one to pick the flavour, how many and the day you need it."
          />
          <ul className="site-menu__grid">
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
                  tone={TONES[i % TONES.length]}
                  headingLevel={3}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
