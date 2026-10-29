import { useState } from 'react';
import { FilterChips, SectionHeading } from '@bakesbymom/ui';
import { cakes, occasions } from '../content/catalog';
import { CakeCard, CatalogNote, occasionOptions } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs } from './order';
import { replaceUrl } from '../router';
import { SectionEdge } from '../sections/blocks';

const initialOccasion = () => new URLSearchParams(window.location.search).get('occasion') ?? 'all';

/** Every cake, by occasion (the old site's /catalog), with the occasion filter kept in the address. */
export function CatalogPage() {
  const [filter, setFilter] = useState<string[]>(() => [initialOccasion()]);
  // Checked on every render: the catalog may still be on its way when the page opens.
  const slug = occasions.some((occasion) => occasion.slug === filter[0]) ? filter[0]! : 'all';
  const shown = slug === 'all' ? occasions : occasions.filter((occasion) => occasion.slug === slug);

  const choose = (next: string[]) => {
    setFilter(next);
    const url = next[0] && next[0] !== 'all' ? `/catalog?occasion=${next[0]}` : '/catalog';
    replaceUrl(url);
  };

  return (
    <Layout path="/catalog">
      <section className="site-section site-section--blue">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cakes' }]} />
          <SectionHeading
            level={1}
            size="xl"
            align="center"
            eyebrow="the catalog"
            eyebrowStyle="pill"
            title={
              <>
                Every cake, <em>by occasion</em>
              </>
            }
            description="Browse a shelf, open a cake, and build your order. The final price follows the flavour, the size and the finishing touches you pick."
          />
          <div className="site-menu__filters">
            <FilterChips label="Show cakes for" options={occasionOptions()} value={[slug]} onChange={choose} />
            <p className="bbm-visually-hidden" aria-live="polite">
              Showing {shown.reduce((n, o) => n + o.cakes.length, 0)} of {cakes.length} cakes
            </p>
          </div>
          <CatalogNote />
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
