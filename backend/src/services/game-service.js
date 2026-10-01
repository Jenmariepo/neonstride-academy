import { validateGame, validateId, validateFilters } from '../models/validation.js';
import { HTTP, LIMITS } from '../config/constants.js';
import { ApiError } from '../utils/api-error.js';
import { summarizeGames } from './statistics-service.js';
export class GameService {
  constructor(repository, players) {
    this.repository = repository;
    this.players = players;
  }
  list(playerId = null) {
    if (playerId !== null) this.players.find(playerId);
    return this.repository.list(LIMITS.page, playerId);
  }
  create(body, token) {
    const game = validateGame(body);
    game.player_id = validateId(body.player_id);
    this.players.authorize(game.player_id, token);
    const existing = this.repository.findSubmission(game.submission_id);
    if (existing && existing.player_id !== game.player_id)
      throw new ApiError(HTTP.conflict, 'El identificador de envío ya existe.');
    return existing || this.repository.create(game);
  }
  leaderboard(query) {
    return this.repository.leaderboard(validateFilters(query), LIMITS.top);
  }
  statistics(playerId) {
    this.players.find(playerId);
    return summarizeGames(this.repository.history(playerId));
  }
}
