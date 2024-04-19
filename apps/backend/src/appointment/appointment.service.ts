import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateAppointmentDto) {
    const appointment = await this.prismaService.appointment.create({ data: body });
    return appointment;
  }

  async findAllByPatientId(id: string) {
    const appointments = await this.prismaService.appointment.findMany({
      where: { patient_id: id },
      include: { doctor: true },
    });
    return appointments;
  }

  async findAllByDoctorId(id: string) {
    const doctor = await this.prismaService.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException({ message: `Doctor with ID ${id} does not exist` });

    const appointments = await this.prismaService.appointment.findMany({
      where: { doctor_id: id },
      include: { patient: true },
    });

    return appointments;
  }

  async findOne(id: string) {
    const appointment = await this.prismaService.appointment.findUnique({ where: { id } });
    return appointment;
  }

  async update(id: string, body: UpdateAppointmentDto) {
    const appointment = await this.prismaService.appointment.update({ where: { id }, data: body });

    return appointment;
  }

  async remove(id: string) {
    await this.prismaService.appointment.delete({ where: { id } });
  }
}
