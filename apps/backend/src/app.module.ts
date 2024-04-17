import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { FavoriteModule } from './favorite/favorite.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, FavoriteModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
