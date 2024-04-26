import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientModule, DoctorModule],
      controllers: [ReviewController],
      providers: [PrismaService, ReviewService],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
