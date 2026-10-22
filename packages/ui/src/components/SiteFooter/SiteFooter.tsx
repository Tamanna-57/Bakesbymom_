import { useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { EdgeDivider } from '../EdgeDivider/EdgeDivider';
import { TextField } from '../Field/TextField';
import { Logo } from '../Logo/Logo';

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterNewsletter {
  title: ReactNode;
  description?: ReactNode;
  buttonLabel?: string;
  /** Called with the email on submit. Return a promise to show a loading state. */
  onSubmit?: (email: string) => void | Promise<void>;
  /** Message shown after a successful submit. */
  successMessage?: ReactNode;
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  tagline?: ReactNode;
  columns?: FooterColumn[];
  newsletter?: FooterNewsletter;
  /** Small print: copyright, cottage-food license number, allergen notice. */
  bottom?: ReactNode;
  /** Decorative top edge. */
  edge?: 'scallop' | 'wave' | 'none';
}

function Newsletter({ title, description, buttonLabel = 'Subscribe', onSubmit, successMessage }: FooterNewsletter) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    setStatus('sending');
    try {
      await onSubmit?.(String(email ?? ''));
      setStatus('done');
    } catch {
      setStatus('idle');
    }
  }

  return (
    <div className="bbm-footer__newsletter">
      <p className="bbm-footer__newsletter-title">{title}</p>
      {description && <p className="bbm-footer__newsletter-text">{description}</p>}
      {status === 'done' ? (
        <p className="bbm-footer__newsletter-done" role="status">
          {successMessage ?? 'Thank you! Check your inbox for a sweet hello.'}
        </p>
      ) : (
        <form className="bbm-footer__form" onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
          <Button type="submit" variant="soft" loading={status === 'sending'}>
            {buttonLabel}
          </Button>
        </form>
      )}
    </div>
  );
}

/** Cocoa footer with logo, link columns, newsletter sign-up and small print. */
export function SiteFooter({
  logo = <Logo tone="inverse" />,
  tagline,
  columns = [],
  newsletter,
  bottom,
  edge = 'scallop',
  className,
  ...rest
}: SiteFooterProps) {
  return (
    <footer {...rest} className={cx('bbm-footer', className)}>
      {edge !== 'none' && (
        <EdgeDivider shape={edge} flip color="var(--bbm-color-bg-inverse)" className="bbm-footer__edge" />
      )}
      <div className="bbm-footer__body">
        <div className="bbm-footer__grid">
          <div className="bbm-footer__brand">
            {logo}
            {tagline && <p className="bbm-footer__tagline">{tagline}</p>}
          </div>
          {columns.map((column) => (
            <nav key={column.title} className="bbm-footer__column" aria-label={column.title}>
              <p className="bbm-footer__column-title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {newsletter && <Newsletter {...newsletter} />}
        </div>
        {bottom && <div className="bbm-footer__bottom">{bottom}</div>}
      </div>
    </footer>
  );
}
