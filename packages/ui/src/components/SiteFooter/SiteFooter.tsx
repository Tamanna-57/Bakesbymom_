import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { EdgeDivider } from '../EdgeDivider/EdgeDivider';
import { Logo } from '../Logo/Logo';
import { NewsletterSignup, type NewsletterSignupProps } from '../NewsletterSignup/NewsletterSignup';

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterSocial {
  /** Accessible name, e.g. "Instagram". */
  label: string;
  href: string;
  icon: ReactNode;
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  /** Link columns, shown on the left. */
  columns?: FooterColumn[];
  /** Icon links under the logo. */
  socials?: FooterSocial[];
  /** Phone, email or address lines under the socials (pin 04). */
  contact?: ReactNode;
  /** The newsletter block on the right (the `inline` NewsletterSignup). */
  newsletter?: Omit<NewsletterSignupProps, 'variant'>;
  /** Small print: copyright and the allergen statement. Always include the allergen statement. */
  bottom?: ReactNode;
  /** Decorative top edge (wave from pin 06 by default). */
  edge?: 'wave' | 'scallop' | 'none';
}

/** Cocoa footer (pin 03): links left, the logo centered with socials and contact, the newsletter right. */
export function SiteFooter({
  logo = <Logo variant="stacked" tone="inverse" size="lg" />,
  columns = [],
  socials = [],
  contact,
  newsletter,
  bottom,
  edge = 'wave',
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
            {socials.length > 0 && (
              <ul className="bbm-footer__socials">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} aria-label={social.label}>
                      <span aria-hidden="true">{social.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {contact && <div className="bbm-footer__contact">{contact}</div>}
          </div>
          {columns.length > 0 && (
            <div className="bbm-footer__links">
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
            </div>
          )}
          {newsletter && (
            <div className="bbm-footer__newsletter">
              <NewsletterSignup {...newsletter} variant="inline" />
            </div>
          )}
        </div>
        {bottom && <div className="bbm-footer__bottom">{bottom}</div>}
      </div>
    </footer>
  );
}
