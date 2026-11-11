// Setup: what's connected, and the steps for what isn't.
import { api, state, esc, icon, ago, fmtDateTime, can } from '../core.js';
import { header } from '../app.js';

export default async function settings(view) {
  header('Setup');
  const s = state.me.setup;
  const st = await api('status').catch(() => null);
  const origin = location.origin;
  const ok = (v, yes, no) => `<div class="check">${v ? `<span class="ok">${icon('check')}</span>` : `<span class="no">${icon('alert')}</span>`}<div class="grow"><b>${yes}</b><div class="muted small">${no}</div></div></div>`;
  const secrets = '<a href="https://dash.cloudflare.com/?to=/:account/workers/services/view/admonk/production/settings" target="_blank" rel="noopener">Cloudflare → Workers → admonk → Settings → Variables and secrets</a>';
  view.innerHTML = `
<div class="grid g-2">
<div class="card"><div class="card-h"><h2>Status</h2></div><div class="card-b" style="padding-top:4px">
  ${ok(s.google, 'Google sign-in', s.google ? 'Members sign in with their Google account.' : s.dev ? 'Not set up. This is a development build, so sign-in is skipped.' : 'Not set up yet. Follow step 1 below.')}
  ${ok(s.github, 'Content editing (GitHub)', s.github ? `Saves go to ${esc(state.me.repo)} on the ${esc(state.me.branch)} branch and publish in about two minutes.` : 'Not set up yet. Content and page text can be viewed but not saved. Follow step 2.')}
  ${ok(true, 'Analytics', 'Built in. Counts visits without cookies; nothing to set up.')}
  ${ok(true, 'Enquiries and contacts', 'Every website form lands in the inbox here.')}
  ${ok(s.email, 'Email notifications', s.email ? 'New enquiries are emailed to the team.' : 'Planned for later, once email sending is set up on a subdomain.')}
</div></div>
<div class="card"><div class="card-h"><h2>Website build</h2></div><div class="card-b">
  ${st?.build ? `<div class="list"><div><span class="muted" style="width:120px">Live version</span><span class="grow mono">${esc((st.build.commit || '').slice(0, 7) || 'unknown')}</span></div><div><span class="muted" style="width:120px">Built</span><span class="grow">${esc(fmtDateTime(st.build.builtAt || st.build.built_at))} (${ago(st.build.builtAt || st.build.built_at)})</span></div>
  ${st.latest ? `<div><span class="muted" style="width:120px">Latest change</span><span class="grow">${esc(st.latest.message)}<div class="muted small">${esc(st.latest.author || '')} · ${ago(st.latest.date)}</div></span></div>` : ''}</div>
  ${st.publishing ? `<div class="banner" style="margin:12px 0 0">${icon('rocket')}<div>The latest change is being published now.</div></div>` : ''}` : '<p class="muted">Build details appear after the first deploy.</p>'}
</div></div>
</div>

${can('owner') ? `<div class="card" style="margin-top:16px"><div class="card-h"><h2>1 · Google sign-in</h2>${s.google ? '<span class="badge b-active">done</span>' : ''}</div><div class="card-b"><ol class="steps">
  <li>Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Google Cloud → APIs and services → Credentials</a> while signed in as the Admonk Google Workspace admin. Create a project called “Admonk website” if asked.</li>
  <li>Set up the <b>OAuth consent screen</b>: user type <b>Internal</b> (only Admonk accounts) or External, app name “Admonk admin”, support email info@admonk.net.</li>
  <li>Create credentials → <b>OAuth client ID</b> → type <b>Web application</b>. Under <b>Authorised redirect URIs</b> add <code>${esc(origin)}/api/auth/callback</code>${origin.includes('admonk.net') ? '' : ' and <code>https://admonk.net/api/auth/callback</code>'}.</li>
  <li>Copy the client ID and secret into ${secrets} as two <b>secrets</b>: <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code>.</li>
  <li>Owners are set by <code>OWNER_EMAILS</code> in <code>wrangler.jsonc</code> (they become owners on first sign-in). Invite everyone else from <a href="/admin/members" data-link>Members</a>.</li>
</ol></div></div>

<div class="card" style="margin-top:16px"><div class="card-h"><h2>2 · Content editing</h2>${s.github ? '<span class="badge b-active">done</span>' : ''}</div><div class="card-b"><ol class="steps">
  <li>Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub → Fine-grained personal access tokens → Generate</a>. Resource owner: <b>admonkstudio</b>.</li>
  <li>Repository access: <b>Only select repositories</b> → <code>${esc(state.me.repo)}</code>. Permissions: <b>Contents: Read and write</b> (Metadata: read is added automatically). Pick the longest expiry you’re comfortable with.</li>
  <li>Add the token in ${secrets} as a secret called <code>GITHUB_TOKEN</code>.</li>
  <li>Each save becomes a commit with the editor’s name, and the site redeploys on its own in about two minutes.</li>
</ol></div></div>` : '<p class="muted" style="margin-top:16px">Only owners can see the setup steps.</p>'}`;
}
