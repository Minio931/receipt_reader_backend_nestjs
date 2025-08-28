import { DataSource } from 'typeorm';

const type = (process.env.DATABASE_TYPE || 'postgres') as 'postgres';

export default new DataSource({
  type,
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'dev',
  password: process.env.DATABASE_PASSWORD || 'dev',
  database: process.env.DATABASE_NAME || 'mydb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
