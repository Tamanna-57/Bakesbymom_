import { useState } from 'react';
import { FilterChips, SectionHeading } from '@bakesbymom/ui';
import { cakes, occasions } from '../content/catalog';
import { CakeCard, occasionOptions } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs } from './order';
import { SectionEdge } from '../sections/blocks';
import { CakeStandScene } from '../iso/scenes';
import { Button } from '@bakesbymom/ui';
import { orderLink } from '../content/site';

const initialOccasion = () => {
  const wanted = new URLSearchParams(window.location.search).get('occasion');
  return occasions.some((occasion) => occasion.slug === wanted) ? wanted! : 'all';
};

/** Every cake, by occasion (the old site's /catalog), with the occasion filter kept in the address. */
export function CatalogPage() {
  const [filter, setFilter] = useState<string[]>(() => [initialOccasion()]);
  const slug = filter[0] ?? 'all';
  const shown = slug === 'all' ? occasions : occasions.filter((occasion) => occasion.slug === slug);

  const choose = (next: string[]) => {
    setFilter(next);
    const url = next[0] && next[0] !== 'all' ? `/catalog?occasion=${next[0]}` : '/catalog';
    window.history.replaceState(null, '', url);
  };

  return (
    <Layout path="/catalog">
      <section className="site-section site-section--blue shop-hero">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cakes' }]} />
          <div className="shop-hero__grid">
            <div className="shop-hero__copy">
              <SectionHeading
                level={1}
                size="xl"
                eyebrow="the catalog"
                eyebrowStyle="pill"
                title={
                  <>
                    Every cake, <em>by occasion</em>
                  </>
                }
                description="Browse a shelf, open a cake, and build your order. The final price follows the flavour, the size and the finishing touches you pick."
              />
              <div className="shop-hero__actions">
                <Button href="#shelves">Browse the shelves</Button>
                <Button variant="secondary" href={orderLink} target="_blank" rel="noreferrer">
                  Ask for a custom cake
                </Button>
              </div>
              <ul className="shop-hero__facts" aria-label="At a glance">
                <li>
                  <strong>{cakes.length}</strong> cakes
                </li>
                <li>
                  <strong>{occasions.length}</strong> occasions
                </li>
                <li>
                  <strong>100%</strong> eggless
                </li>
              </ul>
            </div>
            <div className="shop-hero__art">
              <CakeStandScene />
            </div>
          </div>
          <div className="site-menu__filters" id="shelves">
            <FilterChips label="Show cakes for" options={occasionOptions} value={filter} onChange={choose} />
            <p className="bbm-visually-hidden" aria-live="polite">
              Showing {shown.reduce((n, o) => n + o.cakes.length, 0)} of {cakes.length} cakes
            </p>
          </div>
        </div>
      </section>
      {shown.map((occasion, i) => (
        <section
          key={occasion.slug}
          id={occasion.slug}
          className={[
            'site-section',
            'site-section--edged',
            'catalog-shelf',
            i % 2 ? 'site-section--beige' : 'site-section--pink',
          ].join(' ')}
        >
          <SectionEdge
            color={i % 2 ? 'var(--bbm-color-bg-beige)' : 'var(--bbm-color-bg-pink)'}
            shape={i % 2 ? 'wave' : 'scallop'}
          />
          <div className="site-container">
            <SectionHeading title={occasion.name} description={occasion.description} size="md" />
            <ul className="site-menu__grid">
              {occasion.cakes.map((cake, j) => (
                <li key={cake.slug}>
                  <CakeCard cake={cake} index={j + i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </Layout>
  );
}
