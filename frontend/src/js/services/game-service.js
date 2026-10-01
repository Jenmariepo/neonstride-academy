import { request } from './api-client.js';
export function saveGame(game, session) {
  return request('/games', {
    method: 'POST',
    token: session.token,
    body: { ...game, player_id: session.id },
  });
}
