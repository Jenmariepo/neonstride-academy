import { ApiError } from '../utils/api-error.js';
import { HTTP } from '../config/constants.js';
export function notFound(_request, _response, next) {
  next(new ApiError(HTTP.notFound, 'Recurso no encontrado.'));
}
export function handleError(error, _request, response, _next) {
  let status = error instanceof ApiError ? error.status : HTTP.internal;
  let message = error instanceof ApiError ? error.message : 'Ocurrió un error interno.';
  if (error.type === 'entity.parse.failed') {
    status = HTTP.badRequest;
    message = 'JSON no válido.';
  }
  if (error.type === 'entity.too.large') {
    status = HTTP.tooLarge;
    message = 'Solicitud demasiado grande.';
  }
  response.status(status).json({ success: false, data: null, message });
}
