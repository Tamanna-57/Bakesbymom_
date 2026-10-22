import { describe, expect, it } from 'vitest';
import { EDGE_SHAPES } from '../components/EdgeDivider/EdgeDivider';
import { edgeTile, scallopCirclePath } from './shapes';

describe('shape generators', () => {
  it('scallopCirclePath puts every vertex on one circle inside the requested radius', () => {
    const d = scallopCirclePath(50, 50, 49, 9);
    expect(d.startsWith('M')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    // Vertices: the M point plus the endpoint (last two numbers) of each arc command.
    const segments = d.slice(1, -1).split('A');
    expect(segments).toHaveLength(10);
    const vertices = segments.map((segment) => segment.trim().split(/\s+/).slice(-2).map(Number) as [number, number]);
    const radii = vertices.map(([x, y]) => Math.hypot(x - 50, y - 50));
    for (const r of radii) {
      expect(r).toBeLessThan(49);
      expect(r).toBeCloseTo(radii[0]!, 1);
    }
  });

  it.each(EDGE_SHAPES)('%s tile has positive size and valid paths', (shape) => {
    const tile = edgeTile(shape, 14);
    expect(tile.width).toBeGreaterThan(0);
    expect(tile.height).toBeGreaterThan(0);
    expect(tile.fills.length).toBeGreaterThan(0);
    for (const fill of tile.fills) expect(fill.d).toMatch(/^M[^NaN]*Z$/);
    expect(tile.edge).toMatch(/^M/);
    expect(tile.edge).not.toContain('NaN');
  });
});
