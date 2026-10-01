import { byId, element, text } from '../ui/dom.js';
export function renderAchievements(achievements) {
  byId('achievement-list').replaceChildren(
    ...achievements.map((item) => {
      const card = element('article', `panel achievement ${item.unlocked ? '' : 'locked'}`);
      card.append(
        element('span', 'achievement-icon', item.icon),
        element('h3', '', item.name),
        element('p', 'muted', item.description),
        element('small', 'accent', item.unlocked ? 'DESBLOQUEADO' : 'BLOQUEADO'),
      );
      return card;
    }),
  );
  text(
    'achievement-status',
    `${achievements.filter((item) => item.unlocked).length} / ${achievements.length} desbloqueados · Calculados con partidas guardadas`,
  );
}
