import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Static site on Cloudflare Pages. URLs match the Webflow site (no trailing slash),
// so existing links and search rankings carry over when the domain switches.
export default defineConfig({
  site: process.env.PUBLIC_SITE_ORIGIN ?? 'https://admonk.net',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  image: { domains: ['cdn.prod.website-files.com'] },
  integrations: [sitemap()],
});
