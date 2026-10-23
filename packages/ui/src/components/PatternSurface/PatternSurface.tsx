import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

/** Patterns seen on the bakesbymom board (stripe kinds from pin 09). */
export type Pattern = 'stripes' | 'pinstripe' | 'stripes-dotted' | 'stripes-wavy' | 'gingham' | 'checker' | 'grid' | 'dots';

export const PATTERNS: readonly Pattern[] = [
  'stripes',
  'pinstripe',
  'stripes-dotted',
  'stripes-wavy',
  'gingham',
  'checker',
  'grid',
  'dots',
];

export interface PatternSurfaceProps extends HTMLAttributes<HTMLElement> {
  pattern: Pattern;
  /** Flavor of the pattern ink. */
  tone?: Tone;
  /** Ground color behind the pattern (any CSS color). Defaults to the paper surface. */
  ground?: string;
  /** `xl` gives the wide 64px stripes of the process section (pin 02). */
  scale?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'section' | 'aside' | 'header' | 'footer' | 'span';
  children?: ReactNode;
}

/**
 * Paints one of the board's patterns from tokens: stripes (pins 02, 07, 16),
 * pinstripes (15), dotted and wavy stripes (09), gingham (12), checker (05, 15),
 * graph paper (08, 15) and polka dots (05). Pure CSS, so it scales to any size
 * and recolors with `tone`. Keep patterns behind photos, labels and edges,
 * never behind paragraphs.
 */
export function PatternSurface({
  pattern,
  tone = 'pink',
  ground,
  scale = 'md',
  as: Element = 'div',
  className,
  style,
  children,
  ...rest
}: PatternSurfaceProps) {
  const vars = ground ? ({ ...style, '--bbm-pattern-ground': ground } as CSSProperties) : style;
  return (
    <Element
      {...rest}
      style={vars}
      data-bbm-tone={tone}
      data-pattern={pattern}
      data-scale={scale}
      className={cx('bbm-pattern', className)}
    >
      {children}
    </Element>
  );
}
