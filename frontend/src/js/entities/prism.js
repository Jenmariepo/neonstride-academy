import { RULES } from '../utils/constants.js';
import { difficultyFor } from '../modules/difficulty.js';
export class Prism {
  constructor() {
    this.progress = 0;
  }
  advance(seconds, difficulty, level, playerProgress) {
    const config = difficultyFor(difficulty, level);
    const raceFactor = 1 + (playerProgress / RULES.raceFinish) * RULES.prismProgressFactor;
    const speed = config.prismSpeed * raceFactor;
    this.progress = Math.min(RULES.raceFinish, this.progress + seconds * speed);
  }
  retreat(difficulty, level) {
    const config = difficultyFor(difficulty, level);
    this.progress = Math.max(0, this.progress - config.prismRelief);
  }
}
