/**
 * The showcase layout for a treat type's page (the cookies first), after a cookie shop on Pinterest (The Crumb
 * Culture), redrawn in the board's palette and type: a photo hero between wavy edges, "only the good stuff" with a
 * mascot, a double ribbon, the treats as framed cards, and a "we keep it simple" band. Everything it says comes from
 * the category in content/treats.ts.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Button, Doodle, Marquee, PriceTag, SectionHeading, type DoodleName } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { qtyLabel, type TreatCategory, type TreatShowcase as Showcase } from '../content/treats';
import { SectionEdge } from '../sections/blocks';
import { Breadcrumbs } from './order';
import './treat-showcase.css';

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;

/** A smiling cookie on a butter starburst: the page's mascot (the reference's sun, as one of ours). */
export function CookieMascot({ className }: { className?: string }) {
  // A 16-point starburst around the cookie
  const rays = Array.from({ length: 32 }, (_, i) => {
    const r = i % 2 ? 72 : 96;
    const a = (i / 32) * Math.PI * 2;
    return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return (
    <svg className={['treat-mascot', className].filter(Boolean).join(' ')} viewBox="0 0 200 200" aria-hidden="true">
      <polygon className="treat-mascot__rays" points={rays} />
      <circle className="treat-mascot__cookie" cx="100" cy="100" r="60" />
      <g className="treat-mascot__chips">
        <ellipse cx="70" cy="76" rx="7" ry="5.5" transform="rotate(-20 70 76)" />
        <ellipse cx="128" cy="70" rx="6" ry="5" />
        <ellipse cx="140" cy="118" rx="7" ry="5.5" transform="rotate(25 140 118)" />
        <ellipse cx="66" cy="126" rx="6" ry="5" />
        <ellipse cx="100" cy="146" rx="6.5" ry="5" />
      </g>
      <g className="treat-mascot__eyes">
        <circle className="treat-mascot__white" cx="84" cy="94" r="13" />
        <circle className="treat-mascot__white" cx="116" cy="94" r="13" />
        <circle className="treat-mascot__pupil" cx="88" cy="96" r="6" />
        <circle className="treat-mascot__pupil" cx="120" cy="96" r="6" />
      </g>
      <ellipse className="treat-mascot__cheek" cx="68" cy="112" rx="8" ry="5.5" />
      <ellipse className="treat-mascot__cheek" cx="132" cy="112" rx="8" ry="5.5" />
      <path className="treat-mascot__smile" d="M84 118 Q100 134 116 118" />
    </svg>
  );
}

/** A close-up of one spot in the category photo, for a card with no photo of its own. */
function cropStyle(crop: [number, number] | undefined): CSSProperties | undefined {
  if (!crop) return undefined;
  return { '--crop-x': crop[0], '--crop-y': crop[1] } as CSSProperties;
}

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
  const smallest = qtyLabel(category.minQty, category.unit);
  const features: Array<{ icon: ReactNode; label: string }> = [
    { icon: <span className="site-veg-dot site-veg-dot--lg" />, label: '100% eggless' },
    {
      icon: <Doodle name="whisk" size={48} />,
      label: category.choiceLabel ? `Choose your ${category.choiceLabel.toLowerCase()}` : 'Make it yours',
    },
    { icon: <Doodle name="heart" size={44} color="var(--bbm-color-cherry-700)" />, label: 'Baked to order' },
    { icon: <Doodle name="bow" size={48} color="var(--bbm-color-cherry-700)" />, label: `From ${smallest}` },
  ];
  const decorations: Array<{ name: DoodleName; className: string; color: string; size: number }> = [
    { name: 'heart', className: 'treat-sig__deco--a', color: 'var(--bbm-color-cherry-500)', size: 40 },
    { name: 'sparkle', className: 'treat-sig__deco--b', color: 'var(--bbm-color-butter-400)', size: 44 },
    { name: 'sparkle', className: 'treat-sig__deco--c', color: 'var(--bbm-color-cherry-500)', size: 34 },
    { name: 'heart', className: 'treat-sig__deco--d', color: 'var(--bbm-color-pink-500)', size: 36 },
  ];

  return (
    <>
      {/* Hero: the photo full-bleed under a cocoa shade, the wave of the next band along its foot */}
      <section className="treat-hero" aria-labelledby="treat-hero-title">
        <img className="treat-hero__photo" src={photo.src} alt="" width={900} height={1349} />
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

      {/* Only the good stuff, with the mascot */}
      <section className="site-section site-section--edged treat-good">
        <SectionEdge color="var(--bbm-color-bg-canvas)" shape="wave" />
        <div className="site-container treat-good__inner">
          <div className="treat-good__copy">
            <h2 className="treat-good__title">{showcase.goodStuff.title}</h2>
            <p className="treat-good__text">{showcase.goodStuff.text}</p>
            <Button size="sm" variant="secondary" href="#menu">
              See the {category.name.toLowerCase()}
            </Button>
          </div>
          <CookieMascot className="treat-good__mascot" />
        </div>
      </section>

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

      {/* The treats, as framed cards */}
      <section id="menu" className="site-section treat-sig">
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
            variant="bubble"
            align="center"
            title={`Our ${category.name.toLowerCase()}`}
            description={`Open one to pick your ${category.choiceLabel?.toLowerCase() ?? 'box'}, make it yours and send the order on WhatsApp.`}
          />
          <ul className="treat-sig__grid">
            {category.items.map((treat, i) => (
              <li key={treat.slug}>
                <article className="treat-card">
                  <a
                    className="treat-card__frame"
                    href={`/shop/${category.slug}/${treat.slug}`}
                    data-bbm-tone={TONES[i % TONES.length]}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {treat.photo ? (
                      <img src={treat.photo.src} alt="" loading="lazy" />
                    ) : (
                      <img
                        className="treat-card__crop"
                        src={photo.src}
                        alt=""
                        loading="lazy"
                        style={cropStyle(showcase.crops[i % showcase.crops.length])}
                      />
                    )}
                  </a>
                  <h3 className="treat-card__name">{treat.name}</h3>
                  <p className="treat-card__blurb">{treat.blurb}</p>
                  <Button size="sm" fullWidth href={`/shop/${category.slug}/${treat.slug}`}>
                    Customise & order
                  </Button>
                </article>
              </li>
            ))}
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
                <span className="treat-simple__icon" aria-hidden="true">
                  {feature.icon}
                </span>
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
