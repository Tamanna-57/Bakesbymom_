/**
 * How to order, as a ride sideways: after Teh Tarik Nation's pinned horizontal section, where the page stops and its
 * panels slide past while everything on them moves up, down and across at its own speed.
 *
 * The section pins under the header and scrolling down carries the visitor along a strip of panels: the lockup
 * ("Crafted happiness, baked with love."), which breaks apart letter by letter as it slides away; one panel for each
 * step, its big number rising, its stickers flying past at their own depths and its title typed out on a tag; then
 * the end, where the shortcuts drop in with a bounce. A gift box hops along the bottom the whole way, and a striped
 * bar fills as the steps go by.
 *
 * Visitors who ask for reduced motion, and short screens (a phone on its side), get the panels stacked down the
 * page instead, every one of them finished and still.
 */
import { useRef, type ReactNode, type RefObject } from 'react';
import { Button, Doodle, PatternSurface, type Pattern } from '@bakesbymom/ui';
import { stock } from '../content';
import { bakery, cakeFlavours, cakeSizes, whatsappLink } from '../content/bakery';
import { howToOrder, orderLink } from '../content/site';
import { gsap, narrowScreen, scatter, ScrollTrigger, SplitText, useFx } from '../fx/gsap';
import { splitTitle, writeIn } from '../fx/site-fx';
import './order-rail.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

/** Where the panels ride sideways; matches order-rail.css. Shorter screens get the stacked panels. */
const RAIL_QUERY = '(min-height: 520px)';

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
  {
    label: 'Questions?',
    href: whatsappLink('Hello Bakes by Mom! I have a question before I order 🙂'),
    image: stock.cupcakes.src,
    externalLink: true,
  },
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
    const mm = gsap.matchMedia();
    mm.add(RAIL_QUERY, () => {
      const track = section.querySelector<HTMLElement>('.order-rail__track');
      if (!track) return;
      const narrow = narrowScreen();
      // Measured from the last panel's place on the strip (layout, not scrollWidth: words and stickers flying in from
      // past the edge would stretch that), so the ride stops with the end exactly filling the screen
      const last = track.lastElementChild as HTMLElement | null;
      const distance = () =>
        Math.max(0, (last ? last.offsetLeft + last.offsetWidth : track.scrollWidth) - section.clientWidth);
      // The sideways ride is a little longer than the strip, so each step gets a moment
      const length = () => `+=${distance() * 1.15}`;

      // The section stays pinned a little past the end of the ride, so the shortcuts land before the page moves on
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${distance() * 1.15 + window.innerHeight * 0.45}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      // The strip slides left as the page scrolls down
      const ride = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: length, scrub: 0.8, invalidateOnRefresh: true },
      });
      /** A scroll trigger on something on the strip, measured as the strip slides past rather than up the page. */
      const along = (trigger: Element, start: string, end: string, scrub: boolean | number = 0.5) => ({
        trigger,
        containerAnimation: ride,
        start,
        end,
        scrub,
      });

      // The lockup: letters rise in as the section arrives, then break apart in every direction as it slides away
      const intro = section.querySelector<HTMLElement>('.order-rail__intro');
      const title = section.querySelector<HTMLElement>('.order-rail__title');
      if (intro && title) {
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
        gsap.to(chars, {
          x: (i) => scatter(i, -0.3, 0.3, 5) * window.innerWidth,
          y: (i) => scatter(i, -0.7, 0.7, 7) * window.innerHeight,
          rotation: (i) => scatter(i, -200, 200, 9),
          ease: 'power2.in',
          scrollTrigger: along(intro, 'left left', 'center left'),
        });
        gsap.to(scripts, {
          y: () => -window.innerHeight * 0.6,
          scale: 1.6,
          ease: 'power2.in',
          scrollTrigger: along(intro, 'left left', 'center left'),
        });
        gsap.to(intro.querySelectorAll('.order-rail__lead, .order-rail__pill, .order-rail__hint'), {
          y: (i) => (i % 2 ? -1 : 1) * window.innerHeight * 0.5,
          rotation: (i) => (i % 2 ? -18 : 14),
          ease: 'power2.in',
          scrollTrigger: along(intro, 'left left', 'center left'),
        });
        gsap.to(intro.querySelectorAll('.order-rail__cherries'), {
          y: (i) => (i ? -1 : 1) * window.innerHeight * 0.45,
          x: (i) => (i ? 1 : -1) * window.innerWidth * 0.1,
          rotation: (i) => (i ? 90 : -120),
          ease: 'none',
          scrollTrigger: along(intro, 'left left', 'right left'),
        });
      }

      // Each step: the number rises through the panel, the stickers fly across and up at their own depths, the
      // words come up as it slides in and the title types itself out on its tag
      section.querySelectorAll<HTMLElement>('.order-rail__step').forEach((panel, i) => {
        const pass = along(panel, 'left right', 'right left', 0.3);
        gsap.fromTo(
          panel.querySelector('.order-rail__num'),
          { yPercent: 60, rotation: -10 },
          { yPercent: -60, rotation: 8, ease: 'none', scrollTrigger: pass },
        );
        panel.querySelectorAll<HTMLElement>('.order-rail__sticker').forEach((sticker, k) => {
          const depth = Number(sticker.dataset.depth) || 1;
          const reach = (narrow ? 0.55 : 1) * depth;
          const up = k % 2 ? 1 : -1;
          gsap.fromTo(
            sticker,
            { x: 260 * reach, y: 220 * reach * up, rotation: scatter(i * 3 + k, -60, 60, 3) },
            {
              x: -200 * reach,
              y: -180 * reach * up,
              rotation: scatter(i * 3 + k, -40, 40, 8),
              ease: 'none',
              scrollTrigger: pass,
            },
          );
        });
        gsap.from(panel.querySelectorAll('.order-rail__copy > *'), {
          y: narrow ? 70 : 130,
          opacity: 0,
          rotation: (k) => (k % 2 ? -5 : 5),
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: along(panel, 'left 95%', 'left 30%'),
        });
        const line = panel.querySelector<HTMLElement>('.order-rail__tag');
        const caret = line?.querySelector<HTMLElement>('.order-rail__caret');
        if (line && caret) {
          typeOut(line, caret, {
            scrollTrigger: { trigger: panel, containerAnimation: ride, start: 'left 55%', once: true },
          });
        }
      });

      // The chat on the third step: the order types itself into the message box, then Mom's answer pops up
      const chat = section.querySelector<HTMLElement>('.order-rail__chat');
      const typed = chat?.querySelector<HTMLElement>('.order-rail__typed');
      const chatCaret = chat?.querySelector<HTMLElement>('.order-rail__caret');
      if (chat && typed && chatCaret) {
        const reply = chat.querySelector('.order-rail__bubble--mom');
        const panel = chat.closest('.order-rail__step') ?? chat;
        const tl = typeOut(
          typed,
          chatCaret,
          { scrollTrigger: { trigger: panel, containerAnimation: ride, start: 'left 60%', once: true } },
          'none',
        );
        if (reply)
          tl.from(
            reply,
            { scale: 0, rotation: -12, transformOrigin: '0% 100%', duration: 0.6, ease: 'back.out(2.4)' },
            '-=1',
          );
      }

      // The end: the shortcuts drop in from above and bounce, last one first
      const end = section.querySelector<HTMLElement>('.order-rail__end');
      if (end) {
        gsap.from(end.querySelectorAll('.order-rail__tiles > li'), {
          y: () => -window.innerHeight,
          rotation: (k) => scatter(k, -30, 30, 4),
          duration: 1.4,
          ease: 'bounce.out',
          stagger: -0.15,
          scrollTrigger: {
            trigger: end,
            containerAnimation: ride,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        });
        gsap.from(end.querySelectorAll('.order-rail__end-copy > *'), {
          x: narrow ? 120 : 260,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: along(end, 'left 100%', 'left 25%'),
        });
      }

      // A gift box hops along the bottom the whole way, and the bar fills
      const whole = { trigger: section, start: 'top top', end: length, scrub: 0.8, invalidateOnRefresh: true };
      const box = section.querySelector('.order-rail__traveller');
      if (box) {
        const hops = gsap.timeline({ scrollTrigger: whole });
        hops.fromTo(
          box,
          { x: 0 },
          { x: () => window.innerWidth * (narrow ? 0.62 : 0.8), ease: 'none', duration: 1 },
          0,
        );
        hops.to(
          box,
          {
            keyframes: {
              y: [0, -110, 0, -70, 0, -130, 0, -80, 0, -100, 0],
              rotation: [0, -16, 4, 14, -6, -20, 6, 12, -4, -10, 0],
              easeEach: 'sine.inOut',
            },
            ease: 'none',
            duration: 1,
          },
          0,
        );
      }
      const bar = section.querySelector('.order-rail__progress span');
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: whole });
    });
    return () => mm.revert();
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
              From “I want cake” to a box on your table, in four little steps. Keep scrolling, and Mom will walk you
              through them.
            </p>
            <p className="order-rail__hint" aria-hidden="true">
              scroll <span>→</span>
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
      <img className="order-rail__traveller" src="/collage/sticker-gift-box.webp" alt="" aria-hidden="true" />
      <div className="order-rail__progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
