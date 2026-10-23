import { Button, Doodle, SectionHeading } from '@bakesbymom/ui';
import { Layout } from './Layout';

export function NotFoundPage() {
  return (
    <Layout path="">
      <section className="site-section">
        <div className="site-container site-narrow" style={{ display: 'grid', gap: 24, justifyItems: 'center' }}>
          <Doodle name="cupcake" size={72} />
          <SectionHeading
            level={1}
            align="center"
            title={
              <>
                This page isn't on the <em>menu</em>
              </>
            }
            description="It may have sold out, or the link has a typo."
          />
          <Button href="/">Back to the home page</Button>
        </div>
      </section>
    </Layout>
  );
}
