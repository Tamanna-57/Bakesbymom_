import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuPage } from '../../apps/web/src/pages/Menu';
import { fromBoard } from '../sections/ref';

// The live website page (apps/web), shown here with its source pins.
const meta = {
  title: 'Pages/Menu',
  component: MenuPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The full menu: pin 16's **menu cards** on a baby blue band with pin 13's **filter pills**, pin 16's **cherry category tiles**, pin 08's **key-tag packages** for custom cakes and pin 02's **two-column FAQ**.",
          ['16', '13', '08', '02'],
          'menu.md',
        ),
      },
    },
  },
} satisfies Meta<typeof MenuPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};
