import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { ReviewService } from './review.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [ReviewController],
  providers: [PrismaService, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
