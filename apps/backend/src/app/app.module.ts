import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from '../appointment/appointment.module';
import { AuthModule } from '../auth/auth.module';
import auth from '../config/auth';
import config from '../config/config';
import { DoctorModule } from '../doctor/doctor.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { FileModule } from '../file/file.module';
import { HospitalModule } from '../hospital/hospital.module';
import { MinioService } from '../minio/minio.service';
import { PatientModule } from '../patient/patient.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [auth, config] }),
    AuthModule,
    UserModule,
    FavoriteModule,
    DoctorModule,
    PatientModule,
    FileModule,
    HospitalModule,
    AppointmentModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
