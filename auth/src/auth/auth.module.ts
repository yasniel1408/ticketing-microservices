import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategyService } from './validators/local-strategy/local-strategy.service';
import { LoginController } from './api/login/login.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategyService } from './validators/jwt-strategy/jwt-strategy.service';
import { ProfileController } from './api/profile/profile.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategyService, JwtStrategyService],
  controllers: [LoginController, ProfileController],
})
export class AuthModule {}
