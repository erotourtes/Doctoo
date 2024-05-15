import { Module } from '@nestjs/common';
import { VirtualAssistantService } from './virtual-assistant.service';
import { VirtualAssistantController } from './virtual-assistant.controller';
import { ConditionService } from 'src/condition/condition.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { UserService } from 'src/user/user.service';
import { HospitalService } from 'src/hospital/hospital.service';
import { SpecializationService } from 'src/specialization/specialization.service';
import { ReviewService } from 'src/review/review.service';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from 'src/patient/patient.service';
import { DoctorScheduleService } from 'src/doctor/doctor-schedule.service';
import { TimeSlotService } from 'src/doctor/time-slot.service';
import { AppointmentService } from 'src/appointment/appointment.service';

@Module({
  controllers: [VirtualAssistantController],
  providers: [
    VirtualAssistantService,
    DoctorScheduleService,
    ConditionService,
    PrismaService,
    DoctorService,
    UserService,
    HospitalService,
    SpecializationService,
    ReviewService,
    JwtService,
    PatientService,
    TimeSlotService,
    AppointmentService,
  ],
})
export class VirtualAssistantModule {}
