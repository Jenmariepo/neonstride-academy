import { byId, element } from '../ui/dom.js';
const HELP = [
  ['01 · Observa', 'Solo una celda es diferente. Selecciónala con ratón, toque o Tab y Enter.'],
  ['02 · Corre', 'Cada acierto avanza 3 % y frena a PRISM. Al llegar a 100 % ganas.'],
  ['03 · Puntúa', '100 puntos base + hasta 50 por velocidad + 10 por racha (máximo 150).'],
  [
    '04 · Cuida tus vidas',
    'Un error cuesta 25 puntos y una vida. Agotar el tiempo cuesta 40 y una vida.',
  ],
  [
    '05 · Usa pistas',
    'H resalta la respuesta durante 1,3 segundos. Cada pista cuesta 50 puntos. Tienes 3.',
  ],
  [
    '06 · Recupera',
    'Si PRISM llega o pierdes tus vidas, tienes hasta 2 preguntas por partida, de 12 segundos.',
  ],
  [
    '07 · Responde',
    'Acertar garantiza una vida y devuelve a PRISM al 35 %. Fallar consume la oportunidad.',
  ],
  [
    '08 · Progresa',
    'Subes cada 3 aciertos. En cada nivel PRISM acelera más y tus aciertos lo frenan menos. El tiempo baja hasta 4 s y el tablero crece hasta 8 × 8.',
  ],
  [
    '09 · Entrena',
    'Práctica tiene tiempo, vidas y pistas ilimitados. No suma puntos ni logros competitivos.',
  ],
  [
    '10 · Controla',
    'P pausa y reanuda; M cambia el sonido. Cambiar de pestaña pausa también las preguntas.',
  ],
];
export function renderHelp() {
  byId('help-cards').replaceChildren(
    ...HELP.map(([title, description]) => {
      const card = element('article', 'panel');
      card.append(element('h3', '', title), element('p', 'muted', description));
      return card;
    }),
  );
}
