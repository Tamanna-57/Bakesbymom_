/**
 * The bakery's Instagram reels, on the home hero.
 *
 * Instagram will not let its profile page be framed (x-frame-options: DENY), so there is no way to
 * put the feed itself on the page. One reel at a time can be framed, though, through the /embed/
 * page Instagram serves for exactly that, and that is what this does: the reels ride one at a time
 * with the rest kept a click away, so the hero stays the height of a single reel rather than seven.
 *
 * Only the reel on screen is mounted, and the next one is kept warm, so opening the page costs one
 * frame rather than seven. If Instagram ever refuses to be framed the caption below is still a link
 * to the reel, so the panel degrades into a list of links rather than a row of empty boxes.
 */
import { useEffect, useState } from 'react';
import { reelEmbed, reelLink, reels } from '../content/instagram';
import { bakery } from '../content/bakery';
import './reels.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

export function HeroReels() {
  const [current, setCurrent] = useState(0);
  // Mount a reel the first time it is reached and keep it mounted, so going back is instant. The one after it is
  // warmed up only once the visitor reaches for the reels: each embed is a whole Instagram page, and two of them on
  // the way in made the home page heavy for everyone who never touches them.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [warm, setWarm] = useState(false);
  const active = reels[current];

  useEffect(() => {
    setSeen((old) => {
      const next = new Set(old);
      next.add(current);
      if (warm) next.add((current + 1) % reels.length); // keep the one after this warm
      return next.size === old.size ? old : next;
    });
  }, [current, warm]);
  const reach = () => setWarm(true);

  const go = (step: number) => setCurrent((i) => (i + step + reels.length) % reels.length);

  // Nothing to show when the list in content/instagram.ts is empty.
  if (!active) return null;

  return (
    <div className="home-reels" onPointerEnter={reach} onFocus={reach} onTouchStart={reach}>
      <div className="home-reels__head">
        <a className="home-reels__handle" href={bakery.instagram} {...external}>
          <span className="home-reels__mark" aria-hidden="true" />
          {bakery.instagramHandle}
        </a>
        <span className="home-reels__count">
          {current + 1} / {reels.length}
        </span>
      </div>

      <div className="home-reels__stage">
        {reels.map((reel, i) => (
          <div
            key={reel.code}
            className="home-reels__frame"
            data-on={i === current ? 'true' : undefined}
            aria-hidden={i === current ? undefined : true}
          >
            {seen.has(i) ? (
              <iframe
                src={reelEmbed(reel.code)}
                title={`Reel ${i + 1} from ${bakery.instagramHandle}`}
                loading="lazy"
                allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="home-reels__controls">
        <button type="button" className="home-reels__arrow" onClick={() => go(-1)} aria-label="Previous reel">
          <span aria-hidden="true">‹</span>
        </button>
        <div className="home-reels__dots" role="tablist" aria-label="Choose a reel">
          {reels.map((reel, i) => (
            <button
              key={reel.code}
              type="button"
              role="tab"
              className="home-reels__dot"
              aria-selected={i === current}
              aria-label={`Reel ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button type="button" className="home-reels__arrow" onClick={() => go(1)} aria-label="Next reel">
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <a className="home-reels__fallback" href={reelLink(active.code)} {...external}>
        Watch this one on Instagram
      </a>
    </div>
  );
}
