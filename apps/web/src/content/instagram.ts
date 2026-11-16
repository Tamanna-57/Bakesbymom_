// The reels shown on the home page, straight from the bakery's own Instagram.
//
// Only the shortcode is kept: the share links Instagram copies carry tracking parameters
// (utm_source, cplk, dlrf, obrf, exln, mdxt) that identify the account doing the sharing, and
// those have no business in a public repo. To add a reel, open it on Instagram, copy the link
// and keep only the code between /reel/ and the next slash.

import { bakery } from './bakery';

export interface Reel {
  /** The code in the URL: instagram.com/reel/<code>/ */
  code: string;
}

export const reels: Reel[] = [
  { code: 'DfmvYeYT83Z' },
  { code: 'DSQH1cCDAu6' },
  { code: 'DfKyYFNzYHI' },
  { code: 'DfPq9ZJTWJJ' },
  { code: 'DbfrVIHTbe9' },
  { code: 'DYmdTy5zalL' },
  { code: 'DdjxmbAuFvo' },
];

/** The page Instagram serves for embedding one reel, which is what the iframe loads. */
export const reelEmbed = (code: string) => `https://www.instagram.com/reel/${code}/embed/`;

/** The reel itself, for the fallback link and for opening it in the app. */
export const reelLink = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const instagramProfile = bakery.instagram;
