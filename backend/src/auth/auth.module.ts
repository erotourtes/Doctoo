import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/auth/strategies/local-strategy';
import { GoogleStrategy } from 'src/auth/strategies/google-strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy],
})
export class AuthModule {}
