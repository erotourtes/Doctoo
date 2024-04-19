import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';
import { ResponseDoctorDto } from './dto/response.dto';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createDoctor(body: CreateDoctorDto): Promise<ResponseDoctorDto> {
    const user = await this.userService.getUser(body.userId);

    if (!user) throw new NotFoundException({ message: `User with id ${body.userId} does not exist` });

    const candidateDoctor = await this.prismaService.doctor.findUnique({ where: { userId: body.userId } });

    if (candidateDoctor) {
      throw new BadRequestException({ message: `Doctor associated with user with id ${body.userId} already exists` });
    }

    const doctor = this.prismaService.doctor.create({ data: body });

    return doctor;
  }

  async getDoctors(): Promise<ResponseDoctorDto[]> {
    const doctors = this.prismaService.doctor.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
    });

    return doctors;
  }

  async getDoctor(id: string): Promise<ResponseDoctorDto> {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id },
      include: { user: { select: { firstName: true, lastName: true } } },
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
