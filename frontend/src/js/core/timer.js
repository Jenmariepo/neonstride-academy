export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.remaining = duration;
  }
  tick(seconds) {
    this.remaining = Math.max(0, this.remaining - seconds);
  }
  get expired() {
    return this.remaining <= 0;
  }
}
