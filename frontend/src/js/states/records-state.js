import { byId, text, metric, element, options } from '../ui/dom.js';
import { MODES, DIFFICULTIES } from '../utils/constants.js';
export function setupRecords() {
  options('filter-mode', { '': 'Todos los modos', ...MODES });
  options('filter-difficulty', {
    '': 'Todas las dificultades',
    ...Object.fromEntries(Object.entries(DIFFICULTIES).map(([key, value]) => [key, value.label])),
  });
}
export function renderRecords(statistics, leaderboard) {
  const labels = {
    ...MODES,
    ...Object.fromEntries(Object.entries(DIFFICULTIES).map(([key, value]) => [key, value.label])),
  };
  const cards = Object.entries(labels).map(([key, label]) =>
    metric(label, statistics.records[key]),
  );
  cards.push(
    metric('Mejor racha', statistics.stats.streak),
    metric('Partidas competitivas', statistics.stats.games),
  );
  byId('records-metrics').replaceChildren(...cards);
  byId('leaderboard').replaceChildren(
    ...leaderboard.map((entry, index) => {
      const row = element('li', 'leader-row');
      row.append(
        element('span', 'rank', `0${index + 1}`),
        element('span', '', entry.avatar),
        element('strong', '', entry.name),
        element('b', 'accent', entry.score),
      );
      return row;
    }),
  );
  text(
    'records-status',
    leaderboard.length
      ? 'TOP 5 · Mejor partida de cada piloto · Datos del servidor'
      : 'Aún no hay partidas competitivas.',
  );
}
