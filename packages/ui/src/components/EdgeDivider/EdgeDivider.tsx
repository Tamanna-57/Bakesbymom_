import { useId, type CSSProperties, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { edgeTile, type EdgeShape } from '../../utils/shapes';

export type { EdgeShape };

export const EDGE_SHAPES: readonly EdgeShape[] = ['scallop', 'wave', 'torn', 'dots', 'checker'];

const UNITS = { sm: 8, md: 14, lg: 22 } as const;

export interface EdgeDividerProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'> {
  shape?: EdgeShape;
  /** Fill of the shape: normally the color of the section it hangs from. Any CSS color or token var. */
  color?: string;
  /** Second color for the checker strip. */
  altColor?: string;
  /** What shows between the shapes: normally the next section's color. */
  background?: string;
  /** Point the shapes upward (for the top edge of a section). */
  flip?: boolean;
  size?: keyof typeof UNITS;
  /** Draws a cocoa line along the edge (`true`) or in the given color. */
  outline?: boolean | string;
}

/**
 * A decorative section edge from the board: scallops (pins 01, 03, 04, 15),
 * waves (06), torn paper (08), half-dot trim (02, 05) or a checker strip
 * (05, 15), drawn as a repeating SVG pattern. Always decorative, so it is
 * hidden from assistive technology.
 */
export function EdgeDivider({
  shape = 'scallop',
  color = 'currentColor',
  altColor = 'var(--bbm-color-bg-surface)',
  background = 'transparent',
  flip = false,
  size = 'md',
  outline = false,
  className,
  style,
  ...rest
}: EdgeDividerProps) {
  const patternId = `bbm-edge-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const tile = edgeTile(shape, UNITS[size]);
  const stroke = outline === true ? 'var(--bbm-color-border-default)' : outline || undefined;
  const height = tile.height + (stroke ? 1 : 0);
  const svgStyle: CSSProperties = { ...style, backgroundColor: background };

  return (
    <svg
      {...rest}
      className={cx('bbm-edge', flip && 'bbm-edge--flip', className)}
      width="100%"
      height={height}
      style={svgStyle}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={patternId} width={tile.width} height={height} patternUnits="userSpaceOnUse">
          {tile.fills.map((part, i) => (
            <path key={i} d={part.d} style={{ fill: part.alt ? altColor : color }} />
          ))}
          {stroke && <path d={tile.edge} fill="none" style={{ stroke }} strokeWidth={1.5} />}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
