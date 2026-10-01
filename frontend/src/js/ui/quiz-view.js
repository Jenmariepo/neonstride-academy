import { byId, element, text } from './dom.js';
import { showDialog, closeDialog } from './dialogs.js';
import { RULES } from '../utils/constants.js';
export class QuizView {
  render(state) {
    if (!state.phase.startsWith('quiz') || state.paused) return closeDialog('quiz-dialog');
    const quiz = state.quiz;
    if (this.question !== quiz) this.create(quiz);
    text('quiz-time', Math.ceil(quiz.timer.remaining));
    text('quiz-attempt', `Oportunidad ${state.recoveries} de ${RULES.recoveryAttempts}`);
    const answered = state.phase === 'quiz-feedback';
    [...byId('quiz-options').children].forEach((button, index) => {
      button.disabled = answered;
      button.classList.toggle('correct', answered && index === quiz.question.answer);
      button.classList.toggle(
        'wrong',
        answered && index === quiz.selected && index !== quiz.question.answer,
      );
    });
    text(
      'quiz-feedback',
      answered
        ? state.feedback === 'correct'
          ? '¡Correcto! Recuperas la carrera.'
          : 'Respuesta incorrecta. Se consume esta oportunidad.'
        : 'Elige una respuesta antes de que termine el tiempo.',
    );
    showDialog('quiz-dialog');
  }
  create(quiz) {
    this.question = quiz;
    text('quiz-category', quiz.question.category);
    text('quiz-question', quiz.question.text);
    byId('quiz-options').replaceChildren(
      ...quiz.question.options.map((answer, index) => {
        const button = element('button', 'answer', answer);
        button.dataset.action = 'answer';
        button.dataset.value = index;
        return button;
      }),
    );
  }
}
