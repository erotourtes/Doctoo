import { Module } from '@nestjs/common';
import { HospitalModule } from '../hospital/hospital.module';
import { PrismaService } from '../prisma/prisma.service';
import { SpecializationModule } from '../specialization/specialization.module';
import { UserModule } from '../user/user.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [UserModule, HospitalModule, SpecializationModule],
  providers: [DoctorService, PrismaService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
