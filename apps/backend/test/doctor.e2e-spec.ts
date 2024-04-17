import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaService } from "../src/prisma.service"
import { userStub } from "./stubs/user.stub"
import { doctorStub } from "./stubs/doctor.stub"
import * as request from 'supertest'

describe('DoctorController (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [PrismaService]
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        prisma = moduleFixture.get<PrismaService>(PrismaService)
    })

    afterAll(() => app.close())

    beforeEach(async () => prisma.doctor.deleteMany())

    describe('/doctors (GET)', () => {
        it('should return array of doctors', async () => {
            const user = await prisma.user.create({ data: userStub() })
            await prisma.doctor.create({ data: { ...doctorStub(), user_id: user.id } })
            
            const response = await request(app.getHttpServer()).get('/doctors')

            expect(response.status).toEqual(200)
            expect(response.body).toMatchObject([doctorStub()])
        })
    })

     describe('/doctors (POST)', () => {
    it('should return created doctor', async () => {
        const user = await prisma.user.create({ data: userStub() })
        const doctorData = { ...doctorStub(), user_id: user.id }
        const response = await request(app.getHttpServer())
            .post('/doctors/')
            .send(doctorData);
        expect(response.status).toEqual(201);
        expect(response.body).toMatchObject(doctorData);
    });
    it('should return Not Found error with message that user with id defined in dto does not exist', async () => {
        const doctorData = { ...doctorStub(), user_id: 'non-existent' }
      const response = await request(app.getHttpServer())
        .post('/doctors/')
        .send(doctorData);

      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({
        message: `User with id ${doctorData.user_id} does not exist`,
      });
    });
  });

  describe('/doctors/:id (GET)', () => {
    it('should return doctor by id', async () => {
        const user = await prisma.user.create({ data: userStub() })
        const doctorData = { ...doctorStub(), user_id: user.id }
        const {id} = await prisma.doctor.create({ data: doctorData })
        const response = await request(app.getHttpServer()).get(`/doctors/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(doctorData);
    });

    it('should return Not Found error with message that doctor with defined does not exist', async () => {
      const id = 'non-existent'
      const response = await request(app.getHttpServer())
        .get(`/doctors/${id}`)

      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({
        message: `Doctor with id ${id} does not exist`,
      });
    });
  });

  describe('/doctors/:id (PATCH)', () => {
    it('should return updated doctor', async () => {
      const user = await prisma.user.create({ data: userStub() })
      const doctorData = { ...doctorStub(), user_id: user.id }
      const {id} = await prisma.doctor.create({ data: doctorData })

      const delta = { about_me: 'new about_me' };
      const response = await request(app.getHttpServer())
        .patch(`/doctors/${id}`)
        .send(delta);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({ ...doctorData, ...delta });
    });
  });

  describe('/doctors/:id (DELETE)', () => {
    it('should delete doctor', async () => {
      const user = await prisma.user.create({ data: userStub() })
      const doctorData = { ...doctorStub(), user_id: user.id }
      const {id} = await prisma.doctor.create({ data: doctorData })
      const response = await request(app.getHttpServer()).delete(
        `/doctors/${id}`,
      );

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        message: `Doctor with id ${id} was deleted successfully`,
      });

      const check = await request(app.getHttpServer()).get(`/doctors/${id}`);

      expect(check.status).toEqual(404);
    });
  });
})