import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuSection, CategoryTiles } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Menu',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 16 (SugarLace).** White menu cards in a grid on a baby blue band, under a script title with cherry ribbons, with an allergy note. The filter pills come from **pin 13**; the cherry category tiles from pin 16.',
          ['16', '13', '05', '04'],
          'menu.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: ribbon title, filter pills, menu cards and the allergy note. */
export const Lead: Story = { render: () => <MenuSection /> };

/** Pin 16's cherry tiles, for the home page teaser. */
export const CategoryTilesRow: Story = {
  name: 'Category tiles',
  render: () => (
    <div className="sb-section">
      <div className="sb-container">
        <CategoryTiles />
      </div>
    </div>
  ),
};
