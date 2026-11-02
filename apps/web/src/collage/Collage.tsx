// The collage kit, after the board pins: real bakes cut out as die-cut stickers, halftone prints in cherry ink
// (SugarLace's stippled cherries), scalloped badges (Nectar's price stickers), washi tape, a gift tag on a
// string, photos in postage-stamp frames and Mom's handwritten notes. A collage sticks its pieces down one at a
// time when it scrolls into view. The art itself comes from scripts/collage.py.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import './collage.css';

/** Where a piece sits in its collage, in percent of the collage's width and height. */
export interface Place {
  x: number;
  y: number;
  /** Width, in percent of the collage. */
  w: number;
  /** Turn, in degrees. */
  r?: number;
  /** Stacking: higher is on top. */
  z?: number;
  /** Order it sticks down in (0 first). */
  i?: number;
}

const placeStyle = ({ x, y, w, r = 0, z = 1, i = 0 }: Place, extra?: CSSProperties): CSSProperties =>
  ({
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    zIndex: z,
    '--r': `${r}deg`,
    '--i': i,
    ...extra,
  }) as CSSProperties;

export interface CollageProps {
  /** Width / height. */
  ratio?: number;
  /** What the collage shows, for screen readers. */
  label?: string;
  className?: string;
  children: ReactNode;
}

/** A board the pieces are stuck onto. */
export function Collage({ ratio = 1, label, className, children }: CollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // Pieces only hide once this has run, so the collage never stays empty without JavaScript.
    el.dataset.armed = '';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.in = '';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={['collage', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: String(ratio) }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </div>
  );
}

/** A bake, cut out as a die-cut sticker (from public/collage). */
export function Sticker({ src, place, float = false }: { src: string; place: Place; float?: boolean }) {
  return (
    <div
      className={['collage__piece collage__sticker', float && 'collage__piece--float'].filter(Boolean).join(' ')}
      style={placeStyle(place)}
    >
      <img src={`/collage/${src}.webp`} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

/** A halftone print, straight onto the page with no border. */
export function Halftone({ src, place, opacity = 1 }: { src: string; place: Place; opacity?: number }) {
  return (
    <div className="collage__piece collage__halftone" style={placeStyle(place, { opacity })}>
      <img src={`/collage/${src}.webp`} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

/** A photo in a postage-stamp frame, with a strip of tape across the top. */
export function Stamp({
  src,
  place,
  tape = true,
  caption,
}: {
  src: string;
  place: Place;
  tape?: boolean;
  caption?: string;
}) {
  return (
    <div className="collage__piece collage__stamp" style={placeStyle(place)}>
      <div className="collage__stamp-paper">
        <img src={src} alt="" loading="lazy" decoding="async" />
        {caption && <span className="collage__stamp-caption">{caption}</span>}
      </div>
      {tape && <span className="collage__tape" />}
    </div>
  );
}

/** A scalloped badge with a big figure and a small line under it (Nectar's price stickers). */
export function Badge({
  place,
  value,
  label,
  tone = 'cherry',
}: {
  place: Place;
  value: string;
  label: string;
  tone?: 'cherry' | 'pink' | 'butter' | 'cocoa';
}) {
  return (
    <div className={`collage__piece collage__badge collage__badge--${tone}`} style={placeStyle(place)}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d={scallopCircle(50, 50, 46, 14)} />
      </svg>
      <span className="collage__badge-text">
        <strong>{value}</strong>
        <small>{label}</small>
      </span>
    </div>
  );
}

/** A gift tag on a curled string, in Mom's hand. */
export function GiftTag({ place, children }: { place: Place; children: ReactNode }) {
  return (
    <div className="collage__piece collage__tag" style={placeStyle(place)}>
      <svg className="collage__tag-string" viewBox="0 0 60 40" aria-hidden="true">
        <path d="M2 4c18 2 10 22 26 20s8-16 30-6" />
      </svg>
      <span className="collage__tag-card">{children}</span>
    </div>
  );
}

/** A handwritten note with a drawn arrow pointing at something. */
export function Note({
  place,
  children,
  arrow = 'left',
}: {
  place: Place;
  children: ReactNode;
  arrow?: 'left' | 'right' | 'down';
}) {
  return (
    <div className={`collage__piece collage__note collage__note--${arrow}`} style={placeStyle(place)}>
      <span>{children}</span>
      <svg className="collage__arrow" viewBox="0 0 80 50" aria-hidden="true">
        <path d="M76 6C60 4 38 10 30 26s-14 18-24 18" />
        <path d="M6 44l9-9M6 44l12 2" />
      </svg>
    </div>
  );
}

/** A strip of washi tape on its own. */
export function Tape({ place, tone = 'pink' }: { place: Place; tone?: 'pink' | 'butter' | 'blue' }) {
  return (
    <span
      className={`collage__piece collage__tape collage__tape--loose collage__tape--${tone}`}
      style={placeStyle(place)}
    />
  );
}

/** A chat bubble, for the message step. */
export function Bubble({ place, from, children }: { place: Place; from: 'you' | 'mom'; children: ReactNode }) {
  return (
    <div className={`collage__piece collage__bubble collage__bubble--${from}`} style={placeStyle(place)}>
      {children}
    </div>
  );
}

/** A circle with scalloped edge, as an SVG path. */
function scallopCircle(cx: number, cy: number, r: number, bumps: number) {
  const pts: string[] = [];
  for (let i = 0; i < bumps; i++) {
    const a0 = (i / bumps) * Math.PI * 2;
    const a1 = ((i + 1) / bumps) * Math.PI * 2;
    const am = (a0 + a1) / 2;
    const x0 = cx + r * 0.9 * Math.cos(a0);
    const y0 = cy + r * 0.9 * Math.sin(a0);
    const xm = cx + r * 1.08 * Math.cos(am);
    const ym = cy + r * 1.08 * Math.sin(am);
    const x1 = cx + r * 0.9 * Math.cos(a1);
    const y1 = cy + r * 0.9 * Math.sin(a1);
    pts.push(
      `${i ? '' : `M${x0.toFixed(2)} ${y0.toFixed(2)}`}Q${xm.toFixed(2)} ${ym.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    );
  }
  return `${pts.join('')}Z`;
}
