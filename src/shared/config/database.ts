import { ConfigFactory, registerAs } from '@nestjs/config';
import { DatabaseConfig } from '../interfaces/database';
import { ConfigKey } from '../enums/config-key';

export const database: ConfigFactory<DatabaseConfig> = registerAs(
  ConfigKey.DATABASE,
  () => ({
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
  }),
);
