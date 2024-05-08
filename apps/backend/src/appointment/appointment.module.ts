import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
