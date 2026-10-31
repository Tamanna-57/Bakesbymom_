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
          "**On the website: the reel.** The bubble title from pin 01 (Berloga) and pin 13's occasion chips pin under the header while the page scrolls, and the cakes slide past sideways, one pixel across for every pixel down. The last card opens every cake for the occasion. With reduced motion, or on a screen under 500px tall, it is a row you swipe instead; the arrows step through it either way, and tabbing to a card off to the side scrolls it into view. **Pin 01's strips**: one strip open in color, the rest narrow and greyscale, each a button with `aria-expanded`. Alternates: the **trio** on cocoa from pin 11 and the **Instagram grid** from pin 12.",
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

/** The website's gallery: scroll the canvas and the cakes slide past sideways. */
export const Reel: Story = {
  decorators: [(Story) => <Story />],
  render: () => <GallerySection />,
};

/** Pin 01: tall strips, one open in color. */
export const Strips: Story = {};

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
