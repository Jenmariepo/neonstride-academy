import { RULES } from '../utils/constants.js';
export class GameLoop {
  constructor(update) {
    this.update = update;
    this.frameId = null;
    this.previous = null;
  }
  start() {
    this.stop();
    this.frameId = requestAnimationFrame((time) => this.frame(time));
  }
  frame(time) {
    const seconds =
      this.previous === null ? 0 : (time - this.previous) / RULES.millisecondsPerSecond;
    this.previous = time;
    this.update(seconds);
    if (this.frameId !== null) this.frameId = requestAnimationFrame((next) => this.frame(next));
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.previous = null;
  }
}
