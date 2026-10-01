import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openDatabase } from '../backend/src/config/database.js';
import { createApp } from '../backend/src/app.js';
const directory = mkdtempSync(join(tmpdir(), 'neonstride-test-'));
const databasePath = join(directory, 'test.sqlite');
let database, server, base, player;
before(async () => {
  database = openDatabase(databasePath);
  server = createApp(database, ['http://allowed.example']).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise((resolve) => server.close(resolve));
  database.close();
  rmSync(directory, { recursive: true });
});
async function api(path, body, token, method = 'POST') {
  const response = await fetch(base + '/api' + path, {
    method: body === undefined ? 'GET' : method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, ...(await response.json()) };
}
function game(overrides = {}) {
  return {
    submission_id: randomUUID(),
    player_id: player.id,
    score: 160,
    mode: 'letters',
    difficulty: 'easy',
    practice: false,
    outcome: 'abandoned',
    level: 1,
    rounds: 1,
    hits: 1,
    misses: 0,
    best_streak: 1,
    ...overrides,
  };
}
test('player creation validates names and never exposes credential hash', async () => {
  assert.equal((await api('/players', { name: '<script>', avatar: '🐱' })).status, 400);
  const response = await api('/players', { name: 'Piloto prueba', avatar: '🐱' });
  assert.equal(response.status, 201);
  player = response.data;
  assert.ok(player.token);
  assert.equal(player.token_hash, undefined);
  assert.equal((await api('/players')).data[0].token, undefined);
});
test('profile update requires ownership token', async () => {
  const profile = { name: 'Piloto nuevo', avatar: '🤖' };
  assert.equal((await api(`/players/${player.id}`, profile, '', 'PUT')).status, 401);
  assert.equal(
    (await api(`/players/${player.id}`, profile, player.token, 'PUT')).data.name,
    profile.name,
  );
});
test('game validates score, modes, counts and credentials', async () => {
  assert.equal((await api('/games', game())).status, 401);
  for (const value of [
    { score: -1 },
    { mode: 'invalid' },
    { hits: 999 },
    { level: 0 },
    { score: 999999 },
  ]) {
    const response = await api('/games', game(value), player.token);
    assert.equal(response.status, 400);
    assert.equal(response.success, false);
    assert.equal(response.data, null);
  }
});
test('game persistence is idempotent and server computes accuracy', async () => {
  const payload = game({ accuracy: 7 });
  const first = await api('/games', payload, player.token);
  const second = await api('/games', payload, player.token);
  assert.equal(first.status, 201);
  assert.equal(first.data.accuracy, 100);
  assert.equal(first.data.id, second.data.id);
  assert.equal((await api(`/players/${player.id}/games`)).data.length, 1);
});
test('practice does not affect leaderboard, counts or achievements', async () => {
  await api(
    '/games',
    game({ practice: true, score: 0, hits: 30, rounds: 30, level: 11, best_streak: 30 }),
    player.token,
  );
  const stats = (await api(`/players/${player.id}/statistics`)).data;
  assert.equal(stats.stats.games, 1);
  assert.equal(stats.stats.level, 1);
  assert.equal((await api('/leaderboard')).data[0].score, 160);
  assert.equal((await api('/leaderboard?mode=emojis')).data.length, 0);
});
test('SQL-like input is rejected without damage; invalid IDs and missing routes are safe', async () => {
  assert.equal(
    (await api('/players', { name: "';DROP TABLE players;", avatar: '🐱' })).status,
    400,
  );
  assert.equal((await api('/players/abc/games')).status, 400);
  assert.equal((await api('/players/9999/games')).status, 404);
  assert.equal((await api('/missing')).status, 404);
  assert.equal((await api('/leaderboard?difficulty=nope')).status, 400);
});
test('CORS is explicit and malformed JSON gets a normalized error', async () => {
  const denied = await fetch(base + '/api/players', {
    headers: { Origin: 'http://denied.example' },
  });
  assert.equal(denied.status, 400);
  const allowed = await fetch(base + '/api/players', {
    headers: { Origin: 'http://allowed.example' },
  });
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://allowed.example');
  const malformed = await fetch(base + '/api/players', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{bad',
  });
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).data, null);
});
test('a second database connection reads persisted games', () => {
  const reopened = openDatabase(databasePath);
  assert.equal(reopened.prepare('SELECT COUNT(*) AS count FROM games').get().count, 2);
  reopened.close();
});
test('array enums, forged victory and malformed submission IDs are rejected', async () => {
  for (const invalid of [
    { mode: ['letters'] },
    { difficulty: ['easy'] },
    { outcome: 'won' },
    { submission_id: '-'.repeat(36) },
  ]) {
    assert.equal((await api('/games', game(invalid), player.token)).status, 400);
  }
  assert.equal((await api('/leaderboard?mode=letters&mode=emojis')).status, 400);
});
test('internal errors are not exposed to clients', async () => {
  const broken = createApp(
    {
      prepare() {
        throw new Error('SECRET DATABASE PATH');
      },
    },
    [],
  ).listen(0);
  await new Promise((resolve) => broken.once('listening', resolve));
  const response = await fetch(`http://127.0.0.1:${broken.address().port}/api/players`);
  const payload = await response.json();
  assert.equal(response.status, 500);
  assert.equal(payload.message, 'Ocurrió un error interno.');
  await new Promise((resolve) => broken.close(resolve));
});
