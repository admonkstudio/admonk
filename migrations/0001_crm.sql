-- Admin CRM (Cloudflare D1). Contacts are people; enquiries are messages from the site forms.
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  company TEXT,
  status TEXT NOT NULL DEFAULT 'lead',      -- lead, client, partner, archived
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contact_id INTEGER NOT NULL REFERENCES contacts(id),
  source TEXT NOT NULL,                     -- form or page it came from
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',       -- new, replied, qualified, won, lost, spam
  page TEXT,
  referrer TEXT,
  utm TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS enquiries_status ON enquiries(status, created_at);
