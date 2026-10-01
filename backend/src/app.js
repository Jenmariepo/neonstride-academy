import express from 'express';
import { resolve } from 'node:path';
import { PlayerRepository } from './repositories/player-repository.js';
import { GameRepository } from './repositories/game-repository.js';
import { PlayerService } from './services/player-service.js';
import { GameService } from './services/game-service.js';
import { playerController } from './controllers/player-controller.js';
import { gameController } from './controllers/game-controller.js';
import { apiRoutes } from './routes/api-routes.js';
import { explicitCors, readToken, securityHeaders } from './middlewares/security.js';
import { notFound, handleError } from './middlewares/errors.js';
import { PROJECT_ROOT } from './config/environment.js';
import { LIMITS } from './config/constants.js';
export function createApp(database, origins) {
  const app = express();
  const players = new PlayerService(new PlayerRepository(database));
  const games = new GameService(new GameRepository(database), players);
  app.disable('x-powered-by');
  app.use(securityHeaders, explicitCors(origins), express.json({ limit: LIMITS.body }), readToken);
  app.use('/api', apiRoutes(playerController(players), gameController(games)));
  app.use(express.static(resolve(PROJECT_ROOT, 'frontend')));
  app.use(notFound, handleError);
  return app;
}
