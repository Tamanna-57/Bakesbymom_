/**
 * How to order: the lockup ("Crafted happiness, baked with love."), one panel for each step and the shortcuts at the
 * end, stacked down the page and scrolled through like the rest of the site. The panels and their motion come from
 * Teh Tarik Nation; it used to ride sideways in a pinned strip, and now plays as each panel scrolls into view: the
 * lockup's letters rise in, each step's words come up while its number and stickers drift at their own depths and
 * its title types itself out on a tag, the order types itself into the chat, and the shortcuts drop in with a bounce.
 *
 * Visitors who ask for reduced motion get every panel finished and still.
 */
import { useRef, type ReactNode, type RefObject } from 'react';
import { Button, Doodle, PatternSurface, type Pattern } from '@bakesbymom/ui';
import { stock } from '../content';
import { bakery, cakeFlavours, cakeSizes, whatsappLink } from '../content/bakery';
import { howToOrder, orderLink } from '../content/site';
import { gsap, narrowScreen, scatter, SplitText, useFx } from '../fx/gsap';
import { splitTitle, writeIn } from '../fx/site-fx';
import './order-rail.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

const sizes = `${cakeSizes[0]?.label.split(' · ')[0]} to ${cakeSizes[cakeSizes.length - 1]?.label.split(' · ')[0]}`;

interface Sticker {
  src: string;
  /** Its spot on the panel (order-rail.css). */
  place: 'a' | 'b' | 'c';
  /** How far it travels as the panel passes: bigger is nearer, so faster. */
  depth: number;
}

interface StepLook {
  tone: 'pink' | 'butter' | 'blue' | 'cherry';
  foot: { pattern: Pattern; tone: 'pink' | 'blue' | 'cherry' | 'butter' | 'brown' };
  stickers: Sticker[];
  /** What else the step shows under its words. */
  extra: ReactNode;
}

/** The chat the third step types out: what an order looks like when it opens in WhatsApp. */
const SAMPLE_ORDER = "Hi Mom! A 1 kg vanilla cake for Saturday evening, with 'Happy birthday' piped on top please.";

const looks: StepLook[] = [
  {
    tone: 'pink',
    foot: { pattern: 'checker', tone: 'cherry' },
    stickers: [
      { src: '/collage/sticker-drip-cake.webp', place: 'a', depth: 1 },
      { src: '/collage/paint-cupcake.webp', place: 'b', depth: 1.5 },
      { src: '/collage/sticker-jar-cakes.webp', place: 'c', depth: 0.6 },
    ],
    extra: (
      <p className="order-rail__links">
        <a href="/catalog">Cakes by occasion ↗</a>
        <a href="/shop">Treats by the box ↗</a>
      </p>
    ),
  },
  {
    tone: 'butter',
    foot: { pattern: 'gingham', tone: 'pink' },
    stickers: [
      { src: '/collage/paint-shortcake.webp', place: 'a', depth: 1 },
      { src: '/collage/paint-cherry-slice.webp', place: 'b', depth: 1.6 },
      { src: '/collage/halftone-cake.webp', place: 'c', depth: 0.5 },
    ],
    extra: (
      <ul className="order-rail__chips" aria-label="What you choose">
        <li>{sizes}</li>
        <li>{cakeFlavours.length} flavours</li>
        <li>A message on top</li>
        <li>Candles &amp; toppers</li>
        <li>Your day &amp; time</li>
      </ul>
    ),
  },
  {
    tone: 'blue',
    foot: { pattern: 'stripes', tone: 'blue' },
    stickers: [
      { src: '/collage/paint-teacake.webp', place: 'b', depth: 1.5 },
      { src: '/collage/halftone-cherries.webp', place: 'c', depth: 0.5 },
    ],
    extra: <p className="order-rail__small">Nothing leaves the page on its own: you press send.</p>,
  },
  {
    tone: 'cherry',
    foot: { pattern: 'checker', tone: 'butter' },
    stickers: [
      { src: '/collage/sticker-cherry-cake.webp', place: 'a', depth: 1 },
      { src: '/collage/paint-jar-cake.webp', place: 'b', depth: 1.5 },
      { src: '/collage/halftone-cherries-pink.webp', place: 'c', depth: 0.5 },
    ],
    extra: <p className="order-rail__small">{bakery.notice}</p>,
  },
];

/** Shortcuts at the end of the ride, each straight to its start. */
const shortcuts = [
  {
    label: 'Custom cake',
    href: whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake 🎂"),
    // One of Mom's own: a cut-out photo, shown whole
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

/**
 * Types `line` out letter by letter, a caret running ahead of it (Teh Tarik Nation's typewriter tags). The caret
 * (positioned inside `line`) is placed after each letter as it appears. A heading keeps its words for screen readers
 * (`aria: 'auto'` labels it whole); decoration is split without. Returns the timeline.
 */
function typeOut(line: HTMLElement, caret: HTMLElement, vars: gsap.TimelineVars, aria: 'auto' | 'none' = 'auto') {
  const split = SplitText.create(line, { type: 'words,chars', aria });
  const chars = split.chars as HTMLElement[];
  const box = caret.offsetParent ?? line;
  const placeCaret = (el: Element, before = false) => {
    const r = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    gsap.set(caret, { x: (before ? r.left : r.right) - b.left + 2, y: r.top - b.top, height: r.height });
  };
  gsap.set(chars, { opacity: 0 });
  const tl = gsap.timeline(vars);
  if (!chars.length) return tl;
  tl.call(() => placeCaret(chars[0]!, true)).set(caret, { opacity: 1 });
  tl.to(chars, {
    opacity: 1,
    duration: 0.01,
    stagger: {
      each: 0.035,
      onComplete(this: gsap.core.Tween) {
        placeCaret(this.targets()[0] as Element);
      },
    },
  });
  tl.to(caret, { opacity: 0, duration: 0.3 }, '+=1.2');
  return tl;
}

function useRailFx(root: RefObject<HTMLElement | null>) {
  useFx(root, (section) => {
    const narrow = narrowScreen();

    // The lockup: its letters rise in as the section arrives, and the script writes itself in
    const title = section.querySelector<HTMLElement>('.order-rail__title');
    if (title) {
      const { chars, scripts } = splitTitle(title);
      const arrive = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
      arrive.from(chars, {
        yPercent: 120,
        scale: 0.4,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(2.2)',
        stagger: 0.02,
      });
      if (scripts.length) arrive.add(writeIn(scripts, { duration: 1.2 }), '-=0.5');
    }

    // Each step as it scrolls up: the words come up, the number and the stickers drift at their own depths, and the
    // title types itself out on its tag
    section.querySelectorAll<HTMLElement>('.order-rail__step').forEach((panel, i) => {
      const pass = { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.5 };
      gsap.fromTo(
        panel.querySelector('.order-rail__num'),
        { yPercent: 40, rotation: -8 },
        { yPercent: -40, rotation: 6, ease: 'none', scrollTrigger: pass },
      );
      panel.querySelectorAll<HTMLElement>('.order-rail__sticker').forEach((sticker, k) => {
        const depth = (Number(sticker.dataset.depth) || 1) * (narrow ? 0.5 : 1);
        gsap.fromTo(
          sticker,
          { y: 90 * depth, rotation: scatter(i * 3 + k, -14, 14, 3) },
          { y: -90 * depth, rotation: scatter(i * 3 + k, -10, 10, 8), ease: 'none', scrollTrigger: pass },
        );
      });
      gsap.from(panel.querySelectorAll('.order-rail__copy > *'), {
        y: narrow ? 40 : 70,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
      });
      const line = panel.querySelector<HTMLElement>('.order-rail__tag');
      const caret = line?.querySelector<HTMLElement>('.order-rail__caret');
      if (line && caret) {
        typeOut(line, caret, { scrollTrigger: { trigger: panel, start: 'top 65%', once: true } });
      }
    });

    // The chat on the third step: the order types itself into the message box, then Mom's answer pops up
    const chat = section.querySelector<HTMLElement>('.order-rail__chat');
    const typed = chat?.querySelector<HTMLElement>('.order-rail__typed');
    const chatCaret = chat?.querySelector<HTMLElement>('.order-rail__caret');
    if (chat && typed && chatCaret) {
      const reply = chat.querySelector('.order-rail__bubble--mom');
      const tl = typeOut(typed, chatCaret, { scrollTrigger: { trigger: chat, start: 'top 75%', once: true } }, 'none');
      if (reply)
        tl.from(
          reply,
          { scale: 0, rotation: -12, transformOrigin: '0% 100%', duration: 0.6, ease: 'back.out(2.4)' },
          '-=1',
        );
    }

    // The end: the words come up, and the shortcuts drop in from above and bounce, last one first
    const end = section.querySelector<HTMLElement>('.order-rail__end');
    if (end) {
      gsap.from(end.querySelectorAll('.order-rail__end-copy > *'), {
        y: narrow ? 40 : 70,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: end, start: 'top 80%', once: true },
      });
      gsap.from(end.querySelectorAll('.order-rail__tiles > li'), {
        y: -160,
        opacity: 0,
        rotation: (k) => scatter(k, -20, 20, 4),
        duration: 1.2,
        ease: 'bounce.out',
        stagger: -0.12,
        scrollTrigger: { trigger: end, start: 'top 70%', once: true },
      });
    }
  });
}

export function OrderRail() {
  const root = useRef<HTMLElement>(null);
  useRailFx(root);
  return (
    <section ref={root} id="order" className="order-rail" aria-labelledby="order-rail-title" data-fx-own>
      <div className="order-rail__track">
        <PatternSurface
          pattern="stripes"
          tone="blue"
          scale="xl"
          ground="var(--bbm-color-bg-canvas)"
          className="order-rail__panel order-rail__intro"
        >
          <span className="order-rail__cherries" aria-hidden="true">
            <Doodle name="cherries-halftone" size={130} color="var(--bbm-color-cherry-700)" />
          </span>
          <div className="order-rail__lockup">
            <p className="order-rail__pill">How to order</p>
            <h2 id="order-rail-title" className="order-rail__title">
              <span className="order-rail__heavy">Crafted happiness, baked with love.</span>{' '}
              <span className="order-rail__script">Bakes by Mom</span>
            </h2>
            <p className="order-rail__lead">
              From “I want cake” to a box on your table, in four little steps. Mom walks you through them below.
            </p>
          </div>
          <span className="order-rail__cherries order-rail__cherries--right" aria-hidden="true">
            <Doodle name="cherries-halftone" size={130} color="var(--bbm-color-cherry-700)" />
          </span>
        </PatternSurface>

        {howToOrder.map((step, i) => {
          const look = looks[i % looks.length]!;
          return (
            <article
              key={step.title}
              className="order-rail__panel order-rail__step"
              data-tone={look.tone}
              aria-labelledby={`order-step-${i}`}
            >
              <span className="order-rail__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="order-rail__copy">
                <p className="order-rail__kicker">
                  Step {i + 1} of {howToOrder.length}
                </p>
                <h3 id={`order-step-${i}`} className="order-rail__tag">
                  {step.title}
                  <span className="order-rail__caret" aria-hidden="true" />
                </h3>
                <p className="order-rail__text">{step.description}</p>
                {look.extra}
              </div>
              <div className="order-rail__art" aria-hidden="true">
                {i === 2 && (
                  <div className="order-rail__chat">
                    <p className="order-rail__chat-head">
                      <span className="order-rail__chat-dot" /> {bakery.name}
                    </p>
                    <p className="order-rail__bubble order-rail__bubble--you">
                      <span className="order-rail__typed">
                        {SAMPLE_ORDER}
                        <span className="order-rail__caret" />
                      </span>
                    </p>
                    <p className="order-rail__bubble order-rail__bubble--mom">Lovely! Mom will confirm the price ♥</p>
                  </div>
                )}
                {look.stickers.map((sticker) => (
                  <img
                    key={sticker.src}
                    className={`order-rail__sticker order-rail__sticker--${sticker.place}`}
                    data-depth={sticker.depth}
                    src={sticker.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                ))}
              </div>
              <PatternSurface
                pattern={look.foot.pattern}
                tone={look.foot.tone}
                scale="sm"
                className="order-rail__foot"
                aria-hidden="true"
              />
            </article>
          );
        })}

        <div className="order-rail__panel order-rail__end">
          <div className="order-rail__end-copy">
            <p className="order-rail__pill">Ready when you are</p>
            <h3 className="order-rail__end-title">
              Start <span className="order-rail__script">right here</span>
            </h3>
            <p className="order-rail__note">
              <strong>Pickup and delivery:</strong> pick up from the kitchen in {bakery.place}, or ask for delivery when
              you order. Any cake from {sizes}.
            </p>
            <Button size="lg" href={orderLink} {...external}>
              Order on WhatsApp
            </Button>
          </div>
          <ul className="order-rail__tiles">
            {shortcuts.map((tile, i) => (
              <li key={tile.label}>
                <a
                  className="order-rail__tile"
                  data-tone={['cherry', 'pink', 'butter', 'blue'][i % 4]}
                  href={tile.href}
                  {...(tile.externalLink ? external : {})}
                >
                  <span className="order-rail__tile-photo">
                    <img
                      src={tile.image}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className={'cutout' in tile ? 'order-rail__tile-cutout' : undefined}
                    />
                  </span>
                  <span className="order-rail__tile-label">{tile.label}</span>
                  <span className="order-rail__tile-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
