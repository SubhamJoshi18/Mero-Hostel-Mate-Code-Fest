import express, { Application } from 'express';
import { getEnv } from './utils/getEnv';
import { createLogger } from './logger/logger';
import { serverMiddleware } from './middleware/serverMiddleware';
import { mainRouter } from './routes/server.route';
import DatabaseDataSource from '../src/database/connect';
import { DataSource } from 'typeorm';
import { corsConfig } from './config/corsConfig';
import cors from 'cors';
import { mapSeeder } from './scripts/mapSeeder';

const logger = createLogger('user-microservice');
const port = getEnv('PORT');
const app = express();

app.use(cors(corsConfig));
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await DatabaseDataSource.initialize()
    .then((db: DataSource) => {
      logger.info(`Initialized '${db.options.database}' database successfully`);
    })
    .catch((err: Error) => {
      logger.error(
        'Error while intializing database inside expressAppIntializer. Error: ' +
          err
      );
      process.exit(0);
    });
})();

serverMiddleware(app as Application);
mainRouter(app as Application);

app.listen(port, () => {
  const message = `Server running at port ${port}`;
  console.log(message);
  logger.info(message);
});
