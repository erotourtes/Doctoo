import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { ResponseAppointmentDto } from './dto/response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  private async isAppointmentExists(id: string): Promise<boolean> {
    const isAppointmentExist = await this.prismaService.appointment.findUnique({ where: { id } });

    if (!isAppointmentExist) throw new NotFoundException('A appointment with this Id not found.');

    return true;
  }

  private async isDoctorExists(id: string): Promise<boolean> {
    const isDoctorExist = await this.prismaService.doctor.findUnique({ where: { id } });

    if (!isDoctorExist) throw new NotFoundException('A doctor with this Id not found.');

    return true;
  }

  private async isPatientExists(id: string): Promise<boolean> {
    const isPatientExist = await this.prismaService.patient.findUnique({ where: { id } });

    if (!isPatientExist) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }

  async create(body: CreateAppointmentDto): Promise<ResponseAppointmentDto> {
    await this.isDoctorExists(body.doctorId);
    await this.isPatientExists(body.patientId);

    const appointment = await this.prismaService.appointment.create({ data: body });

    return appointment;
  }

  async findAll(): Promise<ResponseAppointmentDto[]> {
    const appointments = await this.prismaService.appointment.findMany();

    return appointments;
  }

  async findAllByPatientId(id: string): Promise<ResponseAppointmentDto[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: { patientId: id },
      include: {
        doctor: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatarKey: true, phone: true, email: true },
            },
            hospitals: { select: { hospital: { select: { id: true, name: true } } } },
            specializations: { select: { specialization: true } },
          },
        },
      },
    });

    return plainToInstance(ResponseAppointmentDto, appointments);
  }

  async findAllByDoctorId(id: string): Promise<ResponseAppointmentDto[]> {
    const doctor = await this.prismaService.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException({ message: `Doctor with ID ${id} does not exist` });

    const appointments = await this.prismaService.appointment.findMany({
      where: { doctorId: id },
      include: { patient: true },
    });

    return appointments;
  }

  async findOne(id: string): Promise<ResponseAppointmentDto> {
    await this.isAppointmentExists(id);
    const appointment = await this.prismaService.appointment.findUnique({ where: { id } });

    return appointment;
  }

  async update(id: string, body: PatchAppointmentDto): Promise<ResponseAppointmentDto> {
    await this.isAppointmentExists(id);
    await this.isDoctorExists(body.doctorId);
    await this.isPatientExists(body.patientId);

    const appointment = await this.prismaService.appointment.update({ where: { id }, data: body });

    return appointment;
  }

  async remove(id: string) {
    await this.isAppointmentExists(id);

    await this.prismaService.appointment.delete({ where: { id } });
  }
}
