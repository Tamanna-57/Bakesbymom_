import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'aside' | 'li';
  /** `paper` (default) is the cream card surface; flavors use their tone. */
  tone?: Tone | 'paper';
  /** `soft` uses the tone tint; `solid` the tone fill (dark for cocoa, pistachio, cherry). */
  fill?: 'soft' | 'solid';
  /** `true` = 1.5px cocoa sticker outline; `'brand'` = heavy cherry frame. */
  outline?: boolean | 'brand';
  /** Outline + hard offset shadow, as if the card were a sticker. */
  sticker?: boolean;
  /** `scallop` gives cookie-cutter edges (works with outline and sticker). */
  shape?: 'rounded' | 'scallop';
  /** `stripes` wraps the content in a candy-stripe airmail border. */
  frame?: 'none' | 'stripes';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Tilt in degrees for a hand-placed look (keep within ±3). */
  rotate?: number;
  children?: ReactNode;
}

export function Card({
  as: Element = 'div',
  tone = 'paper',
  fill = 'soft',
  outline = false,
  sticker = false,
  shape = 'rounded',
  frame = 'none',
  padding = 'md',
  rotate,
  className,
  style,
  children,
  ...rest
}: CardProps) {
  const toneAttr = tone === 'paper' ? undefined : tone;
  const tilt: CSSProperties | undefined = rotate ? { ...style, rotate: `${rotate}deg` } : style;
  const surface = cx('bbm-card', `bbm-card--pad-${padding}`, toneAttr && `bbm-card--${fill}`);

  // Masked shapes and frames need two layers: the outer element carries the
  // semantics, outline filter and frame; the inner one carries the surface.
  if (shape === 'scallop') {
    return (
      <Element
        {...rest}
        style={tilt}
        className={cx(
          'bbm-card-scallop',
          (outline || sticker) && 'bbm-card-scallop--outline',
          sticker && 'bbm-card-scallop--sticker',
          className,
        )}
      >
        <div className={cx(surface, 'bbm-card--scallop')} data-bbm-tone={toneAttr}>
          {children}
        </div>
      </Element>
    );
  }

  if (frame === 'stripes') {
    return (
      <Element
        {...rest}
        style={tilt}
        data-bbm-tone={toneAttr ?? 'butter'}
        className={cx(
          'bbm-card-frame',
          outline === 'brand' ? 'bbm-card--outline-brand' : (outline || sticker) && 'bbm-card--outline',
          sticker && 'bbm-card--sticker',
          className,
        )}
      >
        <div className={cx('bbm-card', `bbm-card--pad-${padding}`)}>{children}</div>
      </Element>
    );
  }

  return (
    <Element
      {...rest}
      style={tilt}
      data-bbm-tone={toneAttr}
      className={cx(
        surface,
        outline === 'brand' ? 'bbm-card--outline-brand' : (outline || sticker) && 'bbm-card--outline',
        sticker && 'bbm-card--sticker',
        className,
      )}
    >
      {children}
    </Element>
  );
}
