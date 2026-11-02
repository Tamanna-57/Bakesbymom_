/**
 * The showcase layout for a treat type's page (the cookies first), after a cookie shop on Pinterest (The Crumb
 * Culture), redrawn in the board's palette and type, on the site's own colored bands: a cherry hero with a photo,
 * "only the good stuff" on pink polka dots with a drawing, a double ribbon, the treats as framed cards on the baby
 * blue band (each with its own drawing), and a butter "we keep it simple" band. The words come from content/treats.ts.
 */
import type { ReactNode } from 'react';
import {
  Button,
  Doodle,
  Marquee,
  PatternSurface,
  Polaroid,
  PriceTag,
  SectionHeading,
  StickerIcon,
  type DoodleName,
  type StickerIconName,
} from '@bakesbymom/ui';
import { showcaseArt, stock, treatArt, treatItemArt } from '../content';
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
  const hero = showcase.hero ?? photo;
  const goodPhoto = showcaseArt[category.slug];
  const smallest = qtyLabel(category.minQty, category.unit);
  const features: Array<{ icon: StickerIconName; label: string }> = [
    { icon: 'sprout', label: '100% eggless' },
    {
      icon: 'flour',
      label: category.choiceLabel ? `Choose your ${category.choiceLabel.toLowerCase()}` : 'Make it yours',
    },
    { icon: 'mitt', label: 'Baked to order' },
    { icon: 'gift', label: `From ${smallest}` },
  ];
  const decorations: Array<{ name: DoodleName; className: string; color: string; size: number }> = [
    { name: 'heart', className: 'treat-sig__deco--a', color: 'var(--bbm-color-cherry-500)', size: 40 },
    { name: 'sparkle', className: 'treat-sig__deco--b', color: 'var(--bbm-color-butter-300)', size: 48 },
    { name: 'sparkle', className: 'treat-sig__deco--c', color: 'var(--bbm-color-paper)', size: 34 },
    { name: 'heart', className: 'treat-sig__deco--d', color: 'var(--bbm-color-pink-300)', size: 38 },
  ];

  return (
    <>
      {/* Hero: the wide photo full-bleed under a pink tint, the words over it, a wave at the top (the header's)
          and the foot (the pink band's) */}
      <section className="treat-hero" aria-labelledby="treat-hero-title">
        <img className="treat-hero__photo" src={hero.src} alt="" />
        <div className="treat-hero__inner">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Cakes & Treats', href: '/shop' }, { label: category.name }]}
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
          <p className="treat-hero__note">Photo for reference. Every box is baked to order.</p>
        </div>
        <PriceTag
          className="treat-hero__burst"
          shape="burst"
          tone="butter"
          amount="100%"
          label="eggless"
          size={112}
          rotate={-12}
        />
      </section>

      {/* Only the good stuff, on the pink polka dots of the home page */}
      <PatternSurface
        as="section"
        pattern="dots"
        tone="pink"
        ground="var(--bbm-color-bg-pink)"
        className="site-section site-section--edged treat-good"
      >
        <SectionEdge color="var(--bbm-color-bg-pink)" shape="wave" />
        <div className="site-container treat-good__inner">
          <div className="treat-good__copy">
            <h2 className="treat-good__title">{showcase.goodStuff.title}</h2>
            <p className="treat-good__text">{showcase.goodStuff.text}</p>
            <Button size="sm" variant="secondary" href="#menu">
              See the {category.name.toLowerCase()}
            </Button>
          </div>
          {goodPhoto && (
            <div className="treat-good__art">
              <Polaroid
                frame="scallop"
                tone="butter"
                src={goodPhoto.src}
                alt={goodPhoto.alt}
                rotate={3}
                aspect="4/5"
                width="100%"
              />
              <PriceTag
                className="treat-good__tag"
                shape="burst"
                tone="pink"
                amount="fresh"
                label="every tin"
                size={96}
                rotate={-10}
              />
            </div>
          )}
        </div>
      </PatternSurface>

      <div className="treat-ribbons">
        <Marquee
          tone="cherry"
          size="sm"
          label={`About our ${category.name.toLowerCase()}`}
          items={showcase.ribbon[0]}
          separator={<Doodle name="heart" size="1em" />}
        />
        <Marquee
          tone="butter"
          size="sm"
          label={`More about our ${category.name.toLowerCase()}`}
          items={showcase.ribbon[1]}
          separator={<Doodle name="daisy" size="1em" />}
          direction="reverse"
        />
      </div>

      {/* The treats, as framed cards on the baby blue band (the Cakes band's color) */}
      <section id="menu" className="site-section site-section--blue treat-sig">
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
              const own = treat.photo;
              const drawing = treatItemArt[treat.slug];
              return (
                <li key={treat.slug}>
                  <article className="treat-card">
                    <a
                      className="treat-card__frame"
                      href={`/shop/${category.slug}/${treat.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        className={own || !drawing ? undefined : 'treat-card__drawing'}
                        src={(own ?? drawing ?? photo).src}
                        alt=""
                        loading="lazy"
                      />
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

      {/* We keep it simple */}
      <section className="site-section site-section--edged treat-simple" aria-labelledby="treat-simple-title">
        <SectionEdge color="var(--bbm-color-butter-300)" shape="wave" />
        <div className="site-container">
          <div className="treat-simple__head">
            <h2 id="treat-simple-title" className="treat-simple__title">
              We keep it simple
            </h2>
            <p className="treat-simple__lead">Fewer things, baked better</p>
          </div>
          <ul className="treat-simple__list">
            {features.map((feature) => (
              <li key={feature.label}>
                <StickerIcon name={feature.icon} size={72} className="treat-simple__icon" />
                {feature.label}
              </li>
            ))}
          </ul>
          {category.choices && (
            <p className="treat-simple__extra">
              <strong>{category.choiceLabel}:</strong> {category.choices.join(', ')}. <strong>Make it yours:</strong>{' '}
              {category.extras.join(', ').toLowerCase()}.
            </p>
          )}
        </div>
      </section>

      {more}
    </>
  );
}
