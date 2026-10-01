import { request } from './api-client.js';
export function savePlayer(profile, session) {
  return request(session?.id ? `/players/${session.id}` : '/players', {
    method: session?.id ? 'PUT' : 'POST',
    body: profile,
    token: session?.token,
  });
}
export function getStatistics(id) {
  return request(`/players/${id}/statistics`);
}
