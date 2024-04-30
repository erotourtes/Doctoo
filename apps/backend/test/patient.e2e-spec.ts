import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BloodType, Gender } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { PatientModule } from '../src/patient/patient.module';
import { patientStub } from '../src/patient/patient.stub';
import { PrismaService } from '../src/prisma/prisma.service';
import { userStub } from '../src/user/user.stub';
import { mockConfigs, pipe } from '../src/utils/test-injection-mock';

describe('PatientController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PatientModule],
      providers: [PrismaService],
    })
      .useMocker(pipe(mockConfigs))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    user = await prisma.user.create({ data: userStub() });
  });

  describe('/patient (POST)', () => {
    it('should create a new patient', async () => {
      const data = {
        userId: user.id,
        weight: 50,
        height: 150,
        age: 50,
        bloodType: BloodType.AB_MINUS,
        gender: Gender.MALE,
        country: 'Norway',
        city: 'Oslo',
        street: 'One famous street',
        apartment: '589',
        zipCode: 52678,
      };

      return await request(app.getHttpServer())
        .post('/patient')
        .send(data)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toMatchObject(data);
        });
    });
  });

  describe('/patient/:id (GET)', () => {
    it('should return a patient when given a valid patient ID', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });

      return await request(app.getHttpServer())
        .get(`/patient/${patient.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toMatchObject(patientStub());
        });
    });

    it('should return 404 error when provided with non-existent ID', async () => {
      const id = randomUUID();

      return await request(app.getHttpServer()).get(`/patient/${id}`).expect(404);
    });
  });

  describe('/patient/:id (PATCH)', () => {
    it('should update information about patient', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });

      const newData = {
        weight: 50,
        age: 35,
        identityCardKey: 'new_identity_card_key',
        emailNotificationToggle: true,
        twoFactorAuthToggle: true,
        requestBillPaymentApproval: false,
      };

      return await request(app.getHttpServer())
        .patch(`/patient/${patient.id}`)
        .send(newData)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toMatchObject({ ...patientStub(), ...newData });
        });
    });
  });

  describe('/patient/:id/allergy (POST)', () => {
    it('should create a patient allergy list', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });
      const allergy = await prisma.allergy.create({ data: { name: 'almond' } });

      return await request(app.getHttpServer())
        .post(`/patient/${patient.id}/allergy`)
        .send({ allergyIds: [allergy.id] })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toHaveProperty('count', 1);
        });
    });
  });

  describe('/patient/:id/allergy (GET)', () => {
    it('should return a patient allergy list', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });
      const allergy = await prisma.allergy.create({ data: { name: 'almond' } });

      await prisma.patientAllergy.create({ data: { patientId: patient.id, allergyId: allergy.id } });

      const data = [{ id: allergy.id, name: allergy.name }];

      return await request(app.getHttpServer())
        .get(`/patient/${patient.id}/allergy`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toContainEqual(expect.objectContaining({ name: data[0].name }));
        });
    });
  });

  describe('/patient/:id/condition (POST)', () => {
    it('should create a patient condition list', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });
      const condition = await prisma.condition.create({ data: { name: 'test' } });

      return await request(app.getHttpServer())
        .post(`/patient/${patient.id}/condition`)
        .send({ conditionIds: [condition.id] })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toHaveProperty('count', 1);
        });
    });
  });

  describe('/patient/:id/condition (GET)', () => {
    it('should return a patient condition list', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });
      const condition = await prisma.condition.create({ data: { name: 'test' } });
      await prisma.patientCondition.create({ data: { patientId: patient.id, conditionId: condition.id } });

      const data = [{ id: condition.id, name: condition.name }];

      return await request(app.getHttpServer())
        .get(`/patient/${patient.id}/condition`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toMatchObject(data);
        });
    });
  });

  describe('/patient/:id (DELETE)', () => {
    it('should delete patient', async () => {
      const patient = await prisma.patient.create({ data: { ...patientStub(), user: { connect: { id: user.id } } } });

      return await request(app.getHttpServer()).delete(`/patient/${patient.id}`).expect(200);
    });
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.allergy.deleteMany();
    await prisma.patientAllergy.deleteMany();
    await prisma.condition.deleteMany();
    await prisma.patientCondition.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });
});
