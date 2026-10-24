import { SectionHeading } from '@bakesbymom/ui';
import { CategoryTiles, FaqSection, MenuSection, PackagesSection } from '../sections/blocks';
import { Layout } from './Layout';

/** The full menu (pin 16), category tiles, custom cake packages (pin 08) and the FAQ (pin 02). */
export function MenuPage() {
  return (
    <Layout path="/menu">
      <MenuSection level={1} />
      <section className="site-section">
        <div className="site-container" style={{ display: 'grid', gap: 32 }}>
          <SectionHeading align="center" eyebrow="by the box" title="Something for every table" />
          <CategoryTiles />
        </div>
      </section>
      <PackagesSection />
      <FaqSection />
    </Layout>
  );
}
