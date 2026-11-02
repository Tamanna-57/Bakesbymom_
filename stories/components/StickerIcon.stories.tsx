import type { Meta, StoryObj } from '@storybook/react-vite';
import { STICKER_ICONS, StickerIcon } from '@bakesbymom/ui';

const meta = {
  title: 'Components/StickerIcon',
  component: StickerIcon,
  parameters: {
    docs: {
      description: {
        component:
          'Filled, two- and three-tone icons with a bold cocoa outline, drawn for this system after the chunky shop icons on a cookie site on Pinterest (The Crumb Culture). A Doodle is a line in one ink; a sticker icon is colored in. Used for the header actions and the "we keep it simple" row. Decorative by default: pass `title` when the icon stands alone without a labelled link around it. `tones` overrides the fills and `ink` the outline.',
      },
    },
  },
  args: { name: 'cookie', size: 96 },
  argTypes: { name: { control: 'select', options: STICKER_ICONS } },
} satisfies Meta<typeof StickerIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const One: Story = {};

/** The whole set, large and at header size. */
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 8rem)', gap: '1.5rem', textAlign: 'center' }}>
      {STICKER_ICONS.map((name) => (
        <figure key={name} style={{ margin: 0 }}>
          <StickerIcon name={name} size={80} />
          <figcaption style={{ font: '600 0.8rem var(--bbm-font-family-body)' }}>{name}</figcaption>
          <StickerIcon name={name} size={32} />
        </figure>
      ))}
    </div>
  ),
};

/** Recolored with `tones`. */
export const Recolored: Story = {
  args: { name: 'gift', tones: ['var(--bbm-color-blue-200)', 'var(--bbm-color-cherry-700)', 'var(--bbm-color-paper)'] },
};
