import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { treatCategories } from './src/content/treats.ts';

// The Cloudflare Worker that serves the bakesbymom D1 catalog and its R2 photos. On Vercel, vercel.json rewrites
// /api to it; here the dev and preview servers proxy it, so the site reads the same database either way.
const api = { target: 'https://bakesbymom.snehagupta.workers.dev', changeOrigin: true };

// Where the site is live, for the canonical link, the link preview and the sitemap: SITE_URL if it is set (say, for a
// custom domain), else the production address of the Vercel project doing the build, so any Vercel account works.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (
  process.env.SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'https://bakesbymom-site.vercel.app')
).replace(/\/+$/, '');

/** The cake pages, from the live catalog. A build that can't reach it leaves them out of the sitemap. */
async function cakePaths(warn: (message: string) => void) {
  try {
    const response = await fetch(`${api.target}/api/catalog`);
    if (!response.ok) throw new Error(`status ${response.status}`);
    const catalog = (await response.json()) as { cakes: { id: string }[] }[];
    return catalog.flatMap((occasion) => occasion.cakes.map((cake) => `/catalog/${cake.id}`));
  } catch (error) {
    warn(`The sitemap leaves out the cake pages: the catalog did not load (${String(error)}).`);
    return [];
  }
}

/** Fills %SITE_URL% in index.html, and writes robots.txt and a sitemap of every page into the build. */
function siteAddress(): Plugin {
  return {
    name: 'site-address',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
    async generateBundle() {
      const paths = [
        '/',
        '/menu',
        '/how-to-order',
        '/about',
        '/links',
        ...(await cakePaths((message) => this.warn(message))),
        // One page per kind of treat: its flavours are picked there (the old /shop/<type>/<item> links open it too)
        ...treatCategories.map((category) => `/shop/${category.slug}`),
      ];
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

// The website uses the built packages (`npm run build` at the repo root first), like any consumer would.
export default defineConfig({
  plugins: [react(), siteAddress()],
  server: { proxy: { '/api': api } },
  preview: { proxy: { '/api': api } },
});
