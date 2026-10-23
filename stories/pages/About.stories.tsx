import type { Meta, StoryObj } from '@storybook/react-vite';
import { Marquee, SectionHeading, SiteHeader, StepList } from '@bakesbymom/ui';
import { headerActions, mobileCta, navLinks } from '../assets/site';
import { AboutCardSection, Footer, MeetMomSection, OrbitSection, ValuesRow } from '../sections/blocks';
import { fromBoard } from '../sections/ref';

function AboutPage() {
  return (
    <div>
      <SiteHeader
        links={navLinks.map((l) => ({ ...l, current: false }))}
        actions={headerActions}
        mobileCta={mobileCta}
        scallop
      />
      <main>
        <section className="sb-section" style={{ paddingBottom: 0 }}>
          <div className="sb-container">
            <SectionHeading
              eyebrow="our story"
              eyebrowStyle="pill"
              size="xl"
              level={1}
              align="center"
              title={
                <>
                  A kitchen table, thirty years and a lot of <em>butter</em>
                </>
              }
            />
          </div>
        </section>
        <OrbitSection />
        <Marquee
          tone="pink"
          items={['Made from scratch', 'Real butter, real eggs', 'One cake at a time']}
          caps={false}
          label="What we believe"
        />
        <MeetMomSection />
        <section className="sb-section sb-section--beige">
          <div className="sb-container">
            <ValuesRow />
          </div>
        </section>
        <AboutCardSection />
        <section className="sb-section" style={{ paddingTop: 0 }}>
          <div className="sb-container sb-narrow" style={{ display: 'grid', gap: 32 }}>
            <SectionHeading align="center" title="How it started" />
            <StepList
              variant="row"
              steps={[
                { title: '1998', description: 'Birthday cakes for the neighbors.' },
                { title: '2012', description: 'A stall at the Saturday market.' },
                { title: '2026', description: 'Bakes by Mom, online.' },
              ]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const meta = {
  title: 'Pages/About',
  component: AboutPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The About page: pin 01's **orbit** for the story, pin 05's **Meet Mom** and **values**, pin 16's **about card** with halftone cherries, and pin 04's **checkbox row** as a timeline.",
          ['01', '05', '16', '04'],
          'about.md',
        ),
      },
    },
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const About: Story = {};
