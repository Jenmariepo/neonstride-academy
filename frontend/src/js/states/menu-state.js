import { text } from '../ui/dom.js';
export function renderMenu(profile, statistics) {
  text('greeting', profile?.name ? `Hola, ${profile.name}.` : '¿Tienes buena vista?');
  text('profile-button', profile?.avatar || '🧑‍🚀');
  text('menu-profile', profile?.name ? `${profile.avatar} ${profile.name}` : 'Crea tu piloto');
  text('menu-best', statistics?.stats.score ?? '—');
  text('menu-streak', statistics?.stats.streak ?? '—');
  text(
    'menu-achievements',
    statistics
      ? `${statistics.achievements.filter((item) => item.unlocked).length}/14 desbloqueados`
      : '14 desafíos para ti',
  );
}
