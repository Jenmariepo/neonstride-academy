import { Router } from 'express';
export function apiRoutes(players, games) {
  const router = Router();
  router.get('/players', players.list);
  router.post('/players', players.create);
  router.put('/players/:id', players.update);
  router.get('/players/:id/games', games.playerGames);
  router.get('/players/:id/statistics', games.statistics);
  router.get('/games', games.list);
  router.post('/games', games.create);
  router.get('/leaderboard', games.leaderboard);
  return router;
}
