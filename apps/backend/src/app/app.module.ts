import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import auth from '../config/auth';
import config from '../config/config';
import { DoctorModule } from '../doctor/doctor.module';
import { FavoriteModule } from '../favorite/favorite.module';
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
  ],
})
export class AppModule {}
