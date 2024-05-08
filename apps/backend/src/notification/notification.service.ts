import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseNotificationDto } from './dto/response.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotificationsForPatient(patientId: string): Promise<Notification[]> {
    const patientExists = await this.prismaService.patient.findUnique({
      where: { id: patientId },
    });

    if (!patientExists) {
      throw new NotFoundException(`Patient with ID ${patientId} not found.`);
    }

    const notifications = await this.prismaService.notification.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        doctor: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarKey: true,
              },
            },
            hospitals: { select: { hospital: { select: { id: true, name: true } } } },
            specializations: { select: { specialization: true } },
            _count: { select: { reviews: true } },
          },
        },
        appointment: {
          select: {
            price: true,
            startedAt: true,
          },
        },
      },
    });

    return notifications;
  }

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<ResponseNotificationDto> {
    const data = {
      patientId: createNotificationDto.patientId,
      doctorId: createNotificationDto.doctorId ?? undefined,
      modelId: createNotificationDto.modelId,
      model: createNotificationDto.model,
      action: createNotificationDto.action,
      message: createNotificationDto.message,
      fileKey: createNotificationDto.fileKey ?? undefined,
    };

    const notification = await this.prismaService.notification.create({ data });

    return notification;
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found.`);
    }

    await this.prismaService.notification.delete({
      where: { id: notificationId },
    });
  }

  async getDoctorName(doctorId: string): Promise<string> {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id: doctorId },
      select: {
        user: { select: { firstName: true, lastName: true } },
      },
    });

    if (!doctor || !doctor.user) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    return `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`;
  }
}
