// The isometric scenes on the site: the treats counter (Treats page), the cake on its stand with the
// occasions floating round it (Cakes page) and the three steps of an order (message, bake, box).
import { Box, Drop, Face, Float, Guide, IsoScene, Landing, Sparkle, Tag } from './kit';
import { M, type Material } from './materials';
import {
  Bento,
  BrownieStack,
  CakeBox,
  CookieStack,
  Cupcake,
  JarCake,
  LayerCake,
  Loaf,
  Oven,
  Phone,
  Platform,
  Stand,
  standHeight,
} from './objects';

/** The Treats page: every kind of bake on one pink counter, with the bento hovering in to land. */
export function TreatsCounterScene() {
  const top = 10;
  return (
    <IsoScene
      width={560}
      height={470}
      camera={{ k: 2.05, ox: 252, oy: 150 }}
      label="Brownies, cookies, a jar cake, a sliced tea cake, cupcakes and a cake box tied with a cherry ribbon on a pink counter, with a bento cake floating down to land."
      className="iso-hero-art"
    >
      <Platform x={0} y={0} w={150} d={112} mat={M.pink} inset={M.paper} />
      <Drop i={0}>
        <CakeBox x={52} y={14} z={top} w={32} d={32} h={26} />
      </Drop>
      <Drop i={1}>
        <JarCake x={118} y={20} z={top} />
        <JarCake x={134} y={36} z={top} r={6.5} h={18} />
      </Drop>
      <Drop i={2}>
        <Loaf x={8} y={54} z={top} />
      </Drop>
      <Landing x={70} y={66} z={top} r={15} />
      <Drop i={3}>
        <Cupcake x={124} y={64} z={top} />
        <Cupcake x={106} y={84} z={top} s={0.85} frosting={M.blush} />
      </Drop>
      <Drop i={4}>
        <BrownieStack x={22} y={84} z={top} />
      </Drop>
      <Drop i={5}>
        <CookieStack x={78} y={96} z={top} />
      </Drop>
      <Guide from={[70, 66, top]} to={[70, 66, 48]} />
      <Drop i={6} from={60}>
        <Float amp={6}>
          <Bento x={57} y={53} z={52} />
        </Float>
      </Drop>
      <Sparkle at={[150, -10, 70]} size={7} />
      <Sparkle at={[-6, 30, 60]} size={5} tone="cherry" />
      <Sparkle at={[160, 80, 40]} size={4} />
      <Drop i={7}>
        <Tag at={[30, 92, top + 14]} dx={-36} dy={-46} kicker="fudgy">
          Brownies
        </Tag>
        <Tag at={[128, 66, top + 16]} dx={64} dy={30} kicker="six or twelve">
          Cupcakes
        </Tag>
        <Tag at={[124, 24, top + 24]} dx={44} dy={-40} kicker="spoon inside">
          Jar cakes
        </Tag>
      </Drop>
    </IsoScene>
  );
}

const OCCASION_TILES: {
  icon: 'cake' | 'heart' | 'star';
  label: string;
  at: [number, number, number];
  mat: Material;
  color: string;
}[] = [
  { icon: 'cake', label: 'Birthdays', at: [-18, 34, 66], mat: M.paper, color: 'var(--bbm-color-cherry-700)' },
  { icon: 'heart', label: 'Anniversaries', at: [96, -14, 78], mat: M.pink, color: 'var(--bbm-color-cherry-600)' },
  { icon: 'star', label: 'Festivals', at: [104, 82, 44], mat: M.butter, color: 'var(--bbm-color-butter-600)' },
];

/** The Cakes page: a two-tier cake on a stand, on a blue slab, with occasion tiles floating round it. */
export function CakeStandScene() {
  const top = 10;
  const r = 24;
  const sh = standHeight(30);
  return (
    <IsoScene
      width={560}
      height={480}
      camera={{ k: 2.15, ox: 262, oy: 210 }}
      label="A two-tier pink cake with a chocolate drip and cherries on a white cake stand, with tiles for birthdays, anniversaries and festivals floating round it."
      className="iso-hero-art"
    >
      <Platform x={0} y={0} w={100} d={100} r={18} mat={M.sky} inset={M.blue} />
      <Drop i={0}>
        <Stand x={50} y={50} z={top} r={30} />
      </Drop>
      <Drop i={1} from={40}>
        <LayerCake
          x={50}
          y={50}
          z={top + sh}
          r={r}
          h={20}
          coat={M.pink}
          drip={false}
          piping={M.paper}
          pearls={M.paper}
          cherries={0}
        />
      </Drop>
      <Drop i={2} from={50}>
        <LayerCake
          x={50}
          y={50}
          z={top + sh + 20}
          r={15}
          h={16}
          coat={M.paper}
          drip={M.chocolate}
          piping={M.rose}
          pearls={false}
          cherries={3}
        />
      </Drop>
      {OCCASION_TILES.map((tile, i) => (
        <Drop key={tile.label} i={3 + i} from={36}>
          <Guide from={[tile.at[0] + 11, tile.at[1] + 11, tile.at[2]]} to={[tile.at[0] + 11, tile.at[1] + 11, 0]} />
          <Float delay={i * 0.9} amp={5}>
            <OccasionTile {...tile} />
          </Float>
        </Drop>
      ))}
      <Sparkle at={[20, -20, 90]} size={6} />
      <Sparkle at={[120, 40, 20]} size={4} tone="cherry" />
      <Sparkle at={[-30, 90, 20]} size={5} />
    </IsoScene>
  );
}

function OccasionTile({ icon, label, at, mat, color }: (typeof OCCASION_TILES)[number]) {
  const [x, y, z] = at;
  return (
    <g>
      <Box x={x} y={y} z={z} w={22} d={22} h={4} r={4} mat={mat} shadow={false}>
        <IconOnTop x={x} y={y} z={z + 4} icon={icon} color={color} />
      </Box>
      <Tag at={[x + 22, y + 11, z + 2]} dx={34} dy={4}>
        {label}
      </Tag>
    </g>
  );
}

const ICONS: Record<'cake' | 'heart' | 'star', string> = {
  cake: 'M4 20.5h16v-7.5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM4 15.5c2 1.6 4 1.6 6 0s4-1.6 6 0 3 1.2 4 .6M12 11V7.5M12 3.2c1.4 1.4 1.4 2.8 0 3.6-1.4-.8-1.4-2.2 0-3.6z',
  heart:
    'M12 21s-7.5-4.6-9.6-9.4C.9 7.8 3 4 6.6 4c2.2 0 3.9 1.2 5.4 3.2C13.5 5.2 15.2 4 17.4 4 21 4 23.1 7.8 21.6 11.6 19.5 16.4 12 21 12 21z',
  star: 'M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z',
};

function IconOnTop({
  x,
  y,
  z,
  icon,
  color,
}: {
  x: number;
  y: number;
  z: number;
  icon: keyof typeof ICONS;
  color: string;
}) {
  return (
    <Face face="top" at={[x + 3, y + 3, z]}>
      <path
        d={ICONS[icon]}
        transform="scale(0.667)"
        style={{
          fill: icon === 'cake' ? 'none' : color,
          stroke: color,
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </Face>
  );
}

/** The three steps of an order, one small scene each. */
export function OrderStepScene({ step }: { step: 'message' | 'bake' | 'box' }) {
  const top = 8;
  const labels = {
    message: 'A phone showing a WhatsApp message asking for a cake for Saturday.',
    bake: 'A blue oven with the cake rising behind its glowing window.',
    box: 'A pink Bakes by Mom cake box tied with a cherry ribbon and a bow.',
  };
  return (
    <IsoScene
      width={280}
      height={230}
      camera={{ k: 1.9, ox: 130, oy: 84 }}
      label={labels[step]}
      className="iso-step-art"
    >
      <Platform
        x={0}
        y={0}
        w={70}
        d={70}
        h={6}
        r={12}
        mat={step === 'bake' ? M.blue : step === 'box' ? M.pink : M.butter}
        inset={M.paper}
      />
      {step === 'message' && (
        <Drop>
          <Float amp={4}>
            <Phone x={20} y={36} z={top + 2} />
          </Float>
          <Sparkle at={[60, 10, 60]} size={5} />
        </Drop>
      )}
      {step === 'bake' && (
        <Drop>
          <Oven x={10} y={14} z={top} w={46} d={36} h={40} timer="0:05" />
          <Sparkle at={[58, 0, 58]} size={5} />
        </Drop>
      )}
      {step === 'box' && (
        <Drop>
          <CakeBox x={18} y={18} z={top} w={32} d={32} h={24} />
          <Sparkle at={[62, 4, 46]} size={5} tone="cherry" />
        </Drop>
      )}
    </IsoScene>
  );
}

/** The combo: a cake on its stand with cupcakes iced to match, on a dark counter. */
export function ComboScene() {
  const top = 10;
  const sh = standHeight(26);
  return (
    <IsoScene
      width={520}
      height={420}
      camera={{ k: 2.2, ox: 250, oy: 150 }}
      label="A pink drip cake on a stand with four matching cupcakes around it."
      className="iso-hero-art"
    >
      <Platform x={0} y={0} w={110} d={96} r={18} mat={M.rose} inset={M.blush} shadow={0.35} />
      <Drop i={0}>
        <Stand x={46} y={40} z={top} r={26} />
      </Drop>
      <Drop i={1} from={44}>
        <LayerCake x={46} y={40} z={top + sh} r={20} h={22} coat={M.pink} drip={M.wine} piping={M.paper} cherries={3} />
      </Drop>
      <Drop i={2}>
        <Cupcake x={92} y={30} z={top} s={0.9} />
      </Drop>
      <Drop i={3}>
        <Cupcake x={94} y={62} z={top} s={0.9} frosting={M.paper} />
      </Drop>
      <Drop i={4}>
        <Cupcake x={22} y={82} z={top} s={0.9} frosting={M.paper} />
      </Drop>
      <Drop i={5}>
        <Cupcake x={60} y={84} z={top} s={0.9} />
      </Drop>
      <Sparkle at={[0, -16, 70]} size={7} />
      <Sparkle at={[120, 10, 50]} size={5} tone="paper" />
      <Sparkle at={[-10, 100, 30]} size={4} tone="cherry" />
    </IsoScene>
  );
}
