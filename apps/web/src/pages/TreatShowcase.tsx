/**
 * Every treat category's page, after a cookie shop on Pinterest (The Crumb Culture), in the board's palette and type:
 * a hero in the category's own color with a fan of photos, then the treats as framed cards on the baby blue band.
 * Straight from the hero to ordering: each card opens its treat to customise and send on WhatsApp. The template is
 * the same for every category; the color, the words and the photos come from content/treats.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Button, Doodle, PriceTag, SectionHeading, type DoodleName } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { qtyLabel, type TreatCategory, type TreatShowcase as Showcase } from '../content/treats';
import { SectionEdge } from '../sections/blocks';
import { Breadcrumbs } from './order';
import './treat-showcase.css';

export function TreatShowcase({
  category,
  showcase,
  more,
}: {
  category: TreatCategory;
  showcase: Showcase;
  /** "More from the kitchen", after the bands. */
  more: ReactNode;
}) {
  const photo = treatArt[category.slug] ?? stock.cupcakes;
  const shots = showcase.heroPhotos.slice(0, 3);
  // The fan's places: the middle card is always there and largest; one photo is just that card
  const places = shots.length === 1 ? [2] : shots.length === 2 ? [1, 2] : [1, 2, 3];
  const smallest = qtyLabel(category.minQty, category.unit);
  const decorations: Array<{ name: DoodleName; className: string; color: string; size: number }> = [
    { name: 'heart', className: 'treat-sig__deco--a', color: 'var(--bbm-color-cherry-500)', size: 40 },
    { name: 'sparkle', className: 'treat-sig__deco--b', color: 'var(--bbm-color-butter-300)', size: 48 },
    { name: 'sparkle', className: 'treat-sig__deco--c', color: 'var(--bbm-color-paper)', size: 34 },
    { name: 'heart', className: 'treat-sig__deco--d', color: 'var(--bbm-color-pink-300)', size: 38 },
  ];

  return (
    <>
      {/* Hero: the category's own color, the words on the left and a fan of photo cards on the right, a wave at the
          top (the header's) and the foot (the cards band's) */}
      <section
        className="treat-hero"
        style={{ '--hero-bg': `var(--bbm-color-${showcase.tone})` } as CSSProperties}
        aria-labelledby="treat-hero-title"
      >
        <div className="treat-hero__inner">
          <div className="treat-hero__copy">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cakes & Treats', href: '/shop' },
                { label: category.name },
              ]}
            />
            <h1 id="treat-hero-title" className="treat-hero__title">
              <span className="bbm-visually-hidden">{category.name}: </span>
              {showcase.title} <span className="treat-hero__script">{showcase.script}</span>
            </h1>
            <p className="treat-hero__tagline">{showcase.tagline}</p>
            <div className="treat-hero__actions">
              <Button size="lg" href="#menu">
                Pick your {category.name.toLowerCase()}
              </Button>
            </div>
            <p className="treat-hero__note">Photos for reference. Every box is baked to order.</p>
          </div>
          <div className={`treat-hero__fan treat-hero__fan--${shots.length}`}>
            {shots.map((shot, i) => (
              <img
                key={shot.src}
                className={`treat-hero__card treat-hero__card--${places[i]}`}
                src={shot.src}
                alt={shot.alt}
                fetchPriority={places[i] === 2 ? 'high' : undefined}
              />
            ))}
            <PriceTag
              className="treat-hero__burst"
              shape="burst"
              tone="butter"
              amount="100%"
              label="eggless"
              size={104}
              rotate={-12}
            />
          </div>
        </div>
      </section>

      {/* The treats, as framed cards on the baby blue band (the Cakes band's color), its wave rising into the hero */}
      <section id="menu" className="site-section site-section--blue site-section--edged treat-sig">
        <SectionEdge color="var(--bbm-color-bg-blue)" shape="wave" />
        {decorations.map((d) => (
          <Doodle
            key={d.className}
            name={d.name}
            size={d.size}
            color={d.color}
            className={`treat-sig__deco ${d.className}`}
          />
        ))}
        <div className="site-container">
          <SectionHeading
            align="center"
            title={
              <>
                Our <em>{category.name.toLowerCase()}</em>
              </>
            }
            description={`Open one to pick your ${category.choiceLabel?.toLowerCase() ?? 'box'}, make it yours and send the order on WhatsApp.`}
          />
          <ul className="treat-sig__grid">
            {category.items.map((treat) => {
              return (
                <li key={treat.slug}>
                  <article className="treat-card">
                    <a
                      className="treat-card__frame"
                      href={`/shop/${category.slug}/${treat.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img src={(treat.photo ?? photo).src} alt="" loading="lazy" />
                    </a>
                    <h3 className="treat-card__name">{treat.name}</h3>
                    <p className="treat-card__blurb">{treat.blurb}</p>
                    <Button size="sm" fullWidth href={`/shop/${category.slug}/${treat.slug}`}>
                      Customise & order
                    </Button>
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="treat-sig__note">
            Sold from {smallest}, priced on WhatsApp. Photos for reference; every box is baked to order.
          </p>
        </div>
      </section>

      {more}
    </>
  );
}
