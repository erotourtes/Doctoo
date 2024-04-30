import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientModule, DoctorModule, EventEmitterModule.forRoot()],
      controllers: [AppointmentController],
      providers: [AppointmentService, PrismaService],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
