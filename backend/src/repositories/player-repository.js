const PUBLIC_FIELDS = 'id, name, avatar, created_at';
export class PlayerRepository {
  constructor(database) {
    this.database = database;
  }
  list(limit) {
    return this.database
      .prepare(`SELECT ${PUBLIC_FIELDS} FROM players ORDER BY id DESC LIMIT ?`)
      .all(limit);
  }
  find(id) {
    return this.database.prepare(`SELECT ${PUBLIC_FIELDS} FROM players WHERE id = ?`).get(id);
  }
  authorized(id, hash) {
    return this.database
      .prepare('SELECT id FROM players WHERE id = ? AND token_hash = ?')
      .get(id, hash);
  }
  create(profile, hash) {
    const result = this.database
      .prepare('INSERT INTO players(name, avatar, token_hash) VALUES (?, ?, ?)')
      .run(profile.name, profile.avatar, hash);
    return this.find(Number(result.lastInsertRowid));
  }
  update(id, profile) {
    this.database
      .prepare('UPDATE players SET name = ?, avatar = ? WHERE id = ?')
      .run(profile.name, profile.avatar, id);
    return this.find(id);
  }
}
