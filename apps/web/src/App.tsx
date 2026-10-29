import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { catalogStatus, findCake, useCatalog } from './content/catalog';
import { findTreatCategory } from './content/treats';
import { AboutPage } from './pages/About';
import { CakePage } from './pages/CakePage';
import { HowToOrderPage } from './pages/HowToOrder';
import { LandingPage } from './pages/Landing';
import { LinkInBioPage } from './pages/LinkInBio';
import { Layout } from './pages/Layout';
import { MenuPage } from './pages/Menu';
import { CatalogNote } from './sections/blocks';
import { NotFoundPage } from './pages/NotFound';
import { TreatCategoryPage } from './pages/TreatCategory';
import { BackButton, hasBackButton } from './back-button';
import { Intro, shouldPlayIntro } from './intro';
import { jumpTo, useParallax, useReveal, useSmoothScroll } from './motion';
import { matchPath, navigate, savedScroll, usePath, useLinkInterception } from './router';

/** `anchor`: the section a page opens at when the address doesn't name one (/shop opens the menu at its treats). */
type Route = { title: string; page: ReactElement; anchor?: string };
const site = 'Bakes by Mom';

/**
 * Paths match the old site's (/catalog, /catalog/<cake>, /shop/<type>/<item>), so its links keep working: the cake
 * and treat lists are now one menu, and a treat's flavours are picked on its type's page.
 */
function resolve(path: string): Route | null {
  if (path === '/') return { title: `${site} · Eggless home bakery in Panipat`, page: <LandingPage /> };
  if (path === '/menu' || path === '/catalog') return { title: `Menu · ${site}`, page: <MenuPage /> };
  if (path === '/shop') return { title: `Menu · ${site}`, page: <MenuPage />, anchor: 'treats' };
  if (path === '/how-to-order') return { title: `How to order · ${site}`, page: <HowToOrderPage /> };
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
      ? {
          title: `${treat.name} · ${site}`,
          page: <TreatCategoryPage category={found} initialItem={treat.slug} />,
        }
      : null;
  }
  return null;
}

/** Sections that used to live on the home page, and where they are now (old links like /#order). */
const movedSections: Record<string, string> = {
  order: '/how-to-order',
  faq: '/how-to-order#faq',
  flavours: '/how-to-order#faq',
  cakes: '/menu',
  treats: '/menu#treats',
  gallery: '/menu',
  story: '/about',
};

export function App() {
  useCatalog();
  const path = usePath();
  const route: Route = resolve(path) ?? { title: `Page not found · ${site}`, page: <NotFoundPage /> };
  const firstRender = useRef(true);
  // Only on the first page the visitor lands on, not when they come back to the home page later.
  const [intro, setIntro] = useState(() => shouldPlayIntro(path));
  const endIntro = useCallback(() => setIntro(false), []);
  useLinkInterception();
  useSmoothScroll();

  useEffect(() => {
    const moved = path === '/' ? movedSections[window.location.hash.slice(1)] : undefined;
    if (moved) {
      navigate(moved, { replace: true });
      return;
    }
    document.title = route.title;
    // Jump to the section in the address (/menu#treats), else to where the visitor was when going back, else to the
    // page's own opening section, else the top.
    const saved = savedScroll();
    const id = window.location.hash.slice(1) || (saved === undefined ? route.anchor : undefined);
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView();
    } else if (!firstRender.current) {
      jumpTo(saved ?? 0);
      // Tell screen readers the page changed by moving focus to the new content.
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [path, route.title, route.anchor]);
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
