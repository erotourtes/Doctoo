import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import * as request from 'supertest';
import { HospitalModule } from '../src/hospital/hospital.module';
import { hospitalStub } from './stubs/hospital.stub';
import { CreateHospitalDto } from '../src/hospital/dto/create-hospital.dto';
import { HospitalDto } from '../src/hospital/dto/hospital.dto';
import { UpdateHospitalDto } from '../src/hospital/dto/update-hospital.dto';

describe('HospitalController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HospitalModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(() => app.close());

  beforeEach(async () => prisma.hospital.deleteMany());

  describe('/hospitals (GET)', () => {
    it('should return array of hospitals', async () => {
      await prisma.hospital.create({ data: hospitalStub() });

      const response = await request(app.getHttpServer()).get('/hospitals');

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([hospitalStub()]);
    });
  });

  describe('/hospitals (POST)', () => {
    it('should return created hospital without state', async () => {
      const hospital: CreateHospitalDto = hospitalStub();
      const expectedResponseBody: Omit<HospitalDto, 'id'> = { ...hospital, state: null };

      const response = await request(app.getHttpServer()).post('/hospitals').send(hospital);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(expectedResponseBody);
    });
    it('should return created hospital with state', async () => {
      const hospital: CreateHospitalDto = { ...hospitalStub(), state: 'test' };

      const response = await request(app.getHttpServer()).post('/hospitals').send(hospital);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(hospital);
    });
  });

  describe('/hospitals/:id (GET)', () => {
    it('should return hospital by id', async () => {
      const hospital: CreateHospitalDto = hospitalStub();

      const { id } = await prisma.hospital.create({ data: hospital });

      const response = await request(app.getHttpServer()).get(`/hospitals/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(hospital);
    });

    it('should return Not Found error with message that hospital with defined id does not exist', async () => {
      const id = 'non-existent';
      const response = await request(app.getHttpServer()).get(`/hospitals/${id}`);

      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({
        message: `Hospital with id ${id} does not exist`,
      });
    });
  });

  describe('/hospitals/:id (PATCH)', () => {
    it('should return updated hospital', async () => {
      const hospital: CreateHospitalDto = hospitalStub();

      const { id } = await prisma.hospital.create({ data: hospital });

      const delta: UpdateHospitalDto = { name: 'updated-name', country: 'updated-country', state: 'updated-state' };
      const response = await request(app.getHttpServer()).patch(`/hospitals/${id}`).send(delta);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ ...hospital, ...delta });
    });
  });

  describe('/hospitals/:id (DELETE)', () => {
    it('should delete hospital', async () => {
      const hospital: CreateHospitalDto = hospitalStub();

      const { id } = await prisma.hospital.create({ data: hospital });

      const response = await request(app.getHttpServer()).delete(`/hospitals/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        message: `Hospital with id ${id} was deleted successfully`,
      });

      const check = await request(app.getHttpServer()).get(`/hospitals/${id}`);

      expect(check.status).toEqual(404);
    });
  });
});
