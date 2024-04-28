import { Module } from '@nestjs/common';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientModule } from '../patient/patient.module';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [ReviewController],
  providers: [PrismaService, ReviewService, PatientService],
  exports: [ReviewService],
})
export class ReviewModule {}
