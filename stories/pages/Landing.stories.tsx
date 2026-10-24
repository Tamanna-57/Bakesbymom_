import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingPage } from '../../apps/web/src/pages/Landing';
import { fromBoard } from '../sections/ref';

// The live website page (apps/web), shown here with its source pins.
const meta = {
  title: 'Pages/Landing page',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The Bakes by Mom home page, in the order of **pin 15 (Nectar)**, the board's closest match to a small family bake business: hero → this week → find us → custom cakes → club. The sections the Nectar page doesn't have use the best version on the board: menu (16), process (02), Meet Mom (05), gallery and reviews (01), FAQ (02), newsletter and footer (03). Bright cherry appears once (the schedule band). The Ask Mom chat sits in the corner.",
          ['15', '16', '02', '05', '01', '03'],
          'landing-page.md',
        ),
      },
    },
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageStory: Story = { name: 'Landing page' };
