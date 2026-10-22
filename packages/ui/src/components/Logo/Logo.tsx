import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Doodle } from '../Doodle/Doodle';
import { Seal } from '../Seal/Seal';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** `horizontal` for headers, `stacked` for square spaces, `seal` for stickers and packaging. */
  variant?: 'horizontal' | 'stacked' | 'seal';
  size?: 'sm' | 'md' | 'lg';
  /** `brand` (cherry), `ink` (cocoa) or `inverse` (cream, for dark bands). */
  tone?: 'brand' | 'ink' | 'inverse';
}

const SEAL_SIZES = { sm: 96, md: 136, lg: 184 } as const;

/**
 * The Bakes by Mom wordmark: "Bakes" in puffy Fraunces, "by Mom" in a
 * copperplate signature, plus a heart.
 */
export function Logo({ variant = 'horizontal', size = 'md', tone = 'brand', className, ...rest }: LogoProps) {
  if (variant === 'seal') {
    return (
      <span {...rest} className={cx('bbm-logo', 'bbm-logo--seal', className)}>
        <Seal
          text="Homemade with love • Baked fresh daily • "
          label="Bakes by Mom, homemade with love, baked fresh daily"
          size={SEAL_SIZES[size]}
          tone={tone === 'inverse' ? 'cream' : 'cherry'}
        >
          <span className="bbm-logo__seal-mark">
            <span className="bbm-logo__bakes">Bakes</span>
            <span className="bbm-logo__by">by Mom</span>
          </span>
        </Seal>
      </span>
    );
  }

  return (
    <span
      {...rest}
      role="img"
      aria-label="Bakes by Mom"
      className={cx('bbm-logo', `bbm-logo--${variant}`, `bbm-logo--${size}`, `bbm-logo--${tone}`, className)}
    >
      <span className="bbm-logo__bakes" aria-hidden="true">
        Bakes
      </span>
      <span className="bbm-logo__by" aria-hidden="true">
        by Mom
        <Doodle name="heart" size="0.42em" className="bbm-logo__heart" />
      </span>
    </span>
  );
}
