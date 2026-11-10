import { getImage } from 'astro:assets';
import { getCollection, getEntries, getEntry, type CollectionEntry } from 'astro:content';

export const SITE = {
  name: 'Admonk',
  email: 'info@admonk.net',
  phone: '+20 100 306 6621',
  logo: '/logo.png',
  socials: [
    ['Facebook', 'https://www.facebook.com/admonkstudio'],
    ['Instagram', 'https://www.instagram.com/admonkstudio'],
    ['LinkedIn', 'https://www.linkedin.com/company/admonkstudio'],
    ['YouTube', 'https://www.youtube.com/@admonkstudio'],
  ] as const,
};

export const NAV = [
  ['Studio', '/studio'],
  ['Framework', '/the-framework'],
  ['Portfolio', '/portfolio'],
  ['Blog', '/blog'],
  ['Contact', '/contact-us'],
] as const;

/** SEO for the fixed pages (written in the Webflow content pass). */
export const PAGE_SEO = {
  '/': ['Admonk | Digital Identity, Experience & Automation Studio', 'Admonk builds your digital identity, designs websites that convert and automates the work behind them. One framework for brand, web and AI automation.'],
  '/the-framework': ['The Framework: Identity, Experience, Automation | Admonk', 'How Admonk connects your brand, website and business automation into one system, so every digital investment moves the business toward its goals.'],
  '/studio': ['About the Studio | Admonk', 'Meet Admonk, a digital studio that combines strategy, design and technology to build brands, websites and automations for ambitious businesses.'],
  '/portfolio': ['Portfolio: Websites, Brands & Automation Projects | Admonk', '26 projects across education, healthcare, hospitality and technology in Egypt, the Gulf, the UK and North America. See the Framework in action.'],
  '/blog': ['Insights on Branding, Web Design & Automation | Admonk', 'Practical thinking on brand identity, website design, SEO and AI automation from the Admonk team.'],
  '/start': ['Start a Project | Admonk', "Tell us about your business and goals. We'll recommend the parts of the Framework that will make the biggest difference, nothing you don't need."],
  '/contact-us': ['Contact Admonk', 'Get in touch with Admonk about branding, website design and development, or AI and marketing automation.'],
} as const;

type Listed = 'frameworks' | 'solutions' | 'services' | 'tools' | 'portfolio' | 'blog';

/** Published items of a collection, sorted by name (blog: newest first). */
export async function live<C extends Listed>(c: C): Promise<CollectionEntry<C>[]> {
  const items = (await getCollection(c, ({ data }: any) => !data.draft)) as any[];
  if (c === 'blog') return items.sort((a, b) => +b.data.published - +a.data.published);
  return items.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Resolves references and drops any that point at missing or draft items. */
export async function resolve<T extends { collection: string; id: string }>(refs: (T | null | undefined)[] | undefined) {
  const list = (refs ?? []).filter(Boolean) as T[];
  if (!list.length) return [];
  const entries = await getEntries(list as never);
  return (entries as any[]).filter((e) => e && !e.data.draft);
}
export async function one<T extends { collection: string; id: string }>(ref: T | null | undefined) {
  if (!ref) return undefined;
  const e: any = await getEntry(ref as never);
  return e && !e.data.draft ? e : undefined;
}

export const urlOf = {
  frameworks: (id: string) => `/framework/${id}`,
  solutions: (id: string) => `/solutions/${id}`,
  services: (id: string) => `/services/${id}`,
  tools: (id: string) => `/tools-platforms/${id}`,
  portfolio: (id: string) => `/portfolio/${id}`,
  blog: (id: string) => `/blog/${id}`,
} as Record<string, (id: string) => string>;
export const href = (e: { collection: string; id: string }) => urlOf[e.collection]?.(e.id) ?? '/';

/** An absolute URL for social previews, from a local image or a remote one. */
export async function shareImage(src: unknown, site: URL | undefined): Promise<string | undefined> {
  if (!src) return undefined;
  if (typeof src === 'string') return src;
  const img = await getImage({ src: src as never, width: 1200, format: 'jpeg' });
  return new URL(img.src, site).toString();
}
