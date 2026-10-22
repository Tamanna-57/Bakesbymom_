import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import type { Pattern } from '../PatternSurface/PatternSurface';

export interface PolaroidProps extends HTMLAttributes<HTMLElement> {
  src: string;
  /** Describe the photo, or pass "" if it's purely decorative. */
  alt: string;
  /** Handwritten caption (set in the script face). */
  caption?: ReactNode;
  /** A strip of tape across the top: plain washi, gingham or cherry. */
  tape?: boolean | 'plain' | 'gingham' | 'cherry';
  /** Tilt in degrees (default -2). */
  rotate?: number;
  /** `polaroid` = white instant-photo border, `scallop` = cookie-edged frame, `pattern` = printed border. */
  frame?: 'polaroid' | 'scallop' | 'pattern';
  /** Pattern for `frame="pattern"`. */
  pattern?: Pattern;
  tone?: Tone;
  /** Photo aspect ratio. */
  aspect?: '1/1' | '4/5' | '3/4' | '4/3';
  /** CSS width of the whole frame. */
  width?: string | number;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}

/** A photo presented as a physical object: an instant photo, a scalloped cut-out or a print-framed picture. */
export function Polaroid({
  src,
  alt,
  caption,
  tape = false,
  rotate = -2,
  frame = 'polaroid',
  pattern = 'gingham',
  tone = 'strawberry',
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
    '--_aspect': aspect,
    width: typeof width === 'number' ? `${width}px` : width,
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
