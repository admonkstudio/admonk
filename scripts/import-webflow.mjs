// One-off import of the Webflow CMS into content files (src/content/<collection>/<slug>.json).
// Input: import/webflow-cms-export.json (CMS backup) + import/approved-changes.json (the content pass
// written to Webflow and published after the backup was taken). Re-running overwrites the content files.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const exp = JSON.parse(readFileSync('import/webflow-cms-export.json', 'utf8'));
const changes = JSON.parse(readFileSync('import/approved-changes.json', 'utf8'));
const CDN = 'https://cdn.prod.website-files.com/';

// Apply the approved content pass on top of the backup.
for (const [coll, items] of Object.entries(changes)) {
  for (const [slug, { id, f }] of Object.entries(items)) {
    const it = exp.items[coll].find((i) => i._id === id);
    if (!it) throw new Error(`missing ${coll}/${slug}`);
    Object.assign(it, f);
  }
}

// id -> slug lookup across all collections.
const slugOf = new Map();
for (const items of Object.values(exp.items)) for (const it of items) slugOf.set(it._id, it.slug);
const ref = (id) => (id ? slugOf.get(id) ?? null : null);
const refs = (ids) => (ids ?? []).map(ref).filter(Boolean);
const img = (v) => (typeof v === 'string' && v.startsWith('~/') ? CDN + v.slice(2) : v || undefined);
const txt = (v) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const pairs = (it, pre, n, t = '---title', s = '---summary') =>
  Array.from({ length: n }, (_, i) => ({ title: txt(it[`${pre}-${i + 1}${t}`]), summary: txt(it[`${pre}-${i + 1}${s}`]) })).filter((p) => p.title || p.summary);
const list = (it, pre, n) => Array.from({ length: n }, (_, i) => txt(it[`${pre}${i + 1}`])).filter(Boolean);
const seo = (it) => ({ title: txt(it['seo-title']), description: txt(it['meta-description']) });
const clean = (o) => JSON.parse(JSON.stringify(o));

// Shared shape of framework, solution and service pages.
const page = (it) => ({
  name: it.name.trim(),
  seo: seo(it),
  icon: img(it.icon),
  cover: img(it.cover),
  color: it.color,
  hero: { title: txt(it['hero-title']), description: txt(it['hero-description']) },
  solutionDescription: txt(it['solution-description']),
  challenges: pairs(it, 'business-challenge', 3),
  approach: pairs(it, 'framework', 3),
  impact: pairs(it, 'business-impact', 3),
  deliverables: { summary: txt(it['deliverable-summary']), items: list(it, 'deliverable-', 9) },
  testimonial: ref(it.testimonial),
});

const results = [
  ['results---1', 'results---1-description', 'SEO & Google Placement'],
  ['results---2', 'results---2-description', 'Website Performance'],
  ['results---3', 'results---3-description', 'Traffic Growth'],
  ['results---4', 'results---4-description', 'Business Impact'],
  ['results---5', 'results---5-description', 'Brand Transformation'],
  ['results---6', 'results---6-description', 'User Experience'],
  ['result-7-', 'result-7---description', 'Automation & Integration'],
  ['result-8-', 'result-8---description', 'CMS & Content Management'],
  ['result-9-', 'result-9---description', 'Product / Service Showcase'],
  ['result-10-', 'result-10---description', 'Platform Stability & Security'],
];
// Showcase fields in the order the Webflow editor shows them (Showcase 01..10; Showcase 11 was deleted).
const showcase = ['showcase-06', 'showcase-04', 'showcase-01', 'showcase-02', 'showcase-11', 'showcase-12', 'showcase-13', 'showcase-05', 'showcase-07', 'showcase-03'];

const map = {
  framework: (it) => ({ ...page(it), whatWeDeliver: pairs(it, 'what-we-deliver', 3), solutions: refs(it['solutions-2']), tools: refs(it.tools), caseStudies: refs(it['case-study']) }),
  solutions: (it) => ({ ...page(it), framework: ref(it.framework), services: refs(it.solutions), tools: refs(it.tools), caseStudies: refs(it['case-study']) }),
  services: (it) => ({ ...page(it), framework: ref(it.framework), solution: ref(it.solution), related: refs(it.solutions), tools: refs(it.tools), caseStudy: ref(it['case-study-2']) }),
  'tools-platforms': (it) => ({ name: it.name.trim(), seo: seo(it), icon: img(it.icon), summary: txt(it.summary), description: txt(it.description), framework: ref(it.framework) }),
  portfolio: (it) => ({
    name: it.name.trim(),
    seo: seo(it),
    title: txt(it.title),
    summary: txt(it.summary),
    thumbnail: img(it['showcase-10']),
    logo: img(it.logo),
    icon: img(it.icon),
    cover: img(it.cover),
    websiteUrl: txt(it['website-url']),
    featured: !!it.feature,
    yearsOption: it.years,
    styleOption: it['style-items'],
    industry: ref(it['industry-2']),
    location: ref(it['location-2']),
    solutions: refs(it['solutions-2']),
    services: refs(it.services),
    tools: refs(it.tools),
    testimonial: ref(it.testimonial),
    challenge: { title: txt(it['challenge-title']), items: ['01', '02', '03', '04', '05'].map((n) => txt(it[`challenge-${n}`])).filter(Boolean) },
    approach: pairs(it, 'the-framework', 3),
    results: results.map(([v, d, label]) => ({ label, value: txt(it[v]), description: txt(it[d]) })).filter((r) => r.value || r.description),
    gallery: showcase.map((k) => img(it[k])).filter(Boolean),
  }),
  testimonials: (it) => ({ name: it.name.trim(), role: txt(it.title), logo: img(it.logo), quote: txt(it.testimonial), caseStudy: ref(it['portfolio-2']) }),
  locations: (it) => ({ name: it.name.trim(), country: txt(it.country), flag: img(it.flag) }),
  industries: (it) => ({ name: it.name.trim(), icon: img(it.icon) }),
};
const dir = { framework: 'frameworks', 'tools-platforms': 'tools' };

for (const [coll, items] of Object.entries(exp.items)) {
  const out = `src/content/${dir[coll] ?? coll}`;
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const it of items) {
    if (it._archived) continue;
    const data = clean({ ...map[coll](it), draft: !!it._draft || undefined, webflowId: it._id });
    writeFileSync(`${out}/${it.slug}.json`, JSON.stringify(data, null, 2) + '\n');
  }
  console.log(`${coll}: ${items.length}`);
}
