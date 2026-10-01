import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { LIMITS } from './constants.js';
export function openDatabase(path) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const database = new DatabaseSync(path);
  database.exec(`PRAGMA busy_timeout = ${LIMITS.busyMilliseconds}; PRAGMA journal_mode = WAL;`);
  database.exec(readFileSync(new URL('../models/schema.sql', import.meta.url), 'utf8'));
  return database;
}
