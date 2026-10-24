import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Doodle } from '../Doodle/Doodle';
import { Seal } from '../Seal/Seal';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `horizontal` (primary) for headers; `stacked` for footers and square spaces; `seal` for box
   * stickers and the chat launcher; `monogram` for favicons and tiny avatars. See the brand kit.
   */
  variant?: 'horizontal' | 'stacked' | 'seal' | 'monogram';
  size?: 'sm' | 'md' | 'lg';
  /** `brand` (cherry), `ink` (cocoa) or `inverse` (cream, for dark bands). */
  tone?: 'brand' | 'ink' | 'inverse';
}

const SEAL_SIZES = { sm: 96, md: 136, lg: 184 } as const;

/**
 * The Bakes by Mom wordmark: "Bakes" in soft Fraunces, "by Mom" in formal
 * script, plus a heart (design/board/brand-kit.md, "Logo").
 */
export function Logo({ variant = 'horizontal', size = 'md', tone = 'brand', className, ...rest }: LogoProps) {
  if (variant === 'seal') {
    return (
      <span {...rest} className={cx('bbm-logo', 'bbm-logo--seal', className)}>
        <Seal
          text="Bakes by Mom • Baked with love • "
          label="Bakes by Mom, baked with love"
          size={SEAL_SIZES[size]}
          tone={tone === 'inverse' ? 'beige' : 'cherry'}
        >
          <span className="bbm-logo__seal-mark">
            <span className="bbm-logo__bakes">Bakes</span>
            <span className="bbm-logo__by">by Mom</span>
          </span>
        </Seal>
      </span>
    );
  }

  if (variant === 'monogram') {
    return (
      <span
        {...rest}
        role="img"
        aria-label="Bakes by Mom"
        className={cx('bbm-logo', 'bbm-logo--monogram', `bbm-logo--${size}`, `bbm-logo--${tone}`, className)}
      >
        <span aria-hidden="true">BM</span>
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
