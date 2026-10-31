import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from '@bakesbymom/ui';
import { galleryItems } from '../../apps/web/src/content/site';
import { GallerySection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 01 (Berloga), saved twice on the board.** Tall strips under a huge outlined bubble title: one strip open in color, the rest narrow and greyscale. Each strip is a button with `aria-expanded`; arrow keys move between strips, a horizontal drag moves the open one, and on phones it becomes a swipe row. **On the website** (`pinOnScroll`) the title, pin 13's occasion chips and the strips pin under the header, and scrolling the page opens the strips one after another, left to right; clicks, drags and arrows scroll the page to that strip. Off with reduced motion or on a screen under 500px tall. Alternates: the **trio** on cocoa from pin 11 and the **Instagram grid** from pin 12.",
          ['01', '14', '11', '12'],
          'gallery.md',
        ),
      },
    },
  },
  args: { items: galleryItems(), label: "Photos from Mom's kitchen" },
  decorators: [
    (Story) => (
      <div className="site-section">
        <div className="site-container">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead, as on the website: scroll the canvas and the strips open one after another. */
export const Strips: Story = {
  decorators: [(Story) => <Story />],
  render: () => <GallerySection />,
};

/** Pin 11: three photos on cocoa under a pink bubble marquee. */
export const Trio: Story = {
  args: {
    variant: 'trio',
    items: galleryItems().slice(1, 4),
    marquee: ['fresh from the oven', 'baked with love'],
  },
};

/** Pin 12: six squares edge to edge, above the footer. */
export const InstagramGrid: Story = {
  args: {
    variant: 'grid',
    items: galleryItems().slice(0, 6),
    follow: { label: 'Follow @bakesbymom', href: '#instagram' },
  },
};
