import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { createApp } from '../backend/src/app.js';
import { openDatabase } from '../backend/src/config/database.js';
import { Application } from '../frontend/src/js/ui/application.js';
import { RULES } from '../frontend/src/js/utils/constants.js';
let dom, app, server, database;
const savedGlobals = new Map();
function installGlobal(name, value) {
  savedGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
}
function createDom(base) {
  dom = new JSDOM(readFileSync('frontend/index.html', 'utf8'), { url: base });
  ['window', 'document', 'localStorage', 'AbortController'].forEach((name) =>
    installGlobal(name, dom.window[name]),
  );
  installGlobal('requestAnimationFrame', () => 1);
  installGlobal('cancelAnimationFrame', () => {});
  installGlobal('matchMedia', () => ({ matches: true }));
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  document.querySelector('meta[name="api-base"]').content = base;
}
before(async () => {
  database = openDatabase(':memory:');
  server = createApp(database, []).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  createDom(`http://localhost:${server.address().port}`);
  app = new Application();
  await app.initialize();
});
after(async () => {
  app.input.destroy();
  app.loop.stop();
  clearTimeout(app.effects.toastTimer);
  await new Promise((resolve) => server.close(resolve));
  database.close();
  dom.window.close();
  savedGlobals.forEach((descriptor, name) => {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  });
});
const node = (id) => document.getElementById(id);
async function settle() {
  const deadline = Date.now() + 5000;
  while (app.persistence.saving && Date.now() < deadline)
    await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(app.persistence.saving, false);
}
function start(practice = false) {
  app.navigation.select(practice);
  app.start();
  app.update(0);
}
function hit() {
  app.engine.select(app.engine.board.targetIndex);
  app.update(RULES.feedbackSeconds);
}
function fail() {
  app.engine.select((app.engine.board.targetIndex + 1) % app.engine.board.cells.length);
  app.update(RULES.feedbackSeconds);
}
test('UI requires and validates a profile, saves avatar and displays server profile', async () => {
  assert.equal(node('profile-dialog').open, true);
  node('profile-name').value = 'X';
  await app.persistence.saveProfile();
  assert.match(node('profile-error').textContent, /2 y 20/);
  node('profile-name').value = 'Piloto DOM';
  app.profileView.select('🦊');
  await app.persistence.saveProfile();
  assert.equal(node('profile-dialog').open, false);
  assert.match(node('menu-profile').textContent, /🦊 Piloto DOM/);
});
test('UI practice board, hint shortcut and typing suppression work', async () => {
  start(true);
  assert.equal(node('board').children.length, 9);
  document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'h', bubbles: true }));
  app.update(0);
  assert.equal(document.querySelectorAll('.hint').length, 1);
  hit();
  fail();
  assert.equal(node('hud-lives').textContent, '∞');
  const sound = app.settings.values.sound;
  node('profile-name').dispatchEvent(
    new dom.window.KeyboardEvent('keydown', { key: 'm', bubbles: true }),
  );
  assert.equal(app.settings.values.sound, sound);
  app.finish();
  await settle();
  assert.equal(app.statistics.stats.games, 0);
});
test('UI pause, recovery dialogs, real result submission and records are connected', async () => {
  start();
  hit();
  app.pause();
  assert.equal(node('pause-dialog').open, true);
  const remaining = app.engine.timer.remaining;
  app.update(99);
  assert.equal(app.engine.timer.remaining, remaining);
  app.pause();
  fail();
  fail();
  fail();
  assert.equal(node('quiz-dialog').open, true);
  assert.equal(node('quiz-options').children.length, 4);
  app.pause();
  assert.equal(node('quiz-dialog').open, false);
  app.pause();
  app.engine.answerQuiz(app.engine.quiz.question.answer);
  app.update(RULES.feedbackSeconds);
  assert.equal(node('quiz-dialog').open, false);
  app.finish();
  await settle();
  assert.match(node('save-status').textContent, /guardada/);
  await app.navigation.records();
  assert.equal(node('leaderboard').children.length, 1);
  await app.navigation.achievements();
  assert.equal(node('achievement-list').children.length, 14);
});
test('UI retries a failed HTTP save exactly once', async () => {
  start();
  hit();
  const meta = document.querySelector('meta[name="api-base"]');
  const base = meta.content;
  meta.content = 'http://127.0.0.1:1';
  app.finish();
  await settle();
  assert.ok(app.persistence.pending);
  assert.equal(node('retry-save').hidden, false);
  meta.content = base;
  await app.persistence.retry();
  await app.persistence.retry();
  assert.equal(app.persistence.pending, null);
  assert.equal(app.statistics.stats.games, 2);
});
test('UI settings persist and profile editing pauses active game', async () => {
  app.actions.setting({ key: 'theme', value: 'green' });
  assert.equal(document.body.dataset.theme, 'green');
  assert.equal(JSON.parse(localStorage.getItem('neonstride:settings')).theme, 'green');
  start();
  app.actions.profile();
  assert.equal(app.engine.paused, true);
  assert.equal(node('profile-dialog').open, true);
  app.profileView.close();
  app.finish();
  await settle();
  app.actions.reset();
  assert.equal(document.body.dataset.theme, 'blue');
});
