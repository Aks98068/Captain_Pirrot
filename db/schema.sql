-- Captain Pirrot database schema (MySQL 5.7+ / MariaDB 10.3+)
-- Applied automatically by:  npm run db:setup

CREATE TABLE IF NOT EXISTS team_members (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(80)  NOT NULL UNIQUE,
  name             VARCHAR(120) NOT NULL,
  initials         VARCHAR(4)   NOT NULL,
  role             VARCHAR(160) NOT NULL,
  bio              VARCHAR(500) NOT NULL,
  about            TEXT NULL,
  location         VARCHAR(120) NULL,
  email            VARCHAR(160) NULL,
  avatar_url       VARCHAR(500) NULL,
  github_username  VARCHAR(80)  NULL,
  github_url       VARCHAR(300) NULL,
  linkedin_url     VARCHAR(300) NULL,
  skills           TEXT NULL,          -- JSON array of strings
  certifications   TEXT NULL,          -- JSON array of {name, issuer, year}
  sort_order       INT NOT NULL DEFAULT 0
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS member_education (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  member_id    INT NOT NULL,
  degree       VARCHAR(200) NOT NULL,
  field        VARCHAR(200) NULL,
  institution  VARCHAR(200) NOT NULL,
  start_year   SMALLINT NULL,
  end_year     SMALLINT NULL,          -- NULL = present
  grade        VARCHAR(80) NULL,
  description  TEXT NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  FOREIGN KEY (member_id) REFERENCES team_members(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS member_repos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  member_id    INT NOT NULL,
  name         VARCHAR(160) NOT NULL,
  description  VARCHAR(500) NULL,
  language     VARCHAR(60) NULL,
  stars        INT NULL,               -- NULL = not synced (shown as blank, never faked)
  forks        INT NULL,
  url          VARCHAR(400) NOT NULL,
  topics       TEXT NULL,              -- JSON array of strings
  updated_at   DATE NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  FOREIGN KEY (member_id) REFERENCES team_members(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS blog_posts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(160) NOT NULL UNIQUE,
  title         VARCHAR(250) NOT NULL,
  excerpt       VARCHAR(500) NOT NULL,
  content       MEDIUMTEXT NOT NULL,   -- light markdown: ## headings, > quotes, - lists, ``` code ```
  category      VARCHAR(60) NOT NULL,
  tags          TEXT NULL,             -- JSON array of strings
  author_id     INT NULL,
  status        ENUM('published','draft') NOT NULL DEFAULT 'published',
  published_at  DATE NOT NULL,
  FOREIGN KEY (author_id) REFERENCES team_members(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS contact_info (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  label       VARCHAR(60)  NOT NULL,
  value       VARCHAR(200) NOT NULL,
  href        VARCHAR(300) NULL,
  icon        VARCHAR(20)  NOT NULL DEFAULT 'mail',   -- mail | github | linkedin | pin
  sort_order  INT NOT NULL DEFAULT 0
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS site_settings (
  k  VARCHAR(80) PRIMARY KEY,
  v  TEXT NOT NULL
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  subject     VARCHAR(200) NOT NULL,
  category    VARCHAR(40)  NOT NULL,
  message     TEXT NOT NULL,
  ip          VARCHAR(64) NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4;
