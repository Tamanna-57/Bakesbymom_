import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { EdgeDivider } from '../EdgeDivider/EdgeDivider';
import { Logo } from '../Logo/Logo';

export interface NavLink {
  label: string;
  href: string;
  /** Marks the link as the current page (aria-current). */
  current?: boolean;
}

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  logoHref?: string;
  links?: NavLink[];
  /** Right-side actions, typically an "Order now" <Button size="sm">. */
  actions?: ReactNode;
  /** Thin promo strip above the bar ("Free local delivery over $40"). */
  announcement?: ReactNode;
  /** `bar` = full-width band; `capsule` = the whole nav inside one outlined pill (Emily Jane). */
  variant?: 'bar' | 'capsule';
  /** `center` = links left, logo centered; `start` = logo left, links right. */
  layout?: 'center' | 'start';
  /** Scalloped bottom edge (Nectar). Bar variant only. */
  scallop?: boolean;
  /** Accessible name of the navigation landmark. */
  navLabel?: string;
}

/** Site header with announcement strip, logo, navigation, actions and a mobile menu. */
export function SiteHeader({
  logo = <Logo size="sm" />,
  logoHref = '/',
  links = [],
  actions,
  announcement,
  variant = 'bar',
  layout = 'center',
  scallop = false,
  navLabel = 'Main',
  className,
  ...rest
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navId = `bbm-nav-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <header {...rest} className={cx('bbm-header', `bbm-header--${variant}`, `bbm-header--${layout}`, className)}>
      {announcement && <div className="bbm-header__announcement">{announcement}</div>}
      <div className="bbm-header__shell">
        <div className="bbm-header__bar">
          <a className="bbm-header__logo" href={logoHref}>
            {logo}
          </a>
          {links.length > 0 && (
            <nav id={navId} aria-label={navLabel} className={cx('bbm-header__nav', open && 'bbm-header__nav--open')}>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} aria-current={link.current ? 'page' : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="bbm-header__actions">
            {actions}
            {links.length > 0 && (
              <button
                type="button"
                className="bbm-header__toggle"
                aria-expanded={open}
                aria-controls={navId}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="bbm-visually-hidden">Menu</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  {open ? (
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {scallop && variant === 'bar' && <EdgeDivider shape="scallop" size="sm" color="var(--bbm-color-bg-surface)" />}
    </header>
  );
}
