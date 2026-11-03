/**
 * Our story, dressed like the home page so the two read as one shop: the home hero's arch and cream card on
 * pink candy stripes, its cherry ribbon, the bake on blue stripes (bake.tsx), Mom's letter in the outlined card
 * on pink polka dots with her own cakes stuck round it, and her three promises on scalloped badges over the
 * checker band the home page's quote sits on.
 */
import type { CSSProperties } from 'react';
import { Button, Card, Marquee, PatternSurface } from '@bakesbymom/ui';
import { Badge, Collage, GiftTag, Halftone, Note, Stamp, Tape } from '../collage/Collage';
import { momsCakes, stock } from '../content';
import { bakery } from '../content/bakery';
import { orderLink } from '../content/site';
import { bakeSteps } from '../content/story';
import './home.css';
import './story.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

/* Hero: the home hero, mirrored, on pink stripes ----------------------- */

export function StoryHero() {
  return (
    <PatternSurface
      as="section"
      pattern="stripes"
      tone="pink"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="home-hero story-hero"
      aria-labelledby="story-title"
    >
      <div className="home-hero__inner story-hero__inner">
        <div className="home-hero__card story-hero__card">
          <p className="home-hero__eyebrow">Our story · {bakery.place}</p>
          <h1 id="story-title" className="home-hero__title">
            <span className="home-hero__heavy">Pull up a stool and</span>{' '}
            <span className="home-hero__script">bake one with Mom</span>
          </h1>
          <p className="home-hero__lead">
            The best way to hear how Bakes by Mom began is in her kitchen, with your sleeves rolled up. One cake, from
            sunrise to night, and she'll tell you the story while you bake.
          </p>
          <div className="home-hero__actions">
            <Button size="lg" href="#bake">
              Start baking
            </Button>
            <Button size="lg" variant="secondary" href="#mom">
              Meet Mom
            </Button>
          </div>
        </div>
        <div className="story-hero__art">
          <Collage
            ratio={0.86}
            label="A cake Mom baked that says HBD Mom, in an arched frame, with a photo of flour being sifted in a stamp frame, a 100% eggless badge and a gift tag from Panipat."
          >
            <Halftone src="halftone-cherries-pink" place={{ x: 76, y: 22, w: 24, r: 12, z: 0, i: 0 }} />
            <div
              className="collage__piece story-hero__arch"
              style={{ left: '14%', top: '5%', width: '70%', zIndex: 2, '--i': 1 } as CSSProperties}
            >
              <img src={momsCakes.hbdMom.src} alt="" width={800} height={1000} data-parallax="-0.04" />
            </div>
            <Tape tone="blue" place={{ x: 40, y: 2, w: 16, r: -8, z: 4, i: 2 }} />
            <Stamp src={stock.kitchen.src} caption="Mom's kitchen" place={{ x: 0, y: 55, w: 30, r: -7, z: 4, i: 3 }} />
            <Badge value="100%" label="eggless" tone="cherry" place={{ x: 4, y: 6, w: 21, r: -10, z: 5, i: 4 }} />
            <Note arrow="left" place={{ x: 78, y: 0, w: 22, r: 6, z: 5, i: 5 }}>
              a cake for Mom, by Mom
            </Note>
            <GiftTag place={{ x: 48, y: 85, w: 48, r: -4, z: 6, i: 6 }}>
              from {bakery.place.split(',')[0]}, with love
            </GiftTag>
          </Collage>
        </div>
      </div>
    </PatternSurface>
  );
}

/* The ribbon: the bake, step by step, under the home page's cherries --- */

export function StoryRibbon() {
  return (
    <div className="home-ribbon">
      <Marquee
        tone="cherry"
        size="sm"
        label="The bake, step by step"
        items={bakeSteps.map((step) => `${step.time} · ${step.label.replace('?', '')}`)}
        separator={<span className="home-ribbon__diamond" aria-hidden="true" />}
      />
      <div className="home-ribbon__shapes" aria-hidden="true" />
    </div>
  );
}

/* Meet Mom: the home page's outlined about card, with her own cakes ----- */

export function StoryMeetMom() {
  return (
    <PatternSurface
      as="section"
      id="mom"
      pattern="dots"
      tone="pink"
      ground="var(--bbm-color-bg-pink)"
      className="story-mom"
    >
      <div className="site-container">
        <Card outline="brand" padding="lg" className="story-mom__card">
          <div className="story-mom__copy">
            <p className="home-hero__eyebrow">The baker behind it all</p>
            <h2 className="home-hero__title story-mom__title">
              <span className="home-hero__heavy">Hi, I'm</span> <span className="home-hero__script">Mom.</span>
            </h2>
            <p className="story-mom__lead">
              I never set out to run a bakery. I baked for the people I love, a birthday cake here, a tray of brownies
              there, and the kitchen quietly learned my hands.
            </p>
            <p>
              One order became two, two became a weekend booked out. Everything is still mixed, baked to order and
              finished by hand in {bakery.place}, in batches small enough to taste the care.
            </p>
            <p className="story-mom__sign">with love, Mom</p>
          </div>
          <div className="story-mom__art">
            <Collage
              ratio={0.9}
              label="Three cakes Mom has baked, in stamp frames: a bride-to-be cake, an anniversary cake and an engagement cake."
            >
              <Halftone src="halftone-cherries" place={{ x: 76, y: 64, w: 24, r: -8, z: 0, i: 0 }} />
              <Stamp
                src={momsCakes.brideToBe.src}
                caption="for a bride"
                place={{ x: 0, y: 2, w: 40, r: -6, z: 2, i: 1 }}
              />
              <Stamp
                src={momsCakes.anniversary.src}
                caption="for an anniversary"
                place={{ x: 57, y: 0, w: 40, r: 5, z: 1, i: 2 }}
              />
              <Stamp
                src={momsCakes.engaged.src}
                caption="for a yes"
                place={{ x: 29, y: 44, w: 44, r: -2, z: 3, i: 3 }}
              />
              <Note arrow="right" place={{ x: 0, y: 70, w: 27, r: -6, z: 4, i: 4 }}>
                a few of mine ♥
              </Note>
            </Collage>
          </div>
        </Card>
      </div>
    </PatternSurface>
  );
}

/* Her promises: scalloped badges on the home page's checker band ------- */

const promises = [
  {
    value: '100%',
    label: 'eggless',
    tone: 'cherry' as const,
    title: 'No eggs, ever',
    text: 'Pure vegetarian, with the FSSAI green dot, so everyone at the table can have a slice.',
  },
  {
    value: 'fresh',
    label: 'to order',
    tone: 'butter' as const,
    title: 'Baked for your day',
    text: 'Never off a shelf. Small batches, mixed and baked for the date you ask for.',
  },
  {
    value: '♥',
    label: 'by hand',
    tone: 'pink' as const,
    title: 'Iced by hand',
    text: 'Finished the morning it goes out, down to the name piped on top.',
  },
];

export function StoryPromises() {
  return (
    <PatternSurface
      as="section"
      pattern="checker"
      tone="pink"
      scale="lg"
      ground="var(--bbm-color-bg-canvas)"
      className="story-promises"
      aria-labelledby="promises-title"
    >
      <div className="story-promises__card">
        <h2 id="promises-title" className="story-promises__title">
          <span className="home-script">Three things</span> in every box
        </h2>
        <ul className="story-promises__list">
          {promises.map((promise) => (
            <li key={promise.title}>
              <div className="story-promises__badge">
                <Collage ratio={1} label={`${promise.value} ${promise.label}`}>
                  <Badge
                    value={promise.value}
                    label={promise.label}
                    tone={promise.tone}
                    place={{ x: 0, y: 0, w: 100, r: -8 }}
                  />
                </Collage>
              </div>
              <h3>{promise.title}</h3>
              <p>{promise.text}</p>
            </li>
          ))}
        </ul>
        <div className="story-promises__actions">
          <Button href={orderLink} {...external}>
            Order on WhatsApp
          </Button>
          <Button variant="secondary" href="/shop">
            Cakes & treats
          </Button>
        </div>
      </div>
    </PatternSurface>
  );
}
