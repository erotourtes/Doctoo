import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';
import { userStub } from '../mocks/stubs/user.stub';
import { UserModule } from '../user/user.module';

describe('DoctorService', () => {
  let doctorService: DoctorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
      providers: [DoctorService, PrismaService],
    }).compile();

    doctorService = moduleRef.get<DoctorService>(DoctorService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
  });

  it('should create doctor', async () => {
    const user = await prisma.user.create({ data: userStub() });
    const specialization = await prisma.specialization.create({ data: { name: 'test' } });

    const doctorDto: CreateDoctorDto = {
      about: 'test',
      payrate: 50,
      specializationId: specialization.id,
      userId: user.id,
    };

    const createdDoctor = await doctorService.createDoctor(doctorDto);

    expect(createdDoctor).toMatchObject(doctorDto);
    expect(createdDoctor.id).toBeDefined();
  });

  it('should return doctor by id', async () => {
    const user = await prisma.user.create({ data: userStub() });
    const specialization = await prisma.specialization.create({ data: { name: 'test' } });

    const doctorDto: CreateDoctorDto = {
      about: 'test',
      payrate: 50,
      specializationId: specialization.id,
      userId: user.id,
    };

    const { id } = await prisma.doctor.create({ data: doctorDto });

    const doctor = await doctorService.getDoctor(id);

    expect(doctor).toMatchObject({ ...doctorDto, id });
  });

  it('should update doctor', async () => {
    const user = await prisma.user.create({ data: userStub() });
    const specialization = await prisma.specialization.create({ data: { name: 'test' } });

    const doctorDto: CreateDoctorDto = {
      about: 'test',
      payrate: 50,
      specializationId: specialization.id,
      userId: user.id,
    };

    const { id } = await prisma.doctor.create({ data: doctorDto });

    const delta: PatchDoctorDto = { about: 'updated-about', payrate: 25 };

    const updatedDoctor = await doctorService.patchDoctor(id, delta);

    expect(updatedDoctor).toMatchObject({ ...doctorDto, ...delta });
  });

  it('should delete doctor', async () => {
    const user = await prisma.user.create({ data: userStub() });
    const specialization = await prisma.specialization.create({ data: { name: 'test' } });

    const doctorDto: CreateDoctorDto = {
      about: 'test',
      payrate: 50,
      specializationId: specialization.id,
      userId: user.id,
    };

    const { id } = await prisma.doctor.create({ data: doctorDto });

    const deleteResult = await doctorService.deleteDoctor(id);

    expect(deleteResult).toBeUndefined();

    const existingDoctor = await prisma.doctor.findUnique({ where: { id } });
    expect(existingDoctor).toBeNull();
  });
});
