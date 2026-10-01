const SHORTCUTS = { h: 'hint', p: 'pause', m: 'sound', Escape: 'pause' };
export class InputManager {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.abort = new AbortController();
  }
  bind() {
    const options = { signal: this.abort.signal };
    document.addEventListener('click', (event) => this.click(event), options);
    document.addEventListener('keydown', (event) => this.key(event), options);
    document.addEventListener('change', (event) => this.change(event), options);
    document.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        this.dispatch('save-profile');
      },
      options,
    );
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) this.dispatch('auto-pause');
      },
      options,
    );
    document
      .querySelectorAll('dialog')
      .forEach((dialog) =>
        dialog.addEventListener('cancel', (event) => event.preventDefault(), options),
      );
  }
  click(event) {
    const button = event.target.closest('button[data-action]');
    if (button && !button.disabled) this.dispatch(button.dataset.action, button.dataset.value);
  }
  key(event) {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.matches?.('input, select, textarea, [contenteditable]')) return;
    const action = SHORTCUTS[event.key.toLowerCase()] || SHORTCUTS[event.key];
    if (!action || (document.querySelector('dialog[open]') && action !== 'pause')) return;
    event.preventDefault();
    this.dispatch(action);
  }
  change(event) {
    const key = event.target.dataset.setting;
    if (key)
      this.dispatch('setting', {
        key,
        value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      });
    if (event.target.dataset.filter) this.dispatch('records');
  }
  destroy() {
    this.abort.abort();
  }
}
