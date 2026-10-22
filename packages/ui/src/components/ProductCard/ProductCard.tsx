import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { HeadingLevel, Tone } from '../../utils/types';

export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  image: { src: string; alt: string };
  /** Makes the whole card a link to the product. */
  href?: string;
  /** Display price, e.g. "$38", "From $70" or "$4 each". */
  price?: string;
  /** Show the price as a cherry pill (menu cards) instead of plain mono text. */
  pricePill?: boolean;
  /** Ingredients or a one-line description. */
  description?: ReactNode;
  /** Badge content shown on the photo ("Bestseller", "New"). Pass a <Badge>. */
  badge?: ReactNode;
  /** Photo frame: soft rounded, arch top, oval or circle cut-out. */
  imageShape?: 'rounded' | 'arch' | 'oval' | 'circle';
  /** `stack` = photo on top; `row` = compact list row with the photo on the side. */
  layout?: 'stack' | 'row';
  /** Small centered tile for category navigation (photo + name only). */
  compact?: boolean;
  /** Tint behind transparent product photos. */
  tone?: Tone;
  headingLevel?: HeadingLevel;
  /** Extra action, such as an "Add to box" button. Sits above the card link. */
  action?: ReactNode;
  as?: 'article' | 'li' | 'div';
}

function ArrowChip() {
  return (
    <span className="bbm-product__arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" focusable="false">
        <path
          d="M5 11 11 5M6 5h5v5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** A product or menu item: photo first, minimal chrome, honest pricing. */
export function ProductCard({
  name,
  image,
  href,
  price,
  pricePill = false,
  description,
  badge,
  imageShape = 'rounded',
  layout = 'stack',
  compact = false,
  tone = 'cream',
  headingLevel = 3,
  action,
  as: Element = 'article',
  className,
  ...rest
}: ProductCardProps) {
  const Heading = `h${headingLevel}` as const;
  const showFooter = !compact && (price || action || href);

  return (
    <Element
      {...rest}
      className={cx(
        'bbm-product',
        `bbm-product--${layout}`,
        compact && 'bbm-product--compact',
        href && 'bbm-product--linked',
        className,
      )}
    >
      <div className={cx('bbm-product__media', `bbm-product__media--${imageShape}`)} data-bbm-tone={tone}>
        <img className="bbm-product__image" src={image.src} alt={image.alt} loading="lazy" />
        {badge && <div className="bbm-product__badge">{badge}</div>}
      </div>
      <div className="bbm-product__body">
        <Heading className="bbm-product__name">
          {href ? (
            <a className="bbm-product__link" href={href}>
              {name}
            </a>
          ) : (
            name
          )}
        </Heading>
        {description && !compact && <div className="bbm-product__description">{description}</div>}
        {showFooter && (
          <div className="bbm-product__footer">
            {price && <p className={cx('bbm-product__price', pricePill && 'bbm-product__price--pill')}>{price}</p>}
            {action && <div className="bbm-product__action">{action}</div>}
            {href && !action && <ArrowChip />}
          </div>
        )}
      </div>
    </Element>
  );
}
