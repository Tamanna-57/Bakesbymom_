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

/** What this site keeps on each history entry. */
interface EntryState {
  /** Pages into this visit: 0 for the page the visitor landed on. */
  depth?: number;
  /** Where the visitor had scrolled to when they left this page. */
  scrollY?: number;
}

const entry = (): EntryState => (window.history.state as EntryState | null) ?? {};

/** Goes to another page of the site. `replace` swaps the current page instead of adding one to the history. */
export function navigate(url: string, { replace = false } = {}) {
  const depth = entry().depth ?? 0;
  if (replace) {
    window.history.replaceState({ depth }, '', url);
  } else {
    // Remember the scroll position, so coming back lands in the same spot.
    window.history.replaceState({ ...entry(), scrollY: window.scrollY }, '');
    window.history.pushState({ depth: depth + 1 }, '', url);
  }
  window.dispatchEvent(new Event(NAVIGATE));
}

/** Changes the address without a new history entry (filters kept in the URL), keeping the entry's state. */
export function replaceUrl(url: string) {
  window.history.replaceState(window.history.state, '', url);
}

/** Whether the previous history entry is a page of this site, rather than wherever the visitor came from. */
export const canGoBack = () => (entry().depth ?? 0) > 0;

/** The scroll position saved on this history entry, if the visitor is coming back to it. */
export const savedScroll = () => entry().scrollY;

/** One level up: "/shop/cookies/choco-chip" → "/shop/cookies", "/catalog/cake-x" → "/catalog", "/about" → "/". */
export function parentPath(path: string) {
  const parts = path.split('/').filter(Boolean);
  return '/' + parts.slice(0, -1).join('/');
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

/** Matches "/shop/:category" against "/shop/cookies" → { category: "cookies" }, or null. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const want = pattern.split('/').filter(Boolean);
  const got = path.split('/').filter(Boolean);
  if (want.length !== got.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < want.length; i++) {
    const part = want[i]!;
    if (part.startsWith(':')) params[part.slice(1)] = decodeURIComponent(got[i]!);
    else if (part !== got[i]) return null;
  }
  return params;
}
