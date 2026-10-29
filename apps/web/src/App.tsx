import { useEffect, useRef, type ReactElement } from 'react';
import { catalogSettled, findCake, useCatalog } from './content/catalog';
import { findTreatCategory } from './content/treats';
import { AboutPage } from './pages/About';
import { CakePage } from './pages/CakePage';
import { CatalogPage } from './pages/Catalog';
import { LandingPage } from './pages/Landing';
import { LinkInBioPage } from './pages/LinkInBio';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './pages/NotFound';
import { ShopPage } from './pages/Shop';
import { TreatCategoryPage } from './pages/TreatCategory';
import { TreatPage } from './pages/TreatPage';
import { jumpTo, useParallax, useReveal, useSmoothScroll } from './motion';
import { matchPath, usePath, useLinkInterception } from './router';

type Route = { title: string; page: ReactElement };
const site = 'Bakes by Mom';

/** Paths match the old site's (/catalog, /catalog/<cake>, /shop/<type>/<item>), so its links keep working. */
function resolve(path: string): Route | null {
  if (path === '/') return { title: `${site} · Eggless home bakery in Panipat`, page: <LandingPage /> };
  if (path === '/catalog' || path === '/menu') return { title: `Cakes by occasion · ${site}`, page: <CatalogPage /> };
  if (path === '/shop') return { title: `Treats · ${site}`, page: <ShopPage /> };
  if (path === '/about') return { title: `Our story · ${site}`, page: <AboutPage /> };
  if (path === '/links') return { title: `Links · ${site}`, page: <LinkInBioPage /> };

  const cake = matchPath('/catalog/:cake', path);
  if (cake) {
    const found = findCake(cake.cake!);
    if (found) return { title: `${found.name} · ${site}`, page: <CakePage cake={found} /> };
    // A cake added since catalog.json was saved shows up once the live catalog arrives.
    return catalogSettled() ? null : { title: site, page: <Layout path="/catalog">{null}</Layout> };
  }
  const category = matchPath('/shop/:category', path);
  if (category) {
    const found = findTreatCategory(category.category!);
    return found ? { title: `${found.name} · ${site}`, page: <TreatCategoryPage category={found} /> } : null;
  }
  const item = matchPath('/shop/:category/:item', path);
  if (item) {
    const found = findTreatCategory(item.category!);
    const treat = found?.items.find((t) => t.slug === item.item);
    return found && treat
      ? { title: `${treat.name} · ${site}`, page: <TreatPage category={found} treat={treat} /> }
      : null;
  }
  return null;
}

export function App() {
  useCatalog();
  const path = usePath();
  const route = resolve(path) ?? { title: `Page not found · ${site}`, page: <NotFoundPage /> };
  const firstRender = useRef(true);
  useLinkInterception();
  useSmoothScroll();

  useEffect(() => {
    document.title = route.title;
    // Jump to the section in the address (/#order), else start at the top.
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else if (!firstRender.current) {
      jumpTo(0);
      // Tell screen readers the page changed by moving focus to the new content.
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [path, route.title]);
  // After the scroll reset above, so they measure the new page from the top.
  useReveal(path);
  useParallax(path);

  // A new key per path resets each page's state (filters, order forms) when you move between items.
  return <div key={path}>{route.page}</div>;
}
