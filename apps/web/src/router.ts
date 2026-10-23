import { useEffect, useState } from 'react';

// A tiny client-side router: four pages don't need a routing library.

const NAVIGATE = 'bbm:navigate';

/** The current path without a trailing slash ("/" for the home page). */
const currentPath = () => window.location.pathname.replace(/(.)\/+$/, '$1');

/** The current path, kept in sync with the address bar. */
export function usePath() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const update = () => setPath(currentPath());
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE, update);
    };
  }, []);
  return path;
}

export function navigate(url: string) {
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(NAVIGATE));
}

/** Turns clicks on links to other pages of this site into client-side navigation. */
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page with an anchor: let the browser jump to it.
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
