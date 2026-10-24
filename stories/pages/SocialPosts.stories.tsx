import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  Card,
  Doodle,
  Logo,
  PatternSurface,
  Polaroid,
  ProductCard,
  ReviewCard,
  Seal,
  SectionHeading,
  Ticket,
} from '@bakesbymom/ui';
import { art } from '../../apps/web/src/content';
import { fromBoard } from '../sections/ref';
import './pages.css';

/** Pin 16: a menu card on baby blue stripes, under the ribbon title. */
function ThisWeek() {
  return (
    <PatternSurface
      pattern="stripes"
      tone="blue"
      ground="var(--bbm-color-bg-canvas)"
      className="pg-post pg-post--center"
    >
      <SectionHeading variant="ribbon" size="md" title="Menu" ribbonText="fresh this week" level={2} />
      <ProductCard
        as="div"
        variant="menu"
        name="Strawberry layer cake"
        image={{ src: art.strawberryCake, alt: 'Strawberry layer cake with pink frosting and a cherry on top' }}
        description="Vanilla sponge, fresh strawberry jam, whipped buttercream."
        price="From $38"
        style={{ width: 250 }}
      />
      <p className="pg-post__note">Order by Wednesday · @bakesbymom</p>
    </PatternSurface>
  );
}

/** Pin 15: the week's stops on grid paper, one cherry row for today. */
function FindUs() {
  const days = [
    ['Thu', 'Oak Street market', '8–1'],
    ['Fri', 'Riverside school fair', '3–6'],
    ['Sat', 'Kitchen door pick-up', '9–12'],
    ['Sun', 'Closed, Mom is resting', ''],
  ];
  return (
    <PatternSurface pattern="grid" tone="pink" ground="var(--bbm-color-bg-surface)" className="pg-post">
      <p className="bbm-text-eyebrow" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
        Where to find us
      </p>
      <p className="bbm-text-heavy" style={{ margin: '4px 0 18px' }}>
        This week
      </p>
      <ul className="pg-post__days">
        {days.map(([day, place, time]) => (
          <li key={day} data-today={day === 'Sat' || undefined}>
            <span className="pg-post__day">{day}</span>
            <span>{place}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
      <Doodle name="arrow" size={76} color="var(--bbm-color-cherry-700)" className="pg-post__arrow" />
      <p className="bbm-text-hand-md pg-post__hand">see you Saturday!</p>
    </PatternSurface>
  );
}

/** Pin 07: a cutout covered in stickers, with an arrow headline. */
function NewBake() {
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-bg-canvas)' }}>
      <p className="pg-post__arrows">
        Real butter <span aria-hidden="true">→</span>
        <br />
        brown sugar <span aria-hidden="true">→</span>
        <br />
        <em>perfect cookie</em>
      </p>
      <div className="pg-post__sticker-stage">
        <img src={art.cookies} alt="Three brown butter cookies on a blue plate" width={260} height={260} />
        <Ticket variant="stamp" tone="butter" rotate={-8} className="pg-post__s1">
          no margarine
        </Ticket>
        <Seal text="Baked this morning • Baked this morning • " size={96} tone="pink" className="pg-post__s2">
          <Doodle name="heart" size={22} color="var(--bbm-color-cherry-700)" />
        </Seal>
        <Badge tone="cherry" variant="solid" shape="tape" className="pg-post__s3">
          New!
        </Badge>
      </div>
      <p className="pg-post__note">Brown butter cookies · $14 a dozen</p>
    </div>
  );
}

/** Pin 10: the Bake Club as a ticket, heavy title with a script word on top. */
function BakeClub() {
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-bg-pink)', justifyContent: 'center' }}>
      <Ticket tone="beige" stub="Admit one" className="pg-post__ticket">
        <div className="pg-post__lockup">
          <p className="bbm-text-heavy" style={{ margin: 0 }}>
            The Bake Club
          </p>
          <p className="bbm-text-script-sm pg-post__script">every month</p>
        </div>
        <p className="bbm-text-body-sm" style={{ margin: '8px 0 0' }}>
          Four seasonal treats and Mom's recipe card, at your door on the first Saturday.
        </p>
        <Badge tone="blue" variant="solid" style={{ marginTop: 14 }}>
          Sign me up · link in bio
        </Badge>
      </Ticket>
      <Seal text="Bakes by Mom • Bake Club • " size={104} tone="cherry" className="pg-post__seal">
        <Doodle name="cherry" size={30} color="var(--bbm-color-pink-300)" />
      </Seal>
    </div>
  );
}

/** Pin 01: one scalloped review card with stars. */
function Review() {
  return (
    <PatternSurface pattern="gingham" tone="pink" className="pg-post pg-post--center">
      <Badge tone="brown" variant="solid" className="pg-post__label">
        <span className="bbm-text-script-sm">kind words</span>
      </Badge>
      <ReviewCard
        className="pg-post__review"
        shape="scallop"
        tone="pink"
        sticker
        author="Priya S."
        detail="birthday cake, June"
        rating={5}
        quote="The strawberry cake tasted exactly like the ones my grandmother made. Not a crumb left."
        style={{ width: 320 }}
      />
      <Logo size="sm" />
    </PatternSurface>
  );
}

/** Pin 05: Mom in a scallop frame on dots, with a striped note. */
function MeetMom() {
  return (
    <PatternSurface pattern="dots" tone="brown" ground="var(--bbm-color-bg-blue)" className="pg-post pg-post--center">
      <Polaroid frame="scallop" src={art.mom} alt="Mom in her apron, smiling" width={240} rotate={0} />
      <Card frame="stripes" tone="cherry" padding="md" rotate={-2} className="pg-post__mom">
        <p className="bbm-text-heading-md" style={{ margin: 0 }}>
          Hi, I'm Mom.
        </p>
        <p className="bbm-text-body-sm" style={{ margin: '6px 0 0' }}>
          Thirty years of birthday cakes. Now I bake for yours too.
        </p>
        <p className="pg-signature" style={{ fontSize: 34 }}>
          with love, Mom
        </p>
      </Card>
    </PatternSurface>
  );
}

function SocialPosts() {
  return (
    <div className="pg-posts">
      <ThisWeek />
      <FindUs />
      <NewBake />
      <BakeClub />
      <Review />
      <MeetMom />
    </div>
  );
}

const meta = {
  title: 'Pages/Social posts',
  component: SocialPosts,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'beige' },
    docs: {
      description: {
        component: fromBoard(
          "Instagram feed templates (4:5, 1080 × 1350 at 2.5×), each one a board section turned into a post: the **menu card** on blue stripes (16), the **week's stops** on grid paper (15), a **sticker-covered** new bake (07), the **Bake Club ticket** (10), a **scalloped review** (01) and **Meet Mom** on dots (05). One idea per post, the logo or handle once.",
          ['16', '15', '07', '10', '01', '05'],
        ),
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof SocialPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Templates: Story = {};
