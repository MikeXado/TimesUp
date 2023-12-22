import { Module } from '@nestjs/common';
import { UsersModule } from './queries/user/users.module';

@Module({
  imports: [UsersModule],
})
export class DataAccessDbModule {}
