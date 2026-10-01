import { Player } from '../entities/player.js';
import { Prism } from '../entities/prism.js';
import { Timer } from './timer.js';
import { Quiz } from '../modules/quiz.js';
import { createBoard } from '../modules/board.js';
import { difficultyFor } from '../modules/difficulty.js';
import { accuracyFor } from '../modules/scoring.js';
import { RULES } from '../utils/constants.js';

export class GameEngine {
  constructor(options, random = Math.random) {
    this.options = { mode: 'letters', difficulty: 'easy', practice: false, ...options };
    this.random = random;
    this.player = new Player();
    this.prism = new Prism();
    Object.assign(this, {
      phase: 'round',
      round: 0,
      recoveries: 0,
      paused: false,
      hintLeft: 0,
      selected: null,
      feedback: '',
      feedbackId: 0,
      outcome: null,
    });
    this.nextRound();
  }
  nextRound() {
    const config = difficultyFor(this.options.difficulty, this.player.level);
    this.board = createBoard(this.options.mode, config.size, this.random);
    this.timer = new Timer(config.seconds);
    this.round++;
    this.phase = 'round';
    this.hintLeft = 0;
    this.selected = null;
    this.feedback = '';
  }
  tick(seconds) {
    if (this.paused || this.phase === 'ended' || seconds <= 0) return;
    this.hintLeft = Math.max(0, this.hintLeft - seconds);
    if (this.phase.endsWith('feedback')) return this.tickFeedback(seconds);
    if (this.phase === 'quiz') return this.tickQuiz(seconds);
    if (this.options.practice) return;
    this.tickRace(seconds);
  }
  tickRace(seconds) {
    this.timer.tick(seconds);
    this.prism.advance(seconds, this.options.difficulty, this.player.level, this.player.progress);
    if (this.prism.progress >= RULES.raceFinish) return this.startQuiz();
    if (this.timer.expired) this.fail('timeout');
  }
  select(index) {
    if (this.paused || this.phase !== 'round' || !Number.isInteger(index)) return;
    if (index < 0 || index >= this.board.cells.length) return;
    this.selected = index;
    if (index !== this.board.targetIndex) return this.fail('wrong');
    const oldLevel = this.player.level;
    this.player.hit(this.timer.remaining, this.timer.duration, this.options.practice);
    this.prism.retreat(this.options.difficulty, oldLevel);
    this.setFeedback(oldLevel < this.player.level ? 'level' : 'correct');
  }
  fail(reason) {
    this.player.miss(reason, this.options.practice);
    this.setFeedback(reason);
  }
  setFeedback(message, phase = 'feedback') {
    this.feedback = message;
    this.feedbackId++;
    this.phase = phase;
    this.feedbackTimer = new Timer(RULES.feedbackSeconds);
  }
  tickFeedback(seconds) {
    this.feedbackTimer.tick(seconds);
    if (!this.feedbackTimer.expired) return;
    if (this.phase === 'quiz-feedback') return this.resolveQuiz();
    if (!this.options.practice && this.player.progress >= RULES.raceFinish)
      return this.finish('won');
    if (!this.options.practice && this.player.lives <= 0) return this.startQuiz();
    this.nextRound();
  }
  hint() {
    if (this.paused || this.phase !== 'round' || this.hintLeft > 0) return;
    if (!this.options.practice && this.player.hints <= 0) return;
    this.player.hint(this.options.practice);
    this.hintLeft = RULES.hintSeconds;
  }
  startQuiz() {
    if (this.recoveries >= RULES.recoveryAttempts) return this.finish('lost');
    this.recoveries++;
    this.quiz = new Quiz(this.random);
    this.phase = 'quiz';
    this.hintLeft = 0;
  }
  tickQuiz(seconds) {
    this.quiz.timer.tick(seconds);
    if (this.quiz.timer.expired) this.answerQuiz(-1);
  }
  answerQuiz(index) {
    if (this.paused || this.phase !== 'quiz') return;
    this.quizCorrect = this.quiz.answer(index);
    this.setFeedback(this.quizCorrect ? 'correct' : 'wrong', 'quiz-feedback');
  }
  resolveQuiz() {
    if (this.quizCorrect) {
      this.player.lives = Math.max(RULES.recoveryLives, this.player.lives);
      this.player.streak = 0;
      this.prism.progress = RULES.recoveryPrism;
      return this.nextRound();
    }
    this.startQuiz();
  }
  togglePause() {
    if (this.phase !== 'ended') this.paused = !this.paused;
  }
  finish(outcome = 'abandoned') {
    this.outcome = outcome;
    this.phase = 'ended';
    this.paused = false;
  }
  result() {
    const player = this.player;
    return {
      ...this.options,
      score: player.score,
      level: player.level,
      rounds: player.hits + player.misses,
      hits: player.hits,
      misses: player.misses,
      best_streak: player.bestStreak,
      accuracy: accuracyFor(player.hits, player.misses),
      outcome: this.outcome,
    };
  }
  snapshot() {
    return {
      ...this.result(),
      player: { ...this.player },
      prism: this.prism.progress,
      phase: this.phase,
      paused: this.paused,
      board: this.board,
      round: this.round,
      remaining: this.timer.remaining,
      duration: this.timer.duration,
      selected: this.selected,
      hintLeft: this.hintLeft,
      feedback: this.feedback,
      feedbackId: this.feedbackId,
      quiz: this.quiz,
      recoveries: this.recoveries,
    };
  }
}
