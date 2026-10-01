import { respond } from '../utils/response.js';
import { validateId } from '../models/validation.js';
import { HTTP } from '../config/constants.js';
export function playerController(service) {
  return {
    list: (_request, response) => respond(response, service.list()),
    create: (request, response) => respond(response, service.create(request.body), HTTP.created),
    update: (request, response) =>
      respond(response, service.update(validateId(request.params.id), request.body, request.token)),
  };
}
