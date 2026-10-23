import { Marquee, SectionHeading, StepList } from '@bakesbymom/ui';
import { AboutCardSection, MeetMomSection, OrbitSection, ValuesRow } from '../sections/blocks';
import { Layout } from './Layout';

/** Our story: the orbit (pin 01), Meet Mom and values (pin 05), the about card (pin 16) and a timeline (pin 04). */
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
      <section className="site-section site-section--beige">
        <div className="site-container">
          <ValuesRow />
        </div>
      </section>
      <AboutCardSection />
      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container site-narrow" style={{ display: 'grid', gap: 32 }}>
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
    </Layout>
  );
}
