import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
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
  /** Icon buttons on the far right: search, the order box with a count. */
  actions?: ReactNode;
  /** Shown at the bottom of the mobile menu, e.g. a full-width "Order a cake" button. */
  mobileCta?: ReactNode;
  /**
   * One short line on a cocoa bar above the header (pin 13): "Order by Wednesday for Saturday pick-up". Pass a
   * list to rotate through them, one at a time, on a single line.
   */
  announcement?: ReactNode | ReactNode[];
  /** Let visitors close the announcement bar (remembered for the visit). */
  announcementDismissible?: boolean;
  /**
   * - `split`: links split evenly around a centered logo, actions far right (pin 15). The lead.
   * - `center`: links left, logo centered, actions right (pin 13).
   * - `start`: logo left, links and actions right.
   */
  layout?: 'split' | 'center' | 'start';
  /** `bar` = full-width band; `capsule` = the whole nav inside one outlined pill (pin 03). */
  variant?: 'bar' | 'capsule';
  /** Bar color. */
  tone?: 'pink' | 'beige' | 'blue' | 'surface';
  /** Scalloped bottom edge in the bar color (pin 15). Bar variant only. */
  scallop?: boolean;
  /** Keep the header at the top while scrolling. */
  sticky?: boolean;
  /** After 120px of scroll, shrink the bar into the capsule (implies `sticky`). */
  capsuleOnScroll?: boolean;
  /** Accessible name of the navigation landmark. */
  navLabel?: string;
}

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/** Announcement bar + site header with a scalloped pink bar, split navigation, actions and a mobile menu. */
export function SiteHeader({
  logo = <Logo size="sm" />,
  logoHref = '/',
  links = [],
  actions,
  mobileCta,
  announcement,
  announcementDismissible = true,
  layout = 'split',
  variant = 'bar',
  tone = 'pink',
  scallop = false,
  sticky = false,
  capsuleOnScroll = false,
  navLabel = 'Main',
  className,
  ...rest
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navId = `bbm-nav-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    if (!capsuleOnScroll) return;
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [capsuleOnScroll]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const half = layout === 'split' ? Math.ceil(links.length / 2) : links.length;
  const renderLinks = (list: NavLink[]) =>
    list.map((link) => (
      <li key={link.href}>
        <a href={link.href} aria-current={link.current ? 'page' : undefined}>
          {link.label}
        </a>
      </li>
    ));
  const capsule = variant === 'capsule' || scrolled;

  return (
    <>
      {announcement && <Announcement messages={announcement} dismissible={announcementDismissible} />}
      <header
        {...rest}
        data-tone={tone}
        className={cx(
          'bbm-header',
          `bbm-header--${layout}`,
          capsule ? 'bbm-header--capsule' : 'bbm-header--bar',
          (sticky || capsuleOnScroll) && 'bbm-header--sticky',
          scrolled && 'bbm-header--scrolled',
          className,
        )}
      >
        <div className="bbm-header__shell">
          <div className="bbm-header__bar">
            {links.length > 0 && (
              <button
                ref={toggleRef}
                type="button"
                className="bbm-header__toggle"
                aria-expanded={open}
                aria-controls={navId}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="bbm-visually-hidden">Menu</span>
                <MenuIcon open={open} />
              </button>
            )}
            <a className="bbm-header__logo" href={logoHref}>
              {logo}
            </a>
            {links.length > 0 && (
              <nav id={navId} aria-label={navLabel} className={cx('bbm-header__nav', open && 'bbm-header__nav--open')}>
                <ul className="bbm-header__links bbm-header__links--first">{renderLinks(links.slice(0, half))}</ul>
                {half < links.length && (
                  <ul className="bbm-header__links bbm-header__links--second">{renderLinks(links.slice(half))}</ul>
                )}
                {mobileCta && <div className="bbm-header__mobile-cta">{mobileCta}</div>}
              </nav>
            )}
            {actions && <div className="bbm-header__actions">{actions}</div>}
          </div>
        </div>
        {scallop && !capsule && (
          <EdgeDivider className="bbm-header__edge" shape="scallop" size="sm" color="var(--_header-bg)" />
        )}
      </header>
    </>
  );
}

const DISMISS_KEY = 'bbm-announcement-closed';
const ROTATE_MS = 5000;

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** The cocoa bar: one line, rotating through its messages; pauses on hover or focus and can be closed. */
function Announcement({ messages, dismissible }: { messages: ReactNode | ReactNode[]; dismissible: boolean }) {
  const list = (Array.isArray(messages) ? messages : [messages]).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [closed, setClosed] = useState(() => {
    try {
      return dismissible && window.sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (list.length < 2 || paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % list.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [list.length, paused]);

  if (closed || !list.length) return null;

  const close = () => {
    setClosed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* private mode: closed for this page only */
    }
  };

  return (
    <div
      className="bbm-announcement"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="bbm-announcement__track">
        {list.map((message, i) => (
          <p
            key={i}
            className={cx('bbm-announcement__item', i === index && 'bbm-announcement__item--on')}
            aria-hidden={i === index ? undefined : true}
            // Off-screen messages keep their links out of the tab order
            inert={i === index ? undefined : true}
          >
            {message}
          </p>
        ))}
      </div>
      {list.length > 1 && (
        <div className="bbm-announcement__dots" aria-hidden="true">
          {list.map((_, i) => (
            <span key={i} className={cx(i === index && 'is-on')} />
          ))}
        </div>
      )}
      {dismissible && (
        <button type="button" className="bbm-announcement__close" onClick={close}>
          <span className="bbm-visually-hidden">Close announcement</span>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
