import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content lives in src/content/<collection>/<slug>.json, one file per item; the file name is the slug.
 * The first copy came from the Webflow CMS (scripts/import-webflow.mjs). From now on these files are
 * the source of truth, edited in the admin editor or by hand.
 */
const json = (dir: string) => glob({ pattern: '*.json', base: `./src/content/${dir}` });
const text = z.string().min(1);
const seo = z.object({ title: text, description: text });
const pair = z.object({ title: text.optional(), summary: text.optional() });
const common = {
  name: text,
  seo,
  draft: z.boolean().default(false),
  webflowId: z.string().optional(),
};

// Frameworks, solutions and services share one page layout.
const page = {
  ...common,
  icon: z.url().optional(),
  cover: z.url().optional(),
  color: z.string().optional(),
  hero: z.object({ title: text.optional(), description: text.optional() }),
  solutionDescription: text.optional(),
  challenges: z.array(pair).default([]),
  approach: z.array(pair).default([]),
  impact: z.array(pair).default([]),
  deliverables: z.object({ summary: text.optional(), items: z.array(text).default([]) }),
  testimonial: reference('testimonials').nullable().optional(),
};

const frameworks = defineCollection({
  loader: json('frameworks'),
  schema: z.object({
    ...page,
    whatWeDeliver: z.array(pair).default([]),
    solutions: z.array(reference('solutions')).default([]),
    tools: z.array(reference('tools')).default([]),
    caseStudies: z.array(reference('portfolio')).default([]),
  }),
});

const solutions = defineCollection({
  loader: json('solutions'),
  schema: z.object({
    ...page,
    framework: reference('frameworks').nullable().optional(),
    services: z.array(reference('services')).default([]),
    tools: z.array(reference('tools')).default([]),
    caseStudies: z.array(reference('portfolio')).default([]),
  }),
});

const services = defineCollection({
  loader: json('services'),
  schema: z.object({
    ...page,
    framework: reference('frameworks').nullable().optional(),
    solution: reference('solutions').nullable().optional(),
    related: z.array(reference('services')).default([]),
    tools: z.array(reference('tools')).default([]),
    caseStudy: reference('portfolio').nullable().optional(),
  }),
});

const tools = defineCollection({
  loader: json('tools'),
  schema: z.object({
    ...common,
    icon: z.url().optional(),
    summary: text.optional(),
    description: text.optional(),
    framework: reference('frameworks').nullable().optional(),
  }),
});

const portfolio = defineCollection({
  loader: json('portfolio'),
  schema: z.object({
    ...common,
    title: text.optional(),
    summary: text.optional(),
    thumbnail: z.url().optional(),
    logo: z.url().optional(),
    icon: z.url().optional(),
    cover: z.url().optional(),
    websiteUrl: z.url().optional(),
    featured: z.boolean().default(false),
    // Webflow option ids, still to be mapped to their labels.
    yearsOption: z.string().optional(),
    styleOption: z.string().optional(),
    industry: reference('industries').nullable().optional(),
    location: reference('locations').nullable().optional(),
    solutions: z.array(reference('solutions')).default([]),
    services: z.array(reference('services')).default([]),
    tools: z.array(reference('tools')).default([]),
    testimonial: reference('testimonials').nullable().optional(),
    challenge: z.object({ title: text.optional(), items: z.array(text).default([]) }),
    approach: z.array(pair).default([]),
    results: z.array(z.object({ label: text, value: text.optional(), description: text.optional() })).default([]),
    gallery: z.array(z.url()).default([]),
  }),
});

const testimonials = defineCollection({
  loader: json('testimonials'),
  schema: z.object({
    name: text,
    role: text.optional(),
    logo: z.url().optional(),
    quote: text.optional(),
    caseStudy: reference('portfolio').nullable().optional(),
    webflowId: z.string().optional(),
  }),
});

const locations = defineCollection({
  loader: json('locations'),
  schema: z.object({ name: text, country: text.optional(), flag: z.url().optional(), webflowId: z.string().optional() }),
});

const industries = defineCollection({
  loader: json('industries'),
  schema: z.object({ name: text, icon: z.url().optional(), webflowId: z.string().optional() }),
});

/** Blog posts: one Markdown file per post in src/content/blog/<slug>.md. */
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: text,
    description: text,
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tools: z.array(reference('tools')).default([]),
    framework: reference('frameworks').optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { frameworks, solutions, services, tools, portfolio, testimonials, locations, industries, blog };
