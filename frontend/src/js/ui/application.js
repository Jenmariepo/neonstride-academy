import { GameEngine } from '../core/game-engine.js';
import { GameLoop } from '../core/game-loop.js';
import { InputManager } from '../input/input-manager.js';
import { Settings } from '../modules/settings.js';
import { readStored } from '../services/storage.js';
import { validateProfile } from '../utils/validators.js';
import { Screens } from './screens.js';
import { Effects } from './effects.js';
import { ProfileView } from './profile-view.js';
import { PersistenceController } from './persistence-controller.js';
import { NavigationController } from './navigation-controller.js';
import { createActions } from './actions.js';
import { setupSelection, readSelection } from '../states/selection-state.js';
import { setupSettings, renderSettings } from '../states/settings-state.js';
import { setupRecords } from '../states/records-state.js';
import { renderHelp } from '../states/help-state.js';
import { GameState } from '../states/game-state.js';
import { renderPause } from '../states/pause-state.js';
import { renderResult } from '../states/result-state.js';
import { closeDialog } from './dialogs.js';
import { byId } from './dom.js';

export class Application {
  constructor() {
    this.settings = new Settings();
    this.effects = new Effects(this.settings);
    this.screens = new Screens();
    this.profileView = new ProfileView();
    const stored = readStored('profile', null);
    this.profile = stored && !validateProfile(stored) && stored.id && stored.token ? stored : null;
    this.statistics = null;
    this.persistence = new PersistenceController(this);
    this.navigation = new NavigationController(this);
    this.loop = new GameLoop((seconds) => this.update(seconds));
    this.actions = createActions(this);
    this.input = new InputManager((action, value) => this.dispatch(action, value));
  }
  async initialize() {
    setupSelection();
    setupSettings();
    setupRecords();
    renderHelp();
    renderSettings(this.settings.values);
    this.input.bind();
    byId('pending-notice').hidden = !this.persistence.pending;
    this.screens.show('menu');
    if (!this.profile) this.profileView.open(null);
    try {
      await this.persistence.refresh();
    } catch {
      this.effects.toast('Servidor no disponible. Los récords no se pueden consultar.');
    }
  }
  dispatch(action, value) {
    Promise.resolve(this.actions[action]?.(value)).catch((error) =>
      this.effects.toast(error.message),
    );
  }
  start() {
    if (!this.profile?.id || this.persistence.pending) return;
    this.engine = new GameEngine(readSelection(this.practice));
    this.gameView = new GameState(this.effects);
    this.screens.show('game');
    this.loop.start();
  }
  update(seconds) {
    this.engine.tick(seconds);
    const state = this.engine.snapshot();
    if (state.phase === 'ended') return this.showResult();
    this.gameView.render(state, this.profile);
  }
  pause(automatic = false) {
    if (!this.engine || this.screens.current !== 'game' || byId('profile-dialog').open) return;
    if (automatic && this.engine.paused) return;
    this.engine.togglePause();
    this.gameView.render(this.engine.snapshot(), this.profile);
    renderPause(this.engine.paused);
  }
  finish() {
    if (!this.engine || this.screens.current !== 'game') return;
    this.engine.finish();
    this.showResult();
  }
  showResult() {
    this.loop.stop();
    closeDialog('quiz-dialog');
    closeDialog('pause-dialog');
    const result = this.engine.result();
    renderResult(result, this.profile);
    this.screens.show('result');
    if (result.outcome === 'won') this.effects.celebrate();
    this.persistence.submit(result);
  }
}
