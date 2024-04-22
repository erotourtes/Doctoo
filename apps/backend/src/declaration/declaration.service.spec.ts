import { Test, TestingModule } from '@nestjs/testing';
import { DeclarationService } from './declaration.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from '../patient/dto/create.dto';
import { BloodType, Gender } from '@prisma/client';
import { CreateDoctorDto } from '../doctor/dto/create.dto';
import { ResponseDoctorDto } from '../doctor/dto/response.dto';
import { userStub } from '../mocks/stubs/user.stub';
import { patientStub } from '../mocks/stubs/patient.stub';
import { doctorStub } from '../mocks/stubs/doctor.stub';
describe('DeclarationService', () => {
  let service: DeclarationService;
  let prisma: PrismaService;
  let testDoctor: ResponseDoctorDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeclarationService, PrismaService],
    }).compile();

    service = module.get<DeclarationService>(DeclarationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of objects', () => {
    expect(service.findAll()).toMatchObject({});
  });

  it('should create a new declaration', async () => {
    const userFirst = await prisma.user.create({ data: userStub() });

    const userSecond = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test2@gmail.com',
      },
    });

    const patientData: CreatePatientDto = {
      ...patientStub(),
      bloodType: BloodType.AB_PLUS,
      gender: Gender.FEMALE,
      userId: userFirst.id,
    };

    const doctorData: CreateDoctorDto = {
      ...doctorStub(),
      userId: userSecond.id,
    };

    const patient = await prisma.patient.create({
      data: patientData,
    });

    const doctor = await prisma.doctor.create({
      data: doctorData,
    });

    const declarationData = {
      patientId: patient.id,
      doctorId: doctor.id,
    };

    const declaration = await service.create({
      ...declarationData,
    });

    expect(declaration).toMatchObject(declarationData);
    expect(declaration).toHaveProperty('id');
  });

  it('should return 404 for non-existent patientId', async () => {
    const user = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test3@gmail.com',
      },
    });

    const doctor = await prisma.doctor.create({ data: { ...doctorStub(), userId: user.id } });

    testDoctor = doctor;

    const declarationData = {
      patientId: 'non-existent-id',
      doctorId: doctor.id,
    };

    try {
      await service.create(declarationData);
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });

  it('should return 404 for non-existent doctorId', async () => {
    const user = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test4@gmail.com',
      },
    });

    const patientData: CreatePatientDto = {
      ...patientStub(),
      bloodType: BloodType.AB_PLUS,
      gender: Gender.FEMALE,
      userId: user.id,
    };

    const patient = await prisma.patient.create({
      data: patientData,
    });

    const declarationData = {
      patientId: patient.id,
      doctorId: 'non-existent-id',
    };

    try {
      await service.create(declarationData);
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });

  it('should return 404 for non-existent declarationId', async () => {
    const random = Math.floor(Math.random() * 1000);

    try {
      await service.findOne(random);
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });

  it('should update a declaration', async () => {
    // Create a new declaration
    const userFirst = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test7@gmail.com',
      },
    });
    const userSecond = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test6@gmail.com',
      },
    });

    const patientData: CreatePatientDto = {
      ...patientStub(),
      bloodType: BloodType.AB_PLUS,
      gender: Gender.FEMALE,
      userId: userFirst.id,
    };

    const doctorData: CreateDoctorDto = {
      ...doctorStub(),
      userId: userSecond.id,
    };

    const patient = await prisma.patient.create({ data: patientData });
    const doctor = await prisma.doctor.create({ data: doctorData });

    const declarationData = {
      patientId: patient.id,
      doctorId: doctor.id,
    };

    const createdDeclaration = await service.create(declarationData);

    const updatedDeclaration = await service.update(createdDeclaration.id, {
      patientId: patient.id,
      doctorId: testDoctor.id,
    });

    expect(updatedDeclaration).toBeDefined();
  });

  it('should return status 200 for successful deletion', async () => {
    // Create users for testing
    const userFirst = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test8@gmail.com',
      },
    });

    const userSecond = await prisma.user.create({
      data: {
        ...userStub(),
        email: 'test9@gmail.com',
      },
    });

    const patientData: CreatePatientDto = {
      ...patientStub(),
      bloodType: BloodType.AB_PLUS,
      gender: Gender.FEMALE,
      userId: userFirst.id,
    };

    const doctorData: CreateDoctorDto = {
      ...doctorStub(),
      userId: userSecond.id,
    };

    const patient = await prisma.patient.create({ data: patientData });
    const doctor = await prisma.doctor.create({ data: doctorData });

    const declarationData = {
      patientId: patient.id,
      doctorId: doctor.id,
    };

    const createdDeclaration = await service.create(declarationData);

    await service.delete(createdDeclaration.id);

    try {
      await service.findOne(createdDeclaration.id);
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });
});
