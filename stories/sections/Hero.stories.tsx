import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, Doodle, Hero, Polaroid, Seal, Ticket } from '@bakesbymom/ui';
import { art } from '../../apps/web/src/content';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 15 (Nectar), the grid-paper hero.** A serif headline on the left with one phrase in script, a cutout cake on the right, one handwritten note with a loopy arrow, a few doodles and pin 11's star seam. Alternates: the **band** hero from pin 06, the **sticker** hero from pin 07 and a **photo** hero after pin 13, with the copy on a solid cocoa card so contrast holds.",
          ['15', '11', '06', '07', '13'],
          'hero.md',
        ),
      },
    },
  },
  args: {
    eyebrow: "Baked in Mom's kitchen",
    title: (
      <>
        Homemade cakes, <em>still warm</em> from Mom's oven.
      </>
    ),
    description:
      "Cakes, brownies, cookies, cupcakes and breads, baked to order in Mom's kitchen. Everything is 100% eggless.",
    actions: (
      <>
        <Button size="lg">Order a cake</Button>
        <Button size="lg" variant="secondary">
          See the menu
        </Button>
      </>
    ),
    media: (
      <img
        src={art.strawberryCake}
        alt="Strawberry layer cake with pink buttercream and a cherry on top"
        width={440}
        height={440}
      />
    ),
    note: 'made with real butter!',
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead (pin 15). */
export const Paper: Story = {};

/** Pin 06: a cherry panel between blue stripe bands, two floating photos and a seal. For seasonal campaigns. */
export const Band: Story = {
  args: {
    variant: 'band',
    tone: 'cherry',
    eyebrow: 'Mother’s Day boxes',
    title: (
      <>
        A box of <em>love</em>, baked by Mom
      </>
    ),
    description: 'Six treats, a handwritten card and a ribbon. Order by 7 May.',
    actions: <Button variant="soft">Pre-order a box</Button>,
    media: undefined,
    seal: (
      <Seal text="Limited • Limited • Limited • " size={96} tone="pink" spin>
        <Doodle name="heart" size={26} color="var(--bbm-color-cherry-500)" />
      </Seal>
    ),
    photos: [
      <Polaroid key="a" src={art.cupcake} alt="Pink cupcake" rotate={-4} />,
      <Polaroid key="b" src={art.macarons} alt="A stack of macarons" rotate={4} />,
    ],
  },
};

/** Pin 07: a cutout on a blob, covered in promise stickers. For launches. */
export const Stickers: Story = {
  args: {
    variant: 'stickers',
    tone: 'pink',
    eyebrow: 'New this week',
    title: (
      <>
        Simple ingredients, <em>perfect</em> cinnamon rolls
      </>
    ),
    media: <img src={art.cinnamonRoll} alt="A cinnamon roll with icing" width={420} height={420} />,
    note: undefined,
    stickers: [
      <Seal key="1" text="Real butter • Real butter • " size={92} tone="cherry">
        <Doodle name="heart" size={22} />
      </Seal>,
      <Badge key="2" shape="tape" tone="butter" variant="solid">
        Baked this morning
      </Badge>,
      <Ticket key="3" variant="stamp" tone="blue" rotate={0}>
        <span style={{ fontWeight: 700 }}>No shortcuts</span>
      </Ticket>,
      <Badge key="4" tone="pink" variant="solid">
        Mom approved
      </Badge>,
    ],
  },
};

/** After pin 13: a full photo with the copy on a solid cocoa card. */
export const Photo: Story = {
  args: {
    variant: 'photo',
    image: { src: art.kitchen, alt: "Mom's kitchen counter with a cake on a stand" },
    eyebrow: 'Since 1998',
    title: (
      <>
        For the days that need <em>something</em> sweet
      </>
    ),
    description: 'Baked to order in a home kitchen, one cake at a time.',
    actions: <Button variant="soft">See the menu</Button>,
    media: undefined,
  },
};
