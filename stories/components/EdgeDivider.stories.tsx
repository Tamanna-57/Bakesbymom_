import type { Meta, StoryObj } from '@storybook/react-vite';
import { EdgeDivider } from '@bakesbymom/ui';

const meta = {
  title: 'Components/EdgeDivider',
  component: EdgeDivider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The board's section edges: **scallops** (pins 01, 03, 04, 15; add `outline` for pin 01's brown line), **waves** (pin 06), **torn paper** (pin 08), **half dots** (pins 02, 05) and the **checker** strip (pins 05, 15). Set `color` to the section above and `background` to the section below; `flip` for a top edge. Always hidden from assistive tech.",
      },
    },
  },
  args: { color: 'var(--bbm-color-bg-pink)', background: 'var(--bbm-color-bg-canvas)' },
  decorators: [
    (Story, ctx) => (
      <div>
        {!ctx.args.flip && <div style={{ height: 48, background: String(ctx.args.color) }} />}
        <Story />
        {ctx.args.flip && <div style={{ height: 48, background: String(ctx.args.color) }} />}
      </div>
    ),
  ],
} satisfies Meta<typeof EdgeDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scallop: Story = { args: { shape: 'scallop' } };
export const ScallopOutlined: Story = { args: { shape: 'scallop', outline: true, size: 'lg' } };
export const Wave: Story = { args: { shape: 'wave', color: 'var(--bbm-color-bg-inverse)', flip: true } };
export const Torn: Story = { args: { shape: 'torn', color: 'var(--bbm-color-bg-brand-deep)' } };
export const HalfDots: Story = {
  args: { shape: 'dots', color: 'var(--bbm-color-brown-900)', background: 'var(--bbm-color-bg-blue)' },
};
export const Checker: Story = {
  args: { shape: 'checker', color: 'var(--bbm-color-cherry-700)', altColor: 'var(--bbm-color-pink-300)', size: 'sm' },
};
