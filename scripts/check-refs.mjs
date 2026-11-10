// Fails the build when a content file points at an item that doesn't exist.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
const fields = {
  framework: 'frameworks', frameworks: 'frameworks', solution: 'solutions', solutions: 'solutions', services: 'services', related: 'services',
  tools: 'tools', caseStudy: 'portfolio', caseStudies: 'portfolio', testimonial: 'testimonials', industry: 'industries', location: 'locations',
};
let bad = 0;
for (const coll of readdirSync('src/content')) {
  for (const f of readdirSync(`src/content/${coll}`).filter((f) => f.endsWith('.json'))) {
    const data = JSON.parse(readFileSync(`src/content/${coll}/${f}`, 'utf8'));
    for (const [k, target] of Object.entries(fields)) {
      for (const id of [data[k]].flat().filter((x) => typeof x === 'string')) {
        if (!existsSync(`src/content/${target}/${id}.json`)) { console.error(`${coll}/${f}: ${k} -> ${target}/${id} missing`); bad++; }
      }
    }
  }
}
if (bad) process.exit(1);
console.log('content references OK');
