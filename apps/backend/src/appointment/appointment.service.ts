import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { ResponseAppointmentDto } from './dto/response.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateAppointmentDto): Promise<ResponseAppointmentDto> {
    const appointment = await this.prismaService.appointment.create({ data: body });

    return appointment;
  }

  async findAllByPatientId(id: string): Promise<ResponseAppointmentDto[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: { patientId: id },
      include: { doctor: true },
    });
    return appointments;
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
    const appointment = await this.prismaService.appointment.findUnique({ where: { id } });
    return appointment;
  }

  async update(id: string, body: PatchAppointmentDto): Promise<ResponseAppointmentDto> {
    const appointment = await this.prismaService.appointment.update({ where: { id }, data: body });

    return appointment;
  }

  async remove(id: string) {
    await this.prismaService.appointment.delete({ where: { id } });
  }
}
