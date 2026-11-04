/**
 * The home page sections, after pin 16 (SugarLace: stripes, the outlined about card, the flavour grid,
 * the order card and cherry tiles) and pin 13 (Puzzle Pantry: the shape ribbon, shop by the box with
 * filter pills, the split about). The feature strip, the starburst and the checker
 * quote come from other bakery sites on Pinterest (Sweet Crumbs, joe & dough, Sunday Bakehouse).
 * Photos here are stock (content/index.ts `stock`, `treatArt`, `flavours`); the photos of the cakes we sell are
 * kept for the catalog and the gallery.
 */
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type RefObject } from 'react';
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
import { gsap, scatter, SplitText, useFx } from '../fx/gsap';
import { splitTitle, writeIn } from '../fx/site-fx';
import { SectionEdge } from './blocks';
import { FlavourWall } from './fx';
import { treatCategories } from '../content/treats';
import './home.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;
const TILE_TONES = ['pink', 'blue', 'butter', 'beige'] as const;

/* Hero (pin 16's stripes, with a cream label card) -------------------- */

/** Painted stickers round the arch, each with how far it follows the mouse. */
const heroStickers = [
  { src: '/collage/halftone-cherries.webp', place: 'd', depth: 10 },
  { src: '/collage/paint-cupcake.webp', place: 'a', depth: 30 },
  { src: '/collage/paint-cherry-slice.webp', place: 'b', depth: 42 },
  { src: '/collage/paint-shortcake.webp', place: 'c', depth: 24 },
];

/** Calls `start` once the home page's intro has uncovered the hero (at once when there is no intro). */
function afterIntro(start: () => void) {
  const root = document.documentElement;
  let held = false;
  let frame = 0;
  const check = () => {
    const holding = root.classList.contains('bbm-intro-on');
    held ||= holding;
    if (!document.querySelector('.bbm-intro') || (held && !holding)) start();
    else frame = requestAnimationFrame(check);
  };
  check();
  return () => cancelAnimationFrame(frame);
}

/**
 * The hero's motion: the title bursts in letter by letter and the stickers pop on round the arch once the intro
 * clears; then the stickers bob, follow the mouse at their own depths, and scatter as the hero scrolls away.
 */
function useHeroFx(root: RefObject<HTMLDivElement | null>) {
  useFx(root, (inner) => {
    const hero = inner.closest<HTMLElement>('.home-hero') ?? inner;
    const stickers = gsap.utils.toArray<HTMLElement>('.home-hero__sticker', hero);
    const pictures = stickers.map((sticker) => sticker.firstElementChild as HTMLElement);
    const title = hero.querySelector<HTMLElement>('.home-hero__title');
    const entrance = gsap.timeline({ paused: true, delay: 0.1 });
    if (title) {
      const { chars, scripts } = splitTitle(title);
      entrance.from(chars, {
        yPercent: 130,
        rotate: (i) => scatter(i, -45, 45, 2),
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(2.2)',
        stagger: 0.03,
      });
      if (scripts.length) entrance.add(writeIn(scripts, { duration: 1.3 }), '-=0.5');
    }
    entrance.from(
      pictures,
      { scale: 0, rotation: (i) => scatter(i, -120, 120, 6), duration: 1, ease: 'back.out(2.4)', stagger: 0.12 },
      0.15,
    );
    entrance.add(() => {
      pictures.forEach((el, i) => {
        gsap.to(el, {
          y: scatter(i, -18, -8, 3),
          rotation: scatter(i, -9, 9, 8),
          duration: scatter(i, 2.4, 3.6, 4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    });
    const stopWaiting = afterIntro(() => entrance.play());

    // Scroll away: the stickers fly off in all directions, the arch leans and the card lifts
    const away = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 };
    gsap.to(stickers, {
      xPercent: (i) => (i % 2 ? 1 : -1) * scatter(i, 60, 140, 9),
      yPercent: (i) => scatter(i, -180, -60, 10),
      rotation: (i) => scatter(i, -150, 150, 11),
      ease: 'none',
      scrollTrigger: away,
    });
    gsap.to('.home-hero__photo', { scale: 1.07, rotation: -3, ease: 'none', scrollTrigger: away });
    gsap.to('.home-hero__card', { y: -80, rotation: 1.5, ease: 'none', scrollTrigger: away });

    // The mouse: each sticker follows at its own depth, the arch leans the other way
    const followers = stickers.map((sticker, i) => ({
      depth: heroStickers[i]?.depth ?? 20,
      x: gsap.quickTo(sticker, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(sticker, 'y', { duration: 0.9, ease: 'power3.out' }),
    }));
    const photoX = gsap.quickTo('.home-hero__photo', 'x', { duration: 1.2, ease: 'power3.out' });
    const photoY = gsap.quickTo('.home-hero__photo', 'y', { duration: 1.2, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      for (const f of followers) {
        f.x(mx * f.depth * 2);
        f.y(my * f.depth * 2);
      }
      photoX(mx * -14);
      photoY(my * -10);
    };
    hero.addEventListener('pointermove', move);
    return () => {
      stopWaiting();
      hero.removeEventListener('pointermove', move);
    };
  });
}

export function HomeHero() {
  const root = useRef<HTMLDivElement>(null);
  useHeroFx(root);
  return (
    <PatternSurface
      as="section"
      pattern="stripes"
      tone="blue"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="home-hero"
      aria-labelledby="home-title"
      data-fx-own
    >
      <div ref={root} className="home-hero__inner">
        <div className="home-hero__art">
          <img
            className="home-hero__photo"
            src={stock.hero.src}
            alt={stock.hero.alt}
            width={733}
            height={1100}
            data-parallax="-0.06"
          />
          <div className="home-hero__stickers" aria-hidden="true">
            {heroStickers.map((sticker) => (
              <span key={sticker.place} className={`home-hero__sticker home-hero__sticker--${sticker.place}`}>
                <img src={sticker.src} alt="" />
              </span>
            ))}
          </div>
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

/**
 * The pink polka-dot band: the about us card. The feature strip's promises are dealt as cards in the deck above it
 * now (sections/fx.tsx); the strip is kept for Storybook and other pages.
 */
export function HomeIntro() {
  return (
    <PatternSurface pattern="dots" tone="pink" ground="var(--bbm-color-bg-pink)" className="home-intro">
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
      {/* Blue, turning cherry together with the Cakes & Treats wheel below as it scrolls in (--home-blend) */}
      <SectionEdge color="var(--home-blend, var(--bbm-color-bg-blue))" />
      <FlavourWall words={cakeFlavours} />
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

  // As in the reference, the color behind the Flavours band and the wheel changes together with the scroll: blue
  // while the wheel is below the screen, a little redder with every step it rises, and solid cherry once its top
  // reaches the header. The two bands always share the color, so there is never a line between them on screen.
  // --wheel-in goes on the page (home.css turns it into --home-blend for both bands).
  useEffect(() => {
    const o = outer.current;
    if (!o) return;
    const root = document.documentElement;
    let frame = 0;
    const tick = () => {
      frame = 0;
      const top = o.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const header = parseFloat(getComputedStyle(root).getPropertyValue('--site-header-h')) || 84;
      const t = Math.min(1, Math.max(0, (vh - top) / Math.max(1, vh - header)));
      // Eased, so the change is gentle at the start and the end
      root.style.setProperty('--wheel-in', (t * t * (3 - 2 * t)).toFixed(3));
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
      root.style.removeProperty('--wheel-in');
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

/** The wheel's words start scattered and spinning across the band and fly together as it scrolls in (after Beca
 * Tea's hero); the cards rise into their arc behind them. */
function useWheelFx(outer: RefObject<HTMLElement | null>) {
  useFx(outer, (section) => {
    const title = section.querySelector<HTMLElement>('.home-wheel__title');
    const scrub = { trigger: section, start: 'top bottom', end: 'top 12%', scrub: 0.7, invalidateOnRefresh: true };
    if (title) {
      const { chars, scripts } = splitTitle(title);
      gsap.from(chars, {
        x: (i) => scatter(i, -0.42, 0.42, 11) * window.innerWidth,
        y: (i) => scatter(i, -0.55, 0.3, 13) * window.innerHeight,
        rotation: (i) => scatter(i, -220, 220, 17),
        scale: (i) => scatter(i, 0.4, 1.7, 19),
        ease: 'power2.out',
        scrollTrigger: scrub,
      });
      gsap.from(scripts, { scale: 0, rotation: -140, ease: 'back.out(1.4)', scrollTrigger: scrub });
    }
    gsap.from('.home-wheel__pill', { scale: 0, rotation: 30, ease: 'back.out(2)', scrollTrigger: scrub });
    gsap.from('.home-wheel__ticket', {
      yPercent: 70,
      opacity: 0,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 15%', scrub: 0.7 },
    });
  });
}

export function CakesTreatsWheel() {
  const { outer, stage, cards, setTurn, onFocus } = useWheel(wheelItems.length);
  useWheelFx(outer);
  return (
    <section ref={outer} id="treats" className="home-wheel" aria-labelledby="home-wheel-title" data-fx-own>
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

/**
 * The note types itself out when it scrolls in, a caret running ahead of it (Teh Tarik Nation's typewriter tags);
 * the script words and Mom's sign-off are written in, and the checkers slide under the card as the page scrolls.
 */
function useQuoteFx(root: RefObject<HTMLElement | null>) {
  useFx(root, (figure) => {
    const band = figure.closest<HTMLElement>('.home-quote') ?? figure;
    const line = figure.querySelector<HTMLElement>('.home-quote__line');
    const caret = figure.querySelector<HTMLElement>('.home-quote__caret');
    const script = line?.querySelector('em');
    if (!line || !caret) return;
    const split = SplitText.create(line, { type: 'words,chars', ignore: 'em', aria: 'none' });
    const chars = split.chars as HTMLElement[];
    const after = script
      ? chars.findIndex((c) => script.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING)
      : chars.length;
    const cut = after < 0 ? chars.length : after;
    const box = caret.parentElement!;
    const placeCaret = (el: Element) => {
      const r = el.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      gsap.set(caret, { x: r.right - b.left + 2, y: r.top - b.top, height: r.height });
    };
    const type = () => ({
      opacity: 1,
      duration: 0.01,
      stagger: {
        each: 0.045,
        onComplete(this: gsap.core.Tween) {
          placeCaret(this.targets()[0] as Element);
        },
      },
    });
    gsap.set(chars, { opacity: 0 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: figure, start: 'top 72%', once: true } });
    tl.from(figure, { rotation: -7, scale: 0.8, y: 70, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' })
      .set(caret, { opacity: 1 })
      .to(chars.slice(0, cut), type());
    if (script) tl.add(writeIn(script, { duration: 0.9, onComplete: () => placeCaret(script) }));
    tl.to(chars.slice(cut), type())
      .add(writeIn(figure.querySelector('figcaption')!, { duration: 1.2 }), '+=0.1')
      .to(caret, { opacity: 0, duration: 0.3 }, '+=0.8');
    gsap.fromTo(
      band,
      { backgroundPosition: '0px 0px' },
      {
        backgroundPosition: '160px 320px',
        ease: 'none',
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

export function QuoteBand() {
  const root = useRef<HTMLElement>(null);
  useQuoteFx(root);
  return (
    <PatternSurface
      as="section"
      pattern="checker"
      tone="pink"
      scale="lg"
      ground="var(--bbm-color-bg-canvas)"
      className="home-quote"
      aria-label="A note from Mom"
      data-fx-own
    >
      <figure ref={root} className="home-quote__card">
        <blockquote>
          {/* Read once, whole; the visible line is split into letters to type it out */}
          <p className="bbm-visually-hidden">Our secret ingredient? A day's notice, and a whole lot of love.</p>
          <p className="home-quote__line" aria-hidden="true">
            Our secret ingredient? A day's notice, and a <em>whole lot</em> of love.
          </p>
          <span className="home-quote__caret" aria-hidden="true" />
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
