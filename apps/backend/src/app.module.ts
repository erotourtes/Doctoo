import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, FavoriteModule, DoctorModule, PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
