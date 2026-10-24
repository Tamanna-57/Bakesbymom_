import { boardPins, pinDoc, pinImage, REPO } from '../board/pins';

/**
 * Docs description for a section story: the text, linked thumbnails of the
 * pins it comes from, and (when there is one) a link to its spec in design/board/sections/.
 */
export function fromBoard(text: string, pins: string[], spec?: string) {
  const thumbs = pins
    .map((n) => {
      const pin = boardPins.find((p) => p.n === n);
      if (!pin) throw new Error(`Unknown pin ${n}`);
      return `<a href="${pinDoc(pin)}" target="_blank" rel="noreferrer" title="Pin ${pin.n}: ${pin.title}"><img src="${pinImage(pin)}" alt="Pin ${pin.n}: ${pin.title}" width="132" style="border:1.5px solid #32180b;border-radius:12px;margin:0 8px 8px 0;vertical-align:top" /></a>`;
    })
    .join('');
  const specLink = spec ? `\n\n**Spec:** [design/board/sections/${spec}](${REPO}/design/board/sections/${spec})` : '';
  return `${text}\n\n${thumbs}${specLink}`;
}
