import { DataSource } from 'typeorm';
import { getDbConfig } from './db.config';

let DatabaseDataSource: DataSource;

const createSingletonDB = () => {
  if (!DatabaseDataSource) {
    DatabaseDataSource = new DataSource(getDbConfig());
  }
  return DatabaseDataSource;
};

export default createSingletonDB();
