import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConditionController],
  providers: [ConditionService, PrismaService],
})
export class ConditionModule {}
