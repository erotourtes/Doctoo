import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { HospitalModule } from '../hospital/hospital.module';
import { SpecializationModule } from '../specialization/specialization.module';

@Module({
  imports: [UserModule, HospitalModule, SpecializationModule],
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService],
  exports: [DoctorService],
})
export class DoctorModule {}
