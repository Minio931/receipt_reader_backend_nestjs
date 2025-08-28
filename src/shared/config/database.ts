import { DatabaseConfig } from '../interfaces/database';

export const databaseConfig: DatabaseConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  autoLoadEntities: true,
  migrations: [],
  migrationsTableName: 'migrations',
};
