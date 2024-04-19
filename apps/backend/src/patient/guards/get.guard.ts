import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

// TODO: Move guard logic to service
@Injectable()
export class GetPatientGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const {
      params: { id },
    } = context.switchToHttp().getRequest<Request<{ id: string }>>();

    const isPatientExsists = await this.prismaService.patient.findUnique({ where: { id } });

    if (!isPatientExsists) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }
}
