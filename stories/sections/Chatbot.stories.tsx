import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatWidget } from '@bakesbymom/ui';
import { ChatDemo } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Chatbot',
  component: ChatWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: fromBoard(
          'No pin on the board shows a chatbot, so **Ask Mom** is assembled from board pieces that do the same job: the round seal launcher from **pin 10**, the stamp-edged "Write to us" card and blue pill quick questions from **pin 08**, outlined paper bubbles like **pin 01**\'s reviews, cherry pills for the customer, and a pink header with a scalloped edge like **pin 15**\'s nav. The panel is a labelled non-modal dialog; opening it focuses the composer, Escape closes it and returns focus to the launcher, and replies are announced from a `role="log"` region. The answers come from whatever the site connects to `onSend`; this demo answers from the FAQ.',
          ['08', '10', '01', '15'],
          'chatbot.md',
        ),
      },
    },
  },
  args: { messages: [], onSend: () => {} },
} satisfies Meta<typeof ChatWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Try it: ask about dates, gluten-free, delivery, custom cakes or the Bake Club. */
export const AskMom: Story = {
  render: () => (
    <div style={{ padding: 24, minHeight: 680, display: 'grid', alignItems: 'end' }}>
      <ChatDemo />
    </div>
  ),
};

/** Closed: just the spinning seal launcher. */
export const Launcher: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <ChatDemo defaultOpen={false} />
    </div>
  ),
};
