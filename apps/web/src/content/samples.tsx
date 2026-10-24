// Sample content for the design demos that only appear in Storybook (Sections / Find us, Newsletter,
// Journal). None of this is on the website; the bakery's real details are in bakery.ts and site.tsx.
import { Doodle, type ScheduleDay } from '@bakesbymom/ui';

export const scheduleDays: ScheduleDay[] = [
  { date: 'Mon 12', label: 'Monday 12', closed: true },
  {
    date: 'Tue 13',
    label: 'Tuesday 13',
    place: 'Cookie boxes go out',
    time: '4–8pm',
    icon: <Doodle name="heart" size={28} color="var(--bbm-color-cherry-500)" />,
  },
  {
    date: 'Wed 14',
    label: 'Wednesday 14',
    place: 'Kitchen pick-up',
    time: '12–4pm',
    icon: <Doodle name="cupcake" size={32} />,
    today: true,
  },
  {
    date: 'Thu 15',
    label: 'Thursday 15',
    place: 'Birthday cakes',
    time: '9am–12pm',
    icon: <Doodle name="star" size={28} color="var(--bbm-color-butter-400)" />,
  },
  {
    date: 'Fri 16',
    label: 'Friday 16',
    place: 'Baking day',
    time: 'Orders only',
    icon: <Doodle name="whisk" size={30} />,
  },
  {
    date: 'Sat 17',
    label: 'Saturday 17',
    place: 'Festival boxes',
    time: '9am–8pm',
    icon: <Doodle name="cherry" size={30} color="var(--bbm-color-cherry-500)" />,
  },
  { date: 'Sun 18', label: 'Sunday 18', closed: true },
];

export const journalPosts = [
  { kicker: 'Recipe', title: "Mom's butter nankhatai", date: '12 May' },
  { kicker: 'News', title: 'The Diwali dry-fruit tins are back', date: '8 May' },
  { kicker: 'Recipe', title: 'Ragi cookies, three ways', date: '1 May' },
];
