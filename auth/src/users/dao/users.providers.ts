import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['USERS_SOURCE'],
  },
];
