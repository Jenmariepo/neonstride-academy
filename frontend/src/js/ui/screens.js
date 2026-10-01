import { byId } from './dom.js';
export class Screens {
  constructor() {
    this.current = 'menu';
  }
  show(name) {
    this.current = name;
    document.querySelectorAll('[data-screen]').forEach((screen) => {
      screen.hidden = screen.dataset.screen !== name;
    });
    const heading = byId(name).querySelector('h2');
    heading?.focus({ preventScroll: true });
  }
}
