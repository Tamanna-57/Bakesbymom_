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
import { bakery, inr, timeSlots } from '../../apps/web/src/content/bakery';
import { findCake } from '../../apps/web/src/content/catalog';
import { reviews } from '../../apps/web/src/content/site';
import { fromBoard } from '../sections/ref';

const featuredCake = findCake('cake-choco-drip')!;
const review = reviews[0]!;
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
      <SectionHeading variant="ribbon" size="md" title="Cakes" ribbonText="baked to order" level={2} />
      <ProductCard
        as="div"
        variant="menu"
        className="site-cake-card"
        name={featuredCake.name}
        image={{ src: featuredCake.photos[0]!.thumb, alt: featuredCake.name }}
        description={featuredCake.description}
        price={inr(featuredCake.price)}
        style={{ width: 250 }}
      />
      <p className="pg-post__note">Order on WhatsApp · {bakery.instagramHandle}</p>
    </PatternSurface>
  );
}

/** Pin 15's schedule rows on grid paper: the order time slots, one highlighted. */
function FindUs() {
  return (
    <PatternSurface pattern="grid" tone="pink" ground="var(--bbm-color-bg-surface)" className="pg-post">
      <p className="bbm-text-eyebrow" style={{ margin: 0, color: 'var(--bbm-color-text-brand)' }}>
        Order on WhatsApp
      </p>
      <p className="bbm-text-heavy" style={{ margin: '4px 0 18px' }}>
        Pick a time
      </p>
      <ul className="pg-post__days">
        {timeSlots.map((slot, i) => {
          const [name, hours] = slot.replace(')', '').split(' (');
          return (
            <li key={slot} data-today={i === 2 || undefined}>
              <span className="pg-post__day">{name}</span>
              <span />
              <span>{hours}</span>
            </li>
          );
        })}
      </ul>
      <Doodle name="arrow" size={76} color="var(--bbm-color-cherry-700)" className="pg-post__arrow" />
      <p className="bbm-text-hand-md pg-post__hand">a day's notice helps!</p>
    </PatternSurface>
  );
}

/** Pin 07: a cutout covered in stickers, with an arrow headline. */
function NewBake() {
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-bg-canvas)' }}>
      <p className="pg-post__arrows">
        Pick your flour <span aria-hidden="true">→</span>
        <br />
        ragi or jowar <span aria-hidden="true">→</span>
        <br />
        <em>your cookie</em>
      </p>
      <div className="pg-post__sticker-stage">
        <img src={art.cookies} alt="Three chocolate chip cookies on a blue plate" width={260} height={260} />
        <Ticket variant="stamp" tone="butter" rotate={-8} className="pg-post__s1">
          100% eggless
        </Ticket>
        <Seal text="Baked to order • Baked to order • " size={96} tone="pink" className="pg-post__s2">
          <Doodle name="heart" size={22} color="var(--bbm-color-cherry-700)" />
        </Seal>
        <Badge tone="cherry" variant="solid" shape="tape" className="pg-post__s3">
          New!
        </Badge>
      </div>
      <p className="pg-post__note">Choco chip cookies · from 250 g</p>
    </div>
  );
}

/** Pin 10's ticket for gifting, heavy title with a script word on top. */
function GiftTicket() {
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-bg-pink)', justifyContent: 'center' }}>
      <Ticket tone="beige" stub="With love" className="pg-post__ticket">
        <div className="pg-post__lockup">
          <p className="bbm-text-heavy" style={{ margin: 0 }}>
            Send a cake
          </p>
          <p className="bbm-text-script-sm pg-post__script">as a gift</p>
        </div>
        <p className="bbm-text-body-sm" style={{ margin: '8px 0 0' }}>
          Gift wrapping, a gift box and a greeting card note, with a message piped on top.
        </p>
        <Badge tone="blue" variant="solid" style={{ marginTop: 14 }}>
          Order on WhatsApp · link in bio
        </Badge>
      </Ticket>
      <Seal text="Bakes by Mom • 100% eggless • " size={104} tone="cherry" className="pg-post__seal">
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
        author={review.author}
        detail={review.detail}
        rating={review.rating}
        quote={review.quote}
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
          I baked for the people I love. Now I bake for yours too.
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
      <GiftTicket />
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
          'Instagram feed templates (4:5, 1080 × 1350 at 2.5×), each one a board section turned into a post: the **menu card** on blue stripes (16), the **order time slots** on grid paper (15), a **sticker-covered** cookie post (07), a **gifting ticket** (10), a **scalloped review** (01) and **Meet Mom** on dots (05). One idea per post, the logo or handle once.',
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
