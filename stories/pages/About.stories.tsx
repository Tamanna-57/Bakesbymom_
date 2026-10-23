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
          "The About page: pin 01's **orbit** for the story, pin 05's **Meet Mom** and **values**, pin 16's **about card** with halftone cherries, and pin 04's **checkbox row** as a timeline.",
          ['01', '05', '16', '04'],
          'about.md',
        ),
      },
    },
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const About: Story = {};
