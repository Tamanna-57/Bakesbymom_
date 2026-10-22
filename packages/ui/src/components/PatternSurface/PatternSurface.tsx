import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export type Pattern = 'stripes' | 'pinstripe' | 'gingham' | 'checker' | 'grid' | 'dots';

export const PATTERNS: readonly Pattern[] = ['stripes', 'pinstripe', 'gingham', 'checker', 'grid', 'dots'];

export interface PatternSurfaceProps extends HTMLAttributes<HTMLElement> {
  pattern: Pattern;
  /** Flavor of the pattern ink. */
  tone?: Tone;
  /** Ground color behind the pattern (any CSS color). Defaults to paper cream. */
  ground?: string;
  scale?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'section' | 'aside' | 'header' | 'footer' | 'span';
  children?: ReactNode;
}

/**
 * Paints one of the signature bakery patterns (cabana stripes, pinstripes,
 * gingham, checkerboard, graph paper, polka dots) from tokens. Pure CSS, so it
 * scales to any size and recolors with `tone`.
 */
export function PatternSurface({
  pattern,
  tone = 'strawberry',
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
