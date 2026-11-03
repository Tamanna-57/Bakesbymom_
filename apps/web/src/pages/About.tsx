import { BakeWithMomSection } from '../sections/bake';
import { SignOffRibbon } from '../sections/home';
import { StoryHero, StoryMeetMom, StoryPromises, StoryRibbon } from '../sections/story';
import { Layout } from './Layout';

/**
 * Our story, dressed like the home page: the arch hero on pink stripes and the cherry ribbon, then bake a cake
 * with Mom from sunrise to night while she tells it (on the home hero's blue stripes), then meet her beside a few
 * of her cakes, her three promises, and the home page's sign-off ribbon.
 */
export function AboutPage() {
  return (
    <Layout path="/about">
      <StoryHero />
      <StoryRibbon />
      <BakeWithMomSection />
      <StoryMeetMom />
      <StoryPromises />
      <SignOffRibbon />
    </Layout>
  );
}
