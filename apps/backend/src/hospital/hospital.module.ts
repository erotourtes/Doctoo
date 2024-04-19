import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, PrismaService],
  exports: [HospitalService],
})
export class HospitalModule {}
