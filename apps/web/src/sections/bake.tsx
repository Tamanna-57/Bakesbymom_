/**
 * "Bake it with Mom": the About page's story as a cake you bake alongside her. The section pins one kitchen to
 * the screen and scrolling walks through six steps (measure, eggs, mix, bake, decorate, box) while the light in
 * the window moves from sunrise to night. Mom tells the story in the card beside it, one line per step.
 *
 * Scroll position is written to CSS variables (--day, --p0 … --p5) every frame, so the drawing moves without
 * re-rendering React; React only re-renders when the step changes. Visitors who ask for reduced motion get the
 * same six steps as a still, illustrated recipe card instead.
 */
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Button } from '@bakesbymom/ui';
import { art } from '../content';
import { whatsappLink } from '../content/bakery';
import { BAKE_SECONDS, bakeSteps, type BakeStep } from '../content/story';
import { Engraving, Ink, Lines, Shade, contourHatch, cylinderSide, ellipse } from '../engrave/kit';
import { Cake, CakeBox, CakeStand, Cherry, Star, Stove } from '../engrave/objects';
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
      <div className="bake__stage">
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
            <BakeScene step={step} name={piped} eggTaken={eggTaken} timer={timer} onEgg={() => setEggTaken(true)} />
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
      </div>
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
              <BakeScene step={i} name={piped} eggTaken timer={0} still />
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
          <img src={art.mom} alt="" width={56} height={56} />
          <blockquote>
            <p>{s.says}</p>
          </blockquote>
          <figcaption>Mom</figcaption>
        </figure>
      )}
      {extra}
    </div>
  );
}

/* The kitchen: an engraving ----------------------------------------------------- */

interface BakeSceneProps {
  step: number;
  name: string;
  eggTaken: boolean;
  timer: number | null;
  onEgg?: () => void;
  still?: boolean;
}

/** The counter top, where everything sits. */
const COUNTER = 300;
const MID = 240;

/** A row of jars on the shelf: [x, width, height, lid wash, label?]. */
const JARS: [number, number, number, 'cherry' | 'gold' | 'cocoa' | 'sky', boolean][] = [
  [318, 26, 34, 'cocoa', true],
  [352, 30, 44, 'cherry', true],
  [390, 22, 28, 'gold', false],
  [420, 24, 36, 'sky', true],
];

function BakeScene({ step, name, eggTaken, timer, onEgg, still = false }: BakeSceneProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const s: BakeStep = bakeSteps[step]!;
  const label = name || 'for you';
  const tag = name ? `for ${name}` : 'for you';
  const baking = timer !== null && timer > 0;
  const classes = [
    'bake-scene',
    still && 'is-still',
    eggTaken && (still ? 'is-egg-held' : 'is-egg-taken'),
    baking && 'is-baking',
    (timer === 0 || still) && 'is-baked',
  ]
    .filter(Boolean)
    .join(' ');
  const standY = 258;

  return (
    <div className={classes} data-step={step}>
      <Engraving width={480} height={400} label={s.scene} draw={false} screen="halftone" className="bake-scene__svg">
        <defs>
          <clipPath id={`${id}-sky`}>
            <path d="M52 206V112a74 74 0 0 1 148 0v94z" />
          </clipPath>
        </defs>

        {/* The wall, the tiles below it and the light of the hour */}
        <rect width="480" height="400" className="bk-wall" />
        <Shade d="M0 214h480v86H0z" kind="dots" opacity={0.35} />
        <Lines d={Array.from({ length: 4 }, (_, i) => `M0 ${222 + i * 20}H480`).join('')} weight="hair" />

        {/* The arched window: the sky, the sun or the moon, the rooftops across the lane */}
        <g clipPath={`url(#${id}-sky)`}>
          <rect x="52" y="30" width="148" height="180" className="bk-sky" />
          <g className="bk-stars">
            <circle cx="80" cy="76" r="1.4" />
            <circle cx="112" cy="104" r="1" />
            <circle cx="160" cy="70" r="1.4" />
            <circle cx="182" cy="118" r="1" />
            <circle cx="96" cy="132" r="1" />
          </g>
          <circle className="bk-sun" cx="74" cy="194" r="13" />
          <g className="bk-moon">
            <circle cx="160" cy="96" r="12" />
            <circle cx="166" cy="91" r="10.5" className="bk-sky-cut" />
          </g>
          <path className="bk-roofs" d="M52 206v-22h22v-10h18v10h14v-18h26v18h12v-12h20v12h36v22z" />
          <Lines d="M52 184h22M92 174h-18M106 166h26M144 172h20" weight="hair" />
        </g>
        <Ink d="M52 206V112a74 74 0 0 1 148 0v94" weight="bold" />
        <Lines d="M126 38v168M52 140h148M60 112a66 66 0 0 1 132 0" weight="fine" />
        {/* Shutters, open */}
        <Ink d="M24 206V118q0-48 26-66v154z" wash="rose" />
        <Shade d="M24 206V118q0-48 26-66v154z" density={2} opacity={0.5} />
        <Lines d="M30 130h16M30 150h16M30 170h16M30 190h16" weight="hair" />
        <Ink d="M228 206V118q0-48-26-66v154z" wash="rose" />
        <Lines d="M206 130h16M206 150h16M206 170h16M206 190h16" weight="hair" />
        {/* The sill and Mom's tulsi */}
        <Ink d="M40 206h172v8H40z" wash="paper" />
        <Ink d="M156 206l3-16h20l3 16z" wash="cherry" />
        <Ink
          d="M168 190c-8-10-6-22 2-26 2 8 2 18-2 26zm2 0c4-12 12-16 18-12-4 8-10 11-18 12zm-2 0c-6-6-14-6-16 0 6 3 10 2 16 0z"
          wash="leaf"
          weight="hair"
        />

        {/* The shelf and the jars */}
        <Ink d="M296 128h160v7H296z" wash="paper" />
        <Lines d="M310 135l8 14M442 135l-8 14" weight="fine" />
        {JARS.map(([x, w, h, lid, labelled]) => (
          <g key={x}>
            <Ink d={`M${x} 128v${-h + 6}q0 -6 6 -6h${w - 12}q6 0 6 6v${h - 6}z`} wash="glass" />
            <Shade d={`M${x + w * 0.6} 128v${-h + 6}q0 -6 ${w * 0.4 - 6} -6h0v${h}z`} density={1} opacity={0.5} />
            <Ink d={`M${x - 2} ${128 - h}h${w + 4}v-7h${-w - 4}z`} wash={lid === 'gold' ? 'gold' : lid} weight="fine" />
            {labelled && <Ink d={`M${x + 4} ${128 - h * 0.6}h${w - 8}v10h${-w + 8}z`} wash="paper" weight="hair" />}
          </g>
        ))}
        <Ink d="M404 40h40v48h-40z" wash="sand" />
        <Ink d="M409 45h30v38h-30z" wash="paper" weight="hair" />
        <Ink d="M424 60c-4-6-12-2-8 5l8 8 8-8c4-7-4-11-8-5z" wash="cherry" weight="hair" />

        {/* Night falls over the room; the lamp's light falls on the counter */}
        <rect className="bk-dim" width="480" height="400" />
        <path className="bk-glow" d={`M${MID - 18} 92L${MID - 150} ${COUNTER}H${MID + 150}L${MID + 18} 92z`} />

        {/* The counter: a marble top over panelled doors with gold knobs */}
        <Ink d={`M6 ${COUNTER}h468v12H6z`} wash="cream" />
        <Lines d={`M40 ${COUNTER + 4}q40 -3 80 1t70 -2M260 ${COUNTER + 6}q50 -4 90 0t60 -2`} weight="hair" />
        <Ink d={`M14 ${COUNTER + 12}h452v100H14z`} wash="rose" />
        {[22, 136, 250, 364].map((x) => (
          <g key={x}>
            <Ink d={`M${x} ${COUNTER + 22}h100v80h-100z`} wash="pink" weight="fine" />
            <Lines d={`M${x + 8} ${COUNTER + 30}h84v64h-84z`} weight="hair" />
            <Ink d={ellipse(x + 50, COUNTER + 40, 3, 3)} wash="gold" weight="hair" />
          </g>
        ))}
        <Shade d={`M14 ${COUNTER + 12}h452v14H14z`} density={2} opacity={0.6} />

        {/* Steps 1–3: the bowl, the flour, the egg and the whisk */}
        <g className="bk-piece bk-piece--bowl">
          <Shade d={ellipse(MID + 4, COUNTER - 1, 62, 7)} density={2} opacity={0.4} />
          <g className="bk-cup">
            <Ink d="M318 150l30-8 8 34-26 7z" wash="paper" />
            <Ink d="M348 154q14-2 14 10t-10 10" wash="none" weight="fine" />
            <Shade d="M340 147l8-2 8 31-6 2z" density={2} />
          </g>
          <path className="bk-stream" d="M322 158Q300 176 262 238" />
          <Ink d={cylinderSide(MID, 244, COUNTER - 2, 70, 15, 40)} wash="paper" />
          <Lines d={contourHatch(MID, 244, COUNTER - 2, 70, 15, 0.35, 12, 40)} className="eg-contour" />
          <Ink d={`M${MID - 66} 262q66 16 132 0`} wash="none" weight="hair" />
          <path d={`M${MID - 64} 258q64 16 128 0`} className="bk-bowl-band" />
          <Ink d={ellipse(MID, 244, 70, 15)} wash="sky" />
          <ellipse cx={MID} cy={244} rx={60} ry={11} className="bk-flour" />
          <ellipse cx={MID} cy={244} rx={64} ry={12.5} className="bk-batter" />
          <path className="bk-swirl" d={`M${MID} 244m-40 0a40 8 0 1 0 80 0a28 5.5 0 1 0-56 0a14 3 0 1 0 28 0`} />
          <g className="bk-whisk" style={{ transformOrigin: `${MID + 40}px 150px` }}>
            <Lines d={`M${MID + 6} 238L${MID + 54} 150`} weight="bold" />
            <Ink d={`M${MID + 54} 150l14-26`} wash="none" weight="bold" />
            <Lines d={`M${MID + 6} 238c-26-2-34 18-16 22s26-10 16-22zm0 0c-8 8-10 24 2 22s10-16-2-22z`} weight="fine" />
          </g>
          <g className="bk-egg" onClick={onEgg}>
            <Shade d={ellipse(346, COUNTER - 1, 12, 3)} density={2} />
            <Ink
              d={`M346 ${COUNTER - 2}c-10 0-14-8-14-16 0-10 6-20 14-20s14 10 14 20c0 8-4 16-14 16z`}
              wash="biscuit"
            />
            <Lines d={`M352 ${COUNTER - 30}q6 6 5 14`} weight="hair" />
          </g>
          <g transform="translate(-48 0)">
            <g className="bk-hand">
              <Ink d="M438 252h60v44h-60z" wash="sky" />
              <Ink d="M432 254h5v40h-5zM425 255h5v38h-5z" wash="gold" weight="hair" />
              <Ink d={ellipse(410, 274, 20, 17)} wash="biscuit" />
              <Ink d={ellipse(396, 263, 10, 6)} wash="biscuit" weight="hair" />
              <Ink d={ellipse(393, 273, 10, 6)} wash="biscuit" weight="hair" />
              <Ink d={ellipse(394, 291, 10, 5.5)} wash="biscuit" weight="hair" />
            </g>
          </g>
        </g>

        {/* Step 4: the stove */}
        <g className="bk-piece bk-piece--oven">
          <Stove
            x={MID - 52}
            y={COUNTER - 104}
            timer={timer === 0 || still ? 'DING!' : `0:0${timer ?? BAKE_SECONDS}`}
            hooks={{ glow: 'bk-oven-glow', rise: 'bk-rise', heat: 'bk-heat', timer: 'bk-timer-text' }}
          />
          <g className="bk-ding">
            <Star x={MID + 96} y={COUNTER - 120} s={11} />
            <Star x={MID + 112} y={COUNTER - 92} s={6} />
          </g>
        </g>

        {/* Step 5: the cake on its stand, and a name piped across the top */}
        <g className="bk-piece bk-piece--cake">
          <CakeStand cx={MID} y={standY} w={156} foot={0.36} />
          <Cake
            cx={MID}
            base={standY}
            rx={60}
            h={56}
            wash="pink"
            drip={false}
            band
            cherries={0}
            top={
              <text
                key={`${label}-${step === 4 || still}`}
                x="0"
                y="14"
                textAnchor="middle"
                className="bk-name-text"
                textLength={label.length > 9 ? 96 : undefined}
                lengthAdjust="spacingAndGlyphs"
              >
                {label}
              </text>
            }
          />
          <Cherry x={MID - 26} y={standY - 60} r={5} />
          <Cherry x={MID} y={standY - 66} r={5} stem={-1} />
          <Cherry x={MID + 26} y={standY - 60} r={5} />
        </g>

        {/* Step 6: the box, the lid, the ribbon and the tag */}
        <g className="bk-piece bk-piece--box">
          <CakeBox
            x={MID - 58}
            y={COUNTER - 76}
            w={100}
            h={76}
            d={64}
            lidClassName="bk-lid"
            ribbonClassName="bk-ribbon"
          />
          <g transform={`translate(${MID + 62} ${COUNTER - 58}) rotate(8)`}>
            <g className="bk-tag">
              <Lines d="M-14 -10q14 -4 22 6" weight="fine" />
              <Ink d="M10 -8h70a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-70l-10-16z" wash="paper" />
              <path d="M14 -4h62v20h-62z" className="eg-gold-ink" />
              <Ink d={ellipse(10, 8, 2, 2)} wash="none" weight="hair" />
              <text
                x="46"
                y="14"
                className="bk-tag-text"
                textAnchor="middle"
                textLength={tag.length > 9 ? 58 : undefined}
                lengthAdjust="spacingAndGlyphs"
              >
                {tag}
              </text>
            </g>
          </g>
        </g>

        {/* The pendant lamp over the counter */}
        <Lines d={`M${MID} 0V62`} weight="fine" />
        <Ink d={`M${MID - 24} 92l10-28h28l10 28z`} wash="cherry" />
        <Shade d={`M${MID + 4} 64h10l10 28h-14z`} density={2} />
        <Ink d={ellipse(MID, 92, 24, 4)} wash="wine" weight="hair" />
        <circle className="bk-bulb" cx={MID} cy={95} r="5" />
      </Engraving>
    </div>
  );
}
