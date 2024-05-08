import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { ResponseAppointmentDto } from './dto/response.dto';
import { ChatCreatedEvent } from '../chat/events/chat-created.event';
import { calculateAppointmentPrice } from '../utils/calculateAppointmentPrice';
import { emitEventBasedOnAppointmentStatus } from '../utils/emitEventBasedOnAppointmentStatus';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async isAppointmentExists(id: string): Promise<boolean> {
    const appointment = await this.prismaService.appointment.findUnique({ where: { id } });

    if (!appointment) throw new NotFoundException('An appointment with this Id not found.');

    return true;
  }

  async createAppointment(body: CreateAppointmentDto): Promise<ResponseAppointmentDto> {
    await this.doctorService.isDoctorByIdExists(body.doctorId);
    await this.patientService.isPatientByIdExists(body.patientId);

    const doctor = await this.doctorService.getDoctor(body.doctorId);
    const price = calculateAppointmentPrice(body.startedAt, doctor.payrate, body.endedAt);

    const appointment = await this.prismaService.appointment.create({ data: { ...body, price } });

    // TODO: Use event isntead of directly call payment service.
    this.eventEmitter.emit('chat.create', new ChatCreatedEvent(body.patientId, body.doctorId));
    emitEventBasedOnAppointmentStatus(this.eventEmitter, appointment);

    return plainToInstance(ResponseAppointmentDto, appointment);
  }

  async getAppointments(): Promise<ResponseAppointmentDto[]> {
    const appointments = await this.prismaService.appointment.findMany();

    return plainToInstance(ResponseAppointmentDto, appointments);
  }

  async getAppointmentsByPatientId(id: string): Promise<ResponseAppointmentDto[]> {
    await this.patientService.isPatientByIdExists(id);

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
            _count: { select: { reviews: true } },
          },
        },
      },
    });

    return plainToInstance(ResponseAppointmentDto, appointments);
  }

  async getAppointmentsByDoctorId(id: string): Promise<ResponseAppointmentDto[]> {
    await this.doctorService.isDoctorByIdExists(id);

    const appointments = await this.prismaService.appointment.findMany({
      where: { doctorId: id },
      include: {
        patient: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatarKey: true, phone: true, email: true },
            },
          },
        },
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

  async getAppointment(id: string): Promise<ResponseAppointmentDto> {
    await this.isAppointmentExists(id);

    const appointment = await this.prismaService.appointment.findUnique({ where: { id } });

    return plainToInstance(ResponseAppointmentDto, appointment);
  }

  async patchAppointment(id: string, body: PatchAppointmentDto): Promise<ResponseAppointmentDto> {
    await this.isAppointmentExists(id);

    const appointment = await this.prismaService.appointment.update({ where: { id }, data: body });

    emitEventBasedOnAppointmentStatus(this.eventEmitter, appointment);

    return plainToInstance(ResponseAppointmentDto, appointment);
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.isAppointmentExists(id);

    await this.prismaService.appointment.delete({ where: { id } });
  }
}
