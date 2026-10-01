import test from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../frontend/src/js/core/game-engine.js';
import { createBoard } from '../frontend/src/js/modules/board.js';
import { RULES, DIFFICULTIES } from '../frontend/src/js/utils/constants.js';
import { difficultyFor } from '../frontend/src/js/modules/difficulty.js';
import { QUESTIONS } from '../frontend/src/js/data/questions.js';
import { summarizeGames } from '../backend/src/services/statistics-service.js';
const next = (game) => game.tick(RULES.feedbackSeconds);
const hit = (game) => {
  game.select(game.board.targetIndex);
  next(game);
};
const miss = (game) => {
  game.select((game.board.targetIndex + 1) % game.board.cells.length);
  next(game);
};
test('every mode produces exactly one different element at every grid size', () => {
  for (const mode of ['letters', 'emojis', 'mix']) {
    for (let size = 3; size <= RULES.maximumGrid; size++) {
      const board = createBoard(mode, size);
      assert.equal(board.cells.length, size * size);
      assert.equal(
        board.cells.filter((value) => value === board.cells[board.targetIndex]).length,
        1,
      );
    }
  }
});
test('difficulty respects initial times, growing grids and maximum size', () => {
  Object.entries(DIFFICULTIES).forEach(([key, config]) => {
    assert.equal(difficultyFor(key, 1).seconds, config.seconds);
    assert.equal(difficultyFor(key, 100).size, RULES.maximumGrid);
    assert.equal(difficultyFor(key, 100).seconds, RULES.minimumSeconds);
  });
});
test('hits increase score, streak, level and progress; repeated input is locked', () => {
  const game = new GameEngine();
  game.select(game.board.targetIndex);
  game.select(game.board.targetIndex);
  assert.equal(game.player.hits, 1);
  assert.equal(game.player.score, 160);
  next(game);
  hit(game);
  hit(game);
  assert.equal(game.player.level, 2);
  assert.equal(game.player.bestStreak, 3);
});
test('wrong selection and timeout reveal answer and apply distinct penalties', () => {
  const game = new GameEngine();
  hit(game);
  miss(game);
  assert.equal(game.player.score, 135);
  assert.equal(game.player.lives, 2);
  game.tick(game.timer.duration);
  assert.equal(game.feedback, 'timeout');
  assert.equal(game.player.score, 95);
  assert.equal(game.player.lives, 1);
  assert.equal(game.result().accuracy, 33);
});
test('pause freezes rounds, hint duration, feedback and quiz', () => {
  const game = new GameEngine();
  game.hint();
  game.togglePause();
  game.tick(99);
  assert.equal(game.timer.remaining, 20);
  assert.equal(game.hintLeft, RULES.hintSeconds);
  game.togglePause();
  game.select(game.board.targetIndex);
  game.togglePause();
  game.tick(99);
  assert.equal(game.phase, 'feedback');
  game.togglePause();
  next(game);
  game.startQuiz();
  game.togglePause();
  game.tick(99);
  assert.equal(game.quiz.timer.remaining, RULES.quizSeconds);
});
test('hints are temporary, penalized, limited and cannot stack', () => {
  const game = new GameEngine();
  hit(game);
  game.hint();
  game.hint();
  assert.equal(game.player.hints, 2);
  assert.equal(game.player.score, 110);
  game.tick(RULES.hintSeconds);
  assert.equal(game.hintLeft, 0);
  game.hint();
  game.tick(RULES.hintSeconds);
  game.hint();
  game.tick(RULES.hintSeconds);
  game.hint();
  assert.equal(game.player.hints, 0);
});
test('practice has no clock, rival, life loss or competitive points', () => {
  const game = new GameEngine({ practice: true });
  game.tick(999);
  miss(game);
  game.hint();
  hit(game);
  assert.equal(game.player.lives, RULES.initialLives);
  assert.equal(game.player.hints, RULES.initialHints);
  assert.equal(game.player.score, 0);
  assert.equal(game.prism.progress, 0);
});
test('PRISM reaching finish enters recovery; success restores race', () => {
  const game = new GameEngine({ difficulty: 'extreme' });
  game.tick(30);
  assert.equal(game.phase, 'quiz');
  game.answerQuiz(game.quiz.question.answer);
  next(game);
  assert.equal(game.phase, 'round');
  assert.equal(game.prism.progress, RULES.recoveryPrism);
});
test('losing all lives enters recovery; two failed questions end game', () => {
  const game = new GameEngine();
  miss(game);
  miss(game);
  miss(game);
  assert.equal(game.phase, 'quiz');
  game.answerQuiz(-1);
  next(game);
  assert.equal(game.recoveries, 2);
  game.tick(RULES.quizSeconds);
  next(game);
  assert.equal(game.outcome, 'lost');
});
test('34 hits win and ended game never advances again', () => {
  const game = new GameEngine();
  for (let index = 0; index < 34; index++) hit(game);
  assert.equal(game.outcome, 'won');
  assert.ok(game.player.level >= 10);
  const round = game.round;
  game.tick(999);
  game.select(0);
  assert.equal(game.round, round);
});
test('all educational questions have exactly four choices and valid answers', () => {
  QUESTIONS.forEach((question) => {
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options).size, 4);
    assert.ok(question.answer >= 0 && question.answer < 4);
  });
});
test('achievements use best streak even if last answer failed', () => {
  const game = new GameEngine();
  for (let index = 0; index < 10; index++) hit(game);
  miss(game);
  game.finish();
  const summary = summarizeGames([game.result()]);
  assert.equal(summary.achievements.find((item) => item.id === 'streak-ten').unlocked, true);
  assert.equal(summary.achievements.find((item) => item.id === 'extreme').unlocked, false);
});
