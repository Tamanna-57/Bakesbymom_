// The engraving kit: the site's illustrations are drawn like an old Milanese pasticceria label, in fine cocoa
// ink with contour hatching for shade, soft colour washes underneath and gold foil for ribbons, bands and seals.
// Every drawing is a plain SVG built from these pieces, so they share one hand and one light (from the upper left).
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
  type SVGAttributes,
} from 'react';
import './engrave.css';

interface Ctx {
  /** Prefix for ids inside this drawing (patterns, gradients, clips). */
  sid: string;
}

const EngraveContext = createContext<Ctx>({ sid: 'eg' });
export const useEngrave = () => useContext(EngraveContext);

export function useLocalId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

/** Washes: the soft colour laid under the ink. */
export const WASH = {
  paper: 'var(--bbm-color-paper)',
  cream: 'var(--bbm-color-beige-50)',
  biscuit: 'var(--bbm-color-beige-100)',
  sand: 'var(--bbm-color-beige-200)',
  pink: 'var(--bbm-color-pink-100)',
  rose: 'var(--bbm-color-pink-200)',
  blush: 'var(--bbm-color-pink-300)',
  blue: 'var(--bbm-color-blue-100)',
  sky: 'var(--bbm-color-blue-200)',
  cherry: 'var(--bbm-color-cherry-600)',
  wine: 'var(--bbm-color-cherry-800)',
  cocoa: 'var(--bbm-color-brown-500)',
  chocolate: 'var(--bbm-color-brown-700)',
  caramel: 'var(--bbm-color-brown-300)',
  sponge: 'var(--bbm-color-butter-200)',
  butter: 'var(--bbm-color-butter-100)',
  pistachio: 'var(--bbm-color-pistachio-200)',
  leaf: 'var(--bbm-color-pistachio-400)',
  glass: 'var(--bbm-color-blue-50)',
} as const;

export type Wash = keyof typeof WASH;

export interface EngravingProps extends Omit<SVGAttributes<SVGSVGElement>, 'viewBox'> {
  width: number;
  height: number;
  /** What the drawing shows, for screen readers. Leave out when it's decorative. */
  label?: string;
  /** Draw the ink in when the drawing scrolls into view. */
  draw?: boolean;
  /** How shade is printed: fine line hatching, or a halftone dot screen (like the board's stippled cherries). */
  screen?: 'hatch' | 'halftone';
  children: ReactNode;
}

/** One engraving: the SVG, its hatch patterns and the gold foil. */
export function Engraving({
  width,
  height,
  label,
  draw = true,
  screen = 'hatch',
  className,
  children,
  ...rest
}: EngravingProps) {
  const sid = `eg${useLocalId()}`;
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !draw) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // Hidden ink is only hidden once this has run, so the drawing never stays blank without JavaScript.
    svg.dataset.armed = '';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          svg.dataset.in = '';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [draw]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={['eg', screen === 'halftone' && 'eg--halftone', className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <defs>
        {/* Shade: three densities of diagonal hatching (or, in a halftone screen, dots that grow with the
            density), a cross-hatch for the deepest shade */}
        {(
          [
            ['h1', 4.2, 45, 0.55],
            ['h2', 2.8, 45, 0.85],
            ['h3', 2, 45, 1.05],
            ['v1', 3.4, 90, 0.7],
            ['v2', 2.2, 90, 0.95],
            ['r1', 3.2, -45, 0.7],
          ] as const
        ).map(([name, gap, angle, dot]) => (
          <pattern
            key={name}
            id={`${sid}-${name}`}
            width={screen === 'halftone' ? 3.2 : gap}
            height={screen === 'halftone' ? 3.2 : gap}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${screen === 'halftone' ? 45 : angle})`}
          >
            {screen === 'halftone' ? (
              <circle cx="1.6" cy="1.6" r={dot} className="eg-stipple" />
            ) : (
              <line x1="0" y1="0" x2="0" y2={gap} className="eg-hatchline" />
            )}
          </pattern>
        ))}
        <pattern id={`${sid}-x`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          {screen === 'halftone' ? (
            <circle cx="1.5" cy="1.5" r="1.25" className="eg-stipple" />
          ) : (
            <path d="M0 0V3M0 0H3" className="eg-hatchline" />
          )}
        </pattern>
        <pattern id={`${sid}-dots`} width="3.4" height="3.4" patternUnits="userSpaceOnUse">
          <circle cx="1.7" cy="1.7" r="0.45" className="eg-stipple" />
        </pattern>
        {/* Gold foil: a bright band catching the light */}
        <linearGradient id={`${sid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9d6a0" />
          <stop offset="0.28" stopColor="#c9a659" />
          <stop offset="0.5" stopColor="#f4e9c8" />
          <stop offset="0.72" stopColor="#b08d43" />
          <stop offset="1" stopColor="#dcc078" />
        </linearGradient>
        <radialGradient id={`${sid}-glow`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <EngraveContext.Provider value={{ sid }}>{children}</EngraveContext.Provider>
    </svg>
  );
}

/** A pattern or gradient fill from this drawing's defs. */
export function useFill() {
  const { sid } = useEngrave();
  return {
    hatch: (density: 1 | 2 | 3 = 1) => `url(#${sid}-h${density})`,
    vertical: (density: 1 | 2 = 1) => `url(#${sid}-v${density})`,
    reverse: () => `url(#${sid}-r1)`,
    cross: () => `url(#${sid}-x)`,
    dots: () => `url(#${sid}-dots)`,
    gold: () => `url(#${sid}-gold)`,
    glow: () => `url(#${sid}-glow)`,
  };
}

/* Ink and wash ------------------------------------------------------------- */

interface InkProps {
  d: string;
  /** Line weight: hairline, fine (default), bold (the shadow side of an outline). */
  weight?: 'hair' | 'fine' | 'bold';
  /** The colour wash under the ink. */
  wash?: Wash | 'gold' | 'none';
  className?: string;
  style?: CSSProperties;
}

/** A shape: a colour wash, outlined in ink. The outline draws itself in. */
export function Ink({ d, weight = 'fine', wash = 'none', className, style }: InkProps) {
  const fill = useFill();
  const fillValue = wash === 'none' ? 'none' : wash === 'gold' ? fill.gold() : WASH[wash];
  return (
    <g className={className} style={style}>
      {wash !== 'none' && <path d={d} style={{ fill: fillValue }} className="eg-wash" />}
      <path d={d} pathLength={1} className={`eg-ink eg-ink--${weight}`} />
    </g>
  );
}

/** Hatching laid over a region (a shadow), clipped to that region. */
export function Shade({
  d,
  density = 1,
  kind = 'diag',
  opacity,
}: {
  d: string;
  density?: 1 | 2 | 3;
  kind?: 'diag' | 'vertical' | 'cross' | 'reverse' | 'dots';
  opacity?: number;
}) {
  const fill = useFill();
  const value =
    kind === 'vertical'
      ? fill.vertical(density === 1 ? 1 : 2)
      : kind === 'cross'
        ? fill.cross()
        : kind === 'reverse'
          ? fill.reverse()
          : kind === 'dots'
            ? fill.dots()
            : fill.hatch(density);
  return (
    <path
      d={d}
      style={{ fill: value, ...(opacity !== undefined && { '--shade-o': opacity }) } as CSSProperties}
      className="eg-shade"
    />
  );
}

/** Plain lines in ink (details, contours), drawn in with the outlines. */
export function Lines({
  d,
  weight = 'hair',
  className,
}: {
  d: string;
  weight?: 'hair' | 'fine' | 'bold';
  className?: string;
}) {
  return <path d={d} pathLength={1} className={['eg-ink', `eg-ink--${weight}`, className].filter(Boolean).join(' ')} />;
}

/* Geometry helpers --------------------------------------------------------- */

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A closed ellipse path. */
export const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r2(cx - rx)} ${r2(cy)}a${r2(rx)} ${r2(ry)} 0 1 0 ${r2(rx * 2)} 0a${r2(rx)} ${r2(ry)} 0 1 0 ${r2(-rx * 2)} 0z`;

/** The front half of an ellipse, left to right. */
export const frontArc = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r2(cx - rx)} ${r2(cy)}a${r2(rx)} ${r2(ry)} 0 0 0 ${r2(rx * 2)} 0`;

/**
 * The side of a cylinder seen slightly from above: from the top rim (at `top`) down to the bottom rim, with
 * elliptical ends of depth `ry`. `rxBottom` tapers it (a cupcake case, a cake-stand foot).
 */
export function cylinderSide(cx: number, top: number, bottom: number, rx: number, ry: number, rxBottom = rx) {
  return `M${r2(cx - rx)} ${r2(top)}L${r2(cx - rxBottom)} ${r2(bottom)}a${r2(rxBottom)} ${r2(ry * (rxBottom / rx))} 0 0 0 ${r2(rxBottom * 2)} 0L${r2(cx + rx)} ${r2(top)}a${r2(rx)} ${r2(ry)} 0 0 1 ${r2(-rx * 2)} 0z`;
}

/**
 * Contour hatching for a cylinder's shaded side: vertical strokes that crowd together towards the right edge,
 * each following the curve of the rim. `from` is where the shade starts (0 = the middle, 1 = the right edge).
 */
export function contourHatch(
  cx: number,
  top: number,
  bottom: number,
  rx: number,
  ry: number,
  from = 0.35,
  count = 9,
  rxBottom = rx,
) {
  const out: string[] = [];
  const a0 = Math.asin(Math.min(1, Math.max(-1, from)));
  for (let i = 0; i < count; i++) {
    const a = a0 + ((Math.PI / 2 - a0) * (i + 0.5)) / count;
    const s = Math.sin(a);
    const xt = cx + rx * s;
    const xb = cx + rxBottom * s;
    const yt = top + ry * Math.cos(a);
    const yb = bottom + ry * (rxBottom / rx) * Math.cos(a);
    // Strokes on the lit part of the shade stop short, like a burin lifting off
    const lift = i < count * 0.35 ? (bottom - top) * 0.28 : 0;
    out.push(`M${r2(xt + (xb - xt) * (lift / (bottom - top)))} ${r2(yt + lift)}L${r2(xb)} ${r2(yb)}`);
  }
  // A few strokes on the far left rim, where the form turns away
  for (let i = 0; i < 2; i++) {
    const a = -Math.PI / 2 + (i + 0.6) * 0.12;
    const s = Math.sin(a);
    out.push(
      `M${r2(cx + rx * s)} ${r2(top + ry * Math.cos(a) + (bottom - top) * 0.45)}L${r2(cx + rxBottom * s)} ${r2(bottom + ry * Math.cos(a))}`,
    );
  }
  return out.join('');
}

/** Rings of hatching round the underside of a ball (a cherry, a pearl). */
export function ballHatch(cx: number, cy: number, r: number, count = 4) {
  return Array.from({ length: count }, (_, i) => {
    const rr = r * (0.55 + (i * 0.4) / count);
    return `M${r2(cx + rr * 0.95)} ${r2(cy - rr * 0.1)}A${r2(rr)} ${r2(rr)} 0 0 1 ${r2(cx - rr * 0.2)} ${r2(cy + rr * 0.97)}`;
  }).join('');
}

/* Motion wrappers ------------------------------------------------------------ */

/** Order in which a group's ink draws in (0 first). */
export function Step({ i = 0, children, className }: { i?: number; children: ReactNode; className?: string }) {
  return (
    <g className={['eg-step', className].filter(Boolean).join(' ')} style={{ '--i': i } as CSSProperties}>
      {children}
    </g>
  );
}

/** Drifts gently: steam, a hovering sparkle. */
export function Drift({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <g className="eg-drift" style={{ '--delay': `${delay}s` } as CSSProperties}>
      {children}
    </g>
  );
}
