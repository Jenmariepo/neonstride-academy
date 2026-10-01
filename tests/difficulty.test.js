import test from 'node:test';
import assert from 'node:assert/strict';
import { difficultyFor } from '../frontend/src/js/modules/difficulty.js';
import { DIFFICULTIES, RULES } from '../frontend/src/js/utils/constants.js';
import { Prism } from '../frontend/src/js/entities/prism.js';
import { GameEngine } from '../frontend/src/js/core/game-engine.js';

test('every level increases PRISM pressure even after time and grid reach their limits', () => {
  Object.keys(DIFFICULTIES).forEach((difficulty) => {
    for (let level = 2; level <= 100; level++) {
      const previous = difficultyFor(difficulty, level - 1);
      const current = difficultyFor(difficulty, level);
      assert.ok(current.prismSpeed > previous.prismSpeed);
      assert.ok(current.prismRelief < previous.prismRelief);
      assert.ok(current.seconds <= previous.seconds);
      assert.ok(current.size >= previous.size);
      assert.ok(current.size <= RULES.maximumGrid);
      assert.ok(current.seconds >= RULES.minimumSeconds);
    }
  });
});

test('harder difficulty gives PRISM more speed and less retreat at the same level', () => {
  const difficulties = Object.keys(DIFFICULTIES);
  for (let level = 1; level <= 12; level++) {
    const configs = difficulties.map((difficulty) => difficultyFor(difficulty, level));
    configs.slice(1).forEach((current, index) => {
      assert.ok(current.prismSpeed > configs[index].prismSpeed);
      assert.ok(current.prismRelief < configs[index].prismRelief);
      assert.ok(current.seconds <= configs[index].seconds);
    });
  }
});

test('the same one-second response concedes more ground at level ten than level one', () => {
  Object.keys(DIFFICULTIES).forEach((difficulty) => {
    const progress = [1, 10].map((level) => {
      const prism = new Prism();
      prism.progress = 30;
      prism.advance(1, difficulty, level, 50);
      prism.retreat(difficulty, level);
      return prism.progress;
    });
    assert.ok(progress[1] > progress[0]);
  });
});

test('educational recovery preserves the current level pressure', () => {
  const game = new GameEngine({ difficulty: 'hard' });
  game.player.level = 10;
  game.startQuiz();
  game.answerQuiz(game.quiz.question.answer);
  game.tick(RULES.feedbackSeconds);
  assert.equal(game.player.level, 10);
  assert.equal(game.timer.duration, difficultyFor('hard', 10).seconds);
  game.tick(1);
  assert.equal(game.prism.progress, RULES.recoveryPrism + difficultyFor('hard', 10).prismSpeed);
});
