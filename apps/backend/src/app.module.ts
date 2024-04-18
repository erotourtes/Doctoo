import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { DoctorModule } from './doctor/doctor.module';
import { FileModule } from './file/file.module';
import { MinioService } from './minio/minio.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, FavoriteModule, DoctorModule, PatientModule, FileModule],
  controllers: [AppController],
  providers: [AppService, MinioService],
})
export class AppModule {}
