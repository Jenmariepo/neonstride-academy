import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LIMITS } from './constants.js';
export const PROJECT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));
export const environment = {
  port: Number(process.env.PORT || LIMITS.port),
  databasePath: resolve(PROJECT_ROOT, process.env.DB_PATH || 'backend/data/neonstride.sqlite'),
  origins: (process.env.CLIENT_URL || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((value) => value.trim()),
};
