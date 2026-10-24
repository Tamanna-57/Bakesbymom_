import { useEffect, useRef, type ComponentType } from 'react';
import { AboutPage } from './pages/About';
import { LandingPage } from './pages/Landing';
import { LinkInBioPage } from './pages/LinkInBio';
import { MenuPage } from './pages/Menu';
import { NotFoundPage } from './pages/NotFound';
import { usePath, useLinkInterception } from './router';

const routes: Record<string, { title: string; Page: ComponentType }> = {
  '/': { title: 'Bakes by Mom · Homemade cakes, cookies and pies', Page: LandingPage },
  '/menu': { title: 'Menu · Bakes by Mom', Page: MenuPage },
  '/about': { title: 'Our story · Bakes by Mom', Page: AboutPage },
  '/links': { title: 'Links · Bakes by Mom', Page: LinkInBioPage },
};

const notFound = { title: 'Page not found · Bakes by Mom', Page: NotFoundPage };

export function App() {
  const path = usePath();
  const route = routes[path] ?? notFound;
  const firstRender = useRef(true);
  useLinkInterception();

  useEffect(() => {
    document.title = route.title;
    // Jump to the section in the address (/#custom), else start at the top.
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else if (!firstRender.current) {
      window.scrollTo(0, 0);
      // Tell screen readers the page changed by moving focus to the new content.
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [path, route.title]);

  return <route.Page />;
}
