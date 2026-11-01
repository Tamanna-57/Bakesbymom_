// The isometric drawing kit: a scene (the SVG, its camera and shared filters) and the primitives every bakery
// object is built from, a rounded slab, a cylinder (or a tapered one), a sphere, a soft contact shadow, a flat
// drawing laid onto a face, a dashed guide, a sparkle and a floating label. Colours come from the tokens.
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
import { C, circle, faceMatrix, hull, path, project, roundedRect, type Camera, type Pt, type Pt3 } from './geometry';
import { type Material } from './materials';
import './iso.css';

interface SceneContext {
  cam: Camera;
  /** Prefix for ids inside this SVG. */
  sid: string;
}

const IsoContext = createContext<SceneContext>({ cam: { k: 1, ox: 0, oy: 0 }, sid: 'iso' });

export const useIso = () => useContext(IsoContext);

/** A unique, SVG-safe id for gradients that belong to one shape. */
export function useShapeId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

export interface IsoSceneProps extends Omit<SVGAttributes<SVGSVGElement>, 'viewBox'> {
  /** Page size of the drawing (the viewBox). */
  width: number;
  height: number;
  /** Where the world origin sits, and how many pixels a world unit is. */
  camera: Camera;
  /** What the drawing shows, for screen readers. Leave out for a decorative drawing. */
  label?: string;
  /** Assemble the pieces (`.iso-drop`) when the drawing scrolls into view. */
  assemble?: boolean;
  children: ReactNode;
}

/** The SVG for one isometric drawing. */
export function IsoScene({
  width,
  height,
  camera,
  label,
  assemble = true,
  className,
  children,
  ...rest
}: IsoSceneProps) {
  const sid = `iso${useShapeId()}`;
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !assemble) return;
    if (typeof IntersectionObserver === 'undefined') {
      svg.dataset.in = '';
      return;
    }
    // Hidden pieces are only hidden once this has run, so the drawing never stays blank without JavaScript.
    svg.dataset.armed = '';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          svg.dataset.in = '';
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [assemble]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={['iso-scene', className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <defs>
        <filter id={`${sid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`${sid}-blur-sm`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        {/* Ambient occlusion: sides get a touch darker towards the floor */}
        <linearGradient id={`${sid}-ao`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor="#32180b" stopOpacity="0" />
          <stop offset="1" stopColor="#32180b" stopOpacity="0.14" />
        </linearGradient>
        {/* A soft sheen across every top face */}
        <linearGradient id={`${sid}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${sid}-glow`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <IsoContext.Provider value={{ cam: camera, sid }}>{children}</IsoContext.Provider>
    </svg>
  );
}

const stop = (offset: number, color: string, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: color, stopOpacity: opacity }} />
);

interface ShadowProps {
  /** The footprint, in the floor plane. */
  outline: [number, number][];
  /** Height of the surface the shadow falls on. */
  z: number;
  opacity?: number;
  /** Larger shadows for things that float. */
  spread?: number;
}

/** A soft contact shadow under a shape, falling down and to the right. */
export function Shadow({ outline, z, opacity = 0.2, spread = 1 }: ShadowProps) {
  const { cam, sid } = useIso();
  const pts = outline.map(([x, y]) => project(cam, x + 2 * spread, y + 1 * spread, z));
  return (
    <path
      d={path(hull(pts))}
      className="iso-shadow"
      style={{ opacity }}
      filter={`url(#${sid}-${spread > 1.5 ? 'blur' : 'blur-sm'})`}
    />
  );
}

interface ExtrudeProps {
  bottom: [number, number][];
  top: [number, number][];
  z: number;
  h: number;
  mat: Material;
  /** Side shading: a box has two flat faces split at its front corner, a cylinder is shaded round. */
  shading: { kind: 'box'; front: number; soft: number } | { kind: 'round'; from: number; to: number };
  shadow?: boolean | number;
  outline?: number;
  children?: ReactNode;
}

function Extrude({ bottom, top, z, h, mat, shading, shadow = true, outline = 1, children }: ExtrudeProps) {
  const { cam, sid } = useIso();
  const gid = `${sid}-${useShapeId()}`;
  const base = bottom.map(([x, y]) => project(cam, x, y, z));
  const lid = top.map(([x, y]) => project(cam, x, y, z + h));
  const side = path(hull([...base, ...lid]));
  const topPath = path(lid);
  return (
    <g className="iso-solid">
      {shadow !== false && (
        <Shadow outline={bottom} z={z} opacity={typeof shadow === 'number' ? shadow : 0.22} spread={1} />
      )}
      <defs>
        {shading.kind === 'box' ? (
          <linearGradient
            id={gid}
            gradientUnits="userSpaceOnUse"
            x1={shading.front - shading.soft}
            x2={shading.front + shading.soft}
            y1="0"
            y2="0"
          >
            {stop(0, mat.side)}
            {stop(1, mat.shade)}
          </linearGradient>
        ) : (
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={shading.from} x2={shading.to} y1="0" y2="0">
            {stop(0, mat.side)}
            {stop(0.3, mat.hi)}
            {stop(0.62, mat.side)}
            {stop(1, mat.shade)}
          </linearGradient>
        )}
      </defs>
      {h > 0 && (
        <>
          <path d={side} style={{ fill: `url(#${gid})`, stroke: mat.line, strokeWidth: outline }} />
          <path d={side} fill={`url(#${sid}-ao)`} />
        </>
      )}
      <path d={topPath} style={{ fill: mat.top, stroke: mat.line, strokeWidth: outline }} />
      <path d={topPath} fill={`url(#${sid}-sheen)`} />
      {children}
    </g>
  );
}

export interface BoxProps {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  /** Corner radius, in world units. */
  r?: number;
  mat: Material;
  shadow?: boolean | number;
  outline?: number;
  /** Drawn on top of the box (decals on its faces). */
  children?: ReactNode;
}

/** A rounded slab or block: x, y is its back corner, z its base. */
export function Box({ x, y, z = 0, w, d, h, r = 3, mat, shadow, outline, children }: BoxProps) {
  const { cam } = useIso();
  const outlinePts = roundedRect(x, y, w, d, r);
  const [front] = project(cam, x + w, y + d, z);
  return (
    <Extrude
      bottom={outlinePts}
      top={outlinePts}
      z={z}
      h={h}
      mat={mat}
      shading={{ kind: 'box', front, soft: Math.max(0.6, r * C * cam.k * 0.9) }}
      shadow={shadow}
      outline={outline}
    >
      {children}
    </Extrude>
  );
}

export interface CylProps {
  /** Centre of the base. */
  x: number;
  y: number;
  z?: number;
  r: number;
  h: number;
  /** Radius at the top, for tapered shapes (cupcake cases, bowls, cake-stand feet). */
  rTop?: number;
  mat: Material;
  shadow?: boolean | number;
  outline?: number;
  children?: ReactNode;
}

/** A cylinder, or a tapered one. */
export function Cyl({ x, y, z = 0, r, h, rTop = r, mat, shadow, outline, children }: CylProps) {
  const { cam } = useIso();
  const half = Math.max(r, rTop) * Math.SQRT2 * C * cam.k;
  const [cx] = project(cam, x, y, z);
  return (
    <Extrude
      bottom={circle(x, y, r)}
      top={circle(x, y, rTop)}
      z={z}
      h={h}
      mat={mat}
      shading={{ kind: 'round', from: cx - half, to: cx + half }}
      shadow={shadow}
      outline={outline}
    >
      {children}
    </Extrude>
  );
}

export interface SphereProps {
  /** Centre. */
  x: number;
  y: number;
  z: number;
  r: number;
  mat: Material;
  /** Squash (<1) or stretch (>1) vertically: an egg is 1.25. */
  stretch?: number;
  shadow?: boolean;
  outline?: number;
}

/** A ball: cherries, pearls, an egg. */
export function Sphere({ x, y, z, r, mat, stretch = 1, shadow = false, outline = 1 }: SphereProps) {
  const { cam, sid } = useIso();
  const gid = `${sid}-${useShapeId()}`;
  const [sx, sy] = project(cam, x, y, z);
  const rad = r * Math.SQRT2 * C * cam.k;
  return (
    <g className="iso-solid">
      {shadow && <Shadow outline={circle(x, y, r * 0.9, 16)} z={z - r * stretch} opacity={0.25} />}
      <defs>
        <radialGradient id={gid} cx="0.36" cy="0.3" r="0.8">
          {stop(0, mat.hi)}
          {stop(0.35, mat.top)}
          {stop(0.75, mat.side)}
          {stop(1, mat.shade)}
        </radialGradient>
      </defs>
      <ellipse
        cx={sx}
        cy={sy}
        rx={rad}
        ry={rad * stretch}
        style={{ fill: `url(#${gid})`, stroke: mat.line, strokeWidth: outline }}
      />
      <ellipse
        cx={sx - rad * 0.32}
        cy={sy - rad * stretch * 0.4}
        rx={rad * 0.28}
        ry={rad * 0.18 * stretch}
        fill="#fff"
        opacity="0.75"
        transform={`rotate(-30 ${sx - rad * 0.32} ${sy - rad * stretch * 0.4})`}
      />
    </g>
  );
}

interface FaceProps {
  face: 'top' | 'left' | 'right';
  /** The face's origin: for `top`, its back corner; for `left` and `right`, its top-left corner on the page. */
  at: Pt3;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Lays a flat drawing onto a face of the world (labels, icing, windows, oven doors). */
export function Face({ face, at, children, className, style }: FaceProps) {
  const { cam } = useIso();
  return (
    <g transform={faceMatrix(cam, face, at)} className={className} style={style}>
      {children}
    </g>
  );
}

/** A dashed guide between two points, like a drop line under something floating. */
export function Guide({ from, to, className }: { from: Pt3; to: Pt3; className?: string }) {
  const { cam } = useIso();
  const a = project(cam, ...from);
  const b = project(cam, ...to);
  return <path d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} className={['iso-guide', className].filter(Boolean).join(' ')} />;
}

/** A dashed ring on a surface: where something will land. */
export function Landing({ x, y, z, r }: { x: number; y: number; z: number; r: number }) {
  const { cam } = useIso();
  return <path d={path(circle(x, y, r, 32).map(([px, py]) => project(cam, px, py, z)))} className="iso-guide" />;
}

const sparklePath = (s: number) =>
  `M0 ${-s}C${s * 0.12} ${-s * 0.12} ${s * 0.12} ${-s * 0.12} ${s} 0C${s * 0.12} ${s * 0.12} ${s * 0.12} ${s * 0.12} 0 ${s}C${-s * 0.12} ${s * 0.12} ${-s * 0.12} ${s * 0.12} ${-s} 0C${-s * 0.12} ${-s * 0.12} ${-s * 0.12} ${-s * 0.12} 0 ${-s}Z`;

/** A four-point sparkle, at a point in the world or on the page. */
export function Sparkle({
  at,
  page,
  size = 6,
  tone = 'butter',
}: {
  at?: Pt3;
  page?: Pt;
  size?: number;
  tone?: 'butter' | 'cherry' | 'paper';
}) {
  const { cam } = useIso();
  const [x, y] = page ?? (at ? project(cam, ...at) : [0, 0]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={sparklePath(size)}
        className={`iso-sparkle iso-sparkle--${tone}`}
        style={{ animationDelay: `${-((x * 7 + y * 3) % 26) / 10}s` }}
      />
    </g>
  );
}

export interface TagProps {
  /** Where the tag points, in the world. */
  at: Pt3;
  /** Offset of the tag from that point, on the page. */
  dx?: number;
  dy?: number;
  children: string;
  /** Small line above the label. */
  kicker?: string;
  tone?: 'paper' | 'cherry' | 'cocoa';
}

/** A floating label card that points at something in the drawing. */
export function Tag({ at, dx = 0, dy = -40, children, kicker, tone = 'paper' }: TagProps) {
  const { cam } = useIso();
  const [px, py] = project(cam, ...at);
  const fs = 11;
  const w = Math.max(children.length * fs * 0.56, (kicker?.length ?? 0) * 8 * 0.62) + 22;
  const h = kicker ? 36 : 24;
  const x = px + dx;
  const y = py + dy;
  return (
    <g className={`iso-tag iso-tag--${tone}`}>
      <path d={`M${px} ${py}L${x} ${y + h / 2}`} className="iso-tag__stem" />
      <circle cx={px} cy={py} r="2.4" className="iso-tag__dot" />
      <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
        <rect x="2.5" y="2.5" width={w} height={h} rx={h / 2} className="iso-tag__shadow" />
        <rect width={w} height={h} rx={h / 2} className="iso-tag__card" />
        {kicker && (
          <text x={w / 2} y="14" textAnchor="middle" className="iso-tag__kicker">
            {kicker}
          </text>
        )}
        <text x={w / 2} y={kicker ? 28 : 16} textAnchor="middle" className="iso-tag__text">
          {children}
        </text>
      </g>
    </g>
  );
}

/** Lands with the others when the drawing scrolls into view; `i` sets the order. */
export function Drop({ i = 0, children, from = 28 }: { i?: number; children: ReactNode; from?: number }) {
  return (
    <g className="iso-drop" style={{ '--i': i, '--from': `${-from}px` } as CSSProperties}>
      {children}
    </g>
  );
}

/** Bobs gently, for things that hover. */
export function Float({ children, delay = 0, amp = 5 }: { children: ReactNode; delay?: number; amp?: number }) {
  return (
    <g className="iso-float" style={{ '--delay': `${delay}s`, '--amp': `${-amp}px` } as CSSProperties}>
      {children}
    </g>
  );
}
