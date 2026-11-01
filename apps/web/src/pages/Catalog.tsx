import { useState } from 'react';
import { Button, FilterChips, SectionHeading } from '@bakesbymom/ui';
import { flavours } from '../content';
import { findFlavour, flavourSlug } from '../content/bakery';
import { cakes, occasions } from '../content/catalog';
import { CakeCard, CatalogNote, occasionOptions } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs } from './order';
import { replaceUrl } from '../router';
import { SectionEdge } from '../sections/blocks';
import { orderLink } from '../content/site';
import { CakeStandScene } from '../iso/scenes';

const param = (name: string) => new URLSearchParams(window.location.search).get(name);

/** /catalog, /catalog?occasion=anniversary, /catalog?flavour=vanilla, or both. */
const catalogUrl = (occasion: string, flavour: string | undefined) => {
  const query = new URLSearchParams();
  if (occasion !== 'all') query.set('occasion', occasion);
  if (flavour) query.set('flavour', flavourSlug(flavour));
  return query.size ? `/catalog?${query}` : '/catalog';
};

/**
 * Every cake, by occasion (the old site's /catalog), with the occasion filter kept in the address. A flavour from
 * the home page's flavour cards (?flavour=chocolate-truffle) shows every cake in that flavour: any cake can be
 * baked in any of them, so each one opens with it already picked.
 */
export function CatalogPage() {
  const [filter, setFilter] = useState<string[]>(() => [param('occasion') ?? 'all']);
  const [flavour, setFlavour] = useState(() => findFlavour(param('flavour')));
  const photo = flavour ? flavours[flavour] : undefined;
  // Checked on every render: the catalog may still be on its way when the page opens.
  const slug = occasions.some((occasion) => occasion.slug === filter[0]) ? filter[0]! : 'all';
  const shown = slug === 'all' ? occasions : occasions.filter((occasion) => occasion.slug === slug);

  const choose = (next: string[]) => {
    setFilter(next);
    replaceUrl(catalogUrl(next[0] ?? 'all', flavour));
  };

  const clearFlavour = () => {
    setFlavour(undefined);
    replaceUrl(catalogUrl(slug, undefined));
  };

  return (
    <Layout path="/catalog">
      <section className="site-section site-section--blue shop-hero">
        <div className="site-container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Cakes & Treats', href: '/shop' }, { label: 'Cakes' }]}
          />
          <div className="shop-hero__grid">
            <div className="shop-hero__copy">
              <SectionHeading
                level={1}
                size="xl"
                eyebrow="the catalog"
                eyebrowStyle="pill"
                title={
                  flavour ? (
                    <>
                      Every cake, in <em>{flavour.toLowerCase()}</em>
                    </>
                  ) : (
                    <>
                      Every cake, <em>by occasion</em>
                    </>
                  )
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
                {cakes.length > 0 && (
                  <li>
                    <strong>{cakes.length}</strong> cakes
                  </li>
                )}
                {occasions.length > 0 && (
                  <li>
                    <strong>{occasions.length}</strong> occasions
                  </li>
                )}
                <li>
                  <strong>100%</strong> eggless
                </li>
              </ul>
            </div>
            <div className="shop-hero__art">
              <CakeStandScene />
            </div>
          </div>
          {flavour && (
            <div className="catalog-flavour">
              {photo && <img src={photo.src} alt={photo.alt} width={96} height={96} />}
              <p>
                <strong>Every cake below can be baked in {flavour.toLowerCase()}.</strong> {photo?.inside} Open one and
                it's already picked for you.
              </p>
              <Button size="sm" variant="secondary" onClick={clearFlavour}>
                Show all flavours
              </Button>
            </div>
          )}
          <div className="site-menu__filters" id="shelves">
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
                  <CakeCard cake={cake} index={j + i} flavour={flavour && flavourSlug(flavour)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </Layout>
  );
}
