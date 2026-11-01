// Bakery objects for the isometric drawings: slabs to stand things on, a cake stand, layer cakes with drips and
// cherries, cupcakes, cookies, brownies, jar cakes, a sliced loaf, a bento, a tied cake box, an oven, a bowl and
// a phone with the WhatsApp chat. Positions are in world units: x runs to the right-front, y to the left-front.
import type { ReactNode } from 'react';
import { Box, Cyl, Face, Sphere, Shadow, useIso, useShapeId } from './kit';
import { C, circle, line, path, project, type Pt } from './geometry';
import { M, type Material } from './materials';

const DEG = Math.PI / 180;

/** Angles (in degrees) around a cylinder that face the viewer. */
const FRONT_FROM = -45;
const FRONT_TO = 135;

const frontAngles = (count: number, margin = 12) =>
  Array.from(
    { length: count },
    (_, i) => FRONT_FROM + margin + ((FRONT_TO - FRONT_FROM - margin * 2) * i) / (count - 1 || 1),
  );

/** Painter's order: things further back (smaller x + y) first. */
const byDepth = <T extends { x: number; y: number }>(list: T[]) => [...list].sort((a, b) => a.x + a.y - (b.x + b.y));

/* Bands and rings ------------------------------------------------------- */

interface RingProps {
  x: number;
  y: number;
  /** Bottom and top of the band. */
  z1: number;
  z2: number;
  /** Radius at the bottom and at the top. */
  r1: number;
  r2?: number;
  mat: Material;
  outline?: number;
}

/** A band around the front of a cylinder: a ribbon, a stripe on a bowl, a jar's label, a cake's drip collar. */
export function Ring({ x, y, z1, z2, r1, r2 = r1, mat, outline = 0.8 }: RingProps) {
  const { cam, sid } = useIso();
  const gid = `${sid}-${useShapeId()}`;
  const arc = (r: number, z: number) => {
    const pts: Pt[] = [];
    for (let a = FRONT_FROM; a <= FRONT_TO; a += 6)
      pts.push(project(cam, x + Math.cos(a * DEG) * r, y + Math.sin(a * DEG) * r, z));
    return pts;
  };
  const bottom = arc(r1, z1);
  const top = arc(r2, z2).reverse();
  const half = Math.max(r1, r2) * Math.SQRT2 * C * cam.k;
  const [cx] = project(cam, x, y, z1);
  return (
    <g>
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={cx - half} x2={cx + half} y1="0" y2="0">
          <stop offset="0" style={{ stopColor: mat.side }} />
          <stop offset="0.3" style={{ stopColor: mat.hi }} />
          <stop offset="0.62" style={{ stopColor: mat.side }} />
          <stop offset="1" style={{ stopColor: mat.shade }} />
        </linearGradient>
      </defs>
      <path d={path([...bottom, ...top])} style={{ fill: `url(#${gid})`, stroke: mat.line, strokeWidth: outline }} />
    </g>
  );
}

/** Beads around the rim of a cylinder, back ones first: piped icing, pearls. */
export function Beads({
  x,
  y,
  z,
  r,
  size,
  count,
  mat,
  front = false,
}: {
  x: number;
  y: number;
  z: number;
  r: number;
  size: number;
  count: number;
  mat: Material;
  /** Only the beads facing the viewer (for a row around the base, where the back ones are hidden). */
  front?: boolean;
}) {
  const angles = front ? frontAngles(count, 4) : Array.from({ length: count }, (_, i) => (i / count) * 360);
  const beads = byDepth(angles.map((a) => ({ x: x + Math.cos(a * DEG) * r, y: y + Math.sin(a * DEG) * r, a })));
  return (
    <g>
      {beads.map((b) => (
        <Sphere key={b.a} x={b.x} y={b.y} z={z} r={size} mat={mat} outline={0.6} />
      ))}
    </g>
  );
}

/* Things to stand on ------------------------------------------------------ */

export interface PlatformProps {
  x: number;
  y: number;
  w: number;
  d: number;
  h?: number;
  r?: number;
  mat?: Material;
  /** The thin inset slab on top. */
  inset?: Material | false;
  shadow?: number;
  /** Candy stripes round the slab's sides. */
  stripes?: boolean;
  children?: ReactNode;
}

/** The big rounded slab a scene sits on, with a thin inset slab on top (its surface is at h + 2). */
export function Platform({
  x,
  y,
  w,
  d,
  h = 8,
  r = 14,
  mat = M.blush,
  inset = M.paper,
  shadow = 0.16,
  stripes = true,
  children,
}: PlatformProps) {
  const { cam, sid } = useIso();
  return (
    <g>
      {/* A wide, soft shadow so the whole slab floats */}
      <g opacity={shadow} filter={`url(#${sid}-blur)`}>
        <path
          d={path(
            [
              [x + 6, y + 10],
              [x + w + 10, y + 10],
              [x + w + 10, y + d + 6],
              [x + 6, y + d + 6],
            ].map(([px, py]) => project(cam, px!, py!, -h * 1.6)),
          )}
          className="iso-shadow"
        />
      </g>
      <Box x={x} y={y} z={0} w={w} d={d} h={h} r={r} mat={mat} shadow={false}>
        {stripes && (
          <>
            <Face face="left" at={[x + r, y + d, h]}>
              {Array.from({ length: Math.floor((w - 2 * r) / 7) }, (_, i) => (
                <rect key={i} x={i * 7 + 2} width={3.5} height={h} className="iso-candy" />
              ))}
            </Face>
            <Face face="right" at={[x + w, y + d - r, h]}>
              {Array.from({ length: Math.floor((d - 2 * r) / 7) }, (_, i) => (
                <rect key={i} x={i * 7 + 2} width={3.5} height={h} className="iso-candy iso-candy--shade" />
              ))}
            </Face>
          </>
        )}
      </Box>
      {inset && (
        <Box x={x + 4} y={y + 4} z={h} w={w - 8} d={d - 8} h={2} r={Math.max(2, r - 4)} mat={inset} shadow={false} />
      )}
      {children}
    </g>
  );
}

/** A footed cake stand. Returns nothing above it: put the cake at z + standHeight(r). */
export function Stand({
  x,
  y,
  z = 0,
  r,
  mat = M.paper,
}: {
  x: number;
  y: number;
  z?: number;
  r: number;
  mat?: Material;
}) {
  const stem = r * 0.55;
  return (
    <g>
      <Cyl x={x} y={y} z={z} r={r * 0.42} rTop={r * 0.22} h={3.5} mat={mat} />
      <Cyl x={x} y={y} z={z + 3.5} r={r * 0.11} h={stem} mat={mat} shadow={false} />
      <Cyl x={x} y={y} z={z + 3.5 + stem} r={r * 0.16} rTop={r} h={1.2} mat={mat} shadow={false} />
      <Cyl x={x} y={y} z={z + 4.7 + stem} r={r} h={1.8} mat={mat} shadow={false} />
      <Beads x={x} y={y} z={z + 5.4 + stem} r={r} size={1.1} count={18} mat={mat} front />
    </g>
  );
}

export const standHeight = (r: number) => 6.5 + r * 0.55;

/* Cakes ----------------------------------------------------------------- */

export interface LayerCakeProps {
  x: number;
  y: number;
  z?: number;
  r: number;
  h: number;
  /** The frosting the cake is covered in. */
  coat?: Material;
  /** Ganache or icing poured over the top, running down the sides. */
  drip?: Material | false;
  /** Piped beads round the top rim. */
  piping?: Material | false;
  /** Pearls round the base. */
  pearls?: Material | false;
  cherries?: number;
  /** A flat drawing on the top (a name, a message), in a square of side 2r centred on the cake. */
  top?: ReactNode;
  shadow?: boolean | number;
}

/** A round layer cake: frosting, a drip, piping, pearls and cherries. */
export function LayerCake({
  x,
  y,
  z = 0,
  r,
  h,
  coat = M.pink,
  drip = M.chocolate,
  piping = M.paper,
  pearls = M.paper,
  cherries = 3,
  top,
  shadow,
}: LayerCakeProps) {
  const { cam } = useIso();
  const lid = z + h;
  const drips = drip
    ? frontAngles(9, 6).map((a, i) => {
        const len = (i % 3 === 0 ? 0.42 : i % 3 === 1 ? 0.28 : 0.55) * h;
        const px = x + Math.cos(a * DEG) * (r + 0.15);
        const py = y + Math.sin(a * DEG) * (r + 0.15);
        return { a, from: project(cam, px, py, lid - 1), to: project(cam, px, py, lid - 1 - len) };
      })
    : [];
  const cherryPts = byDepth(
    Array.from({ length: cherries }, (_, i) => {
      const a = (210 + (i * 360) / Math.max(cherries, 1)) * DEG;
      const rr = cherries === 1 ? 0 : r * 0.5;
      return { x: x + Math.cos(a) * rr, y: y + Math.sin(a) * rr, i };
    }),
  );
  return (
    <g>
      <Cyl x={x} y={y} z={z} r={r} h={h} mat={coat} shadow={shadow} />
      {drip && (
        <>
          <Ring x={x} y={y} z1={lid - 2.2} z2={lid} r1={r + 0.15} mat={drip} />
          {drips.map((dp) => (
            <path
              key={dp.a}
              d={line([dp.from, dp.to])}
              style={{ stroke: drip.side, strokeWidth: 3.2 * cam.k, strokeLinecap: 'round', fill: 'none' }}
            />
          ))}
          <Cyl x={x} y={y} z={lid} r={r + 0.15} h={0} mat={drip} shadow={false} />
        </>
      )}
      {top && (
        <Face face="top" at={[x - r, y - r, lid]}>
          {top}
        </Face>
      )}
      {piping && <Beads x={x} y={y} z={lid + 0.6} r={r - 1.2} size={1.25} count={22} mat={piping} />}
      {pearls && <Beads x={x} y={y} z={z + 1.1} r={r + 0.4} size={1.1} count={14} mat={pearls} front />}
      {cherryPts.map((c) => (
        <Cherry key={c.i} x={c.x} y={c.y} z={lid + 2.6} />
      ))}
    </g>
  );
}

/** A glossy cherry with its stem. */
export function Cherry({ x, y, z, r = 2.3 }: { x: number; y: number; z: number; r?: number }) {
  const { cam } = useIso();
  const [sx, sy] = project(cam, x, y, z + r * 0.9);
  const k = cam.k;
  return (
    <g>
      <Sphere x={x} y={y} z={z} r={r} mat={M.cherry} />
      <path
        d={`M${sx} ${sy}q${2 * k} ${-5 * k} ${6 * k} ${-7 * k}`}
        className="iso-stem"
        style={{ strokeWidth: 1.1 * k }}
      />
    </g>
  );
}

/** A cupcake: a pleated case, the sponge, a three-tier swirl and a cherry. */
export function Cupcake({
  x,
  y,
  z = 0,
  s = 1,
  frosting = M.pink,
  liner = M.paper,
}: {
  x: number;
  y: number;
  z?: number;
  s?: number;
  frosting?: Material;
  liner?: Material;
}) {
  const { cam } = useIso();
  const pleats = frontAngles(7, 4).map((a) => {
    const c = Math.cos(a * DEG);
    const sn = Math.sin(a * DEG);
    return line([
      project(cam, x + c * 5.6 * s, y + sn * 5.6 * s, z),
      project(cam, x + c * 7.6 * s, y + sn * 7.6 * s, z + 8 * s),
    ]);
  });
  return (
    <g>
      <Cyl x={x} y={y} z={z} r={5.6 * s} rTop={7.6 * s} h={8 * s} mat={liner} />
      {pleats.map((d) => (
        <path key={d} d={d} style={{ stroke: liner.line, strokeWidth: 0.7, fill: 'none' }} />
      ))}
      <Cyl x={x} y={y} z={z + 8 * s} r={7.9 * s} rTop={7.2 * s} h={1.8 * s} mat={M.sponge} shadow={false} />
      <Cyl x={x} y={y} z={z + 9.8 * s} r={7.6 * s} rTop={6.4 * s} h={3 * s} mat={frosting} shadow={false} />
      <Cyl x={x} y={y} z={z + 12.8 * s} r={6 * s} rTop={4.4 * s} h={3 * s} mat={frosting} shadow={false} />
      <Cyl x={x} y={y} z={z + 15.8 * s} r={4.2 * s} rTop={1.6 * s} h={3.2 * s} mat={frosting} shadow={false} />
      <Cherry x={x} y={y} z={z + 20.6 * s} r={2.2 * s} />
    </g>
  );
}

/** A chocolate-chip cookie. */
export function Cookie({
  x,
  y,
  z = 0,
  r = 10,
  shadow,
}: {
  x: number;
  y: number;
  z?: number;
  r?: number;
  shadow?: boolean | number;
}) {
  const chips: [number, number, number][] = [
    [0.55, 0.4, 1.2],
    [1.25, 0.55, 1],
    [0.8, 1.15, 1.3],
    [1.45, 1.3, 0.9],
    [0.5, 1.5, 0.9],
    [1.1, 0.95, 0.8],
  ];
  return (
    <Cyl x={x} y={y} z={z} r={r} h={2.6} mat={M.caramel} shadow={shadow}>
      <Face face="top" at={[x - r, y - r, z + 2.6]}>
        {chips.map(([u, v, s], i) => (
          <ellipse key={i} cx={u * r} cy={v * r} rx={s * 1.3} ry={s * 1.1} className="iso-chip" />
        ))}
      </Face>
    </Cyl>
  );
}

/** A stack of cookies, a little off true. */
export function CookieStack({
  x,
  y,
  z = 0,
  n = 3,
  r = 10,
}: {
  x: number;
  y: number;
  z?: number;
  n?: number;
  r?: number;
}) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Cookie
          key={i}
          x={x + (i % 2 ? 1.2 : -0.8)}
          y={y + (i % 2 ? -0.6 : 0.9)}
          z={z + i * 2.8}
          r={r}
          shadow={i === 0 ? true : 0.18}
        />
      ))}
    </g>
  );
}

/** A fudgy brownie square, dusted with sugar. */
export function Brownie({ x, y, z = 0, s = 14, h = 7 }: { x: number; y: number; z?: number; s?: number; h?: number }) {
  return (
    <Box x={x} y={y} z={z} w={s} d={s} h={h} r={1.6} mat={M.chocolate}>
      <Face face="top" at={[x, y, z + h]}>
        <path
          d={`M${s * 0.2} ${s * 0.3}q${s * 0.2} ${s * 0.1} ${s * 0.35} ${-s * 0.05}M${s * 0.45} ${s * 0.7}q${s * 0.15} ${-s * 0.12} ${s * 0.35} 0`}
          className="iso-crackle"
        />
        {[
          [0.3, 0.55],
          [0.7, 0.3],
          [0.62, 0.62],
          [0.25, 0.8],
          [0.8, 0.82],
        ].map(([u, v], i) => (
          <circle key={i} cx={u! * s} cy={v! * s} r={0.55} className="iso-dust" />
        ))}
      </Face>
    </Box>
  );
}

export function BrownieStack({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  return (
    <g>
      <Brownie x={x} y={y} z={z} />
      <Brownie x={x + 16} y={y + 2} z={z} />
      <Brownie x={x + 7} y={y + 1} z={z + 7} />
    </g>
  );
}

/** Chocolate cake layered with cream in a glass jar, with a gold lid. */
export function JarCake({
  x,
  y,
  z = 0,
  r = 7.5,
  h = 22,
}: {
  x: number;
  y: number;
  z?: number;
  r?: number;
  h?: number;
}) {
  const { cam } = useIso();
  const layers: [Material, number][] = [
    [M.chocolate, 6],
    [M.cream, 3.5],
    [M.cocoa, 5.5],
    [M.cream, 3],
    [M.chocolate, 2.5],
  ];
  let zz = z + 0.6;
  const inner = layers.map(([m, lh], i) => {
    const el = <Cyl key={i} x={x} y={y} z={zz} r={r - 0.9} h={lh} mat={m} shadow={false} outline={0.4} />;
    zz += lh;
    return el;
  });
  const half = r * Math.SQRT2 * C * cam.k;
  const [cx, cyTop] = project(cam, x, y, z + h);
  const [, cyBot] = project(cam, x, y, z);
  return (
    <g>
      <Shadow outline={circle(x, y, r)} z={z} opacity={0.22} />
      {inner}
      {/* The glass: a thin, see-through body with a highlight down the left */}
      <path
        d={`M${cx - half} ${cyTop}V${cyBot}A${half} ${half * 0.577} 0 0 0 ${cx + half} ${cyBot}V${cyTop}`}
        className="iso-glass"
      />
      <path
        d={`M${cx - half * 0.62} ${cyTop + 4 * cam.k}V${cyBot - 1 * cam.k}`}
        className="iso-glass-hi"
        style={{ strokeWidth: 1.6 * cam.k }}
      />
      <Ring x={x} y={y} z1={z + h * 0.42} z2={z + h * 0.62} r1={r + 0.05} mat={M.paper} outline={0.5} />
      <Cyl x={x} y={y} z={z + h} r={r + 0.5} h={3.2} mat={M.gold} shadow={false} />
    </g>
  );
}

const LOAF_CUT: Material = {
  top: 'var(--bbm-color-brown-400)',
  hi: 'var(--bbm-color-brown-300)',
  side: 'var(--bbm-color-brown-400)',
  shade: 'var(--bbm-color-butter-300)',
  line: 'var(--bbm-color-brown-600)',
};

/** A tea-cake loaf with two slices cut and leaning off the end. */
export function Loaf({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  return (
    <g>
      <Box x={x} y={y} z={z} w={24} d={12} h={10} r={3.5} mat={LOAF_CUT} />
      <Box x={x + 26} y={y + 0.5} z={z} w={3} d={11.5} h={9.5} r={0.8} mat={LOAF_CUT} />
      <Box x={x + 31} y={y + 1} z={z} w={3} d={11} h={9} r={0.8} mat={LOAF_CUT} />
    </g>
  );
}

/** A bento cake in its open box, with a candle. */
export function Bento({ x, y, z = 0, message = 'hbd!' }: { x: number; y: number; z?: number; message?: string }) {
  return (
    <g>
      <Box x={x} y={y} z={z} w={26} d={26} h={4} r={3} mat={M.paper} />
      <Cyl x={x + 13} y={y + 13} z={z + 4} r={9.5} h={8} mat={M.cream} shadow={0.14} />
      <Face face="top" at={[x + 3.5, y + 3.5, z + 12]}>
        <text x="9.5" y="11.5" textAnchor="middle" className="iso-script" style={{ fontSize: 6 }}>
          {message}
        </text>
      </Face>
      <Beads x={x + 13} y={y + 13} z={z + 12.4} r={8.4} size={0.95} count={20} mat={M.rose} />
      <Cyl x={x + 17} y={y + 9} z={z + 12} r={0.8} h={7} mat={M.sky} shadow={false} outline={0.4} />
      <Sphere x={x + 17} y={y + 9} z={z + 20.6} r={1.3} stretch={1.6} mat={M.gold} outline={0} />
    </g>
  );
}

/* The cake box ----------------------------------------------------------- */

export interface CakeBoxProps {
  x: number;
  y: number;
  z?: number;
  w?: number;
  d?: number;
  h?: number;
  mat?: Material;
  /** Show the name sticker on the front. */
  sticker?: boolean;
  /** Hide the bow (when the ribbon goes on later). */
  bow?: boolean;
  className?: string;
  /** Extra classes for the lid and for the ribbon and bow, so they can be animated on their own. */
  lidClassName?: string;
  ribbonClassName?: string;
}

/** A Bakes by Mom cake box, tied with a cherry ribbon and a bow, with the sticker on the front. */
export function CakeBox({
  x,
  y,
  z = 0,
  w = 30,
  d = 30,
  h = 22,
  mat = M.pink,
  sticker = true,
  bow = true,
  className,
  lidClassName,
  ribbonClassName,
}: CakeBoxProps) {
  const lidH = 5;
  const band = 4;
  const ribbonFaces = (zTop: number, hh: number, ww: number, dd: number, ox: number, oy: number) => (
    <>
      <Face face="left" at={[ox, oy + dd, zTop]} className={ribbonClassName}>
        <rect x={ww / 2 - band / 2} width={band} height={hh} className="iso-ribbon iso-ribbon--left" />
      </Face>
      <Face face="right" at={[ox + ww, oy + dd, zTop]} className={ribbonClassName}>
        <rect x={dd / 2 - band / 2} width={band} height={hh} className="iso-ribbon iso-ribbon--right" />
      </Face>
    </>
  );
  return (
    <g className={className}>
      <Box x={x} y={y} z={z} w={w} d={d} h={h - lidH} r={1.2} mat={mat}>
        {ribbonFaces(z + h - lidH, h - lidH, w, d, x, y)}
        {sticker && (
          <Face face="left" at={[x, y + d, z + h - lidH]}>
            <rect x={3} y={4} width={w / 2 - band / 2 - 5} height={9} rx={1.5} className="iso-sticker" />
            <text
              x={3 + (w / 2 - band / 2 - 5) / 2}
              y={10.4}
              textAnchor="middle"
              className="iso-script"
              style={{ fontSize: 4.6 }}
            >
              by Mom
            </text>
          </Face>
        )}
      </Box>
      <g className={lidClassName}>
        <Box x={x - 0.8} y={y - 0.8} z={z + h - lidH} w={w + 1.6} d={d + 1.6} h={lidH} r={1.4} mat={mat} shadow={0.12}>
          {ribbonFaces(z + h, lidH, w + 1.6, d + 1.6, x - 0.8, y - 0.8)}
          <Face face="top" at={[x - 0.8, y - 0.8, z + h]} className={ribbonClassName}>
            <rect y={(d + 1.6) / 2 - band / 2} width={w + 1.6} height={band} className="iso-ribbon iso-ribbon--top" />
            <rect x={(w + 1.6) / 2 - band / 2} width={band} height={d + 1.6} className="iso-ribbon iso-ribbon--top" />
          </Face>
        </Box>
        {bow && (
          <g className={ribbonClassName}>
            <Bow x={x + w / 2} y={y + d / 2} z={z + h} />
          </g>
        )}
      </g>
    </g>
  );
}

/** A ribbon bow, sitting on a surface. */
export function Bow({ x, y, z, s = 1 }: { x: number; y: number; z: number; s?: number }) {
  const { cam } = useIso();
  const [cx, cy] = project(cam, x, y, z);
  const k = cam.k * s;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${k})`} className="iso-bow">
      <path d="M-1 0.5l-5 8 2.4-0.4 1.6 2 2-9.6zM1 0.5l5 8-2.4-0.4-1.6 2-2-9.6z" className="iso-bow__tail" />
      <path d="M0-1.5C-4-8-11-8-10.5-3.5-10-0.5-4 0 0-1.5z" className="iso-bow__loop" />
      <path d="M0-1.5C4-8 11-8 10.5-3.5 10-0.5 4 0 0-1.5z" className="iso-bow__loop" />
      <path d="M-3-3.2C-6-5.6-8.6-5.4-8.4-3.8M3-3.2C6-5.6 8.6-5.4 8.4-3.8" className="iso-bow__fold" />
      <ellipse cx="0" cy="-1.6" rx="2.3" ry="2" className="iso-bow__knot" />
    </g>
  );
}

/* Kitchen things ---------------------------------------------------------- */

/** A mixing bowl. `children` are drawn on its contents' surface (a square of side 2r at the brim). */
export function Bowl({
  x,
  y,
  z = 0,
  r = 20,
  h = 14,
  mat = M.paper,
  band = M.sky,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  r?: number;
  h?: number;
  mat?: Material;
  band?: Material;
  children?: ReactNode;
}) {
  const inner: Material = { ...M.sky, top: 'var(--bbm-color-blue-200)' };
  return (
    <g>
      <Cyl x={x} y={y} z={z} r={r * 0.55} rTop={r} h={h} mat={mat} />
      <Cyl x={x} y={y} z={z + h} r={r - 1.4} h={0} mat={inner} shadow={false} outline={0.6} />
      <Face face="top" at={[x - r, y - r, z + h]}>
        {children}
      </Face>
      <Ring
        x={x}
        y={y}
        z1={z + h * 0.55}
        z2={z + h * 0.72}
        r1={r * 0.55 + r * 0.45 * 0.55}
        r2={r * 0.55 + r * 0.45 * 0.72}
        mat={band}
        outline={0.5}
      />
    </g>
  );
}

/** A phone standing up, with a WhatsApp order on its screen. */
export function Phone({
  x,
  y,
  z = 0,
  lines = ['Hi! A cake for', 'Saturday please 🎂'],
}: {
  x: number;
  y: number;
  z?: number;
  lines?: string[];
}) {
  const w = 28;
  const h = 48;
  return (
    <Box x={x} y={y} z={z} w={w} d={3} h={h} r={1.4} mat={M.chocolate}>
      <Face face="left" at={[x, y + 3, z + h]}>
        <rect x={1.4} y={1.6} width={w - 2.8} height={h - 3.2} rx={2.4} className="iso-screen" />
        <rect x={1.4} y={1.6} width={w - 2.8} height={5} rx={2.4} className="iso-screen__bar" />
        <rect x={3} y={10} width={w - 8} height={10} rx={2} className="iso-bubble iso-bubble--in" />
        <text x={4.4} y={14} className="iso-bubble__text">
          {lines[0]}
        </text>
        <text x={4.4} y={17.8} className="iso-bubble__text">
          {lines[1]}
        </text>
        <rect x={9} y={23} width={w - 12} height={6.5} rx={2} className="iso-bubble iso-bubble--out" />
        <text x={10.4} y={27.4} className="iso-bubble__text">
          Of course! ♥
        </text>
        <rect x={3} y={h - 9} width={w - 6} height={4} rx={2} className="iso-screen__input" />
      </Face>
    </Box>
  );
}

/** An oven: blue enamel, a glowing window, two knobs and a timer. `children` go inside the window. */
export function Oven({
  x,
  y,
  z = 0,
  w = 54,
  d = 40,
  h = 46,
  timer,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  w?: number;
  d?: number;
  h?: number;
  timer?: string;
  children?: ReactNode;
}) {
  return (
    <Box x={x} y={y} z={z} w={w} d={d} h={h} r={3} mat={M.sky}>
      <Face face="left" at={[x, y + d, z + h]}>
        <rect x={3} y={3} width={w - 6} height={9} rx={2} className="iso-oven__panel" />
        <circle cx={9} cy={7.5} r={2.6} className="iso-oven__knob" />
        <circle cx={16} cy={7.5} r={2.6} className="iso-oven__knob" />
        <rect x={w - 24} y={4.6} width={18} height={6} rx={1.4} className="iso-oven__display" />
        <text x={w - 15} y={9.4} textAnchor="middle" className="iso-oven__time bk-timer-text">
          {timer}
        </text>
        <rect x={5} y={15} width={w - 10} height={h - 20} rx={4} className="iso-oven__door" />
        <rect x={10} y={17.5} width={w - 20} height={2.4} rx={1.2} className="iso-oven__handle" />
        <rect x={9} y={22} width={w - 18} height={h - 31} rx={3} className="iso-oven__window" />
        <rect x={9} y={22} width={w - 18} height={h - 31} rx={3} className="iso-oven__glow bk-oven-glow" />
        {children}
      </Face>
      <Face face="right" at={[x + w, y + d, z + h]}>
        <rect x={4} y={4} width={d - 8} height={3} rx={1.5} className="iso-oven__vent" />
        <rect x={4} y={9} width={d - 8} height={3} rx={1.5} className="iso-oven__vent" />
      </Face>
    </Box>
  );
}
