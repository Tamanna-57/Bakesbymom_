// Shared sample content for section stories and page mockups.
import {
  Button,
  Doodle,
  type AccordionItem,
  type FooterColumn,
  type FooterSocial,
  type GalleryItem,
  type NavLink,
  type ScheduleDay,
} from '@bakesbymom/ui';
import { art, menu } from './index';

export const navLinks: NavLink[] = [
  { label: 'Menu', href: '#menu', current: true },
  { label: 'Custom cakes', href: '#custom' },
  { label: 'Find us', href: '#find-us' },
  { label: 'Bake Club', href: '#club' },
];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Search and the order box with a count, as on pins 13 and 15. */
export const headerActions = (
  <>
    <Button variant="secondary" shape="circle" size="sm" aria-label="Search" href="#search">
      <Icon d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8" />
    </Button>
    <span className="sb-order-box">
      <Button variant="secondary" shape="circle" size="sm" aria-label="Order box, 2 items" href="#order">
        <Icon d="M4 9h16l-1.5 10.5a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3zM8.5 9V7.5a3.5 3.5 0 0 1 7 0V9" />
      </Button>
      <span className="sb-order-box__count" aria-hidden="true">
        2
      </span>
    </span>
  </>
);

export const mobileCta = (
  <Button fullWidth href="#custom">
    Order a cake
  </Button>
);

export const announcement = (
  <>
    Order by Wednesday for Saturday pick-up. <a href="#menu">See this week's menu →</a>
  </>
);

export const footerColumns: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: "This week's menu", href: '#menu' },
      { label: 'Custom cakes', href: '#custom' },
      { label: 'Bake Club', href: '#club' },
      { label: 'Find us', href: '#find-us' },
    ],
  },
  {
    title: 'Hello',
    links: [
      { label: 'Our story', href: '#story' },
      { label: 'Allergens', href: '#allergens' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

export const footerSocials: FooterSocial[] = [
  {
    label: 'Instagram',
    href: '#instagram',
    icon: (
      <Icon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h0" />
    ),
  },
  {
    label: 'Facebook',
    href: '#facebook',
    icon: <Icon d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  },
  { label: 'TikTok', href: '#tiktok', icon: <Icon d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.5 4.6 5 4.8" /> },
];

export const footerContact = (
  <>
    <p>(512) 555-0134</p>
    <p>hello@bakesbymom.com</p>
  </>
);

export const footerBottom = (
  <p>
    © 2026 Bakes by Mom · Baked in a home kitchen that also handles nuts, dairy, eggs and wheat. Made with real butter.
  </p>
);

export const footerNewsletter = {
  title: "Mom's letter",
  description: 'One email every Monday: the menu and where to find Mom.',
  buttonLabel: 'Sign up',
  onSubmit: () => new Promise<void>((resolve) => setTimeout(resolve, 600)),
};

/** Photos for the gallery: the illustrations stand in for real photos. */
export const galleryItems: GalleryItem[] = [
  {
    src: art.kitchen,
    alt: "Mom's kitchen with jars on a shelf and a cake on a stand",
    caption: "Mom's kitchen, Saturday 6am",
  },
  { src: art.cookies, alt: 'Brown butter cookies on a blue plate', caption: 'Brown butter cookies' },
  { src: art.cherryPie, alt: 'Lattice-topped cherry pie', caption: 'Sour cherry pie, out of the oven' },
  { src: art.mom, alt: 'Mom in her apron, smiling', caption: 'Mom, apron on' },
  {
    src: art.strawberryCake,
    alt: 'Strawberry layer cake with a cherry on top',
    caption: "Saturday's strawberry layer cake",
  },
  { src: art.cupcake, alt: 'Pink cupcake with sprinkles', caption: 'Birthday cupcakes' },
  { src: art.macarons, alt: 'A stack of macarons', caption: 'The macaron box' },
  { src: art.sourdough, alt: 'Round sourdough loaf', caption: 'Sunday sourdough' },
  { src: art.cinnamonRoll, alt: 'Cinnamon roll with icing', caption: 'Cinnamon rolls' },
];

export const scheduleDays: ScheduleDay[] = [
  { date: 'Mon 12', label: 'Monday 12 May', closed: true },
  {
    date: 'Tue 13',
    label: 'Tuesday 13 May',
    place: 'Cookie drop at Bean & Co.',
    href: '#map',
    time: '4–6pm',
    icon: <Doodle name="heart" size={28} color="var(--bbm-color-cherry-500)" />,
  },
  {
    date: 'Wed 14',
    label: 'Wednesday 14 May',
    place: 'Porch pick-up',
    href: '#map',
    time: '3–7pm',
    icon: <Doodle name="cupcake" size={32} />,
    today: true,
  },
  {
    date: 'Thu 15',
    label: 'Thursday 15 May',
    place: 'Library bake sale',
    href: '#map',
    time: '10am–2pm',
    icon: <Doodle name="star" size={28} color="var(--bbm-color-butter-400)" />,
  },
  {
    date: 'Fri 16',
    label: 'Friday 16 May',
    place: 'Baking day',
    time: 'Orders only',
    icon: <Doodle name="whisk" size={30} />,
  },
  {
    date: 'Sat 17',
    label: 'Saturday 17 May',
    place: "Farmers' market",
    href: '#map',
    time: '8am–1pm',
    icon: <Doodle name="cherry" size={30} color="var(--bbm-color-cherry-500)" />,
  },
  { date: 'Sun 18', label: 'Sunday 18 May', closed: true },
];

export const faqItems: AccordionItem[] = [
  {
    icon: <Doodle name="star" size={28} color="var(--bbm-color-butter-400)" />,
    title: 'How far ahead should I order?',
    content: <p>Order by Wednesday for Saturday. Custom cakes need a week.</p>,
  },
  {
    icon: <Doodle name="daisy" size={28} />,
    title: 'Do you do gluten-free?',
    content: <p>Most bakes can be made gluten-free, dairy-free or nut-free. Just add a note.</p>,
  },
  {
    icon: <Doodle name="heart" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'Is the kitchen allergen-free?',
    content: <p>No: it's a home kitchen that also handles nuts, dairy, eggs and wheat.</p>,
  },
  {
    icon: <Doodle name="cupcake" size={28} />,
    title: 'Do you deliver?',
    content: <p>Within 5 miles for $8; free on orders over $60.</p>,
  },
  {
    icon: <Doodle name="bow" size={28} />,
    title: 'Can I get a custom design?',
    content: <p>Yes. Send a photo or describe it and Mom will sketch it with you.</p>,
  },
  {
    icon: <Doodle name="cherry" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'How do I pay?',
    content: <p>A 50% deposit holds your date; the rest at pick-up.</p>,
  },
  {
    icon: <Doodle name="whisk" size={28} />,
    title: 'Can I cancel?',
    content: <p>Up to 72 hours before pick-up for a full refund of the deposit.</p>,
  },
  {
    icon: <Doodle name="sparkle" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'Can I pause the Bake Club?',
    content: <p>Any time, from the link in every Bake Club email.</p>,
  },
];

export const reviews = [
  {
    author: 'Priya S.',
    quote: 'The strawberry cake tasted exactly like the one my grandmother used to make. Not a crumb left.',
    detail: 'Strawberry layer cake',
    rating: 5,
    tone: 'pink' as const,
  },
  {
    author: 'Marcus T.',
    quote: "Ordered cupcakes for my son's class. Twenty-four kids, zero leftovers.",
    detail: 'Birthday cupcakes',
    rating: 5,
    tone: 'blue' as const,
  },
  {
    author: 'Ana & Luis',
    quote: 'The cinnamon rolls are dangerous. We pre-order every Saturday now.',
    detail: 'Cinnamon rolls',
    rating: 5,
    tone: 'butter' as const,
  },
  {
    author: 'Hannah R.',
    quote: 'She made a gluten-free version of my wedding cake and nobody could tell.',
    detail: 'Custom cake',
    rating: 5,
    tone: 'pink' as const,
  },
];

export const howToOrder = [
  {
    icon: <Doodle name="cupcake" size={32} />,
    title: 'Pick your bake',
    description: 'Choose from this week’s menu, or ask Mom for something special.',
  },
  {
    icon: <Doodle name="sparkle" size={30} color="var(--bbm-color-butter-300)" />,
    title: 'Choose a date',
    description: 'Order by Wednesday for Saturday; custom cakes need a week.',
  },
  {
    icon: <Doodle name="heart" size={30} color="var(--bbm-color-cherry-500)" />,
    title: 'Pick it up warm',
    description: 'Saturday 9am–1pm from the porch, or at the market.',
  },
  {
    icon: <Doodle name="cherry" size={30} color="var(--bbm-color-cherry-500)" />,
    title: 'Share a slice',
    description: 'Tag @bakesbymom so Mom can see.',
  },
];

export const menuTeaser = menu.slice(0, 8);
