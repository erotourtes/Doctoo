import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MinioModule } from 'src/minio/minio.module';
import auth from '../config/auth';
import { MailModule } from '../mail/mail.module';
import { PatientModule } from '../patient/patient.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google';
import { JwtStrategy } from './strategies/jwt';
import { AuthRequestHelper } from './utils/cookie-helper.service';

@Module({
  imports: [
    PassportModule,
    MailModule,
    ConfigModule,
    MinioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigType<typeof auth>) => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: config.JWT_EXPIRATION_DAYS },
      }),
      inject: [auth.KEY],
    }),
    UserModule,
    PatientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRequestHelper, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
