import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { doctorStub } from './stubs/doctor.stub';
import { userStub } from './stubs/user.stub';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => prisma.doctor.deleteMany());

  describe('/doctor (GET)', () => {
    it('Should return array of objects', async () => {
      const user = await prisma.user.create({ data: userStub() });

      await prisma.doctor.create({ data: { ...doctorStub(), userId: user.id } });

      const response = await request(app.getHttpServer()).get('/doctor');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([doctorStub()]);
    });
  });

  describe('/doctor (POST)', () => {
    it('Should create a new doctor', async () => {
      const user = await prisma.user.create({ data: userStub() });

      const doctorData = { ...doctorStub(), userId: user.id };

      const response = await request(app.getHttpServer()).post('/doctor').send(doctorData);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(doctorData);
    });

    it('Should return 404 for non-existent userId', async () => {
      const doctorData = { ...doctorStub(), userId: randomUUID() };

      const response = await request(app.getHttpServer()).post('/doctor').send(doctorData);

      expect(response.status).toEqual(404);
      // TODO: Can we avaoid check message response?
      expect(response.body).toMatchObject({
        message: `User with id ${doctorData.userId} does not exist`,
      });
    });
  });

  describe('/doctor/:id (GET)', () => {
    it('Should return object', async () => {
      const user = await prisma.user.create({ data: userStub() });

      const doctorData = { ...doctorStub(), userId: user.id };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const response = await request(app.getHttpServer()).get(`/doctor/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(doctorData);
    });

    it('Should return 404 for non-existent doctorId', async () => {
      const id = randomUUID();

      const response = await request(app.getHttpServer()).get(`/doctor/${id}`);

      expect(response.status).toEqual(404);
      // TODO: Can we avaoid check message response?
      expect(response.body).toMatchObject({ message: `Doctor with id ${id} does not exist` });
    });
  });

  describe('/doctor/:id (PATCH)', () => {
    it('Should return updated object', async () => {
      const user = await prisma.user.create({ data: userStub() });

      const doctorData = { ...doctorStub(), userId: user.id };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const body = { about: 'Lorem ipsum text...' };
      const response = await request(app.getHttpServer()).patch(`/doctor/${id}`).send(body);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ ...doctorData, ...body });
    });
  });

  describe('/doctor/:id (DELETE)', () => {
    it('Should delete doctor', async () => {
      const user = await prisma.user.create({ data: userStub() });

      const doctorData = { ...doctorStub(), userId: user.id };

      const { id } = await prisma.doctor.create({ data: doctorData });

      const response = await request(app.getHttpServer()).delete(`/doctor/${id}`);

      expect(response.status).toEqual(200);
      // TODO: Can we avaoid check message response?
      expect(response.body).toMatchObject({ message: `Doctor with id ${id} was deleted successfully` });
    });
  });

  afterAll(() => app.close());
});
