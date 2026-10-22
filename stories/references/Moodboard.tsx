import { Unstyled } from '@storybook/addon-docs/blocks';
import { Badge } from '@bakesbymom/ui';
import { pins, REPO } from './pins';

const WEIGHT = { 3: 'Primary', 2: 'Strong', 1: 'Supporting' } as const;
const TONE = { 3: 'cherry', 2: 'strawberry', 1: 'cream' } as const;

/** All Pinterest references, linked to their analysis files. */
export function Moodboard() {
  return (
    <Unstyled>
      <div style={{ columns: '15rem', columnGap: 20, margin: '24px 0' }}>
        {pins.map((pin) => (
          <figure
            key={pin.md}
            style={{
              breakInside: 'avoid',
              margin: '0 0 20px',
              background: 'var(--bbm-color-bg-surface)',
              border: '1.5px solid var(--bbm-color-border-default)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <img
              src={`pinterest/${encodeURIComponent(pin.file)}`}
              alt={`Pinterest reference: ${pin.title}`}
              loading="lazy"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                background: 'var(--bbm-color-bg-sunken)',
                minHeight: 80,
              }}
            />
            <figcaption style={{ padding: 14, display: 'grid', gap: 8 }}>
              <Badge size="sm" tone={TONE[pin.weight]} variant={pin.weight === 3 ? 'solid' : 'soft'}>
                {WEIGHT[pin.weight]}
              </Badge>
              <a
                href={`${REPO}/design/pinterest/${pin.md}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--bbm-font-family-display)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--bbm-color-text-primary)',
                }}
              >
                {pin.title} ↗
              </a>
              <span style={{ fontSize: 14, color: 'var(--bbm-color-text-secondary)' }}>{pin.takeaway}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Unstyled>
  );
}
