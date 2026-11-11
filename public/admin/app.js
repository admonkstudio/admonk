// Admin shell: sidebar, top bar and a small router for the screens.
import { api, state, esc, icon, avatar, fail, can } from './core.js';

const NAV = [
  { group: null, items: [
    { path: '/admin', label: 'Overview', icon: 'home', screen: () => import('./screens/overview.js') },
    { path: '/admin/analytics', label: 'Analytics', icon: 'chart', screen: () => import('./screens/analytics.js') },
  ] },
  { group: 'CRM', items: [
    { path: '/admin/enquiries', label: 'Enquiries', icon: 'inbox', screen: () => import('./screens/enquiries.js'), count: 'open' },
    { path: '/admin/contacts', label: 'Contacts', icon: 'contact', screen: () => import('./screens/contacts.js') },
  ] },
  { group: 'Website', items: [
    { path: '/admin/content', label: 'Content', icon: 'folder', screen: () => import('./screens/content.js') },
    { path: '/admin/pages', label: 'Page text', icon: 'type', screen: () => import('./screens/pages.js') },
    { path: '/admin/design', label: 'Design system', icon: 'palette', screen: () => import('./screens/design.js'), wide: true },
  ] },
  { group: 'Workspace', items: [
    { path: '/admin/members', label: 'Members', icon: 'users', screen: () => import('./screens/members.js') },
    { path: '/admin/activity', label: 'Activity', icon: 'clock', screen: () => import('./screens/activity.js') },
    { path: '/admin/settings', label: 'Setup', icon: 'settings', screen: () => import('./screens/settings.js') },
  ] },
];
const ALL = NAV.flatMap((g) => g.items);
const match = (path) => ALL.filter((i) => path === i.path || (i.path !== '/admin' && path.startsWith(i.path + '/'))).sort((a, b) => b.path.length - a.path.length)[0] || ALL[0];

function shell() {
  const m = state.me.member;
  document.getElementById('app').innerHTML = `<div class="shell">
<nav class="side" id="side" aria-label="Admin">
  <a class="brand" href="/admin" data-link><img class="auto" src="/wf/am/logo-icon.png" alt=""><div><b>Admonk</b><span>Studio admin</span></div></a>
  ${NAV.map((g) => `${g.group ? `<div class="nav-label">${g.group}</div>` : ''}<div class="nav">${g.items.map((i) => `<a href="${i.path}" data-link data-nav="${i.path}">${icon(i.icon)}<span>${i.label}</span>${i.count ? '<span class="count" data-count hidden></span>' : ''}</a>`).join('')}</div>`).join('')}
  <div class="nav" style="margin-top:12px"><a href="/" target="_blank" rel="noopener">${icon('external')}<span>View website</span></a></div>
  <div class="side-foot">${avatar(m)}<div class="who"><b>${esc(m.name || m.email)}</b><span>${esc(m.role)}</span></div>
    <button class="btn ghost icon sm" id="theme" title="Switch admin theme" aria-label="Switch admin theme">${icon(document.documentElement.getAttribute('data-theme') === 'light' ? 'moon' : 'sun')}</button>
    <a class="btn ghost icon sm" href="/api/auth/logout" title="Sign out" aria-label="Sign out">${icon('logout')}</a></div>
</nav>
<div class="main"><header class="top"><button class="btn ghost icon menu-btn" id="menu" aria-label="Open menu">${icon('menu')}</button><div id="title"></div><div class="actions" id="actions"></div></header><div id="view"></div></div>
</div>`;
  document.getElementById('menu').onclick = () => document.getElementById('side').classList.toggle('open');
  document.getElementById('theme').onclick = (e) => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('am-admin-theme', next); } catch {}
    e.currentTarget.innerHTML = icon(next === 'light' ? 'moon' : 'sun');
  };
}

/** Called by screens to set the header. */
export function header(title, { crumbs = [], actions = '' } = {}) {
  document.getElementById('title').innerHTML = crumbs.length
    ? `<div class="crumbs">${crumbs.map((c) => (c.href ? `<a href="${c.href}" data-link>${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`)).join(`<span>${icon('right').replace('<svg', '<svg style="width:13px"')}</span>`)}<span style="color:var(--ink);font-weight:600">${esc(title)}</span></div>`
    : `<h1>${esc(title)}</h1>`;
  document.getElementById('actions').innerHTML = actions;
  document.title = `${title} · Admonk Admin`;
}

let leaveGuard = null;
/** A screen with unsaved changes registers a guard; navigation asks before leaving. */
export const guard = (fn) => { leaveGuard = fn; };

async function render() {
  const path = location.pathname.replace(/\/+$/, '') || '/admin';
  const item = match(path);
  document.querySelectorAll('[data-nav]').forEach((a) => { if (a.dataset.nav === item.path) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  document.getElementById('side').classList.remove('open');
  document.querySelectorAll('.scrim, .drawer, .dialog').forEach((n) => n.remove());
  const view = document.getElementById('view');
  view.className = item.wide ? 'content wide' : 'content';
  if (item.wide) view.style.padding = '0';
  else view.style.padding = '';
  view.innerHTML = '<div class="skeleton" style="height:180px"></div>';
  leaveGuard = null;
  try {
    const mod = await item.screen();
    const rest = path.slice(item.path.length).split('/').filter(Boolean).map(decodeURIComponent);
    await mod.default(view, rest, new URLSearchParams(location.search));
  } catch (e) {
    fail(e);
    view.innerHTML = `<div class="banner">${icon('alert')}<div><b>This screen couldn’t load.</b><br>${esc(e.message)}</div></div>`;
  }
}

export function go(href, { replace = false } = {}) {
  if (leaveGuard && !leaveGuard()) return;
  history[replace ? 'replaceState' : 'pushState']({}, '', href);
  render();
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-link], a[href^="/admin"]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.getAttribute('href').startsWith('/api/')) return;
  e.preventDefault();
  go(a.getAttribute('href'));
});
window.addEventListener('popstate', render);
window.addEventListener('beforeunload', (e) => { if (leaveGuard && !leaveGuard(true)) { e.preventDefault(); e.returnValue = ''; } });

export async function refreshCounts() {
  try {
    const o = await api('enquiries?status=new');
    const n = o.counts.new || 0;
    const el = document.querySelector('[data-count]');
    if (el) { el.textContent = n; el.hidden = !n; }
  } catch {}
}

(async () => {
  try {
    state.me = await api('me');
    shell();
    await render();
    refreshCounts();
    // Members area is read-only for non-owners; the screens check roles too.
    if (!can('viewer')) throw new Error('No access');
  } catch (e) {
    if (e.status !== 401) document.getElementById('app').innerHTML = `<div class="content"><div class="banner">${icon('alert')}<div><b>The admin couldn’t start.</b><br>${esc(e.message)}</div></div></div>`;
  }
})();
