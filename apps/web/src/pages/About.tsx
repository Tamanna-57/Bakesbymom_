import { StoryLetter, StoryMenu, StoryTray } from '../sections/story';
import { Layout } from './Layout';

/** Our story, short: a letter from Mom, her cakes on a tray, and her promises as a menu card. */
export function AboutPage() {
  return (
    <Layout path="/about">
      <StoryLetter />
      <StoryTray />
      <StoryMenu />
    </Layout>
  );
}
