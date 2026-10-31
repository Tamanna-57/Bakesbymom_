import { Doodle, SectionHeading } from '@bakesbymom/ui';
import { BakeWithMomSection } from '../sections/bake';
import { MeetMomSection, ValuesRow } from '../sections/blocks';
import { Layout } from './Layout';

/** Our story: bake a cake with Mom from sunrise to night while she tells it, then meet her, then what she stands by. */
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
                Bake one with <em>Mom</em>
              </>
            }
            description="The best way to hear how Bakes by Mom began is in her kitchen, with your sleeves rolled up. One cake, sunrise to night. She'll tell you the story while you bake."
          />
          <p className="site-about-intro__cue">
            <Doodle name="arrow" size={56} className="site-about-intro__arrow" />
            Scroll to start
          </p>
        </div>
      </section>
      <BakeWithMomSection />
      <MeetMomSection action={false} />
      <section className="site-section site-section--beige site-values-band">
        <div className="site-container">
          <ValuesRow />
        </div>
      </section>
    </Layout>
  );
}
