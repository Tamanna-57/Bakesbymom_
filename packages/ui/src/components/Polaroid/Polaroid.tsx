import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { scallopCirclePath } from '../../utils/shapes';
import type { Tone } from '../../utils/types';
import type { Pattern } from '../PatternSurface/PatternSurface';

export interface PolaroidProps extends HTMLAttributes<HTMLElement> {
  src: string;
  /** Describe the photo, or pass "" if it's purely decorative. */
  alt: string;
  /** Handwritten caption (set in the hand font). */
  caption?: ReactNode;
  /** A strip of tape across the top: plain washi, gingham or cherry. */
  tape?: boolean | 'plain' | 'gingham' | 'cherry';
  /** Tilt in degrees (default -2). */
  rotate?: number;
  /**
   * `polaroid` = white instant-photo border with tape (pins 10, 11); `scallop` = the photo cut
   * with a scalloped edge (pin 05); `pattern` = printed border (pin 12); `flower` = flower-shaped
   * avatar (pin 07); `cartouche` = ornate frame (pin 13).
   */
  frame?: 'polaroid' | 'scallop' | 'pattern' | 'flower' | 'cartouche';
  /** Pattern for `frame="pattern"`. */
  pattern?: Pattern;
  tone?: Tone;
  /** Photo aspect ratio. */
  aspect?: '1/1' | '4/5' | '3/4' | '4/3';
  /** CSS width of the whole frame. */
  width?: string | number;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}

const svgMask = (viewBox: string, d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' preserveAspectRatio='none'><path d='${d}'/></svg>`,
  )}")`;

const MASKS: Partial<Record<NonNullable<PolaroidProps['frame']>, string>> = {
  flower: svgMask('0 0 100 100', scallopCirclePath(50, 50, 49, 8, 1.15)),
  cartouche: svgMask(
    '0 0 100 120',
    'M50 2C58 10 66 12 76 9C80 18 88 22 98 22V98C88 98 80 102 76 111C66 108 58 110 50 118C42 110 34 108 24 111C20 102 12 98 2 98V22C12 22 20 18 24 9C34 12 42 10 50 2Z',
  ),
};

/** A photo presented as a physical object: an instant photo, a scalloped cut-out or a print-framed picture. */
export function Polaroid({
  src,
  alt,
  caption,
  tape = false,
  rotate = -2,
  frame = 'polaroid',
  pattern = 'gingham',
  tone = 'pink',
  aspect = '1/1',
  width,
  imgProps,
  className,
  style,
  ...rest
}: PolaroidProps) {
  const tapeStyle = tape === true ? 'plain' : tape;
  const vars = {
    ...style,
    '--_rotate': `${rotate}deg`,
    '--_aspect': frame === 'flower' ? '1/1' : frame === 'cartouche' ? '5/6' : aspect,
    width: typeof width === 'number' ? `${width}px` : width,
    '--_mask': MASKS[frame],
  } as CSSProperties;

  // figure > [tape] > frame > img, then figcaption last (valid figure content model).
  return (
    <figure
      {...rest}
      data-bbm-tone={tone}
      className={cx('bbm-polaroid', `bbm-polaroid--${frame}`, className)}
      style={vars}
    >
      {tapeStyle && (
        <span className={cx('bbm-polaroid__tape', `bbm-polaroid__tape--${tapeStyle}`)} aria-hidden="true" />
      )}
      <div
        className={cx('bbm-polaroid__frame', frame === 'pattern' && 'bbm-pattern')}
        data-pattern={frame === 'pattern' ? pattern : undefined}
      >
        <img {...imgProps} className="bbm-polaroid__photo" src={src} alt={alt} loading={imgProps?.loading ?? 'lazy'} />
      </div>
      {caption && <figcaption className="bbm-polaroid__caption">{caption}</figcaption>}
    </figure>
  );
}
