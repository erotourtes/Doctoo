import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
