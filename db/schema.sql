-- Tables for taaranjain.com in the shared Railway Postgres database.
-- Safe to re-run: `npm run db:setup` only creates what is missing.

-- Contact-form enquiries, one row per submission.
-- The admin app owns `status`, `notes` and `updated_at` after the row is created.
CREATE TABLE IF NOT EXISTS taaranjain_leads (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  source        text        NOT NULL,
  status        text        NOT NULL DEFAULT 'new',
  name          text        NOT NULL,
  email         text        NOT NULL,
  subject       text,
  message       text        NOT NULL,
  page_path     text,
  landing_path  text,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  visitor_id    uuid,
  session_id    uuid,
  device_type   text,
  country       text,
  region        text,
  city          text,
  email_sent    boolean     NOT NULL DEFAULT false,
  notes         text
);

CREATE INDEX IF NOT EXISTS taaranjain_leads_created_at_idx ON taaranjain_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS taaranjain_leads_status_idx ON taaranjain_leads (status);

-- One row per page view. The browser picks the id, inserts the row when the
-- page opens, and re-sends it as the visitor leaves so duration_seconds
-- (time the tab was visible) and max_scroll_percent only ever grow.
CREATE TABLE IF NOT EXISTS taaranjain_analytics (
  id                  uuid        PRIMARY KEY,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  visitor_id          uuid        NOT NULL,
  session_id          uuid        NOT NULL,
  path                text        NOT NULL,
  page_title          text,
  referrer            text,
  utm_source          text,
  utm_medium          text,
  utm_campaign        text,
  device_type         text,
  browser             text,
  os                  text,
  screen_width        integer,
  language            text,
  country             text,
  region              text,
  city                text,
  duration_seconds    integer     NOT NULL DEFAULT 0,
  max_scroll_percent  smallint    NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS taaranjain_analytics_created_at_idx ON taaranjain_analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS taaranjain_analytics_path_created_at_idx ON taaranjain_analytics (path, created_at DESC);
CREATE INDEX IF NOT EXISTS taaranjain_analytics_visitor_idx ON taaranjain_analytics (visitor_id);
