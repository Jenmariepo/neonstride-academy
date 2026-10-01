import cors from 'cors';
import { ApiError } from '../utils/api-error.js';
import { HTTP } from '../config/constants.js';
export function explicitCors(origins) {
  return cors({
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) return callback(null, true);
      callback(new ApiError(HTTP.badRequest, 'Origen no permitido.'));
    },
  });
}
export function readToken(request, _response, next) {
  request.token = request.get('Authorization')?.replace(/^Bearer /, '') || '';
  next();
}
export function securityHeaders(_request, response, next) {
  response.set('X-Content-Type-Options', 'nosniff');
  response.set('Referrer-Policy', 'same-origin');
  next();
}
