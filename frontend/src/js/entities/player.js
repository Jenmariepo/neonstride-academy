import { RULES } from '../utils/constants.js';
import { hitPoints, penalize } from '../modules/scoring.js';
import { levelFor } from '../modules/difficulty.js';
export class Player {
  constructor() {
    Object.assign(this, {
      score: 0,
      lives: RULES.initialLives,
      hints: RULES.initialHints,
      hits: 0,
      misses: 0,
      streak: 0,
      bestStreak: 0,
      level: RULES.initialLevel,
      progress: 0,
    });
  }
  hit(remaining, duration, practice) {
    this.hits++;
    this.streak++;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    if (!practice) this.score += hitPoints(remaining, duration, this.streak);
    this.level = levelFor(this.hits);
    this.progress = Math.min(RULES.raceFinish, this.progress + RULES.progressPerHit);
  }
  miss(reason, practice) {
    this.misses++;
    this.streak = 0;
    if (practice) return;
    this.lives--;
    this.score = penalize(this.score, reason);
  }
  hint(practice) {
    if (!practice) {
      this.hints--;
      this.score = penalize(this.score, 'hint');
    }
  }
}
