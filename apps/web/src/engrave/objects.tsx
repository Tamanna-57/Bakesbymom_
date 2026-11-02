// Engraved bakery objects and ornaments. Coordinates are on the page (y down). Every object is lit from the upper
// left: washes on the lit side, contour hatching gathering on the right and underneath.
import type { ReactNode } from 'react';
import {
  Ink,
  Lines,
  Shade,
  WASH,
  ballHatch,
  contourHatch,
  cylinderSide,
  ellipse,
  frontArc,
  Drift,
  useFill,
  type Wash,
} from './kit';

const r2 = (n: number) => Math.round(n * 100) / 100;
const RY = 0.26;

/* Small things ----------------------------------------------------------------- */

/** A glossy cherry with its stem (and a leaf, if asked). */
export function Cherry({
  x,
  y,
  r = 5,
  leaf = false,
  stem = 1,
}: {
  x: number;
  y: number;
  r?: number;
  leaf?: boolean;
  stem?: 1 | -1;
}) {
  return (
    <g>
      <Lines d={`M${x} ${y - r * 0.8}q${stem * r * 0.5} ${-r * 1.4} ${stem * r * 1.5} ${-r * 2.1}`} weight="fine" />
      {leaf && (
        <Ink
          d={`M${x + stem * r * 1.2} ${y - r * 2.6}q${stem * r * 1.6} ${-r * 1.2} ${stem * r * 2.8} ${-r * 0.2}q${-stem * r * 1.4} ${r * 1.1} ${-stem * r * 2.8} ${r * 0.2}z`}
          wash="leaf"
          weight="hair"
        />
      )}
      <Ink d={ellipse(x, y, r, r)} wash="cherry" />
      <Lines d={ballHatch(x, y, r * 0.95, 3)} className="eg-contour" />
      <ellipse
        cx={x - r * 0.35}
        cy={y - r * 0.4}
        rx={r * 0.28}
        ry={r * 0.18}
        fill="#fff"
        opacity="0.8"
        className="eg-fade"
      />
    </g>
  );
}

/** A row of pearls along the front of a rim. */
export function Pearls({
  cx,
  cy,
  rx,
  ry,
  count = 12,
  size = 1.8,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  count?: number;
  size?: number;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const a = Math.PI * (0.06 + (0.88 * i) / (count - 1));
        const x = cx - rx * Math.cos(a);
        const y = cy + ry * Math.sin(a);
        return (
          <g key={i}>
            <Ink d={ellipse(x, y, size, size)} wash="paper" weight="hair" />
          </g>
        );
      })}
    </g>
  );
}

/** An engraved sparkle: four long rays and four short. */
export function Star({ x, y, s = 8, gold = true }: { x: number; y: number; s?: number; gold?: boolean }) {
  const fill = useFill();
  const d = `M${x} ${y - s}Q${x + s * 0.12} ${y - s * 0.12} ${x + s} ${y}Q${x + s * 0.12} ${y + s * 0.12} ${x} ${y + s}Q${x - s * 0.12} ${y + s * 0.12} ${x - s} ${y}Q${x - s * 0.12} ${y - s * 0.12} ${x} ${y - s}z`;
  return (
    <g className="eg-twinkle">
      <path d={d} style={{ fill: gold ? fill.gold() : WASH.paper }} className="eg-fade" />
      <Lines
        d={`${d}M${x - s * 0.45} ${y - s * 0.45}L${x - s * 0.22} ${y - s * 0.22}M${x + s * 0.45} ${y - s * 0.45}L${x + s * 0.22} ${y - s * 0.22}M${x - s * 0.45} ${y + s * 0.45}L${x - s * 0.22} ${y + s * 0.22}M${x + s * 0.45} ${y + s * 0.45}L${x + s * 0.22} ${y + s * 0.22}`}
      />
    </g>
  );
}

/** A ribbon bow, centred on its knot. */
export function Bow({ x, y, s = 1, wash = 'cherry' }: { x: number; y: number; s?: number; wash?: Wash | 'gold' }) {
  const k = (n: number) => r2(n * s);
  return (
    <g>
      <Ink
        d={`M${x - k(2)} ${y + k(2)}l${-k(9)} ${k(16)}l${k(4)} -${k(1)}l${k(3)} ${k(4)}l${k(5)} ${-k(18)}z`}
        wash={wash}
        weight="hair"
      />
      <Ink
        d={`M${x + k(2)} ${y + k(2)}l${k(9)} ${k(16)}l${-k(4)} -${k(1)}l${-k(3)} ${k(4)}l${-k(5)} ${-k(18)}z`}
        wash={wash}
        weight="hair"
      />
      <Ink
        d={`M${x} ${y}C${x - k(6)} ${y - k(12)} ${x - k(20)} ${y - k(12)} ${x - k(19)} ${y - k(3)}C${x - k(18)} ${y + k(4)} ${x - k(7)} ${y + k(3)} ${x} ${y}z`}
        wash={wash}
      />
      <Ink
        d={`M${x} ${y}C${x + k(6)} ${y - k(12)} ${x + k(20)} ${y - k(12)} ${x + k(19)} ${y - k(3)}C${x + k(18)} ${y + k(4)} ${x + k(7)} ${y + k(3)} ${x} ${y}z`}
        wash={wash}
      />
      <Lines
        d={`M${x - k(4)} ${y - k(3)}C${x - k(9)} ${y - k(8)} ${x - k(15)} ${y - k(8)} ${x - k(16)} ${y - k(3)}M${x + k(4)} ${y - k(3)}C${x + k(9)} ${y - k(8)} ${x + k(15)} ${y - k(8)} ${x + k(16)} ${y - k(3)}`}
      />
      <Ink d={ellipse(x, y, k(3.4), k(3))} wash={wash} />
    </g>
  );
}

/* Cakes ---------------------------------------------------------------------- */

/** A footed glass-and-porcelain cake stand. `y` is the top of the plate (where the cake sits). */
export function CakeStand({ cx, y, w, foot = 0.55 }: { cx: number; y: number; w: number; foot?: number }) {
  const rx = w / 2;
  const ry = rx * RY;
  const stem = w * 0.42 * foot;
  const footRx = rx * 0.42;
  const footTop = y + 4 + stem;
  return (
    <g>
      {/* Foot, stem and the scalloped plate */}
      <Ink d={cylinderSide(cx, footTop, footTop + 7, footRx * 0.35, ry * 0.3, footRx)} wash="paper" />
      <Lines
        d={contourHatch(cx, footTop, footTop + 7, footRx * 0.35, ry * 0.3, 0.3, 6, footRx)}
        className="eg-contour"
      />
      <Ink
        d={`M${cx - rx * 0.09} ${y + 4}C${cx - rx * 0.06} ${y + 4 + stem * 0.5} ${cx - rx * 0.16} ${footTop - 2} ${cx - rx * 0.12} ${footTop}H${cx + rx * 0.12}C${cx + rx * 0.16} ${footTop - 2} ${cx + rx * 0.06} ${y + 4 + stem * 0.5} ${cx + rx * 0.09} ${y + 4}z`}
        wash="paper"
      />
      <Lines d={`M${cx + rx * 0.04} ${y + 6}V${footTop - 1}M${cx + rx * 0.07} ${y + 7}V${footTop - 1}`} />
      <Ink d={cylinderSide(cx, y, y + 4, rx, ry)} wash="paper" />
      <Lines d={contourHatch(cx, y, y + 4, rx, ry, 0.4, 10)} className="eg-contour" />
      <Ink d={scallopRim(cx, y + 4, rx, ry)} weight="hair" />
      <Ink d={ellipse(cx, y, rx, ry)} wash="cream" />
    </g>
  );
}

/** Little scallops hanging off the front of a rim. */
function scallopRim(cx: number, cy: number, rx: number, ry: number, count = 14) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const a0 = Math.PI * (i / count);
    const a1 = Math.PI * ((i + 1) / count);
    const x0 = cx - rx * Math.cos(a0);
    const y0 = cy + ry * Math.sin(a0);
    const x1 = cx - rx * Math.cos(a1);
    const y1 = cy + ry * Math.sin(a1);
    d += `M${r2(x0)} ${r2(y0)}Q${r2((x0 + x1) / 2)} ${r2((y0 + y1) / 2 + 3.2)} ${r2(x1)} ${r2(y1)}`;
  }
  return d;
}

export interface CakeProps {
  cx: number;
  /** The centre of the cake's bottom rim. */
  base: number;
  rx: number;
  h: number;
  wash?: Wash;
  topWash?: Wash;
  /** Ganache or icing running down from the top. */
  drip?: Wash | false;
  /** Piped garlands round the side. */
  swags?: boolean;
  pearls?: boolean;
  /** A gold band round the bottom. */
  band?: boolean;
  cherries?: number;
  /** Drawn on the top of the cake (a name), in a box 2rx wide centred on the top. */
  top?: ReactNode;
}

/** A round layer cake, frosted, with garlands, a drip, pearls, a gold band and cherries. */
export function Cake({
  cx,
  base,
  rx,
  h,
  wash = 'pink',
  topWash,
  drip = false,
  swags = true,
  pearls = true,
  band = false,
  cherries = 3,
  top,
}: CakeProps) {
  const ry = rx * RY;
  const t = base - h;
  const fill = useFill();
  return (
    <g>
      <Ink d={cylinderSide(cx, t, base, rx, ry)} wash={wash} weight="fine" />
      <Lines d={contourHatch(cx, t, base, rx, ry, 0.3, 12)} className="eg-contour" />
      {band && (
        <>
          <path
            d={cylinderSide(cx, base - h * 0.16, base, rx + 0.2, ry)}
            style={{ fill: fill.gold() }}
            className="eg-wash"
          />
          <Lines d={`${frontArc(cx, base - h * 0.16, rx + 0.2, ry)}`} weight="hair" />
        </>
      )}
      {drip && <Ink d={dripPath(cx, t, rx, ry, h)} wash={drip} weight="fine" />}
      {swags && <Lines d={swagPath(cx, t + h * (drip ? 0.55 : 0.38), rx, ry)} weight="fine" />}
      {swags &&
        Array.from({ length: 6 }, (_, i) => {
          const a = Math.PI * (0.08 + (0.84 * i) / 5);
          return (
            <Ink
              key={i}
              d={ellipse(cx - rx * Math.cos(a), t + h * (drip ? 0.55 : 0.38) + ry * Math.sin(a) - 1, 2.2, 2.2)}
              wash="paper"
              weight="hair"
            />
          );
        })}
      {pearls && <Pearls cx={cx} cy={base - 1.5} rx={rx} ry={ry} count={Math.round(rx / 3.2)} />}
      <Ink d={ellipse(cx, t, rx, ry)} wash={topWash ?? (drip || wash)} weight="fine" />
      <Lines d={piping(cx, t, rx, ry)} weight="hair" />
      {top && (
        <g transform={`translate(${cx} ${t}) scale(1 ${RY})`} className="eg-fade">
          {top}
        </g>
      )}
      {Array.from({ length: cherries }, (_, i) => {
        const a = Math.PI * (1.15 + (0.7 * i) / Math.max(1, cherries - 1));
        const x = cherries === 1 ? cx : cx + rx * 0.55 * Math.cos(a);
        const y = cherries === 1 ? t - 4 : t + ry * 0.55 * Math.sin(a) - 4;
        return <Cherry key={i} x={x} y={y} r={Math.max(3.2, rx * 0.12)} stem={i % 2 ? 1 : -1} />;
      })}
    </g>
  );
}

/** Garlands of piped icing: U-shaped swags between points round the front. */
function swagPath(cx: number, cy: number, rx: number, ry: number, count = 5) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const a0 = Math.PI * (0.08 + (0.84 * i) / count);
    const a1 = Math.PI * (0.08 + (0.84 * (i + 1)) / count);
    const x0 = cx - rx * Math.cos(a0);
    const y0 = cy + ry * Math.sin(a0);
    const x1 = cx - rx * Math.cos(a1);
    const y1 = cy + ry * Math.sin(a1);
    const sag = 7 + ry * 0.2;
    d += `M${r2(x0)} ${r2(y0)}C${r2(x0 + (x1 - x0) * 0.25)} ${r2(y0 + sag)} ${r2(x0 + (x1 - x0) * 0.75)} ${r2(y1 + sag)} ${r2(x1)} ${r2(y1)}`;
    d += `M${r2(x0 + (x1 - x0) * 0.15)} ${r2(y0 + 2.2)}C${r2(x0 + (x1 - x0) * 0.35)} ${r2(y0 + sag + 2)} ${r2(x0 + (x1 - x0) * 0.65)} ${r2(y1 + sag + 2)} ${r2(x1 - (x1 - x0) * 0.15)} ${r2(y1 + 2.2)}`;
  }
  return d;
}

/** A shell border piped round the top rim. */
function piping(cx: number, cy: number, rx: number, ry: number, count = 22) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const a = Math.PI * (i / (count - 1));
    const x = cx - rx * 0.96 * Math.cos(a);
    const y = cy + ry * 0.96 * Math.sin(a);
    d += `M${r2(x - 1.6)} ${r2(y + 0.6)}q1.6 -2.6 3.2 0`;
  }
  return d;
}

/** Icing running down the front of the cake in drops of different lengths. */
function dripPath(cx: number, t: number, rx: number, ry: number, h: number) {
  const n = 9;
  let d = `M${r2(cx - rx)} ${r2(t)}`;
  for (let i = 0; i <= n; i++) {
    const a = Math.PI * (i / n);
    const x = cx - rx * Math.cos(a);
    const y = t + ry * Math.sin(a);
    const len = [0.18, 0.34, 0.24, 0.46, 0.2, 0.38, 0.26, 0.42, 0.22, 0.16][i]! * h;
    const w = 2.6;
    d += `L${r2(x - w)} ${r2(y + 2)}L${r2(x - w)} ${r2(y + len)}a${w} ${w} 0 0 0 ${w * 2} 0L${r2(x + w)} ${r2(y + 2)}`;
  }
  d += `L${r2(cx + rx)} ${r2(t)}A${rx} ${ry} 0 0 0 ${r2(cx - rx)} ${r2(t)}z`;
  return d;
}

/** A cupcake: a pleated case, a three-roll swirl and a cherry. `base` is the bottom of the case. */
export function Cupcake({
  cx,
  base,
  s = 1,
  frosting = 'rose',
  liner = 'paper',
}: {
  cx: number;
  base: number;
  s?: number;
  frosting?: Wash;
  liner?: Wash;
}) {
  const rt = 15 * s;
  const rb = 10.5 * s;
  const h = 17 * s;
  const ry = rt * RY;
  const top = base - h;
  const pleats = Array.from({ length: 9 }, (_, i) => {
    const f = -0.85 + (1.7 * i) / 8;
    return `M${r2(cx + rt * f)} ${r2(top + ry * Math.sqrt(1 - f * f))}L${r2(cx + rb * f)} ${r2(base + ry * 0.7 * Math.sqrt(1 - f * f))}`;
  }).join('');
  const roll = (y: number, w: number, hh: number) =>
    `M${r2(cx - w)} ${r2(y)}C${r2(cx - w - 3 * s)} ${r2(y - hh)} ${r2(cx + w + 3 * s)} ${r2(y - hh)} ${r2(cx + w)} ${r2(y)}C${r2(cx + w * 0.6)} ${r2(y + hh * 0.45)} ${r2(cx - w * 0.6)} ${r2(y + hh * 0.45)} ${r2(cx - w)} ${r2(y)}z`;
  return (
    <g>
      <Ink d={cylinderSide(cx, top, base, rt, ry, rb)} wash={liner} />
      <Lines d={pleats} />
      <Shade
        d={`M${cx + rt * 0.35} ${top + ry}L${cx + rt} ${top}L${cx + rb} ${base}L${cx + rb * 0.35} ${base + ry * 0.6}z`}
        density={2}
      />
      <Ink d={roll(top + 1 * s, rt + 1 * s, 9 * s)} wash={frosting} />
      <Lines d={`M${cx + rt * 0.2} ${top - 3 * s}q${rt * 0.6} ${1 * s} ${rt * 0.8} ${3.5 * s}`} />
      <Ink d={roll(top - 6 * s, rt * 0.72, 9 * s)} wash={frosting} />
      <Lines d={`M${cx + rt * 0.15} ${top - 10 * s}q${rt * 0.45} ${1 * s} ${rt * 0.58} ${3.4 * s}`} />
      <Ink d={roll(top - 12.5 * s, rt * 0.42, 9 * s)} wash={frosting} />
      <Cherry x={cx + 1 * s} y={top - 20 * s} r={4.2 * s} />
    </g>
  );
}

/* Boxes and blocks ------------------------------------------------------------- */

/** An oblique block: front face, a right side receding up and to the right, and a top. */
export function blockFaces(x: number, y: number, w: number, h: number, d: number) {
  const dx = d * 0.62;
  const dy = -d * 0.42;
  return {
    front: `M${x} ${y}h${w}v${h}h${-w}z`,
    side: `M${x + w} ${y}l${dx} ${dy}v${h}l${-dx} ${-dy}z`,
    top: `M${x} ${y}l${dx} ${dy}h${w}l${-dx} ${-dy}z`,
    dx,
    dy,
  };
}

export interface CakeBoxProps {
  x: number;
  /** The top of the box's front face. */
  y: number;
  w?: number;
  h?: number;
  d?: number;
  wash?: Wash;
  ribbon?: Wash | 'gold';
  bow?: boolean;
  /** The oval label on the front. */
  label?: boolean;
  /** Classes for the lid and the ribbon, so they can be animated on their own. */
  lidClassName?: string;
  ribbonClassName?: string;
}

/** A Bakes by Mom cake box with a lid, tied with ribbon and a bow, and the oval label on the front. */
export function CakeBox({
  x,
  y,
  w = 70,
  h = 52,
  d = 56,
  wash = 'rose',
  ribbon = 'cherry',
  bow = true,
  label = true,
  lidClassName,
  ribbonClassName,
}: CakeBoxProps) {
  const lid = 12;
  const body = blockFaces(x, y + lid - 1, w, h - lid + 1, d);
  const top = blockFaces(x - 2, y, w + 4, lid, d + 2);
  const bw = 8;
  const mid = x + w / 2;
  const fill = useFill();
  const ribbonFill = ribbon === 'gold' ? fill.gold() : WASH[ribbon];
  return (
    <g>
      {/* The box */}
      <Ink d={body.front} wash={wash} weight="fine" />
      <Ink d={body.side} wash="blush" weight="fine" />
      <Shade d={body.side} density={2} />
      <Shade d={`M${x} ${y + h - 10}h${w}v10h${-w}z`} density={1} opacity={0.45} />
      {label && (
        <g>
          <Ink
            d={ellipse(x + w * 0.24, y + lid + (h - lid) / 2, w * 0.15, (h - lid) * 0.24)}
            wash="paper"
            weight="hair"
          />
          <path
            d={ellipse(x + w * 0.24, y + lid + (h - lid) / 2, w * 0.15 - 2, (h - lid) * 0.24 - 2)}
            className="eg-gold-ink"
          />
          <text
            x={x + w * 0.24}
            y={y + lid + (h - lid) / 2 + 3}
            textAnchor="middle"
            className="eg-script eg-fade"
            style={{ fontSize: w * 0.085 }}
          >
            by Mom
          </text>
        </g>
      )}
      {/* Ribbon on the body */}
      <g className={ribbonClassName}>
        <path
          d={`M${mid - bw / 2} ${y + lid}h${bw}v${h - lid}h${-bw}z`}
          style={{ fill: ribbonFill }}
          className="eg-wash"
        />
        <Lines d={`M${mid - bw / 2} ${y + lid}v${h - lid}M${mid + bw / 2} ${y + lid}v${h - lid}`} />
        <path
          d={`M${x + w + body.dx / 2 - 3} ${y + lid + body.dy / 2}l6 ${-4}v${h - lid}l-6 4z`}
          style={{ fill: ribbonFill }}
          className="eg-wash"
        />
      </g>
      {/* The lid */}
      <g className={lidClassName}>
        <Ink d={top.front} wash={wash} weight="fine" />
        <Ink d={top.side} wash="blush" weight="fine" />
        <Shade d={top.side} density={2} />
        <Ink d={top.top} wash="pink" weight="fine" />
        <Lines d={`M${x - 2} ${y + lid}h${w + 4}`} weight="fine" />
        <g className={ribbonClassName}>
          <path d={`M${mid - bw / 2} ${y}h${bw}v${lid}h${-bw}z`} style={{ fill: ribbonFill }} className="eg-wash" />
          {/* Across the top, both ways */}
          <path
            d={`M${mid - bw / 2} ${y}l${top.dx} ${top.dy}h${bw}l${-top.dx} ${-top.dy}z`}
            style={{ fill: ribbonFill }}
            className="eg-wash"
          />
          <path
            d={`M${x - 2 + top.dx / 2} ${y + top.dy / 2}h${w + 4}l${-3.4} ${3}h${-w - 4}z`}
            style={{ fill: ribbonFill }}
            className="eg-wash"
          />
          <Lines d={`M${mid - bw / 2} ${y}l${top.dx} ${top.dy}M${mid + bw / 2} ${y}l${top.dx} ${top.dy}`} />
          {bow && <Bow x={mid + top.dx / 2 + 1} y={y + top.dy / 2} s={w / 70} wash={ribbon} />}
        </g>
      </g>
    </g>
  );
}

/** A brownie: a dark oblique block with a crackled, sugar-dusted top. */
export function Brownie({
  x,
  y,
  w = 26,
  h = 13,
  d = 24,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  d?: number;
}) {
  const f = blockFaces(x, y, w, h, d);
  return (
    <g>
      <Ink d={f.front} wash="chocolate" />
      <Ink d={f.side} wash="chocolate" />
      <Shade d={f.side} kind="cross" />
      <Shade d={f.front} density={1} opacity={0.5} />
      <Ink d={f.top} wash="cocoa" />
      <Shade d={f.top} kind="dots" opacity={0.9} />
      <Lines d={`M${x + 5} ${y + f.dy * 0.4}q5 2 9 -1t8 1`} />
    </g>
  );
}

/** A stack of chocolate-chip cookies. `base` is the bottom of the stack. */
export function Cookies({ cx, base, r = 17, n = 3 }: { cx: number; base: number; r?: number; n?: number }) {
  const ry = r * 0.32;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = cx + (i % 2 ? 2 : -1.5);
        const b = base - i * 4.6;
        return (
          <g key={i}>
            <Ink d={cylinderSide(x, b - 4, b, r, ry)} wash="caramel" />
            <Lines d={contourHatch(x, b - 4, b, r, ry, 0.4, 7)} className="eg-contour" />
            <Ink d={ellipse(x, b - 4, r, ry)} wash="sponge" />
            {i === n - 1 &&
              [
                [-0.5, -0.1],
                [0.2, 0.3],
                [0.55, -0.25],
                [-0.15, -0.45],
                [-0.6, 0.35],
              ].map(([u, v], j) => (
                <Ink key={j} d={ellipse(x + u! * r, b - 4 + v! * ry, 2.2, 1.4)} wash="chocolate" weight="hair" />
              ))}
          </g>
        );
      })}
    </g>
  );
}

/** Chocolate cake layered with cream in a glass jar with a gold lid and a twine bow. `base` is the jar's bottom. */
export function JarCake({ cx, base, rx = 15, h = 40 }: { cx: number; base: number; rx?: number; h?: number }) {
  const ry = rx * RY;
  const layers: [Wash, number][] = [
    ['chocolate', 0.3],
    ['paper', 0.16],
    ['cocoa', 0.24],
    ['paper', 0.14],
  ];
  let y = base;
  const fill = useFill();
  const top = base - h;
  return (
    <g>
      {layers.map(([wash, f], i) => {
        const hh = h * f;
        const el = (
          <path
            key={i}
            d={cylinderSide(cx, y - hh, y, rx - 1.5, ry)}
            style={{ fill: WASH[wash] }}
            className="eg-wash"
          />
        );
        y -= hh;
        return el;
      })}
      <Ink d={cylinderSide(cx, top, base, rx, ry)} wash="none" />
      <Lines d={contourHatch(cx, top, base, rx, ry, 0.55, 6)} className="eg-contour" />
      <Lines
        d={`M${cx - rx * 0.6} ${top + 6}V${base - 3}M${cx - rx * 0.48} ${top + 8}V${base - 8}`}
        weight="hair"
        className="eg-glass-hi"
      />
      {/* Lid and twine */}
      <path d={cylinderSide(cx, top - 6, top, rx + 1.2, ry)} style={{ fill: fill.gold() }} className="eg-wash" />
      <Ink d={cylinderSide(cx, top - 6, top, rx + 1.2, ry)} />
      <Lines d={Array.from({ length: 9 }, (_, i) => `M${r2(cx - rx + (i * (rx * 2)) / 8)} ${top - 5}v5`).join('')} />
      <Ink d={ellipse(cx, top - 6, rx + 1.2, ry)} wash="gold" />
      <Bow x={cx + rx * 0.5} y={top + 2} s={0.45} wash="sand" />
    </g>
  );
}

/** A tea-cake loaf with two slices fallen off the end. `base` is the counter. */
export function Loaf({
  x,
  base,
  w = 58,
  h = 22,
  d = 26,
}: {
  x: number;
  base: number;
  w?: number;
  h?: number;
  d?: number;
}) {
  const f = blockFaces(x, base - h, w, h, d);
  const dome = `M${x} ${base - h}C${x + 4} ${base - h - 9} ${x + w - 4} ${base - h - 9} ${x + w} ${base - h}l${f.dx} ${f.dy}C${x + w - 4 + f.dx} ${base - h - 9 + f.dy} ${x + 4 + f.dx} ${base - h - 9 + f.dy} ${x + f.dx} ${base - h + f.dy}z`;
  return (
    <g>
      <Ink d={f.front} wash="caramel" />
      <Shade d={f.front} density={1} opacity={0.45} />
      <Ink d={f.side} wash="sponge" />
      <Shade d={f.side} kind="dots" opacity={0.6} />
      <Ink d={dome} wash="cocoa" />
      <Lines d={`M${x + 10} ${base - h - 4}q8 -3 14 1M${x + 28} ${base - h - 6}q8 -2 12 1`} />
      {[0, 1].map((i) => {
        const sx = x + w + f.dx * 0.2 + 6 + i * 12;
        return (
          <g key={i} transform={`rotate(${8 + i * 6} ${sx} ${base})`}>
            <Ink d={`M${sx} ${base}v${-h + 2}c2 -6 7 -6 9 0v${h - 2}z`} wash="sponge" />
            <Shade d={`M${sx} ${base}v${-h + 2}c2 -6 7 -6 9 0v${h - 2}z`} kind="dots" opacity={0.5} />
          </g>
        );
      })}
    </g>
  );
}

/* Ornaments --------------------------------------------------------------------- */

/** A laurel branch curving from `a0` to `a1` degrees round a circle, leaves pointing along it. */
export function Laurel({
  cx,
  cy,
  r,
  a0,
  a1,
  leaves = 9,
  size = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  a0: number;
  a1: number;
  leaves?: number;
  size?: number;
}) {
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (a: number, rr = r) => [cx + rr * Math.cos(rad(a)), cy + rr * Math.sin(rad(a))] as const;
  const [sx, sy] = pt(a0);
  const [ex, ey] = pt(a1);
  const sweep = a1 > a0 ? 1 : 0;
  const leafEls = Array.from({ length: leaves }, (_, i) => {
    const a = a0 + ((a1 - a0) * (i + 0.6)) / leaves;
    const dir = a1 > a0 ? 1 : -1;
    return [-1, 1].map((side) => {
      const [x, y] = pt(a);
      const tang = rad(a) + (dir * Math.PI) / 2;
      const out = rad(a) + (side > 0 ? 0 : Math.PI);
      const L = 9 * size;
      const tipX = x + Math.cos(tang) * L * 0.7 + Math.cos(out) * L * 0.6;
      const tipY = y + Math.sin(tang) * L * 0.7 + Math.sin(out) * L * 0.6;
      const mx = (x + tipX) / 2;
      const my = (y + tipY) / 2;
      const nx = -(tipY - y) * 0.28;
      const ny = (tipX - x) * 0.28;
      return (
        <Ink
          key={`${i}${side}`}
          d={`M${r2(x)} ${r2(y)}Q${r2(mx + nx)} ${r2(my + ny)} ${r2(tipX)} ${r2(tipY)}Q${r2(mx - nx)} ${r2(my - ny)} ${r2(x)} ${r2(y)}z`}
          wash="leaf"
          weight="hair"
        />
      );
    });
  });
  return (
    <g>
      <Lines d={`M${r2(sx)} ${r2(sy)}A${r} ${r} 0 0 ${sweep} ${r2(ex)} ${r2(ey)}`} weight="fine" />
      {leafEls}
    </g>
  );
}

/** A ribbon banner with forked, folded-back ends, and a line of capitals on it. */
export function Banner({
  cx,
  y,
  w,
  text,
  wash = 'paper',
}: {
  cx: number;
  y: number;
  w: number;
  text: string;
  wash?: Wash;
}) {
  const h = 22;
  const x = cx - w / 2;
  return (
    <g>
      <Ink d={`M${x - 26} ${y + 8}h22v${h}h-22l8 ${-h / 2}z`} wash="blush" />
      <Ink d={`M${x + w + 26} ${y + 8}h-22v${h}h22l-8 ${-h / 2}z`} wash="blush" />
      <Shade d={`M${x - 4} ${y + h}l4 8h-4z`} density={3} />
      <Ink d={`M${x - 4} ${y + h}l4 8v-8zM${x + w + 4} ${y + h}l-4 8v-8z`} wash="wine" weight="hair" />
      <Ink d={`M${x} ${y}h${w}v${h}h${-w}z`} wash={wash} />
      <path d={`M${x + 3} ${y + 3}h${w - 6}v${h - 6}h${-(w - 6)}z`} className="eg-gold-ink" />
      <text x={cx} y={y + h / 2 + 3.6} textAnchor="middle" className="eg-caps eg-fade" style={{ fontSize: 9.5 }}>
        {text}
      </text>
    </g>
  );
}

/** A gold rosette seal with a line of text round it. */
export function Seal({
  cx,
  cy,
  r = 30,
  top,
  bottom,
}: {
  cx: number;
  cy: number;
  r?: number;
  top: string;
  bottom?: string;
}) {
  const fill = useFill();
  const pts = 28;
  let rosette = '';
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const rr = i % 2 ? r : r * 0.92;
    rosette += `${i ? 'L' : 'M'}${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`;
  }
  return (
    <g>
      <path d={`${rosette}z`} style={{ fill: fill.gold() }} className="eg-wash" />
      <Lines d={`${rosette}z`} weight="hair" />
      <Ink d={ellipse(cx, cy, r * 0.74, r * 0.74)} wash="paper" weight="hair" />
      <path d={ellipse(cx, cy, r * 0.68, r * 0.68)} className="eg-gold-ink" />
      <text
        x={cx}
        y={cy - r * 0.08}
        textAnchor="middle"
        className="eg-caps eg-fade"
        style={{ fontSize: r * 0.36, letterSpacing: '0.04em' }}
      >
        {top}
      </text>
      {bottom && (
        <text x={cx} y={cy + r * 0.3} textAnchor="middle" className="eg-caps eg-fade" style={{ fontSize: r * 0.16 }}>
          {bottom}
        </text>
      )}
    </g>
  );
}

/** A thin ruled divider with a diamond in the middle. */
export function Flourish({ cx, y, w }: { cx: number; y: number; w: number }) {
  return (
    <g>
      <Lines d={`M${cx - w / 2} ${y}H${cx - 8}M${cx + 8} ${y}H${cx + w / 2}`} weight="hair" />
      <Lines d={`M${cx - w / 2 + 6} ${y + 3}H${cx - 14}M${cx + 14} ${y + 3}H${cx + w / 2 - 6}`} weight="hair" />
      <Ink d={`M${cx} ${y - 4}l4 4-4 4-4-4z`} wash="gold" weight="hair" />
    </g>
  );
}

/** A blue enamel stove: its window glows, a cake rises behind it, warmth drifts off the top. */
export function Stove({
  x,
  y,
  timer = '0:05',
  hooks,
}: {
  x: number;
  y: number;
  timer?: string;
  /** Class names for the kitchen story to animate the glow, the rising cake, the warmth and the timer. */
  hooks?: { glow?: string; rise?: string; heat?: string; timer?: string };
}) {
  const w = 104;
  const h = 96;
  const f = blockFaces(x, y, w, h, 50);
  const fill = useFill();
  return (
    <g>
      {/* Feet */}
      <Ink d={`M${x + 8} ${y + h}v8h8v-8zM${x + w - 16} ${y + h}v8h8v-8z`} wash="chocolate" weight="hair" />
      <Ink d={f.front} wash="blue" />
      <Ink d={f.side} wash="sky" />
      <Shade d={f.side} density={2} />
      <Ink d={f.top} wash="paper" />
      <Ink d={ellipse(x + 34 + f.dx / 2, y + f.dy / 2, 13, 4)} wash="sand" weight="hair" />
      <Ink d={ellipse(x + 74 + f.dx / 2, y + f.dy / 2, 11, 3.5)} wash="sand" weight="hair" />
      {/* Control panel: knobs and the timer */}
      <Lines d={`M${x} ${y + 20}H${x + w}`} weight="fine" />
      {[16, 32].map((kx) => (
        <Ink key={kx} d={ellipse(x + kx, y + 10, 5, 5)} wash="paper" weight="hair" />
      ))}
      <Ink d={`M${x + w - 46} ${y + 5}h34v10h-34z`} wash="chocolate" weight="hair" />
      <text
        x={x + w - 29}
        y={y + 13}
        textAnchor="middle"
        className={['eg-caps eg-fade', hooks?.timer].filter(Boolean).join(' ')}
        style={{ fontSize: 7, fill: 'var(--bbm-color-gold-300)', letterSpacing: '0.12em' }}
      >
        {timer}
      </text>
      {/* The door, its window glowing, the gold handle */}
      <Ink d={`M${x + 10} ${y + 28}h${w - 20}v${h - 36}h${-(w - 20)}z`} wash="paper" />
      <path d={`M${x + 14} ${y + 31}h${w - 28}v5h${-(w - 28)}z`} style={{ fill: fill.gold() }} className="eg-wash" />
      <Lines d={`M${x + 14} ${y + 31}h${w - 28}v5h${-(w - 28)}z`} weight="hair" />
      <Ink d={`M${x + 20} ${y + 44}h${w - 40}v${h - 62}h${-(w - 40)}z`} wash="chocolate" />
      <rect
        x={x + 22}
        y={y + 46}
        width={w - 44}
        height={h - 66}
        rx="2"
        className={['eg-glow-window', hooks?.glow].filter(Boolean).join(' ')}
      />
      <Ink
        d={`M${x + 36} ${y + h - 22}h${w - 72}v-6c0 -8 ${w - 72} -8 ${w - 72} 0z`}
        wash="sponge"
        weight="hair"
        className={hooks?.rise}
      />
      <Shade d={`M${x} ${y + h - 10}h${w}v10h${-w}z`} density={1} opacity={0.4} />
      {/* Warmth rising */}
      <g className={hooks?.heat}>
        {[-18, 0, 18].map((dx, i) => (
          <Drift key={dx} delay={i * 0.6}>
            <Lines d={`M${x + w / 2 + dx + f.dx / 2} ${y + f.dy - 6}q-6 -8 0 -16t0 -16`} />
          </Drift>
        ))}
      </g>
    </g>
  );
}
