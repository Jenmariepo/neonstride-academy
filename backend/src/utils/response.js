import { HTTP } from '../config/constants.js';
export function respond(response, data, status = HTTP.ok, message = 'Operación completada.') {
  response.status(status).json({ success: true, data, message });
}
