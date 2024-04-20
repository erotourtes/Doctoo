import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

// Move guard logic to service
@Injectable()
export class GetAppointmentGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const {
      params: { id },
    } = context.switchToHttp().getRequest<Request>();

    const isAppointmentExist = await this.prismaService.appointment.findUnique({ where: { id } });

    if (!isAppointmentExist) throw new NotFoundException('A appointment with this Id not found.');

    return true;
  }
}
