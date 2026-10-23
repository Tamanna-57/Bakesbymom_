import type { ReactNode } from 'react';
import { SiteHeader } from '@bakesbymom/ui';
import { announcement, headerActions, mobileCta, navLinksFor } from '../content/site';
import { ChatDemo, Footer } from '../sections/blocks';

interface LayoutProps {
  /** The current path, to mark the nav link for this page. */
  path: string;
  /** Show the cocoa announcement bar above the header (home page only). */
  withAnnouncement?: boolean;
  children: ReactNode;
}

/** Header, main, footer and the Ask Mom chat: the frame every site page shares. */
export function Layout({ path, withAnnouncement = false, children }: LayoutProps) {
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
