import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const { user_id, about_me, payrate } = createDoctorDto;
    const user = await this.userService.getUser(createDoctorDto.user_id);
    if (!user) throw new NotFoundException({ message: `User with id ${user_id} does not exist` });
    const candidateDoctor = await this.prisma.doctor.findFirst({ where: { user_id: user_id } });
    if (candidateDoctor)
      throw new BadRequestException({ message: `Doctor associated with user with id ${user_id} already exists` });
    const createdDoctor = this.prisma.doctor.create({
      data: { about_me, payrate, user: { connect: { id: user_id } } },
    });
    return plainToInstance(DoctorDto, createdDoctor);
  }

  async findMany() {
    const doctors = this.prisma.doctor.findMany({
      include: { user: { select: { first_name: true, last_name: true } } },
    });
    return plainToInstance(DoctorDto, doctors);
  }

  async findById(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: { select: { first_name: true, last_name: true } } },
    });
    if (!doctor) throw new NotFoundException({ message: `Doctor with id ${id} does not exist` });
    return plainToInstance(DoctorDto, doctor);
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findById(id);
    const { about_me, payrate } = updateDoctorDto;
    const updatedDoctor = await this.prisma.doctor.update({
      where: { id },
      data: { about_me, payrate },
      include: { user: { select: { first_name: true, last_name: true } } },
    });
    return plainToInstance(DoctorDto, updatedDoctor);
  }

  async remove(id: string) {
    const doctor = await this.findById(id);
    const deleteResult = await this.prisma.doctor.delete({ where: { id } });
    if (!deleteResult)
      throw new InternalServerErrorException({ message: `Something went wrong during deleting doctor with id ${id}` });
    return { message: `Doctor with id ${id} was deleted successfully` };
  }
}
