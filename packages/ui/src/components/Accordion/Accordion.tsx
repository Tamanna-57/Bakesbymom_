import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
  /** Small sticker or doodle before the title. */
  icon?: ReactNode;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** `rows` = hairline list (Berloga specials); `pills` = tinted outlined rows (Pretty OK FAQ). */
  variant?: 'rows' | 'pills';
  tone?: Tone;
  /** Only one item open at a time (native exclusive <details name>). */
  exclusive?: boolean;
  /** Indexes of items open on first render. */
  defaultOpen?: number[];
}

/**
 * Disclosure list built on native <details>/<summary>, so it is keyboard and
 * screen-reader accessible, works without JavaScript and supports find-in-page.
 */
export function Accordion({
  items,
  variant = 'pills',
  tone = 'strawberry',
  exclusive = false,
  defaultOpen = [],
  className,
  ...rest
}: AccordionProps) {
  const group = `bbm-accordion-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <div {...rest} data-bbm-tone={tone} className={cx('bbm-accordion', `bbm-accordion--${variant}`, className)}>
      {items.map((item, i) => (
        <details
          key={i}
          className="bbm-accordion__item"
          name={exclusive ? group : undefined}
          open={defaultOpen.includes(i) || undefined}
        >
          <summary className="bbm-accordion__summary">
            {item.icon && (
              <span className="bbm-accordion__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="bbm-accordion__title">{item.title}</span>
            <span className="bbm-accordion__toggle" aria-hidden="true" />
          </summary>
          <div className="bbm-accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
