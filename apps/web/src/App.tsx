import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { catalogStatus, findCake, useCatalog } from './content/catalog';
import { findTreatCategory } from './content/treats';
import { AboutPage } from './pages/About';
import { CakePage } from './pages/CakePage';
import { CatalogPage } from './pages/Catalog';
import { LandingPage } from './pages/Landing';
import { LinkInBioPage } from './pages/LinkInBio';
import { Layout } from './pages/Layout';
import { CatalogNote } from './sections/blocks';
import { NotFoundPage } from './pages/NotFound';
import { ShopPage } from './pages/Shop';
import { TreatCategoryPage } from './pages/TreatCategory';
import { TreatPage } from './pages/TreatPage';
import { BackButton, hasBackButton } from './back-button';
import { Intro, shouldPlayIntro } from './intro';
import { jumpTo, useParallax, useReveal, useSmoothScroll } from './motion';
import { matchPath, savedScroll, usePath, useLinkInterception } from './router';

type Route = { title: string; page: ReactElement };
const site = 'Bakes by Mom';

/** Paths match the old site's (/catalog, /catalog/<cake>, /shop/<type>/<item>), so its links keep working. */
function resolve(path: string): Route | null {
  if (path === '/') return { title: `${site} · Eggless home bakery in Panipat`, page: <LandingPage /> };
  if (path === '/catalog' || path === '/menu') return { title: `Cakes by occasion · ${site}`, page: <CatalogPage /> };
  if (path === '/shop') return { title: `Cakes & treats · ${site}`, page: <ShopPage /> };
  if (path === '/about') return { title: `Our story · ${site}`, page: <AboutPage /> };
  if (path === '/links') return { title: `Links · ${site}`, page: <LinkInBioPage /> };

  const cake = matchPath('/catalog/:cake', path);
  if (cake) {
    const found = findCake(cake.cake!);
    if (found) return { title: `${found.name} · ${site}`, page: <CakePage cake={found} /> };
    // The cake pages wait for the catalog; a cake missing from it once it has arrived really is missing.
    if (catalogStatus() === 'ready') return null;
    return {
      title: site,
      page: (
        <Layout path="/catalog">
          <section className="site-section site-section--blue">
            <div className="site-container">
              <CatalogNote />
            </div>
          </section>
        </Layout>
      ),
    };
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
  // Only on the first page the visitor lands on, not when they come back to the home page later.
  const [intro, setIntro] = useState(() => shouldPlayIntro(path));
  const endIntro = useCallback(() => setIntro(false), []);
  useLinkInterception();
  useSmoothScroll();

  useEffect(() => {
    document.title = route.title;
    // Jump to the section in the address (/#order), else to where the visitor was when going back, else the top.
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else if (!firstRender.current) {
      jumpTo(savedScroll() ?? 0);
      // Tell screen readers the page changed by moving focus to the new content.
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [path, route.title]);
  // After the scroll reset above, so they measure the new page from the top.
  useReveal(path);
  useParallax(path);

  // A new key per path resets each page's state (filters, order forms) when you move between items.
  return (
    <>
      <div key={path}>{route.page}</div>
      {hasBackButton(path) && <BackButton path={path} />}
      {intro && <Intro onDone={endIntro} />}
    </>
  );
}
