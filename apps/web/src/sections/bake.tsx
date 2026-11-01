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
import {
  Bowl,
  Box,
  CakeBox,
  Cherry,
  Cyl,
  Face,
  IsoScene,
  LayerCake,
  Oven,
  Sparkle,
  Sphere,
  Stand,
  standHeight,
} from '../iso';
import { project } from '../iso/geometry';
import { M, type Material } from '../iso/materials';
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

/* The kitchen: an isometric diorama ------------------------------------- */

interface BakeSceneProps {
  step: number;
  name: string;
  eggTaken: boolean;
  timer: number | null;
  onEgg?: () => void;
  still?: boolean;
}

/** The camera for the kitchen: a 120 × 120 room, 92 tall, floating in a 480 × 400 frame. */
const CAM = { k: 1.75, ox: 240, oy: 166 };
const at = (x: number, y: number, z: number) => project(CAM, x, y, z);

const ROOM = 120;
const WALL = 92;
/** The island everything happens on. */
const ISLAND = { x: 24, y: 26, w: 76, d: 68, h: 36 };
const TOP = ISLAND.h;
const CX = ISLAND.x + ISLAND.w / 2;
const CY = ISLAND.y + ISLAND.d / 2;

/** Walls take their colour from the time of day (--_wall), set on the scene by step. */
const WALL_MAT: Material = {
  top: 'var(--bbm-color-paper)',
  hi: 'var(--_wall)',
  side: 'var(--_wall)',
  shade: 'var(--_wall-shade)',
  line: 'var(--_wall-line)',
};
const FLOOR_MAT: Material = { ...M.cream, top: 'var(--bbm-color-beige-100)' };
const ISLAND_MAT: Material = { ...M.pink, top: 'var(--bbm-color-paper)', hi: 'var(--bbm-color-paper)' };

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

  const sh = standHeight(27);
  const [bx, by] = at(CX, CY, TOP + 16);
  const [ex, ey] = at(ISLAND.x + ISLAND.w - 12, ISLAND.y + ISLAND.d - 8, TOP + 5);
  const [lx, ly] = at(CX, CY, 104);
  const glow = [
    at(ISLAND.x + 6, ISLAND.y + ISLAND.d - 6, TOP),
    at(ISLAND.x + ISLAND.w - 6, ISLAND.y + ISLAND.d - 6, TOP),
    at(ISLAND.x + ISLAND.w - 6, ISLAND.y + 6, TOP),
  ];
  const [tagX, tagY] = at(CX + 23, CY + 23, TOP + 18);
  const [hx, hy] = at(CX, CY, TOP + 52);

  return (
    <div className={classes} data-step={step}>
      <IsoScene width={480} height={400} camera={CAM} label={s.scene} assemble={false} className="bake-scene__svg">
        <defs>
          <pattern id={`${id}-tiles`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0v10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <clipPath id={`${id}-sky`}>
            <rect x="26" y="14" width="58" height="40" rx="3" />
          </clipPath>
        </defs>

        {/* The room: floor, two walls, the window and the shelf */}
        <Box x={0} y={0} z={-8} w={ROOM} d={ROOM} h={8} r={2} mat={FLOOR_MAT} shadow={false}>
          <Face face="top" at={[0, 0, 0]}>
            {Array.from({ length: 144 }, (_, i) => {
              const cx = i % 12;
              const cy = Math.floor(i / 12);
              return (cx + cy) % 2 ? (
                <rect key={i} x={cx * 10} y={cy * 10} width="10" height="10" className="bk-check" />
              ) : null;
            })}
          </Face>
        </Box>
        <Box x={-6} y={0} z={-8} w={6} d={ROOM} h={WALL + 8} r={0.6} mat={WALL_MAT} shadow={false}>
          <Face face="right" at={[0, ROOM, WALL]}>
            <rect width={ROOM} height={WALL} fill={`url(#${id}-tiles)`} className="bk-tiles" />
            {/* The window, and the sky behind it moving from sunrise to night */}
            <g clipPath={`url(#${id}-sky)`}>
              <rect className="bk-sky" x="26" y="14" width="58" height="40" />
              <g className="bk-stars">
                <circle cx="34" cy="20" r="0.8" />
                <circle cx="48" cy="28" r="0.6" />
                <circle cx="66" cy="19" r="0.8" />
                <circle cx="78" cy="30" r="0.6" />
                <circle cx="40" cy="34" r="0.6" />
              </g>
              <circle className="bk-sun" cx="32" cy="50" r="5.5" />
              <g className="bk-moon">
                <circle cx="70" cy="24" r="5" />
                <circle cx="72.6" cy="22" r="4.4" className="bk-sky-cut" />
              </g>
              <path className="bk-roofs" d="M26 54v-8h9v-4h8v4h6v-7h11v7h5v-5h9v5h10v8z" />
            </g>
            <rect x="26" y="14" width="58" height="40" rx="3" className="bk-frame" />
            <path d="M55 14v40M26 34h58" className="bk-frame" />
            <rect x="23" y="54" width="64" height="3.4" rx="1" className="bk-sill" />
            {/* Mom's tulsi on the sill */}
            <path d="M71 47c-2-4 0-8 3-8 0 3 0 5-3 8zm3 0c1-4 4-6 6-5-1 3-3 4-6 5z" className="bk-leaf" />
            <path d="M68 47h12l-1.5 7h-9z" className="bk-pot" />
          </Face>
        </Box>
        <Box x={0} y={-6} z={-8} w={ROOM} d={6} h={WALL + 8} r={0.6} mat={WALL_MAT} shadow={false}>
          <Face face="left" at={[0, 0, WALL]}>
            <rect width={ROOM} height={WALL} fill={`url(#${id}-tiles)`} className="bk-tiles" />
            {/* A framed heart over the shelf */}
            <rect x="14" y="16" width="20" height="24" rx="1" className="bk-picture" />
            <rect x="17" y="19" width="14" height="18" className="bk-picture__in" />
            <path d="M24 24c-2.5-3-6 0-3 3l3 3 3-3c3-3-.5-6-3-3z" className="bk-picture__heart" />
          </Face>
        </Box>
        {/* The shelf and Mom's jars */}
        <Box x={42} y={0} z={58} w={64} d={10} h={2.4} r={0.8} mat={M.paper} shadow={0.12} />
        <Cyl x={52} y={5} z={60.4} r={4.4} h={11} mat={M.blue} shadow={false} />
        <Cyl x={52} y={5} z={71.4} r={4.8} h={2.4} mat={M.cocoa} shadow={false} />
        <Cyl x={66} y={5} z={60.4} r={5} h={14} mat={M.blue} shadow={false} />
        <Cyl x={66} y={5} z={74.4} r={5.4} h={2.4} mat={M.cherry} shadow={false} />
        <Cyl x={80} y={5} z={60.4} r={3.8} h={9} mat={M.blue} shadow={false} />
        <Cyl x={80} y={5} z={69.4} r={4.2} h={2.2} mat={M.gold} shadow={false} />
        <Cyl x={95} y={5} z={60.4} r={4} h={7} mat={M.paper} shadow={false} />

        {/* The island, in candy stripes, with a marble top */}
        <Box
          x={ISLAND.x}
          y={ISLAND.y}
          z={0}
          w={ISLAND.w}
          d={ISLAND.d}
          h={ISLAND.h - 4}
          r={3}
          mat={ISLAND_MAT}
          shadow={0.25}
        >
          <Face face="left" at={[ISLAND.x + 3, ISLAND.y + ISLAND.d, ISLAND.h - 4]}>
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={i} x={i * 7 + 1} width="3.5" height={ISLAND.h - 4} className="bk-stripe" />
            ))}
          </Face>
          <Face face="right" at={[ISLAND.x + ISLAND.w, ISLAND.y + ISLAND.d - 3, ISLAND.h - 4]}>
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x={i * 7 + 1} width="3.5" height={ISLAND.h - 4} className="bk-stripe bk-stripe--shade" />
            ))}
          </Face>
        </Box>
        <Box
          x={ISLAND.x - 1.5}
          y={ISLAND.y - 1.5}
          z={ISLAND.h - 4}
          w={ISLAND.w + 3}
          d={ISLAND.d + 3}
          h={4}
          r={3.5}
          mat={M.paper}
          shadow={false}
        />

        {/* Night falls over the room; the lamp's light falls on the island */}
        <rect className="bk-dim" width="480" height="400" />
        <path
          className="bk-glow"
          d={`M${lx - 8} ${ly}L${glow[0]![0]} ${glow[0]![1]}L${glow[1]![0]} ${glow[1]![1]}L${glow[2]![0]} ${glow[2]![1]}L${lx + 8} ${ly}Z`}
        />

        {/* Steps 1–3: the bowl, the flour, the egg and the whisk */}
        <g className="bk-piece bk-piece--bowl">
          <Bowl x={CX} y={CY} z={TOP} r={25} h={16}>
            <circle cx="25" cy="25" r="20" className="bk-flour" />
            <circle cx="25" cy="25" r="22" className="bk-batter" />
            <path className="bk-swirl" d="M25 25m-14 0a14 14 0 1 0 28 0a10 10 0 1 0-20 0a6 6 0 1 0 12 0" />
          </Bowl>
          <g className="bk-cup">
            <Cyl x={CX + 30} y={CY - 26} z={TOP + 38} r={6} rTop={7} h={10} mat={M.paper} shadow={false} />
            <Cyl x={CX + 30} y={CY - 26} z={TOP + 48} r={6.4} h={0} mat={M.cream} shadow={false} />
          </g>
          <path
            className="bk-stream"
            d={`M${at(CX + 24, CY - 22, TOP + 44).join(' ')}L${at(CX + 4, CY - 2, TOP + 18).join(' ')}`}
          />
          <g className="bk-whisk" style={{ transformOrigin: `${bx + 40}px ${by - 70}px` }}>
            <path d={`M${bx + 4} ${by - 6}L${bx + 46} ${by - 78}`} className="bk-handle" />
            <path
              d={`M${bx + 4} ${by - 6}c-24-2-32 18-15 21s24-10 15-21zm0 0c-8 7-10 22 1.5 21s10-15-1.5-21z`}
              className="bk-wires"
            />
          </g>
          <g className="bk-egg" onClick={onEgg}>
            <Sphere
              x={ISLAND.x + ISLAND.w - 12}
              y={ISLAND.y + ISLAND.d - 8}
              z={TOP + 5}
              r={4}
              stretch={1.3}
              mat={M.egg}
              shadow
            />
          </g>
          <g transform={`translate(${ex - 392} ${ey - 279})`}>
            <g className="bk-hand">
              <rect x="438" y="252" width="60" height="44" rx="8" className="bk-sleeve" />
              <rect x="434" y="254" width="5" height="40" rx="2" className="bk-bangle" />
              <rect x="428" y="255" width="5" height="38" rx="2" className="bk-bangle" />
              <ellipse cx="410" cy="274" rx="20" ry="17" className="bk-skin" />
              <ellipse cx="396" cy="263" rx="10" ry="6" className="bk-skin" />
              <ellipse cx="393" cy="273" rx="10" ry="6" className="bk-skin" />
              <ellipse cx="394" cy="291" rx="10" ry="5.5" className="bk-skin" />
            </g>
          </g>
        </g>

        {/* Step 4: the oven */}
        <g className="bk-piece bk-piece--oven">
          <Oven
            x={CX - 28}
            y={CY - 22}
            z={TOP}
            w={56}
            d={42}
            h={46}
            timer={timer === 0 || still ? 'DING!' : `0:0${timer ?? BAKE_SECONDS}`}
          >
            <rect className="bk-rise" x="18" y="34" width="20" height="8" rx="3" />
            <rect x="15" y="41" width="26" height="4" rx="1" className="bk-tin" />
          </Oven>
          <g className="bk-heat">
            {[-18, 0, 18].map((dx) => (
              <path key={dx} d={`M${hx + dx} ${hy}q-6-8 0-16t0-16`} />
            ))}
          </g>
          <g className="bk-ding">
            <Sparkle at={[CX + 34, CY - 30, TOP + 56]} size={9} />
            <Sparkle at={[CX + 44, CY - 18, TOP + 40]} size={6} tone="paper" />
          </g>
        </g>

        {/* Step 5: the cake on its stand, and a name piped across the top */}
        <g className="bk-piece bk-piece--cake">
          <Stand x={CX} y={CY} z={TOP} r={27} />
          <LayerCake
            x={CX}
            y={CY}
            z={TOP + sh}
            r={21}
            h={20}
            coat={M.pink}
            drip={false}
            piping={M.paper}
            pearls={M.paper}
            cherries={0}
            top={
              <text
                key={`${label}-${step === 4 || still}`}
                x="21"
                y="25"
                textAnchor="middle"
                className="bk-name-text"
                textLength={label.length > 9 ? 34 : undefined}
                lengthAdjust="spacingAndGlyphs"
              >
                {label}
              </text>
            }
          />
          {[200, 225, 250].map((a) => (
            <Cherry
              key={a}
              x={CX + Math.cos((a * Math.PI) / 180) * 14}
              y={CY + Math.sin((a * Math.PI) / 180) * 14}
              z={TOP + sh + 22.6}
            />
          ))}
        </g>

        {/* Step 6: the box, the lid, the ribbon and the tag */}
        <g className="bk-piece bk-piece--box">
          <CakeBox
            x={CX - 22}
            y={CY - 22}
            z={TOP}
            w={44}
            d={44}
            h={30}
            lidClassName="bk-lid"
            ribbonClassName="bk-ribbon"
          />
          <g transform={`translate(${tagX} ${tagY}) rotate(8)`}>
            <g className="bk-tag">
              <path d="M-8 -4q14 -2 22 4" className="bk-tag__string" />
              <path d="M14 -6h64a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5h-64l-9-14z" className="bk-tag__card" />
              <circle cx="14" cy="8" r="2" className="bk-tag__hole" />
              <text
                x="48"
                y="13"
                className="bk-tag-text"
                textAnchor="middle"
                textLength={tag.length > 9 ? 56 : undefined}
                lengthAdjust="spacingAndGlyphs"
              >
                {tag}
              </text>
            </g>
          </g>
        </g>

        {/* The pendant lamp over the island */}
        <path d={`M${lx} 0V${ly - 12}`} className="bk-cord" />
        <path d={`M${lx - 14} ${ly + 2}l6-14h16l6 14z`} className="bk-shade" />
        <ellipse cx={lx} cy={ly + 2} rx="14" ry="3.4" className="bk-shade-rim" />
        <circle className="bk-bulb" cx={lx} cy={ly + 4} r="4" />
      </IsoScene>
    </div>
  );
}
