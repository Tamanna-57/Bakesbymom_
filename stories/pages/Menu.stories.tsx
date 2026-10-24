import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading, SiteHeader } from '@bakesbymom/ui';
import { headerActions, mobileCta, navLinks } from '../assets/site';
import { CategoryTiles, FaqSection, Footer, MenuSection, PackagesSection } from '../sections/blocks';
import { fromBoard } from '../sections/ref';

function MenuPage() {
  return (
    <div>
      <SiteHeader
        links={navLinks.map((l) => ({ ...l, current: l.label === 'Menu' }))}
        actions={headerActions}
        mobileCta={mobileCta}
        scallop
      />
      <main>
        <MenuSection level={1} />
        <section className="sb-section">
          <div className="sb-container" style={{ display: 'grid', gap: 32 }}>
            <SectionHeading align="center" eyebrow="by the box" title="Something for every table" />
            <CategoryTiles />
          </div>
        </section>
        <PackagesSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

const meta = {
  title: 'Pages/Menu',
  component: MenuPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The full menu: pin 16's **menu cards** on a baby blue band with pin 13's **filter pills**, pin 16's **cherry category tiles**, pin 08's **key-tag packages** for custom cakes and pin 02's **two-column FAQ**.",
          ['16', '13', '08', '02'],
          'menu.md',
        ),
      },
    },
  },
} satisfies Meta<typeof MenuPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};
