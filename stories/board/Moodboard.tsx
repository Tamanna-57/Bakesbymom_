import { Unstyled } from '@storybook/addon-docs/blocks';
import { Badge } from '@bakesbymom/ui';
import { boardPins, pinDoc, pinImage } from './pins';

/** The 16 board pins, each linked to its analysis and tagged with the sections it leads. */
export function Moodboard() {
  return (
    <Unstyled>
      <div style={{ columns: '15rem', columnGap: 20, margin: '24px 0' }}>
        {boardPins.map((pin) => (
          <figure
            key={pin.n}
            style={{
              breakInside: 'avoid',
              margin: '0 0 20px',
              background: 'var(--bbm-color-bg-surface)',
              border: '1.5px solid var(--bbm-color-border-default)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <img
              src={pinImage(pin)}
              alt={`Pin ${pin.n}: ${pin.title}`}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', background: 'var(--bbm-color-bg-sunken)' }}
            />
            <figcaption style={{ padding: 14, display: 'grid', gap: 8 }}>
              <a
                href={pinDoc(pin)}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--bbm-font-family-display)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--bbm-color-text-primary)',
                }}
              >
                {pin.n} · {pin.title} ↗
              </a>
              <span style={{ fontSize: 14, color: 'var(--bbm-color-text-secondary)' }}>{pin.what}</span>
              {(pin.leads.length > 0 || pin.also.length > 0) && (
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {pin.leads.map((s) => (
                    <Badge key={s} size="sm" tone="cherry" variant="solid">
                      {s}
                    </Badge>
                  ))}
                  {pin.also.map((s) => (
                    <Badge key={s} size="sm" tone="blue">
                      {s}
                    </Badge>
                  ))}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Unstyled>
  );
}
