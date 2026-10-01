import { UI } from '../utils/constants.js';
import { byId, text, element } from './dom.js';
export class Effects {
  constructor(settings) {
    this.settings = settings;
    this.context = null;
  }
  toast(message) {
    text('toast', message);
    byId('toast').classList.add('visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(
      () => byId('toast').classList.remove('visible'),
      UI.toastMilliseconds,
    );
  }
  sound(type) {
    if (!this.settings.values.sound || !window.AudioContext) return;
    this.context ??= new AudioContext();
    this.context.resume().catch(() => {});
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.frequency.value = UI.frequencies[type] || UI.frequencies.correct;
    gain.gain.setValueAtTime(UI.audioVolume, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      UI.audioFloor,
      this.context.currentTime + UI.audioSeconds,
    );
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.start();
    oscillator.stop(this.context.currentTime + UI.audioSeconds);
  }
  celebrate() {
    if (!this.settings.values.confetti || !this.settings.values.animations) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const pieces = Array.from({ length: UI.confettiCount }, () =>
      element('i', 'confetti-piece', '✦'),
    );
    byId('confetti').replaceChildren(...pieces);
    clearTimeout(this.confettiTimer);
    this.confettiTimer = setTimeout(
      () => byId('confetti').replaceChildren(),
      UI.effectMilliseconds,
    );
  }
}
