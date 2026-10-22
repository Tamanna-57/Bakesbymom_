import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** `soft` (tinted), `solid` (filled) or `outline`. */
  variant?: 'soft' | 'solid' | 'outline';
  /**
   * `pill` for tags and chips, `tape` for a stamped label ("TODAY ONLY", dates),
   * `tab` for an offer tab with a flat leading edge.
   */
  shape?: 'pill' | 'tape' | 'tab';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({
  tone = 'cherry',
  variant = 'soft',
  shape = 'pill',
  size = 'md',
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      data-bbm-tone={tone}
      className={cx('bbm-badge', `bbm-badge--${variant}`, `bbm-badge--${shape}`, `bbm-badge--${size}`, className)}
    >
      {icon && (
        <span className="bbm-badge__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
