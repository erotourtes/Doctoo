import { Module } from '@nestjs/common';
import { DoctorService } from '../doctor/doctor.service';
import { HospitalService } from '../hospital/hospital.service';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { SpecializationService } from '../specialization/specialization.service';
import { UserService } from '../user/user.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    PrismaService,
    DoctorService,
    PatientService,
    UserService,
    HospitalService,
    SpecializationService,
  ],
})
export class AppointmentModule {}
