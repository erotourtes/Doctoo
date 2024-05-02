import { Injectable } from '@nestjs/common';
import { CreateDoctorScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDoctorScheduleDto } from './dto/update-schedule.dto';
import { GetDoctorScheduleQuery } from './dto/get-schedule.query';
import { getDateWithDaysOffset, getMidnightOfDate } from '../utils/dateUtils';
import { plainToInstance } from 'class-transformer';
import { ResponseDoctorScheduleDto } from './dto/response-schedule.dto';

@Injectable()
export class DoctorScheduleService {
  constructor(private readonly prismaService: PrismaService) {}
  async createSchedule(doctorId: string, dto: CreateDoctorScheduleDto) {
    const schedule = await this.prismaService.doctorSchedule.create({
      data: { ...dto, doctor: { connect: { id: doctorId } } },
    });
    return schedule;
  }

  async getDoctorSchedule(doctorId: string, query?: GetDoctorScheduleQuery) {
    const appointmentFilters: any = {};
    if (query?.date)
      appointmentFilters.AND = [
        { startedAt: { gte: query?.date } },
        { startedAt: { lte: getDateWithDaysOffset(query?.date, 1) } },
      ];
    if (query?.fromDate && query?.toDate)
      appointmentFilters.AND = [
        { startedAt: { gte: query?.fromDate } },
        { startedAt: { lte: getDateWithDaysOffset(query?.toDate, 1) } },
      ];
    const schedule = await this.prismaService.doctorSchedule.findUnique({
      where: { doctorId },
      select: {
        startsWorkHourUTC: true,
        endsWorkHourUTC: true,
        doctor: {
          select: {
            appointments: {
              where: appointmentFilters.AND?.length
                ? appointmentFilters
                : {
                    AND: [
                      { startedAt: { gte: new Date() } },
                      { startedAt: getDateWithDaysOffset(getMidnightOfDate(new Date()), 1) },
                    ],
                  },
              select: { startedAt: true },
            },
          },
        },
      },
    });
    return plainToInstance(ResponseDoctorScheduleDto, schedule);
  }

  async updateSchedule(doctorId: string, dto: UpdateDoctorScheduleDto) {
    const schedule = await this.prismaService.doctorSchedule.update({ where: { doctorId }, data: dto });
    return schedule;
  }

  async deleteSchedule(doctorId: string) {
    await this.prismaService.doctorSchedule.delete({ where: { doctorId } });
  }
}
