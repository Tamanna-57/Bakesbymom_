// "Bake it with Mom": the About page's story, told one baking step at a time while the light in her kitchen
// moves from sunrise to night. Mom's lines are built from what the site already says about her. Swap in her
// real details (the first cake, the year, the order that turned it into a business) as they come in.

export interface BakeStep {
  id: 'measure' | 'eggs' | 'mix' | 'bake' | 'decorate' | 'box';
  /** Short name on the step rail. */
  label: string;
  /** The time of day the kitchen light shows. */
  time: string;
  /** The light at that hour, under the time on the clock badge. */
  light: string;
  /** What you're doing, as the card's heading. */
  title: string;
  /** What to do next (scroll, tap, type). */
  hint: string;
  /** Mom, in her own words: this is where the story lives. */
  says: string;
  /** What the illustration shows, for screen readers. */
  scene: string;
}

export const bakeSteps: BakeStep[] = [
  {
    id: 'measure',
    label: 'Measure',
    time: '6:00 am',
    light: 'sunrise',
    title: 'Flour, sugar and a little hope',
    hint: 'Keep scrolling to pour',
    says: 'I never set out to run a bakery. I baked for the people I love: a birthday cake here, a tray of brownies there, and the kitchen quietly learned my hands.',
    scene: 'A hand sifts flour into a bowl in the early morning light.',
  },
  {
    id: 'eggs',
    label: 'Eggs?',
    time: '9:30 am',
    light: 'morning',
    title: 'Now crack in the eggs…',
    hint: 'Go on, tap the egg',
    says: "Not in my kitchen, beta. Every cake I've ever baked is eggless, so everyone at the table can have a slice.",
    scene: 'A bowl of pink batter, and an egg waiting beside it that Mom takes away.',
  },
  {
    id: 'mix',
    label: 'Mix',
    time: '12:00 pm',
    light: 'noon',
    title: 'Whisk it till it shines',
    hint: 'Scroll to whisk',
    says: 'One order became two, and two became a weekend booked out. Batch after batch, the sponge got softer and the cream got steadier.',
    scene: 'Mom, in her apron, mixes a bowl of batter while the orders come in on WhatsApp.',
  },
  {
    id: 'bake',
    label: 'Bake',
    time: '3:00 pm',
    light: 'afternoon',
    title: 'Into the oven',
    hint: 'No peeking',
    says: "This is the part you can't rush. Everything is still baked to order, in batches small enough to taste the care.",
    scene: 'Batter pours into a cake tin, and the oven timer counts down.',
  },
  {
    id: 'decorate',
    label: 'Decorate',
    time: '6:30 pm',
    light: 'dusk',
    title: 'Whose name goes on top?',
    hint: 'Type a name and watch it piped on',
    says: "Every cake that leaves this kitchen has someone's name on it. Birthdays, anniversaries, first days and farewells.",
    scene: "Cakes Mom has baked, each with someone's name on it, and a tag with the name you type.",
  },
  {
    id: 'box',
    label: 'Box it',
    time: '9:00 pm',
    light: 'night',
    title: 'Boxed, tied, ready to go',
    hint: '',
    says: "From my kitchen in Panipat to your table. Tell me the day, and I'll bake it fresh for you.",
    scene: 'At night, a cake in its box, a box of biscuits and a gift tag with the name on it.',
  },
];

/** How long the cake stays in the oven, in seconds. Long enough to feel the wait, short enough to stay. */
export const BAKE_SECONDS = 5;
