// The Admonk design system: every value the site's look depends on, in one place.
//
// Two kinds of entries:
// - Tokens (`var`): CSS custom properties. Each has a dark value and, where it differs, a light value.
//   The build writes them into the stylesheet; src/design/admonk.css only ever uses the variables.
// - Element settings (`selector` + `property`): no value by default, so the Webflow styling stands.
//   When one is set in the admin's design editor, the site gets that rule on top.
//
// The admin design editor reads this file (as /wf/am/tokens.json) and saves changes to the database;
// the Worker serves the changes at /api/design.css, which every page loads after the stylesheet.

export const GROUPS = [
  { id: 'brand', label: 'Brand colours' },
  { id: 'surface', label: 'Backgrounds and surfaces' },
  { id: 'text', label: 'Text colours' },
  { id: 'controls', label: 'Buttons and controls' },
  { id: 'type', label: 'Typography' },
  { id: 'shape', label: 'Shape and spacing' },
  { id: 'layout', label: 'Frame layout' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'motion', label: 'Motion' },
];

/** @type {{name:string,group:string,label:string,type:'color'|'length'|'number'|'font'|'time',dark:string,light?:string,hint?:string}[]} */
export const TOKENS = [
  // Brand
  { name: 'accent', group: 'brand', label: 'Accent (orange)', type: 'color', dark: '#ff4c24' },
  { name: 'accent-text', group: 'brand', label: 'Accent used for small text', type: 'color', dark: '#ff6a47', light: '#c9330f', hint: 'A slightly lighter or darker accent so small orange text stays readable.' },
  { name: 'violet', group: 'brand', label: 'Secondary (violet)', type: 'color', dark: '#6e28c8' },
  { name: 'on-accent', group: 'brand', label: 'Text on accent', type: 'color', dark: '#ffffff' },

  // Surfaces
  { name: 'bg', group: 'surface', label: 'Page background (behind the frames)', type: 'color', dark: '#0f0f0f', light: '#f4f4f4' },
  { name: 'surface', group: 'surface', label: 'Sliding panels', type: 'color', dark: '#000000', light: '#ffffff' },
  { name: 'surface-raised', group: 'surface', label: 'Raised cards', type: 'color', dark: '#141414', light: '#f6f6f7' },
  { name: 'panel', group: 'surface', label: 'Inner page content panel', type: 'color', dark: 'rgba(0, 0, 0, 0.8)', light: 'rgba(255, 255, 255, 0.88)' },
  { name: 'card', group: 'surface', label: 'Cards, boxes and labels', type: 'color', dark: '#0c0c0c', light: '#f1f1f3' },
  { name: 'card-hover', group: 'surface', label: 'Card on hover', type: 'color', dark: '#181818', light: '#e8e8eb' },
  { name: 'input', group: 'surface', label: 'Form fields', type: 'color', dark: '#0c0c0c', light: '#f1f1f3' },
  { name: 'frame', group: 'surface', label: 'Frame tiles', type: 'color', dark: 'rgba(67, 65, 78, 0.2)', light: 'rgba(206, 201, 201, 0.3)' },
  { name: 'border', group: 'surface', label: 'Borders', type: 'color', dark: 'rgba(255, 255, 255, 0.12)', light: 'rgba(0, 0, 0, 0.1)' },
  { name: 'line', group: 'surface', label: 'Divider lines', type: 'color', dark: '#272727', light: '#dedee2' },
  { name: 'line-faint', group: 'surface', label: 'Decorative lines', type: 'color', dark: '#161616', light: '#ececef' },
  { name: 'dark-surface', group: 'surface', label: 'FAQ, footer and menu (dark in both themes)', type: 'color', dark: '#000000' },

  // Text
  { name: 'heading', group: 'text', label: 'Headings', type: 'color', dark: '#ededed', light: '#1b1b1d' },
  { name: 'title', group: 'text', label: 'Titles and labels', type: 'color', dark: '#dcdcdc', light: '#2c2c2c' },
  { name: 'text', group: 'text', label: 'Body text', type: 'color', dark: '#cfcfcf', light: '#474747' },
  { name: 'muted', group: 'text', label: 'Secondary text', type: 'color', dark: '#9a9a9a', light: '#666670' },

  // Controls
  { name: 'control-bg', group: 'controls', label: 'Primary button background', type: 'color', dark: '#dcdcdc', light: '#1b1b1d' },
  { name: 'control-fg', group: 'controls', label: 'Primary button text', type: 'color', dark: '#111111', light: '#ffffff' },
  { name: 'button-hover-bg', group: 'controls', label: 'Button hover background', type: 'color', dark: '#ff4c24' },
  { name: 'button-hover-fg', group: 'controls', label: 'Button hover text', type: 'color', dark: '#ffffff' },
  { name: 'secondary-bg', group: 'controls', label: 'Secondary button background', type: 'color', dark: '#141414', light: '#f1f1f3' },
  { name: 'secondary-fg', group: 'controls', label: 'Secondary button text', type: 'color', dark: '#ededed', light: '#1b1b1d' },

  // Typography
  { name: 'font-body', group: 'type', label: 'Body font', type: 'font', dark: 'Poppins, Verdana, sans-serif' },
  { name: 'font-heading', group: 'type', label: 'Heading font', type: 'font', dark: 'Poppins, Verdana, sans-serif' },

  // Shape
  { name: 'radius-panel', group: 'shape', label: 'Panel corners', type: 'length', dark: '40px' },
  { name: 'radius-card', group: 'shape', label: 'Card corners', type: 'length', dark: '20px' },
  { name: 'radius-button', group: 'shape', label: 'Button corners', type: 'length', dark: '100px' },
  { name: 'radius-field', group: 'shape', label: 'Form field corners', type: 'length', dark: '10px' },

  // Layout
  { name: 'rail', group: 'layout', label: 'Side rail width (desktop)', type: 'length', dark: '6rem', hint: 'Width of the left and right frame columns, and height of the top and bottom rows.' },
  { name: 'gap', group: 'layout', label: 'Gap between frame tiles', type: 'length', dark: '10px' },

  // Eyes
  { name: 'eye-white', group: 'eyes', label: 'Eye white', type: 'color', dark: '#f7f8fb' },
  { name: 'eye-iris-inner', group: 'eyes', label: 'Iris inner ring', type: 'color', dark: '#6e28c8' },
  { name: 'eye-iris-outer', group: 'eyes', label: 'Iris outer ring', type: 'color', dark: '#ff4c24' },
  { name: 'eye-shadow', group: 'eyes', label: 'Eye shadow strength (0 to 1)', type: 'number', dark: '0.45', light: '0.16' },

  // Motion
  { name: 'marquee-seconds', group: 'motion', label: 'Client logo loop: seconds per logo', type: 'number', dark: '3' },
  { name: 'hover-speed', group: 'motion', label: 'Hover transitions', type: 'time', dark: '0.3s' },
  { name: 'menu-roll-speed', group: 'motion', label: 'Menu hover roll', type: 'time', dark: '0.55s' },
];

/** Element settings: empty by default (Webflow's own styling applies). */
export const ELEMENTS = [
  { id: 'h1-size', group: 'type', label: 'Hero headings (H1) size', selector: 'h1, .heading.is-xlarge', property: 'font-size', type: 'length', placeholder: '5.5rem' },
  { id: 'h1-spacing', group: 'type', label: 'Hero headings letter spacing', selector: 'h1, .heading.is-xlarge', property: 'letter-spacing', type: 'length', placeholder: '-0.3rem' },
  { id: 'h2-size', group: 'type', label: 'Section headings (H2) size', selector: 'h2, .heading.is-pages-hero', property: 'font-size', type: 'length', placeholder: '2.441rem' },
  { id: 'h2-spacing', group: 'type', label: 'Section headings letter spacing', selector: 'h2', property: 'letter-spacing', type: 'length', placeholder: '-0.2rem' },
  { id: 'title-size', group: 'type', label: 'Card titles size', selector: '.title.is-medium', property: 'font-size', type: 'length', placeholder: '1.7rem' },
  { id: 'paragraph-size', group: 'type', label: 'Body text size', selector: '.paragraph', property: 'font-size', type: 'length', placeholder: '1rem' },
  { id: 'paragraph-height', group: 'type', label: 'Body line height', selector: '.paragraph', property: 'line-height', type: 'number', placeholder: '1.5' },
  { id: 'button-padding', group: 'controls', label: 'Button padding', selector: '.button-3, .button-4, .am-button', property: 'padding', type: 'length', placeholder: '1rem 1.75rem' },
  { id: 'button-size', group: 'controls', label: 'Button text size', selector: '.button-3, .button-4, .am-button', property: 'font-size', type: 'length', placeholder: '0.9rem' },
  { id: 'menu-size', group: 'type', label: 'Menu link size', selector: '.menu-link-heading', property: 'font-size', type: 'length', placeholder: '3rem' },
  { id: 'eye-size', group: 'eyes', label: 'Eye size (desktop)', selector: '.dog-face_eye, .dog-face_eye.right', property: 'width', also: 'height', type: 'length', placeholder: '140px' },
  { id: 'portfolio-columns-gap', group: 'shape', label: 'Portfolio grid gap', selector: '.am-portfolio-grid', property: 'gap', type: 'length', placeholder: '1.25rem' },
];

/** CSS for the default tokens, prepended to the stylesheet at build time. */
export function tokensCss() {
  const dark = TOKENS.map((t) => `  --am-${t.name}: ${t.dark};`).join('\n');
  const light = TOKENS.filter((t) => t.light).map((t) => `  --am-${t.name}: ${t.light};`).join('\n');
  return `/* Generated from src/design/tokens.mjs. Edit there, or in the admin design editor. */\n:root {\n  color-scheme: dark;\n${dark}\n}\nhtml[data-theme="light"] {\n  color-scheme: light;\n${light}\n}\n`;
}

const SAFE = /^[#(),.%\-\w\s'"/]+$/;
/** Validates one value from the editor so it can't break out of its declaration. */
export function safeValue(v) {
  const s = String(v ?? '').trim();
  return s && s.length <= 200 && SAFE.test(s) && !/[;{}<>]|url\s*\(|expression|@import/i.test(s) ? s : null;
}

/**
 * CSS for saved changes. `rows` are { key, theme, value } where key is a token name or an element id,
 * theme is 'dark' | 'light' | 'all'. `custom` is free CSS from the editor, appended as is.
 */
export function overridesCss(rows, custom = '') {
  const byTheme = { dark: [], light: [] };
  const els = [];
  for (const r of rows) {
    const v = safeValue(r.value);
    if (!v) continue;
    const tok = TOKENS.find((t) => t.name === r.key);
    if (tok) {
      if (r.theme === 'light') byTheme.light.push(`  --am-${tok.name}: ${v};`);
      else { byTheme.dark.push(`  --am-${tok.name}: ${v};`); if (r.theme === 'all' && tok.light) byTheme.light.push(`  --am-${tok.name}: ${v};`); }
      continue;
    }
    const el = ELEMENTS.find((e) => e.id === r.key);
    if (el) els.push(`${el.selector} { ${el.property}: ${v} !important;${el.also ? ` ${el.also}: ${v} !important;` : ''} }`);
  }
  let css = '';
  if (byTheme.dark.length) css += `:root {\n${byTheme.dark.join('\n')}\n}\n`;
  if (byTheme.light.length) css += `html[data-theme="light"] {\n${byTheme.light.join('\n')}\n}\n`;
  if (els.length) css += els.join('\n') + '\n';
  const c = String(custom || '').replace(/<\/?style/gi, '').slice(0, 20000);
  if (c.trim()) css += `/* custom */\n${c}\n`;
  return css;
}
