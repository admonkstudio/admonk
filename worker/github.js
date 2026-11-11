// Content is stored as files in the GitHub repo (src/content/...). The admin reads and writes them
// through the GitHub API; every save is a commit, and Workers Builds redeploys the site from it.
//
// Setup: GITHUB_TOKEN secret = a fine-grained personal access token for admonkstudio/admonk with
// "Contents: Read and write". GITHUB_REPO and CONTENT_BRANCH are in wrangler.jsonc.

const API = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export function github(env) {
  const repo = env.GITHUB_REPO || 'admonkstudio/admonk';
  const branch = env.CONTENT_BRANCH || 'main';
  const ready = !!env.GITHUB_TOKEN;

  async function call(path, init = {}) {
    if (!ready) throw new GitHubError('GitHub is not connected yet (GITHUB_TOKEN is missing).', 503);
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'admonk-admin',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    if (res.status === 404) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new GitHubError(data.message || `GitHub error ${res.status}`, res.status === 409 || res.status === 422 ? 409 : 502);
    return data;
  }

  const enc = (p) => p.split('/').map(encodeURIComponent).join('/');
  const utf8ToB64 = (s) => { const b = new TextEncoder().encode(s); let bin = ''; for (let i = 0; i < b.length; i += 0x8000) bin += String.fromCharCode(...b.subarray(i, i + 0x8000)); return btoa(bin); };
  const b64ToUtf8 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, '')), (c) => c.charCodeAt(0)));

  return {
    ready, repo, branch,
    async list(dir) {
      const items = await call(`/repos/${repo}/contents/${enc(dir)}?ref=${encodeURIComponent(branch)}`);
      return (items || []).filter((i) => i.type === 'file').map((i) => ({ name: i.name, path: i.path, sha: i.sha, size: i.size }));
    },
    async read(path) {
      const f = await call(`/repos/${repo}/contents/${enc(path)}?ref=${encodeURIComponent(branch)}`);
      if (!f) return null;
      // Files over 1 MB come without content; fetch the blob instead.
      const content = f.content ? b64ToUtf8(f.content) : b64ToUtf8((await call(`/repos/${repo}/git/blobs/${f.sha}`)).content);
      return { path: f.path, sha: f.sha, content };
    },
    /** Creates or updates a file. `content` is text unless `base64` is true. Pass the sha you read to avoid overwriting someone else's change. */
    async write(path, content, { message, sha, base64 = false, author }) {
      const body = { message, content: base64 ? content : utf8ToB64(content), branch, ...(sha ? { sha } : {}) };
      if (author?.email) body.committer = body.author = { name: author.name || author.email, email: author.email };
      const r = await call(`/repos/${repo}/contents/${enc(path)}`, { method: 'PUT', body: JSON.stringify(body) });
      return { sha: r.content.sha, commit: r.commit.sha };
    },
    async remove(path, { message, sha, author }) {
      const body = { message, sha, branch };
      if (author?.email) body.committer = body.author = { name: author.name || author.email, email: author.email };
      const r = await call(`/repos/${repo}/contents/${enc(path)}`, { method: 'DELETE', body: JSON.stringify(body) });
      return { commit: r.commit.sha };
    },
    async latestCommit() {
      const c = await call(`/repos/${repo}/commits/${encodeURIComponent(branch)}`);
      return c ? { sha: c.sha, message: c.commit.message.split('\n')[0], date: c.commit.committer.date, author: c.commit.author.name } : null;
    },
    async recentCommits(path, n = 15) {
      const list = await call(`/repos/${repo}/commits?sha=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}&per_page=${n}`);
      return (list || []).map((c) => ({ sha: c.sha, message: c.commit.message.split('\n')[0], date: c.commit.committer.date, author: c.commit.author.name }));
    },
  };
}
