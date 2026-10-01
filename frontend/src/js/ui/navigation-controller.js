import { getLeaderboard } from '../services/leaderboard-service.js';
import { renderRecords } from '../states/records-state.js';
import { renderAchievements } from '../states/achievements-state.js';
import { renderSelection } from '../states/selection-state.js';
import { text, byId } from './dom.js';
export class NavigationController {
  constructor(app) {
    this.app = app;
    this.requestId = 0;
  }
  select(practice) {
    if (!this.app.profile?.id) return this.app.profileView.open(null);
    if (this.app.persistence.pending)
      return this.app.effects.toast('Sincroniza la partida pendiente antes de comenzar otra.');
    this.app.practice = practice;
    renderSelection(practice);
    this.app.screens.show('selection');
  }
  async records() {
    this.app.screens.show('records');
    const requestId = ++this.requestId;
    text('records-status', 'Consultando la base de datos…');
    try {
      const [leaderboard] = await Promise.all([
        getLeaderboard(byId('filter-mode').value, byId('filter-difficulty').value),
        this.app.persistence.refresh(),
      ]);
      if (requestId !== this.requestId) return;
      renderRecords(this.app.statistics, leaderboard);
    } catch (error) {
      text('records-status', `No se pudieron cargar los récords: ${error.message}`);
    }
  }
  async achievements() {
    this.app.screens.show('achievements');
    text('achievement-status', 'Consultando logros…');
    try {
      await this.app.persistence.refresh();
      renderAchievements(this.app.statistics.achievements);
    } catch (error) {
      text('achievement-status', `No se pudieron cargar: ${error.message}`);
    }
  }
}
