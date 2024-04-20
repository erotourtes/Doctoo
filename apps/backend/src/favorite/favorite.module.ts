import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService],
})
export class FavoriteModule {}
