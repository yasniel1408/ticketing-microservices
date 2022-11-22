import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './api/users.controller';
import { usersProviders } from './dao/users.providers';

@Module({
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
