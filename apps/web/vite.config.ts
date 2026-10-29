import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import catalog from './src/content/catalog.json' with { type: 'json' };
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

/** Fills %SITE_URL% in index.html, and writes robots.txt and a sitemap of every page into the build. */
function siteAddress(): Plugin {
  const paths = [
    '/',
    '/catalog',
    '/shop',
    '/about',
    '/links',
    ...catalog.flatMap((occasion) => occasion.cakes.map((cake) => `/catalog/${cake.id}`)),
    ...treatCategories.flatMap((category) => [
      `/shop/${category.slug}`,
      ...category.items.map((item) => `/shop/${category.slug}/${item.slug}`),
    ]),
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  return {
    name: 'site-address',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
    generateBundle() {
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
