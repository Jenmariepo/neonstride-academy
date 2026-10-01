import { THEMES } from '../utils/constants.js';
import { renderSettings } from '../states/settings-state.js';
export function createActions(app) {
  return {
    play: () => app.navigation.select(false),
    practice: () => app.navigation.select(true),
    start: () => app.start(),
    cell: (value) => app.engine?.select(Number(value)),
    answer: (value) => app.engine?.answerQuiz(Number(value)),
    hint: () => app.engine?.hint(),
    pause: () => app.pause(),
    'auto-pause': () => app.pause(true),
    finish: () => app.finish(),
    menu: () => app.screens.show('menu'),
    records: () => app.navigation.records(),
    achievements: () => app.navigation.achievements(),
    settings: () => app.screens.show('settings'),
    help: () => app.screens.show('help'),
    profile: () => {
      app.pause(true);
      app.profileView.open(app.profile);
    },
    avatar: (value) => app.profileView.select(value),
    'save-profile': () => app.persistence.saveProfile(),
    'cancel-profile': () => app.profileView.close(),
    'retry-save': () => app.persistence.retry(),
    copy: () => copyResult(app),
    sound: () => changeSetting(app, { key: 'sound', value: !app.settings.values.sound }),
    theme: () => cycleTheme(app),
    setting: (value) => changeSetting(app, value),
    reset: () => {
      app.settings.reset();
      renderSettings(app.settings.values);
    },
  };
}
function changeSetting(app, { key, value }) {
  app.settings.set(key, value);
  renderSettings(app.settings.values);
}
function cycleTheme(app) {
  const themes = Object.keys(THEMES);
  const next = (themes.indexOf(app.settings.values.theme) + 1) % themes.length;
  changeSetting(app, { key: 'theme', value: themes[next] });
}
async function copyResult(app) {
  const result = app.engine?.result();
  if (!result) return;
  try {
    await navigator.clipboard.writeText(
      `${app.profile.name} · NEONSTRIDE · ${result.score} puntos · ${result.accuracy}% precisión`,
    );
    app.effects.toast('Resultado copiado.');
  } catch {
    app.effects.toast('Tu navegador no permite copiar el resultado.');
  }
}
