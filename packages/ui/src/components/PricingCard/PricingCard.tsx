import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { HeadingLevel, Tone } from '../../utils/types';
import { PriceTag } from '../PriceTag/PriceTag';

export interface PricingCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Package name, shown in a pill tab sitting on the top border. */
  title: string;
  /** Price on the hanging key tag, e.g. "$45". */
  price: string;
  /** What's included, one short line each. */
  features: ReactNode[];
  /** A full-width button, e.g. <Button fullWidth>Choose this cake</Button>. */
  action?: ReactNode;
  /** Fill the card baby blue to mark the top package (pin 08's third card). */
  featured?: boolean;
  /** Key tag color. */
  tagTone?: Tone;
  headingLevel?: HeadingLevel;
}

/** A package card with a pill title tab and a hanging key-tag price (pin 08). */
export function PricingCard({
  title,
  price,
  features,
  action,
  featured = false,
  tagTone = featured ? 'cherry' : 'blue',
  headingLevel = 3,
  className,
  ...rest
}: PricingCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article {...rest} className={cx('bbm-pricing', featured && 'bbm-pricing--featured', className)}>
      <Heading className="bbm-pricing__title">{title}</Heading>
      <PriceTag className="bbm-pricing__tag" shape="tag" amount={price} tone={tagTone} size={44} rotate={62} aria-hidden="true" />
      <p className="bbm-visually-hidden">Price: {price}</p>
      <ul className="bbm-pricing__features">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      {action && <div className="bbm-pricing__action">{action}</div>}
    </article>
  );
}
