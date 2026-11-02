import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutPage } from '../../apps/web/src/pages/About';
import { fromBoard } from '../sections/ref';

// The live website page (apps/web), shown here with its source pins.
const meta = {
  title: 'Pages/About',
  component: AboutPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "The About page: **Bake it with Mom**, the story told as a cake you bake with her while the kitchen light goes from sunrise to night (scroll through it; it's a still recipe card under reduced motion), then pin 05's **Meet Mom** and **values**.",
          ['05'],
          'about.md',
        ),
      },
    },
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const About: Story = {};
