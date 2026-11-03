/**
 * "Bake it with Mom": the About page's story as a cake you bake alongside her. The section pins Mom's kitchen to
 * the screen and scrolling walks through six steps (measure, eggs, mix, bake, decorate, box) from sunrise to
 * night. Mom tells the story in the card beside it, one line per step.
 *
 * It's dressed like the home hero: blue candy stripes, a photo in the cherry arch and a cream card. The kitchen
 * is a collage after the board pins: each hour has its own photo in the arch (the evening one is Mom's own
 * cake), the time on a scalloped badge, and that step's stamps, stickers, halftones and notes sticking down
 * round it. The light in the arch warms and dims through the day.
 *
 * Scroll position is written to CSS variables (--day, --p0 … --p5) every frame; React only re-renders when the
 * step changes. Visitors who ask for reduced motion get the same six steps as a still recipe card instead.
 */
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Button, PatternSurface } from '@bakesbymom/ui';
import { Badge, Bubble, GiftTag, Halftone, Note, Stamp, Sticker, Tape } from '../collage/Collage';
import { momsCakes, stock } from '../content';
import { whatsappLink } from '../content/bakery';
import { BAKE_SECONDS, bakeSteps } from '../content/story';
import { glideTo } from '../motion';
import './bake.css';

const STEPS = bakeSteps.length;
/** Where a click on the step rail lands inside that step (0 = its start, 1 = its end). */
const LANDING = [0.85, 0.2, 0.75, 0.3, 0.3, 0.9];
/** Past this far into the eggs step, Mom takes the egg whether or not anyone tapped it. */
const EGG_AUTO = 0.6;
/** Longest name the cake takes. */
const NAME_MAX = 16;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** --day runs 0 → 1 across the whole bake; --pN runs 0 → 1 across step N. */
function progressVars(pos: number): Record<string, string> {
  const vars: Record<string, string> = { '--day': clamp01(pos / STEPS).toFixed(4) };
  for (let i = 0; i < STEPS; i++) vars[`--p${i}`] = clamp01(pos - i).toFixed(4);
  return vars;
}

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.(query).matches);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useDebounced<T>(value: T, ms: number) {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setSettled(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return settled;
}

const orderMessage = (name: string) =>
  name
    ? `Hello Bakes by Mom! I'd love a cake with "${name}" piped on top 🎂`
    : "Hello Bakes by Mom! I'd like to order a cake 🎂";

/** The About page's story: bake a cake with Mom, from sunrise to night. */
export function BakeWithMomSection() {
  const reduced = useReducedMotion();
  const [name, setName] = useState('');
  const piped = useDebounced(name.trim(), 450);
  return reduced ? (
    <BakeStill name={name} setName={setName} piped={piped} />
  ) : (
    <BakeScroll name={name} setName={setName} piped={piped} />
  );
}

interface NameProps {
  name: string;
  setName: (name: string) => void;
  /** The name as it's piped on the cake: trimmed, and settled for a moment so typing doesn't restart the icing. */
  piped: string;
}

/* The pinned, scroll-driven bake --------------------------------------- */

function BakeScroll({ name, setName, piped }: NameProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef(0);
  /** While the rail glides the page somewhere, don't let Mom grab the egg on the way past. */
  const glidingUntil = useRef(0);
  const [step, setStep] = useState(0);
  const [eggTaken, setEggTaken] = useState(false);
  /** Seconds left in the oven; null until the cake goes in. */
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = document.querySelector<HTMLElement>('.bbm-header');
    let frame = 0;
    const update = () => {
      frame = 0;
      section.style.setProperty('--bake-top', `${header?.offsetHeight ?? 0}px`);
      const travel = section.offsetHeight - window.innerHeight;
      const pos = travel > 0 ? clamp01(-section.getBoundingClientRect().top / travel) * STEPS : 0;
      for (const [key, value] of Object.entries(progressVars(pos))) section.style.setProperty(key, value);
      const next = Math.min(Math.floor(pos), STEPS - 1);
      if (next !== stepRef.current) {
        stepRef.current = next;
        setStep(next);
      }
      // Only while scrolling past the egg: a jump over it (the rail, a restored scroll) leaves it to tap later.
      if (pos > 1 + EGG_AUTO && pos < 2.25 && performance.now() > glidingUntil.current) setEggTaken(true);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // The cake goes in the oven the first time the bake step comes round, then counts down a second at a time.
  useEffect(() => {
    if (step >= 3 && timer === null) setTimer(BAKE_SECONDS);
  }, [step, timer]);
  useEffect(() => {
    if (!timer) return;
    const id = window.setTimeout(() => setTimer(timer - 1), 1000);
    return () => window.clearTimeout(id);
  }, [timer]);

  const sectionTop = (section: HTMLElement) => section.getBoundingClientRect().top + window.scrollY;
  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    glidingUntil.current = performance.now() + 2000;
    glideTo(sectionTop(section) + ((i + LANDING[i]!) / STEPS) * travel);
  };
  const skip = () => {
    const section = sectionRef.current;
    if (!section) return;
    const header = document.querySelector<HTMLElement>('.bbm-header')?.offsetHeight ?? 0;
    glidingUntil.current = performance.now() + 2000;
    glideTo(sectionTop(section) + section.offsetHeight - header);
  };

  return (
    <section
      ref={sectionRef}
      id="bake"
      className="bake"
      data-step={step}
      aria-labelledby="bake-title"
      style={{ '--steps': STEPS } as CSSProperties}
    >
      <PatternSurface
        pattern="stripes"
        tone="blue"
        scale="xl"
        ground="var(--bbm-color-bg-canvas)"
        className="bake__stage"
      >
        <span className="bake__dusk" aria-hidden="true" />
        <div className="bake__inner">
          <h2 id="bake-title" className="bake__sr">
            Bake a cake with Mom
          </h2>
          <nav className="bake__rail" aria-label="Baking steps">
            <ol>
              {bakeSteps.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="bake__rail-step"
                    aria-current={i === step ? 'step' : undefined}
                    data-done={i < step || undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="bake__rail-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="bake__rail-label">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="bake__skip" onClick={skip}>
              Skip ahead
            </button>
          </nav>
          <div className="bake__scene">
            <BakeWindow step={step} name={piped} eggTaken={eggTaken} timer={timer} onEgg={() => setEggTaken(true)} />
          </div>
          <div className="bake__card-slot" aria-live="polite">
            <StepCard
              key={step}
              index={step}
              eggTaken={eggTaken}
              onEgg={() => setEggTaken(true)}
              timer={timer}
              name={name}
              setName={setName}
              piped={piped}
            />
          </div>
        </div>
      </PatternSurface>
    </section>
  );
}

/* The still version, for reduced motion -------------------------------- */

function BakeStill({ name, setName, piped }: NameProps) {
  return (
    <section id="bake" className="bake bake--still" aria-labelledby="bake-title">
      <h2 id="bake-title" className="bake__still-title">
        Bake a cake with Mom
      </h2>
      <ol className="bake__still-list">
        {bakeSteps.map((s, i) => (
          <li key={s.id} className="bake__still-step">
            <div className="bake__scene bake__scene--still" style={stillVars(i)}>
              <BakeWindow step={i} name={piped} eggTaken timer={0} still />
            </div>
            <StepCard index={i} eggTaken timer={0} name={name} setName={setName} piped={piped} still />
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Every step up to and including this one, finished. */
const stillVars = (step: number) => progressVars(step + 1) as CSSProperties;

/* The card: where Mom tells the story ---------------------------------- */

interface StepCardProps extends NameProps {
  index: number;
  eggTaken: boolean;
  onEgg?: () => void;
  timer: number | null;
  still?: boolean;
}

function StepCard({ index, eggTaken, onEgg, timer, name, setName, piped, still = false }: StepCardProps) {
  const s = bakeSteps[index]!;
  const nameId = useId();
  const waiting = s.id === 'eggs' && !eggTaken;
  const baking = s.id === 'bake' && !still && timer !== 0;

  let title = s.title;
  if (s.id === 'eggs' && eggTaken) title = 'Mom has other ideas';
  if (s.id === 'bake' && !baking && !still) title = 'Ding! Golden and risen';

  // Scroll hints only make sense while scrolling; the egg and name prompts stand on their own.
  const showHint =
    !!s.hint && (s.id === 'eggs' ? waiting : s.id === 'decorate' || (!still && (s.id !== 'bake' || baking)));

  let extra: ReactNode = null;
  if (waiting) {
    extra = (
      <Button variant="secondary" size="sm" onClick={onEgg}>
        Crack in an egg
      </Button>
    );
  } else if (baking) {
    extra = (
      <p className="bake__timer" role="timer" aria-label={`${timer ?? BAKE_SECONDS} seconds left`}>
        0:0{timer ?? BAKE_SECONDS}
      </p>
    );
  } else if (s.id === 'decorate') {
    extra = (
      <div className="bake__name">
        <label htmlFor={nameId}>Name on the cake</label>
        <input
          id={nameId}
          type="text"
          value={name}
          maxLength={NAME_MAX}
          placeholder="Riya"
          autoComplete="off"
          enterKeyHint="done"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
    );
  } else if (s.id === 'box') {
    extra = (
      <div className="bake__cta">
        <Button href={whatsappLink(orderMessage(piped))} target="_blank" rel="noreferrer">
          {piped ? `Order ${piped}'s cake` : 'Order a cake'} on WhatsApp
        </Button>
        <Button variant="ghost" href="/catalog">
          See all the cakes
        </Button>
      </div>
    );
  }

  return (
    <div className="bake__card" data-still={still || undefined}>
      <p className="bake__time">
        <span>{s.time}</span> · Step {index + 1} of {STEPS}
      </p>
      <h3 className="bake__title">{title}</h3>
      {showHint && <p className="bake__hint">{s.hint}</p>}
      {!waiting && (
        <figure className="bake__says">
          <blockquote>
            <p>{s.says}</p>
          </blockquote>
          <figcaption>with love, Mom</figcaption>
        </figure>
      )}
      {extra}
    </div>
  );
}

/* The window: Mom's kitchen as a photo collage ------------------------------------------ */

interface BakeWindowProps {
  step: number;
  name: string;
  eggTaken: boolean;
  timer: number | null;
  onEgg?: () => void;
  still?: boolean;
}

/** What shows in the arch at each step: one photo per hour of the day. */
const ARCH = [stock.kitchen, stock.batter, stock.mixing, stock.tin, momsCakes.hbdMomButterfly, stock.bento];

/** The orders that come in while Mom mixes: one became two, two became a weekend booked out. */
const ORDERS: { from: 'you' | 'mom'; text: string }[] = [
  { from: 'you', text: 'Could you bake one for Riya’s birthday? 🎂' },
  { from: 'mom', text: 'Of course! Eggless, as always ♥' },
  { from: 'you', text: 'And two dozen cupcakes for Saturday?' },
  { from: 'you', text: 'Is next weekend free too?' },
];

/**
 * The kitchen through the day, after the board pins and the home hero: a photo in the cherry arch, the hour on
 * a scalloped badge, and each step's pieces (stamps, stickers, halftones, notes, tags) sticking down round it.
 */
function BakeWindow({ step, name, eggTaken, timer, onEgg, still = false }: BakeWindowProps) {
  const s = bakeSteps[step]!;
  const [clock, meridiem] = s.time.split(' ');
  const tag = name ? `for ${name}` : 'for you';
  const baked = still || timer === 0;
  const set = (i: number) => ({
    className: 'bake-window__set',
    'data-on': i === step || undefined,
    'aria-hidden': i === step ? undefined : true,
  });

  return (
    <div
      className={['collage bake-window', still && 'is-still', eggTaken && 'is-egg-taken'].filter(Boolean).join(' ')}
      data-step={step}
      role="img"
      aria-label={s.scene}
    >
      {/* The arch: the photo of the hour, and the light of the hour over it */}
      <div className="bake-window__arch">
        {ARCH.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt=""
            data-on={i === step || undefined}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <span className="bake-window__light" />
      </div>

      {/* The hour, on a scalloped badge like the home page's eggless one */}
      <div className="bake-window__clock" key={s.id}>
        <Badge
          value={clock!}
          label={`${meridiem} · ${s.light}`}
          tone={step === 5 ? 'butter' : 'cherry'}
          place={{ x: 0, y: 0, w: 100, r: -10 }}
        />
      </div>

      {/* 6:00 am: flour, sugar and a little hope */}
      <div {...set(0)}>
        <Halftone src="halftone-cherries-pink" place={{ x: 72, y: 4, w: 25, r: 12, z: 0, i: 0 }} />
        <Tape tone="butter" place={{ x: 41, y: 3, w: 15, r: -6, z: 6, i: 1 }} />
        <Note arrow="left" place={{ x: 77, y: 54, w: 22, r: -4, z: 6, i: 2 }}>
          flour, sugar &amp; a little hope
        </Note>
      </div>

      {/* 9:30 am: the egg, and Mom's answer to it */}
      <div {...set(1)}>
        <Halftone src="halftone-cherries" place={{ x: 1, y: 60, w: 20, r: -12, z: 0, i: 0 }} />
        <button
          type="button"
          className="collage__piece bake-window__egg"
          style={{ left: '72%', top: '30%', width: '18%', '--r': '14deg', '--i': 1 } as CSSProperties}
          onClick={onEgg}
          disabled={eggTaken || !onEgg}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src="/collage/halftone-egg.webp" alt="" />
        </button>
        <div className="bake-window__no-eggs">
          <Badge value="100%" label="eggless" tone="cherry" place={{ x: 71, y: 24, w: 21, r: 8, z: 7, i: 0 }} />
          <Note arrow="left" place={{ x: 77, y: 62, w: 22, r: -5, z: 7, i: 1 }}>
            not in my kitchen, beta
          </Note>
        </div>
      </div>

      {/* 12:00 pm: the orders come in while the batter's mixed */}
      <div {...set(2)}>
        <Halftone src="halftone-cherries-pink" place={{ x: 1, y: 62, w: 19, r: -10, z: 0, i: 0 }} />
        {ORDERS.map((order, i) => (
          <Bubble
            key={order.text}
            from={order.from}
            place={{ x: order.from === 'you' ? 60 : 66, y: 8 + i * 20, w: 36, r: i % 2 ? 2 : -2, z: 6, i: 1 + i * 3 }}
          >
            {order.text}
          </Bubble>
        ))}
      </div>

      {/* 3:00 pm: into the oven, and the timer */}
      <div {...set(3)}>
        <Halftone src="halftone-cake" place={{ x: 0, y: 36, w: 20, r: -6, z: 0, i: 0 }} opacity={0.75} />
        <Badge
          value={baked ? 'Ding!' : `0:0${timer ?? BAKE_SECONDS}`}
          label={baked ? 'golden & risen' : 'in the oven'}
          tone="butter"
          place={{ x: 71, y: 26, w: 21, r: 8, z: 7, i: 1 }}
        />
        <Note arrow="left" place={{ x: 77, y: 64, w: 21, r: -4, z: 6, i: 2 }}>
          no peeking!
        </Note>
      </div>

      {/* 6:30 pm: every cake has someone's name on it (these are Mom's) */}
      <div {...set(4)}>
        <Stamp src={momsCakes.papa.src} caption="for Papa" place={{ x: 1, y: 20, w: 21, r: -8, z: 3, i: 0 }} />
        <Stamp src={momsCakes.yatharth.src} caption="for Yatharth" place={{ x: 76, y: 4, w: 21, r: 7, z: 3, i: 1 }} />
        <Stamp src={momsCakes.wifey.src} caption="for a wife" place={{ x: 77, y: 48, w: 20, r: -5, z: 3, i: 2 }} />
        <div className="bake-window__piped" key={name || 'blank'}>
          <GiftTag place={{ x: 24, y: 82, w: 48, r: -3, z: 8, i: 3 }}>{tag}</GiftTag>
        </div>
      </div>

      {/* 9:00 pm: boxed, tied, ready to go */}
      <div {...set(5)}>
        <Halftone src="halftone-cherries" place={{ x: 75, y: 2, w: 21, r: 10, z: 0, i: 0 }} />
        <Sticker src="sticker-gift-box" place={{ x: 64, y: 44, w: 34, r: 6, z: 5, i: 1 }} />
        <GiftTag place={{ x: 0, y: 74, w: 36, r: -6, z: 8, i: 2 }}>{tag}</GiftTag>
        <Badge value="♥" label="baked with love" tone="pink" place={{ x: 4, y: 34, w: 16, r: -6, z: 6, i: 3 }} />
      </div>
    </div>
  );
}
