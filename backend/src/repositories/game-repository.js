export class GameRepository {
  constructor(database) {
    this.database = database;
  }
  list(limit, playerId = null) {
    return this.database
      .prepare(
        `SELECT * FROM games WHERE (? IS NULL OR player_id = ?)
      ORDER BY id DESC LIMIT ?`,
      )
      .all(playerId, playerId, limit);
  }
  history(playerId) {
    return this.database
      .prepare('SELECT * FROM games WHERE player_id = ? AND practice = 0 ORDER BY id')
      .all(playerId);
  }
  findSubmission(submissionId) {
    return this.database.prepare('SELECT * FROM games WHERE submission_id = ?').get(submissionId);
  }
  create(game) {
    this.database
      .prepare(
        `INSERT INTO games (submission_id, player_id, score, mode, difficulty,
      practice, outcome, level, rounds, hits, misses, accuracy, best_streak)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        game.submission_id,
        game.player_id,
        game.score,
        game.mode,
        game.difficulty,
        Number(game.practice),
        game.outcome,
        game.level,
        game.rounds,
        game.hits,
        game.misses,
        game.accuracy,
        game.best_streak,
      );
    return this.findSubmission(game.submission_id);
  }
  leaderboard({ mode, difficulty }, limit) {
    return this.database
      .prepare(
        `SELECT p.id AS player_id, p.name, p.avatar,
      MAX(g.score) AS score, MAX(g.best_streak) AS best_streak
      FROM games g JOIN players p ON p.id = g.player_id
      WHERE g.practice = 0 AND (? IS NULL OR g.mode = ?)
      AND (? IS NULL OR g.difficulty = ?) GROUP BY p.id
      ORDER BY score DESC, best_streak DESC, p.id ASC LIMIT ?`,
      )
      .all(mode, mode, difficulty, difficulty, limit);
  }
}
