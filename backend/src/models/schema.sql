PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 2 AND 20),
  avatar TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id TEXT NOT NULL UNIQUE,
  player_id INTEGER NOT NULL REFERENCES players(id),
  score INTEGER NOT NULL CHECK(score >= 0),
  mode TEXT NOT NULL CHECK(mode IN ('letters','emojis','mix')),
  difficulty TEXT NOT NULL CHECK(difficulty IN ('easy','normal','hard','extreme')),
  practice INTEGER NOT NULL DEFAULT 0 CHECK(practice IN (0,1)),
  outcome TEXT NOT NULL CHECK(outcome IN ('won','lost','abandoned')),
  level INTEGER NOT NULL CHECK(level >= 1),
  rounds INTEGER NOT NULL CHECK(rounds >= 0),
  hits INTEGER NOT NULL CHECK(hits >= 0),
  misses INTEGER NOT NULL CHECK(misses >= 0),
  accuracy INTEGER NOT NULL CHECK(accuracy BETWEEN 0 AND 100),
  best_streak INTEGER NOT NULL CHECK(best_streak BETWEEN 0 AND hits),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK(rounds = hits + misses)
);
CREATE INDEX IF NOT EXISTS games_player ON games(player_id, practice);
CREATE INDEX IF NOT EXISTS games_ranking ON games(practice, score DESC);
