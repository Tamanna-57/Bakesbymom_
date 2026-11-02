// The collages on the site, laid out like the board pins: the bakes as die-cut stickers over halftone cherries,
// photos in stamp frames, scalloped badges, tape, a gift tag and Mom's notes.
import { stock, treatArt } from '../content';
import { Badge, Bubble, Collage, GiftTag, Halftone, Note, Stamp, Sticker, Tape } from './Collage';

const photo = (slug: string) => treatArt[slug]?.src ?? stock.cupcakes.src;

/** Cakes & Treats: the cherry cake front and centre, every other bake stuck round it. */
export function ShopCollage() {
  return (
    <Collage
      ratio={1.08}
      label="A collage of our bakes: a pink cherry cake on a stand, jar cakes, a box of heart biscuits, brownies and cookies in stamp frames, and a badge that says 100% eggless."
      className="collage--hero"
    >
      <Halftone src="halftone-cherries" place={{ x: 52, y: -2, w: 46, r: 8, z: 0, i: 0 }} />
      <Stamp src={photo('brownies')} caption="brownies" place={{ x: 1, y: 6, w: 27, r: -7, z: 2, i: 1 }} />
      <Stamp src={photo('cookies')} caption="cookies" place={{ x: 4, y: 46, w: 24, r: 5, z: 2, i: 2 }} />
      <Sticker src="sticker-cherry-cake" place={{ x: 28, y: 2, w: 38, r: -2, z: 4, i: 3 }} float />
      <Sticker src="sticker-jar-cakes" place={{ x: 20, y: 66, w: 32, r: 4, z: 5, i: 4 }} />
      <Sticker src="sticker-gift-box" place={{ x: 62, y: 50, w: 34, r: 6, z: 3, i: 5 }} />
      <Badge value="100%" label="eggless" tone="cherry" place={{ x: 58, y: 30, w: 17, r: -10, z: 6, i: 6 }} />
      <GiftTag place={{ x: 56, y: 86, w: 34, r: -4, z: 6, i: 7 }}>baked by Mom, for you</GiftTag>
      <Note arrow="right" place={{ x: 2, y: 84, w: 24, r: -6, z: 6, i: 8 }}>
        never off a shelf
      </Note>
      <Tape tone="butter" place={{ x: 46, y: 50, w: 14, r: 38, z: 6, i: 9 }} />
    </Collage>
  );
}

/** The cakes page: a halftone cake behind the real one, and the occasions in stamp frames. */
export function CakesCollage() {
  return (
    <Collage
      ratio={1.08}
      label="A collage: a pink drip cake on a stand, a halftone print of a cherry cake, and photos of celebration cakes in stamp frames."
      className="collage--hero"
    >
      <Halftone src="halftone-cake" place={{ x: 2, y: 0, w: 36, r: -4, z: 0, i: 0 }} />
      <Stamp src={stock.occasions.src} caption="every occasion" place={{ x: 66, y: 4, w: 30, r: 6, z: 2, i: 1 }} />
      <Stamp src={stock.custom.src} caption="or your own idea" place={{ x: 6, y: 52, w: 26, r: -6, z: 2, i: 2 }} />
      <Sticker src="sticker-drip-cake" place={{ x: 30, y: 12, w: 40, r: 2, z: 4, i: 3 }} float />
      <Halftone src="halftone-cherries-pink" place={{ x: 62, y: 56, w: 30, r: -10, z: 1, i: 4 }} />
      <Badge value="1 kg" label="serves 8–10" tone="pink" place={{ x: 64, y: 50, w: 16, r: 10, z: 6, i: 5 }} />
      <GiftTag place={{ x: 36, y: 80, w: 38, r: 3, z: 6, i: 6 }}>your name, piped on top</GiftTag>
      <Tape tone="blue" place={{ x: 74, y: 2, w: 13, r: -20, z: 6, i: 7 }} />
    </Collage>
  );
}

/** One small collage per step of an order. */
export function StepCollage({ step }: { step: 'message' | 'bake' | 'box' }) {
  if (step === 'message') {
    return (
      <Collage
        ratio={1.3}
        label="A WhatsApp chat: you ask for a cake for Saturday, Mom says of course."
        className="collage--step"
      >
        <Halftone src="halftone-cherries-pink" place={{ x: 58, y: 4, w: 36, r: 12, z: 0, i: 0 }} />
        <Bubble from="you" place={{ x: 16, y: 18, w: 60, r: -2, z: 2, i: 1 }}>
          Hi Mom! A cherry cake for Saturday, with “Riya” on top? 🎂
        </Bubble>
        <Bubble from="mom" place={{ x: 30, y: 54, w: 50, r: 2, z: 2, i: 2 }}>
          Of course! Eggless as always ♥
        </Bubble>
      </Collage>
    );
  }
  if (step === 'bake') {
    return (
      <Collage
        ratio={1.3}
        label="A photo of flour being sifted into a bowl, in a stamp frame, and a halftone egg."
        className="collage--step"
      >
        <Stamp src={stock.kitchen.src} place={{ x: 18, y: 6, w: 46, r: -5, z: 1, i: 0 }} />
        <Halftone src="halftone-egg" place={{ x: 62, y: 40, w: 22, r: 14, z: 2, i: 1 }} />
        <Note arrow="left" place={{ x: 64, y: 8, w: 32, r: 6, z: 3, i: 2 }}>
          still no eggs
        </Note>
      </Collage>
    );
  }
  return (
    <Collage ratio={1.3} label="A box of heart biscuits with a gift tag." className="collage--step">
      <Sticker src="sticker-gift-box" place={{ x: 16, y: 4, w: 54, r: -4, z: 1, i: 0 }} />
      <GiftTag place={{ x: 52, y: 66, w: 44, r: -6, z: 2, i: 1 }}>for you</GiftTag>
    </Collage>
  );
}

/** The combo: a cake and cupcakes iced to match. */
export function ComboCollage() {
  return (
    <Collage
      ratio={1.15}
      label="A collage: a cherry cake on a stand, a photo of a cake with matching cupcakes in a stamp frame, and pink halftone cherries."
      className="collage--hero"
    >
      <Halftone src="halftone-cherries-pink" place={{ x: 0, y: 2, w: 40, r: -10, z: 0, i: 0 }} />
      <Stamp src={photo('combos')} caption="cake + cupcakes" place={{ x: 46, y: 6, w: 38, r: 6, z: 1, i: 1 }} />
      <Sticker src="sticker-cherry-cake" place={{ x: 14, y: 8, w: 36, r: -4, z: 3, i: 2 }} float />
      <Badge value="1 box" label="iced to match" tone="butter" place={{ x: 40, y: 66, w: 18, r: -8, z: 4, i: 3 }} />
    </Collage>
  );
}
