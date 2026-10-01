import { byId, element } from './dom.js';
export class BoardView {
  constructor() {
    this.round = null;
  }
  render(state) {
    if (this.round !== state.round) this.create(state);
    const reveal = state.phase === 'feedback';
    [...byId('board').children].forEach((button, index) => {
      button.disabled = state.phase !== 'round' || state.paused;
      button.classList.toggle('correct', reveal && index === state.board.targetIndex);
      button.classList.toggle(
        'wrong',
        reveal && index === state.selected && index !== state.board.targetIndex,
      );
      button.classList.toggle('hint', state.hintLeft > 0 && index === state.board.targetIndex);
    });
  }
  create(state) {
    this.round = state.round;
    byId('board').className = `board size-${state.board.size}`;
    byId('board').replaceChildren(
      ...state.board.cells.map((symbol, index) => {
        const button = element('button', 'cell', symbol);
        button.dataset.action = 'cell';
        button.dataset.value = index;
        button.setAttribute('aria-label', `Celda ${index + 1}: ${symbol}`);
        return button;
      }),
    );
  }
}
