/**
 * The big scroll scenes, after two tea sites the client loves:
 * - Teh Tarik Nation (tehtariknation.com): the "we're also…" deck, where cards fly up one by one and land in a fan
 *   while the section is pinned, with tilted tape labels round the edges (here, one card for each flavour); and the
 *   line of words that runs along a curve as you scroll.
 * - Beca Tea (becatea.com): the brand's name huge at the very bottom of every page.
 * All in Bakes by Mom's palette, type and stickers. For reduced motion each scene is its finished, still layout.
 */
import { useRef, type CSSProperties } from 'react';
import { Button, PatternSurface, type Pattern } from '@bakesbymom/ui';
import { flavours } from '../content';
import { bakery, cakeFlavours, flavourSlug } from '../content/bakery';
import { orderLink } from '../content/site';
import { gsap, narrowScreen, scatter, useFx } from '../fx/gsap';
import { splitTitle, writeIn } from '../fx/site-fx';
import '../fx/fx.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

/* The deck: every flavour on the menu, one card each ---------------------------------------------------------- */

interface DeckCard {
  /** One of bakery.cakeFlavours; its photo and what's inside come from content `flavours`. */
  flavour: string;
  /** Card colour and ink, from the palette. */
  color: string;
  ink?: string;
  /** The patterned strip along the card's foot. */
  foot: { pattern: Pattern; tone: 'pink' | 'blue' | 'cherry' | 'butter' | 'matcha' | 'brown' | 'beige' };
}

/** Each flavour's card, in its own colour. */
const looks: Record<string, Omit<DeckCard, 'flavour'>> = {
  'Chocolate truffle': {
    color: 'var(--bbm-color-brown-700)',
    ink: 'var(--bbm-color-pink-200)',
    foot: { pattern: 'checker', tone: 'pink' },
  },
  Vanilla: { color: 'var(--bbm-color-butter-200)', foot: { pattern: 'gingham', tone: 'butter' } },
  'Black forest': {
    color: 'var(--bbm-color-cherry-700)',
    ink: 'var(--bbm-color-pink-200)',
    foot: { pattern: 'checker', tone: 'brown' },
  },
  'Red velvet': {
    color: 'var(--bbm-color-cherry-500)',
    ink: 'var(--bbm-color-paper)',
    foot: { pattern: 'dots', tone: 'pink' },
  },
  Butterscotch: { color: 'var(--bbm-color-butter-300)', foot: { pattern: 'stripes', tone: 'cherry' } },
  Pineapple: { color: 'var(--bbm-color-blue-200)', foot: { pattern: 'gingham', tone: 'blue' } },
  'Fresh fruit': { color: 'var(--bbm-color-pink-300)', foot: { pattern: 'checker', tone: 'cherry' } },
  Rasmalai: { color: 'var(--bbm-color-matcha-200)', foot: { pattern: 'dots', tone: 'matcha' } },
};

const deck: DeckCard[] = cakeFlavours.map((flavour) => ({
  flavour,
  ...(looks[flavour] ?? { color: 'var(--bbm-color-beige-200)', foot: { pattern: 'stripes', tone: 'pink' } }),
}));

/** The tape labels round the edges: a word on paper, then a strip of pattern (decoration only). */
const tapes = [
  { word: '100% eggless', pattern: 'checker', tone: 'cherry', place: 'a' },
  { word: 'Goes in any cake', pattern: 'gingham', tone: 'blue', place: 'b' },
  { word: 'Slice lovers', pattern: 'checker', tone: 'brown', place: 'c' },
  { word: 'Baked to order', pattern: 'stripes', tone: 'pink', place: 'd' },
  { word: bakery.place, pattern: 'gingham', tone: 'cherry', place: 'e' },
  { word: 'Cherry on top', pattern: 'dots', tone: 'cherry', place: 'f' },
] as const;

/**
 * The flavours, dealt as a deck (Teh Tarik Nation's "we're also…"): the section pins, and the flavours fly up one card
 * at a time and land in a fan, with tilted tape labels round the edges. Each card opens every cake in that flavour.
 */
export function FlavourDeck() {
  const root = useRef<HTMLElement>(null);
  // The fan's middle, so an even deck spreads evenly either side
  const middle = (deck.length - 1) / 2;

  useFx(root, (section) => {
    const cards = gsap.utils.toArray<HTMLElement>('.fx-deck__card', section);
    const stage = section.querySelector('.fx-deck__stage');
    const tapeEls = gsap.utils.toArray<HTMLElement>('.fx-tape', section);
    // Where each card lands is its CSS (translate and rotate); the flight is a transform on top that ends at zero.
    const landingX = (card: HTMLElement) => parseFloat(getComputedStyle(card).translate) || 0;
    const tl = gsap.timeline({
      defaults: { ease: 'power4.in', duration: 1 },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${cards.length * window.innerHeight * (narrowScreen() ? 0.42 : 0.55)}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    cards.forEach((card, i) => {
      tl.from(
        card,
        {
          y: () => window.innerHeight * 1.15,
          x: () => -landingX(card) + scatter(i, -60, 60, 7),
          rotation: scatter(i, -34, 34, 5),
          scale: 1.18,
        },
        i * 0.7,
      );
    });
    // A beat to look at the full fan before the page moves on
    tl.to({}, { duration: 0.6 });
    // The deck drifts up a little the whole way, and the tapes peel and sway, as in the reference
    tl.fromTo(stage, { yPercent: 6 }, { yPercent: -5, ease: 'none', duration: tl.duration() }, 0);
    tapeEls.forEach((tape, i) => {
      tl.fromTo(
        tape,
        { rotation: `-=${scatter(i, 6, 14, 2)}`, xPercent: i % 2 ? 18 : -18 },
        { rotation: `+=${scatter(i, 6, 14, 2)}`, xPercent: 0, ease: 'none', duration: tl.duration() },
        0,
      );
    });
    // The heading: letters in as the section arrives, the script word written
    const title = section.querySelector<HTMLElement>('.fx-deck__title');
    if (title) {
      const { chars, scripts } = splitTitle(title);
      const intro = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
      intro.from(chars, { yPercent: 100, opacity: 0, rotate: 12, stagger: 0.018, duration: 0.6, ease: 'back.out(2)' });
      if (scripts.length) intro.add(writeIn(scripts), '-=0.3');
    }
  });

  return (
    <section ref={root} id="flavours" className="fx-deck" aria-labelledby="fx-deck-title" data-fx-own>
      <div className="fx-deck__tapes" aria-hidden="true">
        {tapes.map((tape) => (
          <span key={tape.word} className={`fx-tape fx-tape--${tape.place}`}>
            <span className="fx-tape__word">{tape.word}</span>
            <PatternSurface pattern={tape.pattern} tone={tape.tone} scale="sm" className="fx-tape__pattern" />
          </span>
        ))}
      </div>
      <h2 id="fx-deck-title" className="fx-deck__title">
        Every cake on the menu, baked in <span className="fx-script">your flavour…</span>
      </h2>
      <ul className="fx-deck__stage">
        {deck.map((card, i) => {
          const photo = flavours[card.flavour];
          return (
            <li
              key={card.flavour}
              className="fx-deck__card"
              style={
                {
                  '--o': i - middle,
                  '--lift': `${scatter(i, -1.5, 1.5, 9).toFixed(2)}vh`,
                  '--card': card.color,
                  '--card-ink': card.ink ?? 'var(--bbm-color-brown-900)',
                } as CSSProperties
              }
            >
              <h3>
                <a
                  href={`/catalog?flavour=${flavourSlug(card.flavour)}`}
                  aria-label={`${card.flavour}: see every cake in ${card.flavour.toLowerCase()}`}
                >
                  {card.flavour}
                </a>
              </h3>
              <span className="fx-deck__picture">
                {photo && <img className="fx-deck__photo" src={photo.src} alt="" loading="lazy" draggable={false} />}
              </span>
              <p>{photo?.inside}</p>
              <PatternSurface
                pattern={card.foot.pattern}
                tone={card.foot.tone}
                scale="sm"
                className="fx-deck__foot"
                aria-hidden="true"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* The sign-off: the note before you go, running along a curve over a cake ------------------------------------ */

const SIGN_OFF = ['Slow down', 'Cut the cake', 'This is your sign to order the cake'];

export function CurvedSignOff() {
  const root = useRef<HTMLElement>(null);

  useFx(root, (section) => {
    const scrub = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.5 };
    gsap.fromTo(
      '.fx-signoff__path',
      { attr: { startOffset: '2%' } },
      { attr: { startOffset: '-48%' }, ease: 'none', scrollTrigger: scrub },
    );
    gsap.fromTo(
      '.fx-signoff__path--back',
      { attr: { startOffset: '-46%' } },
      { attr: { startOffset: '0%' }, ease: 'none', scrollTrigger: scrub },
    );
    gsap.from('.fx-signoff__cake', {
      yPercent: 70,
      rotation: -14,
      scale: 0.7,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: 0.5 },
    });
    gsap.from('.fx-signoff__cta > *', {
      scale: 0,
      rotation: -12,
      duration: 0.7,
      ease: 'back.out(2.6)',
      scrollTrigger: { trigger: section, start: 'center 80%', once: true },
    });
  });

  const line = Array.from({ length: 4 }, () => SIGN_OFF.join('  ✿  ')).join('  ✿  ');
  return (
    <section ref={root} className="fx-signoff" aria-label="A note before you go" data-fx-own>
      <p className="bbm-visually-hidden">{SIGN_OFF.join('. ')}.</p>
      <svg className="fx-signoff__arc" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <path id="fx-signoff-curve" d="M -240 520 Q 720 -120 1680 520" />
          <path id="fx-signoff-curve-back" d="M -240 600 Q 720 0 1680 600" />
        </defs>
        <text className="fx-signoff__text fx-signoff__text--back">
          <textPath
            className="fx-signoff__path fx-signoff__path--back"
            href="#fx-signoff-curve-back"
            startOffset="-20%"
          >
            {line}
          </textPath>
        </text>
        <text className="fx-signoff__text">
          <textPath className="fx-signoff__path" href="#fx-signoff-curve" startOffset="-20%">
            {line}
          </textPath>
        </text>
      </svg>
      <img className="fx-signoff__cake" src="/collage/sticker-cherry-cake.webp" alt="" loading="lazy" />
      <div className="fx-signoff__cta">
        <Button size="lg" href={orderLink} {...external}>
          Order the cake
        </Button>
      </div>
    </section>
  );
}

/* The name, huge, at the foot of every page ------------------------------------------------------------------ */

export function FooterWord() {
  const root = useRef<HTMLDivElement>(null);

  useFx(root, (word) => {
    const title = word.querySelector<HTMLElement>('.fx-bigword__text');
    if (!title) return;
    const { chars, scripts } = splitTitle(title);
    const scrub = { trigger: word, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 };
    gsap.from(chars, {
      yPercent: 105,
      opacity: 0,
      rotation: (i) => scatter(i, -18, 18, 4),
      stagger: 0.06,
      ease: 'back.out(1.6)',
      scrollTrigger: scrub,
    });
    gsap.from(scripts, { scale: 0, rotation: -40, ease: 'back.out(2)', scrollTrigger: scrub });
  });

  return (
    <div ref={root} className="fx-bigword" aria-hidden="true">
      <p className="fx-bigword__text">
        Bakes <span className="fx-script">by</span> Mom
      </p>
    </div>
  );
}
