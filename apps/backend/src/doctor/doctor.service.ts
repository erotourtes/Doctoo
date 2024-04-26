import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';
import { ResponseDoctorDto } from './dto/response.dto';
import { HospitalService } from '../hospital/hospital.service';
import { GetDoctorsQuery } from './query/get-doctors.query';
import { SpecializationService } from '../specialization/specialization.service';
import { removeDuplicates } from '../utils/arrayUtils';
import { plainToInstance } from 'class-transformer';

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

    return plainToInstance(ResponseDoctorDto, doctor);
  }

  // TODO: refactor, extracting filter mapping logic into separate function/s
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
        user: { select: { firstName: true, lastName: true, avatarKey: true } },
        hospitals: { select: { hospital: { select: { id: true, name: true } } } },
        specializations: { select: { specialization: true } },
      },
      where: {
        AND: [
          { hospitals: { every: { hospital: hospitalFilter } } },
          { specializations: { every: { specialization: specializationFilter } } },
          searchFilters.length ? { OR: searchFilters } : {},
        ],
      },
    });

    return plainToInstance(ResponseDoctorDto, doctors);
  }

  async getDoctor(id: string): Promise<ResponseDoctorDto> {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, avatarKey: true } },
        hospitals: { select: { hospital: true } },
        specializations: { select: { specialization: true } },
      },
    });

    if (!doctor) throw new NotFoundException({ message: `Doctor with id ${id} does not exist` });
    return plainToInstance(ResponseDoctorDto, doctor);
  }

  // TODO: refactor, extracting logic for updating hospitals and specializations into separate functions
  async patchDoctor(id: string, body: PatchDoctorDto): Promise<ResponseDoctorDto> {
    await this.getDoctor(id);
    const { about, payrate, hospitalIds, specializationIds } = body;
    const addedExistingHospitalIds = [];
    if (hospitalIds?.added?.length) {
      for (const hospitalId of hospitalIds.added) {
        const hospital = await this.hospitalService.getHospital(hospitalId);
        addedExistingHospitalIds.push(hospital.id);
      }
    }
    const addedExistingSpecializationIds = [];
    if (specializationIds?.added?.length) {
      for (const specializationId of specializationIds.added) {
        const specialization = await this.specializationService.getSpecialization(specializationId);
        addedExistingSpecializationIds.push(specialization.id);
      }
    }
    const patchedDoctor = await this.prismaService.doctor.update({
      where: { id },
      data: {
        about,
        payrate,
        hospitals: {
          createMany: addedExistingHospitalIds.length
            ? { data: addedExistingHospitalIds.map(id => ({ hospitalId: id })) }
            : undefined,
          deleteMany: hospitalIds?.deleted?.length ? { hospitalId: { in: hospitalIds.deleted } } : undefined,
        },
        specializations: {
          createMany: addedExistingSpecializationIds.length
            ? { data: addedExistingSpecializationIds.map(id => ({ specializationId: id })) }
            : undefined,
          deleteMany: hospitalIds?.deleted?.length
            ? { specializationId: { in: specializationIds.deleted } }
            : undefined,
        },
      },
      include: {
        user: { select: { firstName: true, lastName: true, avatarKey: true } },
        hospitals: { include: { hospital: true } },
        specializations: { include: { specialization: true } },
      },
    });

    return plainToInstance(ResponseDoctorDto, patchedDoctor, { exposeUnsetFields: false });
  }

  async deleteDoctor(id: string) {
    await this.getDoctor(id);

    await this.prismaService.doctor.delete({ where: { id } });
  }

  async getPatientDoctors(id: string): Promise<ResponseDoctorDto[]> {
    const [appointments, declaration] = await Promise.all([
      this.prismaService.appointment.findMany({
        where: { patientId: id },
        include: { doctor: { include: { user: true } } },
      }),
      this.prismaService.declaration.findUnique({
        where: { patientId: id },
        include: { doctor: { include: { user: true } } },
      }),
    ]);

    const doctorsFromAppointments = appointments.map(appointment => appointment.doctor);

    const allDoctors = declaration ? [declaration.doctor, ...doctorsFromAppointments] : doctorsFromAppointments;

    return removeDuplicates(allDoctors, doctor => doctor.id).map(el => {
      return plainToInstance(ResponseDoctorDto, el, { exposeUnsetFields: false });
    });
  }
}
