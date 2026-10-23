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
  /**
   * - `cards`: each question its own outlined card with a sticker and a plus (pin 02). The FAQ lead.
   * - `pills`: fully rounded rows with an arrow in a circle (pin 08); also the chatbot's quick questions.
   * - `rows`: a hairline list (pin 01's specials).
   */
  variant?: 'cards' | 'pills' | 'rows';
  tone?: Tone;
  /** Split into two independent columns, so an open card only pushes its own column down. */
  columns?: 1 | 2;
  /** Only one item open at a time, per column (native exclusive <details name>). */
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
  variant = 'cards',
  tone = variant === 'pills' ? 'blue' : 'pink',
  columns = 1,
  exclusive = false,
  defaultOpen = [],
  className,
  ...rest
}: AccordionProps) {
  const group = `bbm-accordion-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const split = columns === 2 ? Math.ceil(items.length / 2) : items.length;
  const cols = columns === 2 ? [items.slice(0, split), items.slice(split)] : [items];

  const renderItem = (item: AccordionItem, index: number, col: number) => (
    <details
      key={index}
      className="bbm-accordion__item"
      name={exclusive ? `${group}-${col}` : undefined}
      open={defaultOpen.includes(index) || undefined}
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
  );

  return (
    <div
      {...rest}
      data-bbm-tone={tone}
      className={cx('bbm-accordion', `bbm-accordion--${variant}`, columns === 2 && 'bbm-accordion--2col', className)}
    >
      {columns === 2
        ? cols.map((col, c) => (
            <div className="bbm-accordion__col" key={c}>
              {col.map((item, i) => renderItem(item, c * split + i, c))}
            </div>
          ))
        : items.map((item, i) => renderItem(item, i, 0))}
    </div>
  );
}
