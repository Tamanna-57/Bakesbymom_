import { SectionHeading } from '@bakesbymom/ui';
import { MeetMomSection, OrbitSection, StoryChaptersSection, ValuesRow } from '../sections/blocks';
import { Layout } from './Layout';

/** Our story: who Mom is, what she promises, how it started, and everything on the table today. */
export function AboutPage() {
  return (
    <Layout path="/about">
      <section className="site-section site-section--pink site-about-intro">
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
      <MeetMomSection />
      <section className="site-section site-section--beige site-values-band">
        <div className="site-container">
          <ValuesRow />
        </div>
      </section>
      <StoryChaptersSection />
      <OrbitSection />
    </Layout>
  );
}
