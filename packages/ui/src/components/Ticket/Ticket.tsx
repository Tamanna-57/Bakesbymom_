import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface TicketProps extends HTMLAttributes<HTMLElement> {
  /** `ticket` has side notches and an optional stub; `stamp` has a perforated postage edge. */
  variant?: 'ticket' | 'stamp';
  tone?: Tone;
  fill?: 'soft' | 'solid';
  /** Tear-off stub content, set vertically (dates, "ADMIT ONE"). Ticket variant only. */
  stub?: ReactNode;
  /** Draw a cocoa outline around the shape. */
  outline?: boolean;
  /** Tilt in degrees for a stamped-on look. */
  rotate?: number;
  as?: 'div' | 'article' | 'section' | 'aside' | 'li';
  children: ReactNode;
}

/** Paper ephemera: an admission ticket or a postage stamp, for gift cards, classes, steps and dates. */
export function Ticket({
  variant = 'ticket',
  tone = 'blueberry',
  fill = 'soft',
  stub,
  outline = true,
  rotate,
  as: Element = 'div',
  className,
  style,
  children,
  ...rest
}: TicketProps) {
  return (
    <Element
      {...rest}
      style={rotate ? { ...style, rotate: `${rotate}deg` } : style}
      className={cx('bbm-ticket', `bbm-ticket--${variant}`, outline && 'bbm-ticket--outline', className)}
    >
      <div className={cx('bbm-ticket__body', `bbm-ticket__body--${fill}`)} data-bbm-tone={tone}>
        <div className="bbm-ticket__main">{children}</div>
        {variant === 'ticket' && stub && <div className="bbm-ticket__stub">{stub}</div>}
      </div>
    </Element>
  );
}
