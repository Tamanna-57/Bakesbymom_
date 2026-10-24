import { useId, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface OrbitImage {
  src: string;
  /** Describe the photo, or pass "" for a decorative one. */
  alt: string;
}

export interface OrbitProps extends HTMLAttributes<HTMLDivElement> {
  /** The big center photo. */
  center: OrbitImage;
  /** Up to six small photos placed along the orbit. */
  satellites?: OrbitImage[];
  /** A sentence set on an arc above the center photo. */
  arcText?: string;
}

// Layout in a 1000 × 625 box: the center circle, the orbit ellipse and the arc above.
const W = 1000;
const H = 625;
const CX = 500;
const CY = 340;
const R = 225;
const ORBIT = { cx: 500, cy: 360, rx: 470, ry: 120, tilt: -6 };
// Angles (degrees) and diameters for each satellite, uneven on purpose like pin 01.
const SLOTS = [
  { t: 168, d: 132 },
  { t: 205, d: 92 },
  { t: 140, d: 74 },
  { t: 12, d: 124 },
  { t: -22, d: 84 },
  { t: 42, d: 66 },
];

function onOrbit(deg: number) {
  const t = (deg * Math.PI) / 180;
  const phi = (ORBIT.tilt * Math.PI) / 180;
  const x = ORBIT.cx + ORBIT.rx * Math.cos(t) * Math.cos(phi) - ORBIT.ry * Math.sin(t) * Math.sin(phi);
  const y = ORBIT.cy + ORBIT.rx * Math.cos(t) * Math.sin(phi) + ORBIT.ry * Math.sin(t) * Math.cos(phi);
  return { x, y };
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * The orbit showcase from pin 01: a center photo with a sentence on an arc,
 * a tilted orbit line and small photos of different sizes sitting on it.
 */
export function Orbit({ center, satellites = [], arcText, className, ...rest }: OrbitProps) {
  const arcId = `bbm-orbit-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const arcR = R + 34;

  return (
    <div {...rest} className={cx('bbm-orbit', className)}>
      <svg className="bbm-orbit__lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <ellipse
          className="bbm-orbit__path"
          cx={ORBIT.cx}
          cy={ORBIT.cy}
          rx={ORBIT.rx}
          ry={ORBIT.ry}
          transform={`rotate(${ORBIT.tilt} ${ORBIT.cx} ${ORBIT.cy})`}
        />
      </svg>
      <img
        className="bbm-orbit__center"
        src={center.src}
        alt={center.alt}
        loading="lazy"
        style={{ left: pct(CX - R, W), top: pct(CY - R, H), width: pct(R * 2, W) } as CSSProperties}
      />
      {arcText && (
        <svg className="bbm-orbit__arc" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <path id={arcId} d={`M${CX - arcR} ${CY} A${arcR} ${arcR} 0 0 1 ${CX + arcR} ${CY}`} fill="none" />
          <text className="bbm-orbit__arc-text">
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {arcText}
            </textPath>
          </text>
        </svg>
      )}
      {arcText && <p className="bbm-visually-hidden">{arcText}</p>}
      {satellites.slice(0, SLOTS.length).map((image, i) => {
        const slot = SLOTS[i]!;
        const { x, y } = onOrbit(slot.t);
        return (
          <img
            key={i}
            className="bbm-orbit__satellite"
            src={image.src}
            alt={image.alt}
            loading="lazy"
            data-slot={i + 1}
            style={
              {
                left: pct(x - slot.d / 2, W),
                top: pct(y - slot.d / 2, H),
                width: pct(slot.d, W),
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
