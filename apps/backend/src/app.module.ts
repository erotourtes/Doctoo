import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import authConfig from 'src/config/auth-config';
import config from 'src/config/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [authConfig, config] }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
