// Members: who can sign in to the admin, and what they can do.
import { api, state, esc, attr, icon, badge, avatar, ago, fmtDateTime, empty, drawer, toast, fail, can, confirmBox } from '../core.js';
import { header } from '../app.js';

const ABOUT = {
  viewer: 'Sees the dashboard, analytics, enquiries and contacts. Can’t change anything.',
  editor: 'Everything a viewer can, plus answering enquiries, editing contacts, content and page text.',
  admin: 'Everything an editor can, plus publishing design changes.',
  owner: 'Full control, including inviting and removing members and changing roles.',
};

export default async function members(view) {
  const owner = can('owner');
  header('Members', { actions: owner ? `<button class="btn primary" id="invite">${icon('plus')} Invite member</button>` : '' });
  const data = await api('members');
  const me = state.me.member;
  view.innerHTML = `
<div class="card"><div class="card-h"><h2>Team</h2><span class="sub">${data.items.filter((m) => m.status === 'active').length} active · ${data.items.filter((m) => m.status === 'invited').length} invited</span></div>
${data.items.length ? `<div class="table-wrap"><table class="t"><thead><tr><th>Member</th><th>Role</th><th>Status</th><th class="hide-sm">Last sign-in</th><th class="hide-sm">Added</th>${owner ? '<th></th>' : ''}</tr></thead><tbody>
${data.items.map((m) => `<tr data-id="${m.id}"><td><div class="row" style="gap:10px">${avatar(m)}<div><b>${esc(m.name || m.email.replace(/@.*/, ''))}${m.id === me.id ? ' <span class="muted small">(you)</span>' : ''}</b><div class="muted small">${esc(m.email)}</div></div></div></td>
<td>${badge(m.role)}</td><td>${badge(m.status)}</td><td class="hide-sm muted small">${m.last_login_at ? ago(m.last_login_at) : 'Never'}</td><td class="hide-sm muted small" title="${attr(fmtDateTime(m.created_at))}">${ago(m.created_at)}${m.invited_by ? ` · by ${esc(m.invited_by.replace(/@.*/, ''))}` : ''}</td>
${owner ? `<td class="num"><button class="btn sm" data-edit="${m.id}">Manage</button></td>` : ''}</tr>`).join('')}
</tbody></table></div>` : empty('No members yet.', 'users')}</div>
<div class="card" style="margin-top:16px"><div class="card-h"><h2>Roles</h2></div><div class="card-b"><div class="role-grid">${data.roles.map((r) => `<div><b>${esc(r)}</b>${esc(ABOUT[r] || '')}</div>`).join('')}</div>
<p class="muted small" style="margin:14px 0 0">People sign in with Google using the exact email you invite. Invited members become active the first time they sign in. Disabling someone signs them out everywhere.</p></div></div>`;

  document.getElementById('invite')?.addEventListener('click', () => {
    const d = drawer('Invite a member', `
<label class="field"><span>Google account email</span><input class="input" name="email" type="email" required placeholder="name@admonk.net" autocomplete="off"></label>
<label class="field"><span>Role</span><select class="input" name="role">${data.roles.map((r) => `<option ${r === 'editor' ? 'selected' : ''}>${r}</option>`).join('')}</select></label>
<p class="muted small" id="about">${esc(ABOUT.editor)}</p>
<p class="muted small">No email is sent. Tell them to go to <span class="code">${esc(location.origin)}/admin</span> and sign in with Google.</p>`, { footer: '<button class="btn" data-cancel>Cancel</button><button class="btn primary" data-go>Invite</button>' });
    const role = d.el.querySelector('[name=role]');
    role.onchange = () => (d.el.querySelector('#about').textContent = ABOUT[role.value] || '');
    d.el.querySelector('[data-cancel]').onclick = d.close;
    d.el.querySelector('[data-go]').onclick = async () => {
      try { await api('members', { method: 'POST', body: { email: d.el.querySelector('[name=email]').value, role: role.value } }); toast('Member invited'); d.close(); members(view); } catch (e) { fail(e); }
    };
  });

  view.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => {
    const m = data.items.find((x) => String(x.id) === b.dataset.edit);
    const d = drawer(m.name || m.email, `
<div class="row" style="gap:12px;margin-bottom:16px">${avatar(m)}<div><b>${esc(m.email)}</b><div class="muted small">Added ${esc(fmtDateTime(m.created_at))}</div></div></div>
<label class="field"><span>Role</span><select class="input" name="role">${data.roles.map((r) => `<option ${r === m.role ? 'selected' : ''}>${r}</option>`).join('')}</select></label>
<p class="muted small" id="about">${esc(ABOUT[m.role] || '')}</p>
<label class="field"><span>Status</span><select class="input" name="status">${data.statuses.map((s) => `<option ${s === m.status ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
<h2 class="section">Remove</h2><p class="muted small">Removes their access and signs them out. Their past activity stays in the log.</p>
<button class="btn" data-remove style="color:var(--red)">${icon('trash')} Remove ${esc(m.email)}</button>`, { footer: '<button class="btn" data-cancel>Cancel</button><button class="btn primary" data-go>Save</button>' });
    const role = d.el.querySelector('[name=role]');
    role.onchange = () => (d.el.querySelector('#about').textContent = ABOUT[role.value] || '');
    d.el.querySelector('[data-cancel]').onclick = d.close;
    d.el.querySelector('[data-go]').onclick = async () => {
      try { await api(`members/${m.id}`, { method: 'PATCH', body: { role: role.value, status: d.el.querySelector('[name=status]').value } }); toast('Member updated'); d.close(); members(view); } catch (e) { fail(e); }
    };
    d.el.querySelector('[data-remove]').onclick = async () => {
      if (!(await confirmBox(`Remove ${m.email}?`, 'They lose access straight away. You can invite them again later.', { ok: 'Remove', danger: true }))) return;
      try { await api(`members/${m.id}`, { method: 'DELETE' }); toast('Member removed'); d.close(); members(view); } catch (e) { fail(e); }
    };
  }));
}
