import { DataSourceOptions } from 'typeorm';
import { getEnv } from '../utils/getEnv';
import { User } from './entity/user.entity';

export function getDbConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: getEnv('DB_HOST') as string,
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USERNAME') as string,
    password: getEnv('DB_PASSWORD') as string,
    database: getEnv('DB_DATABASE') as string,
    synchronize: true,
    logging: true, // Enable logging
    entities: [User],
  } as DataSourceOptions;
}
