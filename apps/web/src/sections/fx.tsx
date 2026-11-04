/**
 * The big scroll scenes, after two tea sites the client loves:
 * - Teh Tarik Nation (tehtariknation.com): the "we're also…" deck, where cards fly up one by one and land in a fan
 *   while the section is pinned, with tilted tape labels round the edges; and the line of words that runs along a
 *   curve as you scroll.
 * - Beca Tea (becatea.com): rows of giant words sliding in turn, filled and outlined, round a product in the
 *   middle; and the brand's name huge at the very bottom of every page.
 * All in Bakes by Mom's palette, type and stickers. For reduced motion each scene is its finished, still layout.
 */
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { Button, PatternSurface, type Pattern } from '@bakesbymom/ui';
import { bakery } from '../content/bakery';
import { orderLink } from '../content/site';
import { gsap, narrowScreen, scatter, useFx } from '../fx/gsap';
import { splitTitle, writeIn } from '../fx/site-fx';
import '../fx/fx.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

/* The deck: "every box from Mom's kitchen is also…" ----------------------------------------------------------- */

interface DeckCard {
  title: string;
  note: string;
  /** Card colour and ink, from the palette. */
  color: string;
  ink?: string;
  art: ReactNode;
  /** The patterned strip along the card's foot. */
  foot: { pattern: Pattern; tone: 'pink' | 'blue' | 'cherry' | 'butter' | 'matcha' | 'brown' | 'beige' };
}

const art = (src: string, className?: string) => (
  <img className={className ? `fx-deck__art ${className}` : 'fx-deck__art'} src={src} alt="" loading="lazy" />
);

/** The promises already made across the site, one to a card. */
const promises: DeckCard[] = [
  {
    title: 'Eggless',
    note: 'Every cake, every cookie, every crumb',
    color: 'var(--bbm-color-pink-300)',
    art: (
      <span className="fx-deck__no-egg">
        {art('/collage/halftone-egg.webp')}
        <span className="fx-deck__slash" />
      </span>
    ),
    foot: { pattern: 'checker', tone: 'cherry' },
  },
  {
    title: 'Baked to order',
    note: 'Mixed and baked for your date',
    color: 'var(--bbm-color-blue-200)',
    art: art('/collage/paint-teacake.webp'),
    foot: { pattern: 'gingham', tone: 'blue' },
  },
  {
    title: 'Iced by hand',
    note: 'Finished the morning it goes out',
    color: 'var(--bbm-color-butter-300)',
    art: art('/collage/paint-cupcake.webp'),
    foot: { pattern: 'stripes', tone: 'cherry' },
  },
  {
    title: 'Pure veg',
    note: 'With the FSSAI green dot',
    color: 'var(--bbm-color-matcha-200)',
    art: <span className="fx-deck__veg" />,
    foot: { pattern: 'dots', tone: 'matcha' },
  },
  {
    title: 'Small-batch',
    note: 'Small enough to taste the care',
    color: 'var(--bbm-color-cherry-500)',
    ink: 'var(--bbm-color-paper)',
    art: art('/collage/sticker-jar-cakes.webp'),
    foot: { pattern: 'checker', tone: 'pink' },
  },
  {
    title: 'Homemade',
    note: `In Mom's kitchen in ${bakery.place}`,
    color: 'var(--bbm-color-beige-200)',
    art: art('/collage/sticker-drip-cake.webp'),
    foot: { pattern: 'gingham', tone: 'pink' },
  },
  {
    title: 'Gift-ready',
    note: 'Sent to someone you love',
    color: 'var(--bbm-color-blue-300)',
    art: art('/collage/sticker-gift-box.webp'),
    foot: { pattern: 'stripes', tone: 'butter' },
  },
  {
    title: 'Easy to order',
    note: 'Typed out on WhatsApp, ready to send',
    color: 'var(--bbm-color-pink-200)',
    art: art('/collage/paint-shortcake.webp'),
    foot: { pattern: 'dots', tone: 'cherry' },
  },
  {
    title: 'Made with love',
    note: 'From the sponge to the last piped rose',
    color: 'var(--bbm-color-cherry-700)',
    ink: 'var(--bbm-color-pink-200)',
    art: art('/collage/halftone-cherries-pink.webp'),
    foot: { pattern: 'checker', tone: 'butter' },
  },
];

/** The tape labels round the edges: a word on paper, then a strip of pattern (decoration only). */
const tapes = [
  { word: 'Mom-made', pattern: 'checker', tone: 'cherry', place: 'a' },
  { word: 'Sprinkle-obsessed', pattern: 'gingham', tone: 'blue', place: 'b' },
  { word: 'Slice lovers', pattern: 'checker', tone: 'brown', place: 'c' },
  { word: 'Sweet tooth', pattern: 'stripes', tone: 'pink', place: 'd' },
  { word: bakery.place, pattern: 'gingham', tone: 'cherry', place: 'e' },
  { word: 'Cherry on top', pattern: 'dots', tone: 'cherry', place: 'f' },
] as const;

export function PromiseDeck() {
  const root = useRef<HTMLElement>(null);
  const middle = Math.floor(promises.length / 2);

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
    <section ref={root} className="fx-deck" aria-labelledby="fx-deck-title" data-fx-own>
      <div className="fx-deck__tapes" aria-hidden="true">
        {tapes.map((tape) => (
          <span key={tape.word} className={`fx-tape fx-tape--${tape.place}`}>
            <span className="fx-tape__word">{tape.word}</span>
            <PatternSurface pattern={tape.pattern} tone={tape.tone} scale="sm" className="fx-tape__pattern" />
          </span>
        ))}
      </div>
      <h2 id="fx-deck-title" className="fx-deck__title">
        Baked in Mom's kitchen, every box is <span className="fx-script">also…</span>
      </h2>
      <ul className="fx-deck__stage">
        {promises.map((promise, i) => (
          <li
            key={promise.title}
            className="fx-deck__card"
            style={
              {
                '--o': i - middle,
                '--lift': `${scatter(i, -1.5, 1.5, 9).toFixed(2)}vh`,
                '--card': promise.color,
                '--card-ink': promise.ink ?? 'var(--bbm-color-brown-900)',
              } as CSSProperties
            }
          >
            <h3>{promise.title}</h3>
            <span className="fx-deck__picture">{promise.art}</span>
            <p>{promise.note}</p>
            <PatternSurface
              pattern={promise.foot.pattern}
              tone={promise.foot.tone}
              scale="sm"
              className="fx-deck__foot"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* The flavour wall: giant rows of flavour names sliding in turn, round a slice in the middle ------------------- */

export function FlavourWall({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const rows = [0, 1, 2];

  useFx(root, (wall) => {
    const rowEls = gsap.utils.toArray<HTMLElement>('.fx-wall__row', wall);
    const scrub = { trigger: wall, start: 'top bottom', end: 'bottom top', scrub: 0.4 };
    rowEls.forEach((row, i) => {
      const span = () => Math.max(0, row.scrollWidth - wall.clientWidth);
      const [from, to] = i % 2 ? [() => -span(), () => -span() * 0.15] : [() => -span() * 0.15, () => -span()];
      gsap.fromTo(row, { x: from }, { x: to, ease: 'none', scrollTrigger: { ...scrub, invalidateOnRefresh: true } });
    });
    gsap.fromTo(
      '.fx-wall__slice',
      { rotation: -28, scale: 0.55, yPercent: 30 },
      { rotation: 16, scale: 1.08, yPercent: -20, ease: 'none', scrollTrigger: scrub },
    );
  });

  return (
    <div ref={root} className="fx-wall" aria-hidden="true">
      {rows.map((r) => (
        <p key={r} className="fx-wall__row">
          {[...words.slice(r * 3), ...words.slice(0, r * 3), ...words].map((word, i) => (
            <span key={i} className={(i + r) % 2 ? 'fx-wall__word fx-wall__word--outline' : 'fx-wall__word'}>
              {word}
              <span className="fx-wall__star">✱</span>
            </span>
          ))}
        </p>
      ))}
      <img className="fx-wall__slice" src="/collage/paint-cherry-slice.webp" alt="" loading="lazy" />
    </div>
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
