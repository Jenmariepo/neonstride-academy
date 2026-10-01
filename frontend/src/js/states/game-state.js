import { BoardView } from '../ui/board-view.js';
import { QuizView } from '../ui/quiz-view.js';
import { byId, text } from '../ui/dom.js';
import { MODES, DIFFICULTIES, RULES } from '../utils/constants.js';
const MESSAGES = {
  correct: '¡Perfecto! Sigue así.',
  wrong: 'No era ese. Observa la respuesta resaltada.',
  timeout: 'Tiempo agotado. Observa la respuesta.',
  level: '¡Subiste de nivel!',
};
export class GameState {
  constructor(effects) {
    this.board = new BoardView();
    this.quiz = new QuizView();
    this.effects = effects;
    this.feedbackId = 0;
  }
  render(state, profile) {
    this.renderMetrics(state, profile);
    this.board.render(state);
    this.quiz.render(state);
    if (state.feedbackId === this.feedbackId) return;
    this.feedbackId = state.feedbackId;
    this.effects.sound(state.feedback);
    if (['level', 'correct'].includes(state.feedback)) this.effects.celebrate();
    byId('level-banner').classList.toggle('visible', state.feedback === 'level');
    text('level-banner', `¡NIVEL ${state.level}!`);
  }
  renderMetrics(state, profile) {
    const player = state.player;
    ['score', 'streak', 'level'].forEach((key) => text(`hud-${key}`, player[key]));
    text('hud-lives', state.practice ? '∞' : '♥'.repeat(Math.max(0, player.lives)) || '0');
    text('hud-accuracy', `${state.accuracy}%`);
    text('hud-round', state.round);
    text('hud-time', state.practice ? '∞' : Math.ceil(state.remaining));
    text('hint-count', state.practice ? '∞' : player.hints);
    text('game-profile', `${profile.avatar} ${profile.name}`);
    text(
      'game-mode',
      `${MODES[state.mode]} · ${state.practice ? 'Práctica' : DIFFICULTIES[state.difficulty].label}`,
    );
    text('board-instruction', `Encuentra el diferente · ${state.board.size} × ${state.board.size}`);
    text('game-feedback', MESSAGES[state.feedback] || 'Solo uno no coincide con los demás.');
    byId('timer-progress').value = state.practice
      ? RULES.raceFinish
      : (state.remaining / state.duration) * RULES.raceFinish;
    byId('player-progress').value = player.progress;
    byId('prism-progress').value = state.prism;
    text('prism-status', this.prismStatus(state));
    byId('hint-button').disabled =
      state.phase !== 'round' || state.hintLeft > 0 || (!state.practice && !player.hints);
    byId('level-banner').classList.toggle(
      'visible',
      state.feedback === 'level' && state.phase === 'feedback',
    );
  }
  prismStatus(state) {
    if (state.practice) return 'PRISM DESCANSA';
    if (state.prism >= RULES.prismUrgent) return '¡PRISM CASI LLEGA!';
    return state.prism >= RULES.prismNear ? 'PRISM SE ACERCA' : 'PRISM DETRÁS';
  }
}
