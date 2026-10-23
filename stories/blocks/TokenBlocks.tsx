/**
 * Docs blocks that render the Foundations pages straight from the built token
 * list (@bakesbymom/tokens/docs.json), so documentation can't drift from code.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Unstyled } from '@storybook/addon-docs/blocks';
import { TONES, type Tone } from '@bakesbymom/ui';
import tokenList from '@bakesbymom/tokens/docs.json';

export interface DocToken {
  name: string;
  path: string[];
  type: string | null;
  value: unknown;
  original: unknown;
  description: string | null;
  fluid: { min: string; max: string } | null;
}

export const tokens = tokenList as DocToken[];

const byName = new Map(tokens.map((t) => [t.name, t]));

export function token(name: string): DocToken {
  const t = byName.get(name.startsWith('--') ? name : `--bbm-${name}`);
  if (!t) throw new Error(`Unknown token ${name}`);
  return t;
}

const startsWith = (prefix: string[]) => tokens.filter((t) => prefix.every((p, i) => t.path[i] === p));

/* Contrast ------------------------------------------------------------- */

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const textOn = (hex: string) => (contrast(hex, '#32180b') >= contrast(hex, '#fffdf6') ? '#32180b' : '#fffdf6');

/* Shared styles -------------------------------------------------------- */

const mono: CSSProperties = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 };
const muted: CSSProperties = { ...mono, color: 'var(--bbm-color-text-muted)' };
const card: CSSProperties = {
  border: '1.5px solid var(--bbm-color-border-default)',
  borderRadius: 14,
  overflow: 'hidden',
  background: 'var(--bbm-color-bg-surface)',
};

function Copy({ children }: { children: string }) {
  return (
    <code style={{ ...mono, background: 'var(--bbm-color-bg-sunken)', padding: '1px 6px', borderRadius: 6 }}>
      {children}
    </code>
  );
}

const alias = (original: unknown) =>
  typeof original === 'string' && original.startsWith('{') ? original.slice(1, -1) : null;

/* Colors --------------------------------------------------------------- */

export function ColorScale({ family }: { family: string }) {
  const steps = startsWith(['color', family]);
  return (
    <Unstyled>
      <div
        style={{
          ...card,
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          margin: '16px 0 28px',
        }}
      >
        {steps.map((t) => {
          const hex = String(t.value);
          return (
            <div
              key={t.name}
              style={{ background: hex, color: textOn(hex), padding: '56px 10px 10px', minWidth: 0 }}
              title={t.description ?? undefined}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>
                {t.path[2]}
                {t.description?.includes('Measured') && <span title="Measured from a pin"> ★</span>}
              </div>
              <div style={{ ...mono, opacity: 0.85 }}>{hex}</div>
              {t.description?.includes('Measured') && (
                <div style={{ fontSize: 10.5, marginTop: 4, opacity: 0.85 }}>
                  {t.description.replace(/^.*Measured: /, '').replace(/\.$/, '')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Unstyled>
  );
}

export function SemanticColors({ group }: { group: string }) {
  const rows = startsWith(['color', group]);
  return (
    <Unstyled>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0 28px' }}>
        <thead>
          <tr style={{ textAlign: 'left', ...muted }}>
            <th style={{ padding: 8 }}>Token</th>
            <th style={{ padding: 8 }}>Value</th>
            <th style={{ padding: 8 }}>Alias</th>
            <th style={{ padding: 8 }}>Use</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.name} style={{ borderTop: '1px solid var(--bbm-color-border-subtle)' }}>
              <td style={{ padding: 8 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: String(t.value),
                      border: '1.5px solid var(--bbm-color-border-default)',
                      flexShrink: 0,
                    }}
                  />
                  <Copy>{t.name}</Copy>
                </span>
              </td>
              <td style={{ padding: 8, ...mono }}>{String(t.value)}</td>
              <td style={{ padding: 8, ...muted }}>{alias(t.original) ?? '—'}</td>
              <td style={{ padding: 8, fontSize: 14 }}>{t.description ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Unstyled>
  );
}

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const r = contrast(fg, bg);
  const grade = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'Fail';
  return (
    <span style={{ ...mono, fontWeight: 600 }}>
      {r.toFixed(1)}:1 · {grade}
    </span>
  );
}

export function ToneGrid() {
  return (
    <Unstyled>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          margin: '16px 0 28px',
        }}
      >
        {TONES.map((tone: Tone) => {
          const v = (k: string) => String(token(`color-tone-${tone}-${k}`).value);
          return (
            <div key={tone} style={card}>
              <div style={{ background: v('bg'), color: v('fg'), padding: '14px 14px 10px' }}>
                <div
                  style={{
                    fontFamily: 'var(--bbm-font-family-display)',
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: 'capitalize',
                  }}
                >
                  {tone}
                </div>
                <div style={{ fontSize: 13 }}>fg on bg</div>
                <Ratio fg={v('fg')} bg={v('bg')} />
              </div>
              <div style={{ background: v('solid'), color: v('on-solid'), padding: '10px 14px 14px' }}>
                <div style={{ fontSize: 13 }}>on-solid on solid</div>
                <Ratio fg={v('on-solid')} bg={v('solid')} />
              </div>
            </div>
          );
        })}
      </div>
    </Unstyled>
  );
}

/* Typography ----------------------------------------------------------- */

const TEXT_STYLES = [
  ['display-xl', 'Homemade cakes, still warm'],
  ['display-lg', 'How to order'],
  ['display-md', 'Meet Mom'],
  ['heading-lg', "Mom's Monday letter"],
  ['heading-md', 'Pick your bake'],
  ['heading-sm', 'Strawberry layer cake'],
  ['body-lg', 'Cakes, cookies and pies baked to order every week, ready for Saturday pick-up.'],
  ['body-md', 'Order by Wednesday for Saturday. Custom cakes need a week. Most bakes can be made gluten-free.'],
  ['body-sm', 'Vanilla sponge, strawberry jam, whipped buttercream.'],
  ['caption', 'Baked in a home kitchen that also handles nuts, dairy, eggs and wheat.'],
  ['label', 'Custom cakes'],
  ['eyebrow', 'Where to find Mom'],
  ['price', '₹1,450'],
  ['heavy', 'About us'],
  ['script-lg', 'Menu'],
  ['script-md', 'this week'],
  ['script-sm', 'with love, Mom'],
  ['hand-md', 'made with real butter!'],
  ['hand-sm', 'Birthday cupcakes'],
  ['bubble', 'Gallery'],
] as const;

export function TypeScale() {
  return (
    <Unstyled>
      <div style={{ display: 'grid', gap: 4, margin: '16px 0 28px' }}>
        {TEXT_STYLES.map(([style, sample]) => {
          const v = (p: string) => token(`text-${style}-${p}`);
          const size = v('size');
          const sizeLabel = size.fluid ? `${size.fluid.min} → ${size.fluid.max} (fluid)` : String(size.value);
          return (
            <div
              key={style}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: 24,
                alignItems: 'baseline',
                padding: '14px 0',
                borderTop: '1px solid var(--bbm-color-border-subtle)',
              }}
            >
              <div>
                <Copy>{`.bbm-text-${style}`}</Copy>
                <div style={{ ...muted, marginTop: 6, lineHeight: 1.5 }}>
                  {String(v('family').original).replace(/[{}]/g, '').replace('font.family.', '')} · {sizeLabel}
                  <br />
                  lh {String(v('line-height').value)} · weight {String(v('weight').value)} · tracking{' '}
                  {String(v('tracking').value)}
                </div>
              </div>
              <div className={`bbm-text-${style}`} style={{ minWidth: 0 }}>
                {sample}
              </div>
            </div>
          );
        })}
      </div>
    </Unstyled>
  );
}

export function FontFamilies() {
  const families = startsWith(['font', 'family']);
  const samples: Record<string, ReactNode> = {
    display: <span style={{ fontVariationSettings: 'var(--bbm-font-variation-soft)', fontWeight: 700 }}>Bakes</span>,
    body: <span style={{ fontWeight: 900 }}>About us</span>,
    script: 'by Mom',
    hand: 'real butter!',
    bubble: (
      <span className="bbm-text-bubble" style={{ fontSize: 40 }}>
        Yum
      </span>
    ),
  };
  return (
    <Unstyled>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: 16,
          margin: '16px 0 28px',
        }}
      >
        {families.map((t) => {
          const key = t.path[2]!;
          return (
            <div key={t.name} style={{ ...card, padding: 18 }}>
              <div
                style={{
                  fontFamily: `var(${t.name})`,
                  fontSize: 40,
                  lineHeight: 1.1,
                  minHeight: 56,
                  color: 'var(--bbm-color-text-brand)',
                }}
              >
                {samples[key]}
              </div>
              <div style={{ marginTop: 12, fontWeight: 600 }}>{String(t.value).split(',')[0]}</div>
              <div style={{ ...muted, marginTop: 4 }}>{t.name}</div>
              <p style={{ fontSize: 14, margin: '8px 0 0', color: 'var(--bbm-color-text-secondary)' }}>
                {t.description}
              </p>
            </div>
          );
        })}
      </div>
    </Unstyled>
  );
}

/* Space, shape, elevation, motion ------------------------------------- */

export function SpaceScale() {
  return (
    <Unstyled>
      <div style={{ display: 'grid', gap: 6, margin: '16px 0 28px' }}>
        {startsWith(['space'])
          .filter((t) => t.path[1] !== 'px')
          .map((t) => (
            <div
              key={t.name}
              style={{ display: 'grid', gridTemplateColumns: '170px 80px 1fr', alignItems: 'center', gap: 12 }}
            >
              <Copy>{t.name}</Copy>
              <span style={muted}>{String(t.value)}</span>
              <span
                style={{
                  height: 14,
                  width: String(t.value),
                  background: 'var(--bbm-color-pink-300)',
                  border: '1.5px solid var(--bbm-color-border-default)',
                  borderRadius: 4,
                }}
              />
            </div>
          ))}
      </div>
    </Unstyled>
  );
}

export function RadiusScale() {
  return (
    <Unstyled>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: 16,
          margin: '16px 0 28px',
        }}
      >
        {startsWith(['radius']).map((t) => (
          <div key={t.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                height: 88,
                background: 'var(--bbm-color-bg-pink)',
                border: '1.5px solid var(--bbm-color-border-default)',
                borderRadius: String(t.value),
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Copy>{t.name.replace('--bbm-', '')}</Copy>
            </div>
            <div style={{ ...muted, marginTop: 4 }}>{String(t.value)}</div>
          </div>
        ))}
      </div>
    </Unstyled>
  );
}

export function BorderScale() {
  return (
    <Unstyled>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
          margin: '16px 0 28px',
        }}
      >
        {startsWith(['border', 'width']).map((t) => (
          <div
            key={t.name}
            style={{
              padding: 16,
              background: 'var(--bbm-color-bg-surface)',
              border: `${String(t.value)} solid var(--bbm-color-border-default)`,
              borderRadius: 14,
            }}
          >
            <Copy>{t.name.replace('--bbm-', '')}</Copy>
            <div style={{ ...muted, marginTop: 6 }}>{String(t.value)}</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>{t.description}</div>
          </div>
        ))}
      </div>
    </Unstyled>
  );
}

export function ShadowScale() {
  return (
    <Unstyled>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 24,
          margin: '16px 0 28px',
        }}
      >
        {startsWith(['shadow']).map((t) => (
          <div key={t.name}>
            <div
              style={{
                height: 96,
                borderRadius: 14,
                background: 'var(--bbm-color-bg-surface)',
                border: t.path[1] === 'sticker' ? '1.5px solid var(--bbm-color-border-default)' : 'none',
                boxShadow: `var(${t.name})`,
              }}
            />
            <div style={{ marginTop: 12 }}>
              <Copy>{t.name.replace('--bbm-', '')}</Copy>
            </div>
            <div style={{ ...muted, marginTop: 4 }}>{String(t.value)}</div>
            {t.description && <div style={{ fontSize: 13, marginTop: 4 }}>{t.description}</div>}
          </div>
        ))}
      </div>
    </Unstyled>
  );
}

export function TokenTable({ prefix }: { prefix: string[] }) {
  return (
    <Unstyled>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0 28px' }}>
        <tbody>
          {startsWith(prefix).map((t) => (
            <tr key={t.name} style={{ borderTop: '1px solid var(--bbm-color-border-subtle)' }}>
              <td style={{ padding: 8 }}>
                <Copy>{t.name}</Copy>
              </td>
              <td style={{ padding: 8, ...mono }}>{String(t.value)}</td>
              <td style={{ padding: 8, fontSize: 14 }}>{t.description ?? alias(t.original) ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Unstyled>
  );
}
