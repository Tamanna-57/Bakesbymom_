import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from '@bakesbymom/ui';
import { announcement, headerActions, mobileCta, navLinks } from '../assets/site';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Navbar',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 15 (Nectar).** Links split around a centered logo on a pink bar with a scalloped edge. The announcement bar and the icon zone come from **pin 13 (Puzzle Pantry)**; the mobile and scrolled capsule from **pin 03 (Emily Jane)**. Below 900px the bar becomes a menu button, the logo and the order box, and the links open as a sheet (Escape closes it and returns focus).',
          ['15', '13', '03'],
          'navbar.md',
        ),
      },
    },
  },
  args: {
    links: navLinks,
    actions: headerActions,
    mobileCta,
    announcement,
    scallop: true,
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: split links, centered logo, pink bar, scalloped edge, cocoa announcement bar. */
export const Lead: Story = {};

/** Pin 13's three zones: links left, logo centered, icons right, on butter-beige. */
export const ThreeZone: Story = {
  args: { layout: 'center', tone: 'beige', scallop: false },
};

/** Pin 03's capsule: the whole nav in one outlined pill. Also the scrolled state of the lead. */
export const Capsule: Story = {
  args: { variant: 'capsule', announcement: undefined },
};

/** Scroll the frame: after 120px the bar shrinks into the capsule. */
export const CapsuleOnScroll: Story = {
  args: { capsuleOnScroll: true },
  render: (args) => (
    <div>
      <SiteHeader {...args} />
      <div style={{ height: '160vh', padding: 32 }} className="bbm-pattern" data-pattern="grid" data-bbm-tone="pink">
        <p className="bbm-text-hand-md" style={{ color: 'var(--bbm-color-text-brand)' }}>
          Scroll down ↓
        </p>
      </div>
    </div>
  ),
};
