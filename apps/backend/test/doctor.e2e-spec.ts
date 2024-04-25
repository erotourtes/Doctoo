import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { DoctorModule } from '../src/doctor/doctor.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { doctorStub } from '../src/mocks/stubs/doctor.stub';
import { userStub } from '../src/mocks/stubs/user.stub';
import { hospitalStub } from '../src/mocks/stubs/hospital.stub';
import { specializationStub } from '../src/mocks/stubs/specialization.stub';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DoctorModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.doctorSpecialization.deleteMany();
    await prisma.specialization.deleteMany();
    await prisma.hospitalDoctor.deleteMany();
    await prisma.hospital.deleteMany();
  });

  describe('/doctor (GET)', () => {
    it('Should return array of objects', async () => {
      const user = await prisma.user.create({ data: userStub() });
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });

      await prisma.doctor.create({
        data: {
          ...doctorStub(),
          specializations: { create: { specialization: { connect: { id: specialization.id } } } },
          hospitals: { create: { hospital: { connect: { id: hospital.id } } } },
          user: { connect: { id: user.id } },
        },
      });

      const response = await request(app.getHttpServer()).get('/doctor');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([doctorStub()]);
    });
  });

  describe('/doctor (POST)', () => {
    it('Should create a new doctor', async () => {
      const user = await prisma.user.create({ data: userStub() });
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });

      const doctorData = {
        ...doctorStub(),
        userId: user.id,
        hospitalIds: [hospital.id],
        specializationIds: [specialization.id],
      };

      const response = await request(app.getHttpServer()).post('/doctor').send(doctorData);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(doctorStub());
    });

    it('Should return 404 for non-existent userId', async () => {
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });
      const doctorData = {
        ...doctorStub(),
        userId: randomUUID(),
        hospitalIds: [hospital.id],
        specializationIds: [specialization.id],
      };

      const response = await request(app.getHttpServer()).post('/doctor').send(doctorData);

      expect(response.status).toEqual(404);
    });
  });

  describe('/doctor/:id (GET)', () => {
    it('Should return doctor object', async () => {
      const user = await prisma.user.create({ data: userStub() });
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });

      const doctorData = {
        ...doctorStub(),
        userId: user.id,
        hospitalIds: [hospital.id],
        specializationIds: [specialization.id],
      };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const response = await request(app.getHttpServer()).get(`/doctor/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(doctorStub());
    });

    it('Should return 404 for non-existent doctorId', async () => {
      const id = randomUUID();

      const response = await request(app.getHttpServer()).get(`/doctor/${id}`);

      expect(response.status).toEqual(404);
    });
  });

  describe('/doctor/:id (PATCH)', () => {
    it('Should return updated object', async () => {
      const user = await prisma.user.create({ data: userStub() });
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });

      const doctorData = {
        ...doctorStub(),
        userId: user.id,
        hospitalIds: [hospital.id],
        specializationIds: [specialization.id],
      };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const body = { about: 'Lorem ipsum text...' };
      const response = await request(app.getHttpServer()).patch(`/doctor/${id}`).send(body);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ ...doctorStub(), ...body });
    });
  });

  describe('/doctor/:id (DELETE)', () => {
    it('Should delete doctor', async () => {
      const user = await prisma.user.create({ data: userStub() });
      const specialization = await prisma.specialization.create({ data: specializationStub() });
      const hospital = await prisma.hospital.create({ data: hospitalStub() });

      const doctorData = {
        ...doctorStub(),
        userId: user.id,
        hospitalIds: [hospital.id],
        specializationIds: [specialization.id],
      };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const response = await request(app.getHttpServer()).delete(`/doctor/${id}`);

      expect(response.status).toEqual(200);
    });
  });

  afterAll(() => app.close());
});
