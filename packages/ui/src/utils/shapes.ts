/**
 * SVG path generators for the system's signature shapes. Pure functions so
 * they can be reused by email or social templates outside React.
 */

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * A circle whose outline is made of `bumps` outward arcs: a scalloped seal at
 * high counts, a flower at ~8 and a cloud at ~6. The shape is scaled to fit
 * inside a circle of radius `fit` centered on (cx, cy).
 */
export function scallopCirclePath(cx: number, cy: number, fit: number, bumps: number, bulge = 1): string {
  const half = Math.PI / bumps;
  // Sagitta of an arc with radius `ar` over a chord of length `c`: ar - sqrt(ar² - (c/2)²).
  const unitChord = 2 * Math.sin(half);
  const unitArc = (unitChord / 2) * bulge;
  const unitSagitta = unitArc - Math.sqrt(Math.max(unitArc ** 2 - (unitChord / 2) ** 2, 0));
  const r = fit / (Math.cos(half) + unitSagitta);
  const arc = round(unitArc * r);

  const points = Array.from({ length: bumps }, (_, i) => {
    const a = (i / bumps) * Math.PI * 2 - Math.PI / 2;
    return `${round(cx + r * Math.cos(a))} ${round(cy + r * Math.sin(a))}`;
  });
  const arcs = points.map((_, i) => `A${arc} ${arc} 0 0 1 ${points[(i + 1) % bumps]}`);
  return `M${points[0]} ${arcs.join(' ')}Z`;
}

/** Section edges seen on the bakesbymom board. */
export type EdgeShape = 'scallop' | 'wave' | 'torn' | 'dots' | 'checker';

export interface EdgeTile {
  width: number;
  height: number;
  /** Filled regions; `alt` paints with the divider's secondary color. */
  fills: Array<{ d: string; alt?: boolean }>;
  /** Open path along the visible edge, used for the optional outline. */
  edge: string;
}

/**
 * One repeatable tile of a section edge. Tiles hang downward from y = 0
 * (the section above) and are mirrored by the component when flipped.
 */
export function edgeTile(shape: EdgeShape, unit: number): EdgeTile {
  const u = unit;
  switch (shape) {
    case 'scallop': {
      const w = u * 2;
      return {
        width: w,
        height: u,
        fills: [{ d: `M${w} -2V0A${u} ${u} 0 0 1 0 0V-2Z` }],
        edge: `M${w} 0A${u} ${u} 0 0 1 0 0`,
      };
    }
    case 'wave': {
      const w = u * 6;
      const h = u;
      const m = h / 2;
      const curve = `Q${w * 0.75} ${m + h} ${w / 2} ${m}T0 ${m}`;
      return { width: w, height: h, fills: [{ d: `M0 -2H${w}V${m}${curve}Z` }], edge: `M${w} ${m}${curve}` };
    }
    case 'torn': {
      // Hand-placed jagged points, scaled to the unit. Start and end match so tiles join seamlessly.
      const pts = [
        [0, 6],
        [9, 8],
        [20, 11],
        [31, 8],
        [43, 14],
        [55, 9],
        [66, 13],
        [78, 7],
        [90, 12],
        [101, 8],
        [113, 15],
        [125, 9],
        [137, 11],
        [148, 6],
        [160, 12],
        [171, 8],
        [184, 14],
        [196, 9],
        [207, 13],
        [219, 7],
        [228, 10],
        [240, 6],
      ] as const;
      const s = u / 16;
      const line = pts.map(([x, y]) => `${round(x * s)} ${round(y * s)}`).join('L');
      return {
        width: round(240 * s),
        height: u,
        fills: [{ d: `M0 -2H${round(240 * s)}V${round(6 * s)}L${line.split('L').reverse().join('L')}Z` }],
        edge: `M${line}`,
      };
    }
    case 'checker': {
      // Two rows of alternating squares (the checker strips on pins 05 and 15).
      const w = u * 2;
      return {
        width: w,
        height: w,
        fills: [{ d: `M0 0H${u}V${u}H0Z` }, { d: `M${u} ${u}H${w}V${w}H${u}Z` }, { d: `M${u} 0H${w}V${u}H${u}Z`, alt: true }, { d: `M0 ${u}H${u}V${w}H0Z`, alt: true }],
        edge: `M0 ${w}H${w}`,
      };
    }
    case 'dots': {
      const r = u;
      const w = r * 3;
      return {
        width: w,
        height: r,
        fills: [{ d: `M${r / 2} 0A${r} ${r} 0 0 0 ${r * 2.5} 0Z` }],
        edge: `M${r / 2} 0A${r} ${r} 0 0 0 ${r * 2.5} 0`,
      };
    }
  }
}
