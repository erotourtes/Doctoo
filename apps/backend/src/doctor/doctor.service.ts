import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';
import { ResponseDoctorDto } from './dto/response.dto';
import { HospitalService } from '../hospital/hospital.service';
import { GetDoctorsQuery } from './query/get-doctors.query';
import { SpecializationService } from '../specialization/specialization.service';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly hospitalService: HospitalService,
    private readonly specializationService: SpecializationService,
  ) {}

  async createDoctor(body: CreateDoctorDto): Promise<ResponseDoctorDto> {
    const user = await this.userService.getUser(body.userId);

    if (!user) throw new NotFoundException({ message: `User with id ${body.userId} does not exist` });

    const candidateDoctor = await this.prismaService.doctor.findUnique({ where: { userId: body.userId } });

    if (candidateDoctor) {
      throw new BadRequestException({ message: `Doctor associated with user with id ${body.userId} already exists` });
    }

    const { hospitalIds, specializationIds, userId, ...doctorData } = body;
    const existingHospitalIds = [];
    for (const hospitalId of hospitalIds) {
      const hospital = await this.hospitalService.getHospital(hospitalId);
      existingHospitalIds.push(hospital.id);
    }

    const existingSpecializationIds = [];
    for (const specializationId of specializationIds) {
      const specialization = await this.specializationService.getSpecialization(specializationId);
      existingSpecializationIds.push(specialization.id);
    }

    const doctor = await this.prismaService.doctor.create({
      data: {
        ...doctorData,
        user: { connect: { id: userId } },
        hospitals: {
          create: existingHospitalIds.map(id => ({ hospital: { connect: { id } } })),
        },
        specializations: {
          create: existingSpecializationIds.map(id => ({ specialization: { connect: { id } } })),
        },
      },
    });

    return doctor;
  }

  async getDoctors(query?: GetDoctorsQuery): Promise<ResponseDoctorDto[]> {
    const hospitalFilter: { id?: string } = {};
    const specializationFilter: { id?: string } = {};
    const searchFilters = [];
    const { hospitalId, specializationId, search } = query;
    if (hospitalId) hospitalFilter.id = hospitalId;
    if (specializationId) specializationFilter.id = specializationId;
    if (search) {
      searchFilters.push({ hospitals: { every: { hospital: { name: { contains: search } } } } });
      searchFilters.push({ specializations: { every: { specialization: { name: { contains: search } } } } });
    }
    const doctors = await this.prismaService.doctor.findMany({
      include: {
        user: { select: { firstName: true, lastName: true } },
        hospitals: { select: { hospital: { select: { id: true, name: true } } } },
        specializations: { select: { specialization: true } },
      },
      where: {
        AND: [
          { hospitals: { every: { hospital: hospitalFilter } } },
          { specializations: { every: { specialization: specializationFilter } } },
          searchFilters.length && { OR: searchFilters },
        ],
      },
    });

    return doctors;
  }

  async getDoctor(id: string): Promise<ResponseDoctorDto> {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true } },
        hospitals: { select: { hospital: true } },
        specializations: { select: { specialization: true } },
      },
    });

    if (!doctor) throw new NotFoundException({ message: `Doctor with id ${id} does not exist` });

    return doctor;
  }

  async patchDoctor(id: string, body: PatchDoctorDto): Promise<ResponseDoctorDto> {
    await this.getDoctor(id);

    const patchedDoctor = await this.prismaService.doctor.update({
      where: { id },
      data: body,
      include: { user: { select: { firstName: true, lastName: true } } },
    });

    return patchedDoctor;
  }

  async deleteDoctor(id: string) {
    await this.getDoctor(id);

    await this.prismaService.doctor.delete({ where: { id } });
  }
}
