// Activity log: who did what in the admin.
import { api, esc, attr, icon, ago, fmtDateTime, empty, download, csv } from '../core.js';
import { header } from '../app.js';
import { describe } from './overview.js';

const KINDS = [['', 'Everything'], ['auth', 'Sign-ins'], ['content', 'Content'], ['pages', 'Page text'], ['design', 'Design'], ['enquiry', 'Enquiries'], ['contact', 'Contacts'], ['member', 'Members'], ['media', 'Images']];

export default async function activity(view, _rest, q) {
  const kind = q.get('kind') || '';
  header('Activity', { actions: `<button class="btn" id="export">${icon('download')} Export CSV</button>` });
  const { items } = await api('activity');
  const rows = items.filter((a) => !kind || a.action.startsWith(kind + '.'));
  view.innerHTML = `
<div class="tabs">${KINDS.map(([k, l]) => `<a href="/admin/activity${k ? `?kind=${k}` : ''}" data-link ${k === kind ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</div>
<div class="card">${rows.length ? `<div class="list">${rows.map((a) => `<div><div class="grow"><div class="small"><b>${esc(a.actor.replace(/@.*/, ''))}</b> ${esc(describe(a))}</div><div class="meta" title="${attr(fmtDateTime(a.created_at))}">${ago(a.created_at)} · ${esc(a.actor)}</div></div><span class="muted small mono hide-sm">${esc(a.action)}</span></div>`).join('')}</div>` : empty('Nothing here yet.', 'clock')}</div>
<p class="muted small" style="margin-top:12px">Shows the latest 200 actions.</p>`;
  document.getElementById('export').onclick = () => download('admonk-activity.csv', csv(rows, [
    { label: 'When', get: (r) => r.created_at }, { label: 'Who', get: (r) => r.actor }, { label: 'Action', get: (r) => r.action }, { label: 'Target', get: (r) => r.target }, { label: 'Detail', get: (r) => r.detail },
  ]));
}
