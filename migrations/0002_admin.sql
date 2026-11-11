-- Admin dashboard: members (Google sign-in), sessions, design changes, page analytics and an activity log.
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT,
  picture TEXT,
  role TEXT NOT NULL DEFAULT 'editor',      -- owner, admin, editor, viewer
  status TEXT NOT NULL DEFAULT 'invited',   -- invited, active, disabled
  invited_by TEXT,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,                      -- sha-256 of the cookie token
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_member ON sessions(member_id);

-- Saved design changes: one row per token or element setting and theme.
CREATE TABLE IF NOT EXISTS design_tokens (
  key TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT 'dark',       -- dark (also used for light when the token has no light value), light
  value TEXT NOT NULL,
  updated_by TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (key, theme)
);
CREATE TABLE IF NOT EXISTS design_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot TEXT NOT NULL,                   -- JSON: { rows, custom }
  note TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Page views from the site's own beacon. No cookies and no IP addresses: a visitor is a hash of
-- IP + browser + day + secret salt, so it counts unique visitors per day and can't be traced back.
CREATE TABLE IF NOT EXISTS pageviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day TEXT NOT NULL,                        -- YYYY-MM-DD (UTC)
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  path TEXT NOT NULL,
  referrer TEXT,                            -- host only
  utm_source TEXT,
  country TEXT,
  device TEXT,                              -- desktop, tablet, phone
  browser TEXT,
  visitor TEXT,
  theme TEXT
);
CREATE INDEX IF NOT EXISTS pageviews_day ON pageviews(day);
CREATE INDEX IF NOT EXISTS pageviews_path ON pageviews(path, day);

CREATE TABLE IF NOT EXISTS activity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,                     -- e.g. content.save, design.publish, member.invite
  target TEXT,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS activity_time ON activity(created_at);
