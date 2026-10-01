import { THEMES } from '../utils/constants.js';
import { readStored, writeStored } from '../services/storage.js';
export const DEFAULT_SETTINGS = { theme: 'blue', sound: true, animations: true, confetti: true };
export class Settings {
  constructor() {
    this.values = { ...DEFAULT_SETTINGS };
    const stored = readStored('settings', {});
    Object.keys(DEFAULT_SETTINGS).forEach((key) =>
      this.set(key, stored?.[key] ?? DEFAULT_SETTINGS[key]),
    );
  }
  set(key, value) {
    if (!Object.hasOwn(DEFAULT_SETTINGS, key)) return;
    if (key === 'theme' ? !Object.hasOwn(THEMES, value) : typeof value !== 'boolean') return;
    this.values[key] = value;
    writeStored('settings', this.values);
  }
  reset() {
    this.values = { ...DEFAULT_SETTINGS };
    writeStored('settings', this.values);
  }
}
