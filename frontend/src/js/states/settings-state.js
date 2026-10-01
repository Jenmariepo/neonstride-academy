import { THEMES } from '../utils/constants.js';
import { options, byId, text } from '../ui/dom.js';
export function setupSettings() {
  options('theme', THEMES);
}
export function renderSettings(settings) {
  document.body.dataset.theme = settings.theme;
  document.body.classList.toggle('no-animation', !settings.animations);
  byId('theme').value = settings.theme;
  ['sound', 'animations', 'confetti'].forEach((key) => {
    byId(key).checked = settings[key];
  });
  text('sound-button', settings.sound ? '🔊' : '🔇');
  byId('sound-button').setAttribute('aria-pressed', String(settings.sound));
}
