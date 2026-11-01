// Isometric geometry for the site's illustrations: project a point in the world (x to the right-front, y to the
// left-front, z up) onto the page, build the outlines of rounded slabs and cylinders, and find the silhouette
// of an extruded shape. Everything is plain math so the drawings stay crisp SVG at any size.

export type Pt = readonly [number, number];
export type Pt3 = readonly [number, number, number];

/** cos 30° and sin 30°: the classic isometric angles. */
export const C = Math.cos(Math.PI / 6);
export const S = 0.5;

/** A camera: world units → page pixels (`k`), and where the world's origin lands on the page. */
export interface Camera {
  k: number;
  ox: number;
  oy: number;
}

export const project = (cam: Camera, x: number, y: number, z: number): Pt => [
  cam.ox + (x - y) * C * cam.k,
  cam.oy + ((x + y) * S - z) * cam.k,
];

/** Outline of a rounded rectangle in the floor plane, in order, starting at the back corner. */
export function roundedRect(x: number, y: number, w: number, d: number, r: number, seg = 5): [number, number][] {
  const rr = Math.max(0, Math.min(r, w / 2, d / 2));
  const corners: [number, number, number][] = [
    [x + w - rr, y + rr, -90],
    [x + w - rr, y + d - rr, 0],
    [x + rr, y + d - rr, 90],
    [x + rr, y + rr, 180],
  ];
  const out: [number, number][] = [];
  for (const [cx, cy, start] of corners) {
    for (let i = 0; i <= seg; i++) {
      const a = ((start + (90 * i) / seg) * Math.PI) / 180;
      out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
  }
  return out;
}

/** Outline of a circle in the floor plane. */
export function circle(cx: number, cy: number, r: number, seg = 40): [number, number][] {
  return Array.from({ length: seg }, (_, i) => {
    const a = (i / seg) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as [number, number];
  });
}

const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/** Convex hull (Andrew's monotone chain): the silhouette of an extruded convex shape. */
export function hull(points: Pt[]): Pt[] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) return pts;
  const lower: Pt[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: Pt[] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i]!;
    while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return [...lower, ...upper];
}

const n = (v: number) => Math.round(v * 100) / 100;

/** A closed SVG path through points. */
export const path = (points: readonly Pt[]) =>
  points.length ? `M${points.map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}Z` : '';

/** An open SVG path through points. */
export const line = (points: readonly Pt[]) =>
  points.length ? `M${points.map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}` : '';

/**
 * SVG transforms that lay a flat, 2D drawing onto a face of the world, so a name can be piped onto the top of
 * a cake or a label printed on the side of a box. Inside, one unit is one world unit.
 * - `top`: the floor plane at height z, u along x and v along y.
 * - `left`: the left-front face (the plane y = const), u along x, v downwards.
 * - `right`: the right-front face (the plane x = const), u along -y (left to right on the page), v downwards.
 */
export function faceMatrix(cam: Camera, face: 'top' | 'left' | 'right', at: Pt3): string {
  const [sx, sy] = project(cam, ...at);
  const k = cam.k;
  const m =
    face === 'top' ? [C * k, S * k, -C * k, S * k] : face === 'left' ? [C * k, S * k, 0, k] : [C * k, -S * k, 0, k];
  return `matrix(${m.map(n).join(' ')} ${n(sx)} ${n(sy)})`;
}
