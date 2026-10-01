import { QUESTIONS } from '../data/questions.js';
import { pick } from '../utils/random.js';
import { RULES } from '../utils/constants.js';
import { Timer } from '../core/timer.js';
export class Quiz {
  constructor(random) {
    this.question = pick(QUESTIONS, random);
    this.timer = new Timer(RULES.quizSeconds);
    this.selected = null;
  }
  answer(index) {
    this.selected = index;
    return index === this.question.answer;
  }
}
