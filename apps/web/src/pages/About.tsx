import { Marquee, SectionHeading } from '@bakesbymom/ui';
import {
  AboutCardSection,
  MeetMomSection,
  OrbitSection,
  RitualSection,
  StoryChaptersSection,
  ValuesRow,
} from '../sections/blocks';
import { Layout } from './Layout';

/** Our story: the orbit (pin 01), Meet Mom and values (pin 05), the about card (pin 16), the chapters and the ritual. */
export function AboutPage() {
  return (
    <Layout path="/about">
      <section className="site-section" style={{ paddingBottom: 0 }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="our story"
            eyebrowStyle="pill"
            size="xl"
            level={1}
            align="center"
            title={
              <>
                What began as a hobby in a <em>home kitchen</em>
              </>
            }
          />
        </div>
      </section>
      <OrbitSection />
      <Marquee
        tone="pink"
        items={['Passion', 'Patience', 'Perfection', '100% eggless', 'Baked to order']}
        caps={false}
        label="What goes into every box"
      />
      <MeetMomSection />
      <section className="site-section site-section--beige">
        <div className="site-container">
          <ValuesRow />
        </div>
      </section>
      <AboutCardSection />
      <StoryChaptersSection />
      <RitualSection />
    </Layout>
  );
}
