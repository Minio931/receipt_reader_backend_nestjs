import { databaseConfig } from './database';

export const dataSourceOptions = {
  ...databaseConfig,
  driver: process.env.DATABASE_TYPE,
};
