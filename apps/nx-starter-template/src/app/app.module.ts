import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DataAccessDbModule,
  User,
} from '@nx-starter-template/nx-starter-template-data-access-db';
import { env } from '@nx-starter-template/nx-starter-template-utils-env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', //! Change to your database type
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [User],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    DataAccessDbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
