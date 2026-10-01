import { respond } from '../utils/response.js';
import { validateId } from '../models/validation.js';
import { HTTP } from '../config/constants.js';
export function gameController(service) {
  return {
    list: (_request, response) => respond(response, service.list()),
    playerGames: (request, response) =>
      respond(response, service.list(validateId(request.params.id))),
    create: (request, response) =>
      respond(response, service.create(request.body, request.token), HTTP.created),
    leaderboard: (request, response) => respond(response, service.leaderboard(request.query)),
    statistics: (request, response) =>
      respond(response, service.statistics(validateId(request.params.id))),
  };
}
