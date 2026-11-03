/**
 * The home page sections, after pin 16 (SugarLace: stripes, the outlined about card, the flavour grid,
 * the order card and cherry tiles) and pin 13 (Puzzle Pantry: the shape ribbon, shop by the box with
 * filter pills, the split about). The feature strip, the starburst and the checker
 * quote come from other bakery sites on Pinterest (Sweet Crumbs, joe & dough, Sunday Bakehouse).
 * Photos here are stock (content/index.ts `stock`, `treatArt`, `flavours`); the photos of the cakes we sell are
 * kept for the catalog and the gallery.
 */
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from 'react';
import {
  Button,
  Card,
  Doodle,
  FilterChips,
  Marquee,
  PatternSurface,
  Polaroid,
  PriceTag,
  SectionHeading,
  Ticket,
} from '@bakesbymom/ui';
import { Badge, Collage } from '../collage/Collage';
import { flavours, stock, treatArt } from '../content';
import { bakery, cakeFlavours, cakeSizes, flavourSlug, whatsappLink } from '../content/bakery';
import { howToOrder, orderLink } from '../content/site';
import { SectionEdge } from './blocks';
import { treatCategories } from '../content/treats';
import './home.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;
const TILE_TONES = ['pink', 'blue', 'butter', 'beige'] as const;

/* Hero (pin 16's stripes, with a cream label card) -------------------- */

export function HomeHero() {
  return (
    <PatternSurface
      as="section"
      pattern="stripes"
      tone="blue"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="home-hero"
      aria-labelledby="home-title"
    >
      <div className="home-hero__inner">
        <div className="home-hero__art">
          <img
            className="home-hero__photo"
            src={stock.hero.src}
            alt={stock.hero.alt}
            width={733}
            height={1100}
            data-parallax="-0.06"
          />
          <div className="home-hero__burst">
            <Collage ratio={1} label="100% eggless">
              <Badge value="100%" label="eggless" tone="cherry" place={{ x: 0, y: 0, w: 100, r: -10 }} />
            </Collage>
          </div>
        </div>
        <div className="home-hero__card">
          <p className="home-hero__eyebrow">Home bakery · {bakery.place}</p>
          <h1 id="home-title" className="home-hero__title">
            <span className="home-hero__heavy">Baked with love,</span>{' '}
            <span className="home-hero__script">Bakes by Mom</span>
          </h1>
          <p className="home-hero__lead">
            Cakes for every occasion, and brownies, cookies, cupcakes and bento cakes by the box. Baked to order in
            Mom's kitchen, and every one of them eggless.
          </p>
          <div className="home-hero__actions">
            <Button size="lg" href={orderLink} {...external}>
              Order on WhatsApp
            </Button>
            <Button size="lg" variant="secondary" href="/shop">
              Cakes & treats
            </Button>
          </div>
        </div>
      </div>
    </PatternSurface>
  );
}

/* Shape ribbon (pin 13's puzzle-piece strip, in doodles) -------------- */

export function ShapeRibbon() {
  return (
    <div className="home-ribbon">
      <Marquee
        tone="cherry"
        size="sm"
        label="What we bake"
        items={['Cakes', ...treatCategories.map((category) => category.name)]}
        separator={<span className="home-ribbon__diamond" aria-hidden="true" />}
      />
      <div className="home-ribbon__shapes" aria-hidden="true" />
    </div>
  );
}

/* Feature strip (Sweet Crumbs' icon row) ------------------------------ */

const features = [
  {
    icon: <span className="site-veg-dot site-veg-dot--lg" />,
    title: '100% eggless',
    text: 'Pure veg, with the FSSAI green dot',
  },
  { icon: <Doodle name="whisk" size={34} />, title: 'Baked to order', text: 'Mixed and baked for your date' },
  {
    icon: <Doodle name="heart" size={30} color="var(--bbm-color-cherry-500)" />,
    title: 'Iced by hand',
    text: 'Finished the morning it goes out',
  },
  {
    icon: <Doodle name="sparkle" size={30} color="var(--bbm-color-butter-400)" />,
    title: 'Order on WhatsApp',
    text: 'Your order, typed out and ready to send',
  },
];

/** The pink polka-dot band under the ribbon: the feature strip, then the about us card. */
export function HomeIntro() {
  return (
    <PatternSurface pattern="dots" tone="pink" ground="var(--bbm-color-bg-pink)" className="home-intro">
      <FeatureStrip />
      <AboutUsCard />
    </PatternSurface>
  );
}

export function FeatureStrip() {
  return (
    <section className="home-features" aria-label="Why order from Mom">
      <ul className="home-features__list">
        {features.map((feature) => (
          <li key={feature.title}>
            <span className="home-features__icon" aria-hidden="true">
              {feature.icon}
            </span>
            <span>
              <strong>{feature.title}</strong>
              <span>{feature.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* About us (pin 16's outlined card) ----------------------------------- */

export function AboutUsCard() {
  return (
    <section className="site-section home-about">
      <div className="site-container">
        <Card outline="brand" padding="lg" className="home-about__card">
          <span className="home-about__cherries" data-parallax="0.08">
            <Doodle name="cherries-halftone" size={240} color="var(--bbm-color-cherry-700)" />
          </span>
          <Doodle name="squiggle" size={150} color="var(--bbm-color-cherry-700)" className="home-about__flourish" />
          <div className="home-about__copy">
            <SectionHeading variant="stamp" align="start" title="About us" overlay="with love" />
            <h3 className="home-about__sub">What sets us apart?</h3>
            <p className="home-about__lead">
              Everything is eggless, baked to order and finished by hand, in batches small enough to taste the care.
            </p>
            <blockquote className="home-about__quote">
              <p>
                A cake is more than dessert. It's the first slice at a birthday, the box on the table at Diwali, the
                surprise for Maa. So every one is baked for its day, from the sponge to the last piped rose.
              </p>
            </blockquote>
            <Button variant="secondary" href="/about">
              Read our story
            </Button>
          </div>
          <div className="home-about__art">
            <img className="home-about__cake" src={stock.custom.src} alt={stock.custom.alt} loading="lazy" />
            <PriceTag
              className="home-about__tag"
              shape="burst"
              tone="pink"
              amount="by hand"
              label="every one"
              size={104}
              rotate={10}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

/* Flavours (pin 16's "Fillings" grid) --------------------------------- */

export function FlavoursSection() {
  return (
    <section id="flavours" className="site-section site-section--blue site-section--edged home-flavours">
      <SectionEdge color="var(--bbm-color-bg-blue)" />
      <div className="site-container">
        <SectionHeading variant="ribbon" title="Flavours" ribbonText="baked to order" />
        <ul className="home-flavours__grid">
          {cakeFlavours.map((flavour) => {
            const photo = flavours[flavour];
            return (
              <li key={flavour}>
                <article className="home-flavour">
                  {photo && <img className="home-flavour__photo" src={photo.src} alt={photo.alt} loading="lazy" />}
                  <h3>{flavour}</h3>
                  <p>{photo?.inside}</p>
                  <div className="home-flavour__foot">
                    <span className="home-flavour__pill">any cake</span>
                    <a
                      className="home-flavour__ask"
                      href={`/catalog?flavour=${flavourSlug(flavour)}`}
                      aria-label={`See every cake in ${flavour.toLowerCase()}`}
                    >
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <p className="site-menu__note home-flavours__note">
          <span aria-hidden="true">✱</span>
          Every flavour is eggless and goes in any cake on the menu. Tell Mom about any allergies when you order.
        </p>
      </div>
    </section>
  );
}

/* Cakes & Treats wheel: cards on a rainbow arc that the visitor turns -----------------------------------------
   After a tea shop's "Our products" (the reference video): a huge headline behind, ticket cards on an arc, the
   background blending in from the band above. In the site's palette and type. */

interface WheelItem {
  name: string;
  href: string;
  image: { src: string; alt: string };
}

/** Every kind of bake, with the photos the shop uses for them; each card opens its page. */
const wheelItems: WheelItem[] = [
  { name: 'Cakes by occasion', href: '/catalog', image: stock.occasions },
  ...treatCategories.map((category) => ({
    name: category.name,
    href: `/shop/${category.slug}`,
    image: treatArt[category.slug] ?? stock.cupcakes,
  })),
];

/** Degrees between two cards on the arc. */
const WHEEL_STEP = 17;

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/**
 * The wheel turns only when the visitor turns it: the arrows, a drag or swipe across the cards, or a sideways
 * scroll (a trackpad, or shift and the mouse wheel). The page itself scrolls past as usual, and the band's color
 * blends in from the band above and out to the band below as it does.
 */
function useWheel(count: number) {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLUListElement>(null);
  const cards = useRef<Array<HTMLLIElement | null>>([]);
  const [turn, setTurn] = useState(0);
  const turnRef = useRef(0);
  turnRef.current = turn;
  // A drag ends with a click on whichever card is under the pointer; that click is skipped.
  const dragged = useRef(false);

  /** Places every card on the arc for a turn of `p` cards (fractional while dragging). */
  const place = (p: number) => {
    cards.current.forEach((card, i) => {
      if (!card) return;
      // The shortest way round the loop, so the wheel never runs out of cards
      let d = (((i - p) % count) + count) % count;
      if (d > count / 2) d -= count;
      const away = Math.abs(d);
      card.style.setProperty('--angle', `${(d * WHEEL_STEP).toFixed(2)}deg`);
      card.style.setProperty('--fade', String(Math.max(0, Math.min(1, 2.9 - away))));
      card.style.zIndex = String(100 - Math.round(away * 10));
      card.dataset.front = away < 0.5 ? 'true' : 'false';
    });
  };

  useEffect(() => place(turn), [turn]); // eslint-disable-line react-hooks/exhaustive-deps

  // The band's color follows the page's scroll in and out
  useEffect(() => {
    const o = outer.current;
    if (!o) return;
    let frame = 0;
    const tick = () => {
      frame = 0;
      const rect = o.getBoundingClientRect();
      const vh = window.innerHeight;
      const fadeIn = reducedMotion() ? 1 : Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.7)));
      const fadeOut = reducedMotion() ? 0 : Math.min(1, Math.max(0, (vh * 0.85 - rect.bottom) / (vh * 0.45)));
      o.style.setProperty('--wheel-in', fadeIn.toFixed(3));
      o.style.setProperty('--wheel-out', fadeOut.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Drag or swipe across the cards, and sideways scrolls, turn the wheel; it settles on the nearest card.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    /** Pixels of drag or sideways scroll for one card. */
    const spacing = () => (cards.current[0]?.offsetWidth ?? 220) * 1.2;
    let start: { x: number; y: number; turn: number; id: number } | null = null;
    let live = turnRef.current;
    let settle = 0;
    const follow = (p: number) => {
      live = p;
      el.classList.add('is-turning');
      place(p);
    };
    const land = () => {
      el.classList.remove('is-turning');
      const next = Math.round(live);
      if (next === turnRef.current) place(next);
      else setTurn(next);
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, turn: turnRef.current, id: e.pointerId };
      dragged.current = false;
    };
    const move = (e: PointerEvent) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      if (!dragged.current) {
        // Sideways means turning; up and down is left to the page
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - start.y)) return;
        dragged.current = true;
        el.setPointerCapture?.(e.pointerId);
      }
      follow(start.turn - dx / spacing());
    };
    const up = () => {
      if (start && dragged.current) land();
      start = null;
    };
    const wheel = (e: WheelEvent) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return;
      e.preventDefault();
      if (!el.classList.contains('is-turning')) live = turnRef.current;
      follow(live + dx / spacing());
      window.clearTimeout(settle);
      settle = window.setTimeout(land, 160);
    };
    const click = (e: MouseEvent) => {
      if (!dragged.current) return;
      e.preventDefault();
      e.stopPropagation();
      dragged.current = false;
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', wheel, { passive: false });
    el.addEventListener('click', click, true);
    return () => {
      window.clearTimeout(settle);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('wheel', wheel);
      el.removeEventListener('click', click, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  /** Turns the wheel the short way round to bring card `i` to the front. */
  const bringToFront = (i: number) => {
    let d = (((i - turnRef.current) % count) + count) % count;
    if (d > count / 2) d -= count;
    setTurn(turnRef.current + d);
  };

  // Tabbing to a card brings it to the front
  const onFocus = (event: FocusEvent<HTMLUListElement>) => {
    const card = (event.target as HTMLElement).closest('li');
    const i = cards.current.findIndex((c) => c === card);
    if (i >= 0 && card?.dataset.front !== 'true') bringToFront(i);
  };

  return { outer, stage, cards, setTurn, onFocus };
}

export function CakesTreatsWheel() {
  const { outer, stage, cards, setTurn, onFocus } = useWheel(wheelItems.length);
  return (
    <section ref={outer} id="treats" className="home-wheel" aria-labelledby="home-wheel-title">
      <div className="home-wheel__panel">
        <p className="home-wheel__pill">the menu</p>
        <h2 id="home-wheel-title" className="home-wheel__title">
          Cakes <span className="home-wheel__amp">and</span> Treats
        </h2>
        <ul ref={stage} className="home-wheel__stage" onFocus={onFocus}>
          {wheelItems.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="home-wheel__card"
              style={{ '--angle': `${i * WHEEL_STEP}deg`, '--fade': i < 3 ? 1 : 0 } as CSSProperties}
            >
              <a href={item.href} draggable={false}>
                <span className="home-wheel__ticket">
                  <img src={item.image.src} alt="" loading="lazy" draggable={false} />
                  <span className="home-wheel__mark home-wheel__mark--b" aria-hidden="true">
                    B
                  </span>
                  <span className="home-wheel__mark home-wheel__mark--m" aria-hidden="true">
                    M
                  </span>
                </span>
                <span className="home-wheel__name">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="home-wheel__foot">
          <button
            type="button"
            className="home-wheel__arrow"
            aria-label="Previous kind of bake"
            onClick={() => setTurn((t) => t - 1)}
          >
            ←
          </button>
          <Button href="/shop" variant="soft" className="home-wheel__cta">
            Explore cakes &amp; treats
          </Button>
          <button
            type="button"
            className="home-wheel__arrow"
            aria-label="Next kind of bake"
            onClick={() => setTurn((t) => t + 1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

/* Shop cakes & treats (pin 13's bestsellers, with filter pills): not on the home page now (the wheel above
   replaced it), kept for another page or design --------------------------------------------------------------- */

const boxFilters = [
  { value: 'all', label: 'All' },
  { value: 'party', label: 'For a party' },
  { value: 'tea', label: 'Tea-time' },
  { value: 'gift', label: 'To gift' },
];

const boxGroups: Record<string, string[]> = {
  party: ['cupcakes', 'bento-cakes', 'combos', 'brownies'],
  tea: ['cookies', 'dry-cakes', 'brownies'],
  gift: ['jar-cakes', 'brownies', 'cookies', 'combos'],
};

export function ShopByBoxSection() {
  const [filter, setFilter] = useState<string[]>(['all']);
  const group = filter[0] ?? 'all';
  const shown = group === 'all' ? treatCategories : treatCategories.filter((c) => boxGroups[group]?.includes(c.slug));
  return (
    <section id="treats" className="site-section site-section--edged home-shop">
      <SectionEdge color="var(--bbm-color-bg-beige)" shape="wave" />
      <div className="site-container">
        <div className="home-shop__head">
          <h2 className="home-shop__title">
            <span className="home-script">Shop</span> cakes & treats
          </h2>
          <FilterChips label="Show treats for" options={boxFilters} value={filter} onChange={setFilter} />
        </div>
        <p className="bbm-visually-hidden" aria-live="polite">
          Showing {shown.length + 1} kinds of bake
        </p>
        <ul className="home-shop__row">
          <li>
            <a className="home-shop__lead" href="/catalog">
              <img src={stock.occasions.src} alt="" loading="lazy" />
              <span className="home-shop__lead-label">
                Cakes by occasion
                <span>Shop now</span>
              </span>
            </a>
          </li>
          {shown.map((category, i) => (
            <li key={category.slug}>
              <a className="home-shop__item" href={`/shop/${category.slug}`}>
                <span className="home-shop__art" data-bbm-tone={TILE_TONES[i % TILE_TONES.length]}>
                  <img src={treatArt[category.slug]?.src ?? stock.cupcakes.src} alt="" loading="lazy" />
                </span>
                <span className="home-shop__name">{category.name}</span>
                <span className="home-shop__meta">
                  from {category.minQty} {category.minQty === 1 ? category.unit.replace(/s$/, '') : category.unit}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Quote on a checker band (Sunday Bakehouse) --------------------------- */

export function QuoteBand() {
  return (
    <PatternSurface
      as="section"
      pattern="checker"
      tone="pink"
      scale="lg"
      ground="var(--bbm-color-bg-canvas)"
      className="home-quote"
      aria-label="A note from Mom"
    >
      <figure className="home-quote__card">
        <blockquote>
          <p>
            Our secret ingredient? A day's notice, and a <em>whole lot</em> of love.
          </p>
        </blockquote>
        <figcaption>with love, Mom</figcaption>
      </figure>
    </PatternSurface>
  );
}

/* Crafted happiness: the lockup, the order card and cherry tiles (pin 16) */

const craftTiles = [
  {
    label: 'Custom cake',
    href: whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake 🎂"),
    // One of Mom's own: a cut-out photo, shown whole on a pink card
    image: '/photos/thumbs/IMG-20260206-WA0062.webp',
    cutout: true,
    externalLink: true,
  },
  { label: 'Bento cake', href: '/shop/bento-cakes', image: stock.bento.src, externalLink: false },
  {
    label: 'Send a gift',
    href: whatsappLink("Hello Bakes by Mom! I'd like to send a cake as a gift 🎁"),
    image: stock.gift.src,
    externalLink: true,
  },
  { label: 'Questions?', href: '#faq', image: stock.cupcakes.src, externalLink: false },
];

export function CraftedSection() {
  const sizes = `${cakeSizes[0]?.label.split(' · ')[0]} to ${cakeSizes[cakeSizes.length - 1]?.label.split(' · ')[0]}`;
  return (
    <PatternSurface
      as="section"
      id="order"
      pattern="stripes"
      tone="blue"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="site-section home-crafted"
    >
      <div className="site-container">
        <div className="home-crafted__lockup">
          <span data-parallax="0.1">
            <Doodle name="cherries-halftone" size={120} color="var(--bbm-color-cherry-700)" />
          </span>
          <h2>
            <span className="home-crafted__heavy">Crafted happiness, baked with love.</span>
            <span className="home-script home-crafted__script">Bakes by Mom</span>
          </h2>
          <span data-parallax="-0.1">
            <Doodle
              name="cherries-halftone"
              size={120}
              color="var(--bbm-color-cherry-700)"
              className="home-crafted__mirror"
            />
          </span>
        </div>
        <div className="home-crafted__grid">
          <div className="home-order-card">
            <span className="home-order-card__tape" aria-hidden="true" />
            <Ticket variant="stamp" tone="pink">
              <h3 className="home-script home-order-card__title">How do I place an order?</h3>
              <ol className="home-order-card__steps">
                {howToOrder.map((step, i) => (
                  <li key={step.title}>
                    <strong>
                      Step {i + 1}: {step.title}.
                    </strong>{' '}
                    {step.description}
                  </li>
                ))}
              </ol>
              <p className="home-order-card__note">
                <strong>Pickup and delivery:</strong> pick up from the kitchen in {bakery.place}, or ask for delivery
                when you order. Any cake from {sizes}. {bakery.notice}
              </p>
              <Button href={orderLink} {...external}>
                Start an order
              </Button>
            </Ticket>
          </div>
          <ul className="home-crafted__tiles">
            {craftTiles.map((tile) => (
              <li key={tile.label}>
                <a className="home-craft-tile" href={tile.href} {...(tile.externalLink ? external : {})}>
                  <span className="home-craft-tile__blob" aria-hidden="true" />
                  <img
                    src={tile.image}
                    alt=""
                    loading="lazy"
                    className={'cutout' in tile ? 'home-craft-tile__cutout' : undefined}
                  />
                  <span className="home-craft-tile__arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="home-craft-tile__label">{tile.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PatternSurface>
  );
}

/* Mom's kitchen (pin 13's split about, with the cartouche frame) -------- */

/**
 * Not on the home page for now (it repeated the about us card and Our story), but kept, with its styles in
 * home.css and its story in Storybook (Sections/Home/Moms Kitchen), for another page or design.
 */
export function KitchenSplit() {
  return (
    <section id="story" className="home-kitchen">
      <div className="home-kitchen__copy">
        <Doodle name="whisk" size={44} />
        <h2 className="home-kitchen__title">
          <span className="home-script">About</span> Mom's kitchen
        </h2>
        <p>
          I never set out to run a bakery. I baked for the people I love, a birthday cake here, a tray of brownies
          there, and the kitchen quietly learned my hands.
        </p>
        <p>
          One order became two, two became a weekend booked out. Everything is still mixed, baked to order and finished
          by hand in {bakery.place}.
        </p>
        <Button href="/about" className="home-stamp-button">
          Read our story
        </Button>
      </div>
      <PatternSurface
        pattern="stripes-wavy"
        tone="matcha"
        ground="var(--bbm-color-bg-butter)"
        scale="lg"
        className="home-kitchen__art"
      >
        <Polaroid
          data-parallax="-0.05"
          frame="cartouche"
          src={stock.kitchen.src}
          alt={stock.kitchen.alt}
          rotate={0}
          width="min(20rem, 72%)"
          aspect="4/5"
        />
      </PatternSurface>
    </section>
  );
}

/* Sign-off ribbon (pin 13's bottom marquee) ----------------------------- */

export function SignOffRibbon() {
  return (
    <Marquee
      tone="pink"
      size="sm"
      label="A note before you go"
      items={['Slow down', 'Cut the cake', 'This is your sign to order the cake']}
      separator={<Doodle name="daisy" size="1em" />}
      direction="reverse"
    />
  );
}
