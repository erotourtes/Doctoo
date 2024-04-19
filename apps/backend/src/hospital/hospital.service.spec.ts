import { Test } from '@nestjs/testing';
import { HospitalService } from './hospital.service';
import { PrismaService } from '../prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

describe('HospitalService', () => {
  let hospitalService: HospitalService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HospitalService, PrismaService],
    }).compile();

    hospitalService = moduleRef.get<HospitalService>(HospitalService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(hospitalService).toBeDefined();
  });

  it('should create hospital', async () => {
    const hospitalDto: CreateHospitalDto = {
      name: 'test-hospital',
      country: 'test',
      city: 'test',
      street: 'test',
    };

    const createdHospital = await hospitalService.createHospital(hospitalDto);

    expect(createdHospital).toMatchObject(hospitalDto);
    expect(createdHospital.id).toBeDefined();
  });

  it('should return hospital by id', async () => {
    const hospitalDto: CreateHospitalDto = {
      name: 'test-hospital',
      country: 'test',
      city: 'test',
      street: 'test',
    };

    const { id } = await prisma.hospital.create({ data: hospitalDto });

    const hospital = await hospitalService.findHospitalById(id);

    expect(hospital).toMatchObject({ ...hospitalDto, id });
  });

  it('should update hospital', async () => {
    const hospitalDto: CreateHospitalDto = {
      name: 'test-hospital',
      country: 'test',
      city: 'test',
      street: 'test',
    };

    const { id } = await prisma.hospital.create({ data: hospitalDto });

    const delta: UpdateHospitalDto = { name: 'updated-name', country: 'updated-country', state: 'updated-state' };

    const updatedHospital = await hospitalService.updateHospital(id, delta);

    expect(updatedHospital).toMatchObject({ ...hospitalDto, ...delta });
  });

  it('should delete hospital', async () => {
    const hospitalDto: CreateHospitalDto = {
      name: 'test-hospital',
      country: 'test',
      city: 'test',
      street: 'test',
    };

    const { id } = await prisma.hospital.create({ data: hospitalDto });

    const deleteResult = await hospitalService.deleteHospital(id);

    expect(deleteResult).toMatchObject({ message: `Hospital with id ${id} was deleted successfully` });
  });
});
