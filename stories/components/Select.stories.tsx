import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Primitives/Select',
  component: Select,
  args: {
    label: 'Cake size',
    placeholder: 'Choose a size',
    hint: 'A message piped on top is included.',
    options: [
      { value: '0.5', label: '½ kg · about 4–6 slices' },
      { value: '1', label: '1 kg · about 8–10 slices' },
      { value: '2', label: '2 kg · a two-tier for a crowd' },
      { value: '3', label: '3 kg · ask Mom', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'A styled native `<select>`, so it stays accessible, mobile-friendly and form-compatible. It shares its label, hint and error layout with TextField.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Please choose a size.', hint: undefined },
};
