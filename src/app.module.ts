import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './shared/config/database-namespaced';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/interfaces/database';
import { ConfigKey } from './shared/enums/config-key';
import { UserModule } from './user/user.module';

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
    // Modules
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
