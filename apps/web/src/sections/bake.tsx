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

/* The kitchen ----------------------------------------------------------- */

interface BakeSceneProps {
  step: number;
  name: string;
  eggTaken: boolean;
  timer: number | null;
  onEgg?: () => void;
  still?: boolean;
}

/** A row of scallops from (x, y), `count` wide across `width`, dipping `depth` below the line. */
const scallops = (width: number, count: number, depth: number) =>
  Array.from({ length: count }, () => `q${-width / count / 2} ${depth * 2} ${-width / count} 0`).join(' ');

const FROSTING = `M158 200V186q0-8 8-8h148q8 0 8 8v14${scallops(164, 8, 7)}z`;
const PEARLS = Array.from({ length: 11 }, (_, i) => 168 + i * 14.4);

function BakeScene({ step, name, eggTaken, timer, onEgg, still = false }: BakeSceneProps) {
  const id = useId().replace(/:/g, '');
  const s: BakeStep = bakeSteps[step]!;
  const label = name || 'for you';
  const tag = name ? `for ${name}` : 'for you';
  // A rough width for the piped name, so the bag knows how far to travel and long names squeeze to fit.
  const nameWidth = Math.min(label.length * 14, 136);
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

  return (
    <svg
      className={classes}
      data-step={step}
      viewBox="0 0 480 400"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={s.scene}
    >
      <defs>
        <pattern id={`${id}-tiles`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="2" />
        </pattern>
        <pattern id={`${id}-stripes`} width="32" height="10" patternUnits="userSpaceOnUse">
          <rect width="16" height="10" className="f-pink2" stroke="none" />
          <rect x="16" width="16" height="10" className="f-paper" stroke="none" />
        </pattern>
        <clipPath id={`${id}-sky`}>
          <rect x="44" y="40" width="168" height="132" rx="6" />
        </clipPath>
      </defs>

      {/* The kitchen: wall, window, shelf, lamp and counter */}
      <rect className="bk-wall" width="480" height="400" stroke="none" />
      <rect className="bk-tiles" width="480" height="300" fill={`url(#${id}-tiles)`} stroke="none" />

      <g clipPath={`url(#${id}-sky)`} stroke="none">
        <rect className="bk-sky" x="44" y="40" width="168" height="132" />
        <g className="bk-stars">
          <circle cx="70" cy="62" r="2" />
          <circle cx="104" cy="88" r="1.5" />
          <circle cx="150" cy="58" r="2" />
          <circle cx="196" cy="98" r="1.5" />
          <circle cx="86" cy="112" r="1.5" />
        </g>
        <circle className="bk-sun" cx="60" cy="160" r="16" />
        <g className="bk-moon">
          <circle cx="168" cy="80" r="14" className="f-paper" />
          <circle cx="176" cy="74" r="12" className="bk-sky-cut" />
        </g>
        {/* Rooftops across the lane, water tanks and all */}
        <path
          className="bk-roofs"
          d="M44 172v-24h26v-10h22v10h18v-18h30v18h14v-12h24v12h34v24z M118 130v-10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10z M164 136v-8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8z"
        />
      </g>
      <rect x="44" y="40" width="168" height="132" rx="6" fill="none" />
      <path d="M128 40v132M44 106h168" fill="none" strokeWidth="3.5" />
      <rect x="34" y="172" width="188" height="12" rx="4" className="f-paper" />
      {/* A tulsi pot on the sill */}
      <path
        d="M176 150c-6-10-2-20 6-22 0 8 0 14-6 22zm8 0c2-12 10-16 16-14-4 8-8 12-16 14z"
        className="f-matcha"
        strokeWidth="2.5"
      />
      <path d="M168 150h32l-4 22h-24z" className="f-cherry" strokeWidth="3" />

      <g className="bk-shelf">
        <rect x="304" y="58" width="30" height="40" rx="6" className="f-blue" strokeWidth="3" />
        <rect x="302" y="50" width="34" height="10" rx="3" className="f-brown" strokeWidth="3" />
        <rect x="308" y="70" width="22" height="24" rx="3" className="f-flour" stroke="none" />
        <rect x="346" y="48" width="34" height="50" rx="8" className="f-blue" strokeWidth="3" />
        <rect x="344" y="40" width="38" height="10" rx="3" className="f-cherry" strokeWidth="3" />
        <circle cx="356" cy="72" r="5" className="f-brown" strokeWidth="2" />
        <circle cx="370" cy="82" r="5" className="f-brown" strokeWidth="2" />
        <circle cx="360" cy="88" r="4" className="f-brown" strokeWidth="2" />
        <rect x="392" y="62" width="26" height="36" rx="6" className="f-blue" strokeWidth="3" />
        <rect x="390" y="54" width="30" height="10" rx="3" className="f-butter" strokeWidth="3" />
        <rect x="396" y="76" width="18" height="18" rx="3" className="f-pink2" stroke="none" />
        <rect x="292" y="98" width="156" height="10" rx="3" className="f-paper" strokeWidth="3.5" />
      </g>

      <rect className="bk-counter-front" x="-4" y="310" width="488" height="94" fill={`url(#${id}-stripes)`} />
      <rect x="-4" y="296" width="488" height="16" rx="4" className="f-sunken" />

      <rect className="bk-dim" width="480" height="400" stroke="none" />
      <path className="bk-glow" d="M226 56 150 296h180L254 56z" stroke="none" />
      <path d="M240 0v30" fill="none" strokeWidth="3" />
      <path d="M216 54l12-26h24l12 26z" className="f-cherry" strokeWidth="3.5" />
      <circle className="bk-bulb" cx="240" cy="56" r="5" strokeWidth="2.5" />

      {/* Steps 1–3: the bowl, the egg and the whisk */}
      <g className="bk-piece bk-piece--bowl">
        <g className="bk-cup">
          <path d="M262 92h52l-6 44h-40z" className="f-paper" />
          <path d="M314 100h8a8 8 0 0 1 0 16h-10" fill="none" />
          <ellipse cx="288" cy="94" rx="24" ry="5" className="f-flour" strokeWidth="2.5" />
        </g>
        <path className="bk-stream" d="M270 134c-10 36-18 66-24 100" fill="none" />
        <ellipse cx="240" cy="236" rx="92" ry="16" className="f-bowl-in" />
        <path className="bk-flour" d="M172 238Q240 172 308 238z" />
        <ellipse className="bk-batter" cx="240" cy="238" rx="88" ry="14" />
        <path className="bk-swirl" d="M240 238m-44 0a44 7 0 1 0 88 0a30 5 0 1 0-60 0a16 3 0 1 0 32 0" fill="none" />
        <g className="bk-whisk">
          <g transform="translate(-4 -16)">
            <path d="M256 222 312 120" fill="none" strokeWidth="9" className="bk-handle" />
            <path
              d="M256 222c-34-4-46 26-22 30s34-14 22-30zm0 0c-12 10-14 32 2 30s14-22-2-30z"
              fill="none"
              strokeWidth="3"
            />
          </g>
        </g>
        <path d="M146 236h188c0 40-40 64-94 64s-94-24-94-64z" className="f-paper" />
        <path d="M156 258q84 26 168 0" fill="none" className="bk-bowl-band" strokeWidth="5" />
        <g className="bk-egg" onClick={onEgg}>
          <ellipse cx="392" cy="279" rx="15" ry="18" className="f-paper" />
          <path d="M386 268q-4 6-3 12" fill="none" strokeWidth="2.5" className="bk-sheen" />
        </g>
        <g className="bk-hand">
          <rect x="438" y="252" width="60" height="44" rx="8" className="f-blue2" />
          <rect x="434" y="254" width="5" height="40" rx="2" className="f-gold" strokeWidth="2" />
          <rect x="428" y="255" width="5" height="38" rx="2" className="f-gold" strokeWidth="2" />
          <ellipse cx="410" cy="274" rx="20" ry="17" className="f-skin" />
          <ellipse cx="396" cy="263" rx="10" ry="6" className="f-skin" strokeWidth="3" />
          <ellipse cx="393" cy="273" rx="10" ry="6" className="f-skin" strokeWidth="3" />
          <ellipse cx="394" cy="291" rx="10" ry="5.5" className="f-skin" strokeWidth="3" />
        </g>
      </g>

      {/* Step 4: the oven */}
      <g className="bk-piece bk-piece--oven">
        <g className="bk-heat" fill="none" strokeWidth="3">
          <path d="M200 120q-8-10 0-20t0-20" />
          <path d="M240 116q-8-10 0-20t0-20" />
          <path d="M280 120q-8-10 0-20t0-20" />
        </g>
        <rect x="158" y="290" width="18" height="10" rx="2" className="f-brown" strokeWidth="3" />
        <rect x="304" y="290" width="18" height="10" rx="2" className="f-brown" strokeWidth="3" />
        <rect x="140" y="132" width="200" height="162" rx="16" className="f-blue" />
        <path d="M140 166h200" fill="none" />
        <circle cx="166" cy="149" r="7" className="f-paper" strokeWidth="3" />
        <circle cx="190" cy="149" r="7" className="f-paper" strokeWidth="3" />
        <rect x="256" y="139" width="70" height="21" rx="5" className="f-ink" strokeWidth="3" />
        <text x="291" y="155" className="bk-timer-text" textAnchor="middle" stroke="none">
          {timer === 0 || still ? 'DING!' : `0:0${timer ?? BAKE_SECONDS}`}
        </text>
        <rect x="156" y="178" width="168" height="104" rx="10" className="f-paper" />
        <rect x="180" y="186" width="120" height="7" rx="3.5" className="f-brown" strokeWidth="2.5" />
        <rect x="174" y="202" width="132" height="68" rx="8" className="f-oven-in" />
        <rect className="bk-oven-glow" x="176" y="204" width="128" height="64" rx="7" stroke="none" />
        <rect className="bk-rise" x="208" y="222" width="64" height="26" rx="10" />
        <rect x="204" y="246" width="72" height="14" rx="3" className="f-tin" strokeWidth="3" />
        <g className="bk-ding">
          <path d="M340 120l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" className="f-butter" strokeWidth="2.5" />
          <path d="M356 150l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" className="f-paper" strokeWidth="2" />
        </g>
      </g>

      {/* Step 5: the cake, and a name piped across it */}
      <g className="bk-piece bk-piece--cake">
        <path d="M218 280h44l10 18h-64z" className="f-paper" />
        <ellipse cx="240" cy="278" rx="104" ry="9" className="f-paper" />
        <rect x="158" y="178" width="164" height="96" rx="10" className="f-pink2" />
        <path d={FROSTING} className="f-paper" />
        {PEARLS.map((x) => (
          <circle key={x} cx={x} cy="268" r="4.5" className="f-paper" strokeWidth="2.5" />
        ))}
        {[204, 240, 276].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy="178" rx="13" ry="8" className="f-paper" strokeWidth="3" />
            <path d={`M${x} 164q${i === 1 ? 2 : 6}-12 ${i === 1 ? 10 : 14}-16`} fill="none" strokeWidth="2.5" />
            <circle cx={x} cy="166" r="8.5" className="f-cherry" strokeWidth="3" />
          </g>
        ))}
        <g
          key={`${label}-${step === 4 || still}`}
          className="bk-name"
          style={{ '--name-w': `${nameWidth}px` } as CSSProperties}
        >
          <text
            x="240"
            y="240"
            className="bk-name-text"
            textAnchor="middle"
            stroke="none"
            textLength={label.length * 14 > 136 ? 136 : undefined}
            lengthAdjust="spacingAndGlyphs"
          >
            {label}
          </text>
          <g className="bk-bag">
            <path d="M0 0l-6-12 30-34 18 14z" className="f-paper" strokeWidth="3" />
            <path d="M24-46l18 14 8-10-16-12z" className="f-cherry" strokeWidth="3" />
          </g>
        </g>
      </g>

      {/* Step 6: the box, the lid, the ribbon and the tag */}
      <g className="bk-piece bk-piece--box">
        <rect x="156" y="196" width="168" height="102" rx="4" className="f-pink" />
        <rect x="174" y="220" width="88" height="56" rx="8" className="f-paper" />
        <rect x="189" y="246" width="58" height="30" rx="5" className="f-pink2" strokeWidth="3" />
        <circle cx="218" cy="240" r="6" className="f-cherry" strokeWidth="2.5" />
        <g className="bk-lid">
          <rect x="148" y="168" width="184" height="34" rx="6" className="f-pink2" />
          <text x="214" y="192" className="bk-lid-text" textAnchor="middle" stroke="none">
            Bakes by Mom
          </text>
        </g>
        {/* Tied off-centre, like a real cake box, so the lid still reads */}
        <g className="bk-ribbon">
          <rect x="282" y="168" width="16" height="130" className="f-cherry" strokeWidth="3" />
          <path
            d="M290 166c-26-22-44-6-30 6 10 8 30 0 30-6zm0 0c26-22 44-6 30 6-10 8-30 0-30-6z"
            className="f-cherry"
            strokeWidth="3"
          />
          <path d="M286 168l-14 26M294 168l14 26" fill="none" strokeWidth="5" className="bk-tails" />
          <circle cx="290" cy="167" r="6" className="f-cherry" strokeWidth="3" />
        </g>
        <g className="bk-tag">
          <path d="M296 168q20 0 28-8" fill="none" strokeWidth="2" />
          <g transform="rotate(8 360 160)">
            <path d="M330 146h70a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-70l-10-16z" className="f-paper" strokeWidth="3" />
            <text
              x="364"
              y="168"
              className="bk-tag-text"
              textAnchor="middle"
              stroke="none"
              textLength={tag.length > 9 ? 64 : undefined}
              lengthAdjust="spacingAndGlyphs"
            >
              {tag}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
