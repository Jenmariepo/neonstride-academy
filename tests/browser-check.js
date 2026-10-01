import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
const base = process.env.TEST_URL || 'http://localhost:3000';
const browser = process.env.CDP_URL
  ? await chromium.connectOverCDP(process.env.CDP_URL)
  : await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1050 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
mkdirSync('docs/screenshots', { recursive: true });
const click = (action) => page.locator(`button[data-action="${action}"]:visible`).first().click();
async function waitSaved() {
  await page.getByText('Partida guardada en la base de datos.', { exact: true }).waitFor();
}
async function targetIndex() {
  return page.locator('#board .cell').evaluateAll((cells) => {
    const symbols = cells.map((cell) => cell.textContent);
    return symbols.findIndex((symbol) => symbols.filter((value) => value === symbol).length === 1);
  });
}
async function selectTarget(correct = true) {
  const index = await targetIndex();
  const count = await page.locator('#board .cell').count();
  await page
    .locator('#board .cell')
    .nth(correct ? index : (index + 1) % count)
    .click();
}
async function waitNext(previous) {
  await page.waitForFunction(
    (round) => Number(document.getElementById('hud-round').textContent) > round,
    previous,
  );
}
async function profileAndMenu() {
  await page.goto(base);
  await page.locator('#profile-name').fill('Piloto QA');
  await page.locator('[data-action="avatar"]').nth(4).click();
  await page.locator('#save-profile').click();
  await page.locator('#profile-dialog').waitFor({ state: 'hidden' });
  await page.screenshot({ path: 'docs/screenshots/menu-desktop.png', fullPage: true });
  await click('settings');
  await page.locator('#theme').selectOption('purple');
  assert.equal(await page.locator('body').getAttribute('data-theme'), 'purple');
  await page.locator('#sound').uncheck();
  await page.locator('#animations').uncheck();
  await page.reload();
  assert.equal(await page.locator('body').getAttribute('data-theme'), 'purple');
  await click('settings');
  await click('reset');
  await click('menu');
}
async function practice() {
  await click('practice');
  await click('start');
  await page.locator('#board .cell').first().waitFor();
  assert.equal(await page.locator('#hud-time').textContent(), '∞');
  await page.keyboard.press('h');
  assert.equal(await page.locator('.cell.hint').count(), 1);
  await selectTarget();
  await waitNext(1);
  await selectTarget(false);
  await waitNext(2);
  assert.equal(await page.locator('#hud-lives').textContent(), '∞');
  await page.keyboard.press('p');
  await page.locator('#pause-dialog').waitFor();
  await page.keyboard.press('p');
  await page.locator('#pause-dialog').waitFor({ state: 'hidden' });
  await click('finish');
  await waitSaved();
  await click('menu');
}
async function competitive() {
  await click('play');
  await click('start');
  await page.locator('#board .cell').first().waitFor();
  await page.keyboard.press('p');
  const time = await page.locator('#hud-time').textContent();
  await page.waitForTimeout(1100);
  assert.equal(await page.locator('#hud-time').textContent(), time);
  await click('pause');
  await selectTarget();
  await waitNext(1);
  await page.screenshot({ path: 'docs/screenshots/game-desktop.png', fullPage: true });
  for (let round = 2; round <= 3; round++) {
    await selectTarget(false);
    await waitNext(round);
  }
  await selectTarget(false);
  await page.locator('#quiz-dialog').waitFor();
  assert.equal(await page.locator('#quiz-options button').count(), 4);
  await click('pause');
  await page.locator('#pause-dialog').waitFor();
  await click('pause');
  await page.locator('#quiz-dialog').waitFor();
  await page.screenshot({ path: 'docs/screenshots/recovery.png', fullPage: true });
  await click('pause');
  await click('finish');
  await waitSaved();
  await page.screenshot({ path: 'docs/screenshots/results.png', fullPage: true });
}
async function recordsAndFailure() {
  await click('menu');
  await click('records');
  await page.locator('#leaderboard li').first().waitFor();
  assert.match(await page.locator('#leaderboard').textContent(), /Piloto QA/);
  await click('menu');
  await click('achievements');
  await page.locator('.achievement').first().waitFor();
  assert.equal(await page.locator('.achievement').count(), 14);
  await click('menu');
  await click('play');
  await click('start');
  await page.locator('#board .cell').first().waitFor();
  await page.route('**/api/games', (route) => route.abort());
  await click('finish');
  await page.locator('#retry-save').waitFor();
  await page.unroute('**/api/games');
  await click('retry-save');
  await waitSaved();
  await click('menu');
}
async function responsive() {
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 950 });
    await page.screenshot({ path: `docs/screenshots/menu-${width}.png`, fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  await click('practice');
  await page.locator('#difficulty').selectOption('extreme');
  await click('start');
  await page.locator('#board .cell').first().waitFor();
  await page.setViewportSize({ width: 375, height: 950 });
  await page.screenshot({ path: 'docs/screenshots/game-mobile.png', fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.equal(await page.locator('#board .cell').count(), 36);
  await click('finish');
  await waitSaved();
}
try {
  await profileAndMenu();
  await practice();
  await competitive();
  await recordsAndFailure();
  await responsive();
  assert.deepEqual(errors, []);
  process.stdout.write(
    'Browser checks passed: profile, settings, practice, race, pause, recovery, records, achievements, retry, responsive.\n',
  );
} finally {
  await context.close();
  await browser.close();
}
