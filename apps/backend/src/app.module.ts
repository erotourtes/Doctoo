import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import authConfig from 'src/config/auth-config';
import config from 'src/config/config';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { DoctorModule } from './doctor/doctor.module';
import { FileModule } from './file/file.module';
import { MinioService } from './minio/minio.service';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [authConfig, config] }),
    UserModule,
    FavoriteModule,
    DoctorModule,
    PatientModule,
    AuthModule,
    FileModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, MinioService],
})
export class AppModule {}