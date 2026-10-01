import { validatePlayer } from '../models/validation.js';
import { createToken, hashToken } from '../utils/tokens.js';
import { ApiError } from '../utils/api-error.js';
import { HTTP, LIMITS } from '../config/constants.js';
export class PlayerService {
  constructor(repository) {
    this.repository = repository;
  }
  list() {
    return this.repository.list(LIMITS.page);
  }
  find(id) {
    const player = this.repository.find(id);
    if (!player) throw new ApiError(HTTP.notFound, 'No se encontró el jugador.');
    return player;
  }
  authorize(id, token) {
    this.find(id);
    if (!token || !this.repository.authorized(id, hashToken(token)))
      throw new ApiError(HTTP.unauthorized, 'La sesión de este perfil no es válida.');
  }
  create(body) {
    const profile = validatePlayer(body);
    const token = createToken();
    return { ...this.repository.create(profile, hashToken(token)), token };
  }
  update(id, body, token) {
    this.authorize(id, token);
    return this.repository.update(id, validatePlayer(body));
  }
}
