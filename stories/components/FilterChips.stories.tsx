import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChips } from '@bakesbymom/ui';

const meta = {
  title: 'Components/FilterChips',
  component: FilterChips,
  parameters: {
    docs: {
      description: {
        component:
          "Pin 13's filter pills for the menu. Each chip is a toggle button with `aria-pressed`; the pressed chip turns cherry with white text. Single-select by default; `multiple` for diet filters. Pin 13 shows each unpressed chip in its own soft color: pass `tone` per option.",
      },
    },
  },
  args: {
    label: 'Filter the menu',
    defaultValue: ['all'],
    options: [
      { value: 'all', label: 'All' },
      { value: 'cakes', label: 'Cakes' },
      { value: 'cookies', label: 'Cookies' },
      { value: 'pies', label: 'Pies' },
      { value: 'breads', label: 'Breads' },
    ],
  },
} satisfies Meta<typeof FilterChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};

/** Pin 13: soft colors per chip. */
export const Flavored: Story = {
  args: {
    options: [
      { value: 'all', label: 'All' },
      { value: 'cakes', label: 'Cakes', tone: 'pink' },
      { value: 'cookies', label: 'Cookies', tone: 'butter' },
      { value: 'breads', label: 'Breads', tone: 'blue' },
    ],
  },
};

export const Multiple: Story = {
  args: {
    label: 'Diet',
    multiple: true,
    defaultValue: [],
    options: [
      { value: 'gf', label: 'Gluten-free' },
      { value: 'df', label: 'Dairy-free' },
      { value: 'nf', label: 'Nut-free' },
    ],
  },
};
