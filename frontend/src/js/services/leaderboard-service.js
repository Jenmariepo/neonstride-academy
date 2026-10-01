import { request } from './api-client.js';
export function getLeaderboard(mode = '', difficulty = '') {
  return request(`/leaderboard?${new URLSearchParams({ mode, difficulty })}`);
}
