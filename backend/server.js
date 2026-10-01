import { createApp } from './src/app.js';
import { environment } from './src/config/environment.js';
import { openDatabase } from './src/config/database.js';
const database = openDatabase(environment.databasePath);
const server = createApp(database, environment.origins).listen(environment.port);
function shutdown() {
  server.close(() => {
    database.close();
  });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
