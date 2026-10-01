import { savePlayer, getStatistics } from '../services/player-service.js';
import { saveGame } from '../services/game-service.js';
import { readStored, writeStored } from '../services/storage.js';
import { validateProfile } from '../utils/validators.js';
import { byId, text } from './dom.js';
import { renderMenu } from '../states/menu-state.js';

export class PersistenceController {
  constructor(app) {
    this.app = app;
    this.pending = readStored('pending', null);
    this.saving = false;
  }
  async saveProfile() {
    const profile = this.app.profileView.read();
    const error = validateProfile(profile);
    if (error) return text('profile-error', error);
    byId('save-profile').disabled = true;
    try {
      const saved = await savePlayer(profile, this.app.profile);
      this.app.profile = { ...this.app.profile, ...saved };
      if (!writeStored('profile', this.app.profile))
        this.app.effects.toast('Perfil activo; el navegador no permite conservar la sesión.');
      this.app.profileView.close();
      await this.refreshSafely();
    } catch (failure) {
      text('profile-error', `No se pudo guardar: ${failure.message}`);
    } finally {
      byId('save-profile').disabled = false;
    }
  }
  async refresh() {
    renderMenu(this.app.profile, this.app.statistics);
    if (!this.app.profile?.id) return;
    this.app.statistics = await getStatistics(this.app.profile.id);
    renderMenu(this.app.profile, this.app.statistics);
  }
  async refreshSafely() {
    try {
      await this.refresh();
    } catch {
      this.app.effects.toast('Datos guardados; no se pudieron actualizar los récords.');
    }
  }
  async submit(result) {
    const item = { ...result, submission_id: crypto.randomUUID() };
    this.pending = { game: item, session: { ...this.app.profile } };
    const stored = writeStored('pending', this.pending);
    if (!stored) this.app.effects.toast('El envío pendiente solo se conservará en esta pestaña.');
    await this.retry();
  }
  async retry() {
    if (!this.pending || this.saving) return;
    this.saving = true;
    byId('retry-save').disabled = true;
    try {
      await saveGame(this.pending.game, this.pending.session);
      this.pending = null;
      writeStored('pending', null);
      text('save-status', 'Partida guardada en la base de datos.');
      this.app.effects.toast('Partida sincronizada.');
      await this.refreshSafely();
    } catch (error) {
      text('save-status', `Envío pendiente: ${error.message}`);
      this.app.effects.toast(
        'No se pudo sincronizar. Puedes reintentar desde resultados o el menú.',
      );
    } finally {
      this.saving = false;
      byId('retry-save').disabled = false;
      byId('retry-save').hidden = !this.pending;
      byId('pending-notice').hidden = !this.pending;
    }
  }
}
