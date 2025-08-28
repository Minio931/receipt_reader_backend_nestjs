import { ConfigFactory, registerAs } from '@nestjs/config';
import { DatabaseConfig } from '../interfaces/database';
import { ConfigKey } from '../enums/config-key';
import { databaseConfig } from './database';

export const database: ConfigFactory<DatabaseConfig> = registerAs(
  ConfigKey.DATABASE,
  () => databaseConfig,
);
