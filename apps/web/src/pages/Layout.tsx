import { useEffect, type ReactNode } from 'react';
import { SiteHeader } from '@bakesbymom/ui';
import { announcement, headerActions, mobileCta, navLinksFor } from '../content/site';
import { ChatDemo, Footer } from '../sections/blocks';

interface LayoutProps {
  /** The current path, to mark the nav link for this page. */
  path: string;
  /** Show the cocoa announcement bar above the header (home page only). */
  withAnnouncement?: boolean;
  /** The page opens on a full-bleed photo: the header's edge becomes a wave that hangs over its top. */
  photoHero?: boolean;
  /** Hang the header's scallops over the page's first band, so no strip of page background shows between them. */
  edgeOverHero?: boolean;
  children: ReactNode;
}

/**
 * Keeps `--site-header-h` on the page at the sticky header's height, so things that pin under it (the gallery)
 * stop just below it, whatever size the header is on this screen.
 */
function useHeaderHeight() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.bbm-header');
    if (!header || typeof ResizeObserver !== 'function') return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--site-header-h', `${Math.round(header.getBoundingClientRect().height)}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
}

/** Header, main, footer and the Ask Mom chat: the frame every site page shares. */
export function Layout({
  path,
  withAnnouncement = false,
  photoHero = false,
  edgeOverHero = false,
  children,
}: LayoutProps) {
  useHeaderHeight();
  return (
    <>
      <a className="site-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader
        links={navLinksFor(path)}
        actions={headerActions}
        mobileCta={mobileCta}
        announcement={withAnnouncement ? announcement : undefined}
        scallop
        edge={photoHero ? 'wave' : 'scallop'}
        edgeSize={photoHero ? 'md' : 'sm'}
        edgeOverlay={photoHero || edgeOverHero}
        sticky
        capsuleOnScroll={withAnnouncement}
      />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ChatDemo inline={false} defaultOpen={false} />
    </>
  );
}
