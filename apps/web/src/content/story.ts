// "Bake it with Mom": the About page's story, told one baking step at a time while the light in her kitchen
// moves from sunrise to night. Mom's lines are built from what the site already says about her. Swap in her
// real details (the first cake, the year, the order that turned it into a business) as they come in.

export interface BakeStep {
  id: 'measure' | 'eggs' | 'mix' | 'bake' | 'decorate' | 'box';
  /** Short name on the step rail. */
  label: string;
  /** The time of day the kitchen light shows. */
  time: string;
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
    title: 'Flour, sugar and a little hope',
    hint: 'Keep scrolling to pour',
    says: 'I never set out to run a bakery. I baked for the people I love: a birthday cake here, a tray of brownies there, and the kitchen quietly learned my hands.',
    scene: "Flour pours into Mom's mixing bowl as the sun comes up in the kitchen window.",
  },
  {
    id: 'eggs',
    label: 'Eggs?',
    time: '9:30 am',
    title: 'Now crack in the eggs…',
    hint: 'Go on, tap the egg',
    says: "Not in my kitchen, beta. Every cake I've ever baked is eggless, so everyone at the table can have a slice.",
    scene: "An egg sits on the counter, and Mom's hand, in gold bangles, reaches in and takes it away.",
  },
  {
    id: 'mix',
    label: 'Mix',
    time: '12:00 pm',
    title: 'Whisk it till it shines',
    hint: 'Scroll to whisk',
    says: 'One order became two, and two became a weekend booked out. Batch after batch, the sponge got softer and the cream got steadier.',
    scene: 'A whisk turns the flour into smooth golden batter in the midday light.',
  },
  {
    id: 'bake',
    label: 'Bake',
    time: '3:00 pm',
    title: 'Into the oven',
    hint: 'No peeking',
    says: "This is the part you can't rush. Everything is still baked to order, in batches small enough to taste the care.",
    scene: 'The cake rises behind the glowing oven door while the timer counts down.',
  },
  {
    id: 'decorate',
    label: 'Decorate',
    time: '6:30 pm',
    title: 'Whose name goes on top?',
    hint: 'Type a name and watch it piped on',
    says: "Every cake that leaves this kitchen has someone's name on it. Birthdays, anniversaries, first days and farewells.",
    scene: 'A pink cake with cherries on a stand, and a piping bag writing a name across it in icing.',
  },
  {
    id: 'box',
    label: 'Box it',
    time: '9:00 pm',
    title: 'Boxed, tied, ready to go',
    hint: '',
    says: "From my kitchen in Panipat to your table. Tell me the day, and I'll bake it fresh for you.",
    scene: 'Under the kitchen lamp at night, the cake is boxed and tied with a cherry ribbon and a name tag.',
  },
];

/** How long the cake stays in the oven, in seconds. Long enough to feel the wait, short enough to stay. */
export const BAKE_SECONDS = 5;
