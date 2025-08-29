import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './shared/config/database-namespaced';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/interfaces/database';
import { ConfigKey } from './shared/enums/config-key';
import { ApplicationModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<DatabaseConfig>(
          ConfigKey.DATABASE,
        ) as TypeOrmModuleOptions;
      },
    }),
    ...ApplicationModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
