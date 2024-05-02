import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MinioModule } from 'src/minio/minio.module';
import { MailModule } from '../mail/mail.module';
import { PatientModule } from '../patient/patient.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google';
import { JwtStrategy } from './strategies/jwt';
import { AuthRequestHelper } from './utils/cookie-helper.service';
import { GlobalJwtModule } from '../jwt/jwt.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [PassportModule, MailModule, MinioModule, GlobalJwtModule, UserModule, PatientModule, DoctorModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRequestHelper, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
