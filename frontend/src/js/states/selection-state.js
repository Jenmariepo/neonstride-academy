import { MODES, DIFFICULTIES } from '../utils/constants.js';
import { byId, options, text } from '../ui/dom.js';
export function setupSelection() {
  options('mode', MODES);
  options(
    'difficulty',
    Object.fromEntries(
      Object.entries(DIFFICULTIES).map(([key, value]) => [
        key,
        `${value.label} · ${value.seconds} s`,
      ]),
    ),
  );
}
export function renderSelection(practice) {
  text('selection-title', practice ? 'Entrena tu mirada' : 'Prepara tu misión');
  text(
    'selection-note',
    practice
      ? 'Sin cronómetro ni PRISM. Pistas ilimitadas. No genera récords ni logros.'
      : 'Llega al 100 % antes que PRISM. Cada nivel acelera al rival, reduce el tiempo y disminuye cuánto lo frenas. Tienes 3 vidas, 3 pistas y 2 oportunidades educativas.',
  );
}
export function readSelection(practice) {
  return { mode: byId('mode').value, difficulty: byId('difficulty').value, practice };
}
