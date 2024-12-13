import express, { Application } from 'express';
import { getEnv } from './utils/getEnv';
import { createLogger } from './logger/logger';
import { serverMiddleware } from './middleware/serverMiddleware';
import { mainRouter } from './routes/server.route';
import DatabaseDataSource from '../src/database/connect';
import { DataSource } from 'typeorm';

const logger = createLogger('user-microservice');
const port = getEnv('PORT');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

serverMiddleware(app as Application);

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

mainRouter(app as Application);

process.on('uncaughtException', function (err) {
  console.log(
    '****** Unhandled exception in etl-pim-consumer code ******',
    err
  );
  logger.error(
    `****** Unhandled exception in etl-pim-consumer code ****** ${err.message}`
  );
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('****** Unhandled rejection at ', promise, `reason: ${reason}`);
  logger.error(`****** Unhandled rejection at ${promise} reason: ${reason}`);
  process.exit(1);
});

process.on('SIGTERM', (signal) => {
  const message = `****** Mero Hostel Mate Process ${process.pid} received a SIGTERM signal - ${signal}`;
  console.log(message);
  logger.error(message);
  process.exit(0);
});

process.on('SIGINT', (signal) => {
  const message = `****** Mero Hostel Mate Process ${process.pid} received a SIGINT signal - ${signal}`;
  console.log(message);
  logger.error(message);
  process.exit(0);
});

app.listen(port, () => {
  const message = `Server running at port ${port}`;
  console.log(message);
  logger.info(message);
});
