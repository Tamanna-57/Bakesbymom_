import type { CSSProperties, ReactNode, SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

export type DoodleName = 'sparkle' | 'heart' | 'cherry' | 'daisy' | 'star' | 'cupcake' | 'squiggle';

export const DOODLES: readonly DoodleName[] = ['sparkle', 'heart', 'cherry', 'daisy', 'star', 'cupcake', 'squiggle'];

export interface DoodleProps extends Omit<SVGAttributes<SVGSVGElement>, 'name' | 'color'> {
  name: DoodleName;
  /** Width in px or any CSS length. The squiggle is 4× wider than tall. */
  size?: number | string;
  /** Main ink: any CSS color. Defaults to the current text color. */
  color?: string;
  /** Secondary fill (leaf, frosting liner, daisy center). */
  accent?: string;
  /** Accessible name. Omit for decorative doodles (the default). */
  title?: string;
}

const INK = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const ART: Record<DoodleName, { viewBox: string; body: ReactNode }> = {
  sparkle: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fill="currentColor"
        d="M12 1.5c.6 4.7 2.3 7.6 4.9 9.1 1.4.8 3.2 1.2 5.6 1.4-2.4.2-4.2.6-5.6 1.4-2.6 1.5-4.3 4.4-4.9 9.1-.6-4.7-2.3-7.6-4.9-9.1C5.7 12.6 3.9 12.2 1.5 12c2.4-.2 4.2-.6 5.6-1.4 2.6-1.5 4.3-4.4 4.9-9.1z"
      />
    ),
  },
  heart: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fill="currentColor"
        {...INK}
        d="M12 21s-7.5-4.6-9.6-9.4C.9 7.8 3 4 6.6 4c2.2 0 3.9 1.2 5.4 3.2C13.5 5.2 15.2 4 17.4 4 21 4 23.1 7.8 21.6 11.6 19.5 16.4 12 21 12 21z"
      />
    ),
  },
  star: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fill="currentColor"
        {...INK}
        d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
      />
    ),
  },
  cherry: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path fill="none" {...INK} d="M7.5 13C8 9 10 5.8 14 3.2M16.6 12.2C16.2 9 15.4 5.8 14 3.2" />
        <path fill="var(--_doodle-accent)" {...INK} d="M14 3.2c1.8-1.6 4.8-1.6 6.6.2-1.8 1.4-4.8 1.4-6.6-.2z" />
        <circle cx="7.4" cy="17" r="4.4" fill="currentColor" />
        <circle cx="16.8" cy="16.2" r="4.4" fill="currentColor" />
        <ellipse cx="5.9" cy="15.6" rx="1" ry="1.4" fill="#fff" opacity=".6" />
        <ellipse cx="15.3" cy="14.8" rx="1" ry="1.4" fill="#fff" opacity=".6" />
      </>
    ),
  },
  daisy: {
    viewBox: '0 0 24 24',
    body: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="12"
            cy="6.2"
            rx="2.7"
            ry="4.4"
            fill="var(--bbm-color-bg-raised, #fff)"
            {...INK}
            strokeWidth={1.2}
            transform={`rotate(${i * 45} 12 12)`}
          />
        ))}
        <circle cx="12" cy="12" r="3" fill="var(--_doodle-accent)" {...INK} strokeWidth={1.2} />
      </>
    ),
  },
  cupcake: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path fill="var(--_doodle-accent)" {...INK} d="M5.8 13h12.4l-1.7 8.4H7.5z" />
        <path fill="none" {...INK} strokeWidth={1.2} d="M9.6 13.6l.5 7.2M12 13.6v7.2M14.4 13.6l-.5 7.2" />
        <path
          fill="var(--bbm-color-bg-raised, #fff)"
          {...INK}
          d="M5.2 13a3 3 0 0 1 1.3-5.3 3.6 3.6 0 0 1 6.4-2.1 3 3 0 0 1 4.6 2.3A2.7 2.7 0 0 1 18.8 13z"
        />
        <circle cx="13" cy="3.6" r="1.7" fill="currentColor" />
      </>
    ),
  },
  squiggle: {
    viewBox: '0 0 48 12',
    body: <path fill="none" {...INK} strokeWidth={2} d="M2 6c3-5 6-5 9 0s6 5 9 0 6-5 9 0 6 5 9 0 6-5 9 0" />,
  },
};

/**
 * Hand-drawn doodles in a single cocoa-ink style, matching the outlines of the
 * component system. Decorative by default; pass `title` to make one meaningful.
 */
export function Doodle({ name, size = 24, color, accent, title, className, style, ...rest }: DoodleProps) {
  const art = ART[name];
  const isWide = name === 'squiggle';
  const width = typeof size === 'number' ? `${size}px` : size;
  const vars = {
    ...style,
    color,
    '--_doodle-accent':
      accent ??
      (name === 'cherry'
        ? 'var(--bbm-color-pistachio-500)'
        : name === 'daisy'
          ? 'var(--bbm-color-butter-400)'
          : 'var(--bbm-color-strawberry-300)'),
  } as CSSProperties;

  return (
    <svg
      {...rest}
      viewBox={art.viewBox}
      className={cx('bbm-doodle', `bbm-doodle--${name}`, className)}
      style={{ ...vars, width, height: isWide ? `calc(${width} / 4)` : width }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {art.body}
    </svg>
  );
}
